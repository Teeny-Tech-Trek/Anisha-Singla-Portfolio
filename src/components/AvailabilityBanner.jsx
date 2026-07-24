import { useEffect, useRef } from 'react';

export default function AvailabilityBanner() {
  const rootRef = useRef(null);

  // Hero.jsx reserves exactly this much space below the fold so the banner
  // is never cut off — measured for real (font wrap varies a lot by
  // viewport: ~2 lines on desktop, ~6-7 wrapped lines on a narrow phone),
  // not guessed from font-metric math, since that guess was wrong before.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof ResizeObserver === 'undefined') {
      return undefined;
    }

    const setHeightVar = () => {
      document.documentElement.style.setProperty('--availability-banner-h', `${el.offsetHeight}px`);
    };

    setHeightVar();
    const observer = new ResizeObserver(setHeightVar);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="availability"
      ref={rootRef}
      style={{
        background: 'linear-gradient(90deg, rgba(201,168,76,0.14) 0%, rgba(201,168,76,0.06) 100%)',
        borderTop: '1px solid rgba(201,168,76,0.5)',
        borderBottom: '1px solid rgba(201,168,76,0.5)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-14 py-4 md:py-5">
        <p
          className="font-body text-center"
          style={{
            color: 'rgba(255,255,255,0.88)',
            fontSize: 'clamp(1rem, 1.4vw, 1.05rem)',
            fontWeight: 500,
            lineHeight: 1.6,
            letterSpacing: '0.01em',
          }}
        >
          Relocating to Toronto in September 2026. Valid PGWP with full work
          authorisation for any Canadian employer, no sponsorship required.
          Open to AI Product Manager, Business Analyst and AI implementation
          roles.{' '}
          <a
            href="mailto:anishasingla23@gmail.com"
            style={{
              color: '#C9A84C',
              fontWeight: 700,
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
            }}
          >
            anishasingla23@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
