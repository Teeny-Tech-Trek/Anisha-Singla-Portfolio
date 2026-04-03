import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { caseStudies } from '../data/caseStudiesData';
import { navigateTo, ROUTES } from '../routes';
import PdfReader from './PdfReader'; // ya jahan bhi file rakho

// ─── PDF Modal ────────────────────────────────────────────────────────────────
// function PdfModal({ study, onClose }) {
//   useEffect(() => {
//     document.body.style.overflow = 'hidden';
//     return () => { document.body.style.overflow = ''; };
//   }, []);

//   return (
//     <div
//       className="fixed inset-0 z-50 flex flex-col"
//       style={{ background: 'rgba(0,0,0,0.97)', backdropFilter: 'blur(8px)' }}
//     >
//       <div
//         className="flex items-center justify-between px-8 md:px-14 py-4 flex-shrink-0"
//         style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}
//       >
//         <div className="flex items-center gap-4">
//           <span className="font-body text-xs tracking-[.25em] uppercase font-semibold" style={{ color: '#C9A84C' }}>
//             {study.category}
//           </span>
//           <span style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.25)', display: 'inline-block' }} />
//           <h3
//             className="font-title text-white tracking-wider uppercase"
//             style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.25rem' }}
//           >
//             {study.title} — {study.subtitle}
//           </h3>
//         </div>
//         <div className="flex items-center gap-3">
//           {study.pdfUrl && (
//             <a
//               href={study.pdfUrl}
//               download
//               className="font-body text-xs font-semibold tracking-[.16em] uppercase px-5 py-2 transition-all duration-200 no-underline"
//               style={{ color: '#C9A84C', border: '1px solid rgba(201,168,76,0.5)', background: 'transparent' }}
//               onMouseEnter={e => { e.currentTarget.style.background = '#C9A84C'; e.currentTarget.style.color = '#000'; }}
//               onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C9A84C'; }}
//             >
//               Download
//             </a>
//           )}
//           <button
//             onClick={onClose}
//             style={{
//               width: 36, height: 36,
//               border: '1px solid rgba(255,255,255,0.2)',
//               color: 'rgba(255,255,255,0.7)',
//               background: 'transparent', cursor: 'pointer',
//               fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
//             }}
//             onMouseEnter={e => { e.currentTarget.style.borderColor = '#C9A84C'; e.currentTarget.style.color = '#C9A84C'; }}
//             onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
//           >
//             ✕
//           </button>
//         </div>
//       </div>

