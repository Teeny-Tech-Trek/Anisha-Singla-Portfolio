import { useEffect, useState } from 'react';

// Reusable dark keyword-chip grid with a white highlight that cycles across the
// chips. Chip look matches the site's existing chips (the Skills terminal tags:
// #232323 border, faint dark fill, mono, gray text). Honors prefers-reduced-motion
// by rendering the chips statically (no cycling highlight).

const MONO = "'JetBrains Mono','SF Mono',monospace";

export default function KeywordChips({ items, intervalMs = 1400 }) {
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (!items || items.length === 0) return undefined;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    let id;

    const start = () => {
      setActive(0);
      id = setInterval(() => {
        setActive(prev => (prev + 1) % items.length);
      }, intervalMs);
    };

    const stop = () => {
      if (id) clearInterval(id);
      id = undefined;
      setActive(-1);
    };

    const apply = () => (mq.matches ? stop() : start());

    apply();
    mq.addEventListener('change', apply);
    return () => {
      stop();
      mq.removeEventListener('change', apply);
    };
  }, [items, intervalMs]);

  return (
    <div className="flex flex-wrap gap-2.5">
      {items.map((label, i) => {
        const on = i === active;
        return (
          <span
            key={label}
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: '0.02em',
              whiteSpace: 'nowrap',
              padding: '5px 11px',
              borderRadius: 5,
              border: `1px solid ${on ? '#FFFFFF' : '#232323'}`,
              background: on ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.02)',
              color: on ? '#FFFFFF' : '#9CA3AF',
              boxShadow: on ? '0 0 14px rgba(255,255,255,0.22)' : 'none',
              transition: 'background 0.3s ease, border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            {label}
          </span>
        );
      })}
    </div>
  );
}
