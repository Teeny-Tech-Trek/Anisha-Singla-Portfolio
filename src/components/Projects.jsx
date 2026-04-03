import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects, statusStyle } from '../data/projectsData';

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ p, featured = false }) {
  const cardRef = useRef(null);

  const handleEnter = () => {
    gsap.to(cardRef.current, { y: featured ? -4 : -7, duration: .35, ease: 'power2.out',
      boxShadow: '0 20px 50px rgba(201,168,76,0.13)' });
    const arrow = cardRef.current.querySelector('.card-arrow');
    if (arrow) gsap.to(arrow, { x: 5, opacity: 1, duration: .3 });
  };

  const handleLeave = () => {
    gsap.to(cardRef.current, { y: 0, duration: .35, ease: 'power2.out', boxShadow: 'none' });
    const arrow = cardRef.current.querySelector('.card-arrow');
    if (arrow) gsap.to(arrow, { x: 0, opacity: 0, duration: .3 });
  };

  const handleClick = () => {
    if (p.status === 'Live' && p.liveUrl) {
      window.open(p.liveUrl, '_blank', 'noreferrer');
    }
  };

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden"
      style={{
        background: '#0d0d0d',
        border: featured ? '1px solid rgba(201,168,76,0.25)' : '1px solid rgba(255,255,255,0.07)',
        borderTop: `2px solid ${featured ? '#C9A84C' : 'rgba(201,168,76,0.3)'}`,
        transition: 'box-shadow .35s ease',
        cursor: p.status === 'Live' && p.liveUrl ? 'pointer' : 'default',
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: p.gradient, opacity: .6 }} />

      <div className={`relative z-10 flex flex-col ${featured ? 'p-8 md:p-10' : 'p-6 min-h-[260px]'}`}>

        {/* Badges */}
        <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
          <span className="font-body text-xs tracking-widest uppercase px-3 py-1"
            style={{ background: 'rgba(201,168,76,0.1)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.25)' }}>
            {p.category}
          </span>

          {p.status === 'Live' && p.liveUrl ? (
            <span
              className="font-body text-xs font-bold px-3 py-1 flex items-center gap-1.5"
              style={{ background: statusStyle[p.status].bg, color: statusStyle[p.status].color,
                border: `1px solid ${statusStyle[p.status].border}` }}>
              ● {p.status}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </span>
          ) : (
            <span className="font-body text-xs font-bold px-3 py-1"
              style={{ background: statusStyle[p.status]?.bg, color: statusStyle[p.status]?.color,
                border: `1px solid ${statusStyle[p.status]?.border}` }}>
              ● {p.status}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-title mb-3 text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif",
            fontSize: featured ? 'clamp(2rem,3.5vw,2.8rem)' : '1.75rem',
            letterSpacing: '.04em', lineHeight: 1 }}>
          {p.title}
        </h3>

        {/* Desc */}
        <p className="font-body text-sm leading-relaxed flex-1"
          style={{ color: 'rgba(255,255,255,0.48)', fontWeight: 300 }}>
          {p.description}
        </p>

        {/* Footer */}
        <div className="mt-5">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {p.tags.map(t => (
              <span key={t} className="font-body text-xs px-2.5 py-1"
                style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.38)',
                  border: '1px solid rgba(255,255,255,0.08)' }}>
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem' }}>
            <span className="font-body text-xs tracking-widest" style={{ color: 'rgba(255,255,255,0.22)' }}>
              {p.year}
            </span>
            {/* <div className="card-arrow flex items-center gap-1.5 font-body text-xs tracking-widest uppercase text-gold"
              style={{ opacity: 0 }}>
              View
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects({ onViewAll }) {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef    = useRef(null);

  const visible  = projects.slice(0, 4);
  const featured = visible[0];
  const rest     = visible.slice(1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current.querySelectorAll('.reveal'),
        { opacity: 0, y: 55 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: .12,
          scrollTrigger: { trigger: headingRef.current, start: 'top 86%', toggleActions: 'play none none none' } });

      gsap.fromTo('.feat-card',
        { opacity: 0, x: -70 },
        { opacity: 1, x: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.feat-card', start: 'top 83%', toggleActions: 'play none none none' } });

      gsap.fromTo(gridRef.current.querySelectorAll('.proj-card'),
        { opacity: 0, y: 65, scale: .96 },
        { opacity: 1, y: 0, scale: 1, duration: .88, ease: 'power3.out', stagger: .11,
          scrollTrigger: { trigger: gridRef.current, start: 'top 83%', toggleActions: 'play none none none' } });

      gsap.fromTo('.view-all-btn',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: .8, ease: 'power2.out',
          scrollTrigger: { trigger: '.view-all-btn', start: 'top 92%', toggleActions: 'play none none none' } });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-28 px-6 md:px-14 relative" style={{ background: '#000' }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ position:'absolute',top:'8%',right:'-8%',width:'500px',height:'500px',borderRadius:'50%',background:'radial-gradient(circle,rgba(201,168,76,0.05) 0%,transparent 70%)',filter:'blur(60px)' }}/>
        <div style={{ position:'absolute',bottom:'8%',left:'-8%',width:'400px',height:'400px',borderRadius:'50%',background:'radial-gradient(circle,rgba(100,150,255,0.04) 0%,transparent 70%)',filter:'blur(60px)' }}/>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Heading */}
        <div ref={headingRef} className="mb-14">
          <p className="reveal font-body text-xs tracking-[.35em] uppercase mb-2" style={{ color: '#C9A84C' }}>
            04 / Selected Work
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="reveal font-title" style={{ fontFamily:"'Bebas Neue',sans-serif",
              fontSize:'clamp(3rem,6vw,5.5rem)', letterSpacing:'.05em', lineHeight:1, color:'#fff' }}>
              Projects
            </h2>
            <p className="reveal font-body text-sm max-w-xs"
              style={{ color:'rgba(255,255,255,0.38)', fontWeight:300, lineHeight:1.7 }}>
              A curated selection of work spanning AI, product design, and business strategy.
            </p>
          </div>
          <div className="reveal mt-8"
            style={{ height:'1px', background:'linear-gradient(to right,#C9A84C,rgba(201,168,76,0.08))' }}/>
        </div>

        {/* Featured full-width */}
        <div className="feat-card mb-6">
          <ProjectCard p={featured} featured={true} />
        </div>

        {/* 3-col grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map(p => (
            <div key={p.id} className="proj-card">
              <ProjectCard p={p} />
            </div>
          ))}
        </div>

        {/* View All */}
        {projects.length > 7 && (
          <div className="view-all-btn mt-14 flex justify-center">
            <button onClick={onViewAll}
              className="font-body flex items-center gap-3 transition-all duration-300"
              style={{ fontWeight:600, fontSize:'.72rem', letterSpacing:'.2em', textTransform:'uppercase',
                color:'#C9A84C', padding:'.9rem 3rem', border:'1px solid rgba(201,168,76,0.4)',
                background:'transparent', cursor:'pointer' }}
              onMouseEnter={e=>{ e.currentTarget.style.background='#C9A84C'; e.currentTarget.style.color='#000'; e.currentTarget.style.transform='translateY(-2px)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#C9A84C'; e.currentTarget.style.transform='translateY(0)'; }}>
              View All Projects
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}