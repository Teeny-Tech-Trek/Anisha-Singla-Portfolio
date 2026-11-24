import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projectsData';
import { navigateTo, ROUTES } from '../routes';
import ProjectLinks from './ProjectLinks';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ p, featured = false }) {
  const cardRef = useRef(null);

  // Only projects with an available case study route open a case study on click.
  const clickable = !!p.links?.caseStudy;

  const handleCardClick = (e) => {
    if (e.target.closest('a') || e.target.closest('button')) return;
    if (clickable) {
      navigateTo(p.links.caseStudy);
    }
  };

  const handleKeyDown = (e) => {
    if (!clickable) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigateTo(p.links.caseStudy);
    }
  };

  const handleEnter = () => {
    gsap.to(cardRef.current, {
      y: featured ? -4 : -7,
      duration: 0.35,
      ease: 'power2.out',
      boxShadow: '0 20px 50px rgba(37,99,235,0.2), 0 8px 24px rgba(0,0,0,0.12)',
    });
    const arrow = cardRef.current.querySelector('.card-arrow');
    if (arrow) gsap.to(arrow, { x: 5, opacity: 1, duration: 0.3 });
  };

  const handleLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      duration: 0.35,
      ease: 'power2.out',
      boxShadow: '0 10px 30px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
    });
    const arrow = cardRef.current.querySelector('.card-arrow');
    if (arrow) gsap.to(arrow, { x: 0, opacity: 0, duration: 0.3 });
  };

  return (
    <div
      ref={cardRef}
      role={clickable ? 'link' : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-label={clickable ? `${p.title} — open case study` : undefined}
      className="relative overflow-hidden h-full rounded-xl"
      style={{
        background: '#FFFFFF',
        border: '1px solid rgba(37,99,235,0.16)',
        borderTop: '3px solid #2563EB',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
        transition: 'box-shadow .35s ease',
        height: '100%',
        cursor: clickable ? 'pointer' : 'default',
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={clickable ? handleCardClick : undefined}
      onKeyDown={clickable ? handleKeyDown : undefined}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(37,99,235,0.02) 0%, transparent 60%)' }} />

      <div className={`relative z-10 flex flex-col h-full ${featured ? 'p-8 md:p-10' : 'p-6 min-h-[260px]'}`}>
        {/* Badges */}
        <div className="flex items-center justify-between gap-2 mb-5 w-full">
          <span
            className="font-body text-[10px] tracking-wider uppercase px-2.5 py-1 rounded truncate max-w-[70%]"
            title={p.category}
            style={{
              background: 'rgba(37,99,235,0.08)',
              color: '#1D4ED8',
              border: '1px solid rgba(37,99,235,0.22)',
              fontWeight: 600,
            }}
          >
            {p.category}
          </span>

          <span
            className="font-body text-[10px] tracking-widest uppercase px-2.5 py-1 rounded shrink-0"
            style={{
              background: 'rgba(37,99,235,0.05)',
              color: '#2563EB',
              border: '1px solid rgba(37,99,235,0.18)',
              fontWeight: 600,
            }}
          >
            {p.year}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-title mb-2"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: featured ? 'clamp(2rem,3.5vw,2.8rem)' : '1.75rem',
            letterSpacing: '.04em',
            lineHeight: 1.05,
            color: '#1D4ED8',
          }}
        >
          {p.title}
        </h3>

        {/* Role */}
        {p.role && (
          <p
            className="font-body text-xs tracking-wide mb-3"
            style={{ color: '#2563EB', fontWeight: 600 }}
          >
            My Role: {p.role}
          </p>
        )}

        {/* Desc */}
        <p
          className="font-body text-base leading-relaxed flex-1"
          style={{
            color: '#334155',
            fontWeight: 400,
            display: featured ? 'block' : '-webkit-box',
            WebkitLineClamp: featured ? 'unset' : 2,
            WebkitBoxOrient: 'vertical',
            overflow: featured ? 'visible' : 'hidden',
          }}
        >
          {p.description}
        </p>

        {/* Footer */}
        <div className="mt-5">
          {/* Tech/method tags are inert labels: stop propagation so clicks here do not navigate. */}
          <div
            className="flex flex-wrap gap-1.5 mb-4 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {p.tags.map((t) => (
              <span
                key={t}
                className="font-body text-xs px-2.5 py-1 rounded"
                style={{
                  background: 'rgba(37,99,235,0.06)',
                  color: '#1D4ED8',
                  border: '1px solid rgba(37,99,235,0.18)',
                  fontWeight: 500,
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <div
            className="flex items-center justify-between"
            style={{
              borderTop: '1px solid rgba(37,99,235,0.12)',
              paddingTop: '1rem',
            }}
          >
            <span
              className="font-body text-xs tracking-widest font-medium"
              style={{ color: '#2563EB' }}
            >
              {p.year}
            </span>
            {clickable && (
              <span
                aria-hidden="true"
                className="card-arrow font-body text-sm opacity-0 font-bold"
                style={{ color: '#2563EB' }}
              >
                →
              </span>
            )}
          </div>
        </div>

        {/* Action links — only render buttons for links that exist */}
        <ProjectLinks project={p} />
      </div>
    </div>
  );
}

export default function Projects() {
  const { isDark } = useTheme();
  const accent = isDark ? '#FFFFFF' : '#2563EB';
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);

  const visible = projects.slice(0, 5);
  const featured = visible[0];
  const rest = visible.slice(1);

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [
            headingRef.current?.querySelectorAll('.reveal'),
            '.feat-card',
            '.proj-card',
            '.view-all-btn',
          ],
          { opacity: 1, y: 0, x: 0, scale: 1 }
        );
        return;
      }

      // 1. Heading — smooth reveal
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.querySelectorAll('.reveal'),
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 88%',
              once: true,
            },
          }
        );
      }

      // 2. Featured card — animate cleanly from bottom UP once
      const featCard = sectionRef.current?.querySelector('.feat-card');
      if (featCard) {
        gsap.fromTo(
          featCard,
          { opacity: 0, y: 45 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: featCard,
              start: 'top 92%',
              once: true,
            },
          }
        );
      }

      // 3. Grid cards — animate from bottom UP with smooth stagger once
      const projCards = gridRef.current?.querySelectorAll('.proj-card') ?? [];
      if (projCards.length > 0) {
        gsap.fromTo(
          projCards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 92%',
              once: true,
            },
          }
        );
      }

      // 4. View all button
      const viewAllBtn = sectionRef.current?.querySelector('.view-all-btn');
      if (viewAllBtn) {
        gsap.fromTo(
          viewAllBtn,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: viewAllBtn,
              start: 'top 95%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 md:py-28 px-6 md:px-14 relative"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          style={{
            position: 'absolute',
            top: '8%',
            right: '-8%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: isDark
              ? 'radial-gradient(circle,rgba(255,255,255,0.05) 0%,transparent 70%)'
              : 'radial-gradient(circle,rgba(37,99,235,0.05) 0%,transparent 70%)',
            filter: 'blur(60px)',
            contain: 'paint',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '8%',
            left: '-8%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle,rgba(100,150,255,0.04) 0%,transparent 70%)',
            filter: 'blur(60px)',
            contain: 'paint',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="mb-14">
          <p className="reveal section-label">04 / Selected Work</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="reveal section-title" style={{ color: isDark ? '#FFFFFF' : '#111827' }}>
              Selected Work
            </h2>
            <p
              className="reveal font-body text-sm max-w-xs"
              style={{ color: isDark ? 'rgba(255,255,255,0.62)' : '#4B5563', fontWeight: 300, lineHeight: 1.7 }}
            >
              Selected examples of AI product strategy, workflow improvement, and implementation planning.
            </p>
          </div>
          <div
            className="reveal mt-8"
            style={{
              height: '1px',
              background: isDark
                ? 'linear-gradient(to right,#FFFFFF,rgba(255,255,255,0.08))'
                : 'linear-gradient(to right,#2563EB,rgba(37,99,235,0.08))',
            }}
          />
        </div>

        {/* Featured full-width */}
        <div className="feat-card mb-6">
          <ProjectCard p={featured} featured={true} />
        </div>

        {/* 4-col grid for desktop, 2-col for tablet */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {rest.map((p) => (
            <div key={p.id} className="proj-card h-full">
              <ProjectCard p={p} />
            </div>
          ))}
        </div>

        {/* View All */}
        {projects.length > 5 && (
          <div className="view-all-btn mt-14 flex justify-center">
            <a
              href={ROUTES.PROJECTS}
              onClick={(e) => {
                e.preventDefault();
                navigateTo(ROUTES.PROJECTS);
              }}
              className="font-body flex items-center gap-3 transition-all duration-300"
              style={{
                fontWeight: 600,
                fontSize: '.72rem',
                letterSpacing: '.2em',
                textTransform: 'uppercase',
                color: accent,
                padding: '.9rem 3rem',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.4)' : 'rgba(37,99,235,0.4)'}`,
                background: 'transparent',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = accent;
                e.currentTarget.style.color = isDark ? '#072450' : '#fff';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = accent;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              View All Projects
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
