import { useEffect, useEffectEvent, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SECTION_SCROLL_EVENT } from '../routes';

gsap.registerPlugin(ScrollTrigger);

export const REPLAY_TOGGLE_ACTIONS = 'restart none restart reset';
export const ONCE_TOGGLE_ACTIONS = 'play none none none';

const DEFAULT_SCOPE_START = 'top 82%';
const DEFAULT_ITEM_START = 'top 88%';
const DEFAULT_REPLAY_WAIT_MS = 2200;

function resolveElement(target) {
  if (!target) {
    return null;
  }

  if (typeof target === 'object' && 'current' in target) {
    return target.current;
  }

  return target;
}

function inferSectionId(element, explicitSectionId) {
  if (explicitSectionId) {
    return explicitSectionId;
  }

  return element?.closest?.('section[id]')?.id || element?.id || undefined;
}

function getStartThreshold(start) {
  if (typeof start === 'number') {
    return start;
  }

  const match = typeof start === 'string' ? start.match(/(\d+)%/) : null;
  return match ? Number(match[1]) / 100 : 0.82;
}

function isElementReady(element, start = DEFAULT_SCOPE_START) {
  if (!element || typeof window === 'undefined') {
    return false;
  }

  const rect = element.getBoundingClientRect();
  const threshold = window.innerHeight * getStartThreshold(start);
  return rect.top <= threshold && rect.bottom >= 0;
}

function restartAnimation(animation) {
  if (!animation) {
    return;
  }

  animation.pause(0);
  animation.restart();
}

export function getReplayScrollTrigger(trigger, options = {}) {
  const {
    start = DEFAULT_SCOPE_START,
    repeat = true,
    ...rest
  } = options;

  return {
    trigger,
    start,
    toggleActions: repeat ? REPLAY_TOGGLE_ACTIONS : ONCE_TOGGLE_ACTIONS,
    invalidateOnRefresh: true,
    ...rest,
  };
}

export function createReplayableScrollTrigger({
  trigger,
  sectionId,
  start = DEFAULT_SCOPE_START,
  repeat = true,
  navReplay = repeat,
  play,
  reset,
}) {
  const triggerElement = resolveElement(trigger);

  if (!triggerElement) {
    return () => {};
  }

  let animationFrameId = 0;
  let isDisposed = false;
  const resolvedSectionId = inferSectionId(triggerElement, sectionId);

  const runReset = () => reset?.();
  const runPlay = (force = false) => play?.(force);

  runReset();

  const scrollTrigger = ScrollTrigger.create({
    trigger: triggerElement,
    start,
    invalidateOnRefresh: true,
    onEnter: () => runPlay(false),
    onEnterBack: () => {
      if (repeat) {
        runPlay(true);
      }
    },
    onLeaveBack: () => {
      if (repeat) {
        runReset();
      }
    },
  });

  const cancelQueuedReplay = () => {
    if (animationFrameId) {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = 0;
    }
  };

  const queueReplay = () => {
    cancelQueuedReplay();
    const deadline = performance.now() + DEFAULT_REPLAY_WAIT_MS;

    const tick = () => {
      if (isDisposed || !document.body.contains(triggerElement)) {
        return;
      }

      if (scrollTrigger.isActive || isElementReady(triggerElement, start)) {
        runReset();
        runPlay(true);
        return;
      }

      if (performance.now() < deadline) {
        animationFrameId = window.requestAnimationFrame(tick);
      }
    };

    tick();
  };

  const handleSectionScroll = (event) => {
    if (!navReplay || !resolvedSectionId || event.detail?.sectionId !== resolvedSectionId) {
      return;
    }

    queueReplay();
  };

  if (navReplay && resolvedSectionId) {
    window.addEventListener(SECTION_SCROLL_EVENT, handleSectionScroll);
  }

  return () => {
    isDisposed = true;
    cancelQueuedReplay();

    if (navReplay && resolvedSectionId) {
      window.removeEventListener(SECTION_SCROLL_EVENT, handleSectionScroll);
    }

    scrollTrigger.kill();
  };
}

export function replaySectionScrollAnimations(sectionId, options = {}) {
  if (typeof window === 'undefined' || !sectionId) {
    return () => {};
  }

  const section = document.getElementById(sectionId);

  if (!section) {
    return () => {};
  }

  const {
    start = 0.92,
    waitMs = DEFAULT_REPLAY_WAIT_MS,
  } = options;

  let animationFrameId = 0;
  const deadline = performance.now() + waitMs;

  const tick = () => {
    if (!document.body.contains(section)) {
      return;
    }

    if (isElementReady(section, start)) {
      const seenAnimations = new Set();

      ScrollTrigger.getAll().forEach((trigger) => {
        const triggerElement = trigger.trigger;

        if (!(triggerElement instanceof Element)) {
          return;
        }

        if (triggerElement !== section && !section.contains(triggerElement)) {
          return;
        }

        if (!trigger.animation || seenAnimations.has(trigger.animation)) {
          return;
        }

        seenAnimations.add(trigger.animation);
        restartAnimation(trigger.animation);
      });

      return;
    }

    if (performance.now() < deadline) {
      animationFrameId = window.requestAnimationFrame(tick);
    }
  };

  tick();

  return () => {
    if (animationFrameId) {
      window.cancelAnimationFrame(animationFrameId);
    }
  };
}

