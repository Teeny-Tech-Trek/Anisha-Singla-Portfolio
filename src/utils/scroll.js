export const SECTION_SCROLL_EVENT = 'app:section-scroll';

const DEFAULT_SCROLL_DURATION = 1.2;
const DEFAULT_SCROLL_EASING = (t) => 1 - Math.pow(1 - t, 4);
const DEFAULT_SCROLL_GAP = 16;

let lenisInstance = null;

function canUseDOM() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function isKeywordTarget(target) {
  return ['top', 'left', 'start', 'bottom', 'right', 'end'].includes(target);
}

function normalizeHash(hash) {
  if (!hash) {
    return '';
  }

  return decodeURIComponent(hash.replace(/^#/, '').trim());
}

function resolveScrollTarget(target) {
  if (!canUseDOM()) {
    return null;
  }

  if (typeof target === 'number') {
    return target;
  }

  if (target instanceof HTMLElement) {
    return target;
  }

  if (typeof target === 'string') {
    if (isKeywordTarget(target)) {
      return target;
    }

    return document.querySelector(target);
  }

  return null;
}

function getFallbackTop(target) {
  if (!canUseDOM()) {
    return null;
  }

  if (typeof target === 'number') {
    return target;
  }

  if (typeof target === 'string') {
    if (['top', 'left', 'start'].includes(target)) {
      return 0;
    }

    if (['bottom', 'right', 'end'].includes(target)) {
      return Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
    }
  }

  if (target instanceof HTMLElement) {
    return target.getBoundingClientRect().top + window.scrollY;
  }

  return null;
}

export function setLenisInstance(instance) {
  lenisInstance = instance;
}

export function getLenisInstance() {
  return lenisInstance;
}

export function clearLenisInstance(instance) {
  if (!instance || lenisInstance === instance) {
    lenisInstance = null;
  }
}

export function getScrollOffset(extraOffset = DEFAULT_SCROLL_GAP) {
  if (!canUseDOM()) {
    return 0;
  }

  const header =
    document.querySelector('[data-scroll-bar]') ||
    document.querySelector('[data-scroll-header]');

  if (!header) {
    return 0;
  }

  return -Math.round(header.getBoundingClientRect().height + extraOffset);
}

export function emitSectionScrollEvent(sectionId, detail = {}) {
  if (!canUseDOM()) {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(SECTION_SCROLL_EVENT, {
      detail: {
        sectionId,
        behavior: detail.immediate ? 'auto' : 'smooth',
      },
    })
  );
}

export function setHash(hash, mode = 'push') {
  if (!canUseDOM()) {
    return;
  }

  const normalizedHash = normalizeHash(hash);

  if (!normalizedHash) {
    return;
  }

  const nextUrl = `${window.location.pathname}${window.location.search}#${normalizedHash}`;

  if (mode === 'replace') {
    window.history.replaceState(window.history.state, '', nextUrl);
    return;
  }

  window.history.pushState(window.history.state, '', nextUrl);
}

export function scrollToTarget(target, options = {}) {
  if (!canUseDOM()) {
    return false;
  }

  const resolvedTarget = resolveScrollTarget(target);

  if (resolvedTarget === null) {
    return false;
  }

  const {
    offset = 0,
    immediate = false,
    lock = false,
    force = true,
    duration = DEFAULT_SCROLL_DURATION,
    easing = DEFAULT_SCROLL_EASING,
    onComplete,
  } = options;

  if (lenisInstance) {
    lenisInstance.resize?.();
    lenisInstance.scrollTo(resolvedTarget, {
      offset,
      immediate,
      lock,
      force,
      duration,
      easing,
      // Lenis invokes onComplete inside Animate.advance() *before* calling
      // this.stop() on the finishing tick. Defer by one animation frame so a
      // follow-up scrollTo() inside onComplete isn't stopped on the same tick.
      onComplete: onComplete
        ? (lenis) => {
            window.requestAnimationFrame(() => onComplete(lenis));
          }
        : undefined,
    });

    return true;
  }

  const fallbackTop = getFallbackTop(resolvedTarget);

  if (fallbackTop === null) {
    return false;
  }

  window.scrollTo({
    top: Math.max(Math.round(fallbackTop + offset), 0),
    left: 0,
    behavior: immediate ? 'auto' : 'smooth',
  });

  if (onComplete) {
    window.requestAnimationFrame(() => onComplete(null));
  }

  return true;
}

let activeCorrectionCleanup = null;

export function scrollToTop(options = {}) {
  activeCorrectionCleanup?.();
  activeCorrectionCleanup = null;
  return scrollToTarget(0, { ...options, offset: 0 });
}

export function scrollToSection(sectionId, options = {}) {
  if (!canUseDOM() || !sectionId) {
    return false;
  }

  const target = document.getElementById(sectionId);

  if (!target) {
    return false;
  }

  activeCorrectionCleanup?.();
  activeCorrectionCleanup = null;

  const resolvedOffset = options.offset ?? getScrollOffset();
  let cancelledByUser = false;
  let initialDone = false;
  let settleTimer = 0;
  let resizeDebounceTimer = 0;
  let resizeObserver = null;
  let lastObservedHeight = document.documentElement.scrollHeight;
  const startedAt = performance.now();
  let lastLayoutShiftAt = startedAt;
  const MAX_TRACK_MS = 3500;

  const stopCorrection = () => {
    cancelledByUser = true;
    window.clearTimeout(settleTimer);
    window.clearTimeout(resizeDebounceTimer);
    resizeObserver?.disconnect();
    resizeObserver = null;
    ['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach((evt) =>
      window.removeEventListener(evt, stopCorrection)
    );
    if (activeCorrectionCleanup === stopCorrection) {
      activeCorrectionCleanup = null;
    }
  };

  window.requestAnimationFrame(() => {
    if (cancelledByUser) return;
    ['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach((evt) =>
      window.addEventListener(evt, stopCorrection, { passive: true, once: true })
    );
  });
  activeCorrectionCleanup = stopCorrection;

  const computeAlignment = (currentTarget) => {
    const currentOffset = options.offset ?? getScrollOffset();
    const docTop = currentTarget.getBoundingClientRect().top + window.scrollY;
    const maxScroll = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      0
    );
    const desiredScrollY = Math.min(Math.max(docTop + currentOffset, 0), maxScroll);
    return {
      currentOffset,
      drift: desiredScrollY - window.scrollY,
    };
  };

  // Sections such as Experience expand while scrolling past them and
  // lazy-loaded sections (e.g. Certifications) can grow the page mid-scroll.
  // Track layout height changes until everything settles, then glide smoothly
  // to the exact section top without fighting bottom-of-page limits or user input.
  const alignTarget = (attempt = 0) => {
    window.clearTimeout(settleTimer);
    if (
      cancelledByUser ||
      attempt > 6 ||
      performance.now() - startedAt > MAX_TRACK_MS
    ) {
      stopCorrection();
      return;
    }

    const currentTarget = document.getElementById(sectionId);
    if (!currentTarget) {
      stopCorrection();
      return;
    }

    lenisInstance?.resize?.();
    const { currentOffset, drift } = computeAlignment(currentTarget);

    if (Math.abs(drift) > 6) {
      scrollToTarget(currentTarget, {
        ...options,
        offset: currentOffset,
        duration: 0.45,
        onComplete: () => {
          if (cancelledByUser) return;
          settleTimer = window.setTimeout(() => alignTarget(attempt + 1), 220);
        },
      });
    } else if (performance.now() - lastLayoutShiftAt < 450 || attempt === 0) {
      settleTimer = window.setTimeout(() => alignTarget(attempt + 1), 350);
    } else {
      stopCorrection();
    }
  };

  if (typeof ResizeObserver !== 'undefined') {
    const targetToObserve = document.querySelector('main') || document.body;
    if (targetToObserve) {
      resizeObserver = new ResizeObserver(() => {
        if (cancelledByUser) return;
        const nextHeight = document.documentElement.scrollHeight;
        if (Math.abs(nextHeight - lastObservedHeight) < 2) return;
        lastObservedHeight = nextHeight;
        lastLayoutShiftAt = performance.now();
        lenisInstance?.resize?.();

        if (!initialDone) return;
        window.clearTimeout(resizeDebounceTimer);
        resizeDebounceTimer = window.setTimeout(() => {
          if (!cancelledByUser) alignTarget(0);
        }, 160);
      });
      resizeObserver.observe(targetToObserve);
    }
  }

  const didScroll = scrollToTarget(target, {
    ...options,
    offset: resolvedOffset,
    onComplete: (lenis) => {
      initialDone = true;
      options.onComplete?.(lenis);
      alignTarget(0);
    },
  });

  if (!didScroll) {
    stopCorrection();
    return false;
  }

  if (options.updateHash) {
    setHash(sectionId, options.hashMode ?? 'push');
  }

  if (options.emitEvent !== false) {
    emitSectionScrollEvent(sectionId, options);
  }

  return true;
}

export function scrollToHash(hash, options = {}) {
  const sectionId = normalizeHash(hash);

  if (!sectionId) {
    return false;
  }

  return scrollToSection(sectionId, {
    ...options,
    updateHash: false,
  });
}

