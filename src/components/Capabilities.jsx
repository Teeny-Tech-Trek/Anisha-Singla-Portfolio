import { useEffect, useEffectEvent, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getReplayScrollTrigger } from '../hooks/useGsap';

gsap.registerPlugin(ScrollTrigger);

// Marks `ref.current` with `data-offscreen` as it enters/leaves the viewport
// (+200px margin) so decorative CSS keyframe loops (.ai-anim/.bd-anim)
// can be paused via CSS instead of animating forever off-screen.
function useOffscreenPause(ref, onVisibilityChange) {
  const notifyVisibility = useEffectEvent((visible) => onVisibilityChange?.(visible));

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        el.dataset.offscreen = entry.isIntersecting ? 'false' : 'true';
        notifyVisibility(entry.isIntersecting);
      },
      { rootMargin: '200px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}

// ─── VisualAI — LLM Token Pipeline ───────────────────────────────────────────

const VisualAI = () => {
  const { isDark } = useTheme();

  // Cohesive executive palette matching VisualBD: Electric Cyan + Crisp Pure White
  const accentBlue = isDark ? '#38BDF8' : '#2563EB';
  const beamCol    = isDark ? '#38BDF8' : '#2563EB';
  const textTitle  = isDark ? '#FFFFFF' : '#0F172A';
  const textSub    = isDark ? '#38BDF8' : '#1D4ED8';

  const cardFillDefault   = isDark ? 'rgba(56,189,248,0.10)' : 'rgba(37,99,235,0.08)';
  const cardStrokeDefault = isDark ? 'rgba(56,189,248,0.45)' : 'rgba(37,99,235,0.38)';

  return (
    <svg
      viewBox="0 0 360 220"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', display: 'block', background: 'transparent' }}
    >
      <defs>
        <radialGradient id="aiBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={accentBlue} stopOpacity={isDark ? '0.30' : '0.16'} />
          <stop offset="60%"  stopColor={accentBlue} stopOpacity={isDark ? '0.12' : '0.06'} />
          <stop offset="100%" stopColor={accentBlue} stopOpacity="0" />
        </radialGradient>

        <clipPath id="aiCoreClip">
          <rect x="146" y="66" width="68" height="84" rx="8" />
        </clipPath>

        <style>{`
          /* Sequential pipeline wave highlighting each stage in turn */
          @keyframes aiCardPulse0 {
            0%, 20%   { stroke: ${isDark ? '#FFFFFF' : '#1D4ED8'}; stroke-width: 2px; fill: ${isDark ? 'rgba(56,189,248,0.28)' : 'rgba(37,99,235,0.18)'}; filter: ${isDark ? 'drop-shadow(0 0 12px rgba(56,189,248,0.85))' : 'drop-shadow(0 0 8px rgba(37,99,235,0.35))'}; }
            30%, 100% { stroke: ${cardStrokeDefault}; stroke-width: 1.2px; fill: ${cardFillDefault}; filter: none; }
          }
          @keyframes aiCardPulse1 {
            0%, 18%   { stroke: ${cardStrokeDefault}; stroke-width: 1.2px; fill: ${cardFillDefault}; filter: none; }
            24%, 42%  { stroke: ${isDark ? '#FFFFFF' : '#1D4ED8'}; stroke-width: 2px; fill: ${isDark ? 'rgba(56,189,248,0.28)' : 'rgba(37,99,235,0.18)'}; filter: ${isDark ? 'drop-shadow(0 0 12px rgba(56,189,248,0.85))' : 'drop-shadow(0 0 8px rgba(37,99,235,0.35))'}; }
            52%, 100% { stroke: ${cardStrokeDefault}; stroke-width: 1.2px; fill: ${cardFillDefault}; filter: none; }
          }
          @keyframes aiCardPulse2 {
            0%, 36%   { stroke: ${accentBlue}; stroke-width: 1.6px; fill: ${isDark ? 'rgba(56,189,248,0.16)' : 'rgba(37,99,235,0.12)'}; filter: ${isDark ? 'drop-shadow(0 0 8px rgba(56,189,248,0.55))' : 'none'}; }
            44%, 66%  { stroke: ${isDark ? '#FFFFFF' : '#1D4ED8'}; stroke-width: 2.4px; fill: ${isDark ? 'rgba(56,189,248,0.32)' : 'rgba(37,99,235,0.22)'}; filter: ${isDark ? 'drop-shadow(0 0 20px rgba(56,189,248,0.95))' : 'drop-shadow(0 0 10px rgba(37,99,235,0.40))'}; }
            76%, 100% { stroke: ${accentBlue}; stroke-width: 1.6px; fill: ${isDark ? 'rgba(56,189,248,0.16)' : 'rgba(37,99,235,0.12)'}; filter: ${isDark ? 'drop-shadow(0 0 8px rgba(56,189,248,0.55))' : 'none'}; }
          }
          @keyframes aiCardPulse3 {
            0%, 58%   { stroke: ${cardStrokeDefault}; stroke-width: 1.2px; fill: ${cardFillDefault}; filter: none; }
            64%, 82%  { stroke: ${isDark ? '#FFFFFF' : '#1D4ED8'}; stroke-width: 2px; fill: ${isDark ? 'rgba(56,189,248,0.28)' : 'rgba(37,99,235,0.18)'}; filter: ${isDark ? 'drop-shadow(0 0 12px rgba(56,189,248,0.85))' : 'drop-shadow(0 0 8px rgba(37,99,235,0.35))'}; }
            92%, 100% { stroke: ${cardStrokeDefault}; stroke-width: 1.2px; fill: ${cardFillDefault}; filter: none; }
          }
          @keyframes aiCardPulse4 {
            0%, 78%   { stroke: ${cardStrokeDefault}; stroke-width: 1.2px; fill: ${cardFillDefault}; filter: none; }
            84%, 98%  { stroke: ${isDark ? '#FFFFFF' : '#1D4ED8'}; stroke-width: 2px; fill: ${isDark ? 'rgba(56,189,248,0.30)' : 'rgba(37,99,235,0.20)'}; filter: ${isDark ? 'drop-shadow(0 0 16px rgba(56,189,248,0.95))' : 'drop-shadow(0 0 8px rgba(37,99,235,0.35))'}; }
            100%      { stroke: ${cardStrokeDefault}; stroke-width: 1.2px; fill: ${cardFillDefault}; filter: none; }
          }

          /* Neural scanner ray moving inside CORE AI card */
          @keyframes aiScannerSweep {
            0%, 100% { transform: translateY(0px); opacity: 0.35; }
            50%      { transform: translateY(80px); opacity: 1; }
          }

          /* Forward-flowing bridge chevrons */
          @keyframes chevronFlow {
            0%, 100% { stroke-opacity: 0.35; transform: translateX(0); }
            50%      { stroke-opacity: 1; transform: translateX(3px); stroke: #38BDF8; filter: drop-shadow(0 0 6px #38BDF8); }
          }

          /* Ambient backglow pulse */
          @keyframes aiAmbPulse {
            0%,100% { opacity:0.25; }
            50%     { opacity:0.45; }
          }

          /* Core badge glowing pulse */
          @keyframes aiCoreTagPulse {
            0%,100% { opacity: 0.85; filter: none; }
            50%     { opacity: 1; filter: drop-shadow(0 0 8px #38BDF8); }
          }

          /* Verify milestone ping */
          @keyframes aiVerifyPing {
            0%   { r: 4.5px; opacity: 0.95; }
            100% { r: 18px; opacity: 0; }
          }

          @keyframes aiBeamDash {
            to { stroke-dashoffset: -28; }
          }

          @media (prefers-reduced-motion: reduce) {
            .ai-anim { animation: none !important; }
          }
        `}</style>
      </defs>

      {/* Ambient background glow */}
      <ellipse
        className="ai-anim"
        cx="180" cy="110" rx="168" ry="88"
        fill="url(#aiBg)"
        style={{ animation: 'aiAmbPulse 3.5s ease-in-out infinite' }}
      />

      {/* Flow beam background track */}
      <line x1="20" y1="110" x2="340" y2="110" stroke={beamCol} strokeWidth="1" strokeOpacity={isDark ? '0.30' : '0.20'} />
      <line
        className="ai-anim"
        x1="20" y1="110" x2="340" y2="110"
        stroke={beamCol} strokeWidth="1.6"
        strokeDasharray="6 8" strokeOpacity={isDark ? '0.80' : '0.60'}
        style={{ animation: 'aiBeamDash 1.6s linear infinite' }}
      />

      {/* Connector forward chevrons in the gaps between cards */}
      <path
        className="ai-anim"
        d="M 64 107 L 69 110 L 64 113"
        fill="none" stroke={beamCol} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
        style={{ animation: 'chevronFlow 1.6s ease-in-out infinite 0s' }}
      />
      <path
        className="ai-anim"
        d="M 136 107 L 141 110 L 136 113"
        fill="none" stroke={beamCol} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
        style={{ animation: 'chevronFlow 1.6s ease-in-out infinite 0.4s' }}
      />
      <path
        className="ai-anim"
        d="M 218 107 L 223 110 L 218 113"
        fill="none" stroke={beamCol} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
        style={{ animation: 'chevronFlow 1.6s ease-in-out infinite 0.8s' }}
      />
      <path
        className="ai-anim"
        d="M 290 107 L 295 110 L 290 113"
        fill="none" stroke={beamCol} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
        style={{ animation: 'chevronFlow 1.6s ease-in-out infinite 1.2s' }}
      />

      {/* ─── 01: IN box (input) ─── */}
      <g>
        <rect
          className="ai-anim"
          x="12" y="86" width="48" height="48" rx="8"
          fill={cardFillDefault}
          stroke={cardStrokeDefault}
          strokeWidth="1.2"
          style={{ animation: 'aiCardPulse0 3.2s ease-in-out infinite' }}
        />
        <text x="36" y="106" textAnchor="middle" fontFamily="'DM Sans', sans-serif"
          fontSize="11" fontWeight="700" letterSpacing="0.8" fill={textTitle}>IN</text>
        <text x="36" y="121" textAnchor="middle" fontFamily="'JetBrains Mono', monospace"
          fontSize="8" fontWeight="600" fill={textSub}>input</text>
      </g>

      {/* ─── 02: SPEC box (criteria) ─── */}
      <g>
        <rect
          className="ai-anim"
          x="74" y="80" width="58" height="60" rx="8"
          fill={cardFillDefault}
          stroke={cardStrokeDefault}
          strokeWidth="1.2"
          style={{ animation: 'aiCardPulse1 3.2s ease-in-out infinite' }}
        />
        <text x="103" y="104" textAnchor="middle" fontFamily="'DM Sans', sans-serif"
          fontSize="10" fontWeight="700" letterSpacing="0.8" fill={textTitle}>SPEC</text>
        <text x="103" y="121" textAnchor="middle" fontFamily="'JetBrains Mono', monospace"
          fontSize="8" fontWeight="600" fill={textSub}>criteria</text>
      </g>

      {/* ─── 03: AI active box (CORE AI guardrails & evals) — centerpiece ─── */}
      <g>
        <rect
          className="ai-anim"
          x="146" y="66" width="68" height="84" rx="8"
          fill={isDark ? 'rgba(56,189,248,0.14)' : 'rgba(37,99,235,0.08)'}
          stroke={accentBlue}
          strokeWidth="1.8"
          style={{
            animation: 'aiCardPulse2 3.2s ease-in-out infinite',
            filter: isDark ? `drop-shadow(0 0 10px rgba(56,189,248,0.5))` : 'none',
          }}
        />

        {/* Neural scanner laser beam sweeping inside CORE AI box */}
        <g clipPath="url(#aiCoreClip)">
          <line
            className="ai-anim"
            x1="146" y1="66" x2="214" y2="66"
            stroke="#FFFFFF"
            strokeWidth="2.4"
            style={{
              animation: 'aiScannerSweep 2.4s ease-in-out infinite',
              filter: `drop-shadow(0 0 8px ${accentBlue})`,
            }}
          />
        </g>

        {/* Pill badge inside */}
        <rect
          className="ai-anim"
          x="160" y="74" width="40" height="15" rx="3.5"
          fill={isDark ? 'rgba(56,189,248,0.30)' : '#2563EB'}
          stroke={accentBlue}
          strokeWidth="0.8"
          style={{ animation: 'aiCoreTagPulse 2.4s ease-in-out infinite' }}
        />
        <text x="180" y="85" textAnchor="middle" fontFamily="'JetBrains Mono', monospace"
          fontSize="7.5" fontWeight="700" letterSpacing="1.2"
          fill="#FFFFFF">CORE</text>
        <text x="180" y="108" textAnchor="middle" fontFamily="'DM Sans', sans-serif"
          fontSize="14" fontWeight="800" letterSpacing="1.2"
          fill={isDark ? '#FFFFFF' : '#0F172A'}
          style={{ filter: isDark ? `drop-shadow(0 0 8px ${accentBlue})` : 'none' }}>AI</text>
        <text x="180" y="124" textAnchor="middle" fontFamily="'DM Sans', sans-serif"
          fontSize="8" fontWeight="600" fill={isDark ? '#F8FAFC' : '#0F172A'}>guardrails</text>
        <text x="180" y="137" textAnchor="middle" fontFamily="'DM Sans', sans-serif"
          fontSize="8" fontWeight="600" fill={isDark ? '#F8FAFC' : '#0F172A'}>&amp; evals</text>
      </g>

      {/* ─── 04: REVIEW box (human) ─── */}
      <g>
        <rect
          className="ai-anim"
          x="228" y="80" width="58" height="60" rx="8"
          fill={cardFillDefault}
          stroke={cardStrokeDefault}
          strokeWidth="1.2"
          style={{ animation: 'aiCardPulse3 3.2s ease-in-out infinite' }}
        />
        <text x="257" y="104" textAnchor="middle" fontFamily="'DM Sans', sans-serif"
          fontSize="10" fontWeight="700" letterSpacing="0.8" fill={textTitle}>REVIEW</text>
        <text x="257" y="121" textAnchor="middle" fontFamily="'JetBrains Mono', monospace"
          fontSize="8" fontWeight="600" fill={textSub}>human</text>
      </g>

      {/* ─── 05: OUT box (verified) ─── */}
      <g>
        <rect
          className="ai-anim"
          x="300" y="86" width="48" height="48" rx="8"
          fill={cardFillDefault}
          stroke={cardStrokeDefault}
          strokeWidth="1.2"
          style={{ animation: 'aiCardPulse4 3.2s ease-in-out infinite' }}
        />
        <text x="324" y="106" textAnchor="middle" fontFamily="'DM Sans', sans-serif"
          fontSize="11" fontWeight="700" letterSpacing="0.8" fill={isDark ? '#FFFFFF' : '#0F172A'}>OUT</text>
        <text x="324" y="121" textAnchor="middle" fontFamily="'JetBrains Mono', monospace"
          fontSize="8" fontWeight="600" fill={textSub}>verified</text>
      </g>

      {/* ─── High-speed flowing data token packets across the entire pipeline ─── */}
      {[0, 1.1, 2.2].map((delay, idx) => (
        <g key={`ai-pkt-${idx}`} pointerEvents="none">
          {/* Glowing cyan halo */}
          <circle r="4.5" fill={accentBlue} fillOpacity="0.75" style={{ filter: `drop-shadow(0 0 8px ${accentBlue})` }}>
            <animateMotion
              path="M 12 110 L 348 110"
              dur="3.2s"
              begin={`${delay}s`}
              repeatCount="indefinite"
            />
          </circle>
          {/* Pure white core packet */}
          <circle r="2.2" fill="#FFFFFF">
            <animateMotion
              path="M 12 110 L 348 110"
              dur="3.2s"
              begin={`${delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        </g>
      ))}

      {/* ─── Bottom timeline guides with VisualBD concentric target rings ─── */}
      <line x1="36" y1="182" x2="324" y2="182" stroke={beamCol} strokeWidth="1" strokeOpacity="0.30" strokeDasharray="3 4" />

      {/* Traveling timeline cursor in sync with pipeline */}
      <circle r="3.2" fill="#FFFFFF" style={{ filter: `drop-shadow(0 0 6px ${accentBlue})` }} pointerEvents="none">
        <animateMotion
          path="M 36 182 L 324 182"
          dur="3.2s"
          repeatCount="indefinite"
        />
      </circle>

      {[
        { cx: 36,  active: false, step: '01' },
        { cx: 103, active: false, step: '02' },
        { cx: 180, active: true,  step: '03' },
        { cx: 257, active: false, step: '04' },
        { cx: 324, active: false, step: '05' },
      ].map((d, i) => (
        <g key={i}>
          {d.active && (
            <circle
              className="ai-anim"
              cx={d.cx} cy="182" r="6"
              fill="none" stroke={accentBlue} strokeWidth="1"
              style={{
                animation: 'aiVerifyPing 2.2s ease-out infinite',
                transformOrigin: `${d.cx}px 182px`,
              }}
            />
          )}
          {/* Concentric node disc */}
          <circle
            cx={d.cx} cy="182"
            r={d.active ? '9' : '6.5'}
            fill={d.active ? (isDark ? 'rgba(56,189,248,0.30)' : 'rgba(37,99,235,0.22)') : (isDark ? 'rgba(56,189,248,0.12)' : 'rgba(37,99,235,0.10)')}
            stroke={d.active ? (isDark ? '#38BDF8' : '#2563EB') : (isDark ? 'rgba(56,189,248,0.45)' : 'rgba(37,99,235,0.35)')}
            strokeWidth="1"
          />
          <circle
            cx={d.cx} cy="182"
            r={d.active ? '4.5' : '3'}
            fill={accentBlue}
            style={{ filter: d.active ? `drop-shadow(0 0 6px ${accentBlue})` : 'none' }}
          />
          <circle cx={d.cx} cy="182" r={d.active ? '2' : '1.2'} fill="#FFFFFF" />

          {/* Step label */}
          <text
            x={d.cx} y="202"
            textAnchor="middle"
            fontFamily="'JetBrains Mono', monospace"
            fontSize="7.5"
            fontWeight="700"
            fill={d.active ? (isDark ? '#FFFFFF' : '#1D4ED8') : (isDark ? accentBlue : '#475569')}
          >
            {d.step}
          </text>
        </g>
      ))}
    </svg>
  );
};

// ─── VisualBD — Network Graph (Risk, Oversight, Eval, Fallback, Adoption) ─────

const VisualBD = ({ visRef }) => {
  const { isDark } = useTheme();

  // Cohesive executive palette: Ice Blue + Titanium Slate (matching VisualAI)
  const hubCol     = isDark ? '#38BDF8' : '#2563EB';
  const lineCol    = isDark ? '#38BDF8' : '#2563EB';
  const textCol    = isDark ? '#FFFFFF' : '#0F172A';
  const ringStroke = isDark ? '#38BDF8' : '#2563EB';
  const nodeStroke = isDark ? 'rgba(56,189,248,0.45)' : 'rgba(37,99,235,0.35)';
  const nodeFill   = isDark ? 'rgba(56,189,248,0.12)' : 'rgba(37,99,235,0.08)';

  return (
    <svg
      ref={visRef}
      viewBox="0 0 360 280"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
    >
      <defs>
        <radialGradient id="gBDhub" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={hubCol} stopOpacity={isDark ? '0.50' : '0.30'} />
          <stop offset="60%"  stopColor={hubCol} stopOpacity={isDark ? '0.18' : '0.10'} />
          <stop offset="100%" stopColor={hubCol} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="gBDambient" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={hubCol} stopOpacity={isDark ? '0.18' : '0.08'} />
          <stop offset="100%" stopColor={hubCol} stopOpacity="0" />
        </radialGradient>
        <style>{`
          @keyframes bdAmbPulse {
            0%,100% { opacity: ${isDark ? '0.18' : '0.10'}; }
            50%     { opacity: ${isDark ? '0.35' : '0.18'}; }
          }
          @keyframes bdHubPulse  { 0%,100%{r:18;opacity:0.55} 50%{r:30;opacity:0} }
          @keyframes bdHubPulse2 { 0%,100%{r:18;opacity:0.28} 50%{r:42;opacity:0} }
          @keyframes bdDash { to { stroke-dashoffset: -28; } }
          @keyframes bdNodeFloat0 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
          @keyframes bdNodeFloat1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)}  }
          @keyframes bdNodeFloat2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
          @keyframes bdNodeFloat3 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(4px)}  }
          @keyframes bdNodeFloat4 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
          @keyframes bdHubSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
          @keyframes bdNodePing {
            0%   { r: 8px; opacity: 0.85; }
            100% { r: 22px; opacity: 0; }
          }
          @media (prefers-reduced-motion: reduce) { .bd-anim { animation: none !important; } }
        `}</style>
      </defs>

      {/* Ambient glow */}
      <ellipse className="bd-anim" cx="180" cy="140" rx="160" ry="120"
        fill="url(#gBDambient)"
        style={{ animation: 'bdAmbPulse 3.5s ease-in-out infinite' }}
      />

      {/* Connecting lines */}
      {[
        { x1:82,  y1:68,  x2:174, y2:133, dur:'1.8s', delay:'' },
        { x1:278, y1:68,  x2:186, y2:133, dur:'2.1s', delay:'' },
        { x1:56,  y1:168, x2:168, y2:142, dur:'1.6s', delay:'0.3s' },
        { x1:304, y1:185, x2:192, y2:148, dur:'2.3s', delay:'0.5s' },
        { x1:180, y1:248, x2:180, y2:158, dur:'1.9s', delay:'0.8s' },
      ].map((l, i) => (
        <line key={i} className="bd-anim bd-line"
          x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke={lineCol}
          strokeWidth="1.2" strokeOpacity={isDark ? '0.40' : '0.35'}
          strokeDasharray="5 7"
          style={{ animation: `bdDash ${l.dur} linear infinite ${l.delay}` }}
        />
      ))}

      {/* Traveling data packets outward along network lines */}
      {[
        { toX: 82,  toY: 68,  dur: '2.4s', delay: '0s' },
        { toX: 278, toY: 68,  dur: '2.8s', delay: '0.5s' },
        { toX: 56,  toY: 168, dur: '2.2s', delay: '1.0s' },
        { toX: 304, toY: 185, dur: '3.0s', delay: '1.4s' },
        { toX: 180, toY: 248, dur: '2.6s', delay: '0.8s' },
      ].map((p, idx) => (
        <g key={`bd-pkt-${idx}`} pointerEvents="none">
          <circle r="4" fill={hubCol} fillOpacity="0.6" style={{ filter: `drop-shadow(0 0 6px ${hubCol})` }}>
            <animateMotion
              path={`M 180 140 L ${p.toX} ${p.toY}`}
              dur={p.dur}
              begin={p.delay}
              repeatCount="indefinite"
            />
          </circle>
          <circle r="2.2" fill="#FFFFFF">
            <animateMotion
              path={`M 180 140 L ${p.toX} ${p.toY}`}
              dur={p.dur}
              begin={p.delay}
              repeatCount="indefinite"
            />
          </circle>
        </g>
      ))}

      {/* Hub pulse rings */}
      <circle className="bd-anim" cx="180" cy="140" r="18"
        fill="none" stroke={ringStroke} strokeWidth="0.8" strokeOpacity="0"
        style={{ animation: 'bdHubPulse 2.8s ease-out infinite' }}
      />
      <circle className="bd-anim" cx="180" cy="140" r="18"
        fill="none" stroke={ringStroke} strokeWidth="0.6" strokeOpacity="0"
        style={{ animation: 'bdHubPulse2 2.8s ease-out infinite 0.9s' }}
      />

      {/* Hub static rings */}
      <circle cx="180" cy="140" r="28" fill="none" stroke={ringStroke} strokeWidth="0.7" strokeOpacity={isDark ? '0.35' : '0.22'} />
      <circle cx="180" cy="140" r="20" fill="none" stroke={ringStroke} strokeWidth="0.7" strokeOpacity={isDark ? '0.40' : '0.28'} />
      <circle className="bd-anim" cx="180" cy="140" r="14"
        fill="none" stroke={hubCol} strokeWidth="1.2" strokeOpacity={isDark ? '0.70' : '0.42'}
        strokeDasharray="4 8"
        style={{ animation: 'bdHubSpin 8s linear infinite', transformOrigin: '180px 140px' }}
      />

      {/* Hub core */}
      <circle cx="180" cy="140" r="28" fill="url(#gBDhub)" />
      <circle cx="180" cy="140" r="11" fill={hubCol} fillOpacity={isDark ? '0.80' : '0.55'} />
      <circle cx="180" cy="140" r="6"  fill={isDark ? '#FFFFFF' : '#1D4ED8'} fillOpacity="1"
        style={{ filter: isDark ? `drop-shadow(0 0 6px ${hubCol})` : 'none' }}
      />

      {/* Satellite nodes */}
      {[
        { cx:82,  cy:68,  anim:'bdNodeFloat0 4.2s', label:'SOPS',      lx:82,  ly:47  },
        { cx:278, cy:68,  anim:'bdNodeFloat1 4.8s', label:'TRAINING',  lx:278, ly:47  },
        { cx:56,  cy:168, anim:'bdNodeFloat2 3.9s', label:'WORKSHOPS', lx:48,  ly:191 },
        { cx:304, cy:185, anim:'bdNodeFloat3 5.1s', label:'HANDOVER',  lx:314, ly:207 },
        { cx:180, cy:248, anim:'bdNodeFloat4 4.5s', label:'ADOPTION',  lx:180, ly:271 },
      ].map((n, i) => (
        <g key={i} className="bd-anim"
          style={{ animation: `${n.anim} ease-in-out infinite`, transformOrigin: `${n.cx}px ${n.cy}px` }}>
          {/* Node ping wave */}
          <circle
            className="bd-anim"
            cx={n.cx} cy={n.cy} r="12"
            fill="none" stroke={hubCol} strokeWidth="0.8"
            style={{
              animation: `bdNodePing 3.2s ease-out infinite ${i * 0.6}s`,
              transformOrigin: `${n.cx}px ${n.cy}px`,
            }}
          />
          {/* Node disc */}
          <circle cx={n.cx} cy={n.cy} r="14"
            fill={nodeFill} stroke={nodeStroke} strokeWidth="1" />
          <circle cx={n.cx} cy={n.cy} r="7"
            fill={isDark ? 'rgba(56,189,248,0.25)' : 'rgba(37,99,235,0.18)'} />
          {/* Core pinpoint */}
          <circle cx={n.cx} cy={n.cy} r="5"
            fill={hubCol} fillOpacity="0.4"
            style={{ filter: isDark ? `drop-shadow(0 0 6px ${hubCol})` : 'none' }}
          />
          <circle cx={n.cx} cy={n.cy} r="3"
            fill={hubCol} fillOpacity="1"
          />
          <circle cx={n.cx} cy={n.cy} r="1.5"
            fill="#FFFFFF"
          />
          {/* Label */}
          <text x={n.lx} y={n.ly} textAnchor="middle"
            fontFamily="'DM Sans',sans-serif" fontSize="8.5" fontWeight="700" letterSpacing="1"
            fill={textCol}>{n.label}</text>
        </g>
      ))}
    </svg>
  );
};

// ─── VisualPM — Delivery & Acceptance Roadmap ─────────────────────────────────

const VisualPM = ({ visRef }) => {
  const { isDark } = useTheme();

  const accentBlue = isDark ? '#38BDF8' : '#2563EB';

  const rows = [
    { y: 84,  x1: 60,  w: 160, label: 'SOW & SCOPE', active: false, done: true,  future: false },
    { y: 122, x1: 170, w: 110, label: 'PRIORITIES',  active: false, done: true,  future: false },
    { y: 160, x1: 100, w: 180, label: 'DELIVERY',    active: true,  done: false, future: false },
    { y: 198, x1: 230, w: 120, label: 'ACCEPTANCE',  active: false, done: false, future: true  },
    { y: 236, x1: 280, w: 76,  label: 'RELEASE',     active: false, done: false, future: true  },
  ];

  const getFill = (r) => {
    if (r.active) return isDark ? 'rgba(56,189,248,0.26)' : '#2563EB';
    if (r.done)   return isDark ? 'rgba(56,189,248,0.14)' : 'rgba(37,99,235,0.12)';
    if (r.future) return isDark ? 'rgba(56,189,248,0.06)' : 'rgba(37,99,235,0.04)';
    return 'transparent';
  };

  const getStroke = (r) => {
    if (r.active) return isDark ? accentBlue : '#1D4ED8';
    if (r.done)   return isDark ? 'rgba(56,189,248,0.55)' : 'rgba(37,99,235,0.45)';
    if (r.future) return isDark ? 'rgba(56,189,248,0.30)' : 'rgba(37,99,235,0.25)';
    return 'transparent';
  };

  const getTextFill = (r) => {
    if (r.active) return '#FFFFFF';
    if (r.done)   return isDark ? '#FFFFFF' : '#0F172A';
    if (r.future) return isDark ? '#94A3B8' : '#334155';
    return isDark ? 'rgba(255,255,255,0.5)' : '#4B5563';
  };

  return (
    <svg ref={visRef} viewBox="0 0 360 280" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', background: 'transparent' }}>
      <defs>
        <radialGradient id="gPM" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={accentBlue} stopOpacity={isDark ? '0.28' : '0.14'} />
          <stop offset="60%"  stopColor={accentBlue} stopOpacity={isDark ? '0.10' : '0.05'} />
          <stop offset="100%" stopColor={accentBlue} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pmShimmerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={accentBlue} stopOpacity="0" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity={isDark ? '0.45' : '0.60'} />
          <stop offset="100%" stopColor={accentBlue} stopOpacity="0" />
        </linearGradient>
        <clipPath id="pmDeliveryClip">
          <rect x="100" y="149" width="180" height="22" rx="5" />
        </clipPath>
        <style>{`
          @keyframes pmShimmer {
            0%   { transform: translateX(-180px); }
            100% { transform: translateX(200px); }
          }
          @keyframes pmNowLaser {
            0%, 100% { stroke-opacity: 0.45; }
            50%      { stroke-opacity: 1; filter: drop-shadow(0 0 8px #38BDF8); }
          }
          @keyframes pmBeaconPing {
            0%   { r: 3.5px; opacity: 0.95; }
            100% { r: 14px; opacity: 0; }
          }
          @keyframes pmAmbGlow {
            0%, 100% { opacity: 0.7; }
            50%      { opacity: 1; }
          }
          @media (prefers-reduced-motion: reduce) {
            .pm-anim { animation: none !important; }
          }
        `}</style>
      </defs>

      {/* Ambient background glow */}
      <ellipse className="pm-anim" cx="180" cy="155" rx="155" ry="115" fill="url(#gPM)"
        style={{ animation: 'pmAmbGlow 4s ease-in-out infinite' }} />

      {/* Grid vertical guide lines + sprint markers */}
      {[
        { x: 80,  label: 'W01' },
        { x: 150, label: 'W02' },
        { x: 220, label: 'W03' },
        { x: 290, label: 'W04' },
      ].map((g, gi) => (
        <g key={gi}>
          <line x1={g.x} y1="62" x2={g.x} y2="256"
            stroke={isDark ? 'rgba(56,189,248,0.18)' : 'rgba(37,99,235,0.22)'}
            strokeWidth="0.8" strokeDasharray="3 4" />
          <text x={g.x} y="54" textAnchor="middle"
            fill={isDark ? accentBlue : '#1D4ED8'} fontSize="7.5" fontFamily="'JetBrains Mono', monospace" fontWeight="700">
            {g.label}
          </text>
        </g>
      ))}

      {rows.map((r, i) => (
        <g key={i} className="pm-row" opacity="0">
          {/* Bar fill */}
          <rect x={r.x1} y={r.y - 11} width={r.w} height="22"
            fill={getFill(r)} rx="5" />

          {/* Shimmer sweep on active bar */}
          {r.active && (
            <g clipPath="url(#pmDeliveryClip)">
              <rect
                className="pm-anim"
                x="100" y={r.y - 11} width="90" height="22"
                fill="url(#pmShimmerGrad)"
                style={{ animation: 'pmShimmer 2.4s ease-in-out infinite' }}
              />
            </g>
          )}

          {/* Border */}
          <rect x={r.x1} y={r.y - 11} width={r.w} height="22"
            fill="none" stroke={getStroke(r)}
            strokeWidth={r.active ? '1.8' : '1.2'} rx="5"
            strokeDasharray={r.future ? '4 3' : 'none'}
            style={{ filter: (r.active && isDark) ? 'drop-shadow(0 0 10px rgba(56,189,248,0.65))' : 'none' }}
          />

          {/* Left accent marker on active bar */}
          {r.active && (
            <rect x={r.x1} y={r.y - 11} width="4" height="22"
              fill="#FFFFFF" rx="1.5"
              style={{ filter: isDark ? `drop-shadow(0 0 6px ${accentBlue})` : 'none' }} />
          )}

          {/* Concentric node matching VisualBD */}
          <g>
            {r.active && (
              <circle
                className="pm-anim"
                cx={r.x1 + 14} cy={r.y} r="4"
                fill="none" stroke={isDark ? accentBlue : '#FFFFFF'} strokeWidth="1"
                style={{
                  animation: 'pmBeaconPing 2.0s ease-out infinite',
                  transformOrigin: `${r.x1 + 14}px ${r.y}px`,
                }}
              />
            )}
            <circle cx={r.x1 + 14} cy={r.y} r={r.active ? '7' : '5'}
              fill={r.active ? (isDark ? 'rgba(56,189,248,0.30)' : 'rgba(255,255,255,0.35)') : (isDark ? 'rgba(56,189,248,0.18)' : 'rgba(37,99,235,0.16)')}
              stroke={r.active ? (isDark ? '#38BDF8' : '#FFFFFF') : (isDark ? 'rgba(56,189,248,0.50)' : 'rgba(37,99,235,0.45)')}
              strokeWidth="0.8"
            />
            <circle cx={r.x1 + 14} cy={r.y} r={r.active ? '4' : '2.8'}
              fill={r.active ? (isDark ? accentBlue : '#FFFFFF') : accentBlue}
              style={{ filter: r.active ? `drop-shadow(0 0 6px ${isDark ? accentBlue : 'rgba(255,255,255,0.8)'})` : 'none' }}
            />
            <circle cx={r.x1 + 14} cy={r.y} r={r.active ? '1.8' : '1.2'} fill={r.active ? (isDark ? '#FFFFFF' : '#1D4ED8') : '#FFFFFF'} />
          </g>

          <text x={r.x1 + 26} y={r.y + 4}
            fill={getTextFill(r)}
            fontSize="8.5" fontFamily="'DM Sans', sans-serif"
            letterSpacing="0.8" fontWeight="700">
            {r.label}
          </text>
        </g>
      ))}

      {/* NOW milestone indicator line */}
      <line className="pm-now pm-anim" x1="200" y1="58" x2="200" y2="258"
        stroke={accentBlue} strokeWidth="1.6" strokeOpacity="0.6" strokeDasharray="4 4"
        style={{
          animation: 'pmNowLaser 2.6s ease-in-out infinite',
          filter: isDark ? 'drop-shadow(0 0 6px #38BDF8)' : 'drop-shadow(0 0 4px #2563EB)',
        }} />
      <g className="pm-now-label" opacity="0">
        <rect x="187" y="44" width="26" height="15" rx="3.5"
          fill={accentBlue}
          style={{ filter: isDark ? 'drop-shadow(0 0 6px #38BDF8)' : 'none' }} />
        <text x="200" y="55" textAnchor="middle"
          fill="#FFFFFF" fontSize="7.5" fontFamily="'JetBrains Mono', monospace" fontWeight="800" letterSpacing="0.5">
          NOW
        </text>
      </g>
    </svg>
  );
};

// ─── VisualDT — Discovery & Prioritisation Radar ─────────────────────────────

const VisualDT = () => {
  const { isDark } = useTheme();
  const [activeIdx, setActiveIdx] = useState(0);

  // Cycle clockwise through the 5 phases every 1.8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % 5);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  // Cohesive executive palette matching VisualBD: Electric Cyan + Crisp Pure White
  const hubCol     = isDark ? '#38BDF8' : '#2563EB';
  const lineCol    = isDark ? '#38BDF8' : '#2563EB';
  const textCol    = isDark ? '#FFFFFF' : '#0F172A';
  const ringStroke = isDark ? '#38BDF8' : '#2563EB';
  const nodeFill   = isDark ? 'rgba(56,189,248,0.12)' : 'rgba(37,99,235,0.08)';
  const nodeStroke = isDark ? 'rgba(56,189,248,0.45)' : 'rgba(37,99,235,0.35)';

  const phases = [
    {
      id: 'p1',
      title: 'INTERVIEW',
      sub: 'Stakeholders',
      cx: 180,
      cy: 54,
      lx: 180,
      ly: 32,
      align: 'middle',
      floatAnim: 'dtFloat0 4.2s',
    },
    {
      id: 'p2',
      title: 'DEFINE',
      sub: 'Pain points',
      cx: 262,
      cy: 113,
      lx: 284,
      ly: 111,
      align: 'start',
      floatAnim: 'dtFloat1 4.8s',
    },
    {
      id: 'p3',
      title: 'ASSESS',
      sub: 'Feasibility',
      cx: 231,
      cy: 210,
      lx: 252,
      ly: 212,
      align: 'start',
      floatAnim: 'dtFloat2 3.9s',
    },
    {
      id: 'p4',
      title: 'PRIORITIZE',
      sub: 'Value vs ROI',
      cx: 129,
      cy: 210,
      lx: 108,
      ly: 212,
      align: 'end',
      floatAnim: 'dtFloat3 5.1s',
    },
    {
      id: 'p5',
      title: 'ROADMAP',
      sub: 'Scoped plan',
      cx: 98,
      cy: 113,
      lx: 76,
      ly: 111,
      align: 'end',
      floatAnim: 'dtFloat4 4.5s',
    },
  ];

  // Pre-calculated sector wedge paths for each phase (clockwise)
  const wedges = [
    { path: 'M 180 140 L 141 52 A 96 96 0 0 1 219 52 Z', arc: 'M 141 52 A 96 96 0 0 1 219 52' }, // INTERVIEW
    { path: 'M 180 140 L 251 76 A 96 96 0 0 1 276 150 Z', arc: 'M 251 76 A 96 96 0 0 1 276 150' }, // DEFINE
    { path: 'M 180 140 L 263 188 A 96 96 0 0 1 200 234 Z', arc: 'M 263 188 A 96 96 0 0 1 200 234' }, // ASSESS
    { path: 'M 180 140 L 160 234 A 96 96 0 0 1 97 188 Z', arc: 'M 160 234 A 96 96 0 0 1 97 188' },   // PRIORITIZE
    { path: 'M 180 140 L 84 150 A 96 96 0 0 1 109 76 Z', arc: 'M 84 150 A 96 96 0 0 1 109 76' },     // ROADMAP
  ];

  const curPhase = phases[activeIdx];

  return (
    <svg
      viewBox="0 0 360 280"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', display: 'block', background: 'transparent' }}
    >
      <defs>
        <radialGradient id="gDThub" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={hubCol} stopOpacity={isDark ? '0.55' : '0.35'} />
          <stop offset="60%"  stopColor={hubCol} stopOpacity={isDark ? '0.20' : '0.12'} />
          <stop offset="100%" stopColor={hubCol} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="gDTambient" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={hubCol} stopOpacity={isDark ? '0.22' : '0.10'} />
          <stop offset="100%" stopColor={hubCol} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="gDTSweepSector" cx="0%" cy="0%" r="100%">
          <stop offset="0%"   stopColor={hubCol} stopOpacity={isDark ? '0.35' : '0.20'} />
          <stop offset="60%"  stopColor={hubCol} stopOpacity={isDark ? '0.12' : '0.06'} />
          <stop offset="100%" stopColor={hubCol} stopOpacity="0" />
        </radialGradient>

        <style>{`
          @keyframes dtAmbPulse {
            0%, 100% { opacity: ${isDark ? '0.20' : '0.10'}; }
            50%      { opacity: ${isDark ? '0.40' : '0.22'}; }
          }
          @keyframes dtHubPulse  { 0%, 100% { r: 18; opacity: 0.55; } 50% { r: 34; opacity: 0; } }
          @keyframes dtHubPulse2 { 0%, 100% { r: 18; opacity: 0.28; } 50% { r: 46; opacity: 0; } }
          @keyframes dtDash      { to { stroke-dashoffset: -28; } }
          @keyframes dtHubSpin   { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes dtRadarSweep { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes dtNodePing  { 0% { r: 10px; opacity: 0.85; } 100% { r: 24px; opacity: 0; } }
          @keyframes dtActivePing { 0% { r: 14px; opacity: 0.95; } 100% { r: 28px; opacity: 0; } }
          @keyframes dtFloat0    { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
          @keyframes dtFloat1    { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(4px); } }
          @keyframes dtFloat2    { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
          @keyframes dtFloat3    { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(4px); } }
          @keyframes dtFloat4    { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
          @media (prefers-reduced-motion: reduce) {
            .dt-anim { animation: none !important; }
          }
        `}</style>
      </defs>

      {/* Ambient glow */}
      <ellipse className="dt-anim" cx="180" cy="140" rx="160" ry="120"
        fill="url(#gDTambient)"
        style={{ animation: 'dtAmbPulse 3.5s ease-in-out infinite' }}
      />

      {/* Header tag (Discipline // 01) matching reference */}
      <g>
        <circle cx="28" cy="22" r="3" fill={hubCol}
          style={{ filter: isDark ? `drop-shadow(0 0 6px ${hubCol})` : 'none' }} />
        <text x="38" y="25"
          fontFamily="'JetBrains Mono', monospace" fontSize="7.5" fontWeight="700" letterSpacing="1.4"
          fill={hubCol}>
          DISCIPLINE // 01
        </text>
      </g>

      {/* Radar range concentric rings */}
      <circle cx="180" cy="140" r="96" fill="none" stroke={ringStroke} strokeWidth="0.8" strokeOpacity={isDark ? '0.35' : '0.40'} />
      <circle cx="180" cy="140" r="66" fill="none" stroke={ringStroke} strokeWidth="0.8" strokeOpacity={isDark ? '0.28' : '0.30'} strokeDasharray="4 6" />
      <circle cx="180" cy="140" r="36" fill="none" stroke={ringStroke} strokeWidth="0.8" strokeOpacity={isDark ? '0.35' : '0.40'} />

      {/* Degree calibration tick marks on outer ring */}
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i / 24) * Math.PI * 2;
        const isMajor = i % 6 === 0;
        const r1 = 96;
        const r2 = 96 + (isMajor ? 6 : 3.5);
        const x1 = 180 + Math.cos(a) * r1;
        const y1 = 140 + Math.sin(a) * r1;
        const x2 = 180 + Math.cos(a) * r2;
        const y2 = 140 + Math.sin(a) * r2;
        return (
          <line key={`tick-${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={ringStroke} strokeWidth={isMajor ? '1.2' : '0.6'}
            strokeOpacity={isDark ? (isMajor ? '0.65' : '0.30') : (isMajor ? '0.65' : '0.35')}
          />
        );
      })}

      {/* Crosshair axes */}
      <line x1="60" y1="140" x2="300" y2="140" stroke={ringStroke} strokeWidth="0.6" strokeOpacity={isDark ? '0.25' : '0.35'} strokeDasharray="3 4" />
      <line x1="180" y1="36" x2="180" y2="244" stroke={ringStroke} strokeWidth="0.6" strokeOpacity={isDark ? '0.25' : '0.35'} strokeDasharray="3 4" />

      {/* Dynamic rotating phase wedge highlight moving clockwise */}
      <g style={{ transition: 'all 0.35s ease' }}>
        <path
          d={wedges[activeIdx].path}
          fill={isDark ? 'rgba(56,189,248,0.22)' : 'rgba(37,99,235,0.14)'}
          style={{ transition: 'd 0.35s ease' }}
        />
        {/* Glowing arc line along outer edge of active wedge */}
        <path
          d={wedges[activeIdx].arc}
          fill="none" stroke="#38BDF8" strokeWidth="2.4" strokeLinecap="round"
          style={{
            filter: isDark ? 'drop-shadow(0 0 10px #38BDF8)' : 'drop-shadow(0 0 6px #2563EB)',
            transition: 'd 0.35s ease',
          }}
        />
      </g>

      {/* 360° Rotating Radar Sweep Line with gradient tail */}
      <g className="dt-anim" style={{ animation: 'dtRadarSweep 6.5s linear infinite', transformOrigin: '180px 140px' }}>
        <path
          d="M 180 140 L 276 140 A 96 96 0 0 1 266 182 Z"
          fill="url(#gDTSweepSector)"
          opacity="0.32"
        />
        <line
          x1="180" y1="140" x2="276" y2="140"
          stroke={hubCol} strokeWidth="1.8" strokeOpacity="0.85"
          style={{ filter: isDark ? `drop-shadow(0 0 6px ${hubCol})` : 'none' }}
        />
      </g>

      {/* Connecting dashed rays from center to 5 nodes */}
      {[
        { x: 180, y: 54,  dur: '1.9s' },
        { x: 262, y: 113, dur: '2.1s' },
        { x: 231, y: 210, dur: '1.7s' },
        { x: 129, y: 210, dur: '2.3s' },
        { x: 98,  y: 113, dur: '2.0s' },
      ].map((l, i) => (
        <line key={`dt-line-${i}`} className="dt-anim"
          x1="180" y1="140" x2={l.x} y2={l.y}
          stroke={lineCol}
          strokeWidth="1.2" strokeOpacity={isDark ? '0.45' : '0.35'}
          strokeDasharray="5 7"
          style={{ animation: `dtDash ${l.dur} linear infinite` }}
        />
      ))}

      {/* Pointer ray from center AI hub pointing directly to the active phase */}
      <line
        x1="180" y1="140"
        x2={curPhase.cx} y2={curPhase.cy}
        stroke="#38BDF8" strokeWidth="1.6" strokeDasharray="3 3"
        style={{
          filter: isDark ? 'drop-shadow(0 0 6px #38BDF8)' : 'none',
          transition: 'all 0.35s ease',
        }}
      />

      {/* Traveling white-hot data packets along the 5 rays */}
      {[
        { toX: 180, toY: 54,  dur: '2.4s', delay: '0s' },
        { toX: 262, toY: 113, dur: '2.8s', delay: '0.5s' },
        { toX: 231, toY: 210, dur: '2.2s', delay: '1.0s' },
        { toX: 129, toY: 210, dur: '3.0s', delay: '1.4s' },
        { toX: 98,  toY: 113, dur: '2.6s', delay: '0.8s' },
      ].map((p, idx) => (
        <g key={`dt-pkt-${idx}`} pointerEvents="none">
          <circle r="4" fill={hubCol} fillOpacity="0.65" style={{ filter: `drop-shadow(0 0 6px ${hubCol})` }}>
            <animateMotion
              path={`M 180 140 L ${p.toX} ${p.toY}`}
              dur={p.dur}
              begin={p.delay}
              repeatCount="indefinite"
            />
          </circle>
          <circle r="2.2" fill="#FFFFFF">
            <animateMotion
              path={`M 180 140 L ${p.toX} ${p.toY}`}
              dur={p.dur}
              begin={p.delay}
              repeatCount="indefinite"
            />
          </circle>
        </g>
      ))}

      {/* Center AI Hub pulse rings */}
      <circle className="dt-anim" cx="180" cy="140" r="18"
        fill="none" stroke={ringStroke} strokeWidth="0.8" strokeOpacity="0"
        style={{ animation: 'dtHubPulse 2.8s ease-out infinite' }}
      />
      <circle className="dt-anim" cx="180" cy="140" r="18"
        fill="none" stroke={ringStroke} strokeWidth="0.6" strokeOpacity="0"
        style={{ animation: 'dtHubPulse2 2.8s ease-out infinite 0.9s' }}
      />

      {/* Center AI Hub static concentric rings */}
      <circle cx="180" cy="140" r="28" fill="none" stroke={ringStroke} strokeWidth="0.7" strokeOpacity={isDark ? '0.35' : '0.22'} />
      <circle cx="180" cy="140" r="20" fill="none" stroke={ringStroke} strokeWidth="0.7" strokeOpacity={isDark ? '0.45' : '0.28'} />
      <circle className="dt-anim" cx="180" cy="140" r="14"
        fill="none" stroke={hubCol} strokeWidth="1.2" strokeOpacity={isDark ? '0.75' : '0.45'}
        strokeDasharray="4 8"
        style={{ animation: 'dtHubSpin 8s linear infinite', transformOrigin: '180px 140px' }}
      />

      {/* Center AI Hub core */}
      <circle cx="180" cy="140" r="28" fill="url(#gDThub)" />
      <circle cx="180" cy="140" r="11" fill={hubCol} fillOpacity={isDark ? '0.85' : '0.60'} />
      <circle cx="180" cy="140" r="6"  fill="#FFFFFF"
        style={{ filter: isDark ? `drop-shadow(0 0 8px ${hubCol})` : 'none' }}
      />
      <text x="180" y="142" textAnchor="middle" fontFamily="'JetBrains Mono', monospace"
        fontSize="5.5" fontWeight="800" fill="#0F172A">
        AI
      </text>

      {/* 5 Phase Nodes with VisualBD concentric rings and clockwise highlight */}
      {phases.map((n, i) => {
        const isActive = i === activeIdx;
        return (
          <g key={n.id} className="dt-anim"
            style={{ animation: `${n.floatAnim} ease-in-out infinite`, transformOrigin: `${n.cx}px ${n.cy}px` }}>

            {/* Ripple wave on active node */}
            {isActive && (
              <circle
                className="dt-anim"
                cx={n.cx} cy={n.cy} r="14"
                fill="none" stroke={hubCol} strokeWidth="0.8"
                style={{
                  animation: 'dtActivePing 2.2s ease-out infinite',
                  transformOrigin: `${n.cx}px ${n.cy}px`,
                }}
              />
            )}

            {/* Node outer disc */}
            <circle cx={n.cx} cy={n.cy} r={isActive ? '16' : '14'}
              fill={isActive ? (isDark ? 'rgba(56,189,248,0.28)' : 'rgba(37,99,235,0.20)') : nodeFill}
              stroke={isActive ? (isDark ? '#FFFFFF' : '#1D4ED8') : nodeStroke}
              strokeWidth={isActive ? '1.8' : '1'}
              style={{
                filter: (isActive && isDark) ? `drop-shadow(0 0 10px ${hubCol})` : 'none',
                transition: 'all 0.35s ease',
              }}
            />

            {/* Node inner disc */}
            <circle cx={n.cx} cy={n.cy} r={isActive ? '8' : '7'}
              fill={isDark ? 'rgba(56,189,248,0.30)' : 'rgba(37,99,235,0.20)'}
              style={{ transition: 'all 0.35s ease' }}
            />

            {/* Core pinpoint */}
            <circle cx={n.cx} cy={n.cy} r={isActive ? '6' : '5'}
              fill={hubCol} fillOpacity={isActive ? '0.7' : '0.4'}
              style={{
                filter: isDark ? `drop-shadow(0 0 8px ${hubCol})` : 'none',
                transition: 'all 0.35s ease',
              }}
            />
            <circle cx={n.cx} cy={n.cy} r={isActive ? '4' : '3'}
              fill={hubCol} fillOpacity="1"
              style={{ transition: 'all 0.35s ease' }}
            />
            <circle cx={n.cx} cy={n.cy} r={isActive ? '2.4' : '1.5'}
              fill="#FFFFFF"
              style={{ transition: 'all 0.35s ease' }}
            />

            {/* Node text labels */}
            <text x={n.lx} y={n.ly} textAnchor={n.align}
              fontFamily="'DM Sans', sans-serif" fontSize="8.5" fontWeight={isActive ? '800' : '700'} letterSpacing="0.8"
              fill={isActive ? (isDark ? '#FFFFFF' : '#0F172A') : textCol}>
              {n.title}
            </text>
            <text x={n.lx} y={n.ly + 10} textAnchor={n.align}
              fontFamily="'DM Sans', sans-serif" fontSize="7.5" fontWeight={isActive ? '700' : '500'}
              fill={isActive ? (isDark ? '#38BDF8' : '#1D4ED8') : hubCol}>
              {n.sub}
            </text>
          </g>
        );
      })}

      {/* Bottom active phase pill badge dynamically updating clockwise */}
      <g>
        <rect x="110" y="254" width="140" height="18" rx="9"
          fill={isDark ? 'rgba(56,189,248,0.20)' : '#2563EB'}
          stroke={isDark ? hubCol : '#1D4ED8'} strokeWidth="1"
          style={{ filter: isDark ? `drop-shadow(0 0 8px rgba(56,189,248,0.45))` : 'drop-shadow(0 2px 6px rgba(37,99,235,0.3))' }}
        />
        <text x="180" y="266.5" textAnchor="middle"
          fontFamily="'JetBrains Mono', monospace" fontSize="8" fontWeight="700" letterSpacing="1.2"
          fill="#FFFFFF">
          PHASE // {curPhase.title}
        </text>
      </g>
    </svg>
  );
};

// ─── Service sections ─────────────────────────────────────────────────────────

const SVC_MONO = "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace";

function toRoman(num) {
  const map = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ];
  let n = Number(num);
  if (!Number.isFinite(n) || n <= 0) return String(num);
  let out = '';
  for (const [value, symbol] of map) {
    while (n >= value) {
      out += symbol;
      n -= value;
    }
  }
  return out;
}

function ServiceTextBlock({ s }) {
  const { isDark } = useTheme();
  const accent = isDark ? '#FFFFFF' : '#2563EB';

  return (
    <>
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <span
          className="svc-roman font-body text-xs tracking-[.28em] uppercase font-semibold"
          style={{ color: accent }}
        >
          {toRoman(s.number)}
        </span>
        <div
          className="svc-line"
          style={{ width: '28px', height: '1px', background: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(37,99,235,0.45)' }}
        />
        <span
          className="svc-subtitle font-body text-xs tracking-[.16em] uppercase"
          style={{ color: isDark ? 'rgba(255,255,255,0.52)' : '#4B5563' }}
        >
          {s.subtitle}
        </span>
      </div>

      <h3
        className="font-title mb-5"
        style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: 'clamp(2.5rem, 4.4vw, 4.25rem)',
          letterSpacing: '.03em',
          lineHeight: 0.96,
          color: isDark ? '#FFFFFF' : '#111827',
        }}
      >
        {s.title}
      </h3>

      <div
        className="svc-title-underline mb-6"
        style={{ width: '44px', height: '2px', background: accent }}
      />

      <p
        className="font-body text-base leading-relaxed mb-5"
        style={{ color: isDark ? 'rgba(255,255,255,0.72)' : '#374151', fontWeight: 300, maxWidth: '460px' }}
      >
        {s.desc}
      </p>

      {/* Evidence Callout from current BA content */}
      <div
        className="p-4 rounded-xl mb-6"
        style={{
          maxWidth: '460px',
          background: isDark ? '#0B2D62' : '#FFFFFF',
          border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
          borderLeft: `3px solid ${accent}`,
        }}
      >
        <span
          className="block font-body text-xs font-bold uppercase tracking-wider mb-1"
          style={{ color: accent }}
        >
          Proven Experience &amp; Evidence
        </span>
        <span
          className="block font-body text-sm leading-relaxed"
          style={{ color: isDark ? 'rgba(255,255,255,0.85)' : '#334155' }}
        >
          {s.evidence}
        </span>
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-2">
        {s.tags.map((t) => (
          <span
            key={t}
            className="svc-tag font-body text-xs tracking-widest uppercase font-medium"
            style={{ color: isDark ? 'rgba(255,255,255,0.62)' : '#374151' }}
          >
            <span className="svc-tag-diamond" style={{ color: accent, marginRight: '5px' }}>✦</span>
            {t}
          </span>
        ))}
      </div>

      {s.motif && (
        <div
          className="mt-6 svc-motif"
          style={{
            fontFamily: SVC_MONO,
            fontSize: '11px',
            color: isDark ? 'rgba(255,255,255,0.78)' : '#1D4ED8',
            fontWeight: isDark ? 400 : 700,
            letterSpacing: '0.08em',
            maxWidth: '460px',
          }}
        >
          {s.motif}
        </div>
      )}
    </>
  );
}

function ServiceSimple({ s, Visual, ratio = '360/280' }) {
  const secRef = useRef(null);
  const textRef = useRef(null);

  useOffscreenPause(secRef);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = getReplayScrollTrigger(secRef.current, { start: 'top 78%' });
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: s.flip ? 50 : -50 },
        { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out', scrollTrigger: st }
      );
      gsap.fromTo(
        textRef.current.querySelectorAll('.svc-tag'),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.07, delay: 0.35, scrollTrigger: st }
      );
    }, secRef);

    return () => ctx.revert();
  }, [s.flip]);

  const TextCol = (
    <div ref={textRef} className="flex flex-col justify-center">
      <ServiceTextBlock s={s} />
    </div>
  );

  const VisualCol = (
    <div className="flex items-center justify-center w-full" style={{ minHeight: '260px' }}>
      <div style={{ width: '100%', maxWidth: '380px', aspectRatio: ratio, position: 'relative' }}>
        {Visual}
      </div>
    </div>
  );

  return (
    <div
      ref={secRef}
      className="svc-section relative py-14 md:py-20"
      style={{ borderTop: 'none' }}
    >
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
        <div className="order-2 md:order-none">
          {s.flip ? VisualCol : TextCol}
        </div>
        <div className="order-1 md:order-none">
          {s.flip ? TextCol : VisualCol}
        </div>
      </div>
    </div>
  );
}

