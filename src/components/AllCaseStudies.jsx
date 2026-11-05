import { memo, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { caseStudies } from '../data/caseStudiesData';
import { navigateTo, ROUTES } from '../routes';
import { useSeo } from '../hooks/useSeo';
import { SEO } from '../seo/seoConfig';
import { useTheme } from '../context/ThemeContext';

// ─── Study Row ────────────────────────────────────────────────────────────────
const StudyRow = memo(function StudyRow({ study, href, onClick, isDark }) {
  const rowRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const accent = isDark ? '#C9A84C' : '#2563EB';

  const handleEnter = () => {
    setHovered(true);
    gsap.to(rowRef.current, { x: 8, duration: 0.3, ease: 'power2.out' });
  };
  const handleLeave = () => {
    setHovered(false);
    gsap.to(rowRef.current, { x: 0, duration: 0.3, ease: 'power2.out' });
  };

  return (
    <a
      ref={rowRef}
      href={href}
      className="acs-row relative cursor-pointer block transition-colors duration-200"
      style={{
        borderBottom: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
        textDecoration: 'none',
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {/* hover wash */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{ background: study.gradient, opacity: hovered ? (isDark ? 1 : 0.45) : 0 }}
      />

      {/* left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 origin-top"
        style={{
          width: 2,
          background: isDark
            ? 'linear-gradient(to bottom, #C9A84C, rgba(201,168,76,0.2))'
            : 'linear-gradient(to bottom, #2563EB, rgba(37,99,235,0.2))',
          transform: hovered ? 'scaleY(1)' : 'scaleY(0)',
          transition: 'transform 0.3s ease',
        }}
      />

      <div className="relative z-10 flex items-center gap-0 py-7 pl-4">
        {/* number */}
        <div className="w-[80px] flex-shrink-0">
          <span
            className="font-body text-xs tracking-[.2em] font-semibold"
            style={{
              color: hovered ? accent : isDark ? 'rgba(255,255,255,0.45)' : '#6B7280',
              transition: 'color .3s',
            }}
          >
            {study.number}
          </span>
        </div>

        {/* title + desc + tags */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-3 flex-wrap">
            <h3
              className="font-title leading-none transition-colors duration-300"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
                letterSpacing: '.04em',
                color: hovered ? accent : isDark ? '#ffffff' : '#111827',
              }}
            >
              {study.title}
            </h3>
            <span
              className="font-title leading-none"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
                letterSpacing: '.04em',
                color: hovered
                  ? isDark ? 'rgba(201,168,76,0.5)' : 'rgba(37,99,235,0.6)'
                  : isDark ? 'rgba(255,255,255,0.35)' : '#9CA3AF',
                transition: 'color .3s',
              }}
            >
              {study.subtitle}
            </span>
          </div>

          <p
            className="font-body text-sm leading-relaxed mt-2"
            style={{
              color: isDark ? 'rgba(255,255,255,0.65)' : '#4B5563',
              fontWeight: 300,
              maxWidth: 540,
            }}
          >
            {study.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {study.tags.map((t) => (
              <span
                key={t}
                className="font-body text-[10px] tracking-[.08em] uppercase px-2.5 py-1 font-medium rounded"
                style={{
                  color: hovered
                    ? isDark ? 'rgba(201,168,76,0.9)' : '#1D4ED8'
                    : isDark ? 'rgba(255,255,255,0.6)' : '#4B5563',
                  border: `1px solid ${
                    hovered
                      ? isDark ? 'rgba(201,168,76,0.3)' : 'rgba(37,99,235,0.3)'
                      : isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'
                  }`,
                  background: hovered
                    ? isDark ? 'rgba(201,168,76,0.08)' : 'rgba(37,99,235,0.08)'
                    : isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                  transition: 'all .3s',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* category badge */}
        <div className="hidden md:block flex-shrink-0 px-4">
          <span
            className="font-body text-xs tracking-widest uppercase px-3 py-1.5 font-semibold whitespace-nowrap rounded"
            style={{
              background: hovered
                ? isDark ? 'rgba(201,168,76,0.18)' : 'rgba(37,99,235,0.14)'
                : isDark ? 'rgba(201,168,76,0.1)' : 'rgba(37,99,235,0.08)',
              color: isDark ? '#C9A84C' : '#1D4ED8',
              border: `1px solid ${
                isDark ? 'rgba(201,168,76,0.3)' : 'rgba(37,99,235,0.22)'
              }`,
              transition: 'background .3s',
              display: 'inline-block',
            }}
          >
            {study.category}
          </span>
        </div>

        {/* year + pages */}
        <div className="hidden sm:flex flex-col items-end gap-1 flex-shrink-0 w-[110px] text-right">
          <span
            className="font-body text-xs tracking-widest uppercase font-semibold"
            style={{
              color: hovered
                ? isDark ? 'rgba(255,255,255,0.8)' : '#111827'
                : isDark ? 'rgba(255,255,255,0.55)' : '#6B7280',
              transition: 'color .3s',
            }}
          >
            {study.year}
          </span>
          <span
            className="font-body text-[11px]"
            style={{
              color: hovered
                ? isDark ? 'rgba(255,255,255,0.6)' : '#6B7280'
                : isDark ? 'rgba(255,255,255,0.4)' : '#9CA3AF',
              transition: 'color .3s',
            }}
          >
            {study.pages}
          </span>
        </div>

        {/* arrow */}
        <div className="w-[48px] flex justify-end flex-shrink-0">
          <span
            className="acs-arrow inline-block"
            style={{
              color: hovered ? accent : isDark ? 'rgba(255,255,255,0.45)' : '#9CA3AF',
              transition: 'color .3s',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
});

// ─── Main Component ───────────────────────────────────────────────────────────
const ALL = 'All';
const categories = [ALL, ...Array.from(new Set(caseStudies.map((s) => s.category)))];

export default function AllCaseStudies() {
  useSeo(SEO.caseStudies);
  const { isDark } = useTheme();
  const accent = isDark ? '#C9A84C' : '#2563EB';

  const [activeFilter, setActiveFilter] = useState(ALL);
  const pageRef = useRef(null);
  const listRef = useRef(null);

  const filtered = useMemo(
    () => (activeFilter === ALL ? caseStudies : caseStudies.filter((s) => s.category === activeFilter)),
    [activeFilter]
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' });

      gsap.fromTo(
        '.acs-heading',
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.acs-filter',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.04, ease: 'power2.out', delay: 0.3 }
      );

      gsap.fromTo(
        '.acs-row',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.06, ease: 'power2.out', delay: 0.4 }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!listRef.current) return;
    const rows = listRef.current.querySelectorAll('.acs-row');
    gsap.fromTo(
      rows,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: 'power2.out' }
    );
  }, [activeFilter]);

  const handleBack = () => {
    navigateTo(ROUTES.HOME);
  };

  return (
    <>
      <div
        ref={pageRef}
        className="min-h-screen pt-24 pb-20 px-6 md:px-14 transition-colors duration-400"
        style={{ background: isDark ? '#000000' : '#FAF8F5' }}
      >
        {/* Glow */}
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
                ? 'radial-gradient(circle,rgba(201,168,76,0.06) 0%,transparent 70%)'
                : 'radial-gradient(circle,rgba(37,99,235,0.06) 0%,transparent 70%)',
              filter: 'blur(80px)',
              contain: 'paint',
            }}
          />
        </div>

        <main className="max-w-6xl mx-auto relative z-10">
          {/* Back button */}
          <button
            onClick={handleBack}
            className="acs-heading font-body flex items-center gap-2 mb-10 transition-all duration-300 hover:gap-3 cursor-pointer"
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
              className="acs-heading font-body text-xs tracking-[.35em] uppercase mb-2 font-medium"
              style={{ color: accent }}
            >
              All Case Studies
            </p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
              <h1
                className="acs-heading font-title"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(3.5rem,7vw,6.5rem)',
                  letterSpacing: '.05em',
                  lineHeight: 1,
                  color: isDark ? '#ffffff' : '#111827',
                }}
              >
                Case Studies
              </h1>
              <p
                className="acs-heading font-body text-sm font-medium"
                style={{
                  color: isDark ? 'rgba(255,255,255,0.65)' : '#6B7280',
                  fontWeight: 400,
                }}
              >
                {caseStudies.length} case studies total
              </p>
            </div>
            <div
              className="acs-heading mt-6"
              style={{
                height: 1,
                background: isDark
                  ? 'linear-gradient(to right,#C9A84C,rgba(201,168,76,0.06))'
                  : 'linear-gradient(to right,#2563EB,rgba(37,99,235,0.06))',
              }}
            />
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className="acs-filter font-body text-xs tracking-widest uppercase px-4 py-2 transition-all duration-300 rounded cursor-pointer"
                  style={{
                    background: isActive
                      ? accent
                      : isDark
                      ? 'rgba(255,255,255,0.06)'
                      : '#FFFFFF',
                    color: isActive
                      ? isDark ? '#000000' : '#FFFFFF'
                      : isDark ? 'rgba(255,255,255,0.65)' : '#4B5563',
                    border: isActive
                      ? `1px solid ${accent}`
                      : isDark
                      ? '1px solid rgba(255,255,255,0.14)'
                      : '1px solid rgba(0,0,0,0.1)',
                    boxShadow: !isActive && !isDark ? '0 2px 6px rgba(0,0,0,0.03)' : 'none',
                    fontWeight: isActive ? 700 : 500,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = isDark ? '#fff' : accent;
                      e.currentTarget.style.borderColor = isDark
                        ? 'rgba(255,255,255,0.3)'
                        : 'rgba(37,99,235,0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = isDark ? 'rgba(255,255,255,0.65)' : '#4B5563';
                      e.currentTarget.style.borderColor = isDark
                        ? 'rgba(255,255,255,0.14)'
                        : 'rgba(0,0,0,0.1)';
                    }
                  }}
                >
                  {cat}
                  {cat === ALL && (
                    <span className="ml-2 font-body text-xs" style={{ opacity: 0.7 }}>
                      ({caseStudies.length})
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Count */}
          <p
            className="font-body text-xs tracking-widest uppercase mb-4 font-medium"
            style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6B7280' }}
          >
            Showing {filtered.length} stud{filtered.length !== 1 ? 'ies' : 'y'}
            {activeFilter !== ALL && ` in ${activeFilter}`}
          </p>

          {/* Divider */}
          <div
            style={{
              height: 1,
              background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
              marginBottom: 0,
            }}
          />

          {/* Rows list */}
          <h2 className="sr-only">Case study list</h2>
          <div ref={listRef}>
            {filtered.map((study) => (
              <StudyRow
                key={study.id}
                study={study}
                href={`${ROUTES.CASE_STUDIES}/${study.slug}`}
                onClick={() => navigateTo(`${ROUTES.CASE_STUDIES}/${study.slug}`)}
                isDark={isDark}
              />
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p
                className="font-title text-4xl mb-3"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  letterSpacing: '.1em',
                  color: accent,
                }}
              >
                No Studies Found
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
                e.currentTarget.style.color = isDark ? '#000000' : '#FFFFFF';
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
    </>
  );
}
