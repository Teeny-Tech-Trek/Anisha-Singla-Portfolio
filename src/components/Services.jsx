import { useFadeUp } from '../hooks/useGsap';

const services = [
  {
    icon:<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 2a10 10 0 0 1 10 10"/><circle cx="12" cy="12" r="3"/></svg>,
    title:'AI Consultancy',
    desc:'Delivering tailored AI solutions that enhance operational efficiency and drive exponential business growth through intelligent automation.',
  },
  {
    icon:<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
    title:'Business Development',
    desc:'Strategic business development that accelerates growth, builds lasting partnerships, and opens new revenue streams.',
  },
  {
    icon:<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01M12 14h.01M16 14h.01" strokeWidth="2" strokeLinecap="round"/></svg>,
    title:'Project Management',
    desc:'End-to-end project delivery with precision planning, agile execution, and measurable outcomes that exceed expectations.',
  },
  {
    icon:<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>,
    title:'Design Thinking',
    desc:'Human-centered problem solving through empathy, ideation, and rapid prototyping — certified practitioner approach.',
  },
];

export default function Services() {
  const ref = useFadeUp('.fade-up');

  return (
    <section id="services" className="py-28 px-6 md:px-14 relative" style={{background:'#050505'}}>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" style={{
        width:'500px',height:'500px',
        background:'radial-gradient(circle,rgba(201,168,76,0.05) 0%,transparent 70%)',
        filter:'blur(60px)',
      }}/>
      <div ref={ref} className="max-w-7xl mx-auto">
        <p className="section-label fade-up">02 / What I Do</p>
        <h2 className="section-title text-white mb-14 fade-up">My Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {services.map(s => (
            <div key={s.title} className="fade-up card p-8 relative overflow-hidden group"
              style={{borderTop:'2px solid #C9A84C'}}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{background:'radial-gradient(ellipse at top left,rgba(201,168,76,0.06) 0%,transparent 70%)'}}/>
              <div className="mb-5">{s.icon}</div>
              <h3 className="font-title mb-3 text-white" style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'1.8rem',letterSpacing:'.05em'}}>{s.title}</h3>
              <p className="font-body text-sm leading-relaxed" style={{color:'rgba(255,255,255,0.5)',fontWeight:300}}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
