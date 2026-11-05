import { useState } from 'react';
import { useFadeUp, useStaggerLeft, useStaggerRight } from '../hooks/useGsap';
import { useTheme } from '../context/ThemeContext';

export default function Contact() {
  const { isDark } = useTheme();
  const accent = isDark ? '#C9A84C' : '#2563EB';

  const [form, setForm]   = useState({ name:'', email:'', message:'' });
  const [sent, setSent]   = useState(false);
  const headRef  = useFadeUp('.fade-up', { sectionId: 'contact' });
  const leftRef  = useStaggerLeft('.stagger', { sectionId: 'contact' });
  const rightRef = useStaggerRight('.stagger-r', { sectionId: 'contact', watch: sent });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  // No backend/API endpoint exists for this form — it previously just set `sent`
  // without ever transmitting the message anywhere. Deliver via mailto: fallback
  // (opens the visitor's own mail client, pre-filled) so a submission actually
  // reaches an inbox, without adding a new dependency or backend.
  const handleSubmit = e => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:anishasingla23@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    setForm({name:'',email:'',message:''});
  };

  const borderBottomRest = isDark ? '1px solid rgba(201,168,76,0.3)' : '1px solid rgba(37,99,235,0.3)';

  const inp = {
    background: isDark ? '#0d0d0d' : '#FFFFFF',
    border: 'none',
    borderBottom: borderBottomRest,
    color: isDark ? '#fff' : '#111827',
    fontFamily: "'DM Sans',sans-serif",
    fontSize: '.95rem',
    width: '100%',
    outline: 'none',
    transition: 'border-color .3s ease',
    padding: '14px',
  };

  return (
    <section id="contact" className="py-28 px-6 md:px-14 relative" style={{ background: 'var(--bg-primary)' }}>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{
        width: '600px', height: '300px',
        background: isDark
          ? 'radial-gradient(ellipse at center bottom,rgba(201,168,76,0.08) 0%,transparent 70%)'
          : 'radial-gradient(ellipse at center bottom,rgba(37,99,235,0.08) 0%,transparent 70%)',
        filter: 'blur(40px)',
      }}/>

      <div ref={headRef} className="max-w-7xl mx-auto">
        <p className="section-label fade-up">08 / Get In Touch</p>
        <h2 className="section-title mb-14 fade-up" style={{ color: isDark ? '#FFFFFF' : '#111827' }}>
          Let's Build Something Great
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left info */}
          <div ref={leftRef}>
            <p className="stagger font-body text-lg leading-relaxed mb-8" style={{ color: isDark ? 'rgba(255,255,255,0.55)' : '#4B5563', fontWeight: 300 }}>
              Have a project in mind? Want to explore how AI can transform your business? I'd love to connect and discuss how we can create something impactful together.
            </p>
            {[
              { icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>, label:'Hiring managers and recruiters', value:'anishasingla23@gmail.com', href:'mailto:anishasingla23@gmail.com' },
              { icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>, label:'Business and collaboration', value:'anishasingla@teenytechtrek.com', href:'mailto:anishasingla@teenytechtrek.com' },
              { icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>, label:'LinkedIn', value:'linkedin.com/in/singlaanisha', href:'https://linkedin.com/in/singlaanisha' },
              { icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .26.18.58.69.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z"/></svg>, label:'GitHub', value:'Profile', href:'https://github.com/Anisha-Singla-22' },
              { icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>, label:'Company', value:'Teeny Tech Trek', href:'https://www.teenytechtrek.com/' },
              { icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>, label:'Location', value:'Toronto, Ontario, Canada', href:null },
            ].map(item => (
              <div key={item.label} className="stagger flex items-center gap-4 mb-5">
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: '44px',
                    height: '44px',
                    border: isDark ? '1px solid rgba(201,168,76,0.3)' : '1px solid rgba(37,99,235,0.25)',
                    color: accent,
                    background: isDark ? 'transparent' : 'rgba(37,99,235,0.04)',
                    borderRadius: '8px',
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="font-body text-xs tracking-widest uppercase mb-0.5" style={{ color: isDark ? 'rgba(255,255,255,0.46)' : '#6B7280' }}>{item.label}</p>
                  {item.href
                    ? <a href={item.href} target="_blank" rel="noopener noreferrer" className="font-body text-sm transition-colors" style={{ color: isDark ? '#FFFFFF' : '#111827' }} onMouseEnter={e=>e.currentTarget.style.color=accent} onMouseLeave={e=>e.currentTarget.style.color=isDark ? '#FFFFFF' : '#111827'}>{item.value}</a>
                    : <p className="font-body text-sm" style={{ color: isDark ? '#FFFFFF' : '#111827' }}>{item.value}</p>
                  }
                </div>
              </div>
            ))}
          </div>

          {/* Right form */}
          <div ref={rightRef}>
            {sent ? (
              <div className="stagger-r flex flex-col items-center justify-center h-full text-center py-12"
                style={{
                  border: isDark ? '1px solid rgba(201,168,76,0.2)' : '1px solid rgba(37,99,235,0.2)',
                  background: isDark ? 'rgba(201,168,76,0.05)' : 'rgba(37,99,235,0.05)',
                  borderRadius: '12px',
                }}>
                <svg className="mb-4" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <h3 className="font-title text-2xl mb-2" style={{ fontFamily:"'Bebas Neue',sans-serif", letterSpacing:'.1em', color: isDark ? '#FFFFFF' : '#111827' }}>Almost there!</h3>
                <p className="font-body text-sm" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#4B5563' }}>Your email client should now be open with your message ready to send.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                {[
                  {name:'name',  type:'text',  label:'Full name',      placeholder:'Full name'},
                  {name:'email', type:'email', label:'Email Address',   placeholder:'Email address'},
                ].map(f => (
                  <div key={f.name} className="stagger-r">
                    <label className="font-body text-xs tracking-widest uppercase block mb-2" style={{ color: isDark ? 'rgba(255,255,255,0.46)' : '#6B7280' }}>{f.label}</label>
                    <input name={f.name} type={f.type} value={form[f.name]} onChange={handleChange} required placeholder={f.placeholder} style={inp}
                      onFocus={e=>e.target.style.borderBottomColor=accent}
                      onBlur={e=>e.target.style.borderBottomColor=isDark ? 'rgba(201,168,76,0.3)' : 'rgba(37,99,235,0.3)'}/>
                  </div>
                ))}
                <div className="stagger-r">
                  <label className="font-body text-xs tracking-widest uppercase block mb-2" style={{ color: isDark ? 'rgba(255,255,255,0.46)' : '#6B7280' }}>Your Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={4}
                    placeholder="Tell me about your project..." style={{...inp,resize:'none'}}
                    onFocus={e=>e.target.style.borderBottomColor=accent}
                    onBlur={e=>e.target.style.borderBottomColor=isDark ? 'rgba(201,168,76,0.3)' : 'rgba(37,99,235,0.3)'}/>
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
