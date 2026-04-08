import { useLayoutEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { replaySectionScrollAnimations } from '../hooks/useGsap';
import {
  SECTION_SCROLL_EVENT,
  clearLenisInstance,
  scrollToHash,
  setHash,
  setLenisInstance,
} from '../utils/scroll';

gsap.registerPlugin(ScrollTrigger);

const LENIS_OPTIONS = {
  duration: 1.2,
  easing: (t) => 1 - Math.pow(1 - t, 4),
  smoothWheel: true,
  syncTouch: true,
  syncTouchLerp: 0.08,
  touchMultiplier: 1.1,
  wheelMultiplier: 1,
  autoResize: true,
};

export default function LenisProvider({ children }) {
  useLayoutEffect(() => {
    const lenis = new Lenis(LENIS_OPTIONS);
    const handleLenisScroll = () => ScrollTrigger.update();

    setLenisInstance(lenis);
    lenis.on('scroll', handleLenisScroll);

    let animationFrameId = 0;
    let initialHashFrameId = 0;
    let cancelSectionReplay = () => {};

    const raf = (time) => {
      lenis.raf(time);
      animationFrameId = window.requestAnimationFrame(raf);
    };

    const handleAnchorClick = (event) => {
      const anchor = event.target.closest?.('a[href^="#"]');

      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) {
        return;
      }

      const href = anchor.getAttribute('href');
      const hash = href?.startsWith('#') ? href : new URL(anchor.href, window.location.href).hash;

      if (!hash || hash === '#') {
        return;
      }

      event.preventDefault();
      setHash(hash, window.location.hash === hash ? 'replace' : 'push');
      scrollToHash(hash);
    };

    const handleHashChange = () => {
      if (!window.location.hash) {
        return;
      }

      scrollToHash(window.location.hash);
    };

    const handleSectionScroll = (event) => {
      const sectionId = event.detail?.sectionId;
      const targetSection = sectionId ? document.getElementById(sectionId) : null;

      if (!targetSection) {
        return;
      }

      const rect = targetSection.getBoundingClientRect();
      const isAlreadyVisible = rect.top <= window.innerHeight * 0.92 && rect.bottom >= 0;

      if (!isAlreadyVisible) {
        return;
      }

      cancelSectionReplay();
      cancelSectionReplay = replaySectionScrollAnimations(sectionId);
    };

    animationFrameId = window.requestAnimationFrame(raf);
    document.addEventListener('click', handleAnchorClick);
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener(SECTION_SCROLL_EVENT, handleSectionScroll);

    initialHashFrameId = window.requestAnimationFrame(() => {
      initialHashFrameId = window.requestAnimationFrame(() => {
        handleHashChange();
      });
    });

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }

      if (initialHashFrameId) {
        window.cancelAnimationFrame(initialHashFrameId);
      }

      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener(SECTION_SCROLL_EVENT, handleSectionScroll);
      lenis.off('scroll', handleLenisScroll);
      cancelSectionReplay();
      clearLenisInstance(lenis);
      lenis.destroy();
    };
  }, []);

  return children;
}
