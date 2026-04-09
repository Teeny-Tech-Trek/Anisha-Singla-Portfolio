import { useFadeUp, useStaggerLeft, useStaggerRight } from '../hooks/useGsap';

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
          <div ref={leftRef}>
            <p className="stagger font-body text-lg leading-relaxed mb-5" style={{color:'rgba(255,255,255,0.68)',fontWeight:300}}>
              I'm <span className="text-gold font-semibold">Anisha Singla</span>, Founder of{' '}
              <span className="text-gold font-semibold">Teeny Tech Trek</span> — a cutting-edge AI solutions company based in Mohali, Punjab. I'm passionate about transforming businesses through technology.
            </p>
            <p className="stagger font-body text-lg leading-relaxed mb-5" style={{color:'rgba(255,255,255,0.5)',fontWeight:300}}>
              With postgraduate degrees in Artificial Intelligence and Project Management from George Brown College, Toronto, I blend deep technical expertise with strategic business acumen.
            </p>
            <p className="stagger font-body text-lg leading-relaxed" style={{color:'rgba(255,255,255,0.5)',fontWeight:300}}>
              I thrive on collaborating with visionary teams to bring transformative ideas to life — leveraging automation and AI to help organizations unlock their full potential.
            </p>
            <a href="https://www.linkedin.com/in/singlaanisha" target="_blank" rel="noreferrer"
              className="stagger btn-gold inline-block mt-8">
              View LinkedIn Profile
            </a>
          </div>

          {/* Right stat cards */}
          <div ref={rightRef} className="flex flex-col gap-5">
            {stats.map(s => (
              <div key={s.label} className="stagger-r card flex items-center gap-6 p-6"
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
          </div>
        </div>
      </div>
    </section>
  );
}
