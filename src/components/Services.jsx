import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Animated SVG Visuals ─────────────────────────────────────────────────────

const VisualAI = ({ visRef }) => (
  <svg ref={visRef} viewBox="0 0 360 280" xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', height: '100%', overflow: 'visible' }}>
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

    {/* bg glow */}
    <ellipse className="ai-glow" cx="180" cy="140" rx="110" ry="90"
      fill="url(#gAI)" opacity="0"/>

    {/* 8 spokes */}
    {[0,1,2,3,4,5,6,7].map(i => {
      const angle = i * Math.PI / 4;
      const x2 = 180 + Math.cos(angle) * 95;
      const y2 = 140 + Math.sin(angle) * 80;
      const xm = 180 + Math.cos(angle) * 55;
      const ym = 140 + Math.sin(angle) * 46;
      return (
        <g key={i} className="ai-spoke" opacity="0" filter="url(#fAI)">
          <line x1={180} y1={140} x2={x2} y2={y2}
            stroke="#C9A84C" strokeWidth="0.9" strokeOpacity="0.45"/>
          <circle cx={x2} cy={y2} r="4.5" fill="#C9A84C" fillOpacity="0.75"/>
          <circle cx={xm} cy={ym} r="2.2" fill="none" stroke="#C9A84C"
            strokeWidth="0.8" strokeOpacity="0.5"/>
        </g>
      );
    })}

    {/* center rings */}
    <circle className="ai-ring" cx="180" cy="140" r="20"
      fill="none" stroke="#C9A84C" strokeWidth="1" strokeOpacity="0" />
    <circle className="ai-inner" cx="180" cy="140" r="9"
      fill="#C9A84C" fillOpacity="0"/>
    <circle className="ai-dot" cx="180" cy="140" r="4"
      fill="#C9A84C" fillOpacity="0"/>

    {/* orbit rings */}
    <ellipse className="ai-orbit1" cx="180" cy="140" rx="118" ry="98"
      fill="none" stroke="#C9A84C" strokeWidth="0.4" strokeOpacity="0" strokeDasharray="5 9"/>
    <ellipse className="ai-orbit2" cx="180" cy="140" rx="78" ry="65"
      fill="none" stroke="#C9A84C" strokeWidth="0.4" strokeOpacity="0" strokeDasharray="3 6"/>
  </svg>
);

const VisualBD = ({ visRef }) => {
  const bars = [
    { x: 52,  h: 55,  o: 0.30 },
    { x: 110, h: 90,  o: 0.40 },
    { x: 168, h: 68,  o: 0.35 },
    { x: 226, h: 128, o: 0.55 },
    { x: 284, h: 100, o: 0.45 },
  ];
  const trendPts = bars.map(b => `${b.x + 16},${230 - b.h}`).join(' ');
  return (
    <svg ref={visRef} viewBox="0 0 360 280" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id="gBD" cx="50%" cy="80%" r="55%">
          <stop offset="0%"   stopColor="#C9A84C" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0"/>
        </radialGradient>
      </defs>

      <ellipse className="bd-glow" cx="180" cy="210" rx="160" ry="70"
        fill="url(#gBD)" opacity="0"/>

      {bars.map((b, i) => (
        <g key={i} className="bd-bar" opacity="0"
          style={{ transform: 'translateY(30px)' }}>
          <rect x={b.x} y={230 - b.h} width="32" height={b.h}
            fill="#C9A84C" fillOpacity={b.o} rx="2"/>
          <rect x={b.x} y={227 - b.h} width="32" height="3.5"
            fill="#C9A84C" fillOpacity={Math.min(b.o + 0.28, 1)} rx="1"/>
        </g>
      ))}

      <polyline className="bd-trend" points={trendPts}
        fill="none" stroke="#C9A84C" strokeWidth="1.6"
        strokeOpacity="0" strokeLinejoin="round"/>

      {bars.map((b, i) => (
        <circle key={i} className="bd-dot" cx={b.x + 16} cy={230 - b.h}
          r="4" fill="#C9A84C" fillOpacity="0"/>
      ))}

      <line x1="36" y1="230" x2="324" y2="230"
        stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
    </svg>
  );
};

