import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: '01',
    title: 'AI Consultancy',
    desc: 'Delivering tailored AI solutions that enhance operational efficiency and drive exponential business growth through intelligent automation. From strategy to deployment — end to end.',
    tags: ['LLM Integration', 'Automation', 'AI Strategy', 'Process Optimization'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a10 10 0 1 0 10 10H12V2z"/>
        <path d="M12 2a10 10 0 0 1 10 10"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Business Development',
    desc: 'Strategic business development that accelerates growth, builds lasting partnerships, and opens new revenue streams. I connect the dots between technology and market opportunity.',
    tags: ['GTM Strategy', 'Partnerships', 'Revenue Growth', 'Market Research'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
        <polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Project Management',
    desc: 'End-to-end project delivery with precision planning, agile execution, and measurable outcomes. I ensure every milestone is met — on time, on budget, on vision.',
    tags: ['Agile / Scrum', 'Risk Management', 'Team Leadership', 'Delivery'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
        <path d="M8 14h.01M12 14h.01M16 14h.01" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Design Thinking',
    desc: 'Human-centered problem solving through empathy, ideation, and rapid prototyping. Certified practitioner approach — turning complex problems into elegant, user-first solutions.',
    tags: ['User Research', 'Ideation', 'Prototyping', 'Facilitation'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
  },
];

function ServiceRow({ s }) {
  const [open, setOpen] = useState(false);
  const bodyRef  = useRef(null);
  const rowRef   = useRef(null);
  const lineRef  = useRef(null);

  const toggle = () => {
    if (!open) {
      setOpen(true);
      gsap.fromTo(bodyRef.current,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.55, ease: 'power3.out' }
      );
      gsap.to(lineRef.current, { scaleX: 1, duration: 0.6, ease: 'power3.out' });
    } else {
      gsap.to(bodyRef.current, {
        height: 0, opacity: 0, duration: 0.4, ease: 'power3.in',
        onComplete: () => setOpen(false),
      });
      gsap.to(lineRef.current, { scaleX: 0, duration: 0.4, ease: 'power3.in' });
    }
  };

  return (
    <div
      ref={rowRef}
      className="svc-row relative"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* expanding gold underline */}
      <div
        ref={lineRef}
        className="absolute bottom-0 left-0 right-0 origin-left"
        style={{
          height: '1px',
          background: 'linear-gradient(to right, #C9A84C, rgba(201,168,76,0.2))',
          transform: 'scaleX(0)',
        }}
      />

      {/* Row header — clickable */}
      <button
        onClick={toggle}
        className="w-full flex items-center gap-6 py-7 text-left group"
        style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
      >
        {/* number */}
        <span
          className="font-body text-xs tracking-[.25em] flex-shrink-0 transition-colors duration-300"
          style={{
            color: open ? '#C9A84C' : 'rgba(255,255,255,0.3)',
            width: '2.5rem',
          }}
        >
          {s.number}
        </span>

        {/* icon */}
        <span
          className="flex-shrink-0 transition-colors duration-300"
          style={{ color: open ? '#C9A84C' : 'rgba(255,255,255,0.4)' }}
        >
          {s.icon}
        </span>

        {/* title */}
        <span
          className="font-title flex-1 transition-colors duration-300"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
            letterSpacing: '.05em',
            lineHeight: 1,
            color: open ? '#C9A84C' : '#fff',
          }}
        >
          {s.title}
        </span>

        {/* plus / minus */}
        <span
          className="flex-shrink-0 font-body text-2xl transition-all duration-300"
          style={{
            color: open ? '#C9A84C' : 'rgba(255,255,255,0.3)',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            lineHeight: 1,
          }}
        >
          +
        </span>
      </button>

      {/* Expandable body */}
      <div
        ref={bodyRef}
        style={{ height: 0, overflow: 'hidden', opacity: 0 }}
      >
        <div className="pl-[4.5rem] pb-8 pr-4 md:pr-16 flex flex-col md:flex-row gap-8 md:gap-16">
          {/* desc */}
          <p
            className="font-body text-base leading-relaxed flex-1"
            style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}
          >
            {s.desc}
          </p>
          {/* tags */}
          <div className="flex flex-wrap gap-2 md:flex-col md:flex-nowrap md:gap-2 flex-shrink-0">
            {s.tags.map(t => (
              <span
                key={t}
                className="font-body text-xs tracking-widest uppercase px-3 py-1.5 whitespace-nowrap"
                style={{
                  color: '#C9A84C',
                  border: '1px solid rgba(201,168,76,0.3)',
                  background: 'rgba(201,168,76,0.06)',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef(null);
  const headRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current.querySelectorAll('.reveal'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: headRef.current, start: 'top 86%', toggleActions: 'play none none none' } }
      );
      gsap.fromTo('.svc-row',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: '.svc-row', start: 'top 88%', toggleActions: 'play none none none' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-28 px-6 md:px-14 relative"
      style={{ background: '#050505' }}>

      {/* ambient */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" style={{
        width: '500px', height: '500px',
        background: 'radial-gradient(circle,rgba(201,168,76,0.05) 0%,transparent 70%)',
        filter: 'blur(60px)',
      }}/>

      <div ref={headRef} className="max-w-7xl mx-auto">

        {/* heading */}
        <p className="reveal section-label">02 / What I Do</p>
        <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4">
          <h2 className="section-title text-white">My Services</h2>
          <p className="font-body text-sm" style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 300, maxWidth: '280px', lineHeight: 1.7 }}>
            Click any service to explore what I offer.
          </p>
        </div>

        {/* gold line */}
        <div className="reveal mb-14" style={{ height: '1px', background: 'linear-gradient(to right,#C9A84C,rgba(201,168,76,0.06))' }}/>

        {/* top border */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {services.map((s) => (
            <ServiceRow key={s.number} s={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
