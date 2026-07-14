import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import './Experience.css';


/* ──────────────────────────────────────────────────────────────
   Experience — scroll-driven FOCUS timeline (center rail).

   Instead of click-to-expand, expand/collapse is driven by scroll:
   the item whose rail NODE sits closest to the vertical centre of
   the viewport becomes ACTIVE. Exactly one item is active at a time.

   • ACTIVE  → expands into a big container (tags + bullets reveal),
               1px gold border, soft glow, slight lift, gold role text,
               enlarged glowing node.
   • OTHERS  → collapse to a compact header-only card, slightly dimmed.
   As you scroll, the next item hands off from the previous one
   smoothly and continuously.

   Kept from the original: center vertical rail, alternating L/R layout,
   rail nodes, rail→card connector, the black+gold palette, the fonts,
   the spacing, and the section header. Mobile stays a single left rail.

   Self-contained (no gsap / hooks) so it drops in clean and previews
   live without touching other sections.
   ────────────────────────────────────────────────────────────── */

/* ── behaviour flags ─────────────────────────────────────────────
   AUTO_ON_SCROLL = true  → scroll position drives the active item
                            (headers still toggle on click/keyboard).
   AUTO_ON_SCROLL = false → pure click-to-toggle; scroll does nothing.
   HYSTERESIS_PX          → dead-zone so the active item doesn't rapidly
                            flip back and forth at the boundary between
                            two items. The new candidate must beat the
                            current active by more than this many px. */
const AUTO_ON_SCROLL = true;
const HYSTERESIS_PX = 64;

