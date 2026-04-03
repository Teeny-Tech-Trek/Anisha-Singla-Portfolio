import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── SVG Visuals (tight glow, contained, no overflow) ────────────────────────

const VisualAI = () => (
  <svg viewBox="0 0 360 280" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height:'100%', overflow:'visible' }}>
    <defs>
      <radialGradient id="gAI" cx="50%" cy="50%" r="42%">
        <stop offset="0%"   stopColor="#C9A84C" stopOpacity="0.28"/>
        <stop offset="70%"  stopColor="#C9A84C" stopOpacity="0.06"/>
        <stop offset="100%" stopColor="#C9A84C" stopOpacity="0"/>
      </radialGradient>
      <filter id="fAI" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2.5" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>

    {/* tight radial bg glow */}
    <ellipse cx="180" cy="140" rx="110" ry="90" fill="url(#gAI)"/>

    {/* 8 spokes */}
    {[0,1,2,3,4,5,6,7].map(i => {
      const angle = i * Math.PI / 4;
      const x2 = 180 + Math.cos(angle) * 95;
      const y2 = 140 + Math.sin(angle) * 80;
      const xm = 180 + Math.cos(angle) * 55;
      const ym = 140 + Math.sin(angle) * 46;
      return (
        <g key={i} filter="url(#fAI)">
          <line x1={180} y1={140} x2={x2} y2={y2}
            stroke="#C9A84C" strokeWidth="0.9" strokeOpacity="0.45"/>
          <circle cx={x2} cy={y2} r="4.5" fill="#C9A84C" fillOpacity="0.75"/>
          <circle cx={xm} cy={ym} r="2.2" fill="none" stroke="#C9A84C" strokeWidth="0.8" strokeOpacity="0.5"/>
        </g>
      );
    })}

    {/* center rings */}
    <circle cx="180" cy="140" r="20" fill="none" stroke="#C9A84C" strokeWidth="1" strokeOpacity="0.55"/>
    <circle cx="180" cy="140" r="9"  fill="#C9A84C" fillOpacity="0.25"/>
    <circle cx="180" cy="140" r="4"  fill="#C9A84C" fillOpacity="0.95"/>

    {/* orbit rings — tight */}
    <ellipse cx="180" cy="140" rx="118" ry="98" fill="none" stroke="#C9A84C" strokeWidth="0.4" strokeOpacity="0.18" strokeDasharray="5 9"/>
    <ellipse cx="180" cy="140" rx="78"  ry="65" fill="none" stroke="#C9A84C" strokeWidth="0.4" strokeOpacity="0.13" strokeDasharray="3 6"/>
  </svg>
);

const VisualBD = () => {
  const bars = [
    {x:52,  h:55,  o:0.30},
    {x:110, h:90,  o:0.40},
    {x:168, h:68,  o:0.35},
    {x:226, h:128, o:0.55},
    {x:284, h:100, o:0.45},
  ];
  const trendPts = bars.map((b,i) => `${b.x+16},${230-b.h}`).join(' ');
  return (
    <svg viewBox="0 0 360 280" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height:'100%' }}>
      <defs>
        <radialGradient id="gBD" cx="50%" cy="80%" r="55%">
          <stop offset="0%"   stopColor="#C9A84C" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="180" cy="210" rx="160" ry="70" fill="url(#gBD)"/>

      {bars.map((b,i) => (
        <g key={i}>
          <rect x={b.x} y={230-b.h} width="32" height={b.h}
            fill="#C9A84C" fillOpacity={b.o} rx="2"/>
          <rect x={b.x} y={227-b.h} width="32" height="3.5"
            fill="#C9A84C" fillOpacity={Math.min(b.o+0.28,1)} rx="1"/>
        </g>
      ))}

      {/* trend line */}
      <polyline points={trendPts} fill="none"
        stroke="#C9A84C" strokeWidth="1.6" strokeOpacity="0.65" strokeLinejoin="round"/>
      {bars.map((b,i) => (
        <circle key={i} cx={b.x+16} cy={230-b.h} r="4" fill="#C9A84C" fillOpacity="0.9"/>
      ))}

      {/* baseline */}
      <line x1="36" y1="230" x2="324" y2="230"
        stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
    </svg>
  );
};

