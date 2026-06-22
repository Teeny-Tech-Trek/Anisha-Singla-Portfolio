import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getReplayScrollTrigger } from '../hooks/useGsap';

gsap.registerPlugin(ScrollTrigger);

// Flip this to false to allow multiple cards open at once (the toggle logic and
// state already use a Set, so no other change is needed).
const SINGLE_OPEN = true;

const experiences = [
  {
    role: 'Founder & CEO',
    company: 'Teeny Tech Trek',
    period: 'Sep 2024 – Present',
    location: 'Mohali, India',
    highlight: true,
    badge: 'FOUNDER',
    subtitle: 'Founder, Teeny Tech Trek · Applied AI | Agentic Systems | AI Strategy | Client Delivery',
    bullets: [
      'Founded and led an AI solutions studio focused on applied AI systems, RAG assistants, agentic workflows, automation, and business-facing AI prototypes.',
      'Worked across discovery, solution design, client communication, workflow mapping, and delivery of AI-enabled systems.',
      'Built practical AI use cases for businesses, moving from problem definition to prototype, implementation, and stakeholder-ready demos.',
      'Developed a strong interest in responsible AI adoption, especially around hallucination control, human-in-the-loop workflows, fallback paths, and business risk.',
    ],
  },
  {
    role: 'Project Manager — Business Dev',
    company: 'Appu International',
    period: 'Jun 2024 – Present',
    location: 'Ludhiana, India',
    highlight: false,
    subtitle: 'Project Manager – Business Development, Appu International · Project Delivery | Stakeholder Management | Client Relations',
    bullets: [
      'Managed project planning and delivery across business-development initiatives, coordinating timelines, scope, and cross-functional stakeholders.',
      'Translated business requirements into actionable project plans, tracking milestones and keeping delivery aligned with client expectations.',
      'Owned client communication and relationship management from initial scoping through delivery and follow-up.',
      '[ADD A MEASURABLE OUTCOME: deals closed, pipeline/revenue growth, or a process-improvement metric.]',
    ],
  },
  {
    role: 'Support Advisor & Entrepreneur',
    company: 'startGBC',
    period: 'May 2023 – Dec 2023',
    location: 'Toronto, Canada',
    highlight: false,
    subtitle: 'Support Advisor & Entrepreneur, startGBC (George Brown College) · Startup Advising | Mentorship | Early-Stage Strategy',
    bullets: [
      "Advised early-stage student founders at George Brown College's entrepreneurship hub on validating ideas, scoping MVPs, and planning go-to-market.",
      'Supported founders through ideation, customer discovery, and pitch preparation within the incubator program.',
      'Built the early entrepreneurial foundation that later led to founding Teeny Tech Trek.',
      '[ADD SPECIFICS: number of founders/teams supported, programs run, or outcomes.]',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'CETPA Infotech Pvt. Ltd.',
    period: 'Feb 2021 – Jul 2021',
    location: 'Noida, India',
    highlight: false,
    subtitle: 'Frontend Developer, CETPA Infotech · Frontend Development | UI Implementation | Web',
    bullets: [
      'Built and maintained responsive web interfaces, turning designs into working, cross-browser frontend code.',
      'Worked with HTML, CSS, and JavaScript [VERIFY + ADD the real framework/libraries used, e.g., React/Angular/Bootstrap] to deliver functional UI components.',
      'Collaborated with the development team on feature implementation and bug fixes.',
      '[ADD SPECIFICS: projects shipped, technologies, or a measurable contribution.]',
    ],
  },
];

// Expandable timeline dot (also a control). tabIndex -1 so it isn't a duplicate
// tab stop — the card header is the primary keyboard control.
function Dot({ exp, open, onToggle, panelId }) {
  return (
    <button
      type="button"
      className="exp-dot-btn tl-dot rounded-full"
      aria-label={`Toggle details for ${exp.role} at ${exp.company}`}
      aria-expanded={open}
      aria-controls={panelId}
      tabIndex={-1}
      onClick={onToggle}
      style={{
        width: open ? '16px' : '11px',
        height: open ? '16px' : '11px',
        background: open ? '#C9A84C' : 'rgba(201,168,76,0.6)',
        boxShadow: open ? '0 0 16px rgba(201,168,76,0.7)' : 'none',
        border: '2px solid #000',
        flexShrink: 0,
        padding: 0,
        cursor: 'pointer',
        display: 'block',
        transition: 'width .35s ease, height .35s ease, background .35s ease, box-shadow .35s ease',
      }}
    />
  );
}

// One card: accessible <button> header (collapsed content, unchanged) + a
// height-morphing expandable panel (subtitle + bullets).
function ExpandableCard({ exp, index, open, onToggle, side, mobile }) {
  const headerId = `exp-header-${index}`;
  const panelId = `exp-panel-${index}`;
  const tlClass = mobile ? 'tl-right' : side === 'left' ? 'tl-left' : 'tl-right';
  const originClass = side === 'right' ? 'exp-card-right' : 'exp-card-left';

  const baseStyle = mobile
    ? {
        background: open ? 'rgba(201,168,76,0.08)' : '#0d0d0d',
        borderLeft: open ? '3px solid #C9A84C' : '3px solid rgba(201,168,76,0.3)',
        boxShadow: open ? '0 0 22px rgba(201,168,76,0.22)' : 'none',
        transformOrigin: 'bottom left',
        transition: 'background .35s ease, border-color .35s ease, box-shadow .35s ease',
      }
    : {
        background: open ? 'rgba(201,168,76,0.08)' : '#0d0d0d',
        border: open ? '1px solid rgba(201,168,76,0.45)' : '1px solid rgba(255,255,255,0.06)',
        boxShadow: open ? '0 0 24px rgba(201,168,76,0.25)' : 'none',
        transformOrigin: side === 'right' ? 'bottom right' : 'bottom left',
        transition: 'background .35s ease, border-color .35s ease, box-shadow .35s ease',
      };

  return (
    <div
      className={`${tlClass} ${originClass} exp-card card p-5 ${mobile ? 'w-full ml-8' : 'w-full max-w-xs'}`}
      style={baseStyle}
    >
      <button type="button" id={headerId} className="exp-header" aria-expanded={open} aria-controls={panelId} onClick={onToggle}>
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
            fontSize: mobile ? '1.3rem' : '1.25rem',
            letterSpacing: '.04em',
            color: open ? '#C9A84C' : '#fff',
            lineHeight: 1.2,
            transition: 'color .35s ease',
          }}
        >
          {exp.role}
        </h3>
        <p className="font-body font-semibold text-sm mt-1" style={{ color: open ? '#fff' : 'rgba(255,255,255,0.65)' }}>
          {exp.company}
        </p>
        <p className="font-body text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
          {exp.period} · {exp.location}
        </p>
      </button>

      <div id={panelId} role="region" aria-labelledby={headerId} className={`exp-panel ${open ? 'open' : ''}`}>
        <div className="exp-panel-inner">
          <div className="exp-content">
            <p className="exp-subtitle">{exp.subtitle}</p>
            <ul className="exp-bullets">
              {exp.bullets.map((b, bi) => (
                <li key={bi}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const timelineRef = useRef(null);
  // Default: the current role (item 0) is open & glowing.
  const [openSet, setOpenSet] = useState(() => new Set([0]));

  const isOpen = (i) => openSet.has(i);
  const toggle = (i) =>
    setOpenSet((prev) => {
      const currentlyOpen = prev.has(i);
      if (SINGLE_OPEN) {
        return currentlyOpen ? new Set() : new Set([i]);
      }
      const next = new Set(prev);
      if (currentlyOpen) next.delete(i);
      else next.add(i);
      return next;
    });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scope = timelineRef.current;
      if (!scope) return;

      const allRevealable = scope.querySelectorAll('.tl-dot, .tl-left, .tl-right');
      const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reduce) {
        gsap.set(allRevealable, { opacity: 1, x: 0, scale: 1 });
        return;
      }

      // Hide initially (in gsap-controlled props only — React inline styles must
      // NOT set opacity/transform, or a re-render on toggle would override these).
      gsap.set(allRevealable, { opacity: 0 });
      gsap.set(scope.querySelectorAll('.tl-dot'), { scale: 0 });

      const items = scope.querySelectorAll('.tl-item');
      const tl = gsap.timeline({ scrollTrigger: getReplayScrollTrigger(scope, { start: 'top 80%' }) });

      items.forEach((item, i) => {
        const at = i * 0.55;
        const dots = item.querySelectorAll('.tl-dot');
        const lefts = item.querySelectorAll('.tl-left');
        const rights = item.querySelectorAll('.tl-right');

        tl.to(dots, { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(2.5)' }, at);
        if (lefts.length) tl.fromTo(lefts, { x: -50 }, { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, at + 0.35);
        if (rights.length) tl.fromTo(rights, { x: 50 }, { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, at + 0.35);
      });
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="py-2 px-6 md:px-14" style={{ background: '#000' }}>
      <style>{`
        .exp-header {
          display: block; width: 100%; text-align: left;
          background: none; border: none; padding: 0; margin: 0;
          font: inherit; color: inherit; cursor: pointer;
        }
        .exp-header:focus-visible { outline: 2px solid #C9A84C; outline-offset: 4px; border-radius: 4px; }
        .exp-dot-btn:focus-visible { outline: 2px solid #C9A84C; outline-offset: 3px; }

        /* Height morph — animate real layout size so text stays crisp */
        .exp-panel {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 420ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .exp-panel.open { grid-template-rows: 1fr; }
        .exp-panel-inner { overflow: hidden; min-height: 0; }

        /* Revealed content fades/slides in from the outer-bottom corner */
        .exp-content {
          opacity: 0;
          transform: translateY(-6px);
          transition: opacity 360ms ease-out 80ms, transform 360ms ease-out 80ms;
        }
        .exp-card-left .exp-content { transform: translate(-10px, -6px); }
        .exp-card-right .exp-content { transform: translate(10px, -6px); }
        .exp-panel.open .exp-content { opacity: 1; transform: translate(0, 0); }

        .exp-subtitle {
          font-family: 'JetBrains Mono', 'DM Sans', monospace;
          font-size: 0.7rem; letter-spacing: 0.03em; line-height: 1.55;
          color: #C9A84C; margin: 0.95rem 0 0.7rem;
        }
        .exp-bullets { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; }
        .exp-bullets li {
          position: relative; padding-left: 1rem;
          font-family: 'DM Sans', sans-serif; font-size: 0.82rem; line-height: 1.55;
          color: rgba(255, 255, 255, 0.62); font-weight: 300;
        }
        .exp-bullets li::before { content: '▹'; position: absolute; left: 0; color: #C9A84C; }

        @media (prefers-reduced-motion: reduce) {
          .exp-panel, .exp-content { transition: none; }
        }
      `}</style>

      <div className="max-w-5xl mx-auto">
        <p className="section-label">03 / My Journey</p>
        <h2 className="section-title text-white mb-16">Experience</h2>

        <div ref={timelineRef} className="relative">

          {/* ── Desktop center line ── */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0"
            style={{
              width: '1px',
              background: 'linear-gradient(to bottom,transparent,#C9A84C 8%,#C9A84C 92%,transparent)',
            }}
          />

          {/* ── Mobile left line ── */}
          <div
            className="md:hidden absolute left-3 top-0 bottom-0"
            style={{
              width: '1px',
              background: 'linear-gradient(to bottom,transparent,#C9A84C 5%,#C9A84C 95%,transparent)',
            }}
          />

          <div className="flex flex-col gap-8">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;
              const open = isOpen(i);
              const panelId = `exp-panel-${i}`;
              return (
                <div key={i} className="relative tl-item">

                  {/* ── Mobile ── */}
                  <div className="md:hidden flex items-start relative">
                    <div style={{ position: 'absolute', left: '6px', top: '1.9rem', zIndex: 2 }}>
                      <Dot exp={exp} open={open} onToggle={() => toggle(i)} panelId={panelId} />
                    </div>
                    <ExpandableCard exp={exp} index={i} open={open} onToggle={() => toggle(i)} side="left" mobile />
                  </div>

                  {/* ── Desktop alternating (top-aligned so the header stays put and the card grows downward; the dot is pinned to the title) ── */}
                  <div className="hidden md:flex items-start relative">
                    <div className="w-[45%] pr-8 flex justify-end">
                      {isLeft && <ExpandableCard exp={exp} index={i} open={open} onToggle={() => toggle(i)} side="left" />}
                    </div>
                    <div className="w-[10%]" />
                    <div className="w-[45%] pl-8 flex justify-start">
                      {!isLeft && <ExpandableCard exp={exp} index={i} open={open} onToggle={() => toggle(i)} side="right" />}
                    </div>
                    <div style={{ position: 'absolute', left: '50%', top: '1.9rem', transform: 'translateX(-50%)', zIndex: 2 }}>
                      <Dot exp={exp} open={open} onToggle={() => toggle(i)} panelId={panelId} />
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
