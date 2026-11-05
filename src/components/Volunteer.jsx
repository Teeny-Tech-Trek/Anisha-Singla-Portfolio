import KeywordChips from './KeywordChips';
import { useTheme } from '../context/ThemeContext';

const MONO = "'JetBrains Mono','SF Mono',monospace";

const commonThreads = [
  'Leadership', 'Public Speaking', 'Community Building', 'Event Management',
  'Mentorship', 'Team Coordination', 'Volunteering', 'Workshops', 'Collaboration',
];

const groups = [
  {
    category: 'LEADERSHIP',
    items: [
      { role:'President, AI Club', org:'George Brown Polytechnic', date:'Oct 2023 – Apr 2024', location:'Toronto, Canada' },
      { role:'VP, AI Club',        org:'George Brown Polytechnic', date:'Nov 2022 – Oct 2023', location:'Toronto, Canada' },
      { role:'Event Manager',      org:'CGC Jhanjeri',             date:'Aug 2018 – Apr 2020', location:'Mohali, India' },
    ],
  },
  {
    category: 'COMMUNITY',
    items: [
      { role:'Community Coordinator', org:'Connect Circles: Chandigarh', date:'Mar 2026 – June 2026', location:'Remote' },
      { role:'Charter Member',        org:'TiE Chandigarh',              date:'May 2026 – Present', location:'Remote' },
      { role:'Associate Member',      org:'TiE Chandigarh',              date:'Dec 2025 – Apr 2026', location:'Remote' },
    ],
  },
];

function Item({ item }) {
  const { isDark } = useTheme();

  return (
    <div
      className="vol-item"
      style={{
        borderLeft: isDark ? '2px solid #2a2a2a' : '2px solid rgba(0,0,0,0.14)',
        paddingLeft: 14,
        marginBottom: 16,
        transition: 'border-color 150ms ease',
      }}
    >
      <h3
        style={{
          fontFamily: "'Bebas Neue',sans-serif",
          color: isDark ? '#fff' : '#111827',
          fontSize: 20,
          letterSpacing: '.5px',
          lineHeight: 1.05,
        }}
      >
        {item.role}
      </h3>
      <p style={{ color: isDark ? '#C9A84C' : '#1D4ED8', fontSize: 12, marginTop: 3, fontWeight: isDark ? 400 : 600 }}>
        {item.org}
      </p>
      <p style={{ fontFamily: MONO, color: isDark ? '#7c7c7c' : '#6B7280', fontSize: 11, marginTop: 6 }}>
        {item.date} · {item.location}
      </p>
    </div>
  );
}

export default function Volunteer() {
  const { isDark } = useTheme();
  const accent = isDark ? '#C9A84C' : '#2563EB';

  return (
    <section id="volunteer" className="py-2 px-6 md:px-14" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-5xl mx-auto">
        <p className="section-label">07 / Beyond Work</p>
        <h2 className="section-title mb-16" style={{ color: isDark ? '#FFFFFF' : '#111827' }}>
          Volunteer &amp; Community
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 30 }}>
          {groups.map((g) => (
            <div key={g.category}>
              <span
                style={{
                  display: 'inline-block',
                  background: accent,
                  color: isDark ? '#151206' : '#FFFFFF',
                  fontFamily: MONO,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '2px',
                  padding: '5px 12px',
                  borderRadius: 4,
                  marginBottom: 18,
                }}
              >
                {g.category}
              </span>
              {g.items.map((item) => (
                <Item key={item.role + item.org} item={item} />
              ))}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48 }}>
          <p
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: accent,
              fontWeight: 700,
              marginBottom: 16,
            }}
          >
            Common Threads
          </p>
          <KeywordChips items={commonThreads} />
        </div>
      </div>

      <style>{`.vol-item:hover { border-left-color: ${accent} !important; }`}</style>
    </section>
  );
}
