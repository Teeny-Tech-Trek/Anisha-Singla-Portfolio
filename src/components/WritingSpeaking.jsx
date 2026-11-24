import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { writingItems } from '../data/writingData';
import { useTheme } from '../context/ThemeContext';

function WritingRow({ item }) {
  const { isDark } = useTheme();
  const accent = isDark ? '#FFFFFF' : '#2563EB';
  const hasLink = !!item.url || !!item.urls?.length;

  const linkButtonBase =
    'inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 min-h-[44px] font-body text-xs ' +
    'tracking-wide transition-colors duration-200 cursor-pointer ' +
    'focus-visible:outline-none focus-visible:ring-2 whitespace-nowrap ' +
    (isDark
      ? 'border-white/50 bg-transparent text-white hover:bg-white hover:text-[#072450] hover:border-white focus-visible:ring-white focus-visible:ring-offset-[#072450]'
      : 'border-[#2563EB]/40 bg-[#2563EB]/5 text-[#1D4ED8] hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] focus-visible:ring-[#2563EB] focus-visible:ring-offset-white');

  const content = (
    <>
      <p
        className="font-body"
        style={{
          fontSize: '16px',
          fontWeight: 600,
          color: hasLink
            ? (isDark ? '#FFFFFF' : '#111827')
            : (isDark ? 'rgba(255,255,255,0.55)' : '#6B7280'),
        }}
      >
        {item.label}
      </p>
      <p
        className="font-body"
        style={{
          fontSize: '15px',
          lineHeight: 1.5,
          color: isDark ? 'rgba(255,255,255,0.6)' : '#4B5563',
          fontWeight: 300,
          marginTop: '3px',
        }}
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
          {item.urls.map((entry, i) => {
            const url = typeof entry === 'string' ? entry : entry.url;
            const label = typeof entry === 'string' ? `Post ${i + 1}` : entry.title;
            return (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.label} — ${label} (opens in new tab)`}
                className={linkButtonBase}
              >
                <FaArrowUpRightFromSquare size={11} aria-hidden="true" />
                {label}
              </a>
            );
          })}
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
          style={{
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: isDark ? 'rgba(255,255,255,0.55)' : '#9CA3AF',
            marginTop: '6px',
          }}
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
      className="flex flex-col justify-center py-4 h-full transition-colors duration-200"
      style={{ minHeight: '44px', color: isDark ? '#FFFFFF' : '#111827' }}
      onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
      onMouseLeave={(e) => (e.currentTarget.style.color = isDark ? '#FFFFFF' : '#111827')}
    >
      {content}
    </a>
  );
}

export default function WritingSpeaking() {
  const { isDark } = useTheme();

  return (
    <section id="writing" className="py-20 md:py-28 px-6 md:px-14" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto">
        <p className="section-label">Writing &amp; Speaking</p>
        <h2 className="section-title mb-10" style={{ color: isDark ? '#FFFFFF' : '#111827' }}>
          Beyond the Build
        </h2>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-10"
          style={{
            borderTop: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
          }}
        >
          {writingItems.map((item) => (
            <div
              key={item.id}
              style={{
                borderBottom: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
              }}
            >
              <WritingRow item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
