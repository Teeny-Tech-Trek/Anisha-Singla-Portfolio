import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { projects, statusStyle } from '../data/projectsData';

const ALL = 'All';
const categories = [ALL, ...Array.from(new Set(projects.map(p => p.category)))];

function ProjectCard({ p }) {
  const cardRef = useRef(null);

  const handleEnter = () => {
    gsap.to(cardRef.current, { y: -6, duration: .3, ease: 'power2.out',
      boxShadow: '0 16px 45px rgba(201,168,76,0.12)' });
    const arrow = cardRef.current.querySelector('.card-arrow');
    if (arrow) gsap.to(arrow, { x: 5, opacity: 1, duration: .25 });
  };
  const handleLeave = () => {
    gsap.to(cardRef.current, { y: 0, duration: .3, ease: 'power2.out', boxShadow: 'none' });
    const arrow = cardRef.current.querySelector('.card-arrow');
    if (arrow) gsap.to(arrow, { x: 0, opacity: 0, duration: .25 });
  };

  return (
    <div ref={cardRef} className="relative overflow-hidden cursor-pointer"
      style={{ background:'#0d0d0d', border:'1px solid rgba(255,255,255,0.07)',
        borderTop:'2px solid rgba(201,168,76,0.35)', transition:'box-shadow .3s ease', height:'100%' }}
      onMouseEnter={handleEnter} onMouseLeave={handleLeave}>

      <div className="absolute inset-0 pointer-events-none" style={{ background: p.gradient, opacity: .55 }}/>

      <div className="relative z-10 p-6 flex flex-col h-full min-h-[270px]">
        {/* Badges */}
        <div className="flex items-center justify-between gap-2 mb-5 flex-wrap">
          <span className="font-body text-xs tracking-widest uppercase px-3 py-1"
            style={{ background:'rgba(201,168,76,0.1)', color:'#C9A84C', border:'1px solid rgba(201,168,76,0.25)' }}>
            {p.category}
          </span>

          {p.status === 'Live' && p.liveUrl ? (
            <a href={p.liveUrl} target="_blank" rel="noreferrer"
              onClick={e => e.stopPropagation()}
              className="font-body text-xs font-bold px-3 py-1 flex items-center gap-1.5 transition-all duration-300"
              style={{ background:statusStyle[p.status].bg, color:statusStyle[p.status].color,
                border:`1px solid ${statusStyle[p.status].border}`, textDecoration:'none' }}
              onMouseEnter={e => { e.currentTarget.style.background=statusStyle['Live'].color; e.currentTarget.style.color='#000'; }}
              onMouseLeave={e => { e.currentTarget.style.background=statusStyle['Live'].bg; e.currentTarget.style.color=statusStyle['Live'].color; }}>
              ● {p.status}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          ) : (
            <span className="font-body text-xs font-bold px-3 py-1"
              style={{ background:statusStyle[p.status]?.bg, color:statusStyle[p.status]?.color,
                border:`1px solid ${statusStyle[p.status]?.border}` }}>
              ● {p.status}
            </span>
          )}
        </div>

        <h3 className="font-title mb-3 text-white"
          style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'1.75rem', letterSpacing:'.04em', lineHeight:1 }}>
          {p.title}
        </h3>

        <p className="font-body text-sm leading-relaxed flex-1"
          style={{ color:'rgba(255,255,255,0.46)', fontWeight:300 }}>
          {p.description}
        </p>

        <div className="mt-5">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {p.tags.map(t => (
              <span key={t} className="font-body text-xs px-2.5 py-1"
                style={{ background:'rgba(255,255,255,0.04)', color:'rgba(255,255,255,0.36)',
                  border:'1px solid rgba(255,255,255,0.08)' }}>
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between"
            style={{ borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:'1rem' }}>
            <span className="font-body text-xs tracking-widest" style={{ color:'rgba(255,255,255,0.22)' }}>
              {p.year}
            </span>
            <div className="card-arrow flex items-center gap-1.5 font-body text-xs tracking-widest uppercase text-gold"
              style={{ opacity:0 }}>
              View
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AllProjects({ onBack }) {
  const [activeFilter, setActiveFilter] = useState(ALL);
  const pageRef  = useRef(null);
  const gridRef  = useRef(null);

  const filtered = activeFilter === ALL
    ? projects
    : projects.filter(p => p.category === activeFilter);

  // Page entrance
  useEffect(() => {
    gsap.fromTo(pageRef.current,
      { opacity: 0 },
      { opacity: 1, duration: .5, ease: 'power2.out' });

    gsap.fromTo('.ap-heading',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: .9, ease: 'power3.out', stagger: .1, delay: .15 });

    gsap.fromTo('.ap-filter-btn',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: .6, ease: 'power2.out', stagger: .06, delay: .35 });
  }, []);

  // Animate grid on filter change
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.ap-card');
    gsap.fromTo(cards,
      { opacity: 0, y: 40, scale: .97 },
      { opacity: 1, y: 0, scale: 1, duration: .65, ease: 'power3.out', stagger: .07 });
  }, [filtered]);

  return (
    <div ref={pageRef} className="min-h-screen pt-24 pb-20 px-6 md:px-14" style={{ background:'#000' }}>

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex:0 }}>
        <div style={{ position:'absolute',top:'5%',right:'-5%',width:'600px',height:'600px',borderRadius:'50%',
          background:'radial-gradient(circle,rgba(201,168,76,0.05) 0%,transparent 70%)',filter:'blur(70px)' }}/>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Back button */}
        <button
          onClick={onBack}
          className="ap-heading font-body flex items-center gap-2 mb-10 transition-all duration-300 hover:gap-3"
          style={{ fontSize:'.72rem', letterSpacing:'.2em', textTransform:'uppercase',
            color:'rgba(255,255,255,0.4)', background:'transparent', border:'none', cursor:'pointer', padding:0 }}
          onMouseEnter={e => e.currentTarget.style.color='#C9A84C'}
          onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.4)'}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Portfolio
        </button>

        {/* Heading */}
        <div className="mb-12">
          <p className="ap-heading font-body text-xs tracking-[.35em] uppercase mb-2" style={{ color:'#C9A84C' }}>
            All Work
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <h1 className="ap-heading font-title"
              style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(3.5rem,7vw,6.5rem)',
                letterSpacing:'.05em', lineHeight:1, color:'#fff' }}>
              All Projects
            </h1>
            <p className="ap-heading font-body text-sm" style={{ color:'rgba(255,255,255,0.35)', fontWeight:300 }}>
              {projects.length} projects total
            </p>
          </div>
          <div className="ap-heading mt-6"
            style={{ height:'1px', background:'linear-gradient(to right,#C9A84C,rgba(201,168,76,0.06))' }}/>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="ap-filter-btn font-body text-xs tracking-widest uppercase px-4 py-2 transition-all duration-300"
              style={{
                background:   activeFilter===cat ? '#C9A84C' : 'rgba(255,255,255,0.04)',
                color:        activeFilter===cat ? '#000'    : 'rgba(255,255,255,0.45)',
                border:       activeFilter===cat ? '1px solid #C9A84C' : '1px solid rgba(255,255,255,0.1)',
                fontWeight:   activeFilter===cat ? 700 : 400,
                cursor: 'pointer',
              }}
            >
              {cat}
              {cat === ALL && (
                <span className="ml-2 font-body text-xs" style={{ opacity:.6 }}>({projects.length})</span>
              )}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="font-body text-xs tracking-widest uppercase mb-6" style={{ color:'rgba(255,255,255,0.25)' }}>
          Showing {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          {activeFilter !== ALL && ` in ${activeFilter}`}
        </p>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(p => (
            <div key={p.id} className="ap-card">
              <ProjectCard p={p} />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="font-title text-4xl text-gold mb-3"
              style={{ fontFamily:"'Bebas Neue',sans-serif", letterSpacing:'.1em' }}>
              No Projects Found
            </p>
            <p className="font-body text-sm" style={{ color:'rgba(255,255,255,0.35)' }}>
              Try selecting a different category.
            </p>
          </div>
        )}

        {/* Back CTA bottom */}
        <div className="mt-16 flex justify-center">
          <button onClick={onBack}
            className="font-body flex items-center gap-3 transition-all duration-300"
            style={{ fontWeight:600, fontSize:'.72rem', letterSpacing:'.2em', textTransform:'uppercase',
              color:'#C9A84C', padding:'.9rem 3rem', border:'1px solid rgba(201,168,76,0.4)',
              background:'transparent', cursor:'pointer' }}
            onMouseEnter={e=>{ e.currentTarget.style.background='#C9A84C'; e.currentTarget.style.color='#000'; e.currentTarget.style.transform='translateY(-2px)'; }}
            onMouseLeave={e=>{ e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#C9A84C'; e.currentTarget.style.transform='translateY(0)'; }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Portfolio
          </button>
        </div>

      </div>
    </div>
  );
}