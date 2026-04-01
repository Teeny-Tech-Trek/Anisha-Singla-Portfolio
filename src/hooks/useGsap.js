import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Fade-up + slide animation on scroll for a container's children */
export function useFadeUp(selector = '.fade-up', deps = []) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll(selector);
    els.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: i * 0.12,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return ref;
}

/** Stagger children from left */
export function useStaggerLeft(selector = '.stagger', deps = []) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll(selector);
    gsap.fromTo(
      els,
      { opacity: 0, x: -60 },
      {
        opacity: 1,
        x: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.13,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      }
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return ref;
}

/** Stagger children from right */
export function useStaggerRight(selector = '.stagger-r', deps = []) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll(selector);
    gsap.fromTo(
      els,
      { opacity: 0, x: 60 },
      {
        opacity: 1,
        x: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.13,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      }
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return ref;
}

/** Animate progress bars width */
export function useProgressBars(deps = []) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const bars = ref.current.querySelectorAll('.progress-bar');
    bars.forEach((bar) => {
      const target = bar.dataset.width || '80%';
      gsap.fromTo(
        bar,
        { width: '0%' },
        {
          width: target,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return ref;
}

/** Timeline cards alternate left/right */
export function useTimeline(deps = []) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const lefts  = ref.current.querySelectorAll('.tl-left');
    const rights = ref.current.querySelectorAll('.tl-right');
    const dots   = ref.current.querySelectorAll('.tl-dot');

    gsap.fromTo(lefts,  { opacity:0, x:-70 }, {
      opacity:1, x:0, duration:.8, ease:'power3.out', stagger:.1,
      scrollTrigger:{ trigger:ref.current, start:'top 80%', toggleActions:'play none none none' }
    });
    gsap.fromTo(rights, { opacity:0, x:70  }, {
      opacity:1, x:0, duration:.8, ease:'power3.out', stagger:.1,
      scrollTrigger:{ trigger:ref.current, start:'top 80%', toggleActions:'play none none none' }
    });
    gsap.fromTo(dots, { opacity:0, scale:0 }, {
      opacity:1, scale:1, duration:.5, ease:'back.out(2)', stagger:.08,
      scrollTrigger:{ trigger:ref.current, start:'top 80%', toggleActions:'play none none none' }
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return ref;
}