const VisualPM = ({ visRef }) => {
  const rows = [
    { y: 80,  x1: 60,  w: 160, label: 'RESEARCH',  active: false, done: true  },
    { y: 120, x1: 170, w: 110, label: 'STRATEGY',  active: false, done: true  },
    { y: 160, x1: 100, w: 180, label: 'EXECUTION', active: true,  done: false },
    { y: 200, x1: 230, w: 120, label: 'REVIEW',    active: false, done: false },
    { y: 240, x1: 290, w: 90,  label: 'LAUNCH',    active: false, done: false },
  ];
  return (
    <svg ref={visRef} viewBox="0 0 360 280" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id="gPM" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#C9A84C" stopOpacity="0.12"/>
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="180" cy="160" rx="150" ry="110" fill="url(#gPM)"/>

      {rows.map((r, i) => (
        <g key={i} className="pm-row" opacity="0">
          <rect x={r.x1} y={r.y - 11} width={r.w} height="21"
            fill={r.active ? '#C9A84C' : r.done ? 'rgba(201,168,76,0.32)' : 'rgba(255,255,255,0.05)'}
            rx="2.5"/>
          {r.active && (
            <rect x={r.x1} y={r.y - 11} width={r.w} height="21"
              fill="none" stroke="#C9A84C" strokeWidth="1" rx="2.5" strokeOpacity="0.7"/>
          )}
          <text x={r.x1 + 8} y={r.y + 3.5}
            fill={r.active ? '#000' : r.done ? 'rgba(201,168,76,0.85)' : 'rgba(255,255,255,0.28)'}
            fontSize="8.5" fontFamily="DM Sans,sans-serif" letterSpacing="0.8" fontWeight="600">
            {r.label}
          </text>
        </g>
      ))}

      <line className="pm-now" x1="200" y1="58" x2="200" y2="262"
        stroke="#C9A84C" strokeWidth="1" strokeOpacity="0" strokeDasharray="4 5"/>
      <text className="pm-now-label" x="205" y="68"
        fill="#C9A84C" fontSize="7.5" fontFamily="DM Sans" opacity="0" letterSpacing="1">
        NOW
      </text>
    </svg>
  );
};

const VisualDT = ({ visRef }) => {
  const phases = [
    { cx: 60,  cy: 140, label: 'EMPATHIZE' },
    { cx: 135, cy: 88,  label: 'DEFINE'    },
    { cx: 180, cy: 140, label: 'IDEATE',   center: true },
    { cx: 225, cy: 88,  label: 'PROTOTYPE' },
    { cx: 300, cy: 140, label: 'TEST'      },
  ];
  return (
    <svg ref={visRef} viewBox="0 0 360 280" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}>
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

      <ellipse className="dt-glow" cx="180" cy="130" rx="140" ry="100"
        fill="url(#gDT)" opacity="0"/>

      {phases.map((p, i, arr) => i < arr.length - 1 && (
        <line key={i} className="dt-line" x1={p.cx} y1={p.cy}
          x2={arr[i + 1].cx} y2={arr[i + 1].cy}
          stroke="#C9A84C" strokeWidth="0.9" strokeOpacity="0" strokeDasharray="4 5"/>
      ))}

      {phases.map((p, i) => (
        <g key={i} className="dt-node" opacity="0"
          filter={p.center ? 'url(#fDT)' : undefined}>
          <circle cx={p.cx} cy={p.cy} r={p.center ? 28 : 18}
            fill="none" stroke="#C9A84C"
            strokeWidth={p.center ? 1.4 : 0.8}
            strokeOpacity={p.center ? 0.75 : 0.38}/>
          {p.center && (
            <circle cx={p.cx} cy={p.cy} r="12"
              fill="#C9A84C" fillOpacity="0.18"/>
          )}
          <circle cx={p.cx} cy={p.cy} r={p.center ? 5 : 3.5}
            fill="#C9A84C" fillOpacity={p.center ? 1 : 0.6}/>
          <text x={p.cx} y={p.cy + (i === 1 || i === 3 ? -26 : 34)}
            textAnchor="middle" fill="#C9A84C"
            fontSize="7.5" fontFamily="DM Sans" opacity="0.65"
            letterSpacing="0.8" fontWeight="600">
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
};

// ─── SVG animation hooks ───────────────────────────────────────────────────────

function useAIAnimation(svgRef, trigger) {
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = svgRef.current;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      });
      tl.to(svg.querySelector('.ai-glow'), { opacity: 1, duration: 0.8 })
        .to(svg.querySelector('.ai-dot'),   { attr: { fillOpacity: 0.95 }, duration: 0.3 }, '-=0.3')
        .to(svg.querySelector('.ai-ring'),  { attr: { strokeOpacity: 0.55 }, duration: 0.5 }, '-=0.2')
        .to(svg.querySelector('.ai-inner'), { attr: { fillOpacity: 0.25 }, duration: 0.4 }, '-=0.3')
        .to(svg.querySelectorAll('.ai-spoke'), {
          opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power2.out',
        }, '-=0.2')
        .to(svg.querySelector('.ai-orbit1'), { attr: { strokeOpacity: 0.18 }, duration: 0.6 }, '-=0.4')
        .to(svg.querySelector('.ai-orbit2'), { attr: { strokeOpacity: 0.13 }, duration: 0.6 }, '-=0.5');

      // continuous pulse on spokes
      gsap.to(svg.querySelectorAll('.ai-spoke'), {
        opacity: 0.6, repeat: -1, yoyo: true, duration: 2.2,
        ease: 'sine.inOut', stagger: 0.15, delay: 1.5,
      });
    }, svg);
    return () => ctx.revert();
  }, [svgRef, trigger]);
}

