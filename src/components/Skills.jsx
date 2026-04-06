import { useProgressBars, useStaggerLeft } from '../hooks/useGsap';

const skills = [
  { name:'Artificial Intelligence',          level:95 },
  { name:'Strategic Business Development',   level:90 },
  { name:'Project Management',               level:88 },
  { name:'Design Thinking',                  level:85 },
  { name:'Frontend Development',             level:78 },
  { name:'Community Building',               level:82 },
];

const tags = [
  'AI Consultancy','Machine Learning','Business Strategy','Agile / Scrum',
  'Design Thinking','Frontend Dev','Team Leadership','Community Building',
  'Public Speaking','Startup Ecosystem','Digital Transformation','Innovation',
];

export default function Skills() {
  const barsRef  = useProgressBars();
  const tagsRef  = useStaggerLeft('.stagger');

  return (
    <section id="skills" className="py-8 px-6 md:px-14" style={{background:'#000'}}>
      <div className="max-w-7xl mx-auto">
        <p className="section-label">06 / Expertise</p>
        <h2 className="section-title text-white mb-14">Skills</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Skill bars */}
          <div ref={barsRef} className="flex flex-col gap-7">
            {skills.map(s => (
              <div key={s.name}>
                <div className="flex justify-between mb-2">
                  <span className="font-body font-medium text-sm text-white">{s.name}</span>
                  <span className="font-body text-xs" style={{color:'#C9A84C'}}>{s.level}%</span>
                </div>
                <div className="w-full relative" style={{height:'2px',background:'rgba(255,255,255,0.08)'}}>
                  <div className="progress-bar absolute top-0 left-0 h-full"
                    data-width={`${s.level}%`}
                    style={{
                      width:0,
                      background:'linear-gradient(to right,#C9A84C,#E8C97A)',
                      boxShadow:'0 0 8px rgba(201,168,76,0.6)',
                    }}/>
                </div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div ref={tagsRef} className="flex flex-wrap gap-3 content-start">
            {tags.map((tag,i) => (
              <span key={tag} className="stagger font-body text-xs font-medium tracking-wide px-4 py-2 cursor-default transition-all duration-300"
                style={{
                  background: i%3===0 ? 'rgba(201,168,76,0.15)' : '#0d0d0d',
                  border:'1px solid rgba(201,168,76,0.3)',
                  color: i%3===0 ? '#C9A84C' : 'rgba(255,255,255,0.6)',
                }}
                onMouseEnter={e=>{e.currentTarget.style.background='rgba(201,168,76,0.2)';e.currentTarget.style.color='#C9A84C';e.currentTarget.style.borderColor='#C9A84C';}}
                onMouseLeave={e=>{e.currentTarget.style.background=i%3===0?'rgba(201,168,76,0.15)':'#0d0d0d';e.currentTarget.style.color=i%3===0?'#C9A84C':'rgba(255,255,255,0.6)';e.currentTarget.style.borderColor='rgba(201,168,76,0.3)';}}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
