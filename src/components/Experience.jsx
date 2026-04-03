import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  { role:'Founder & CEO',                        company:'Teeny Tech Trek',             period:'Sep 2024 – Present',   location:'Mohali, India',   highlight:true, badge:'FOUNDER' },
  { role:'Community Coordinator',                company:'Connect Circles: Chandigarh', period:'Mar 2026 – Present',   location:'Mohali, India',   highlight:false },
  { role:'Associate Member',                     company:'TiE Chandigarh',              period:'Dec 2025 – Present',   location:'Mohali, India',   highlight:false },
  { role:'Project Manager — Business Dev',       company:'Appu International',          period:'Jun 2024 – Present',   location:'Ludhiana, India', highlight:false },
  { role:'President, AI Club',                   company:'George Brown College',        period:'Oct 2023 – Apr 2024',  location:'Toronto, Canada', highlight:false },
  { role:'VP, AI Club',                          company:'George Brown College',        period:'Nov 2022 – Oct 2023',  location:'Toronto, Canada', highlight:false },
  { role:'Support Advisor & Entrepreneur',       company:'startGBC',                    period:'May 2023 – Dec 2023',  location:'Toronto, Canada', highlight:false },
  { role:'Sales Floor Team Member',              company:'Tim Hortons',                 period:'Sep 2022 – Feb 2024',  location:'Toronto, Canada', highlight:false },
  { role:'Frontend Developer',                   company:'CETPA Infotech Pvt. Ltd.',    period:'Feb 2021 – Jul 2021',  location:'Noida, India',    highlight:false },
  { role:'Event Manager',                        company:'CGC Jhanjeri',                period:'Aug 2018 – Apr 2020',  location:'Mohali, India',   highlight:false },
];