function useBDAnimation(svgRef, trigger) {
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = svgRef.current;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      });
      tl.to(svg.querySelector('.bd-glow'), { opacity: 1, duration: 0.6 })
        .to(svg.querySelectorAll('.bd-bar'), {
          opacity: 1, y: 0, duration: 0.55, stagger: 0.09, ease: 'power3.out',
        }, 0.2)
        .to(svg.querySelector('.bd-trend'), { attr: { strokeOpacity: 0.65 }, duration: 0.5 }, 0.7)
        .to(svg.querySelectorAll('.bd-dot'), {
          attr: { fillOpacity: 0.9 }, duration: 0.3, stagger: 0.07,
        }, 0.8);
    }, svg);
    return () => ctx.revert();
  }, [svgRef, trigger]);
}

function usePMAnimation(svgRef, trigger) {
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = svgRef.current;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      });
      tl.to(svg.querySelectorAll('.pm-row'), {
          opacity: 1, x: 0, duration: 0.45, stagger: 0.12, ease: 'power3.out',
        })
        .to(svg.querySelector('.pm-now'), { attr: { strokeOpacity: 0.35 }, duration: 0.4 }, 0.6)
        .to(svg.querySelector('.pm-now-label'), { opacity: 0.55, duration: 0.4 }, 0.65);

      // active bar pulse
      const activeRect = svg.querySelectorAll('.pm-row')[2]?.querySelector('rect');
      if (activeRect) {
        gsap.to(activeRect, {
          attr: { fill: '#dab84e' }, repeat: -1, yoyo: true,
          duration: 1.8, ease: 'sine.inOut', delay: 1.2,
        });
      }
    }, svg);

    // set initial x offset for slide-in
    gsap.set(svg.querySelectorAll('.pm-row'), { x: -20 });

    return () => ctx.revert();
  }, [svgRef, trigger]);
}

function useDTAnimation(svgRef, trigger) {
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = svgRef.current;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      });
      tl.to(svg.querySelector('.dt-glow'), { opacity: 1, duration: 0.7 })
        .to(svg.querySelectorAll('.dt-line'), {
          attr: { strokeOpacity: 0.28 }, duration: 0.3, stagger: 0.1,
        }, 0.2)
        .to(svg.querySelectorAll('.dt-node'), {
          opacity: 1, scale: 1, duration: 0.4, stagger: 0.12, ease: 'back.out(1.4)',
          transformOrigin: 'center center',
        }, 0.35);

      // center node continuous glow pulse
      const centerNode = svg.querySelectorAll('.dt-node')[2];
      if (centerNode) {
        gsap.to(centerNode, {
          opacity: 0.75, repeat: -1, yoyo: true,
          duration: 1.9, ease: 'sine.inOut', delay: 1.5,
        });
      }
    }, svg);

    gsap.set(svg.querySelectorAll('.dt-node'), { scale: 0.8, transformOrigin: 'center center' });

    return () => ctx.revert();
  }, [svgRef, trigger]);
}

