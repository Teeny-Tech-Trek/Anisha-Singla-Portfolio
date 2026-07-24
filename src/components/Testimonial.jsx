import { testimonials } from '../data/testimonialsData';

// TODO: flip to true once Priyanka Rao confirms consent for portfolio use
// (quote is public on LinkedIn, but a portfolio placement is a different
// context — Anisha is confirming with her in Dubai before this goes live).
const SHOW_TESTIMONIAL = false;

export default function Testimonial() {
  if (!SHOW_TESTIMONIAL) {
    return null;
  }

  return (
    <section className="py-20 md:py-28 px-6 md:px-14" style={{ background: '#000' }}>
      <div className="max-w-4xl mx-auto">
        <p className="section-label text-center">Testimonial</p>

        <div
          className="mt-6 p-8 md:p-12"
          style={{
            background: '#0d0d0d',
            borderLeft: '3px solid #C9A84C',
          }}
        >
          {testimonials.map(t => (
            <blockquote key={t.id} className="flex flex-col items-start">
              <p
                className="font-title text-white mb-6"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                  letterSpacing: '.02em',
                  lineHeight: 1.15,
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="font-body text-sm" style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}>
                <span className="text-gold font-semibold">{t.name}</span>, {t.title}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
