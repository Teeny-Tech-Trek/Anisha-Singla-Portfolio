import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { writingItems } from '../data/writingData';

// Same base styling as the project-card action buttons (ProjectLinks.jsx) so
// this small link button reads as the same UI element across the site.
const LINK_BUTTON_BASE =
  'inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 min-h-[44px] font-body text-xs ' +
  'tracking-wide transition-colors duration-200 cursor-pointer ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-black whitespace-nowrap ' +
  'border-[#C9A84C]/50 bg-transparent text-[#C9A84C] hover:bg-[#C9A84C] hover:text-black hover:border-[#C9A84C]';

function WritingRow({ item }) {
  const hasLink = !!item.url || !!item.urls?.length;

  const content = (
    <>
      <p
        className="font-body"
        style={{ fontSize: '16px', fontWeight: 600, color: hasLink ? '#fff' : 'rgba(255,255,255,0.55)' }}
      >
        {item.label}
      </p>
      <p
        className="font-body"
        style={{ fontSize: '16px', lineHeight: 1.5, color: 'rgba(255,255,255,0.5)', fontWeight: 300, marginTop: '2px' }}
      >
        {item.description}
      </p>
    </>
  );

  if (item.urls?.length) {
    return (
      <div className="flex flex-col justify-center py-4 h-full" style={{ minHeight: '44px' }}>
        {content}
        <div className="mt-3 flex flex-row flex-wrap items-center gap-1.5">
          {item.urls.map((url, i) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${item.label} — post ${i + 1} (opens in new tab)`}
              className={LINK_BUTTON_BASE}
            >
              <FaArrowUpRightFromSquare size={11} aria-hidden="true" />
              Post {i + 1}
            </a>
          ))}
        </div>
      </div>
    );
  }

  if (!item.url) {
    return (
      <div className="flex flex-col justify-center py-4 h-full" style={{ minHeight: '44px' }}>
        {content}
        <span
          className="font-body"
          style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginTop: '6px' }}
        >
          Link coming soon
        </span>
      </div>
    );
  }

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${item.label} — opens in new tab`}
      className="flex flex-col justify-center py-4 h-full transition-colors duration-200 hover:text-gold"
      style={{ minHeight: '44px' }}
    >
      {content}
    </a>
  );
}

export default function WritingSpeaking() {
  return (
    <section id="writing" className="py-20 md:py-28 px-6 md:px-14" style={{ background: '#000' }}>
      <div className="max-w-4xl mx-auto">
        <p className="section-label">Writing &amp; Speaking</p>
        <h2 className="section-title text-white mb-10">Beyond the Build</h2>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-10"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          {writingItems.map(item => (
            <div key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <WritingRow item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