function useGroupedAnimation(buildControls, options = {}) {
  const ref = useRef(null);
  const createControls = useEffectEvent(buildControls);
  const {
    sectionId,
    start = DEFAULT_SCOPE_START,
    repeat = true,
    navReplay = repeat,
    watch,
  } = options;

  useEffect(() => {
    if (!ref.current) {
      return undefined;
    }

    const controls = createControls(ref.current);

    if (!controls) {
      return undefined;
    }

    const cleanupTrigger = createReplayableScrollTrigger({
      trigger: ref.current,
      sectionId,
      start,
      repeat,
      navReplay,
      play: controls.play,
      reset: controls.reset,
    });

    return () => {
      cleanupTrigger();
      controls.cleanup?.();
    };
  }, [navReplay, repeat, sectionId, start, watch]);

  return ref;
}

function usePerElementAnimation(selector, buildControls, options = {}) {
  const ref = useRef(null);
  const createControls = useEffectEvent(buildControls);
  const {
    sectionId,
    start = DEFAULT_ITEM_START,
    repeat = true,
    navReplay = repeat,
    watch,
  } = options;

  useEffect(() => {
    if (!ref.current) {
      return undefined;
    }

    const elements = Array.from(ref.current.querySelectorAll(selector));

    if (elements.length === 0) {
      return undefined;
    }

    const cleanups = elements.map((element, index) => {
      const controls = createControls({
        element,
        index,
        scope: ref.current,
      });

      const cleanupTrigger = createReplayableScrollTrigger({
        trigger: element,
        sectionId,
        start,
        repeat,
        navReplay,
        play: controls.play,
        reset: controls.reset,
      });

      return () => {
        cleanupTrigger();
        controls.cleanup?.();
      };
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [navReplay, repeat, sectionId, selector, start, watch]);

  return ref;
}

export function useFadeUp(selector = '.fade-up', options = {}) {
  return usePerElementAnimation(
    selector,
    ({ element, index }) => {
      const tween = gsap.fromTo(
        element,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: index * 0.12,
          paused: true,
        }
      );

      return {
        play: () => restartAnimation(tween),
        reset: () => tween.pause(0),
        cleanup: () => tween.kill(),
      };
    },
    {
      start: DEFAULT_ITEM_START,
      ...options,
    }
  );
}

export function useStaggerLeft(selector = '.stagger', options = {}) {
  return useGroupedAnimation(
    (scope) => {
      const elements = scope.querySelectorAll(selector);

      if (elements.length === 0) {
        return null;
      }

      const tween = gsap.fromTo(
        elements,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.13,
          paused: true,
        }
      );

      return {
        play: () => restartAnimation(tween),
        reset: () => tween.pause(0),
        cleanup: () => tween.kill(),
      };
    },
    {
      start: DEFAULT_SCOPE_START,
      ...options,
    }
  );
}

export function useStaggerRight(selector = '.stagger-r', options = {}) {
  return useGroupedAnimation(
    (scope) => {
      const elements = scope.querySelectorAll(selector);

      if (elements.length === 0) {
        return null;
      }

      const tween = gsap.fromTo(
        elements,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.13,
          paused: true,
        }
      );

      return {
        play: () => restartAnimation(tween),
        reset: () => tween.pause(0),
        cleanup: () => tween.kill(),
      };
    },
    {
      start: DEFAULT_SCOPE_START,
      ...options,
    }
  );
}

export function useProgressBars(options = {}) {
  return usePerElementAnimation(
    '.progress-bar',
    ({ element }) => {
      const targetWidth = element.dataset.width || '80%';
      const tween = gsap.fromTo(
        element,
        { width: '0%' },
        {
          width: targetWidth,
          duration: 1.4,
          ease: 'power2.out',
          paused: true,
        }
      );

      return {
        play: () => restartAnimation(tween),
        reset: () => tween.pause(0),
        cleanup: () => tween.kill(),
      };
    },
    {
      start: DEFAULT_ITEM_START,
      ...options,
    }
  );
}

export function useTimeline(options = {}) {
  return useGroupedAnimation(
    (scope) => {
      const lefts = scope.querySelectorAll('.tl-left');
      const rights = scope.querySelectorAll('.tl-right');
      const dots = scope.querySelectorAll('.tl-dot');

      const animations = [
        gsap.fromTo(
          lefts,
          { opacity: 0, x: -70 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
            paused: true,
          }
        ),
        gsap.fromTo(
          rights,
          { opacity: 0, x: 70 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
            paused: true,
          }
        ),
        gsap.fromTo(
          dots,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'back.out(2)',
            stagger: 0.08,
            paused: true,
          }
        ),
      ];

      return {
        play: () => {
          animations.forEach(restartAnimation);
        },
        reset: () => {
          animations.forEach((animation) => animation.pause(0));
        },
        cleanup: () => {
          animations.forEach((animation) => animation.kill());
        },
      };
    },
    {
      start: 'top 80%',
      ...options,
    }
  );
}