// ─── Service sections ─────────────────────────────────────────────────────────

function ServiceAI({ s, i }) {
  const secRef  = useRef(null);
  const textRef = useRef(null);
  const svgRef  = useRef(null);
  const visRef  = useRef(null);

  useAIAnimation(svgRef, secRef.current);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: secRef.current, start: 'top 78%', toggleActions: 'play none none none' };
      gsap.fromTo(textRef.current, { opacity: 0, x: s.flip ? 50 : -50 },
        { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out', scrollTrigger: st });
      gsap.fromTo(visRef.current, { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out', delay: 0.12, scrollTrigger: st });
      gsap.fromTo(textRef.current.querySelectorAll('.svc-tag'), { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.07, delay: 0.35, scrollTrigger: st });
    }, secRef);
    return () => ctx.revert();
  }, []);

  // trigger SVG animation after section mounts
  useEffect(() => {
    if (!secRef.current || !svgRef.current) return;
    const svg = svgRef.current;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: secRef.current, start: 'top 78%', toggleActions: 'play none none none' },
      });
      tl.to(svg.querySelector('.ai-glow'), { opacity: 1, duration: 1.8, ease: 'power1.out' })
        .to(svg.querySelector('.ai-dot'),   { attr: { fillOpacity: 0.95 }, duration: 0.8 }, '-=0.6')
        .to(svg.querySelector('.ai-ring'),  { attr: { strokeOpacity: 0.55 }, duration: 1.2 }, '-=0.5')
        .to(svg.querySelector('.ai-inner'), { attr: { fillOpacity: 0.25 }, duration: 1.0 }, '-=0.8')
        .to(svg.querySelectorAll('.ai-spoke'), { opacity: 1, duration: 1.2, stagger: 0.12, ease: 'power1.out' }, '-=0.4')
        .to(svg.querySelector('.ai-orbit1'), { attr: { strokeOpacity: 0.18 }, duration: 1.4 }, '-=0.8')
        .to(svg.querySelector('.ai-orbit2'), { attr: { strokeOpacity: 0.13 }, duration: 1.4 }, '-=1.2');
      gsap.to(svg.querySelectorAll('.ai-spoke'), {
        opacity: 0.6, repeat: -1, yoyo: true, duration: 3.2, ease: 'sine.inOut', stagger: 0.22, delay: 2.5,
      });
    }, svg);
    return () => ctx.revert();
  }, []);

  return <SectionShell secRef={secRef} textRef={textRef} visRef={visRef} s={s} i={i}
    Visual={<VisualAI visRef={svgRef} />} />;
}

function ServiceBD({ s, i }) {
  const secRef  = useRef(null);
  const textRef = useRef(null);
  const svgRef  = useRef(null);
  const visRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: secRef.current, start: 'top 78%', toggleActions: 'play none none none' };
      gsap.fromTo(textRef.current, { opacity: 0, x: s.flip ? 50 : -50 },
        { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out', scrollTrigger: st });
      gsap.fromTo(visRef.current, { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out', delay: 0.12, scrollTrigger: st });
      gsap.fromTo(textRef.current.querySelectorAll('.svc-tag'), { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.07, delay: 0.35, scrollTrigger: st });
    }, secRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!secRef.current || !svgRef.current) return;
    const svg = svgRef.current;
    gsap.set(svg.querySelectorAll('.bd-bar'), { y: 30 });
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: secRef.current, start: 'top 78%', toggleActions: 'play none none none' },
      });
      tl.to(svg.querySelector('.bd-glow'), { opacity: 1, duration: 1.4, ease: 'power1.out' })
        .to(svg.querySelectorAll('.bd-bar'), { opacity: 1, y: 0, duration: 1.1, stagger: 0.18, ease: 'power2.out' }, 0.5)
        .to(svg.querySelector('.bd-trend'), { attr: { strokeOpacity: 0.65 }, duration: 1.2 }, 1.4)
        .to(svg.querySelectorAll('.bd-dot'), { attr: { fillOpacity: 0.9 }, duration: 0.7, stagger: 0.14 }, 1.6);
    }, svg);
    return () => ctx.revert();
  }, []);

  return <SectionShell secRef={secRef} textRef={textRef} visRef={visRef} s={s} i={i}
    Visual={<VisualBD visRef={svgRef} />} />;
}

