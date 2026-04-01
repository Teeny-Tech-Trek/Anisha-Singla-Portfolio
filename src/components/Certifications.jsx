import { useStaggerLeft, useStaggerRight } from '../hooks/useGsap';

const certs  = ['PHP','JavaScript Level 1','Advanced C / C++','CSS Level 1','Design Thinking Practitioner'];
const awards = [
  { title:'Letter of Appreciation',    count:3 },
  { title:'Certificate of Appreciation',count:1 },
  { title:'Certificate of Coordination',count:1 },
];

export default function Certifications() {
  const leftRef  = useStaggerLeft('.stagger');
  const rightRef = useStaggerRight('.stagger-r');

  return (
    <section id="certifications" className="py-28 px-6 md:px-14" style={{background:'#050505'}}>
      <div className="max-w-7xl mx-auto">
        <p className="section-label">06 / Recognition</p>
        <h2 className="section-title text-white mb-14">Certifications &amp; Awards</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Certs */}
          <div ref={leftRef}>
            <h3 className="font-title mb-6 text-gold" style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'1.8rem',letterSpacing:'.08em'}}>Certifications</h3>
            <div className="flex flex-col gap-3">
              {certs.map(c => (
                <div key={c} className="stagger card flex items-center gap-4 p-4">
                  <div className="shrink-0 rounded-full" style={{width:'8px',height:'8px',background:'#C9A84C'}}/>
                  <span className="font-body font-medium text-sm text-white">{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Awards */}
          <div ref={rightRef}>
            <h3 className="font-title mb-6 text-gold" style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'1.8rem',letterSpacing:'.08em'}}>Awards &amp; Honors</h3>
            <div className="flex flex-col gap-4">
              {awards.map(a => (
                <div key={a.title} className="stagger-r card p-5 flex items-center justify-between"
                  style={{borderLeft:'3px solid #C9A84C'}}>
                  <div>
                    <svg className="mb-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
                      <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
                    </svg>
                    <p className="font-body font-semibold text-sm text-white">{a.title}</p>
                  </div>
                  {a.count > 1 && (
                    <span className="font-body text-xs font-bold px-3 py-1"
                      style={{background:'rgba(201,168,76,0.15)',color:'#C9A84C',border:'1px solid rgba(201,168,76,0.3)'}}>
                      x{a.count}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
