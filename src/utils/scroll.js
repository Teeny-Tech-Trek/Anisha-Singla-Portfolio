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

  const header = document.querySelector('[data-scroll-header]');

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
    lenisInstance.scrollTo(resolvedTarget, {
      offset,
      immediate,
      lock,
      force,
      duration,
      easing,
      onComplete,
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

export function scrollToTop(options = {}) {
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

  const didScroll = scrollToTarget(target, {
    ...options,
    offset: options.offset ?? getScrollOffset(),
  });

  if (!didScroll) {
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