function ServicePM({ s, i }) {
  const secRef  = useRef(null);
  const textRef = useRef(null);
  const svgRef  = useRef(null);
  const visRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: secRef.current, start: 'top 78%', toggleActions: 'play none none none' };
      gsap.fromTo(textRef.current, { opacity: 0, x: s.flip ? 50 : -50 },
        { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out', scrollTrigger: st });
      gsap.fromTo(visRef.current, { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out', delay: 0.12, scrollTrigger: st });
      gsap.fromTo(textRef.current.querySelectorAll('.svc-tag'), { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.07, delay: 0.35, scrollTrigger: st });
    }, secRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!secRef.current || !svgRef.current) return;
    const svg = svgRef.current;
    gsap.set(svg.querySelectorAll('.pm-row'), { x: -20 });
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: secRef.current, start: 'top 78%', toggleActions: 'play none none none' },
      });
      tl.to(svg.querySelectorAll('.pm-row'), { opacity: 1, x: 0, duration: 1.0, stagger: 0.22, ease: 'power2.out' })
        .to(svg.querySelector('.pm-now'),       { attr: { strokeOpacity: 0.35 }, duration: 1.0 }, 1.2)
        .to(svg.querySelector('.pm-now-label'), { opacity: 0.55, duration: 0.8 }, 1.4);
      const activeRect = svg.querySelectorAll('.pm-row')[2]?.querySelector('rect');
      if (activeRect) {
        gsap.to(activeRect, { attr: { fill: '#dab84e' }, repeat: -1, yoyo: true, duration: 2.8, ease: 'sine.inOut', delay: 2.5 });
      }
    }, svg);
    return () => ctx.revert();
  }, []);

  return <SectionShell secRef={secRef} textRef={textRef} visRef={visRef} s={s} i={i}
    Visual={<VisualPM visRef={svgRef} />} />;
}

function ServiceDT({ s, i }) {
  const secRef  = useRef(null);
  const textRef = useRef(null);
  const svgRef  = useRef(null);
  const visRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: secRef.current, start: 'top 78%', toggleActions: 'play none none none' };
      gsap.fromTo(textRef.current, { opacity: 0, x: s.flip ? 50 : -50 },
        { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out', scrollTrigger: st });
      gsap.fromTo(visRef.current, { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out', delay: 0.12, scrollTrigger: st });
      gsap.fromTo(textRef.current.querySelectorAll('.svc-tag'), { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.07, delay: 0.35, scrollTrigger: st });
    }, secRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!secRef.current || !svgRef.current) return;
    const svg = svgRef.current;
    gsap.set(svg.querySelectorAll('.dt-node'), { scale: 0.8, transformOrigin: 'center center' });
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: secRef.current, start: 'top 78%', toggleActions: 'play none none none' },
      });
      tl.to(svg.querySelector('.dt-glow'), { opacity: 1, duration: 1.6, ease: 'power1.out' })
        .to(svg.querySelectorAll('.dt-line'), { attr: { strokeOpacity: 0.28 }, duration: 0.8, stagger: 0.22 }, 0.5)
        .to(svg.querySelectorAll('.dt-node'), { opacity: 1, scale: 1, duration: 0.9, stagger: 0.22, ease: 'back.out(1.2)', transformOrigin: 'center center' }, 0.9);
      const centerNode = svg.querySelectorAll('.dt-node')[2];
      if (centerNode) {
        gsap.to(centerNode, { opacity: 0.75, repeat: -1, yoyo: true, duration: 2.8, ease: 'sine.inOut', delay: 2.5 });
      }
    }, svg);
    return () => ctx.revert();
  }, []);

  return <SectionShell secRef={secRef} textRef={textRef} visRef={visRef} s={s} i={i}
    Visual={<VisualDT visRef={svgRef} />} />;
}

// ─── Shared shell ─────────────────────────────────────────────────────────────

