import { memo, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { projects } from '../data/projectsData';
import ProjectLinks from './ProjectLinks';
import { useSeo } from '../hooks/useSeo';
import { SEO } from '../seo/seoConfig';
import { useTheme } from '../context/ThemeContext';
import { navigateTo, navigateToSection } from '../routes';

const ALL = 'All';
const categories = [ALL, ...Array.from(new Set(projects.map((p) => p.category)))];

const ProjectCard = memo(function ProjectCard({ p }) {
  const cardRef = useRef(null);

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
      y: -6,
      duration: 0.3,
      ease: 'power2.out',
      boxShadow: '0 20px 45px rgba(37,99,235,0.2), 0 8px 24px rgba(0,0,0,0.1)',
    });
    const arrow = cardRef.current.querySelector('.card-arrow');
    if (arrow) gsap.to(arrow, { x: 5, opacity: 1, duration: 0.25 });
  };

  const handleLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      duration: 0.3,
      ease: 'power2.out',
      boxShadow: '0 10px 30px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
    });
    const arrow = cardRef.current.querySelector('.card-arrow');
    if (arrow) gsap.to(arrow, { x: 0, opacity: 0, duration: 0.25 });
  };

  return (
    <div
      ref={cardRef}
      role={clickable ? 'link' : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-label={clickable ? `${p.title} — open case study` : undefined}
      className="relative overflow-hidden rounded-xl"
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
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(37,99,235,0.02) 0%, transparent 60%)' }}
      />

      <div className="relative z-10 p-6 flex flex-col h-full min-h-[270px]">
        {/* Badges */}
        <div className="flex items-center justify-between gap-2 mb-5 flex-wrap">
          <span
            className="font-body text-xs tracking-widest uppercase px-3 py-1 rounded"
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
            className="font-body text-xs font-semibold px-3 py-1 rounded"
            style={{
              background: 'rgba(37,99,235,0.05)',
              color: '#2563EB',
              border: '1px solid rgba(37,99,235,0.18)',
            }}
          >
            {p.year}
          </span>
        </div>

        <h3
          className="font-title mb-2"
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: '1.75rem',
            letterSpacing: '.04em',
            lineHeight: 1.05,
            color: '#1D4ED8',
          }}
        >
          {p.title}
        </h3>

        {p.role && (
          <p
            className="font-body text-xs tracking-wide mb-3"
            style={{ color: '#2563EB', fontWeight: 600 }}
          >
            My Role: {p.role}
          </p>
        )}

        <p
          className="font-body text-sm leading-relaxed flex-1"
          style={{
            color: '#334155',
            fontWeight: 400,
          }}
        >
          {p.description}
        </p>

        <div className="mt-5">
          {/* Tech/method tags */}
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

        {/* Action links */}
        <ProjectLinks project={p} />
      </div>
    </div>
  );
});

