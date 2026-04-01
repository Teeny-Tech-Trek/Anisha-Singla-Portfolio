import { useFadeUp } from '../hooks/useGsap';

const education = [
  { degree:'Postgraduate — Artificial Intelligence', institution:'George Brown College', location:'Toronto, Canada', year:'2022 – 2023' },
  { degree:'Postgraduate — Project Management',      institution:'George Brown College', location:'Toronto, Canada', year:'2023 – 2024' },
  { degree:'BTech — Computer Engineering',           institution:'CGC Jhanjeri',         location:'Mohali, India',  year:'2017 – 2021' },
];

export default function Education() {
  const ref = useFadeUp('.fade-up');

  return (
    <section id="education" className="py-28 px-6 md:px-14" style={{background:'#050505'}}>
      <div ref={ref} className="max-w-7xl mx-auto">
        <p className="section-label fade-up">04 / Academics</p>
        <h2 className="section-title text-white mb-14 fade-up">Education</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {education.map((e,i) => (
            <div key={i} className="fade-up card p-8 flex flex-col">
              <svg className="mb-6" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
              <p className="font-body text-xs tracking-widest uppercase mb-3" style={{color:'#C9A84C'}}>{e.year}</p>
              <h3 className="font-title mb-2 text-white" style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'1.45rem',letterSpacing:'.04em',lineHeight:1.2}}>{e.degree}</h3>
              <p className="font-body font-semibold text-sm mt-1" style={{color:'#C9A84C'}}>{e.institution}</p>
              <p className="font-body text-sm mt-1" style={{color:'rgba(255,255,255,0.4)'}}>{e.location}</p>
              <div className="mt-auto pt-6" style={{borderTop:'1px solid rgba(201,168,76,0.15)',marginTop:'1.5rem'}}/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
