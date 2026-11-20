import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../context/ThemeContext';

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

const GOLD = '#FFFFFF';
const GOLD_LITE = 'rgba(255,255,255,0.92)';
const BLUE = '#2563EB';
const BLUE_LITE = '#3B82F6';
const LINE = 'rgba(255,255,255,0.07)';
const NODE_BORDER = 'rgba(255,255,255,0.45)';

const experiences = [
  {
    role: 'AI-Powered Digital Marketing Consultant',
    company: 'APT Growth Digital Inc.',
    period: 'Sep 2026 — Present',
    location: 'Toronto, ON',
    badge: 'Current',
    tags: ['AEO / GEO', 'Answer Engine Optimization', 'AI Strategy', 'Market Research'],
    bullets: [
      'Delivered an answer-engine and generative-engine optimization (AEO/GEO) visibility audit for a client account, testing brand mentions and citations across ChatGPT, Gemini, and Perplexity, and recommending page-level and content-gap changes.',
      'Produce AI-enabled research and strategy documents for internal teams and client accounts.',
      'Apply a Discover, Fix, Publish, Monitor, Benchmark methodology originally developed on an AEO/GEO visibility platform project in 2025.',
    ],
  },
  {
    role: 'Founder & AI Strategist',
    company: 'Teeny Tech Trek',
    period: 'Sep 2024 — Present',
    location: 'Mohali, India (Remote)',
    badge: 'Founder',
    tags: ['Business Analysis', 'Requirements Analysis', 'Generative AI', 'Stakeholder Management', 'Agile Delivery'],
    bullets: [
      'Ran discovery, scoping, and proposals on 15 engagements for 10 clients across six industries: wrote proposals, pricing models, and statements of work (SOW), winning paid work with 5-star client reviews. Several engagements are under NDA and described only in conversation.',
      'Turned ambiguous requirements into specifications, user stories, and acceptance criteria, set sprint priorities and budgets, and signed off on releases built by a team of up to five engineers, employees, and contractors.',
      'Defined method and functional requirements for an AI search visibility (AEO/GEO) platform built with a partner studio on n8n, Python, and Gemini: Discover, Fix, Publish, Monitor, Benchmark.',
      'Set product strategy for three in-house products on a shared agentic engine (NeoScript, NexEstate, NetTwin): target users, pricing models, and model selection. Built by the engineering team; live as demos.',
      'Delivered solo generative image and video previsualisation for an ecotourism pitch (Orlina Ventures) using Google Flow and generative tools; paid and publicly credited.',
      'Facilitated "Unlock AI", a hands-on workshop for business owners; delivered product demonstrations at TiECon Chandigarh 2026.',
      'Since September 2026, the consultancy runs day to day under its team lead; I own client relationships, priorities, and budgets.',
    ],
  },
  {
    role: 'Project Manager',
    company: 'Appu International',
    period: 'Jun 2024 — Aug 2026',
    location: 'Ludhiana, India (Hybrid)',
    tags: ['Project Management', 'Process Improvement', 'Business Automation', 'Vendor Management', 'Export Operations'],
    bullets: [
      'Ran a small team (three staff) across customer handling, export operations, and process improvement within a precision spare-parts manufacturer serving domestic customers and buyers in North America and the Middle East.',
      'Designed five process automations across quotation, order tracking, and production reporting and managed the developer who built them; staff estimated a saving of about 10 hours a week.',
      'Set up the export documentation and logistics process (commercial invoices, packing lists, certificates of origin, and freight-forwarder coordination) with a checklist and tracking system that others could run.',
      'Prepared and negotiated commercial quotations on production costings for domestic and export RFQs.',
      'Managed the agency that built the company’s export brand and website (Solvoka) and ran outbound outreach to overseas buyers.',
      'Founded Teeny Tech Trek during this period with the company’s written agreement.',
    ],
  },
  {
    role: 'Support Advisor',
    company: 'startGBC, George Brown College',
    period: 'Sep 2023 — Dec 2023',
    location: 'Toronto, ON',
    tags: ['Program Design', 'Advising', 'Governance', 'Community Building'],
    bullets: [
      'Paid student advisory position at George Brown College’s entrepreneurship hub.',
      'Authored the Entrepreneurship Club’s constitution, operating plan, and programming model (weekly book club, masterclasses, discussion panels, and case sessions); the club launched and continues student-led.',
      'Ran and co-ran founder workshops and events; advised student founders informally at events and drop-in sessions.',
    ],
  },
  {
    role: 'IT Implementation & Coordination Specialist',
    company: 'Appu International',
    period: 'Sep 2021 — Jul 2022',
    location: 'Ludhiana, India',
    tags: ['IT Implementation', 'Change Management', 'Master Data', 'SOP Authoring', 'Systems Rollout'],
    bullets: [
      'First professional role following B.Tech, assisting a precision-engineering manufacturer in moving from paper-based workflows to digital systems.',
      'Evaluated system options and recommended an inventory and production-tracking platform; coordinated vendor through setup, testing, and go-live in stores and production.',
      'Cleaned master data and reconciled physical stock counts, the most critical phase of rollout; authored standard operating procedures (SOPs) and trained three staff members in group sessions.',
      'Built owner’s Excel reporting models for sales, inventory, and production; configured company domain, email, website, and B2B portal presence.',
    ],
  },
];

