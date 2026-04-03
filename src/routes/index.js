export const ROUTES = {
  HOME: '/',
  CASE_STUDIES: '/case-studies',
};

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

  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
}

export function scrollToSection(sectionId, behavior = 'smooth') {
  if (typeof document === 'undefined') {
    return false;
  }

  const target = document.getElementById(sectionId);

  if (!target) {
    return false;
  }

  target.scrollIntoView({ behavior, block: 'start' });
  return true;
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
