import { useFadeUp, useStaggerLeft, useStaggerRight } from '../hooks/useGsap';
import { socials } from '../data/socials';
import { navigateTo, ROUTES } from '../routes';

const linkedInHref = socials.find((s) => s.label === 'LinkedIn')?.href;

const stats = [
  { value:'3+', label:'Years of Experience', sub:'AI & Tech Industry' },
  { value:'1', label:'Company Founded',     sub:'Teeny Tech Trek' },
  { value:'2',  label:'Postgraduate Degrees',sub:'AI & Project Management' },
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
        filter:'blur(50px)',
      }}/>

      <div ref={headRef} className="max-w-7xl mx-auto">
        <p className="section-label fade-up">01 / Who I Am</p>
        <h2 className="section-title text-white mb-14 fade-up">About Me</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Left text */}
          <div ref={leftRef} className="flex flex-col items-start">
            <p className="stagger font-body text-lg leading-relaxed mb-5" style={{color:'rgba(255,255,255,0.68)',fontWeight:300}}>
              I'm <span className="text-gold font-semibold">Anisha Singla</span>, an Applied AI and Project Management professional who turns AI ideas into practical systems that solve real business problems. I studied Applied Artificial Intelligence Solutions and Project Management at George Brown College in Toronto and hold a valid Canadian work permit, so I'm authorized to work in Canada.
            </p>
            <p className="stagger font-body text-lg leading-relaxed mb-5" style={{color:'rgba(255,255,255,0.5)',fontWeight:300}}>
              I founded <span className="text-gold font-semibold">Teeny Tech Trek</span>, an applied-AI studio, to work at the intersection of building and strategy. There I've designed and shipped AI assistants, chatbots, workflow automation, and business-facing prototypes for lean teams, which taught me that the hard part isn't an impressive demo, but turning it into something reliable that fits real users, real data, and real operational limits.
            </p>
            
            <button
              onClick={() => navigateTo(ROUTES.ABOUT)}
              className="stagger btn-gold mt-4"
              style={{ padding: '.85rem 2.2rem' }}
            >
              More About Me
            </button>
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