const VisualPM = () => {
  const rows = [
    {y:80,  x1:60,  w:160, label:'RESEARCH',  active:false, done:true},
    {y:120, x1:170, w:110, label:'STRATEGY',  active:false, done:true},
    {y:160, x1:100, w:180, label:'EXECUTION', active:true,  done:false},
    {y:200, x1:230, w:120, label:'REVIEW',    active:false, done:false},
    {y:240, x1:290, w:90,  label:'LAUNCH',    active:false, done:false},
  ];
  return (
    <svg viewBox="0 0 360 280" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height:'100%' }}>
      <defs>
        <radialGradient id="gPM" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#C9A84C" stopOpacity="0.12"/>
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="180" cy="160" rx="150" ry="110" fill="url(#gPM)"/>
      {rows.map((r,i) => (
        <g key={i}>
          <rect x={r.x1} y={r.y-11} width={r.w} height="21"
            fill={r.active ? '#C9A84C' : r.done ? 'rgba(201,168,76,0.32)' : 'rgba(255,255,255,0.05)'}
            rx="2.5"/>
          {r.active && (
            <rect x={r.x1} y={r.y-11} width={r.w} height="21"
              fill="none" stroke="#C9A84C" strokeWidth="1" rx="2.5" strokeOpacity="0.7"/>
          )}
          <text x={r.x1+8} y={r.y+3.5}
            fill={r.active ? '#000' : r.done ? 'rgba(201,168,76,0.85)' : 'rgba(255,255,255,0.28)'}
            fontSize="8.5" fontFamily="DM Sans,sans-serif" letterSpacing="0.8" fontWeight="600">
            {r.label}
          </text>
        </g>
      ))}
      {/* now line */}
      <line x1="200" y1="58" x2="200" y2="262"
        stroke="#C9A84C" strokeWidth="1" strokeOpacity="0.35" strokeDasharray="4 5"/>
      <text x="205" y="68" fill="#C9A84C" fontSize="7.5" fontFamily="DM Sans" opacity="0.55" letterSpacing="1">NOW</text>
    </svg>
  );
};

