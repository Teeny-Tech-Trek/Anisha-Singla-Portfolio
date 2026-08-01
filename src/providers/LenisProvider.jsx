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

    let initialHashFrameId = 0;
    let cancelSectionReplay = () => {};

    // Drive Lenis off GSAP's own ticker instead of a separate
    // requestAnimationFrame loop — GSAP is already running one every frame
    // for every tween/ScrollTrigger on the page, so piggy-backing on it
    // means there's exactly one rAF driving both scroll and animation,
    // never two competing loops. gsap.ticker's `time` is elapsed seconds;
    // Lenis expects a millisecond timestamp, hence `* 1000`.
    const raf = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    // Recommended when driving Lenis via gsap.ticker: disable GSAP's own
    // lag-smoothing compensation so a stalled tab (background tab, heavy
    // task) doesn't cause GSAP to "catch up" with a large time jump that
    // fights Lenis's own smoothing.
    gsap.ticker.lagSmoothing(0);

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

    document.addEventListener('click', handleAnchorClick);
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener(SECTION_SCROLL_EVENT, handleSectionScroll);

    initialHashFrameId = window.requestAnimationFrame(() => {
      initialHashFrameId = window.requestAnimationFrame(() => {
        handleHashChange();
      });
    });

    return () => {
      if (initialHashFrameId) {
        window.cancelAnimationFrame(initialHashFrameId);
      }

      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener(SECTION_SCROLL_EVENT, handleSectionScroll);
      gsap.ticker.remove(raf);
      lenis.off('scroll', handleLenisScroll);
      cancelSectionReplay();
      clearLenisInstance(lenis);
      lenis.destroy();
    };
  }, []);

  return children;
}
