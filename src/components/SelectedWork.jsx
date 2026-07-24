import { selectedWork } from '../data/selectedWorkData';
import { navigateTo, ROUTES } from '../routes';

const LABEL_STYLE = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '10px',
  fontWeight: 700,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: '#C9A84C',
  marginBottom: '4px',
};

const TEXT_STYLE = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '16px',
  lineHeight: 1.6,
  color: 'rgba(255,255,255,0.55)',
  fontWeight: 300,
};

function WorkCard({ w }) {
  return (
    <div
      className="h-full flex flex-col p-7"
      style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.07)', borderTop: '2px solid rgba(201,168,76,0.6)' }}
    >
      <h3
        className="text-white mb-4"
        style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.6rem', letterSpacing: '.03em', lineHeight: 1.05 }}
      >
        {w.title}
      </h3>

      <div className="mb-4">
        <p style={LABEL_STYLE}>Problem</p>
        <p style={TEXT_STYLE}>{w.problem}</p>
      </div>

      <div className="mb-4">
        <p style={LABEL_STYLE}>Approach</p>
        <p style={TEXT_STYLE}>{w.approach}</p>
      </div>

      <div className="mb-5 flex-1">
        <p style={LABEL_STYLE}>Outcome</p>
        <p className="font-body" style={{ ...TEXT_STYLE, color: '#E8C97A', fontWeight: 500 }}>{w.outcome}</p>
      </div>

      <button
        type="button"
        onClick={() => navigateTo(`${ROUTES.CASE_STUDIES}/${w.slug}`)}
        className="font-body text-xs tracking-widest uppercase self-start flex items-center"
        style={{ color: '#C9A84C', background: 'transparent', border: 'none', cursor: 'pointer', minHeight: '44px', borderTop: '1px solid rgba(255,255,255,0.06)', width: '100%', textAlign: 'left' }}
      >
        Read full case study →
      </button>
    </div>
  );
}

export default function SelectedWork() {
  return (
    <section id="selected-work" className="py-20 md:py-28 px-6 md:px-14" style={{ background: '#000' }}>
      <div className="max-w-7xl mx-auto">
        <p className="section-label">Selected Client Work</p>
        <h2 className="section-title text-white mb-6">Proof, Not Pitches</h2>
        <p
          className="font-body text-base leading-relaxed mb-14"
          style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 300, maxWidth: '640px' }}
        >
          Three engagements, each broken down by problem, approach, and a measured outcome.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {selectedWork.map(w => (
            <WorkCard key={w.slug} w={w} />
          ))}
        </div>
      </div>
    </section>
  );
}