const VisualDT = () => {
  const phases = [
    {cx:60,  cy:140, label:'EMPATHIZE'},
    {cx:135, cy:88,  label:'DEFINE'},
    {cx:180, cy:140, label:'IDEATE', center:true},
    {cx:225, cy:88,  label:'PROTOTYPE'},
    {cx:300, cy:140, label:'TEST'},
  ];
  return (
    <svg viewBox="0 0 360 280" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height:'100%' }}>
      <defs>
        <radialGradient id="gDT" cx="50%" cy="50%" r="45%">
          <stop offset="0%"   stopColor="#C9A84C" stopOpacity="0.22"/>
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0"/>
        </radialGradient>
        <filter id="fDT" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <ellipse cx="180" cy="130" rx="140" ry="100" fill="url(#gDT)"/>

      {phases.map((p,i,arr) => i < arr.length-1 && (
        <line key={i} x1={p.cx} y1={p.cy} x2={arr[i+1].cx} y2={arr[i+1].cy}
          stroke="#C9A84C" strokeWidth="0.9" strokeOpacity="0.28" strokeDasharray="4 5"/>
      ))}

      {phases.map((p,i) => (
        <g key={i} filter={p.center ? "url(#fDT)" : undefined}>
          <circle cx={p.cx} cy={p.cy}
            r={p.center ? 28 : 18}
            fill="none" stroke="#C9A84C"
            strokeWidth={p.center ? 1.4 : 0.8}
            strokeOpacity={p.center ? 0.75 : 0.38}/>
          {p.center && (
            <circle cx={p.cx} cy={p.cy} r="12" fill="#C9A84C" fillOpacity="0.18"/>
          )}
          <circle cx={p.cx} cy={p.cy} r={p.center ? 5 : 3.5}
            fill="#C9A84C" fillOpacity={p.center ? 1 : 0.6}/>
          <text x={p.cx} y={p.cy + (i===1||i===3 ? -26 : 34)}
            textAnchor="middle"
            fill="#C9A84C" fontSize="7.5" fontFamily="DM Sans" opacity="0.65" letterSpacing="0.8" fontWeight="600">
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const services = [
  {
    number: '01',
    title: 'AI Consultancy',
    subtitle: 'Intelligence that works for you',
    desc: 'We design and deploy custom AI systems that transform how your business operates — from intelligent automation to LLM-powered workflows.',
    tags: ['LLM Integration', 'Automation', 'AI Strategy', 'Process Optimization'],
    Visual: VisualAI,
    flip: false,
  },
  {
    number: '02',
    title: 'Business Development',
    subtitle: 'Growth by design, not by chance',
    desc: 'Strategic partnerships, go-to-market execution, and revenue architecture — built for sustainable scale and market dominance.',
    tags: ['GTM Strategy', 'Partnerships', 'Revenue Growth', 'Market Research'],
    Visual: VisualBD,
    flip: true,
  },
  {
    number: '03',
    title: 'Project Management',
    subtitle: 'Every milestone, delivered',
    desc: 'Precision planning meets agile execution. I manage complexity so your team stays focused — on time, on budget, beyond expectations.',
    tags: ['Agile / Scrum', 'Risk Management', 'Team Leadership', 'Delivery'],
    Visual: VisualPM,
    flip: false,
  },
  {
    number: '04',
    title: 'Design Thinking',
    subtitle: 'Problems solved from the inside out',
    desc: 'Certified Design Thinking practitioner — I facilitate human-centered workshops that turn ambiguity into actionable, elegant solutions.',
    tags: ['User Research', 'Ideation', 'Prototyping', 'Facilitation'],
    Visual: VisualDT,
    flip: true,
  },
];

// ─── Single service section ───────────────────────────────────────────────────
function ServiceSection({ s, i }) {
  const secRef  = useRef(null);
  const textRef = useRef(null);
  const visRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current,
        { opacity: 0, x: s.flip ? 50 : -50 },
        {
          opacity: 1, x: 0, duration: 1.0, ease: 'power3.out',
          scrollTrigger: { trigger: secRef.current, start: 'top 78%', toggleActions: 'play none none none' },
        }
      );
      gsap.fromTo(visRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out', delay: 0.12,
          scrollTrigger: { trigger: secRef.current, start: 'top 78%', toggleActions: 'play none none none' },
        }
      );
      gsap.fromTo(textRef.current.querySelectorAll('.svc-tag'),
        { opacity: 0, y: 10 },
        {
          opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.07, delay: 0.35,
          scrollTrigger: { trigger: secRef.current, start: 'top 78%', toggleActions: 'play none none none' },
        }
      );
    }, secRef);
    return () => ctx.revert();
  }, []);

  const TextBlock = (
    <div ref={textRef} className="flex flex-col justify-center">
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <span className="font-body text-xs tracking-[.28em] uppercase font-semibold"
          style={{ color: '#C9A84C' }}>{s.number}</span>
        <div style={{ width:'28px', height:'1px', background:'rgba(201,168,76,0.5)' }}/>
        <span className="font-body text-xs tracking-[.16em] uppercase"
          style={{ color:'rgba(255,255,255,0.4)' }}>{s.subtitle}</span>
      </div>

      <h3 className="font-title mb-5"
        style={{
          fontFamily:"'Bebas Neue',sans-serif",
          fontSize:'clamp(2.6rem,5vw,5rem)',
          letterSpacing:'.03em', lineHeight:0.92, color:'#fff',
        }}>
        {s.title}
      </h3>

      <div className="mb-6" style={{ width:'44px', height:'2px', background:'#C9A84C' }}/>

      <p className="font-body text-base leading-relaxed mb-8"
        style={{ color:'rgba(255,255,255,0.62)', fontWeight:300, maxWidth:'400px' }}>
        {s.desc}
      </p>

      <div className="flex flex-wrap gap-x-5 gap-y-2">
        {s.tags.map(t => (
          <span key={t} className="svc-tag font-body text-xs tracking-widest uppercase font-medium"
            style={{ color:'rgba(255,255,255,0.5)' }}>
            <span style={{ color:'#C9A84C', marginRight:'5px' }}>✦</span>{t}
          </span>
        ))}
      </div>
    </div>
  );

  const VisualBlock = (
    <div ref={visRef}
      className="flex items-center justify-center w-full"
      style={{ minHeight:'260px' }}>
      {/* tight wrapper — no overflow */}
      <div style={{ width:'100%', maxWidth:'360px', aspectRatio:'360/280', position:'relative' }}>
        <s.Visual />
      </div>
    </div>
  );

  return (
    <div ref={secRef}
      className="svc-section relative py-16 md:py-24"
      style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.07)' }}>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
        {/* mobile: always text first, visual second */}
        <div className="order-2 md:order-none">
          {s.flip ? VisualBlock : TextBlock}
        </div>
        <div className="order-1 md:order-none">
          {s.flip ? TextBlock : VisualBlock}
        </div>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function Services() {
  const sectionRef = useRef(null);
  const headRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current.querySelectorAll('.reveal'),
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: headRef.current, start: 'top 86%', toggleActions: 'play none none none' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative px-6 md:px-14"
      style={{ background:'#050505' }}>

      {/* heading */}
      <div ref={headRef} className="max-w-7xl mx-auto pt-28 pb-10">
        <p className="reveal section-label">02 / What I Do</p>
        <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2 className="section-title text-white">My Services</h2>
          <p className="font-body text-sm font-medium"
            style={{ color:'rgba(255,255,255,0.45)', maxWidth:'300px', lineHeight:1.7 }}>
            Four core areas where I create transformative impact.
          </p>
        </div>
        <div className="reveal mt-8"
          style={{ height:'1px', background:'linear-gradient(to right,#C9A84C,rgba(201,168,76,0.06))' }}/>
      </div>

      {services.map((s,i) => <ServiceSection key={s.number} s={s} i={i}/>)}

      <div style={{ borderTop:'1px solid rgba(255,255,255,0.07)', paddingBottom:'4rem' }}/>
    </section>
  );
}