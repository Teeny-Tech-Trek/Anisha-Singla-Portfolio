import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getReplayScrollTrigger } from '../hooks/useGsap';

gsap.registerPlugin(ScrollTrigger);

// ─── VisualAI — LLM Token Pipeline ───────────────────────────────────────────

const VisualAI = () => (
  <svg
    viewBox="0 0 360 220"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', height: '100%', display: 'block' }}
  >
    <defs>
      <radialGradient id="aiBg" cx="50%" cy="60%" r="50%">
        <stop offset="0%"   stopColor="#C9A84C" stopOpacity="0.18"/>
        <stop offset="100%" stopColor="#C9A84C" stopOpacity="0"/>
      </radialGradient>
      <style>{`
        @keyframes aiBeam {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -200; }
        }
        @keyframes aiToken0 {
          0%          { opacity: 0; transform: translateX(-20px); }
          20%, 80%    { opacity: 1; transform: translateX(0); }
          100%        { opacity: 0; transform: translateX(20px); }
        }
        @keyframes aiToken1 {
          0%          { opacity: 0; transform: translateX(-20px); }
          20%, 80%    { opacity: 1; transform: translateX(0); }
          100%        { opacity: 0; transform: translateX(20px); }
        }
        @keyframes aiToken2 {
          0%          { opacity: 0; transform: translateX(-20px); }
          20%, 80%    { opacity: 1; transform: translateX(0); }
          100%        { opacity: 0; transform: translateX(20px); }
        }
        @keyframes aiToken3 {
          0%          { opacity: 0; transform: translateX(-20px); }
          20%, 80%    { opacity: 1; transform: translateX(0); }
          100%        { opacity: 0; transform: translateX(20px); }
        }
        @keyframes aiToken4 {
          0%          { opacity: 0; transform: translateX(-20px); }
          20%, 80%    { opacity: 1; transform: translateX(0); }
          100%        { opacity: 0; transform: translateX(20px); }
        }
        @keyframes aiAmbPulse {
          0%, 100% { opacity: 0.18; }
          50%      { opacity: 0.32; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ai-anim { animation: none !important; }
        }
      `}</style>
    </defs>

    <ellipse
      className="ai-anim"
      cx="180" cy="115" rx="168" ry="85"
      fill="url(#aiBg)"
      style={{ animation: 'aiAmbPulse 3.5s ease-in-out infinite' }}
    />
    <line x1="20" y1="110" x2="340" y2="110" stroke="#C9A84C" strokeWidth="0.5" strokeOpacity="0.20"/>
    <line
      className="ai-anim"
      x1="20" y1="110" x2="340" y2="110"
      stroke="#C9A84C" strokeWidth="1.4"
      strokeDasharray="8 12" strokeOpacity="0.65"
      style={{ animation: 'aiBeam 1.8s linear infinite' }}
    />

    <g className="ai-anim" style={{ animation: 'aiToken0 3.6s ease-in-out infinite 0s' }}>
      <rect x="12" y="88" width="48" height="44" rx="6" fill="#C9A84C" fillOpacity="0.12" stroke="#C9A84C" strokeWidth="0.9" strokeOpacity="0.50"/>
      <text x="36" y="108" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="11" fontWeight="700" fill="#FFE064" fillOpacity="0.92">IN</text>
      <text x="36" y="122" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="8" fill="#C9A84C" fillOpacity="0.55">input</text>
    </g>
    <g className="ai-anim" style={{ animation: 'aiToken1 3.6s ease-in-out infinite 0.45s' }}>
      <rect x="74" y="82" width="58" height="56" rx="7" fill="#C9A84C" fillOpacity="0.18" stroke="#C9A84C" strokeWidth="0.9" strokeOpacity="0.55"/>
      <text x="103" y="106" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="9" fontWeight="600" letterSpacing="0.5" fill="#C9A84C" fillOpacity="0.85">EMBED</text>
      <text x="103" y="121" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="8" fill="#C9A84C" fillOpacity="0.55">tokens</text>
    </g>
    <g className="ai-anim" style={{ animation: 'aiToken2 3.6s ease-in-out infinite 0.90s' }}>
      <rect x="148" y="72" width="64" height="76" rx="8" fill="#C9A84C" fillOpacity="0.26" stroke="#FFE064" strokeWidth="1.2" strokeOpacity="0.72"/>
      <text x="180" y="103" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="11" fontWeight="700" letterSpacing="1" fill="#FFE064" fillOpacity="0.95">LLM</text>
      <text x="180" y="120" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="8" fill="#C9A84C" fillOpacity="0.65">attention</text>
      <text x="180" y="134" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="8" fill="#C9A84C" fillOpacity="0.45">layers</text>
    </g>
    <g className="ai-anim" style={{ animation: 'aiToken3 3.6s ease-in-out infinite 1.35s' }}>
      <rect x="228" y="82" width="58" height="56" rx="7" fill="#C9A84C" fillOpacity="0.18" stroke="#C9A84C" strokeWidth="0.9" strokeOpacity="0.55"/>
      <text x="257" y="106" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="9" fontWeight="600" letterSpacing="0.5" fill="#C9A84C" fillOpacity="0.85">DECODE</text>
      <text x="257" y="121" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="8" fill="#C9A84C" fillOpacity="0.55">output</text>
    </g>
    <g className="ai-anim" style={{ animation: 'aiToken4 3.6s ease-in-out infinite 1.80s' }}>
      <rect x="300" y="88" width="48" height="44" rx="6" fill="#C9A84C" fillOpacity="0.12" stroke="#C9A84C" strokeWidth="0.9" strokeOpacity="0.50"/>
      <text x="324" y="108" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="11" fontWeight="700" fill="#FFE064" fillOpacity="0.92">OUT</text>
      <text x="324" y="122" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="8" fill="#C9A84C" fillOpacity="0.55">result</text>
    </g>

    <line x1="36" y1="168" x2="324" y2="168" stroke="#C9A84C" strokeWidth="0.5" strokeOpacity="0.22"/>
    {[
      { cx: 36,  gold: false },
      { cx: 103, gold: false },
      { cx: 180, gold: true  },
      { cx: 257, gold: false },
      { cx: 324, gold: false },
    ].map((d, i) => (
      <circle key={i} cx={d.cx} cy="168" r="3.5"
        fill={d.gold ? '#FFE064' : '#C9A84C'}
        fillOpacity={d.gold ? '0.92' : '0.50'}
      />
    ))}
  </svg>
);