const FONT_MONO = 'font-mono';
const FONT_DISPLAY = "font-['Bebas_Neue',sans-serif]";
const FONT_BODY = "font-['DM_Sans',sans-serif]";

function Card({ exp, index, isLeft, onToggle }) {
  const { isDark } = useTheme();
  const tags = Array.isArray(exp.tags) ? exp.tags : [];
  return (
    <article
      className={`tl-card relative rounded-[14px] border px-6 py-[1.35rem] ${
        isLeft ? 'md:mr-[calc(50%+2.2rem)]' : 'md:ml-[calc(50%+2.2rem)]'
      }`}
      style={{
        backgroundColor: isDark ? '#0B2D62' : '#FFFFFF',
        borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)',
        boxShadow: isDark ? '0 10px 30px rgba(0, 0, 0, 0.25)' : '0 8px 30px rgba(0, 0, 0, 0.04)',
      }}
    >
      {/* rail → card connector */}
      <span
        aria-hidden="true"
        className={`tl-conn absolute top-[2.45rem] h-px w-[1.85rem] -left-[1.85rem] bg-gradient-to-l from-[rgba(255,255,255,0.55)] to-[rgba(255,255,255,0.1)] ${isLeft
          ? 'md:left-auto md:-right-[2.2rem] md:w-[2.2rem] md:bg-gradient-to-r'
          : 'md:-left-[2.2rem] md:w-[2.2rem]'
          }`}
      />

      {/* active highlight sheen */}
      <span
        aria-hidden="true"
        className="tl-glow pointer-events-none absolute inset-0 rounded-[13px] opacity-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0)_46%)]"
      />

      {exp.badge && (
        <span
          className={`tl-badge absolute top-[1.1rem] right-[1.1rem] z-[2] rounded-full px-[0.6rem] py-[0.24rem] text-[0.58rem] font-bold uppercase tracking-[0.2em] ${FONT_MONO}`}
          style={{
            backgroundColor: isDark ? '#FFFFFF' : '#2563EB',
            color: isDark ? '#072450' : '#FFFFFF',
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
        className="tl-head relative z-[1] block w-full cursor-pointer rounded-[10px] border-0 bg-transparent p-0 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[5px] focus-visible:outline-white"
      >
        <h3
          className={`tl-role m-0 pr-16 text-[1.55rem] leading-[1.05] tracking-[0.03em] ${FONT_DISPLAY}`}
          style={{ color: isDark ? '#FFFFFF' : '#111827' }}
        >
          {exp.role}
        </h3>
        <p
          className={`mt-[0.45rem] mb-[0.2rem] text-[0.92rem] font-medium ${FONT_BODY}`}
          style={{ color: isDark ? 'rgba(255,255,255,0.72)' : '#374151' }}
        >
          {exp.company}
        </p>
        <p
          className={`m-0 text-[0.7rem] ${FONT_MONO}`}
          style={{ color: isDark ? 'rgba(255,255,255,0.48)' : '#6B7280' }}
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
        <div className="tl-body-inner flow-root pt-[0.1rem]">
          {tags.length > 0 && (
            <div className="mt-[1.1rem] flex flex-wrap gap-[0.4rem]">
              {tags.map((t) => (
                <span
                  key={t}
                  className={`rounded-full border px-[0.6rem] py-[0.28rem] text-[0.62rem] tracking-[0.03em] ${FONT_MONO}`}
                  style={{
                    borderColor: isDark ? 'rgba(255,255,255,0.22)' : 'rgba(37,99,235,0.25)',
                    backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(37,99,235,0.06)',
                    color: isDark ? 'rgba(255,255,255,0.92)' : '#1D4ED8',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <ul
            className="m-0 mt-[1.2rem] flex list-none flex-col gap-[0.68rem] border-t p-0 pt-[1.2rem]"
            style={{ borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)' }}
          >
            {exp.bullets.map((b, i) => {
              const note = b.trim().startsWith('[');
              const text = note ? b.trim().replace(/^\[|\]$/g, '') : b;
              return (
                <li
                  key={i}
                  className={`relative pl-[1.15rem] text-[0.83rem] font-light leading-[1.6] ${FONT_BODY} ${note ? 'italic' : ''}`}
                  style={{
                    color: note
                      ? (isDark ? 'rgba(255,255,255,0.4)' : '#6B7280')
                      : (isDark ? 'rgba(255,255,255,0.72)' : '#374151'),
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-[0.55em] h-[5px] w-[5px] rotate-45"
                    style={{
                      backgroundColor: note ? 'transparent' : (isDark ? '#FFFFFF' : '#2563EB'),
                      border: note ? `1px solid ${isDark ? 'rgba(255,255,255,0.35)' : '#9CA3AF'}` : 'none',
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
  const apiRef = useRef({ toggle: () => { } });

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
      let manualLockUntil = 0;
      let refreshCall = null;

      const ACCORDION_DUR = 1.65 * D;

      /* ── rail fill down to the active node ── */
      const fillTo = (i, instant = false) => {
        let h = 0;
        if (i >= 0 && rows[i]) {
          const anchor = rows[i].querySelector('.tl-nodewrap');
          h = rows[i].offsetTop + anchor.offsetTop - fillEl.offsetTop;
        }
        gsap.to(fillEl, {
          height: Math.max(h, 0),
          duration: instant ? 0 : ACCORDION_DUR,
          ease: 'sine.inOut',
          overwrite: 'auto',
        });
      };

      /* ── re-measure downstream ScrollTriggers after accordion settles ── */
      const scheduleRefresh = () => {
        refreshCall?.kill();
        refreshCall = gsap.delayedCall(ACCORDION_DUR + 0.12, () => {
          ScrollTrigger.refresh();
        });
      };

      /* ── 1-active-card accordion with matched expand/collapse timing ── */
      const setActive = (idx) => {
        if (idx === active) return;
        active = idx;

        rows.forEach((row, j) => {
          const on = j === idx;
          const card = row.querySelector('.tl-card');
          const body = row.querySelector('.tl-body');
          const inner = row.querySelector('.tl-body-inner');
          const head = row.querySelector('.tl-head');

          head?.setAttribute('aria-expanded', on ? 'true' : 'false');

          // Lock current pixel height before collapsing from 'auto' to prevent frame-1 snap
          if (!on && body.style.height === 'auto') {
            gsap.set(body, { height: body.getBoundingClientRect().height });
          }

          const targetHeight = on
            ? Math.ceil(inner.getBoundingClientRect().height || inner.scrollHeight)
            : 0;

          gsap.to(body, {
            height: targetHeight,
            duration: ACCORDION_DUR,
            ease: 'sine.inOut',
            overwrite: 'auto',
            onComplete: on ? () => gsap.set(body, { height: 'auto' }) : undefined,
          });

          gsap.to(inner, {
            opacity: on ? 1 : 0,
            y: on ? 0 : 12,
            duration: on ? 1.15 * D : 0.75 * D,
            delay: on ? 0.18 * D : 0,
            ease: 'power2.out',
            force3D: true,
            overwrite: 'auto',
          });

          gsap.to(card, {
            y: on ? -4 : 0,
            borderColor: on
              ? (isDark ? 'rgba(255,255,255,0.5)' : 'rgba(37,99,235,0.45)')
              : (isDark ? LINE : 'rgba(0,0,0,0.08)'),
            boxShadow: on
              ? (isDark
                  ? '0 28px 60px -32px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,255,255,0.22), 0 0 34px -6px rgba(255,255,255,0.22)'
                  : '0 18px 40px -20px rgba(37,99,235,0.22), 0 0 0 1px rgba(37,99,235,0.18)')
              : (isDark ? '0 10px 30px rgba(0, 0, 0, 0.25)' : '0 8px 30px rgba(0, 0, 0, 0.04)'),
            duration: ACCORDION_DUR,
            ease: 'sine.inOut',
            force3D: true,
            overwrite: 'auto',
          });

          gsap.to(row.querySelector('.tl-glow'), {
            opacity: on ? 1 : 0,
            duration: ACCORDION_DUR,
            ease: 'sine.inOut',
            overwrite: 'auto',
          });

          gsap.to(row.querySelector('.tl-dot'), {
            scale: on ? 1.35 : 1,
            backgroundColor: on
              ? (isDark ? GOLD_LITE : BLUE_LITE)
              : (isDark ? '#0B2D62' : '#ffffff'),
            borderColor: on
              ? (isDark ? '#ffffff' : '#2563EB')
              : NODE_BORDER,
            boxShadow: on
              ? (isDark
                  ? '0 0 0 5px rgba(255,255,255,0.16), 0 0 22px rgba(255,255,255,0.7)'
                  : '0 0 0 5px rgba(37,99,235,0.14), 0 0 18px rgba(37,99,235,0.55)')
              : '0 0 0 0 rgba(0,0,0,0)',
            duration: 1.0 * D,
            ease: on ? 'back.out(1.4)' : 'power2.out',
            force3D: true,
            overwrite: 'auto',
          });

          gsap.to(row.querySelector('.tl-role'), {
            color: on ? (isDark ? GOLD_LITE : BLUE) : (isDark ? '#ffffff' : '#111827'),
            duration: 0.8 * D,
            overwrite: 'auto',
          });

          gsap.to(row.querySelector('.tl-conn'), {
            opacity: on ? 1 : 0.6,
            duration: 0.8 * D,
            overwrite: 'auto',
          });
        });

        fillTo(idx);
        scheduleRefresh();
      };

      // click / Enter / Space on the header — manual accordion toggle
      apiRef.current.toggle = (i) => {
        manualLockUntil = Date.now() + 900;
        setActive(active === i ? -1 : i);
      };

      /* ── initialize all cards collapsed so each expands cleanly as you scroll to it ── */
      if (!reduce) {
        rows.forEach((row) => {
          gsap.set(row.querySelector('.tl-body'), { height: 0 });
          gsap.set(row.querySelector('.tl-body-inner'), { opacity: 0, y: 12 });
        });
      }

      /* ── scroll → activate the card closest to the reading focal zone without cascade skips ── */
      const pickActiveOnScroll = () => {
        if (Date.now() < manualLockUntil) return;

        const vh = window.innerHeight || 800;
        const focusY = vh * 0.46;
        let bestIdx = -1;
        let bestDist = Infinity;

        rows.forEach((row, i) => {
          const head = row.querySelector('.tl-head') || row;
          const rect = head.getBoundingClientRect();
          if (rect.bottom < 0 || rect.top > vh * 0.85) return;
          const center = rect.top + rect.height * 0.5;
          const dist = Math.abs(center - focusY);
          if (dist < bestDist) {
            bestDist = dist;
            bestIdx = i;
          }
        });

        if (bestIdx !== -1 && bestIdx !== active) {
          if (active >= 0) {
            const activeHead = rows[active]?.querySelector('.tl-head') || rows[active];
            const activeRect = activeHead.getBoundingClientRect();
            const activeCenter = activeRect.top + activeRect.height * 0.5;
            const activeDist = Math.abs(activeCenter - focusY);
            // Hysteresis prevents flip-flopping while card heights shift smoothly
            if (bestDist > activeDist - 36 && activeRect.bottom > 40 && activeRect.top < vh * 0.85) {
              return;
            }
          }
          setActive(bestIdx);
        }
      };

      ScrollTrigger.create({
        trigger: track,
        start: 'top 76%',
        end: 'bottom 22%',
        onEnter: () => {
          if (Date.now() >= manualLockUntil) setActive(0);
        },
        onUpdate: pickActiveOnScroll,
        onLeaveBack: () => {
          if (Date.now() >= manualLockUntil) setActive(-1);
        },
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
                y: 36,
                scale: 0.96,
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

      /* ── hover lift for collapsed cards ── */
      rows.forEach((row, i) => {
        const card = row.querySelector('.tl-card');
        const enter = () => {
          if (active !== i)
            gsap.to(card, {
              y: -2,
              borderColor: isDark ? 'rgba(255,255,255,0.24)' : 'rgba(37,99,235,0.25)',
              duration: 0.3,
              overwrite: 'auto',
            });
        };
        const leave = () => {
          if (active !== i)
            gsap.to(card, {
              y: 0,
              borderColor: isDark ? LINE : 'rgba(0,0,0,0.08)',
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
    }, track);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, [isDark]);

  return (
    <section
      id="experience"
      className="px-6 py-20 text-white md:px-14 md:py-24"
      style={{
        background: isDark
          ? '#072450'
          : 'radial-gradient(1000px 460px at 50% -14%, rgba(37,99,235,0.05), transparent 62%), #FAF8F5',
        color: isDark ? '#ffffff' : '#111827',
      }}
    >
      {/* Fonts are loaded once via a <link> in index.html — see index.html. */}

      <div className="mx-auto max-w-6xl">
        <p
          className={`m-0 mb-[0.55rem] text-[0.72rem] font-medium uppercase tracking-[0.34em] ${FONT_MONO}`}
          style={{ color: isDark ? '#FFFFFF' : '#2563EB' }}
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
            className="tl-railbase absolute top-[0.3rem] bottom-[0.3rem] left-[18px] w-[2px] rounded-[2px] md:left-[calc(50%-1px)]"
            style={{
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.18)' : '#3B82F6',
              opacity: isDark ? 1 : 0.55,
            }}
          />
          {/* rail fill */}
          <span
            ref={fillRef}
            aria-hidden="true"
            className="tl-fill absolute top-[0.3rem] left-[18px] h-0 w-[2px] rounded-[2px] md:left-[calc(50%-1px)]"
            style={{
              background: isDark
                ? 'linear-gradient(to bottom, rgba(255,255,255,0.15), #ffffff 60%, #ffffff)'
                : 'linear-gradient(to bottom, rgba(59,130,246,0.3), #2563EB 60%, #1D4ED8)',
              boxShadow: isDark
                ? '0 0 18px rgba(255,255,255,0.45)'
                : '0 0 14px rgba(37,99,235,0.5)',
            }}
          >
            <span
              className="absolute -bottom-1 left-1/2 h-[10px] w-[10px] -translate-x-1/2 rounded-full"
              style={{
                backgroundColor: isDark ? '#ffffff' : '#2563EB',
                boxShadow: isDark
                  ? '0 0 6px #ffffff, 0 0 18px rgba(255,255,255,0.85), 0 0 34px rgba(255,255,255,0.45)'
                  : '0 0 6px #2563EB, 0 0 16px rgba(37,99,235,0.7), 0 0 28px rgba(37,99,235,0.4)',
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
                      backgroundColor: isDark ? '#0B2D62' : '#ffffff',
                      borderColor: NODE_BORDER,
                    }}
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