export default function AllProjects({ onBack }) {
  useSeo(SEO.projects);
  const { isDark } = useTheme();
  const accent = isDark ? '#FFFFFF' : '#2563EB';

  const [activeFilter, setActiveFilter] = useState(ALL);
  const pageRef = useRef(null);
  const gridRef = useRef(null);

  const filtered = useMemo(
    () => (activeFilter === ALL ? projects : projects.filter((p) => p.category === activeFilter)),
    [activeFilter]
  );

  const handleBack = () => {
    if (onBack) onBack();
    else navigateToSection('projects');
  };

  // Page entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        pageRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' }
      );

      gsap.fromTo(
        '.ap-heading',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.ap-filter-btn',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.04, ease: 'power2.out', delay: 0.3 }
      );

      gsap.fromTo(
        '.ap-card',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 0.4 }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Filter change animation
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.ap-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 24, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.05, ease: 'power2.out' }
    );
  }, [activeFilter]);

  return (
    <div
      ref={pageRef}
      className="min-h-screen relative transition-colors duration-400"
      style={{ background: isDark ? '#072450' : '#FAF8F5' }}
    >
      {/* Background ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          style={{
            position: 'absolute',
            top: '4%',
            right: '-6%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: isDark
              ? 'radial-gradient(circle,rgba(255,255,255,0.06) 0%,transparent 70%)'
              : 'radial-gradient(circle,rgba(37,99,235,0.06) 0%,transparent 70%)',
            filter: 'blur(80px)',
            contain: 'paint',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '-6%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: isDark
              ? 'radial-gradient(circle,rgba(100,150,255,0.04) 0%,transparent 70%)'
              : 'radial-gradient(circle,rgba(37,99,235,0.04) 0%,transparent 70%)',
            filter: 'blur(80px)',
            contain: 'paint',
          }}
        />
      </div>

      <main className="max-w-7xl mx-auto px-6 md:px-14 py-16 md:py-24 relative z-10">
        {/* Back button */}
        <button
          onClick={handleBack}
          className="ap-heading font-body flex items-center gap-2 mb-10 transition-all duration-300 hover:gap-3 cursor-pointer"
          style={{
            fontSize: '.72rem',
            letterSpacing: '.2em',
            textTransform: 'uppercase',
            color: isDark ? 'rgba(255,255,255,0.55)' : '#6B7280',
            background: 'transparent',
            border: 'none',
            padding: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = isDark ? 'rgba(255,255,255,0.55)' : '#6B7280')
          }
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Portfolio
        </button>

        {/* Heading */}
        <div className="mb-12">
          <p
            className="ap-heading font-body text-xs tracking-[.35em] uppercase mb-2 font-medium"
            style={{ color: accent }}
          >
            All Work
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <h1
              className="ap-heading font-title"
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: 'clamp(3.5rem,7vw,6.5rem)',
                letterSpacing: '.05em',
                lineHeight: 1,
                color: isDark ? '#FFFFFF' : '#111827',
              }}
            >
              All Projects
            </h1>
            <p
              className="ap-heading font-body text-sm"
              style={{
                color: isDark ? 'rgba(255,255,255,0.55)' : '#6B7280',
                fontWeight: 300,
              }}
            >
              {projects.length} projects total
            </p>
          </div>
          <div
            className="ap-heading mt-6"
            style={{
              height: '1px',
              background: isDark
                ? 'linear-gradient(to right,#FFFFFF,rgba(255,255,255,0.06))'
                : 'linear-gradient(to right,#2563EB,rgba(37,99,235,0.06))',
            }}
          />
        </div>

        {/* Filter pills — 2-row horizontal swipe with ellipsis on mobile, wrapped row on desktop */}
        <div className="grid grid-rows-2 grid-flow-col auto-cols-max gap-2 overflow-x-auto touch-pan-x pb-1 mb-10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:flex md:flex-wrap md:gap-3 md:overflow-visible md:pb-0 md:mb-12">
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                title={cat}
                onClick={() => setActiveFilter(cat)}
                className="ap-filter-btn font-body text-xs tracking-widest uppercase px-3 py-2 md:px-4 transition-all duration-300 rounded cursor-pointer max-w-[175px] truncate md:max-w-none"
                style={{
                  background: isActive
                    ? accent
                    : isDark
                    ? 'rgba(255,255,255,0.04)'
                    : '#FFFFFF',
                  color: isActive
                    ? isDark ? '#072450' : '#FFFFFF'
                    : isDark ? 'rgba(255,255,255,0.62)' : '#4B5563',
                  border: isActive
                    ? `1px solid ${accent}`
                    : isDark
                    ? '1px solid rgba(255,255,255,0.1)'
                    : '1px solid rgba(0,0,0,0.1)',
                  boxShadow: !isActive && !isDark ? '0 2px 6px rgba(0,0,0,0.03)' : 'none',
                  fontWeight: isActive ? 700 : 500,
                }}
              >
                {cat}
                {cat === ALL && (
                  <span className="ml-2 font-body text-xs" style={{ opacity: 0.7 }}>
                    ({projects.length})
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Count */}
        <p
          className="font-body text-xs tracking-widest uppercase mb-6"
          style={{ color: isDark ? 'rgba(255,255,255,0.55)' : '#6B7280' }}
        >
          Showing {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          {activeFilter !== ALL && ` in ${activeFilter}`}
        </p>

        {/* Grid */}
        <h2 className="sr-only">Project list</h2>
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <div key={p.id} className="ap-card">
              <ProjectCard p={p} isDark={isDark} />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p
              className="font-title text-4xl mb-3"
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                letterSpacing: '.1em',
                color: accent,
              }}
            >
              No Projects Found
            </p>
            <p className="font-body text-sm" style={{ color: isDark ? 'rgba(255,255,255,0.55)' : '#6B7280' }}>
              Try selecting a different category.
            </p>
          </div>
        )}

        {/* Back CTA bottom */}
        <div className="mt-16 flex justify-center">
          <button
            onClick={handleBack}
            className="font-body flex items-center gap-3 transition-all duration-300 rounded cursor-pointer"
            style={{
              fontWeight: 600,
              fontSize: '.72rem',
              letterSpacing: '.2em',
              textTransform: 'uppercase',
              color: accent,
              padding: '.9rem 3rem',
              border: `1.5px solid ${accent}`,
              background: isDark ? 'transparent' : 'rgba(37,99,235,0.06)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = accent;
              e.currentTarget.style.color = isDark ? '#072450' : '#FFFFFF';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = isDark ? 'transparent' : 'rgba(37,99,235,0.06)';
              e.currentTarget.style.color = accent;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Portfolio
          </button>
        </div>
      </main>
    </div>
  );
}
