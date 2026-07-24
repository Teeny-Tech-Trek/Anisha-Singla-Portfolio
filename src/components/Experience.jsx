import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────────────────────
   Experience — scroll-driven accordion timeline (single file, Tailwind).

   BEHAVIOUR (the animation you described):
   • Every card starts COMPACT — only role / company / period visible.
   • As you scroll, the card that reaches the viewport centre EXPANDS
     (tags + bullets slide open), and the previously active card
     COLLAPSES back to compact.
   • Rail fill glows up to the active node, nodes above stay lit,
     click header to expand/collapse manually, reduced-motion safe.
   ────────────────────────────────────────────────────────────── */

const GOLD = '#C9A84C';
const GOLD_LITE = '#E4C976';
const LINE = 'rgba(255,255,255,0.07)';
const NODE_BORDER = 'rgba(201,168,76,0.45)';

const experiences = [
  {
    role: 'Founder & AI Strategist',
    company: 'Teeny Tech Trek',
    period: 'Sep 2024 — Present',
    location: 'Mohali, India (Hybrid / Remote)',
    badge: 'Founder',
    tags: ['Applied AI', 'Agentic Systems', 'AI Strategy', 'Client Delivery'],
    bullets: [
      'Founded and scaled an AI solutions studio delivering production-grade RAG chatbots, AI agents, and workflow automation for 10+ clients across real estate, immigration, and education.',
      'Led end-to-end AI implementation — requirements gathering, solution architecture, LLM/prompt engineering, delivery, and stakeholder management — achieving 100% on-time delivery.',
      'Designed agentic workflows and automations (n8n, APIs, LLM orchestration) that cut client manual effort by ~20 hours/week.',
      'Established Responsible AI and governance practices — data privacy, evaluation, guardrails, human-in-the-loop — across every client deployment.',
      'Managed a team of 5 contractors/developers; owned proposals, pricing, and client success.',
    ],
  },
  {
    role: 'Business Development Manager – International Clients | Automation R&D Lead',
    company: 'Appu International',
    period: 'Jun 2024 — Aug 2026',
    location: 'Ludhiana, India (Hybrid)',
    tags: ['International BD', 'Automation R&D', 'Digital Transformation', 'Industry 4.0'],
    bullets: [
      'Manage end-to-end international client relationships across 3 markets — RFQ, technical quotation, contract negotiation, fulfillment, and after-sales — achieving 90% on-time delivery.',
      'Head an internal R&D initiative to automate manufacturing and business processes; shipped 5 automations (quotation workflows, order tracking, production reporting, inventory alerts) using n8n and LLM tools, reducing manual effort by 10 hours/week.',
      'Piloted machine-level automation and Industry 4.0 upgrades — sensor-based monitoring and finished-product testing — cutting downtime by 3%.',
      "Manage Solvoka, the company's international brand for custom precision steel components; grew export/B2B revenue by opening 2 new automotive-aftermarket accounts.",
      'Serve as internal digital-transformation lead, translating operational pain points into automation requirements across a traditional manufacturing workforce.',
    ],
  },
  {
    role: 'Sales Floor Team Member',
    company: 'Tim Hortons',
    period: 'Sep 2022 — Feb 2024',
    location: 'Toronto, Canada',
    tags: ['Customer Service', 'Teamwork'],
    bullets: [
      'Full-time role while completing two postgraduate programs; developed customer-facing communication and teamwork skills.',
    ],
  },
  {
    role: 'Support Advisor',
    company: 'startGBC, George Brown College',
    period: 'Sep 2023 — Dec 2023',
    location: 'Toronto, Canada',
    tags: ['Startup Advising', 'Program Design', 'Governance'],
    bullets: [
      "Conceptualized and designed the Entrepreneurship Club (EC) powered by startGBC — developed the full launch package: mission and vision, weekly programming model (book club, masterclasses, discussion panels, case-study sessions), and the club's introduction deck and launch-session plan.",
      'Drafted the club’s constitution and governance structure — executive roles, election process, and membership framework — designed for a self-sustaining, student-led operating model with two-year executive terms.',
      'Built the operational plan for the startGBC space (room booking, activity scheduling, member registration workflow); the club subsequently launched and continues to run student-led.',
    ],
  },
  {
    role: 'Entrepreneur Trainee',
    company: 'startGBC, George Brown College',
    period: 'May 2023 — Aug 2023',
    location: 'Toronto, Canada',
    tags: ['Startup Advising', 'Early-Stage Strategy'],
    bullets: [
      "Selected for startGBC's work-integrated learning program; validated a business concept through 10 customer interviews and market analysis, then transitioned into an advisory role supporting other founders.",
    ],
  },
  {
    role: 'IT Implementation & Coordination Specialist',
    company: 'Appu International',
    period: 'Sep 2021 — Jul 2022',
    location: 'Ludhiana, India (Hybrid)',
    tags: ['IT Implementation', 'Change Management', 'Digitization'],
    bullets: [
      'Introduced digital systems into a traditional precision-engineering manufacturer: rolled out inventory management, digital quotation, and order-tracking workflows across 2 departments, replacing paper-based processes.',
      'Gathered requirements from production, sales, and accounts teams; coordinated software vendors through setup, testing, and go-live.',
      'Trained non-technical staff and authored SOPs, driving adoption from 10% to 40% within 3 months and cutting inventory retrieval/reporting time by 2 hours/week.',
    ],
  },
  {
    role: 'Frontend Developer (Internship)',
    company: 'CETPA Infotech Pvt. Ltd.',
    period: 'Feb 2021 — Jul 2021',
    location: 'Noida, India (Remote)',
    tags: ['React.js', 'Data Visualization', 'Frontend'],
    bullets: [
      'Built a COVID-19 tracker dashboard in React.js consuming live public-health REST APIs to display real-time case, recovery, and vaccination data across Indian states.',
      'Designed interactive visualizations (charts, trend graphs, map views) with Chart.js; implemented search, filtering, and fully responsive layouts.',
      'Solved async data-fetching, error-state, and performance challenges, bringing initial load time to under 0.5 seconds.',
    ],
  },
];

