import KeywordChips from './KeywordChips';

const MONO = "'JetBrains Mono','SF Mono',monospace";

const commonThreads = [
  'Leadership', 'Public Speaking', 'Community Building', 'Event Management',
  'Mentorship', 'Networking', 'Team Coordination', 'Startup Ecosystem',
  'Volunteering', 'Outreach', 'Workshops', 'Collaboration',
];

const groups = [
  {
    category: 'LEADERSHIP',
    items: [
      { role:'President, AI Club', org:'George Brown College', date:'Oct 2023 – Apr 2024', location:'Toronto, Canada' },
      { role:'VP, AI Club',        org:'George Brown College', date:'Nov 2022 – Oct 2023', location:'Toronto, Canada' },
      { role:'Event Manager',      org:'CGC Jhanjeri',         date:'Aug 2018 – Apr 2020', location:'Mohali, India' },
    ],
  },
  {
    category: 'COMMUNITY',
    items: [
      { role:'Community Coordinator', org:'Connect Circles: Chandigarh', date:'Mar 2026 – Present', location:'Mohali, India' },
      { role:'Charter Member',        org:'TiE Chandigarh',              date:'May 2026 – Present', location:'Mohali, India' },
      { role:'Associate Member',      org:'TiE Chandigarh',              date:'Dec 2025 – Apr 2026', location:'Mohali, India' },
    ],
  },
];

function Item({ item }) {
  return (
    <div className="vol-item" style={{ borderLeft: '2px solid #2a2a2a', paddingLeft: 14, marginBottom: 16, transition: 'border-color 150ms ease' }}>
      <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", color: '#fff', fontSize: 20, letterSpacing: '.5px', lineHeight: 1.05 }}>
        {item.role}
      </h3>
      <p style={{ color: '#C9A84C', fontSize: 12, marginTop: 3 }}>{item.org}</p>
      <p style={{ fontFamily: MONO, color: '#7c7c7c', fontSize: 11, marginTop: 6 }}>
        {item.date} · {item.location}
      </p>
    </div>
  );
}

export default function Volunteer() {
  return (
    <section id="volunteer" className="py-2 px-6 md:px-14" style={{ background: '#000' }}>
      <div className="max-w-5xl mx-auto">
        <p className="section-label">07 / Beyond Work</p>
        <h2 className="section-title text-white mb-16">Volunteer &amp; Community</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 30 }}>
          {groups.map((g) => (
            <div key={g.category}>
              <span
                style={{
                  display: 'inline-block',
                  background: '#C9A84C',
                  color: '#151206',
                  fontFamily: MONO,
                  fontSize: 11,
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
              color: '#C9A84C',
              marginBottom: 16,
            }}
          >
            Common Threads
          </p>
          <KeywordChips items={commonThreads} />
        </div>
      </div>

      <style>{`.vol-item:hover { border-left-color: #C9A84C; }`}</style>
    </section>
  );
}