function SectionShell({ secRef, textRef, visRef, s, Visual }) {
  const TextBlock = (
    <div ref={textRef} className="flex flex-col justify-center">
      <ServiceTextBlock s={s} />
    </div>
  );

  const VisualBlock = (
    <div
      ref={visRef}
      className="flex items-center justify-center w-full"
      style={{ minHeight: '260px' }}
    >
      <div style={{ width: '100%', maxWidth: '380px', aspectRatio: '360/280', position: 'relative' }}>
        {Visual}
      </div>
    </div>
  );

  return (
    <div
      ref={secRef}
      className="svc-section relative py-14 md:py-20"
      style={{ borderTop: 'none' }}
    >
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

function ServiceAI(props) {
  return <ServiceSimple {...props} Visual={<VisualAI />} ratio="360/220" />;
}

function ServiceDT(props) {
  return <ServiceSimple {...props} Visual={<VisualDT />} ratio="360/280" />;
}

function ServiceBD({ s }) {
  const secRef = useRef(null);
  const textRef = useRef(null);
  const svgRef = useRef(null);
  const visRef = useRef(null);

  useOffscreenPause(secRef);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = getReplayScrollTrigger(secRef.current, { start: 'top 78%' });
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: s.flip ? 50 : -50 },
        { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out', scrollTrigger: st }
      );
      gsap.fromTo(
        svgRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out', delay: 0.12, scrollTrigger: st }
      );
      gsap.fromTo(
        textRef.current.querySelectorAll('.svc-tag'),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.07, delay: 0.35, scrollTrigger: st }
      );
    }, secRef);

    return () => ctx.revert();
  }, [s.flip]);

  useEffect(() => {
    if (!secRef.current || !visRef.current) return undefined;
    const svg = visRef.current;

    let pulseTweens = [];
    const killPulse = () => {
      pulseTweens.forEach((tween) => tween.kill());
      pulseTweens = [];
    };

    const startPulse = () => {
      killPulse();
      svg.querySelectorAll('.bd-dot').forEach((dot, dotIndex) => {
        pulseTweens.push(
          gsap.to(dot, {
            attr: { r: 6.5 },
            repeat: -1,
            yoyo: true,
            duration: 1.8,
            ease: 'sine.inOut',
            delay: dotIndex * 0.28,
            overwrite: true,
          })
        );
      });
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: getReplayScrollTrigger(secRef.current, {
          start: 'top 78%',
          onLeave: killPulse,
          onLeaveBack: killPulse,
        }),
      });

      tl.fromTo(
        svg.querySelectorAll('.bd-line'),
        { attr: { strokeDashoffset: 80 } },
        { attr: { strokeDashoffset: 0 }, duration: 1.0, stagger: 0.15, ease: 'power2.out' },
        0.3
      )
        .to(
          svg.querySelectorAll('.bd-dot'),
          { attr: { r: 4.5, opacity: 1 }, duration: 0.4, stagger: 0.12, ease: 'back.out(2)' },
          1.0
        )
        .to(
          svg.querySelectorAll('.bd-dot-ring'),
          { attr: { r: 12, opacity: 0.35 }, duration: 0.5, stagger: 0.12, ease: 'power2.out' },
          1.2
        )
        .add(startPulse, 2.0);
    }, svg);

    return () => {
      killPulse();
      ctx.revert();
    };
  }, [s.flip]);

  return (
    <SectionShell
      secRef={secRef}
      textRef={textRef}
      visRef={svgRef}
      s={s}
      Visual={<VisualBD visRef={visRef} />}
    />
  );
}