const FONT_MONO = 'font-mono';
const FONT_DISPLAY = "font-['Bebas_Neue',sans-serif]";
const FONT_BODY = "font-['DM_Sans',sans-serif]";

function Card({ exp, index, isLeft, onToggle }) {
  const tags = Array.isArray(exp.tags) ? exp.tags : [];
  return (
    <article
      className={`tl-card relative rounded-[14px] border bg-[#0c0c0c] px-6 py-[1.35rem] ${
        isLeft ? 'md:mr-[calc(50%+2.2rem)]' : 'md:ml-[calc(50%+2.2rem)]'
      }`}
      style={{ borderColor: LINE }}
    >
      {/* rail → card connector */}
      <span
        aria-hidden="true"
        className={`tl-conn absolute top-[2.45rem] h-px w-[1.85rem] -left-[1.85rem] bg-gradient-to-l from-[rgba(201,168,76,0.55)] to-[rgba(201,168,76,0.1)] ${
          isLeft
            ? 'md:left-auto md:-right-[2.2rem] md:w-[2.2rem] md:bg-gradient-to-r'
            : 'md:-left-[2.2rem] md:w-[2.2rem]'
        }`}
      />

      {/* active gold sheen */}
      <span
        aria-hidden="true"
        className="tl-glow pointer-events-none absolute inset-0 rounded-[13px] opacity-0 bg-[linear-gradient(180deg,rgba(201,168,76,0.07),rgba(201,168,76,0)_46%)]"
      />

      {exp.badge && (
        <span
          className={`absolute top-[1.1rem] right-[1.1rem] z-[2] rounded-full bg-[#C9A84C] px-[0.6rem] py-[0.24rem] text-[0.58rem] uppercase tracking-[0.2em] text-black ${FONT_MONO}`}
        >
          {exp.badge}
        </span>
      )}

      {/* Header — ALWAYS visible (this is the compact state). Click toggles. */}
      <button
        type="button"
        onClick={() => onToggle(index)}
        aria-expanded="false"
        className="tl-head relative z-[1] block w-full cursor-pointer rounded-[10px] border-0 bg-transparent p-0 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[5px] focus-visible:outline-[#E4C976]"
      >
        <h3
          className={`tl-role m-0 pr-16 text-[1.55rem] leading-[1.05] tracking-[0.03em] text-white ${FONT_DISPLAY}`}
        >
          {exp.role}
        </h3>
        <p
          className={`mt-[0.45rem] mb-[0.2rem] text-[0.92rem] font-medium text-white/70 ${FONT_BODY}`}
        >
          {exp.company}
        </p>
        <p className={`m-0 text-[0.7rem] text-white/[0.46] ${FONT_MONO}`}>
          {exp.period} · {exp.location}
        </p>
      </button>

      {/* Body — COLLAPSED by default (height 0). GSAP expands it when the
          card becomes active while scrolling, and collapses the previous. */}
      <div
        className="tl-body relative z-[1] overflow-hidden"
        style={{ height: 0 }}
      >
        <div className="tl-body-inner pt-[0.1rem]">
          {tags.length > 0 && (
            <div className="mt-[1.1rem] flex flex-wrap gap-[0.4rem]">
              {tags.map((t) => (
                <span
                  key={t}
                  className={`rounded-full border border-[rgba(201,168,76,0.22)] bg-[rgba(201,168,76,0.08)] px-[0.6rem] py-[0.28rem] text-[0.62rem] tracking-[0.03em] text-[rgba(201,168,76,0.92)] ${FONT_MONO}`}
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <ul className="m-0 mt-[1.2rem] flex list-none flex-col gap-[0.68rem] border-t border-white/[0.07] p-0 pt-[1.2rem]">
            {exp.bullets.map((b, i) => {
              const note = b.trim().startsWith('[');
              const text = note ? b.trim().replace(/^\[|\]$/g, '') : b;
              return (
                <li
                  key={i}
                  className={`relative pl-[1.15rem] text-[0.83rem] font-light leading-[1.6] ${FONT_BODY} ${
                    note ? 'italic text-white/40' : 'text-white/[0.65]'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-[0.55em] h-[5px] w-[5px] rotate-45 ${
                      note
                        ? 'border border-white/35 bg-transparent'
                        : 'bg-[#C9A84C]'
                    }`}
                  />
                  {text}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default function Experience() {
  const trackRef = useRef(null);
  const fillRef = useRef(null);
  const apiRef = useRef({ toggle: () => {} });

  useEffect(() => {
    const track = trackRef.current;
    const fillEl = fillRef.current;
    if (!track || !fillEl) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const D = reduce ? 0 : 1;
    const cleanups = [];

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray('.tl-row', track);
      let active = -1;
      let refreshCall = null;

      /* ── rail fill up to the active node ── */
      const fillTo = (i, instant = false) => {
        let h = 0;
        if (i >= 0 && rows[i]) {
          const anchor = rows[i].querySelector('.tl-nodewrap');
          h = rows[i].offsetTop + anchor.offsetTop - fillEl.offsetTop;
        }
        gsap.to(fillEl, {
          height: Math.max(h, 0),
          duration: instant ? 0 : 0.85 * D,
          ease: 'power2.inOut', // same curve as the card body → rail and
          overwrite: 'auto',    // card feel like one connected motion
        });
      };

      /* ── heights change when a card opens/closes, so trigger positions
         must be re-measured. Debounced + fires only AFTER the height
         animation has fully settled, so refresh never mid-tween janks. ── */
      const scheduleRefresh = () => {
        refreshCall?.kill();
        refreshCall = gsap.delayedCall(0.85 * D + 0.1, () => {
          ScrollTrigger.refresh();
        });
      };

      /* ── THE ACCORDION: expand active card's body, collapse the rest ── */
      const setActive = (i) => {
        if (active === i) return;
        active = i;

        rows.forEach((row, j) => {
          const on = j === i;
          const lit = i >= 0 && j <= i;
          const card = row.querySelector('.tl-card');
          const body = row.querySelector('.tl-body');
          const inner = row.querySelector('.tl-body-inner');
          const head = row.querySelector('.tl-head');

          head?.setAttribute('aria-expanded', on ? 'true' : 'false');

          /* body: 0 ↔ content height — measured in px so a mid-scroll
             interruption re-targets smoothly from the current height
             instead of snapping. One symmetric ease both ways, so an
             opening card and the closing one breathe at the same rate
             and the page's total height changes gradually (no jump). */
          gsap.to(body, {
            height: on ? inner.offsetHeight : 0,
            duration: 0.85 * D,
            ease: 'power2.inOut',
            overwrite: 'auto',
            // once fully open, hand height back to the browser so content
            // can reflow naturally on resize while this card stays active
            onComplete: on ? () => gsap.set(body, { height: 'auto' }) : undefined,
          });
          gsap.to(inner, {
            opacity: on ? 1 : 0,
            y: on ? 0 : 18,
            duration: on ? 0.65 * D : 0.4 * D,
            delay: on ? 0.2 * D : 0,
            ease: 'power2.out',
            force3D: true,
            overwrite: 'auto',
          });

          /* card chrome — same duration family as the body so border,
             glow and lift ride along with the height change */
          gsap.to(card, {
            y: on ? -4 : 0,
            borderColor: on ? 'rgba(201,168,76,0.5)' : LINE,
            boxShadow: on
              ? '0 28px 60px -32px rgba(0,0,0,0.95), 0 0 0 1px rgba(201,168,76,0.2), 0 0 34px -6px rgba(201,168,76,0.28)'
              : '0 0 0 0 rgba(0,0,0,0)',
            duration: 0.85 * D,
            ease: 'power2.inOut',
            force3D: true,
            overwrite: 'auto',
          });

          gsap.to(row.querySelector('.tl-glow'), {
            opacity: on ? 1 : 0,
            duration: 0.85 * D,
            ease: 'power2.inOut',
            overwrite: 'auto',
          });

          gsap.to(row.querySelector('.tl-dot'), {
            scale: on ? 1.45 : 1,
            backgroundColor: on ? GOLD_LITE : lit ? GOLD : '#0c0c0c',
            borderColor: on ? '#fff6df' : lit ? GOLD : NODE_BORDER,
            boxShadow: on
              ? '0 0 0 5px rgba(201,168,76,0.16), 0 0 22px rgba(201,168,76,0.8)'
              : '0 0 0 0 rgba(0,0,0,0)',
            duration: 0.6 * D,
            ease: on ? 'back.out(1.6)' : 'power2.out',
            force3D: true,
            overwrite: 'auto',
          });

          gsap.to(row.querySelector('.tl-role'), {
            color: on ? GOLD_LITE : '#ffffff',
            duration: 0.4 * D,
            overwrite: 'auto',
          });

          gsap.to(row.querySelector('.tl-conn'), {
            opacity: on ? 1 : 0.6,
            duration: 0.4 * D,
            overwrite: 'auto',
          });
        });

        fillTo(i);
        scheduleRefresh();
      };

      // click / Enter / Space on the header — manual toggle
      apiRef.current.toggle = (i) => setActive(active === i ? -1 : i);

      /* ── scroll → active: a row is active while its box straddles the
         viewport centre. Fires only on entry, so it can't flicker. ── */
      rows.forEach((row, i) => {
        ScrollTrigger.create({
          trigger: row,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => {
            if (self.isActive) setActive(i);
          },
        });
      });

      /* ── entrance: row slide → node pop → connector draw, once ── */
      if (!reduce) {
        const mm = gsap.matchMedia();
        mm.add(
          { desktop: '(min-width: 820px)', mobile: '(max-width: 819.98px)' },
          (mctx) => {
            const { desktop } = mctx.conditions;
            rows.forEach((row, i) => {
              const isLeft = i % 2 === 0;
              const tl = gsap.timeline({
                defaults: { ease: 'power3.out' },
                scrollTrigger: { trigger: row, start: 'top 88%', once: true },
              });
              tl.from(row, {
                autoAlpha: 0,
                x: desktop ? (isLeft ? -32 : 32) : 0,
                y: 44,
                scale: 0.92,
                duration: 0.9,
              })
                .from(
                  row.querySelector('.tl-dot'),
                  { scale: 0, duration: 0.5, ease: 'back.out(2.5)' },
                  0.15
                )
                .from(
                  row.querySelector('.tl-conn'),
                  {
                    scaleX: 0,
                    transformOrigin:
                      desktop && isLeft ? 'right center' : 'left center',
                    duration: 0.5,
                  },
                  0.2
                );
            });
          }
        );
      }

      /* ── hover lift for non-active cards ── */
      rows.forEach((row, i) => {
        const card = row.querySelector('.tl-card');
        const enter = () => {
          if (active !== i)
            gsap.to(card, {
              y: -2,
              borderColor: 'rgba(201,168,76,0.24)',
              duration: 0.3,
              overwrite: 'auto',
            });
        };
        const leave = () => {
          if (active !== i)
            gsap.to(card, {
              y: 0,
              borderColor: LINE,
              duration: 0.3,
              overwrite: 'auto',
            });
        };
        row.addEventListener('mouseenter', enter);
        row.addEventListener('mouseleave', leave);
        cleanups.push(() => {
          row.removeEventListener('mouseenter', enter);
          row.removeEventListener('mouseleave', leave);
        });
      });

      // keep fill glued to its node across resizes / refreshes
      const onRefresh = () => fillTo(active, true);
      ScrollTrigger.addEventListener('refresh', onRefresh);
      cleanups.push(() =>
        ScrollTrigger.removeEventListener('refresh', onRefresh)
      );
      cleanups.push(() => refreshCall?.kill());

      /* reduced motion: keep everything readable — open ALL bodies */
      if (reduce) {
        rows.forEach((row) => {
          gsap.set(row.querySelector('.tl-body'), { height: 'auto' });
          gsap.set(row.querySelector('.tl-body-inner'), { opacity: 1, y: 0 });
        });
      }

      // initial: first card starts expanded
      requestAnimationFrame(() => {
        if (active === -1) setActive(0);
      });
    }, track);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="experience"
      className="px-6 py-20 text-white md:px-14 md:py-24"
      style={{
        background:
          'radial-gradient(1000px 460px at 50% -14%, rgba(201,168,76,0.06), transparent 62%), #000',
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');`}</style>

      <div className="mx-auto max-w-6xl">
        <p
          className={`m-0 mb-[0.55rem] text-[0.72rem] font-medium uppercase tracking-[0.34em] text-[#C9A84C] ${FONT_MONO}`}
        >
          03 / My Journey
        </p>
        <h2
          className={`m-0 mb-[3.4rem] text-[clamp(2.6rem,6vw,4rem)] leading-[0.95] tracking-[0.02em] text-white ${FONT_DISPLAY}`}
        >
          Experience
        </h2>

        <div ref={trackRef} className="relative">
          {/* rail base */}
          <span
            aria-hidden="true"
            className="absolute top-[0.3rem] bottom-[0.3rem] left-[18px] w-[2px] rounded-[2px] bg-[rgba(201,168,76,0.18)] md:left-[calc(50%-1px)]"
          />
          {/* rail fill */}
          <span
            ref={fillRef}
            aria-hidden="true"
            className="absolute top-[0.3rem] left-[18px] h-0 w-[2px] rounded-[2px] bg-gradient-to-b from-[rgba(201,168,76,0.15)] via-[#C9A84C] via-60% to-[#E4C976] shadow-[0_0_18px_rgba(201,168,76,0.55)] md:left-[calc(50%-1px)]"
          >
            <span className="absolute -bottom-1 left-1/2 h-[10px] w-[10px] -translate-x-1/2 rounded-full bg-[#E4C976] shadow-[0_0_6px_#E4C976,0_0_18px_rgba(201,168,76,0.9),0_0_34px_rgba(201,168,76,0.5)]" />
          </span>

          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={i}
                className="tl-row relative mb-9 pl-[3.2rem] md:mb-10 md:pl-0"
              >
                <span
                  aria-hidden="true"
                  className="tl-nodewrap absolute left-[18px] top-[2.45rem] z-[3] h-0 w-0 md:left-1/2"
                >
                  <span
                    className="tl-dot -ml-[6.5px] -mt-[6.5px] block h-[13px] w-[13px] rounded-full border-2 bg-[#0c0c0c]"
                    style={{ borderColor: NODE_BORDER }}
                  />
                </span>

                <Card
                  exp={exp}
                  index={i}
                  isLeft={isLeft}
                  onToggle={(idx) => apiRef.current.toggle(idx)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}