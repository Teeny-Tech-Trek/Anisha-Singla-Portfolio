import {
  scrollToSection as scrollToLenisSection,
  scrollToTop,
  SECTION_SCROLL_EVENT,
} from '../utils/scroll';

export const ROUTES = {
  HOME: '/',
  CASE_STUDIES: '/case-studies',
};

export { SECTION_SCROLL_EVENT };

const PENDING_SECTION_KEY = 'pending-section';

function normalizePath(pathname = ROUTES.HOME) {
  if (!pathname || pathname === ROUTES.HOME) {
    return ROUTES.HOME;
  }

  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

function emitRouteChange() {
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export function getCurrentPath() {
  if (typeof window === 'undefined') {
    return ROUTES.HOME;
  }

  return normalizePath(window.location.pathname);
}

export function navigateTo(pathname) {
  if (typeof window === 'undefined') {
    return;
  }

  const nextPath = normalizePath(pathname);

  if (getCurrentPath() !== nextPath) {
    window.history.pushState({}, '', nextPath);
    emitRouteChange();
  }

  scrollToTop();
}

export function scrollToSection(sectionId, options) {
  return scrollToLenisSection(sectionId, options);
}

export function navigateToSection(sectionId) {
  if (typeof window === 'undefined') {
    return;
  }

  if (getCurrentPath() !== ROUTES.HOME) {
    window.sessionStorage.setItem(PENDING_SECTION_KEY, sectionId);
    window.history.pushState({}, '', ROUTES.HOME);
    emitRouteChange();
    return;
  }

  scrollToSection(sectionId);
}

export function consumePendingSection() {
  if (typeof window === 'undefined') {
    return null;
  }

  const pendingSection = window.sessionStorage.getItem(PENDING_SECTION_KEY);

  if (pendingSection) {
    window.sessionStorage.removeItem(PENDING_SECTION_KEY);
  }

  return pendingSection;
}
