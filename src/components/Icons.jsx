/* ─────────────────────────────────────────────
   Inline SVG brand icons — no external deps
───────────────────────────────────────────── */

/* eslint-disable react-refresh/only-export-components */
const ICON_GLOW_COLOR = '#FFE06B';

function getSizeValue(size, multiplier = 1) {
  if (typeof size === 'number') {
    return size * multiplier;
  }

  if (typeof size === 'string') {
    return multiplier === 1 ? size : `calc(${size} * ${multiplier})`;
  }

  return 32 * multiplier;
}

function IconGlow({ size = 32, children }) {
  const dimension = getSizeValue(size);
  const haloSize = getSizeValue(size, 1.65);

  return (
    <span
      style={{
        position: 'relative',
        width: dimension,
        height: dimension,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: haloSize,
          height: haloSize,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,224,107,0.62) 0%, rgba(255,212,79,0.34) 34%, rgba(201,168,76,0.18) 58%, rgba(201,168,76,0) 76%)',
          filter: 'blur(10px)',
          opacity: 0.95,
          pointerEvents: 'none',
          mixBlendMode: 'screen',
        }}
      />
      <span
        style={{
          position: 'relative',
          width: dimension,
          height: dimension,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: 'drop-shadow(0 0 7px rgba(255,224,107,0.5)) drop-shadow(0 0 16px rgba(255,214,92,0.3))',
        }}
      >
        {children}
      </span>
    </span>
  );
}

export function PythonIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 255" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="py1" x1="12.959%" y1="12.039%" x2="79.639%" y2="78.201%">
          <stop offset="0%" stopColor="#387EB8"/>
          <stop offset="100%" stopColor="#366994"/>
        </linearGradient>
        <linearGradient id="py2" x1="19.128%" y1="20.579%" x2="90.742%" y2="88.429%">
          <stop offset="0%" stopColor="#FFE052"/>
          <stop offset="100%" stopColor="#FFC331"/>
        </linearGradient>
      </defs>
      <path fill="url(#py1)" d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zm-34.916 19.913a11.525 11.525 0 0 1 11.532 11.531 11.525 11.525 0 0 1-11.532 11.532 11.525 11.525 0 0 1-11.531-11.532 11.525 11.525 0 0 1 11.531-11.531z"/>
      <path fill="url(#py2)" d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.128H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.898 62.519 33.898zm34.917-19.913a11.525 11.525 0 0 1-11.532-11.531 11.525 11.525 0 0 1 11.532-11.532 11.525 11.525 0 0 1 11.531 11.532 11.525 11.525 0 0 1-11.531 11.531z"/>
    </svg>
  );
}

// Image-based badge for the AI Security & Governance certificate (served from public/).
export function AiSecurityIcon({ size = 32 }) {
  const dimension = getSizeValue(size);
  return (
    <img
      src="/cert-icons/ai-governance-course-badge.webp"
      alt=""
      aria-hidden="true"
      style={{
        width: dimension,
        height: dimension,
        objectFit: 'contain',
        display: 'block',
        filter: 'drop-shadow(0 0 8px rgba(34,195,230,0.35))',
      }}
    />
  );
}

export function DesignIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="15" fill="none" stroke="#FF6B6B" strokeWidth="1.5"/>
      <path d="M16 4 L28 22 H4 Z" fill="none" stroke="#FF6B6B" strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx="16" cy="14" r="3" fill="#FF6B6B"/>
      <path d="M10 22 Q16 16 22 22" fill="none" stroke="#FF6B6B" strokeWidth="1.5"/>
    </svg>
  );
}

export function EmojiIcon({ symbol, label, size = 32 }) {
  const dimension = getSizeValue(size);

  return (
    <span
      role="img"
      aria-label={label}
      style={{
        width: dimension,
        height: dimension,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: dimension,
        lineHeight: 1,
        textShadow: `0 0 10px ${ICON_GLOW_COLOR}66`,
      }}
    >
      {symbol}
    </span>
  );
}

/* Generic award/cert icons */
export function TrophyIcon({ size = 32, color = '#C9A84C' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 9H3l1 3h2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18 9h3l-1 3h-2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 3h12v9a6 6 0 0 1-12 0V3z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 17v2M15 17v2M6 21h12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function MedalIcon({ size = 32, color = '#C9A84C' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="15" r="6" stroke={color} strokeWidth="1.5"/>
      <path d="M9 2l3 5 3-5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 12v3l2 1" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}

export function StarIcon({ size = 32, color = '#C9A84C' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill={color + '33'}/>
    </svg>
  );
}

export function ScrollIcon({ size = 32, color = '#C9A84C' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="14 2 14 8 20 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="8" y1="13" x2="16" y2="13" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="8" y1="17" x2="12" y2="17" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}

export function GraduateIcon({ size = 32, color = '#C9A84C' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3L2 8l10 5 10-5-10-5z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill={color + '22'}/>
      <path d="M6 10.6V16c0 1.657 2.686 3 6 3s6-1.343 6-3v-5.4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M22 8v5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function SportsIcon({ size = 32, color = '#C9A84C' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5"/>
      <path d="M12 2a10 10 0 0 1 6.32 16.5" stroke={color} strokeWidth="1.3"/>
      <path d="M5.68 5.5A10 10 0 0 1 12 2" stroke={color} strokeWidth="1.3"/>
      <path d="M2 12h4M18 12h4M12 2v4M12 18v4" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

/* Map folder id → icon component.
   Pass size='100%' from IconTile to make icon fill its wrapper div. */
export function getIcon(id, size = 32) {
  const s = size;
  // Image badge — rendered without the gold IconGlow so its own colors stay clean.
  if (id === 'ai-security-governance') {
    return <AiSecurityIcon size={s} />;
  }
  const map = {
    'python':                   <PythonIcon size={s} />,
    'design-thinking':          <DesignIcon size={s} />,
    'letter-appreciation':      <EmojiIcon symbol="✉️" label="Letter of Appreciation" size={s} />,
    'certificate-appreciation': <EmojiIcon symbol="🏅" label="Certificate of Appreciation" size={s} />,
    'certificate-coordination': <ScrollIcon size={s} color="#06b6d4" />,
    'certificate-excellence':   <EmojiIcon symbol="⭐" label="Certificate of Excellence" size={s} />,
    'certificate-participation':<EmojiIcon symbol="🎯" label="Certificate of Participation" size={s} />,
    'deans-list':               <EmojiIcon symbol="🎓" label="Dean's List" size={s} />,
    'sports':                   <EmojiIcon symbol="🏆" label="Sports Achievement" size={s} />,
  };
  const icon = map[id] || <ScrollIcon size={s} />;

  return <IconGlow size={s}>{icon}</IconGlow>;
}

export const FOLDER_COLORS = {
  'ai-security-governance':   '#22c3e6',
  'python':                   '#3b82f6',
  'design-thinking':          '#FF6B6B',
  'letter-appreciation':      '#10b981',
  'certificate-appreciation': '#f43f5e',
  'certificate-coordination': '#06b6d4',
  'certificate-excellence':   '#f59e0b',
  'certificate-participation':'#84cc16',
  'deans-list':               '#C9A84C',
  'sports':                   '#ef4444',
};
