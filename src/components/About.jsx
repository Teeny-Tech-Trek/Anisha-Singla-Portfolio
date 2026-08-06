import { useFadeUp, useStaggerLeft, useStaggerRight } from '../hooks/useGsap';
import { socials } from '../data/socials';
import { navigateTo, ROUTES } from '../routes';

const linkedInHref = socials.find((s) => s.label === 'LinkedIn')?.href;

const stats = [
  { value:'10+', label:'Client AI Deployments', sub:'Real estate, immigration, education' },
  { value:'100%', label:'On-Time Delivery',      sub:'Across every engagement' },
  { value:'4+',  label:'Years in Tech & Delivery', sub:'AI & project management' },
  { value:'CA',  label:'Work-Permit Holder',     sub:'Authorized to work in Canada' },
];

export default function About() {
  const headRef  = useFadeUp('.fade-up', { sectionId: 'about' });
  const leftRef  = useStaggerLeft('.stagger', { sectionId: 'about' });
  const rightRef = useStaggerRight('.stagger-r', { sectionId: 'about' });

  return (
    <section id="about" className="py-8 px-6 md:px-14 relative" style={{background:'#000'}}>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none" style={{
        width:'400px',height:'400px',
        background:'radial-gradient(circle,rgba(201,168,76,0.06) 0%,transparent 70%)',
        filter:'blur(50px)', contain:'paint',
      }}/>

      <div ref={headRef} className="max-w-7xl mx-auto">
        <p className="section-label fade-up">01 / Who I Am</p>
        <h2 className="section-title text-white mb-14 fade-up">About Me</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Left text */}
          <div ref={leftRef} className="flex flex-col items-start">
            <p className="stagger font-body text-lg leading-relaxed mb-5" style={{color:'rgba(255,255,255,0.68)',fontWeight:300}}>
              I build AI systems that survive contact with production.
            </p>
            <p className="stagger font-body text-lg leading-relaxed mb-5" style={{color:'rgba(255,255,255,0.5)',fontWeight:300}}>
              As founder of <strong className="text-gold font-semibold">Teeny Tech Trek</strong>, I have spent the last two years turning AI pilots into working systems for real businesses. Production RAG chatbots, AI agents and workflow automations for ten clients across Real Estate, Immigration and Education, with 100 percent on-time delivery and automations that save clients more than twenty hours of manual work every week.
            </p>
            <p className="stagger font-body text-lg leading-relaxed mb-5" style={{color:'rgba(255,255,255,0.5)',fontWeight:300}}>
              I built all of this while holding a full-time role in business development and automation R&D at a precision engineering manufacturer. Running both at once taught me prioritisation, stakeholder management and delivery discipline that no single role could have.
            </p>
            <p className="stagger font-body text-lg leading-relaxed mb-5" style={{color:'rgba(255,255,255,0.5)',fontWeight:300}}>
              I studied Applied AI Solutions Development and Project Management at George Brown College in Toronto, earning Dean's Honour List standing in all four terms. In September 2026 I am going back.
            </p>

            <a
              href={ROUTES.ABOUT}
              onClick={(e) => { e.preventDefault(); navigateTo(ROUTES.ABOUT); }}
              className="stagger btn-gold mt-4"
              style={{ padding: '1rem 2.2rem' }}
            >
              More About Me
            </a>
          </div>

          {/* Right stat cards */}
          <div ref={rightRef} className="flex flex-col gap-5">
            {stats.map(s => (
              <div key={s.label} className="stagger-r card flex items-center gap-4 p-4"
                style={{borderLeft:'3px solid #C9A84C'}}>
                <div className="font-title shrink-0" style={{
                  fontFamily:"'Bebas Neue',sans-serif",
                  fontSize:'3.5rem',
                  color:'#C9A84C',
                  lineHeight:1,
                  textShadow:'0 0 20px rgba(201,168,76,0.4)',
                }}>{s.value}</div>
                <div>
                  <p className="font-body font-semibold text-white">{s.label}</p>
                  <p className="font-body text-sm mt-1" style={{color:'rgba(255,255,255,0.4)'}}>{s.sub}</p>
                </div>
              </div>
            ))}

            {/* Moved here from the left column — sits directly below the stat cards */}
            <a href={linkedInHref} target="_blank" rel="noopener noreferrer"
              className="stagger-r btn-gold self-start mt-2">
              View LinkedIn Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