// ─── VisualBD — Partnership Network Graph ─────────────────────────────────────
// Matches the original image: center gold hub, 5 satellite nodes (GTM, PARTNER,
// RESEARCH, REVENUE, MARKET), dashed gold connection lines, concentric rings.

const VisualBD = ({ visRef }) => (
  <svg
    ref={visRef}
    viewBox="0 0 360 280"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', height: '100%' }}
  >
    <defs>
      <radialGradient id="gBDhub" cx="50%" cy="50%" r="50%">
        <stop offset="0%"   stopColor="#FFE064" stopOpacity="0.35"/>
        <stop offset="60%"  stopColor="#C9A84C" stopOpacity="0.12"/>
        <stop offset="100%" stopColor="#C9A84C" stopOpacity="0"/>
      </radialGradient>
      <radialGradient id="gBDambient" cx="50%" cy="50%" r="50%">
        <stop offset="0%"   stopColor="#C9A84C" stopOpacity="0.14"/>
        <stop offset="100%" stopColor="#C9A84C" stopOpacity="0"/>
      </radialGradient>
      <style>{`
        @keyframes bdAmbPulse {
          0%, 100% { opacity: 0.14; }
          50%      { opacity: 0.26; }
        }
        @keyframes bdHubPulse {
          0%, 100% { r: 18; opacity: 0.55; }
          50%      { r: 28; opacity: 0;    }
        }
        @keyframes bdHubPulse2 {
          0%, 100% { r: 18; opacity: 0.30; }
          50%      { r: 38; opacity: 0;    }
        }
        @keyframes bdDash {
          to { stroke-dashoffset: -28; }
        }
        @keyframes bdNodeFloat0 { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-5px)} }
        @keyframes bdNodeFloat1 { 0%,100%{transform:translateY(0)}  50%{transform:translateY(5px)}  }
        @keyframes bdNodeFloat2 { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-4px)} }
        @keyframes bdNodeFloat3 { 0%,100%{transform:translateY(0)}  50%{transform:translateY(4px)}  }
        @keyframes bdNodeFloat4 { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-6px)} }
        @keyframes bdHubSpin {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bd-anim { animation: none !important; }
        }
      `}</style>
    </defs>

    {/* ── Ambient background glow ── */}
    <ellipse
      className="bd-anim"
      cx="180" cy="140" rx="160" ry="120"
      fill="url(#gBDambient)"
      style={{ animation: 'bdAmbPulse 3.5s ease-in-out infinite' }}
    />

    {/* ── Connection lines (dashed gold, animated flow) ── */}
    {/* GTM  top-left  → center */}
    <line className="bd-anim bd-line" x1="82"  y1="68"  x2="174" y2="133"
      stroke="#C9A84C" strokeWidth="0.8" strokeOpacity="0.45"
      strokeDasharray="5 7"
      style={{ animation: 'bdDash 1.8s linear infinite' }}
    />
    {/* PARTNER  top-right → center */}
    <line className="bd-anim bd-line" x1="278" y1="68"  x2="186" y2="133"
      stroke="#C9A84C" strokeWidth="0.8" strokeOpacity="0.45"
      strokeDasharray="5 7"
      style={{ animation: 'bdDash 2.1s linear infinite' }}
    />
    {/* RESEARCH  mid-left → center */}
    <line className="bd-anim bd-line" x1="56"  y1="168" x2="168" y2="142"
      stroke="#C9A84C" strokeWidth="0.8" strokeOpacity="0.45"
      strokeDasharray="5 7"
      style={{ animation: 'bdDash 1.6s linear infinite 0.3s' }}
    />
    {/* REVENUE  mid-right → center */}
    <line className="bd-anim bd-line" x1="304" y1="185" x2="192" y2="148"
      stroke="#C9A84C" strokeWidth="0.8" strokeOpacity="0.45"
      strokeDasharray="5 7"
      style={{ animation: 'bdDash 2.3s linear infinite 0.5s' }}
    />
    {/* MARKET  bottom-center → center */}
    <line className="bd-anim bd-line" x1="180" y1="248" x2="180" y2="158"
      stroke="#C9A84C" strokeWidth="0.8" strokeOpacity="0.45"
      strokeDasharray="5 7"
      style={{ animation: 'bdDash 1.9s linear infinite 0.8s' }}
    />

    {/* ── Center hub: concentric rings ── */}
    {/* Outer pulse rings (animate via GSAP / CSS) */}
    <circle className="bd-anim" cx="180" cy="140" r="18"
      fill="none" stroke="#C9A84C" strokeWidth="0.6" strokeOpacity="0.0"
      style={{ animation: 'bdHubPulse 2.8s ease-out infinite' }}
    />
    <circle className="bd-anim" cx="180" cy="140" r="18"
      fill="none" stroke="#C9A84C" strokeWidth="0.4" strokeOpacity="0.0"
      style={{ animation: 'bdHubPulse2 2.8s ease-out infinite 0.9s' }}
    />
    {/* Static rings */}
    <circle cx="180" cy="140" r="28" fill="none" stroke="#C9A84C" strokeWidth="0.5" strokeOpacity="0.18"/>
    <circle cx="180" cy="140" r="20" fill="none" stroke="#C9A84C" strokeWidth="0.5" strokeOpacity="0.22"/>
    {/* Spinning orbit dashes */}
    <circle
      className="bd-anim"
      cx="180" cy="140" r="14"
      fill="none" stroke="#FFE064" strokeWidth="0.7" strokeOpacity="0.30"
      strokeDasharray="4 8"
      style={{ animation: 'bdHubSpin 8s linear infinite', transformOrigin: '180px 140px' }}
    />
    {/* Hub fill layers */}
    <circle cx="180" cy="140" r="28" fill="url(#gBDhub)"/>
    <circle cx="180" cy="140" r="11" fill="#C9A84C" fillOpacity="0.55"/>
    <circle cx="180" cy="140" r="6"  fill="#FFE064" fillOpacity="0.95"/>

    {/* ── Satellite nodes ── */}
    {/* GTM — top-left */}
    <g className="bd-anim" style={{ animation: 'bdNodeFloat0 4.2s ease-in-out infinite', transformOrigin: '82px 68px' }}>
      <circle className="bd-dot" cx="82"  cy="68"  r="0" fill="#FFE064" fillOpacity="0"/>
      <circle cx="82"  cy="68"  r="14" fill="#C9A84C" fillOpacity="0.16" stroke="#C9A84C" strokeWidth="0.7" strokeOpacity="0.50"/>
      <circle cx="82"  cy="68"  r="8"  fill="#C9A84C" fillOpacity="0.55"/>
      <circle cx="82"  cy="68"  r="4.5" fill="#FFE064" fillOpacity="0.92"/>
      <circle className="bd-dot-ring" cx="82" cy="68" r="0" fill="none" stroke="#C9A84C" strokeWidth="0.6" opacity="0"/>
      <text x="82" y="47" textAnchor="middle"
        fontFamily="'DM Sans',sans-serif" fontSize="8" fontWeight="600" letterSpacing="1"
        fill="#C9A84C" fillOpacity="0.72">GTM</text>
    </g>

    {/* PARTNER — top-right */}
    <g className="bd-anim" style={{ animation: 'bdNodeFloat1 4.8s ease-in-out infinite', transformOrigin: '278px 68px' }}>
      <circle className="bd-dot" cx="278" cy="68"  r="0" fill="#FFE064" fillOpacity="0"/>
      <circle cx="278" cy="68"  r="14" fill="#C9A84C" fillOpacity="0.16" stroke="#C9A84C" strokeWidth="0.7" strokeOpacity="0.50"/>
      <circle cx="278" cy="68"  r="8"  fill="#C9A84C" fillOpacity="0.55"/>
      <circle cx="278" cy="68"  r="4.5" fill="#FFE064" fillOpacity="0.92"/>
      <circle className="bd-dot-ring" cx="278" cy="68" r="0" fill="none" stroke="#C9A84C" strokeWidth="0.6" opacity="0"/>
      <text x="278" y="47" textAnchor="middle"
        fontFamily="'DM Sans',sans-serif" fontSize="8" fontWeight="600" letterSpacing="1"
        fill="#C9A84C" fillOpacity="0.72">PARTNER</text>
    </g>

    {/* RESEARCH — mid-left */}
    <g className="bd-anim" style={{ animation: 'bdNodeFloat2 3.9s ease-in-out infinite', transformOrigin: '56px 168px' }}>
      <circle className="bd-dot" cx="56"  cy="168" r="0" fill="#FFE064" fillOpacity="0"/>
      <circle cx="56"  cy="168" r="14" fill="#C9A84C" fillOpacity="0.16" stroke="#C9A84C" strokeWidth="0.7" strokeOpacity="0.50"/>
      <circle cx="56"  cy="168" r="8"  fill="#C9A84C" fillOpacity="0.55"/>
      <circle cx="56"  cy="168" r="4.5" fill="#FFE064" fillOpacity="0.92"/>
      <circle className="bd-dot-ring" cx="56" cy="168" r="0" fill="none" stroke="#C9A84C" strokeWidth="0.6" opacity="0"/>
      <text x="40" y="190" textAnchor="middle"
        fontFamily="'DM Sans',sans-serif" fontSize="8" fontWeight="600" letterSpacing="1"
        fill="#C9A84C" fillOpacity="0.72">RESEARCH</text>
    </g>

    {/* REVENUE — mid-right */}
    <g className="bd-anim" style={{ animation: 'bdNodeFloat3 5.1s ease-in-out infinite', transformOrigin: '304px 185px' }}>
      <circle className="bd-dot" cx="304" cy="185" r="0" fill="#FFE064" fillOpacity="0"/>
      <circle cx="304" cy="185" r="14" fill="#C9A84C" fillOpacity="0.16" stroke="#C9A84C" strokeWidth="0.7" strokeOpacity="0.50"/>
      <circle cx="304" cy="185" r="8"  fill="#C9A84C" fillOpacity="0.55"/>
      <circle cx="304" cy="185" r="4.5" fill="#FFE064" fillOpacity="0.92"/>
      <circle className="bd-dot-ring" cx="304" cy="185" r="0" fill="none" stroke="#C9A84C" strokeWidth="0.6" opacity="0"/>
      <text x="322" y="207" textAnchor="middle"
        fontFamily="'DM Sans',sans-serif" fontSize="8" fontWeight="600" letterSpacing="1"
        fill="#C9A84C" fillOpacity="0.72">REVENUE</text>
    </g>

    {/* MARKET — bottom-center */}
    <g className="bd-anim" style={{ animation: 'bdNodeFloat4 4.5s ease-in-out infinite', transformOrigin: '180px 248px' }}>
      <circle className="bd-dot" cx="180" cy="248" r="0" fill="#FFE064" fillOpacity="0"/>
      <circle cx="180" cy="248" r="14" fill="#C9A84C" fillOpacity="0.16" stroke="#C9A84C" strokeWidth="0.7" strokeOpacity="0.50"/>
      <circle cx="180" cy="248" r="8"  fill="#C9A84C" fillOpacity="0.55"/>
      <circle cx="180" cy="248" r="4.5" fill="#FFE064" fillOpacity="0.92"/>
      <circle className="bd-dot-ring" cx="180" cy="248" r="0" fill="none" stroke="#C9A84C" strokeWidth="0.6" opacity="0"/>
      <text x="180" y="271" textAnchor="middle"
        fontFamily="'DM Sans',sans-serif" fontSize="8" fontWeight="600" letterSpacing="1"
        fill="#C9A84C" fillOpacity="0.72">MARKET</text>
    </g>

    {/* Section label — top-left, matches original image */}
    {/* <text x="12" y="16"
      fontFamily="'DM Sans',sans-serif" fontSize="7" letterSpacing="1.5" fontWeight="600"
      fill="#C9A84C" fillOpacity="0.40">B — PARTNERSHIP NETWORK GRAPH</text> */}
  </svg>
);

