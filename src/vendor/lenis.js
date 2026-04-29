const ROOT_CLASSES = ['lenis', 'lenis-smooth'];

function canUseDOM() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function resolveTarget(target) {
  if (!canUseDOM()) {
    return 0;
  }

  if (typeof target === 'number') {
    return target;
  }

  if (typeof target === 'string') {
    if (target === 'top' || target === 'left' || target === 'start') {
      return 0;
    }

    if (target === 'bottom' || target === 'right' || target === 'end') {
      return Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
    }

    const element = document.querySelector(target);
    return element ? element.getBoundingClientRect().top + window.scrollY : 0;
  }

  if (target instanceof HTMLElement) {
    return target.getBoundingClientRect().top + window.scrollY;
  }

  return 0;
}

export default class Lenis {
  constructor(options = {}) {
    this.options = options;
    this.listeners = new Map();
    this.destroyed = false;

    if (canUseDOM()) {
      document.documentElement.classList.add(...ROOT_CLASSES);
    }
  }

  on(eventName, handler) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }

    this.listeners.get(eventName).add(handler);
  }

  off(eventName, handler) {
    this.listeners.get(eventName)?.delete(handler);
  }

  emit(eventName, payload) {
    this.listeners.get(eventName)?.forEach((handler) => {
      handler(payload);
    });
  }

  raf(time) {
    if (this.destroyed || !canUseDOM()) {
      return;
    }

    this.emit('scroll', {
      time,
      scroll: window.scrollY,
      limit: Math.max(document.documentElement.scrollHeight - window.innerHeight, 0),
      velocity: 0,
      direction: 0,
    });
  }

  scrollTo(target, options = {}) {
    if (!canUseDOM()) {
      return;
    }

    const {
      offset = 0,
      immediate = false,
      onComplete,
    } = options;

    const nextTop = Math.max(Math.round(resolveTarget(target) + offset), 0);

    window.scrollTo({
      top: nextTop,
      left: 0,
      behavior: immediate ? 'auto' : 'smooth',
    });

    if (typeof onComplete === 'function') {
      window.requestAnimationFrame(() => onComplete(null));
    }
  }

  destroy() {
    this.destroyed = true;
    this.listeners.clear();

    if (canUseDOM()) {
      document.documentElement.classList.remove(...ROOT_CLASSES);
    }
  }
}
