import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DOT_SHADOW_REST =
  '0 0 18px rgba(201,168,76,0.85), 0 0 36px rgba(201,168,76,0.35)';
const DOT_SHADOW_FLASH =
  '0 0 34px rgba(201,168,76,1), 0 0 72px rgba(201,168,76,0.78), 0 0 120px rgba(201,168,76,0.42)';

const education = [
  {
    degree: 'Bachelor of Technology',
    field: 'Computer Engineering',
    institution: 'CGC Jhanjeri',
    location: 'Mohali, India',
    year: '2017 - 2021',
    // short: 'CGC',
    index: '01',
  },
  {
    degree: 'Postgraduate',
    field: 'Applied AI Solutions',
    institution: 'George Brown College',
    location: 'Toronto, Canada',
    year: '2022 - 2023',
    // short: 'GBC',
    index: '02',
  },
  {
    degree: 'Postgraduate',
    field: 'Project Management',
    institution: 'George Brown College',
    location: 'Toronto, Canada',
    year: '2023 - 2024',
    // short: 'GBC',
    index: '03',
  },
 
];

export default function Education() {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const lineRef = useRef(null);
  const dotRefs = useRef([]);
  const burstRefs = useRef([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const dots = dotRefs.current.filter(Boolean);
      const bursts = burstRefs.current.filter(Boolean);
      const cards = cardRefs.current.filter(Boolean);

      gsap.fromTo(
        headRef.current.querySelectorAll('.reveal'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: headRef.current,
            start: 'top 86%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(dots, {
        scale: 0,
        opacity: 0,
        boxShadow: '0 0 0 rgba(201,168,76,0)',
        transformOrigin: 'center center',
      });
      gsap.set(bursts, {
        scale: 0.35,
        opacity: 0,
        transformOrigin: 'center center',
      });
      gsap.set(cards, { opacity: 0, y: 52 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      timeline.to(lineRef.current, {
        scaleX: 1,
        duration: 0.9,
        ease: 'power3.out',
      });

      education.forEach((_, index) => {
        const label = `milestone-${index}`;
        const startAt = 1 + index;

        timeline.addLabel(label, startAt);
        timeline.to(
          dots[index],
          {
            scale: 1,
            opacity: 1,
            duration: 0.38,
            ease: 'back.out(2.8)',
            boxShadow: DOT_SHADOW_FLASH,
          },
          label
        );
        timeline.to(
          bursts[index],
          {
            scale: 1.9,
            opacity: 0.95,
            duration: 0.2,
            ease: 'power2.out',
          },
          `${label}+=0.04`
        );
        timeline.to(
          bursts[index],
          {
            scale: 2.45,
            opacity: 0,
            duration: 0.42,
            ease: 'power2.in',
          },
          `${label}+=0.24`
        );
        timeline.to(
          dots[index],
          {
            boxShadow: DOT_SHADOW_REST,
            duration: 0.48,
            ease: 'power2.out',
          },
          `${label}+=0.18`
        );
        timeline.to(
          cards[index],
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
          },
          `${label}+=0.16`
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className=" px-6 md:px-14 relative overflow-hidden"
      style={{ background: '#000' }}
    >
      <div
        className="absolute left-1/2 bottom-0 -translate-x-1/2 pointer-events-none"
        style={{
          width: '700px',
          height: '300px',
          background:
            'radial-gradient(ellipse at center, rgba(201,168,76,0.05) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div ref={headRef} className="max-w-7xl mx-auto">
        <p className="reveal section-label">04 / Academics</p>
        <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
          <h2 className="section-title text-white">Education</h2>
          <p
            className="font-body text-sm font-medium"
            style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}
          >
            Academic foundations that power my work.
          </p>
        </div>

        <div className="relative">
          <div style={{ position: 'relative', width: '100%', height: '2px' }}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(255,255,255,0.1)',
              }}
            />
            <div
              ref={lineRef}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '2px',
                background:
                  'linear-gradient(to right, #C9A84C, rgba(201,168,76,0.4))',
              }}
            />
          </div>

          <div className="flex justify-between" style={{ marginTop: '-8px' }}>
            {education.map((_, index) => (
              <div key={index} className="flex justify-center" style={{ flex: 1 }}>
                <div
                  className="relative flex items-center justify-center"
                  style={{ width: '14px', height: '14px', flexShrink: 0 }}
                >
                  <span
                    ref={(element) => {
                      burstRefs.current[index] = element;
                    }}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      inset: '-14px',
                      border: '1px solid rgba(201,168,76,0.72)',
                      boxShadow: '0 0 24px rgba(201,168,76,0.45)',
                      opacity: 0,
                    }}
                  />
                  <div
                    ref={(element) => {
                      dotRefs.current[index] = element;
                    }}
                    className="rounded-full"
                    style={{
                      width: '14px',
                      height: '14px',
                      background: '#C9A84C',
                      boxShadow: DOT_SHADOW_REST,
                      border: '2px solid rgba(255,255,255,0.25)',
                      opacity: 0,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-12">
            {education.map((entry, index) => (
              <div
                key={entry.index}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                className="group relative"
                style={{
                  paddingRight: index < education.length - 1 ? '2.5rem' : '0',
                  borderRight:
                    index < education.length - 1
                      ? '1px solid rgba(255,255,255,0.1)'
                      : 'none',
                  opacity: 0,
                }}
              >
                <span
                  className="font-body text-xs tracking-[.25em] block mb-5 font-semibold"
                  style={{ color: '#C9A84C' }}
                >
                  {entry.index}
                </span>

                <span
                  className="font-body text-xs tracking-widest uppercase font-bold px-3 py-1.5 mb-5 inline-block"
                  style={{
                    color: '#C9A84C',
                    border: '1px solid rgba(201,168,76,0.6)',
                    background: 'rgba(201,168,76,0.12)',
                  }}
                >
                  {entry.year}
                </span>

                <p
                  className="font-body text-xs tracking-widest uppercase mt-5 mb-1 font-semibold"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                >
                  {entry.degree}
                </p>

                <h3
                  className="font-title mb-5"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 'clamp(1.8rem, 2.8vw, 2.6rem)',
                    letterSpacing: '.04em',
                    lineHeight: 1,
                    color: '#ffffff',
                  }}
                >
                  {entry.field}
                </h3>

                <div className="flex items-center gap-2 mb-1.5">
                  <div
                    style={{
                      width: '24px',
                      height: '2px',
                      background: '#C9A84C',
                      flexShrink: 0,
                    }}
                  />
                  <p className="font-body font-bold text-sm" style={{ color: '#C9A84C' }}>
                    {entry.institution}
                  </p>
                </div>

                <p
                  className="font-body text-sm ml-8"
                  style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 400 }}
                >
                  {entry.location}
                </p>

                <div
                  className="mt-4 font-title select-none pointer-events-none"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '4.5rem',
                    letterSpacing: '.12em',
                    color: 'rgba(201,168,76,0.1)',
                    lineHeight: 1,
                  }}
                >
                  {entry.short}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="mt-20"
          style={{
            height: '1px',
            background:
              'linear-gradient(to right, transparent, rgba(201,168,76,0.2), transparent)',
          }}
        />
      </div>
    </section>
  );
}
