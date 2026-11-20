import { useFadeUp, useStaggerLeft, useStaggerRight } from '../hooks/useGsap';
import { socials } from '../data/socials';
import { navigateTo, ROUTES } from '../routes';
import { useTheme } from '../context/ThemeContext';

const linkedInHref = socials.find((s) => s.label === 'LinkedIn')?.href || 'https://linkedin.com/in/singlaanisha';

const stats = [
  { value: '10', label: 'Clients', sub: 'Across six industries' },
  { value: '15', label: 'Engagements', sub: 'Assistants, automations & agents' },
  { value: '6', label: 'Industries', sub: 'Retail, manufacturing, real estate & more' },
  { value: '2 Yrs', label: 'AI Consultancy', sub: 'Team of up to 5 engineers' },
];

export default function About() {
  const { isDark } = useTheme();
  const accent = isDark ? '#FFFFFF' : '#2563EB';

  const headRef = useFadeUp('.fade-up', { sectionId: 'about' });
  const leftRef = useStaggerLeft('.stagger', { sectionId: 'about' });
  const rightRef = useStaggerRight('.stagger-r', { sectionId: 'about' });

  return (
    <section id="about" className="py-20 md:py-28 px-6 md:px-14 relative" style={{ background: 'var(--bg-primary)' }}>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none" style={{
        width: '400px', height: '400px',
        background: isDark
          ? 'radial-gradient(circle,rgba(255,255,255,0.05) 0%,transparent 70%)'
          : 'radial-gradient(circle,rgba(37,99,235,0.06) 0%,transparent 70%)',
        filter: 'blur(50px)', contain: 'paint',
      }} />

      <div ref={headRef} className="max-w-7xl mx-auto">
        <p className="section-label fade-up">01 / Who I Am</p>
        <h2 className="section-title mb-4 fade-up" style={{ color: isDark ? '#FFFFFF' : '#111827' }}>
          About Me
        </h2>
        <p className="fade-up font-body text-base md:text-lg mb-12" style={{ color: accent, fontWeight: 500 }}>
          I turn business problems into scoped, actionable AI implementations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Left text */}
          <div ref={leftRef} className="flex flex-col items-start">
            <p className="stagger font-body text-lg leading-relaxed mb-5" style={{ color: isDark ? 'rgba(255,255,255,0.9)' : '#1F2937', fontWeight: 400 }}>
              I turn ambiguous business problems into AI implementations that teams actually adopt: the discovery, the requirements and acceptance criteria, the coordination of engineers and vendors, and the acceptance review at the end.
            </p>
            <p className="stagger font-body text-base leading-relaxed mb-5" style={{ color: isDark ? 'rgba(255,255,255,0.72)' : '#374151', fontWeight: 300 }}>
              A computer engineering degree in India, then two graduate certificates in Toronto at George Brown College, Applied AI Solutions Development and Project Management, both on the Dean's Honour List. My first implementation work was inside a precision spare-parts exporter: I recommended and rolled out an inventory and production-tracking system, cleaned the master data, wrote the SOPs and trained the staff. Later, as Project Manager there, I designed five process automations and set up the export documentation process so others could run it.
            </p>
            <p className="stagger font-body text-base leading-relaxed mb-5" style={{ color: isDark ? 'rgba(255,255,255,0.72)' : '#374151', fontWeight: 300 }}>
              In September 2024 I founded <strong className="font-semibold" style={{ color: accent }}>Teeny Tech Trek</strong>, a boutique AI consultancy. Over two years we delivered 15 engagements for 10 clients across six industries: retrieval-augmented assistants, workflow automation, AI agents, generative media and custom applications. I run the client side and the delivery side: discovery, proposals and pricing, specifications and acceptance criteria, priorities, budgets and release sign-off. A team of up to five engineers builds. I specify, review and accept; I do not write the production code, and I am clear about that line because it is what makes me useful between the business and the engineering team. Several engagements, including the longest, are under NDA; I describe them in conversation, not here.
            </p>
            <p className="stagger font-body text-base leading-relaxed mb-5" style={{ color: isDark ? 'rgba(255,255,255,0.72)' : '#374151', fontWeight: 300 }}>
              I moved to Toronto in September 2026 and joined <strong className="font-semibold" style={{ color: accent }}>APT Growth Digital</strong> as an AI-Powered Digital Marketing Consultant, working on how brands appear in AI answers (answer-engine and generative-engine optimization). Teeny Tech Trek continues under its team lead; I own clients, priorities and budget.
            </p>
            <p className="stagger font-body text-base leading-relaxed mb-6" style={{ color: isDark ? 'rgba(255,255,255,0.85)' : '#1F2937', fontWeight: 400, fontStyle: 'italic', borderLeft: `2px solid ${accent}`, paddingLeft: '1rem' }}>
              “Every engagement starts with the question the client has not asked yet, a written scope, and acceptance criteria with concrete input and output examples including the failure cases. I have said no to features more often than yes, and every no came with the trade-off written down.”
            </p>

            <a
              href={ROUTES.ABOUT}
              onClick={(e) => { e.preventDefault(); navigateTo(ROUTES.ABOUT); }}
              className="stagger btn-gold mt-2"
              style={{ padding: '0.85rem 2rem' }}
            >
              More About Me
            </a>
          </div>

          {/* Right stat cards */}
          <div ref={rightRef} className="flex flex-col gap-5">
            {stats.map(s => (
              <div key={s.label} className="stagger-r card flex items-center gap-5 p-5"
                style={{
                  borderLeft: `3px solid ${accent}`,
                  background: isDark ? '#0B2D62' : '#FFFFFF',
                  border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
                  borderLeftColor: accent,
                  borderLeftWidth: '3px',
                }}>
                <div className="font-title shrink-0" style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: '3.2rem',
                  color: accent,
                  lineHeight: 1,
                  minWidth: '5.5rem',
                  textShadow: isDark ? '0 0 20px rgba(255,255,255,0.22)' : 'none',
                }}>{s.value}</div>
                <div>
                  <p className="font-body font-semibold text-lg" style={{ color: isDark ? '#FFFFFF' : '#111827' }}>{s.label}</p>
                  <p className="font-body text-sm mt-0.5" style={{ color: isDark ? 'rgba(255,255,255,0.6)' : '#6B7280' }}>{s.sub}</p>
                </div>
              </div>
            ))}

            <div className="stagger-r card p-5 mt-1"
              style={{
                borderLeft: `3px solid ${accent}`,
                background: isDark ? '#0B2D62' : '#FFFFFF',
                border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
                borderLeftColor: accent,
                borderLeftWidth: '3px',
              }}>
              <p className="font-body font-semibold text-sm uppercase tracking-wider mb-1" style={{ color: accent }}>Work Authorization</p>
              <p className="font-body text-sm leading-relaxed" style={{ color: isDark ? 'rgba(255,255,255,0.8)' : '#374151' }}>
                Based in Toronto. Valid Post-Graduation Work Permit (PGWP) with full work authorization for any Canadian employer; no sponsorship required.
              </p>
            </div>

            <a href={linkedInHref} target="_blank" rel="noopener noreferrer"
              className="stagger-r btn-gold self-start mt-3">
              View LinkedIn Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
