import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { getCaseStudyBySlug } from '../data/caseStudiesData';
import { navigateTo, navigateToSection, ROUTES } from '../routes';

const GOLD = '#C9A84C';
const TITLE_FONT = "'Bebas Neue', sans-serif";

// ─── Shared bits ──────────────────────────────────────────────────────────────
function BackButton({ label = 'Back to Projects', className = '' }) {
  return (
    <button
      onClick={() => navigateToSection('projects')}
      className={`font-body flex items-center gap-2 transition-all duration-300 hover:gap-3 ${className}`}
      style={{
        fontSize: '.72rem', letterSpacing: '.2em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.55)', background: 'transparent', border: 'none',
        cursor: 'pointer', padding: 0,
      }}
      onMouseEnter={e => e.currentTarget.style.color = GOLD}
      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      {label}
    </button>
  );
}

function SectionHeading({ index, title }) {
  return (
    <div className="mb-8">
      <p className="font-body text-xs tracking-[.35em] uppercase mb-2 font-semibold" style={{ color: GOLD }}>
        {String(index).padStart(2, '0')}
      </p>
      <h2
        className="font-title uppercase"
        style={{
          fontFamily: TITLE_FONT,
          fontSize: 'clamp(1.9rem, 3.5vw, 2.9rem)',
          letterSpacing: '.05em', lineHeight: 1.05, color: '#fff',
        }}
      >
        {title}
      </h2>
      <div className="mt-5" style={{ height: 1, background: 'linear-gradient(to right,#C9A84C,rgba(201,168,76,0.06))' }} />
    </div>
  );
}

function BodyText({ children, className = '' }) {
  return (
    <p
      className={`font-body text-sm md:text-base leading-relaxed ${className}`}
      style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300, maxWidth: 760 }}
    >
      {children}
    </p>
  );
}

function BulletList({ items }) {
  return (
    <ul className="flex flex-col gap-4 mt-6" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {items.map((item, index) => (
        <li key={index} className="flex gap-4 items-start">
          <span
            className="flex-shrink-0 mt-2"
            style={{ width: 20, height: 1, background: GOLD, display: 'inline-block' }}
          />
          <p className="font-body text-sm md:text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300, maxWidth: 720 }}>
            {item.title && <span className="font-semibold" style={{ color: '#fff' }}>{item.title}. </span>}
            {item.text}
          </p>
        </li>
      ))}
    </ul>
  );
}

function FeatureCards({ items }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
      {items.map(item => (
        <div
          key={item.title}
          className="p-6 transition-all duration-300"
          style={{
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.03)',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'; e.currentTarget.style.background = 'rgba(201,168,76,0.05)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
        >
          <h3
            className="font-title uppercase mb-2"
            style={{ fontFamily: TITLE_FONT, fontSize: '1.3rem', letterSpacing: '.06em', color: GOLD }}
          >
            {item.title}
          </h3>
          <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>
            {item.text}
          </p>
        </div>
      ))}
    </div>
  );
}

const TABLE_GRID_BY_COLUMNS = {
  2: 'md:grid-cols-[1fr_2fr]',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
  5: 'md:grid-cols-5',
};