// ─── VisualPM ─────────────────────────────────────────────────────────────────

const VisualPM = ({ visRef }) => {
  const rows = [
    { y: 80,  x1: 60,  w: 160, label: 'RESEARCH',  active: false, done: true,  future: false },
    { y: 120, x1: 170, w: 110, label: 'STRATEGY',  active: false, done: true,  future: false },
    { y: 160, x1: 100, w: 180, label: 'EXECUTION', active: true,  done: false, future: false },
    { y: 200, x1: 230, w: 120, label: 'REVIEW',    active: false, done: false, future: true  },
    { y: 240, x1: 290, w: 90,  label: 'LAUNCH',    active: false, done: false, future: true  },
  ];

  const getFill = r => {
    if (r.active) return '#C9A84C';
    if (r.done)   return 'rgba(201,168,76,0.32)';
    if (r.future) return 'rgba(201,168,76,0.14)';
    return 'rgba(255,255,255,0.05)';
  };
  const getTextFill = r => {
    if (r.active) return '#111';
    if (r.done)   return 'rgba(255,224,128,0.88)';
    if (r.future) return 'rgba(201,168,76,0.60)';
    return 'rgba(255,255,255,0.28)';
  };

  return (
    <svg ref={visRef} viewBox="0 0 360 280" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id="gPM" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#C9A84C" stopOpacity="0.22"/>
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="gPMreview" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#C9A84C" stopOpacity="0.55"/>
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="gPMlaunch" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#C9A84C" stopOpacity="0.65"/>
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="180" cy="160" rx="150" ry="110" fill="url(#gPM)"/>

      <ellipse className="pm-review-glow" cx="290" cy="200" rx="90" ry="18"
        fill="url(#gPMreview)" opacity="0"/>
      <ellipse className="pm-launch-glow" cx="335" cy="240" rx="75" ry="16"
        fill="url(#gPMlaunch)" opacity="0"/>

      {rows.map((r, i) => (
        <g key={i} className="pm-row" opacity="0">
          <rect x={r.x1} y={r.y - 11} width={r.w} height="21"
            fill={getFill(r)} rx="2.5"/>
          {r.active && (
            <>
              <rect x={r.x1} y={r.y - 11} width={r.w} height="21"
                fill="none" stroke="#FFE080" strokeWidth="1.2" rx="2.5" strokeOpacity="0.80"/>
              <rect x={r.x1} y={r.y - 11} width="3.5" height="21"
                fill="#FFE080" fillOpacity="0.85" rx="1"/>
            </>
          )}
          {r.future && (
            <rect x={r.x1} y={r.y - 11} width={r.w} height="21"
              fill="none" stroke="#C9A84C" strokeWidth="0.8" rx="2.5" strokeOpacity="0.50"/>
          )}
          <text x={r.x1 + 8} y={r.y + 3.5}
            fill={getTextFill(r)}
            fontSize="8.5" fontFamily="DM Sans,sans-serif" letterSpacing="0.8" fontWeight="600">
            {r.label}
          </text>
        </g>
      ))}

      <line className="pm-now" x1="200" y1="58" x2="200" y2="262"
        stroke="#FFE080" strokeWidth="1.2" strokeOpacity="0" strokeDasharray="4 5"/>
      <text className="pm-now-label" x="205" y="68"
        fill="#FFE080" fontSize="7.5" fontFamily="DM Sans" opacity="0" letterSpacing="1">
        NOW
      </text>
    </svg>
  );
};

