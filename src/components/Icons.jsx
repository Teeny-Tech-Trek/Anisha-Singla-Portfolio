/* ─────────────────────────────────────────────
   Inline SVG brand icons — no external deps
───────────────────────────────────────────── */

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

export function CppIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 306 344" xmlns="http://www.w3.org/2000/svg">
      <path fill="#00599C" d="M302.107 258.262c2.401-4.159 3.893-8.845 3.893-13.053V99.135c0-4.208-1.49-8.893-3.893-13.052L153 172.175z"/>
      <path fill="#004482" d="M166.25 341.193l126.5-73.034c3.644-2.104 6.956-5.737 9.357-9.897L153 172.175 3.893 258.262c2.401 4.16 5.713 7.793 9.357 9.897l126.5 73.034c7.287 4.208 19.213 4.208 26.5 0z"/>
      <path fill="#659AD2" d="M302.107 86.083c-2.401-4.16-5.713-7.793-9.357-9.897L166.25 3.152c-7.287-4.208-19.213-4.208-26.5 0L13.25 76.186C5.962 80.394 0 90.69 0 99.135v146.074c0 4.208 1.49 8.893 3.893 13.052L153 172.175z"/>
      <path fill="#fff" d="M153 274.175c-56.243 0-102-45.757-102-102s45.757-102 102-102c36.292 0 70.139 19.53 88.331 50.968l-44.143 25.544c-9.105-15.736-26.038-25.512-44.188-25.512-28.122 0-51 22.878-51 51s22.878 51 51 51c18.152 0 35.085-9.776 44.191-25.515l44.143 25.543C223.131 254.614 189.29 274.175 153 274.175z"/>
      <path fill="#fff" d="M255 166.175h-10v-10h-10v10h-10v10h10v10h10v-10h10zM289 166.175h-10v-10h-10v10h-10v10h10v10h10v-10h10z"/>
    </svg>
  );
}

export function PhpIcon({ size = 32 }) {
  return (
    <svg width={size} height={size * 0.53} viewBox="0 0 256 135" xmlns="http://www.w3.org/2000/svg">
      <ellipse fill="#8892BF" cx="128" cy="67.3" rx="128" ry="67.3"/>
      <path fill="#fff" d="M35.945 87.005l12.571-63.5H82.38c14.97 0 22.015 7.19 20.88 18.85-.684 7.02-4.204 13.443-9.927 17.84-5.66 4.356-12.666 6.124-20.84 6.124H58.26L55.16 87.005H35.945zm25.558-34.289h10.502c5.77 0 10.007-3.218 10.626-9.35.38-3.876-1.727-6.107-6.487-6.107H65.68l-4.177 15.457z M104.18 87.005l12.572-63.5h19.213l-3.178 16.049h14.335c13.89 0 19.963 6.437 18.146 16.738l-5.434 30.713h-19.43l4.97-27.951c.702-3.96-.44-5.787-4.224-5.787h-12.3l-6.458 33.738H104.18z M172.79 87.005l12.57-63.5h33.865c14.97 0 22.016 7.19 20.88 18.85-.683 7.02-4.203 13.443-9.926 17.84-5.66 4.356-12.665 6.124-20.84 6.124h-14.232L192.006 87.005H172.79zm25.557-34.289h10.502c5.77 0 10.008-3.218 10.627-9.35.38-3.876-1.727-6.107-6.488-6.107h-10.464l-4.177 15.457z"/>
    </svg>
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
  return (
    <span
      role="img"
      aria-label={label}
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size,
        lineHeight: 1,
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
  const map = {
    'python':                   <PythonIcon size={s} />,
    'design-thinking':          <DesignIcon size={s} />,
    'advanced-cpp':             <CppIcon size={s} />,
    'cdac-php':                 <PhpIcon size={s} />,
    'letter-appreciation':      <EmojiIcon symbol="✉️" label="Letter of Appreciation" size={s} />,
    'certificate-appreciation': <EmojiIcon symbol="🏅" label="Certificate of Appreciation" size={s} />,
    'certificate-coordination': <ScrollIcon size={s} color="#06b6d4" />,
    'certificate-excellence':   <EmojiIcon symbol="⭐" label="Certificate of Excellence" size={s} />,
    'certificate-participation':<EmojiIcon symbol="🎯" label="Certificate of Participation" size={s} />,
    'deans-list':               <EmojiIcon symbol="🎓" label="Dean's List" size={s} />,
    'sports':                   <EmojiIcon symbol="🏆" label="Sports Achievement" size={s} />,
  };
  return map[id] || <ScrollIcon size={s} />;
}

export const FOLDER_COLORS = {
  'python':                   '#3b82f6',
  'design-thinking':          '#FF6B6B',
  'advanced-cpp':             '#00599C',
  'cdac-php':                 '#8892BF',
  'letter-appreciation':      '#10b981',
  'certificate-appreciation': '#f43f5e',
  'certificate-coordination': '#06b6d4',
  'certificate-excellence':   '#f59e0b',
  'certificate-participation':'#84cc16',
  'deans-list':               '#C9A84C',
  'sports':                   '#ef4444',
};