function SectionShell({ secRef, textRef, visRef, s, i, Visual }) {
  const TextBlock = (
    <div ref={textRef} className="flex flex-col justify-center">
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <span className="font-body text-xs tracking-[.28em] uppercase font-semibold"
          style={{ color: '#C9A84C' }}>{s.number}</span>
        <div style={{ width: '28px', height: '1px', background: 'rgba(201,168,76,0.5)' }}/>
        <span className="font-body text-xs tracking-[.16em] uppercase"
          style={{ color: 'rgba(255,255,255,0.4)' }}>{s.subtitle}</span>
      </div>

      <h3 className="font-title mb-5"
        style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: 'clamp(2.6rem,5vw,5rem)',
          letterSpacing: '.03em', lineHeight: 0.92, color: '#fff',
        }}>
        {s.title}
      </h3>

      <div className="mb-6" style={{ width: '44px', height: '2px', background: '#C9A84C' }}/>

      <p className="font-body text-base leading-relaxed mb-8"
        style={{ color: 'rgba(255,255,255,0.62)', fontWeight: 300, maxWidth: '400px' }}>
        {s.desc}
      </p>

      <div className="flex flex-wrap gap-x-5 gap-y-2">
        {s.tags.map(t => (
          <span key={t} className="svc-tag font-body text-xs tracking-widest uppercase font-medium"
            style={{ color: 'rgba(255,255,255,0.5)' }}>
            <span style={{ color: '#C9A84C', marginRight: '5px' }}>✦</span>{t}
          </span>
        ))}
      </div>
    </div>
  );

  const VisualBlock = (
    <div ref={visRef}
      className="flex items-center justify-center w-full"
      style={{ minHeight: '260px' }}>
      <div style={{ width: '100%', maxWidth: '360px', aspectRatio: '360/280', position: 'relative' }}>
        {Visual}
      </div>
    </div>
  );

  return (
    <div ref={secRef}
      className="svc-section relative py-16 md:py-24"
      style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.07)' }}>
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
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

// ─── Data ─────────────────────────────────────────────────────────────────────

const services = [
  {
    number: '01',
    title: 'AI Consultancy',
    subtitle: 'Intelligence that works for you',
    desc: 'We design and deploy custom AI systems that transform how your business operates — from intelligent automation to LLM-powered workflows.',
    tags: ['LLM Integration', 'Automation', 'AI Strategy', 'Process Optimization'],
    Component: ServiceAI,
    flip: false,
  },
  {
    number: '02',
    title: 'Business Development',
    subtitle: 'Growth by design, not by chance',
    desc: 'Strategic partnerships, go-to-market execution, and revenue architecture — built for sustainable scale and market dominance.',
    tags: ['GTM Strategy', 'Partnerships', 'Revenue Growth', 'Market Research'],
    Component: ServiceBD,
    flip: true,
  },
  {
    number: '03',
    title: 'Project Management',
    subtitle: 'Every milestone, delivered',
    desc: 'Precision planning meets agile execution. I manage complexity so your team stays focused — on time, on budget, beyond expectations.',
    tags: ['Agile / Scrum', 'Risk Management', 'Team Leadership', 'Delivery'],
    Component: ServicePM,
    flip: false,
  },
  {
    number: '04',
    title: 'Design Thinking',
    subtitle: 'Problems solved from the inside out',
    desc: 'Certified Design Thinking practitioner — I facilitate human-centered workshops that turn ambiguity into actionable, elegant solutions.',
    tags: ['User Research', 'Ideation', 'Prototyping', 'Facilitation'],
    Component: ServiceDT,
    flip: true,
  },
];

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
      style={{ background: '#050505' }}>

      <div ref={headRef} className="max-w-7xl mx-auto pb-10">
        <p className="reveal section-label">02 / What I Do</p>
        <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2 className="section-title text-white">My Services</h2>
          <p className="font-body text-sm font-medium"
            style={{ color: 'rgba(255,255,255,0.45)', maxWidth: '300px', lineHeight: 1.7 }}>
            Four core areas where I create transformative impact.
          </p>
        </div>
        <div className="reveal mt-8"
          style={{ height: '1px', background: 'linear-gradient(to right,#C9A84C,rgba(201,168,76,0.06))' }}/>
      </div>

      {services.map((s, i) => {
        const Comp = s.Component;
        return <Comp key={s.number} s={s} i={i} />;
      })}

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingBottom: '4rem' }}/>
    </section>
  );
}