//       <div className="flex-1 overflow-hidden p-6 md:p-8">
//         {study.pdfUrl ? (
//           <iframe src={study.pdfUrl} className="w-full h-full" style={{ border: 'none' }} title={study.title} />
//         ) : (
//           <div className="w-full h-full flex flex-col items-center justify-center gap-5 text-center">
//             <div style={{
//               width: 64, height: 64,
//               border: '1px solid rgba(201,168,76,0.3)',
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//               color: 'rgba(201,168,76,0.6)',
//             }}>
//               <svg width="26" height="26" viewBox="0 0 22 22" fill="none">
//                 <rect x="2" y="1" width="13" height="18" rx="2" stroke="currentColor" strokeWidth="1.2" />
//                 <path d="M13 1v6h7" stroke="currentColor" strokeWidth="1.2" />
//                 <path d="M5 10h8M5 13h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
//               </svg>
//             </div>
//             <div>
//               <p className="font-title mb-2" style={{
//                 fontFamily: "'Bebas Neue', sans-serif",
//                 fontSize: '2.2rem', letterSpacing: '.1em',
//                 color: 'rgba(255,255,255,0.5)',
//               }}>
//                 Coming Soon
//               </p>
//               <p className="font-body text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
//                 This case study PDF hasn't been attached yet.
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// ─── Study Row ────────────────────────────────────────────────────────────────
function StudyRow({ study, onClick }) {
  const rowRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const handleEnter = () => {
    setHovered(true);
    gsap.to(rowRef.current, { x: 8, duration: .3, ease: 'power2.out' });
  };
  const handleLeave = () => {
    setHovered(false);
    gsap.to(rowRef.current, { x: 0, duration: .3, ease: 'power2.out' });
  };

  return (
    <div
      ref={rowRef}
      className="acs-row relative cursor-pointer"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={onClick}
    >
      {/* hover wash */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{ background: study.gradient, opacity: hovered ? 1 : 0 }}
      />

      {/* gold left bar */}
      <div
        className="absolute left-0 top-0 bottom-0 origin-top"
        style={{
          width: 2,
          background: 'linear-gradient(to bottom, #C9A84C, rgba(201,168,76,0.2))',
          transform: hovered ? 'scaleY(1)' : 'scaleY(0)',
          transition: 'transform 0.3s ease',
        }}
      />

      <div className="relative z-10 flex items-center gap-0 py-7 pl-4">

        {/* number */}
        <div className="w-[80px] flex-shrink-0">
          <span
            className="font-body text-xs tracking-[.2em] font-semibold"
            style={{ color: hovered ? '#C9A84C' : 'rgba(255,255,255,0.45)', transition: 'color .3s' }}
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
                color: hovered ? '#C9A84C' : '#ffffff',
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
                color: hovered ? 'rgba(201,168,76,0.5)' : 'rgba(255,255,255,0.35)',
                transition: 'color .3s',
              }}
            >
              {study.subtitle}
            </span>
          </div>

          {/* description — was 0.35, now 0.65 */}
          <p
            className="font-body text-sm leading-relaxed mt-2"
            style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300, maxWidth: 540 }}
          >
            {study.description}
          </p>

          {/* tags — was 0.28, now 0.6 */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {study.tags.map(t => (
              <span
                key={t}
                className="font-body text-[10px] tracking-[.08em] uppercase px-2.5 py-1 font-medium"
                style={{
                  color: hovered ? 'rgba(201,168,76,0.9)' : 'rgba(255,255,255,0.6)',
                  border: `1px solid ${hovered ? 'rgba(201,168,76,0.3)' : 'rgba(255,255,255,0.12)'}`,
                  background: hovered ? 'rgba(201,168,76,0.08)' : 'rgba(255,255,255,0.04)',
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
            className="font-body text-xs tracking-widest uppercase px-3 py-1.5 font-semibold whitespace-nowrap"
            style={{
              background: hovered ? 'rgba(201,168,76,0.18)' : 'rgba(201,168,76,0.1)',
              color: '#C9A84C',
              border: '1px solid rgba(201,168,76,0.3)',
              transition: 'background .3s',
              display: 'inline-block',
            }}
          >
            {study.category}
          </span>
        </div>

        {/* year + pages — was 0.2 / 0.12, now 0.55 / 0.4 */}
        <div className="hidden md:block w-[80px] flex-shrink-0 text-right pr-2">
          <span className="font-body text-xs tracking-widest block font-medium"
            style={{ color: hovered ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.55)', transition: 'color .3s' }}>
            {study.year}
          </span>
          {study.pages && (
            <span className="font-body text-[10px] mt-1 block"
              style={{ color: hovered ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.4)', transition: 'color .3s' }}>
              {study.pages}pp
            </span>
          )}
        </div>

        {/* arrow icon */}
        <div className="w-[60px] flex-shrink-0 flex justify-end pr-2">
          <div
            className="flex items-center justify-center transition-all duration-300"
            style={{
              width: 36, height: 36,
              border: `1px solid ${hovered ? 'rgba(201,168,76,0.6)' : 'rgba(255,255,255,0.15)'}`,
              color: hovered ? '#C9A84C' : 'rgba(255,255,255,0.45)',
              transform: hovered ? 'translate(3px,-3px)' : 'translate(0,0)',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L11 1M11 1H4.5M11 1V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── All Case Studies Page ────────────────────────────────────────────────────
const ALL = 'All';
const categories = [ALL, ...Array.from(new Set(caseStudies.map(s => s.category)))];

export default function AllCaseStudies() {
  const [activeFilter, setActiveFilter] = useState(ALL);
  const [activeStudy, setActiveStudy]   = useState(null);
  const pageRef = useRef(null);

  const handleBack = () => navigateTo(ROUTES.HOME);

  const filtered = activeFilter === ALL
    ? caseStudies
    : caseStudies.filter(s => s.category === activeFilter);

  useEffect(() => {
    gsap.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: .5, ease: 'power2.out' });
    gsap.fromTo('.acs-heading', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .9, ease: 'power3.out', stagger: .1, delay: .15 });
    gsap.fromTo('.acs-filter',  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .6, ease: 'power2.out', stagger: .06, delay: .35 });
  }, []);

  useEffect(() => {
    const rows = document.querySelectorAll('.acs-row');
    gsap.fromTo(rows,
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: .7, ease: 'power3.out', stagger: .08 }
    );
  }, [filtered]);

  return (
    <>
      <div ref={pageRef} className="min-h-screen pt-24 pb-20 px-6 md:px-14" style={{ background: '#000' }}>

        {/* ambient glow */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
          <div style={{
            position: 'absolute', top: '5%', right: '-5%',
            width: 600, height: 600, borderRadius: '50%',
            background: 'radial-gradient(circle,rgba(201,168,76,0.06) 0%,transparent 70%)',
            filter: 'blur(70px)',
          }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">

          {/* Back button */}
          <button
            onClick={handleBack}
            className="acs-heading font-body flex items-center gap-2 mb-10 transition-all duration-300 hover:gap-3"
            style={{
              fontSize: '.72rem', letterSpacing: '.2em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)', background: 'transparent', border: 'none',
              cursor: 'pointer', padding: 0,
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Portfolio
          </button>

          {/* Heading */}
          <div className="mb-12">
            <p className="acs-heading font-body text-xs tracking-[.35em] uppercase mb-2 font-semibold"
              style={{ color: '#C9A84C' }}>
              All Case Studies
            </p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
              <h1 className="acs-heading font-title" style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(3.5rem,7vw,6.5rem)',
                letterSpacing: '.05em', lineHeight: 1, color: '#fff',
              }}>
                Case Studies
              </h1>
              {/* was 0.35, now 0.65 */}
              <p className="acs-heading font-body text-sm font-medium"
                style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 400 }}>
                {caseStudies.length} case studies total
              </p>
            </div>
            <div className="acs-heading mt-6"
              style={{ height: 1, background: 'linear-gradient(to right,#C9A84C,rgba(201,168,76,0.06))' }} />
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="acs-filter font-body text-xs tracking-widest uppercase px-4 py-2 transition-all duration-300"
                style={{
                  background: activeFilter === cat ? '#C9A84C' : 'rgba(255,255,255,0.06)',
                  color:      activeFilter === cat ? '#000'    : 'rgba(255,255,255,0.65)',
                  border:     activeFilter === cat ? '1px solid #C9A84C' : '1px solid rgba(255,255,255,0.14)',
                  fontWeight: activeFilter === cat ? 700 : 500,
                  cursor: 'pointer',
                }}
                onMouseEnter={e => { if (activeFilter !== cat) { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}}
                onMouseLeave={e => { if (activeFilter !== cat) { e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; }}}
              >
                {cat}
                {cat === ALL && (
                  <span className="ml-2 font-body text-xs" style={{ opacity: .7 }}>({caseStudies.length})</span>
                )}
              </button>
            ))}
          </div>

          {/* Count — was 0.25, now 0.5 */}
          <p className="font-body text-xs tracking-widest uppercase mb-4 font-medium"
            style={{ color: 'rgba(255,255,255,0.5)' }}>
            Showing {filtered.length} stud{filtered.length !== 1 ? 'ies' : 'y'}
            {activeFilter !== ALL && ` in ${activeFilter}`}
          </p>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', marginBottom: 0 }} />

          {/* Rows list */}
          <div>
            {filtered.map(study => (
              <StudyRow key={study.id} study={study} onClick={() => setActiveStudy(study)} />
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="font-title text-4xl mb-3"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '.1em', color: '#C9A84C' }}>
                No Studies Found
              </p>
              <p className="font-body text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Try selecting a different category.
              </p>
            </div>
          )}

          {/* Back CTA bottom */}
          <div className="mt-16 flex justify-center">
            <button
              onClick={handleBack}
              className="font-body flex items-center gap-3 transition-all duration-300"
              style={{
                fontWeight: 600, fontSize: '.72rem', letterSpacing: '.2em', textTransform: 'uppercase',
                color: '#C9A84C', padding: '.9rem 3rem',
                border: '1px solid rgba(201,168,76,0.4)', background: 'transparent', cursor: 'pointer',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#C9A84C'; e.currentTarget.style.color = '#000'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C9A84C'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Portfolio
            </button>
          </div>

        </div>
      </div>

      {/* PDF Modal */}
      {/* PDF Reader */}
{activeStudy && (
  <PdfReader study={activeStudy} onClose={() => setActiveStudy(null)} />
)}
    </>
  );
}