function ServicePM({ s }) {
  const { isDark } = useTheme();
  const secRef = useRef(null);
  const textRef = useRef(null);
  const svgRef = useRef(null);
  const visRef = useRef(null);

  useOffscreenPause(secRef);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = getReplayScrollTrigger(secRef.current, { start: 'top 78%' });
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: s.flip ? 50 : -50 },
        { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out', scrollTrigger: st }
      );
      gsap.fromTo(
        visRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out', delay: 0.12, scrollTrigger: st }
      );
      gsap.fromTo(
        textRef.current.querySelectorAll('.svc-tag'),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.07, delay: 0.35, scrollTrigger: st }
      );
    }, secRef);

    return () => ctx.revert();
  }, [s.flip]);

  useEffect(() => {
    if (!secRef.current || !svgRef.current) return undefined;
    const svg = svgRef.current;

    gsap.set(svg.querySelectorAll('.pm-row'), { x: -20 });

    let pulseTweens = [];
    const killPulse = () => {
      pulseTweens.forEach((tween) => tween.kill());
      pulseTweens = [];
    };

    const startPulse = () => {
      killPulse();
      const activeRect = svg.querySelectorAll('.pm-row')[2]?.querySelector('rect');
      if (activeRect) {
        pulseTweens.push(
          gsap.to(activeRect, {
            attr: { fill: isDark ? '#38BDF8' : '#1D4ED8' },
            repeat: -1,
            yoyo: true,
            duration: 2.6,
            ease: 'sine.inOut',
            delay: 2.2,
            overwrite: true,
          })
        );
      }
      pulseTweens.push(
        gsap.to(svg.querySelector('.pm-review-glow'), {
          attr: { rx: 100, ry: 22 },
          repeat: -1,
          yoyo: true,
          duration: 2.4,
          ease: 'sine.inOut',
          delay: 2.0,
          overwrite: true,
        })
      );
      pulseTweens.push(
        gsap.to(svg.querySelector('.pm-launch-glow'), {
          attr: { rx: 85, ry: 20 },
          repeat: -1,
          yoyo: true,
          duration: 2.8,
          ease: 'sine.inOut',
          delay: 2.4,
          overwrite: true,
        })
      );
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: getReplayScrollTrigger(secRef.current, {
          start: 'top 78%',
          onEnter: startPulse,
          onEnterBack: startPulse,
          onLeave: killPulse,
          onLeaveBack: killPulse,
        }),
      });

      tl.to(svg.querySelectorAll('.pm-row'), { opacity: 1, x: 0, duration: 1.0, stagger: 0.22, ease: 'power2.out' })
        .to(svg.querySelector('.pm-now'), { attr: { strokeOpacity: 0.50 }, duration: 1.0 }, 1.2)
        .to(svg.querySelector('.pm-now-label'), { opacity: 0.75, duration: 0.8 }, 1.4)
        .to(svg.querySelector('.pm-review-glow'), { opacity: 1, duration: 1.0 }, 1.6)
        .to(svg.querySelector('.pm-launch-glow'), { opacity: 1, duration: 1.0 }, 1.8);
    }, svg);

    return () => {
      killPulse();
      ctx.revert();
    };
  }, [s.flip, isDark]);

  return (
    <SectionShell
      secRef={secRef}
      textRef={textRef}
      visRef={visRef}
      s={s}
      Visual={<VisualPM visRef={svgRef} />}
    />
  );
}