// ─── VisualDT — Canvas Wheel ──────────────────────────────────────────────────

const VisualDT = () => {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = 360, H = 280, cx = 180, cy = 135;

    const phases = [
      { label: 'EMPATHIZE', sub: 'Listen deep', angle: -90 },
      { label: 'DEFINE',    sub: 'Frame it',    angle: -18  },
      { label: 'IDEATE',    sub: 'Think wild',  angle:  54  },
      { label: 'PROTOTYPE', sub: 'Build fast',  angle: 126  },
      { label: 'TEST',      sub: 'Learn real',  angle: 198  },
    ];

    const R_outer = 98, R_mid = 65, R_inner = 36, R_dot = 5.5;
    const bright = '#FFE080';
    let activeIdx = 0, lastSwitch = 0;
    const toRad = d => d * Math.PI / 180;

    const glowCircle = (x, y, r, alpha) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0,    `rgba(201,168,76,${alpha})`);
      g.addColorStop(0.45, `rgba(201,168,76,${alpha * 0.35})`);
      g.addColorStop(1,    'rgba(201,168,76,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    const draw = ts => {
      const t = ts / 1000;
      if (t - lastSwitch > 1.7) { activeIdx = (activeIdx + 1) % 5; lastSwitch = t; }

      ctx.clearRect(0, 0, W, H);
      const pulse    = 0.5 + 0.5 * Math.sin(t * 2.2);
      const slowSpin = t * 7;

      glowCircle(cx, cy, 148, 0.18 + 0.10 * pulse);
      glowCircle(cx, cy, 100, 0.26 + 0.12 * pulse);
      glowCircle(cx, cy, 52,  0.40 + 0.20 * pulse);

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(toRad(slowSpin));
      for (let i = 0; i < 30; i++) {
        const a  = (i / 30) * Math.PI * 2;
        const r1 = R_outer + 7;
        const r2 = R_outer + (i % 3 === 0 ? 20 : 14);
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * r1, Math.sin(a) * r1);
        ctx.lineTo(Math.cos(a) * r2, Math.sin(a) * r2);
        ctx.strokeStyle = `rgba(201,168,76,${0.10 + 0.08 * Math.sin(t * 2.5 + i * 0.4)})`;
        ctx.lineWidth   = i % 3 === 0 ? 1.2 : 0.6;
        ctx.stroke();
      }
      ctx.restore();

      [R_outer, R_mid, R_inner].forEach((r, ri) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(201,168,76,${[0.28, 0.20, 0.24][ri]})`;
        ctx.lineWidth   = [0.7, 0.5, 0.5][ri];
        ctx.setLineDash(ri === 0 ? [] : [4, 8]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      phases.forEach((ph, i) => {
        const isActive = i === activeIdx;
        const aP       = 0.5 + 0.5 * Math.sin(t * 3.6);
        const startA   = ph.angle - 34;
        const endA     = ph.angle + 34;

        if (isActive) {
          const gSlice = ctx.createRadialGradient(cx, cy, R_inner, cx, cy, R_outer + 20);
          gSlice.addColorStop(0,   `rgba(201,168,76,${0.38 + 0.18 * aP})`);
          gSlice.addColorStop(0.6, `rgba(201,168,76,${0.18 + 0.08 * aP})`);
          gSlice.addColorStop(1,   'rgba(201,168,76,0)');
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.arc(cx, cy, R_outer + 20, toRad(startA), toRad(endA));
          ctx.closePath();
          ctx.fillStyle = gSlice;
          ctx.fill();
        }

        const divAlpha = isActive ? 0.75 + 0.25 * aP : 0.22;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(toRad(startA)) * R_inner, cy + Math.sin(toRad(startA)) * R_inner);
        ctx.lineTo(cx + Math.cos(toRad(startA)) * R_outer, cy + Math.sin(toRad(startA)) * R_outer);
        ctx.strokeStyle = `rgba(201,168,76,${divAlpha})`;
        ctx.lineWidth   = isActive ? 1.4 : 0.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, R_outer, toRad(startA), toRad(endA));
        ctx.strokeStyle = `rgba(201,168,76,${divAlpha})`;
        ctx.lineWidth   = isActive ? 1.8 : 0.5;
        ctx.stroke();

        const midA = toRad(ph.angle);
        const dx   = cx + Math.cos(midA) * ((R_mid + R_outer) / 2);
        const dy   = cy + Math.sin(midA) * ((R_mid + R_outer) / 2);
        const dotR = isActive ? R_dot + 2 + aP * 2.5 : R_dot;
        if (isActive) glowCircle(dx, dy, dotR * 4, 0.55 + 0.25 * aP);
        ctx.beginPath();
        ctx.arc(dx, dy, dotR, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? bright : 'rgba(201,168,76,0.60)';
        ctx.fill();
        if (isActive) {
          ctx.beginPath();
          ctx.arc(dx, dy, dotR * 2, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255,224,128,${0.40 + 0.30 * aP})`;
          ctx.lineWidth   = 0.8;
          ctx.stroke();
        }

        const lx = cx + Math.cos(midA) * (R_outer + 25);
        const ly = cy + Math.sin(midA) * (R_outer + 25);
        ctx.save();
        ctx.translate(lx, ly);
        const rot = ph.angle > 90 && ph.angle < 270 ? ph.angle + 180 : ph.angle;
        ctx.rotate(toRad(rot));
        ctx.textAlign = 'center';
        ctx.font      = `700 8px "DM Sans",sans-serif`;
        ctx.fillStyle = isActive ? bright : `rgba(201,168,76,${0.42 + 0.28 * pulse})`;
        ctx.fillText(ph.label, 0, 0);
        ctx.font      = `400 7px "DM Sans",sans-serif`;
        ctx.fillStyle = `rgba(201,168,76,${isActive ? 0.70 : 0.28})`;
        ctx.fillText(ph.sub, 0, 10);
        ctx.restore();
      });

      ctx.beginPath();
      ctx.arc(cx, cy, R_inner - 7 + pulse * 4, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,224,128,${0.35 + 0.25 * pulse})`;
      ctx.lineWidth   = 0.8;
      ctx.setLineDash([3, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      glowCircle(cx, cy, 28, 0.60 + 0.30 * pulse);
      ctx.beginPath();
      ctx.arc(cx, cy, 15, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,168,76,${0.75 + 0.20 * pulse})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, 7, 0, Math.PI * 2);
      ctx.fillStyle = bright;
      ctx.fill();

      const activeMid = toRad(phases[activeIdx].angle);
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(activeMid) * 10,            cy + Math.sin(activeMid) * 10);
      ctx.lineTo(cx + Math.cos(activeMid) * (R_inner - 8), cy + Math.sin(activeMid) * (R_inner - 8));
      ctx.strokeStyle = 'rgba(255,224,128,0.60)';
      ctx.lineWidth   = 1.2;
      ctx.stroke();

      ctx.font      = '700 9px "DM Sans",sans-serif';
      ctx.fillStyle = bright;
      ctx.textAlign = 'center';
      ctx.fillText(phases[activeIdx].label, cx, H - 10);

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <canvas ref={canvasRef} width={360} height={280}
      style={{ width: '100%', height: '100%', display: 'block' }}/>
  );
};

// ─── Service sections ─────────────────────────────────────────────────────────

function ServiceAI({ s, i }) {
  const secRef  = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = getReplayScrollTrigger(secRef.current, { start: 'top 78%' });
      gsap.fromTo(textRef.current, { opacity: 0, x: s.flip ? 50 : -50 },
        { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out', scrollTrigger: st });
      gsap.fromTo(textRef.current.querySelectorAll('.svc-tag'), { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.07, delay: 0.35, scrollTrigger: st });
    }, secRef);
    return () => ctx.revert();
  }, [s.flip]);

  return (
    <div ref={secRef}
      className="svc-section relative py-16 md:py-24"
      style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.07)' }}>
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
        <div className="order-2 md:order-none">
          <div ref={textRef} className="flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <span className="font-body text-xs tracking-[.28em] uppercase font-semibold"
                style={{ color: '#C9A84C' }}>{s.number}</span>
              <div style={{ width: '28px', height: '1px', background: 'rgba(201,168,76,0.5)' }}/>
              <span className="font-body text-xs tracking-[.16em] uppercase"
                style={{ color: 'rgba(255,255,255,0.4)' }}>{s.subtitle}</span>
            </div>
            <h3 className="font-title mb-5"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(2.6rem,5vw,5rem)', letterSpacing: '.03em', lineHeight: 0.92, color: '#fff' }}>
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
        </div>
        <div className="order-1 md:order-none">
          <div className="flex items-center justify-center w-full"
            style={{ minHeight: '260px' }}>
            <div style={{ width: '100%', maxWidth: '360px', aspectRatio: '360/220', position: 'relative' }}>
              <VisualAI />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceBD({ s, i }) {
  const secRef  = useRef(null);
  const textRef = useRef(null);
  const svgRef  = useRef(null);   // wraps the outer visRef div
  const visRef  = useRef(null);   // ref passed into VisualBD's <svg>

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = getReplayScrollTrigger(secRef.current, { start: 'top 78%' });

      // Text slides in
      gsap.fromTo(textRef.current, { opacity: 0, x: s.flip ? 50 : -50 },
        { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out', scrollTrigger: st });

      // Visual wrapper fades + scales in
      gsap.fromTo(svgRef.current, { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out', delay: 0.12, scrollTrigger: st });

      // Tags stagger
      gsap.fromTo(textRef.current.querySelectorAll('.svc-tag'), { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.07, delay: 0.35, scrollTrigger: st });
    }, secRef);
    return () => ctx.revert();
  }, [s.flip]);

  // ── GSAP scroll-driven intro for the SVG network ──
  useEffect(() => {
    if (!secRef.current || !visRef.current) return;
    const svg = visRef.current;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: getReplayScrollTrigger(secRef.current, { start: 'top 78%' }),
      });

      // 1. Connection lines draw in (stroke-dashoffset trick)
      tl.fromTo(
        svg.querySelectorAll('.bd-line'),
        { attr: { strokeDashoffset: 80 } },
        { attr: { strokeDashoffset: 0 }, duration: 1.0, stagger: 0.15, ease: 'power2.out' },
        0.3
      )

      // 2. Satellite dots pop in
      .to(svg.querySelectorAll('.bd-dot'), {
        attr: { r: 4.5, opacity: 1 },
        duration: 0.4, stagger: 0.12, ease: 'back.out(2)',
      }, 1.0)

      // 3. Outer halo rings appear
      .to(svg.querySelectorAll('.bd-dot-ring'), {
        attr: { r: 12, opacity: 0.35 },
        duration: 0.5, stagger: 0.12, ease: 'power2.out',
      }, 1.2)

      // 4. Continuous dot pulse after intro finishes
      .add(() => {
        svg.querySelectorAll('.bd-dot').forEach((dot, i) => {
          gsap.to(dot, {
            attr: { r: 6.5 }, repeat: -1, yoyo: true,
            duration: 1.8, ease: 'sine.inOut', delay: i * 0.28,
          });
        });
      }, 2.0);
    }, svg);

    return () => ctx.revert();
  }, [s.flip]);

  return <SectionShell secRef={secRef} textRef={textRef} visRef={svgRef} s={s} i={i}
    Visual={<VisualBD visRef={visRef} />} />;
}

function ServicePM({ s, i }) {
  const secRef  = useRef(null);
  const textRef = useRef(null);
  const svgRef  = useRef(null);
  const visRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = getReplayScrollTrigger(secRef.current, { start: 'top 78%' });
      gsap.fromTo(textRef.current, { opacity: 0, x: s.flip ? 50 : -50 },
        { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out', scrollTrigger: st });
      gsap.fromTo(visRef.current, { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out', delay: 0.12, scrollTrigger: st });
      gsap.fromTo(textRef.current.querySelectorAll('.svc-tag'), { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.07, delay: 0.35, scrollTrigger: st });
    }, secRef);
    return () => ctx.revert();
  }, [s.flip]);

  useEffect(() => {
    if (!secRef.current || !svgRef.current) return;
    const svg = svgRef.current;
    gsap.set(svg.querySelectorAll('.pm-row'), { x: -20 });
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: getReplayScrollTrigger(secRef.current, { start: 'top 78%' }),
      });
      tl.to(svg.querySelectorAll('.pm-row'), { opacity: 1, x: 0, duration: 1.0, stagger: 0.22, ease: 'power2.out' })
        .to(svg.querySelector('.pm-now'),         { attr: { strokeOpacity: 0.50 }, duration: 1.0 }, 1.2)
        .to(svg.querySelector('.pm-now-label'),   { opacity: 0.75, duration: 0.8 }, 1.4)
        .to(svg.querySelector('.pm-review-glow'), { opacity: 1, duration: 1.0 }, 1.6)
        .to(svg.querySelector('.pm-launch-glow'), { opacity: 1, duration: 1.0 }, 1.8);

      const activeRect = svg.querySelectorAll('.pm-row')[2]?.querySelector('rect');
      if (activeRect) {
        gsap.to(activeRect, {
          attr: { fill: '#e0be5a' }, repeat: -1, yoyo: true,
          duration: 2.6, ease: 'sine.inOut', delay: 2.2,
        });
      }
      gsap.to(svg.querySelector('.pm-review-glow'), {
        attr: { rx: 100, ry: 22 }, repeat: -1, yoyo: true,
        duration: 2.4, ease: 'sine.inOut', delay: 2.0,
      });
      gsap.to(svg.querySelector('.pm-launch-glow'), {
        attr: { rx: 85, ry: 20 }, repeat: -1, yoyo: true,
        duration: 2.8, ease: 'sine.inOut', delay: 2.4,
      });
    }, svg);
    return () => ctx.revert();
  }, [s.flip]);

  return <SectionShell secRef={secRef} textRef={textRef} visRef={visRef} s={s} i={i}
    Visual={<VisualPM visRef={svgRef} />} />;
}

function ServiceDT({ s, i }) {
  const secRef  = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = getReplayScrollTrigger(secRef.current, { start: 'top 78%' });
      gsap.fromTo(textRef.current, { opacity: 0, x: s.flip ? 50 : -50 },
        { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out', scrollTrigger: st });
      gsap.fromTo(textRef.current.querySelectorAll('.svc-tag'), { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.07, delay: 0.35, scrollTrigger: st });
    }, secRef);
    return () => ctx.revert();
  }, [s.flip]);

  return (
    <div ref={secRef}
      className="svc-section relative py-16 md:py-24"
      style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.07)' }}>
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
        <div className="order-2 md:order-none">
          <div className="flex items-center justify-center w-full"
            style={{ minHeight: '260px' }}>
            <div style={{ width: '100%', maxWidth: '360px', aspectRatio: '360/280', position: 'relative' }}>
              <VisualDT />
            </div>
          </div>
        </div>
        <div className="order-1 md:order-none">
          <div ref={textRef} className="flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <span className="font-body text-xs tracking-[.28em] uppercase font-semibold"
                style={{ color: '#C9A84C' }}>{s.number}</span>
              <div style={{ width: '28px', height: '1px', background: 'rgba(201,168,76,0.5)' }}/>
              <span className="font-body text-xs tracking-[.16em] uppercase"
                style={{ color: 'rgba(255,255,255,0.4)' }}>{s.subtitle}</span>
            </div>
            <h3 className="font-title mb-5"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(2.6rem,5vw,5rem)', letterSpacing: '.03em', lineHeight: 0.92, color: '#fff' }}>
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
        </div>
      </div>
    </div>
  );
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
        style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(2.6rem,5vw,5rem)', letterSpacing: '.03em', lineHeight: 0.92, color: '#fff' }}>
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
          scrollTrigger: getReplayScrollTrigger(headRef.current, { start: 'top 86%' }),
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