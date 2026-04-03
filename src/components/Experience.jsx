import { useTimeline } from '../hooks/useGsap';

const experiences = [
  { role:'Founder & CEO',                           company:'Teeny Tech Trek',             period:'Sep 2024 – Present',   location:'Mohali, India',   highlight:true, badge:'FOUNDER' },
  { role:'Community Coordinator',             company:'Connect Circles: Chandigarh', period:'Mar 2026 – Present',   location:'Mohali, India',   highlight:false },
  { role:'Associate Member',                  company:'TiE Chandigarh',              period:'Dec 2025 – Present',   location:'Mohali, India',   highlight:false },
  { role:'Project Manager — Business Dev',    company:'Appu International',          period:'Jun 2024 – Present',   location:'Ludhiana, India', highlight:false },
  { role:'President, AI Club',                company:'George Brown College',        period:'Oct 2023 – Apr 2024',  location:'Toronto, Canada', highlight:false },
  { role:'VP, AI Club',                       company:'George Brown College',        period:'Nov 2022 – Oct 2023',  location:'Toronto, Canada', highlight:false },
  { role:'Support Advisor & Entrepreneur',    company:'startGBC',                    period:'May 2023 – Dec 2023',  location:'Toronto, Canada', highlight:false },
  { role:'Sales Floor Team Member',           company:'Tim Hortons',                 period:'Sep 2022 – Feb 2024',  location:'Toronto, Canada', highlight:false },
  { role:'Frontend Developer',                company:'CETPA Infotech Pvt. Ltd.',    period:'Feb 2021 – Jul 2021',  location:'Noida, India',    highlight:false },
  { role:'Event Manager',                     company:'CGC Jhanjeri',                period:'Aug 2018 – Apr 2020',  location:'Mohali, India',   highlight:false },
];

function Card({ exp, side }) {
  return (
    <div className={`${side === 'left' ? 'tl-left' : 'tl-right'} card p-5 w-full max-w-xs`}
      style={{
        background: exp.highlight ? 'rgba(201,168,76,0.08)' : '#0d0d0d',
        border: exp.highlight ? '1px solid rgba(201,168,76,0.4)' : '1px solid rgba(255,255,255,0.06)',
      }}>
      {exp.badge && (
        <span className="font-body text-xs font-bold tracking-widest uppercase px-2 py-0.5 mb-2 inline-block"
          style={{background:'#C9A84C',color:'#000'}}>{exp.badge}</span>
      )}
      <h3 className="font-title" style={{
        fontFamily:"'Bebas Neue',sans-serif",fontSize:'1.25rem',letterSpacing:'.04em',
        color: exp.highlight ? '#C9A84C' : '#fff', lineHeight:1.2,
      }}>{exp.role}</h3>
      <p className="font-body font-semibold text-sm mt-1" style={{color: exp.highlight ? '#fff' : 'rgba(255,255,255,0.65)'}}>{exp.company}</p>
      <p className="font-body text-xs mt-1" style={{color:'rgba(255,255,255,0.35)'}}>{exp.period} · {exp.location}</p>
    </div>
  );
}

export default function Experience() {
  const ref = useTimeline();

  return (
    <section id="experience" className="py-28 px-6 md:px-14" style={{background:'#000'}}>
      <div className="max-w-5xl mx-auto">
        <p className="section-label">03 / My Journey</p>
        <h2 className="section-title text-white mb-16">Experience</h2>

        <div ref={ref} className="relative">
          {/* center line */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0" style={{
            width:'1px',
            background:'linear-gradient(to bottom,transparent,#C9A84C 8%,#C9A84C 92%,transparent)',
          }}/>

          <div className="flex flex-col gap-8">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={i} className="relative">
                  {/* mobile */}
                  <div className="md:hidden w-full p-5 card" style={{
                    background: exp.highlight ? 'rgba(201,168,76,0.08)' : '#0d0d0d',
                    borderLeft: exp.highlight ? '3px solid #C9A84C' : '3px solid rgba(201,168,76,0.3)',
                  }}>
                    {exp.badge && <span className="font-body text-xs font-bold tracking-widest uppercase px-2 py-0.5 mb-2 inline-block" style={{background:'#C9A84C',color:'#000'}}>{exp.badge}</span>}
                    <h3 className="font-title" style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'1.3rem',color: exp.highlight ? '#C9A84C' : '#fff'}}>{exp.role}</h3>
                    <p className="font-body font-semibold text-sm mt-1" style={{color:'rgba(255,255,255,0.65)'}}>{exp.company}</p>
                    <p className="font-body text-xs mt-1" style={{color:'rgba(255,255,255,0.35)'}}>{exp.period} · {exp.location}</p>
                  </div>

                  {/* desktop alternating */}
                  <div className="hidden md:flex items-center">
                    <div className="w-[45%] pr-8 flex justify-end">
                      {isLeft && <Card exp={exp} side="left"/>}
                    </div>
                    <div className="w-[10%] flex justify-center">
                      <div className="tl-dot rounded-full" style={{
                        width: exp.highlight ? '16px' : '10px',
                        height: exp.highlight ? '16px' : '10px',
                        background: exp.highlight ? '#C9A84C' : 'rgba(201,168,76,0.6)',
                        boxShadow: exp.highlight ? '0 0 16px rgba(201,168,76,0.6)' : 'none',
                        border:'2px solid #000', flexShrink:0,
                      }}/>
                    </div>
                    <div className="w-[45%] pl-8 flex justify-start">
                      {!isLeft && <Card exp={exp} side="right"/>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