// ─── Data (Approved BA Content with Previous Animated Visuals) ───────────────

const capabilities = [
  {
    number: '01',
    title: 'Discovery & Use-Case Prioritisation',
    subtitle: 'Where AI creates measurable value',
    desc: 'Stakeholder interviews and discovery workshops to evaluate where AI creates measurable business value and where it does not. Assessing technical feasibility, model readiness, ROI trade-offs, and strategic roadmap alignment.',
    evidence: '15 client engagements scoped across six industries — including evaluating and explicitly declining unviable use cases.',
    tags: ['Stakeholder Interviews', 'Feasibility Assessment', 'Value vs. Cost Prioritisation', 'AI Roadmapping'],
    motif: 'interview · define · assess feasibility · prioritise · roadmap',
    Component: ServiceDT,
    flip: false,
  },
  {
    number: '02',
    title: 'Requirements & Acceptance Criteria for AI Features',
    subtitle: 'Translating ambiguity into testable specs',
    desc: 'Detailed user stories and functional specifications for probabilistic systems: defining acceptance criteria with concrete input and output examples, failure-case handling, human-in-the-loop escalation paths, and schema data models.',
    evidence: 'AEO/GEO answer-engine visibility platform requirements, 43-question privacy-software compliance assessment, and Tech Trekkers Suite product definitions.',
    tags: ['User Stories & Acceptance Criteria', 'Failure Cases & Fallbacks', 'Human-in-the-Loop Design', 'Data Modelling'],
    motif: 'IN examples · SPEC criteria · guardrails & evals · REVIEW · verified OUT',
    Component: ServiceAI,
    flip: true,
  },
  {
    number: '03',
    title: 'Delivery Coordination & Acceptance',
    subtitle: 'From SOW and sprints to release sign-off',
    desc: 'Proposals, pricing models, and statements of work (SOW); sprint prioritization and release budgets; cross-functional vendor and engineer coordination; rigorous acceptance review and release sign-off using Jira and ClickUp.',
    evidence: 'Two years running client engagements with engineering teams of up to five; Solvoka agency brand and website build.',
    tags: ['SOW & Scope Control', 'Agile Delivery (Jira / ClickUp)', 'Vendor & Engineer Coordination', 'Release Acceptance Sign-off'],
    motif: 'scope · priorities · delivery coordination · acceptance review · release',
    Component: ServicePM,
    flip: false,
  },
  {
    number: '04',
    title: 'Adoption & Enablement',
    subtitle: 'Turning delivered systems into daily habits',
    desc: 'Ensuring operational adoption beyond software release: authoring standard operating procedures (SOPs), conducting interactive user training, facilitating workshops, and managing organizational change.',
    evidence: 'Appu International systems rollout and export documentation checklist, "Unlock AI" hands-on workshop for business owners, and TiECon demonstrations.',
    tags: ['SOP Authoring & Documentation', 'Interactive Training & Workshops', 'Change Management', 'Operational Handover'],
    motif: 'SOPS · TRAINING · WORKSHOPS · HANDOVER · ADOPTION',
    Component: ServiceBD,
    flip: true,
  },
];

