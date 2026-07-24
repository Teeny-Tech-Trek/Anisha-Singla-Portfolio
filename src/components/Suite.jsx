import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { suiteProducts } from '../data/suiteData';

const GOLD = '#C9A84C';

/*
 * ── SUITE — REFINED EDITION ─────────────────────────────────────
 * Enterprise-grade restraint. No boxes, no fills, no theatrics.
 * A precise two-column ledger: identity on the left, substance on
 * the right. Gold appears only three times per row — the label,
 * a 1px hover indicator, and the link. Everything else is
 * typography, spacing, and hairlines.
 *
 * Hover language: quiet. Background lifts by 2%, a thin gold rule
 * grows along the left edge, the arrow eases forward 2px.
 * ─────────────────────────────────────────────────────────────────
 */

function SuiteRow({ p, index }) {
  return (
    <a
      href={p.live}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${p.title} — visit live site (opens in new tab)`}
      className="suite-row group relative block transition-colors duration-300
                 hover:bg-white/[0.025] focus-visible:bg-white/[0.025]
                 focus-visible:outline-none"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* 1px gold indicator — grows along the left edge on hover */}
      <span
        className="absolute left-0 top-0 h-full w-px origin-top scale-y-0
                   group-hover:scale-y-100 group-focus-visible:scale-y-100
                   transition-transform duration-400 ease-out"
        style={{ background: GOLD }}
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-x-12 py-10 md:py-12 px-5 md:px-8 items-start">
        {/* left — index + product name */}
        <div className="md:col-span-5 lg:col-span-4">
          <p
            className="font-mono text-[10px] tracking-[0.3em] mb-3"
            style={{ color: 'rgba(255,255,255,0.46)' }}
          >
            {String(index + 1).padStart(2, '0')} <span style={{ color: 'rgba(201,168,76,0.7)' }}>/</span> PRODUCT
          </p>
          <h3
            className="text-white"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(1.9rem, 3vw, 2.5rem)',
              letterSpacing: '0.03em',
              lineHeight: 1.05,
            }}
          >
            {p.title}
          </h3>
        </div>

        {/* right — description + action */}
        <div className="md:col-span-7 lg:col-span-8 md:pt-6">
          <p
            className="font-body text-[16px] leading-[1.75] max-w-2xl"
            style={{ color: 'rgba(255,255,255,0.52)', fontWeight: 300 }}
          >
            {p.description}
          </p>

          <span
            className="mt-6 inline-flex items-center gap-2.5 font-body text-[13px] tracking-wide
                       transition-colors duration-300"
            style={{ color: GOLD }}
          >
            Visit {p.title}
            <FaArrowUpRightFromSquare
              size={11}
              aria-hidden="true"
              className="transition-transform duration-300 ease-out
                         group-hover:translate-x-0.5 group-hover:-translate-y-0.5
                         group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5"
            />
          </span>
        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .suite-row, .suite-row * { transition: none !important; }
        }
      `}</style>
    </a>
  );
}

export default function Suite() {
  return (
    <section
      id="suite"
      className="py-24 md:py-32 px-6 md:px-14"
      style={{ background: '#000' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* header — measured, editorial */}
        <div className="mb-16 md:mb-20">
          <p className="section-label">Flagship Products</p>
          <h2 className="section-title text-white mb-6">The Tech Trekkers Suite</h2>
          <p
            className="font-body text-base leading-[1.8]"
            style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 300, maxWidth: '560px' }}
          >
            Three production AI agent products built on one shared agentic engine.
            Every capability transfers by configuration rather than rebuild.
          </p>
        </div>

        {/* the ledger */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {suiteProducts.map((p, i) => (
            <SuiteRow key={p.id} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}