import { useState } from 'react';
import { useStaggerLeft, useStaggerRight } from '../hooks/useGsap';

export default function Contact() {
  const [form, setForm]   = useState({ name:'', email:'', message:'' });
  const [sent, setSent]   = useState(false);
  const leftRef  = useStaggerLeft('.stagger');
  const rightRef = useStaggerRight('.stagger-r');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => { e.preventDefault(); setSent(true); setForm({name:'',email:'',message:''}); };

  const inp = {
    background:'#0d0d0d', border:'none',
    borderBottom:'1px solid rgba(201,168,76,0.3)',
    color:'#fff', fontFamily:"'DM Sans',sans-serif",
    fontSize:'.95rem', width:'100%', outline:'none',
    transition:'border-color .3s ease',
    padding:'14px', // to offset the 1px border on focus
    // borderRadius:'10',
  };

  return (
    <section id="contact" className="py-28 px-6 md:px-14 relative" style={{background:'#000'}}>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{
        width:'600px',height:'300px',
        background:'radial-gradient(ellipse at center bottom,rgba(201,168,76,0.08) 0%,transparent 70%)',
        filter:'blur(40px)',
      }}/>

      <div className="max-w-7xl mx-auto">
        <p className="section-label">08 / Get In Touch</p>
        <h2 className="section-title text-white mb-14">Let's Build Something Great</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left info */}
          <div ref={leftRef}>
            <p className="stagger font-body text-lg leading-relaxed mb-8" style={{color:'rgba(255,255,255,0.55)',fontWeight:300}}>
              Have a project in mind? Want to explore how AI can transform your business? I'd love to connect and discuss how we can create something impactful together.
            </p>
            {[
              { icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>, label:'LinkedIn', value:'linkedin.com/in/singlaanisha', href:'https://www.linkedin.com/in/singlaanisha' },
              { icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>, label:'Company', value:'Teeny Tech Trek', href:null },
              { icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>, label:'Location', value:'Mohali, Punjab, India', href:null },
            ].map(item => (
              <div key={item.label} className="stagger flex items-center gap-4 mb-5">
                <div className="flex items-center justify-center shrink-0 text-gold"
                  style={{width:'44px',height:'44px',border:'1px solid rgba(201,168,76,0.3)'}}>
                  {item.icon}
                </div>
                <div>
                  <p className="font-body text-xs tracking-widest uppercase mb-0.5" style={{color:'rgba(255,255,255,0.35)'}}>{item.label}</p>
                  {item.href
                    ? <a href={item.href} target="_blank" rel="noreferrer" className="font-body text-sm text-white hover:text-gold transition-colors">{item.value}</a>
                    : <p className="font-body text-sm text-white">{item.value}</p>
                  }
                </div>
              </div>
            ))}
          </div>

          {/* Right form */}
          <div ref={rightRef}>
            {sent ? (
              <div className="stagger-r flex flex-col items-center justify-center h-full text-center py-12"
                style={{border:'1px solid rgba(201,168,76,0.2)',background:'rgba(201,168,76,0.05)'}}>
                <svg className="mb-4" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <h3 className="font-title text-2xl text-white mb-2" style={{fontFamily:"'Bebas Neue',sans-serif",letterSpacing:'.1em'}}>Message Sent!</h3>
                <p className="font-body text-sm" style={{color:'rgba(255,255,255,0.5)'}}>Thank you for reaching out. I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                {[
                  {name:'name',  type:'text',  label:'Your Name',      placeholder:'Your full name'},
                  {name:'email', type:'email', label:'Email Address',   placeholder:'hello@example.com'},
                ].map(f => (
                  <div key={f.name} className="stagger-r">
                    <label className="font-body text-xs tracking-widest uppercase block mb-2" style={{color:'rgba(255,255,255,0.35)'}}>{f.label}</label>
                    <input name={f.name} type={f.type} value={form[f.name]} onChange={handleChange} required placeholder={f.placeholder} style={inp}
                      onFocus={e=>e.target.style.borderBottomColor='#C9A84C'}
                      onBlur={e=>e.target.style.borderBottomColor='rgba(201,168,76,0.3)'}/>
                  </div>
                ))}
                <div className="stagger-r">
                  <label className="font-body text-xs tracking-widest uppercase block mb-2" style={{color:'rgba(255,255,255,0.35)'}}>Your Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={4}
                    placeholder="Tell me about your project..." style={{...inp,resize:'none'}}
                    onFocus={e=>e.target.style.borderBottomColor='#C9A84C'}
                    onBlur={e=>e.target.style.borderBottomColor='rgba(201,168,76,0.3)'}/>
                </div>
                <button type="submit" className="stagger-r btn-gold w-full">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