function Card({ exp, side, cardRef }) {
  return (
    <div
      ref={cardRef}
      className={`card p-5 w-full max-w-xs`}
      style={{
        background: exp.highlight ? 'rgba(201,168,76,0.08)' : '#0d0d0d',
        border: exp.highlight ? '1px solid rgba(201,168,76,0.4)' : '1px solid rgba(255,255,255,0.06)',
        opacity: 0, // start hidden for animation
      }}
    >
      {exp.badge && (
        <span
          className="font-body text-xs font-bold tracking-widest uppercase px-2 py-0.5 mb-2 inline-block"
          style={{ background: '#C9A84C', color: '#000' }}
        >
          {exp.badge}
        </span>
      )}
      <h3
        className="font-title"
        style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: '1.25rem',
          letterSpacing: '.04em',
          color: exp.highlight ? '#C9A84C' : '#fff',
          lineHeight: 1.2,
        }}
      >
        {exp.role}
      </h3>
      <p
        className="font-body font-semibold text-sm mt-1"
        style={{ color: exp.highlight ? '#fff' : 'rgba(255,255,255,0.65)' }}
      >
        {exp.company}
      </p>
      <p className="font-body text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
        {exp.period} · {exp.location}
      </p>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const mobileLineRef = useRef(null);
  const cardRefs = useRef([]);
  const dotRefs = useRef([]);
  const mobileCardRefs = useRef([]);
  const mobileDotRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Desktop center line: scaleY from top ──────────────────────────
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0, opacity: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            opacity: 1,
            duration: 1.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: lineRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // ── Mobile left line: scaleY from top ─────────────────────────────
      if (mobileLineRef.current) {
        gsap.fromTo(
          mobileLineRef.current,
          { scaleY: 0, opacity: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            opacity: 1,
            duration: 1.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: mobileLineRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // ── Desktop cards + dots ───────────────────────────────────────────
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const isLeft = i % 2 === 0;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: isLeft ? -60 : 60,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        );
      });

      dotRefs.current.forEach((dot) => {
        if (!dot) return;
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: dot,
              start: 'top 88%',
            },
          }
        );
      });

      // ── Mobile dots ────────────────────────────────────────────────────
      mobileDotRefs.current.forEach((dot) => {
        if (!dot) return;
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.45,
            ease: 'back.out(2.5)',
            scrollTrigger: {
              trigger: dot,
              start: 'top 88%',
            },
          }
        );
      });

      // ── Mobile cards ───────────────────────────────────────────────────
      mobileCardRefs.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-28 px-6 md:px-14"
      style={{ background: '#000' }}
    >
      <div className="max-w-5xl mx-auto">
        <p className="section-label">03 / My Journey</p>
        <h2 className="section-title text-white mb-16">Experience</h2>

        <div className="relative">

          {/* ── Desktop center line ── */}
          <div
            ref={lineRef}
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0"
            style={{
              width: '1px',
              background: 'linear-gradient(to bottom,transparent,#C9A84C 8%,#C9A84C 92%,transparent)',
            }}
          />

          {/* ── Mobile left line ── */}
          <div
            ref={mobileLineRef}
            className="md:hidden absolute left-3 top-0 bottom-0"
            style={{
              width: '1px',
              background: 'linear-gradient(to bottom,transparent,#C9A84C 5%,#C9A84C 95%,transparent)',
            }}
          />

          <div className="flex flex-col gap-8">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={i} className="relative">

                  {/* ── Mobile card ── */}
                  <div className="md:hidden flex items-start relative">
                    {/* Dot on the line */}
                    <div
                      ref={(el) => (mobileDotRefs.current[i] = el)}
                      className="absolute"
                      style={{
                        left: exp.highlight ? '4px' : '7px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: exp.highlight ? '8px' : '5px',
                        height: exp.highlight ? '8px' : '5px',
                        borderRadius: '50%',
                        background: exp.highlight ? '#C9A84C' : 'rgba(201,168,76,0.7)',
                        boxShadow: exp.highlight
                          ? '0 0 10px 4px rgba(201,168,76,0.55), 0 0 20px 6px rgba(201,168,76,0.25)'
                          : '0 0 6px 2px rgba(201,168,76,0.35)',
                        border: '2px solid #000',
                        opacity: 0,
                        zIndex: 2,
                      }}
                    />
                  <div
                    ref={(el) => (mobileCardRefs.current[i] = el)}
                    className="w-full p-5 card ml-8"
                    style={{
                      background: exp.highlight ? 'rgba(201,168,76,0.08)' : '#0d0d0d',
                      borderLeft: exp.highlight ? '3px solid #C9A84C' : '3px solid rgba(201,168,76,0.3)',
                      opacity: 0,
                    }}
                  >
                    {exp.badge && (
                      <span
                        className="font-body text-xs font-bold tracking-widest uppercase px-2 py-0.5 mb-2 inline-block"
                        style={{ background: '#C9A84C', color: '#000' }}
                      >
                        {exp.badge}
                      </span>
                    )}
                    <h3
                      className="font-title"
                      style={{
                        fontFamily: "'Bebas Neue',sans-serif",
                        fontSize: '1.3rem',
                        color: exp.highlight ? '#C9A84C' : '#fff',
                      }}
                    >
                      {exp.role}
                    </h3>
                    <p className="font-body font-semibold text-sm mt-1" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      {exp.company}
                    </p>
                    <p className="font-body text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      {exp.period} · {exp.location}
                    </p>
                  </div>
                  </div>

                  {/* ── Desktop alternating ── */}
                  <div className="hidden md:flex items-center">
                    <div className="w-[45%] pr-8 flex justify-end">
                      {isLeft && (
                        <Card
                          exp={exp}
                          side="left"
                          cardRef={(el) => (cardRefs.current[i] = el)}
                        />
                      )}
                    </div>
                    <div className="w-[10%] flex justify-center">
                      <div
                        ref={(el) => (dotRefs.current[i] = el)}
                        className="rounded-full"
                        style={{
                          width: exp.highlight ? '16px' : '10px',
                          height: exp.highlight ? '16px' : '10px',
                          background: exp.highlight ? '#C9A84C' : 'rgba(201,168,76,0.6)',
                          boxShadow: exp.highlight ? '0 0 16px rgba(201,168,76,0.6)' : 'none',
                          border: '2px solid #000',
                          flexShrink: 0,
                          opacity: 0,
                        }}
                      />
                    </div>
                    <div className="w-[45%] pl-8 flex justify-start">
                      {!isLeft && (
                        <Card
                          exp={exp}
                          side="right"
                          cardRef={(el) => (cardRefs.current[i] = el)}
                        />
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}