import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────────────────────
   Experience — scroll-driven accordion timeline (single file, Tailwind).

   BEHAVIOUR:
   • Every card starts COMPACT — only role / company / period visible.
   • As you scroll, the card that reaches the viewport centre EXPANDS
     (tags + bullets slide open), and the previously active card
     COLLAPSES back to compact.
   • Rail fill glows up to the active node, nodes above stay lit,
     click header to expand/collapse manually, reduced-motion safe.
   ────────────────────────────────────────────────────────────── */

const experiences = [
  {
    role: 'Founder & AI Solutions Consultant',
    company: 'Teeny Tech Trek',
    period: 'Sep 2024 — Oct 2026',
    location: 'Remote',
    badge: 'Founder',
    tags: ['Applied AI', 'Agentic Systems', 'AI Strategy', 'Client Delivery'],
    bullets: [
      'Founded and led an AI solutions studio delivering production-grade RAG chatbots, AI agents and workflow automation for 10 clients across real estate, immigration and education.',
      'Led 10 client engagements from first requirement to release, owning scope, delivery and client success, and directing the contractors and developers on each.',
      'Designed agentic workflows and automations (n8n, APIs, LLM orchestration) that cut client manual effort by ~20 hours/week.',
      'Established Responsible AI and governance practices — data privacy, evaluation, guardrails, human-in-the-loop — across every client deployment.',
      'Handed day-to-day leadership to the team lead in October 2026; the studio continues under its team.',
    ],
  },
  {
    role: 'Project Manager',
    company: 'Appu International',
    period: 'Jun 2024 — Aug 2026',
    location: 'Ludhiana, India (Hybrid)',
    tags: ['International BD', 'Automation R&D', 'Digital Transformation', 'Industry 4.0'],
    bullets: [
      'Headed an internal R&D initiative to automate manufacturing and business processes; shipped 5 automations (quotation workflows, order tracking, production reporting, inventory alerts) using n8n and LLM tools, reducing manual effort by 10 hours/week.',
      'Piloted machine-level automation and Industry 4.0 upgrades — sensor-based monitoring and finished-product testing — cutting downtime by 3%.',
      'Served as internal digital-transformation lead, translating operational pain points into automation requirements across a traditional manufacturing workforce.',
      'Managed end-to-end international client relationships across 3 markets — RFQ, technical quotation, contract negotiation, fulfillment, and after-sales — achieving 90% on-time delivery.',
      "Managed Solvoka, the company's international brand for custom precision steel components; grew export/B2B revenue by opening 2 new automotive-aftermarket accounts.",
    ],
  },
  {
    role: 'Sales Floor Team Member',
    company: 'Tim Hortons',
    period: 'Sep 2022 — Feb 2024',
    location: 'Toronto, Canada',
    tags: ['Customer Relations', 'Teamwork'],
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

function Card({ exp, index, isLeft, onToggle, isDark }) {
  const tags = Array.isArray(exp.tags) ? exp.tags : [];
  return (
    <article
      className={`tl-card relative rounded-[14px] border px-6 py-[1.35rem] transition-colors duration-300 ${
        isLeft ? 'md:mr-[calc(50%+2.2rem)]' : 'md:ml-[calc(50%+2.2rem)]'
      }`}
      style={{
        backgroundColor: isDark ? '#0c0c0c' : '#FFFFFF',
        borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)',
        boxShadow: isDark ? 'none' : '0 8px 30px rgba(0, 0, 0, 0.04)',
      }}
    >
      {/* rail → card connector */}
      <span
        aria-hidden="true"
        className={`tl-conn absolute top-[2.45rem] h-px w-[1.85rem] -left-[1.85rem] ${
          isLeft
            ? 'md:left-auto md:-right-[2.2rem] md:w-[2.2rem]'
            : 'md:-left-[2.2rem] md:w-[2.2rem]'
        }`}
        style={{
          background: isDark
            ? (isLeft
                ? 'linear-gradient(to right, rgba(201,168,76,0.55), rgba(201,168,76,0.1))'
                : 'linear-gradient(to left, rgba(201,168,76,0.55), rgba(201,168,76,0.1))')
            : (isLeft
                ? 'linear-gradient(to right, rgba(37,99,235,0.45), rgba(37,99,235,0.1))'
                : 'linear-gradient(to left, rgba(37,99,235,0.45), rgba(37,99,235,0.1))'),
        }}
      />

      {/* active glow sheen */}
      <span
        aria-hidden="true"
        className="tl-glow pointer-events-none absolute inset-0 rounded-[13px] opacity-0"
        style={{
          background: isDark
            ? 'linear-gradient(180deg, rgba(201,168,76,0.07), rgba(201,168,76,0) 46%)'
            : 'linear-gradient(180deg, rgba(37,99,235,0.06), rgba(37,99,235,0) 46%)',
        }}
      />

      {exp.badge && (
        <span
          className={`tl-badge absolute top-[1.1rem] right-[1.1rem] z-[2] rounded-full px-[0.6rem] py-[0.24rem] text-[0.58rem] font-bold uppercase tracking-[0.2em] ${FONT_MONO}`}
          style={{
            backgroundColor: isDark ? '#C9A84C' : '#2563EB',
            color: isDark ? '#000000' : '#FFFFFF',
          }}
        >
          {exp.badge}
        </span>
      )}

      {/* Header — ALWAYS visible (this is the compact state). Click toggles. */}
      <button
        type="button"
        onClick={() => onToggle(index)}
        aria-expanded="false"
        className="tl-head relative z-[1] block w-full cursor-pointer rounded-[10px] border-0 bg-transparent p-0 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[5px]"
        style={{
          outlineColor: isDark ? '#E4C976' : '#2563EB',
        }}
      >
        <h3
          className={`tl-role m-0 pr-16 text-[1.55rem] leading-[1.05] tracking-[0.03em] ${FONT_DISPLAY}`}
          style={{ color: isDark ? '#FFFFFF' : '#111827' }}
        >
          {exp.role}
        </h3>
        <p
          className={`mt-[0.45rem] mb-[0.2rem] text-[0.92rem] font-medium ${FONT_BODY}`}
          style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#4B5563' }}
        >
          {exp.company}
        </p>
        <p
          className={`m-0 text-[0.7rem] ${FONT_MONO}`}
          style={{ color: isDark ? 'rgba(255,255,255,0.46)' : '#6B7280' }}
        >
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
                  className={`tl-tag rounded-full border px-[0.6rem] py-[0.28rem] text-[0.62rem] font-medium tracking-[0.03em] ${FONT_MONO}`}
                  style={{
                    backgroundColor: isDark ? 'rgba(201,168,76,0.08)' : 'rgba(37,99,235,0.07)',
                    borderColor: isDark ? 'rgba(201,168,76,0.22)' : 'rgba(37,99,235,0.22)',
                    color: isDark ? 'rgba(201,168,76,0.92)' : '#1D4ED8',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <ul
            className="m-0 mt-[1.2rem] flex list-none flex-col gap-[0.68rem] p-0 pt-[1.2rem]"
            style={{
              borderTop: isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.08)',
            }}
          >
            {exp.bullets.map((b, i) => {
              const note = b.trim().startsWith('[');
              const text = note ? b.trim().replace(/^\[|\]$/g, '') : b;
              return (
                <li
                  key={i}
                  className={`relative pl-[1.15rem] text-[0.83rem] font-light leading-[1.6] ${FONT_BODY}`}
                  style={{
                    color: note
                      ? (isDark ? 'rgba(255,255,255,0.4)' : '#9CA3AF')
                      : (isDark ? 'rgba(255,255,255,0.65)' : '#374151'),
                    fontStyle: note ? 'italic' : 'normal',
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-[0.55em] h-[5px] w-[5px] rotate-45"
                    style={{
                      backgroundColor: note
                        ? 'transparent'
                        : (isDark ? '#C9A84C' : '#2563EB'),
                      border: note
                        ? (isDark ? '1px solid rgba(255,255,255,0.35)' : '1px solid rgba(0,0,0,0.3)')
                        : 'none',
                    }}
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
  const { isDark } = useTheme();
  const trackRef = useRef(null);
  const fillRef = useRef(null);
  const apiRef = useRef({ toggle: () => {} });

  const GOLD = '#C9A84C';
  const GOLD_LITE = '#E4C976';
  const BLUE = '#2563EB';
  const BLUE_LITE = '#3B82F6';
  const LINE = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)';
  const NODE_BORDER = isDark ? 'rgba(201,168,76,0.45)' : 'rgba(37,99,235,0.35)';

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
          ease: 'power2.inOut',
          overwrite: 'auto',
        });
      };

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

          gsap.to(body, {
            height: on ? inner.offsetHeight : 0,
            duration: 0.85 * D,
            ease: 'power2.inOut',
            overwrite: 'auto',
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

          /* card chrome */
          gsap.to(card, {
            y: on ? -4 : 0,
            borderColor: on ? (isDark ? 'rgba(201,168,76,0.5)' : '#2563EB') : LINE,
            boxShadow: on
              ? (isDark
                  ? '0 28px 60px -32px rgba(0,0,0,0.95), 0 0 0 1px rgba(201,168,76,0.2), 0 0 34px -6px rgba(201,168,76,0.28)'
                  : '0 12px 36px rgba(37,99,235,0.12), 0 0 0 1px rgba(37,99,235,0.25)')
              : (isDark ? '0 0 0 0 rgba(0,0,0,0)' : '0 8px 30px rgba(0, 0, 0, 0.04)'),
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
            backgroundColor: on
              ? (isDark ? GOLD_LITE : BLUE_LITE)
              : lit
              ? (isDark ? GOLD : BLUE)
              : (isDark ? '#0c0c0c' : '#ffffff'),
            borderColor: on
              ? (isDark ? '#fff6df' : '#2563EB')
              : lit
              ? (isDark ? GOLD : BLUE)
              : NODE_BORDER,
            boxShadow: on
              ? (isDark
                  ? '0 0 0 5px rgba(201,168,76,0.16), 0 0 22px rgba(201,168,76,0.8)'
                  : '0 0 0 5px rgba(37,99,235,0.16), 0 0 22px rgba(37,99,235,0.4)')
              : '0 0 0 0 rgba(0,0,0,0)',
            duration: 0.6 * D,
            ease: on ? 'back.out(1.6)' : 'power2.out',
            force3D: true,
            overwrite: 'auto',
          });

          gsap.to(row.querySelector('.tl-role'), {
            color: on ? (isDark ? GOLD_LITE : BLUE) : (isDark ? '#ffffff' : '#111827'),
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

      apiRef.current.toggle = (i) => setActive(active === i ? -1 : i);

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
              borderColor: isDark ? 'rgba(201,168,76,0.24)' : 'rgba(37,99,235,0.24)',
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

      const onRefresh = () => fillTo(active, true);
      ScrollTrigger.addEventListener('refresh', onRefresh);
      cleanups.push(() =>
        ScrollTrigger.removeEventListener('refresh', onRefresh)
      );
      cleanups.push(() => refreshCall?.kill());

      if (reduce) {
        rows.forEach((row) => {
          gsap.set(row.querySelector('.tl-body'), { height: 'auto' });
          gsap.set(row.querySelector('.tl-body-inner'), { opacity: 1, y: 0 });
        });
      }

      requestAnimationFrame(() => {
        if (active === -1) setActive(0);
      });
    }, track);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, [isDark]);

  return (
    <section
      id="experience"
      className="px-6 py-20 md:px-14 md:py-24 transition-colors duration-400"
      style={{
        background: isDark
          ? 'radial-gradient(1000px 460px at 50% -14%, rgba(201,168,76,0.06), transparent 62%), #000'
          : 'radial-gradient(1000px 460px at 50% -14%, rgba(37,99,235,0.05), transparent 62%), #FAF8F5',
        color: isDark ? '#ffffff' : '#111827',
      }}
    >
      <div className="mx-auto max-w-6xl">
        <p
          className={`m-0 mb-[0.55rem] text-[0.72rem] font-medium uppercase tracking-[0.34em] ${FONT_MONO}`}
          style={{ color: isDark ? '#C9A84C' : '#2563EB' }}
        >
          03 / My Journey
        </p>
        <h2
          className={`m-0 mb-[3.4rem] text-[clamp(2.6rem,6vw,4rem)] leading-[0.95] tracking-[0.02em] ${FONT_DISPLAY}`}
          style={{ color: isDark ? '#ffffff' : '#111827' }}
        >
          Experience
        </h2>

        <div ref={trackRef} className="relative">
          {/* rail base */}
          <span
            aria-hidden="true"
            className="absolute top-[0.3rem] bottom-[0.3rem] left-[18px] w-[2px] rounded-[2px] md:left-[calc(50%-1px)]"
            style={{
              backgroundColor: isDark ? 'rgba(201,168,76,0.18)' : 'rgba(37,99,235,0.18)',
            }}
          />
          {/* rail fill */}
          <span
            ref={fillRef}
            aria-hidden="true"
            className="absolute top-[0.3rem] left-[18px] h-0 w-[2px] rounded-[2px] md:left-[calc(50%-1px)]"
            style={{
              background: isDark
                ? 'linear-gradient(to bottom, rgba(201,168,76,0.15), #C9A84C 60%, #E4C976)'
                : 'linear-gradient(to bottom, rgba(37,99,235,0.2), #2563EB 60%, #3B82F6)',
              boxShadow: isDark
                ? '0 0 18px rgba(201,168,76,0.55)'
                : '0 0 14px rgba(37,99,235,0.35)',
            }}
          >
            <span
              className="absolute -bottom-1 left-1/2 h-[10px] w-[10px] -translate-x-1/2 rounded-full"
              style={{
                backgroundColor: isDark ? '#E4C976' : '#3B82F6',
                boxShadow: isDark
                  ? '0 0 6px #E4C976, 0 0 18px rgba(201,168,76,0.9), 0 0 34px rgba(201,168,76,0.5)'
                  : '0 0 6px #3B82F6, 0 0 18px rgba(37,99,235,0.6)',
              }}
            />
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
                    className="tl-dot -ml-[6.5px] -mt-[6.5px] block h-[13px] w-[13px] rounded-full border-2"
                    style={{
                      backgroundColor: isDark ? '#0c0c0c' : '#ffffff',
                      borderColor: NODE_BORDER,
                    }}
                  />
                </span>

                <Card
                  exp={exp}
                  index={i}
                  isLeft={isLeft}
                  onToggle={(idx) => apiRef.current.toggle(idx)}
                  isDark={isDark}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