const experiences = [
  {
    role: 'Founder & CEO',
    company: 'Teeny Tech Trek',
    period: 'Sep 2024 — Present',
    location: 'Mohali, India',
    badge: 'Founder',
    tags: ['Applied AI', 'Agentic Systems', 'AI Strategy', 'Client Delivery'],
    bullets: [
      'Founded and led an AI solutions studio focused on applied AI systems, RAG assistants, agentic workflows, automation, and business-facing prototypes.',
      'Worked across discovery, solution design, client communication, workflow mapping, and delivery of AI-enabled systems.',
      'Built practical AI use cases for businesses — from problem definition to prototype, implementation, and stakeholder-ready demos.',
      'Championed responsible AI adoption: hallucination control, human-in-the-loop workflows, fallback paths, and business risk.',
    ],
  },
  {
    role: 'Project Manager — Business Dev',
    company: 'Appu International',
    period: 'Jun 2024 — Present',
    location: 'Ludhiana, India',
    tags: ['Project Delivery', 'Stakeholder Management', 'Client Relations'],
    bullets: [
      'Managed planning and delivery across business-development initiatives, coordinating timelines, scope, and cross-functional stakeholders.',
      'Translated business requirements into actionable project plans, tracking milestones and keeping delivery aligned with client expectations.',
      'Owned client communication and relationship management from initial scoping through delivery and follow-up.',
      '[Add a measurable outcome — deals closed, pipeline / revenue growth, or a process-improvement metric.]',
    ],
  },
  {
    role: 'Support Advisor & Entrepreneur',
    company: 'startGBC',
    period: 'May 2023 — Dec 2023',
    location: 'Toronto, Canada',
    tags: ['Startup Advising', 'Mentorship', 'Early-Stage Strategy'],
    bullets: [
      "Advised early-stage student founders at George Brown College's entrepreneurship hub on validating ideas, scoping MVPs, and go-to-market.",
      'Supported founders through ideation, customer discovery, and pitch preparation within the incubator program.',
      'Built the early entrepreneurial foundation that later led to founding Teeny Tech Trek.',
      '[Add specifics — number of founders / teams supported, programs run, or outcomes.]',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'CETPA Infotech Pvt. Ltd.',
    period: 'Feb 2021 — Jul 2021',
    location: 'Noida, India',
    tags: ['Frontend Development', 'UI Implementation', 'Web'],
    bullets: [
      'Built and maintained responsive web interfaces, turning designs into working, cross-browser frontend code.',
      'Worked with HTML, CSS, and JavaScript [verify + add the real framework / libraries used] to deliver functional UI components.',
      'Collaborated with the development team on feature implementation and bug fixes.',
      '[Add specifics — projects shipped, technologies used, or a measurable contribution.]',
    ],
  },
];

// Tags come from `tags`, or fall back to splitting a `subtitle` on "|".
function getTags(exp) {
  if (Array.isArray(exp.tags) && exp.tags.length) return exp.tags;
  if (typeof exp.subtitle === 'string') {
    return exp.subtitle.split('|').map((t) => t.trim()).filter(Boolean);
  }
  return [];
}

function Card({ exp, index, isActive, onToggle }) {
  const panelId = `tl-panel-${index}`;
  const tags = getTags(exp);

  return (
    <article className="tl-card">
      {exp.badge && <span className="tl-badge">{exp.badge}</span>}

      {/* Header is a real button → click + Enter/Space toggle, keyboard
          accessible, with aria-expanded / aria-controls. Scroll drives
          the exact same active state. */}
      <button
        type="button"
        className="tl-head"
        aria-expanded={isActive}
        aria-controls={panelId}
        onClick={() => onToggle(index)}
      >
        <h3 className="tl-role">{exp.role}</h3>
        <p className="tl-co">{exp.company}</p>
        <p className="tl-meta">{exp.period} · {exp.location}</p>
      </button>

      {/* CSS-grid reveal: real layout height animates 0fr → 1fr so text
          stays crisp (no scaleY fakery). Inner content fades/slides in
          slightly after the height opens. */}
      <div id={panelId} className="tl-reveal" role="region" aria-hidden={!isActive}>
        <div className="tl-reveal-inner">
          <div className="tl-reveal-content">
            {tags.length > 0 && (
              <div className="tl-tags">
                {tags.map((t) => (
                  <span key={t} className="tl-tag">{t}</span>
                ))}
              </div>
            )}

            <ul className="tl-bullets">
              {exp.bullets.map((b, i) => {
                const note = b.trim().startsWith('[');
                const text = note ? b.trim().replace(/^\[|\]$/g, '') : b;
                return <li key={i} className={note ? 'note' : ''}>{text}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Experience() {
  const track = useRef(null);
  const fill = useRef(null);
  const activeRef = useRef(0);            // mirror of activeIndex for use inside listeners
  const rafRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);

  // Position the gold rail fill so its glowing leading edge sits at the
  // ACTIVE node. Uses rect deltas (scroll-independent) and re-reads live
  // so it can follow the node as the active card expands and shifts the
  // ones below it.
  const syncFill = useCallback(() => {
    const bar = fill.current;
    const trackEl = track.current;
    if (!bar || !trackEl) return;
    const nodes = trackEl.querySelectorAll('.tl-node');
    const ai = activeRef.current;
    if (ai < 0 || !nodes[ai]) { bar.style.height = '0px'; return; }
    const tr = trackEl.getBoundingClientRect();
    const nr = nodes[ai].getBoundingClientRect();
    bar.style.height = `${(nr.top - tr.top) + nr.height / 2}px`;
  }, []);

  // ── one-by-one entrance: each row reveals as it scrolls into view ──
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const rows = el.querySelectorAll('.tl-row');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      rows.forEach((r) => r.classList.add('seen'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('seen')),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  // ── scroll → active: the node nearest the viewport centre wins ──
  useEffect(() => {
    if (!AUTO_ON_SCROLL) { syncFill(); return; }
    const el = track.current;
    if (!el) return;

    const update = () => {
      rafRef.current = 0;
      const nodes = el.querySelectorAll('.tl-node');
      if (!nodes.length) return;
      const center = window.innerHeight / 2;

      // Compare NODE centres (which barely move) to the viewport centre —
      // NOT the expanding card heights — so the active pick doesn't flicker.
      let best = 0;
      let bestD = Infinity;
      nodes.forEach((node, i) => {
        const r = node.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - center);
        if (d < bestD) { bestD = d; best = i; }
      });

      // Hysteresis: keep the current active unless the new candidate is
      // meaningfully closer, so the boundary between two items is stable.
      const cur = activeRef.current;
      if (best !== cur && nodes[cur]) {
        const cr = nodes[cur].getBoundingClientRect();
        const curD = Math.abs(cr.top + cr.height / 2 - center);
        if (curD - bestD < HYSTERESIS_PX) best = cur;
      }

      if (best !== activeRef.current) {
        activeRef.current = best;
        setActiveIndex(best);
      }
      syncFill();
    };

    const onScroll = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, [syncFill]);

  // Keep the fill glued to the active node while the card height animates
  // (there are no scroll events during the ~0.45s expand, so follow it here).
  useLayoutEffect(() => {
    activeRef.current = activeIndex;
    syncFill();
    let raf = 0;
    let start = null;
    const DURATION = 600;

    const tick = (t) => {
      if (start === null) start = t;
      syncFill();
      if (t - start < DURATION) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [activeIndex, syncFill]);

  // Manual control: click / keyboard toggles the same active state.
  // Toggling the active item collapses it (activeIndex = -1); when
  // AUTO_ON_SCROLL is on the next scroll re-selects the centre item.
  const handleToggle = useCallback((index) => {
    setActiveIndex((prev) => {
      const next = prev === index ? -1 : index;
      activeRef.current = next;
      return next;
    });
  }, []);

  return (
    <section id="experience" className="tl">
      <div className="tl-wrap">
        <p className="tl-label">03 / My Journey</p>
        <h2 className="tl-title">Experience</h2>

        <div ref={track} className="tl-track">
          <span className="tl-railbase" aria-hidden="true" />
          <span ref={fill} className="tl-fill" aria-hidden="true" />

          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0;
            const isActive = i === activeIndex;
            // nodes at or above the active one stay lit
            const isLit = activeIndex >= 0 && i <= activeIndex;
            return (
              <div
                key={i}
                className={`tl-row ${isLeft ? 'left' : 'right'}${isActive ? ' is-active' : ''}${isLit ? ' is-lit' : ''}`}
              >
                <span className="tl-node" aria-hidden="true" />
                <Card exp={exp} index={i} isActive={isActive} onToggle={handleToggle} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