const toolChips = [
  'Jira',
  'ClickUp',
  'n8n (design & review)',
  'PostgreSQL & MongoDB data modelling',
  'Anthropic, OpenAI, Gemini, Azure OpenAI (model selection)',
  'Google Flow',
  'Microsoft Excel',
];

// ─── Main export ──────────────────────────────────────────────────────────────

export default function Capabilities() {
  const { isDark } = useTheme();
  const accent = isDark ? '#FFFFFF' : '#2563EB';

  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const toolsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headRef.current) {
        gsap.fromTo(
          headRef.current.querySelectorAll('.reveal'),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: getReplayScrollTrigger(headRef.current, { start: 'top 86%' }),
          }
        );
      }

      if (toolsRef.current) {
        gsap.fromTo(
          toolsRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: getReplayScrollTrigger(toolsRef.current, { start: 'top 90%' }),
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="relative py-20 md:py-28 px-6 md:px-14"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div ref={headRef} className="max-w-7xl mx-auto pb-8">
        <p className="reveal section-label">02 / Capabilities — What I Do</p>
        <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2 className="section-title" style={{ color: isDark ? '#FFFFFF' : '#111827' }}>
            What I Do
          </h2>
          <p
            className="font-body text-sm font-medium"
            style={{ color: isDark ? 'rgba(255,255,255,0.65)' : '#4B5563', maxWidth: '420px', lineHeight: 1.7 }}
          >
            Four core disciplines bridging business stakeholders and technical teams to deliver AI implementations that get adopted.
          </p>
        </div>
        <div
          className="reveal mt-8"
          style={{
            height: '1px',
            background: isDark
              ? 'linear-gradient(to right,#FFFFFF,rgba(255,255,255,0.08))'
              : 'linear-gradient(to right,#2563EB,rgba(37,99,235,0.06))',
          }}
        />
      </div>

      {capabilities.map((s) => {
        const Comp = s.Component;
        return <Comp key={s.number} s={s} />;
      })}

      {/* Approved Analysis & Delivery Toolkit Strip */}
      <div className="max-w-7xl mx-auto mt-6">
        <div
          ref={toolsRef}
          className="rounded-2xl p-6 md:p-8"
          style={{
            background: isDark ? '#0B2D62' : '#FFFFFF',
            border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
            borderTop: `2px solid ${accent}`,
            boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.18)' : '0 8px 30px rgba(0,0,0,0.04)',
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <span
                className="font-body text-xs uppercase tracking-widest font-semibold block"
                style={{ color: accent }}
              >
                Analysis &amp; Delivery Toolkit
              </span>
              <h4
                className="font-title text-2xl mt-1"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  letterSpacing: '.04em',
                  color: isDark ? '#FFFFFF' : '#111827',
                }}
              >
                Platforms &amp; Systems Used in Production Delivery
              </h4>
            </div>
            <p
              className="font-body text-sm"
              style={{ color: isDark ? 'rgba(255,255,255,0.62)' : '#64748B' }}
            >
              Applied across requirements, data modelling, workflow design &amp; evaluation
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-2">
            {toolChips.map((chip) => (
              <span
                key={chip}
                className="font-body text-xs md:text-sm font-medium px-3.5 py-1.5 rounded-lg transition-all"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(37,99,235,0.06)',
                  color: isDark ? '#FFFFFF' : '#1E293B',
                  border: isDark ? '1px solid rgba(255,255,255,0.32)' : '1px solid rgba(37,99,235,0.25)',
                }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Pause the decorative infinite CSS keyframe loops inside each visual
          (VisualAI/VisualBD) once their section scrolls out of view —
          see useOffscreenPause(). Purely a perf optimization, the
          animations resume exactly where the browser paused them. */}
      <style>{`
        .svc-section[data-offscreen="true"] .ai-anim,
        .svc-section[data-offscreen="true"] .bd-anim,
        .svc-section[data-offscreen="true"] .dt-anim,
        .svc-section[data-offscreen="true"] .pm-anim {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