function MetricsTable({ columns, rows }) {
  const gridTemplate = TABLE_GRID_BY_COLUMNS[columns.length] || 'md:grid-cols-3';

  return (
    <div className="mt-2" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
      {/* header — hidden on mobile, cells carry their own labels there */}
      <div
        className={`hidden md:grid ${gridTemplate} gap-6 px-6 py-4`}
        style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}
      >
        {columns.map(col => (
          <span key={col} className="font-body text-[11px] tracking-[.18em] uppercase font-semibold" style={{ color: GOLD }}>
            {col}
          </span>
        ))}
      </div>

      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`grid grid-cols-1 ${gridTemplate} gap-2 md:gap-6 px-6 py-5`}
          style={{ borderBottom: rowIndex === rows.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.08)' }}
        >
          {row.map((cell, cellIndex) => (
            <div key={cellIndex}>
              <span
                className="md:hidden font-body text-[10px] tracking-[.18em] uppercase font-semibold block mb-1"
                style={{ color: cellIndex === 0 ? GOLD : 'rgba(255,255,255,0.4)' }}
              >
                {columns[cellIndex]}
              </span>
              <span
                className="font-body text-sm leading-relaxed"
                style={{
                  color: cellIndex === 0 ? '#fff' : cellIndex === row.length - 1 ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.5)',
                  fontWeight: cellIndex === 0 ? 500 : 300,
                }}
              >
                {cell}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function CodeBlock({ text }) {
  return (
    <pre
      className="mt-6 p-5 overflow-x-auto text-xs md:text-sm leading-relaxed"
      style={{
        border: '1px solid rgba(255,255,255,0.1)',
        borderLeft: `2px solid ${GOLD}`,
        background: 'rgba(255,255,255,0.03)',
        color: 'rgba(255,255,255,0.75)',
        fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
        whiteSpace: 'pre',
      }}
    >
      {text}
    </pre>
  );
}

function QuoteBlock({ text }) {
  return (
    <blockquote
      className="p-6 md:p-8"
      style={{
        borderLeft: `2px solid ${GOLD}`,
        background: 'linear-gradient(135deg, rgba(201,168,76,0.07) 0%, transparent 60%)',
        margin: '2rem 0 0',
      }}
    >
      <p className="font-body text-base md:text-lg italic leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 300 }}>
        “{text}”
      </p>
    </blockquote>
  );
}

// Renders the ordered content blocks of a full-text section. Block types:
// text · bullets · cards · table · code · quote
function SectionBlocks({ blocks }) {
  return blocks.map((block, index) => {
    switch (block.type) {
      case 'text':
        return <BodyText key={index} className={index > 0 ? 'mt-6' : ''}>{block.text}</BodyText>;
      case 'bullets':
        return <BulletList key={index} items={block.items} />;
      case 'cards':
        return <div key={index} className="mt-6"><FeatureCards items={block.items} /></div>;
      case 'table':
        return <div key={index} className="mt-6"><MetricsTable columns={block.columns} rows={block.rows} /></div>;
      case 'code':
        return <CodeBlock key={index} text={block.text} />;
      case 'quote':
        return <QuoteBlock key={index} text={block.text} />;
      default:
        return null;
    }
  });
}

// ─── Not found ────────────────────────────────────────────────────────────────
function StudyNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center" style={{ background: '#000' }}>
      <p className="font-title text-5xl mb-3" style={{ fontFamily: TITLE_FONT, letterSpacing: '.1em', color: GOLD }}>
        Case Study Not Found
      </p>
      <p className="font-body text-sm mb-8" style={{ color: 'rgba(255,255,255,0.55)' }}>
        The case study you are looking for does not exist or has moved.
      </p>
      <BackButton />
    </div>
  );
}

// ─── Case Study Detail Page ───────────────────────────────────────────────────
export default function CaseStudyDetail({ slug }) {
  const slugs = slug.split('+');
  const studies = slugs.map(s => getCaseStudyBySlug(s)).filter(Boolean);
  const pageRef = useRef(null);

  useEffect(() => {
    if (studies.length === 0 || !pageRef.current) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: .5, ease: 'power2.out' });
      gsap.fromTo('.csd-hero', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .9, ease: 'power3.out', stagger: .1, delay: .15 });
      gsap.fromTo('.csd-section', { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: .7, ease: 'power3.out', stagger: .12, delay: .35 });
    }, pageRef);

    // Kill on every slug change (not just unmount) so switching between
    // case-study slugs quickly never leaves tweens targeting replaced nodes.
    return () => ctx.revert();
  }, [slug]);

  if (studies.length === 0) {
    return <StudyNotFound />;
  }

  return (
    <div ref={pageRef} className="min-h-screen pt-24 pb-20 px-6 md:px-14" style={{ background: '#000' }}>

      {/* ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div style={{
          position: 'absolute', top: '5%', right: '-5%',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(201,168,76,0.06) 0%,transparent 70%)',
          filter: 'blur(70px)', contain: 'paint',
        }} />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Back button */}
        <div className="csd-hero mb-10">
          <BackButton />
        </div>

        {studies.map((study, studyIdx) => {
          const { detail } = study;
          let sectionIndex = 0;

          return (
            <div key={study.id} className={studyIdx > 0 ? "mt-24 pt-20" : ""}>
              {studyIdx > 0 && (
                <div
                  className="csd-section mb-20 flex items-center justify-center gap-4"
                  style={{
                    paddingTop: '2rem',
                  }}
                >
                  <div className="h-[1px] flex-1" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.3))' }} />
                  <span className="font-body text-[10px] tracking-[.4em] uppercase font-semibold whitespace-nowrap" style={{ color: GOLD }}>
                    Next Integrated Case Study
                  </span>
                  <div className="h-[1px] flex-1" style={{ background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.3))' }} />
                </div>
              )}

              {/* Hero */}
              <div className="csd-hero mb-6 flex items-center gap-4 flex-wrap">
                <span className="font-body text-xs tracking-[.35em] uppercase font-semibold" style={{ color: GOLD }}>
                  Case Study {study.number}
                </span>
                <span
                  className="font-body text-xs tracking-widest uppercase px-3 py-1.5 font-semibold"
                  style={{
                    background: 'rgba(201,168,76,0.1)', color: GOLD,
                    border: '1px solid rgba(201,168,76,0.3)', display: 'inline-block',
                  }}
                >
                  {study.category}
                </span>
              </div>

              <h1
                className="csd-hero font-title uppercase"
                style={{
                  fontFamily: TITLE_FONT,
                  fontSize: 'clamp(2.6rem, 6vw, 5rem)',
                  letterSpacing: '.04em', lineHeight: 1, color: '#fff',
                }}
              >
                {detail.headline}
              </h1>
              <h2
                className="csd-hero font-title uppercase mt-2"
                style={{
                  fontFamily: TITLE_FONT,
                  fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)',
                  letterSpacing: '.05em', lineHeight: 1.05, color: 'rgba(255,255,255,0.4)',
                }}
              >
                {detail.subheadline}
              </h2>

              {/* Tags */}
              <div className="csd-hero flex flex-wrap gap-1.5 mt-6">
                {study.tags.map(tag => (
                  <span
                    key={tag}
                    className="font-body text-[10px] tracking-[.08em] uppercase px-2.5 py-1 font-medium"
                    style={{
                      color: 'rgba(201,168,76,0.9)',
                      border: '1px solid rgba(201,168,76,0.3)',
                      background: 'rgba(201,168,76,0.08)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Summary callout */}
              <div
                className="csd-hero mt-10 p-6 md:p-8"
                style={{
                  borderLeft: `2px solid ${GOLD}`,
                  background: 'linear-gradient(135deg, rgba(201,168,76,0.07) 0%, transparent 60%)',
                }}
              >
                <p className="font-body text-xs tracking-[.25em] uppercase mb-3 font-semibold" style={{ color: GOLD }}>
                  The Short Version
                </p>
                <p className="font-body text-sm md:text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 300 }}>
                  {detail.summary}
                </p>
              </div>

              {/* Lead-in line under the summary (full-text studies) */}
              {detail.lead && (
                <p
                  className="csd-hero font-body text-sm md:text-base italic leading-relaxed mt-6"
                  style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 300, maxWidth: 760 }}
                >
                  {detail.lead}
                </p>
              )}

              {detail.sections ? (
                /* Full-text layout — sections mirror the source PDF one-to-one */
                <>
                  {detail.sections.map((section, index) => (
                    <section key={index} className="csd-section mt-20">
                      <SectionHeading index={index + 1} title={section.heading} />
                      <SectionBlocks blocks={section.blocks} />
                    </section>
                  ))}
                  {detail.contextNote && (
                    <p
                      className="csd-section font-body text-sm italic leading-relaxed mt-16"
                      style={{ color: 'rgba(255,255,255,0.45)', fontWeight: 300, maxWidth: 760 }}
                    >
                      {detail.contextNote}
                    </p>
                  )}
                </>
              ) : (
                <>
                  {/* The problem */}
                  <section className="csd-section mt-20">
                    <SectionHeading index={++sectionIndex} title={detail.problem.heading} />
                    <BodyText>{detail.problem.intro}</BodyText>
                    <BulletList items={detail.problem.bullets} />
                    {detail.problem.outro && <BodyText className="mt-6">{detail.problem.outro}</BodyText>}
                  </section>

                  {/* The solution */}
                  <section className="csd-section mt-20">
                    <SectionHeading index={++sectionIndex} title={detail.solution.heading} />
                    <BodyText>{detail.solution.text}</BodyText>
                  </section>

                  {/* Features */}
                  <section className="csd-section mt-20">
                    <SectionHeading index={++sectionIndex} title={detail.features.heading} />
                    <FeatureCards items={detail.features.items} />
                  </section>

                  {/* Strategic angle */}
                  <section className="csd-section mt-20">
                    <SectionHeading index={++sectionIndex} title={detail.strategicAngle.heading} />
                    {detail.strategicAngle.intro && <BodyText>{detail.strategicAngle.intro}</BodyText>}
                    <BulletList items={detail.strategicAngle.bullets} />
                  </section>

                  {/* Metrics */}
                  {detail.metrics && (
                    <section className="csd-section mt-20">
                      <SectionHeading index={++sectionIndex} title={detail.metrics.heading} />
                      <MetricsTable columns={detail.metrics.columns} rows={detail.metrics.rows} />
                      {detail.metrics.note && <BodyText className="mt-6">{detail.metrics.note}</BodyText>}
                    </section>
                  )}

                  {/* Closing */}
                  <section className="csd-section mt-20">
                    <SectionHeading index={++sectionIndex} title={detail.closing.heading} />
                    <div className="flex flex-col gap-4">
                      {detail.closing.paragraphs.map(paragraph => (
                        <BodyText key={paragraph.slice(0, 40)}>{paragraph}</BodyText>
                      ))}
                    </div>
                  </section>
                </>
              )}
            </div>
          );
        })}

        {/* Back CTA bottom */}
        <div className="csd-section mt-20 flex justify-center">
          <button
            onClick={() => navigateToSection('projects')}
            className="font-body flex items-center gap-3 transition-all duration-300"
            style={{
              fontWeight: 600, fontSize: '.72rem', letterSpacing: '.2em', textTransform: 'uppercase',
              color: GOLD, padding: '.9rem 3rem',
              border: '1px solid rgba(201,168,76,0.4)', background: 'transparent', cursor: 'pointer',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = '#000'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = GOLD; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </button>
        </div>

      </div>
    </div>
  );
}
