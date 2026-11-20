import { useState } from 'react';
import { useFadeUp, useStaggerLeft, useStaggerRight } from '../hooks/useGsap';
import { useTheme } from '../context/ThemeContext';

export default function Contact() {
  const { isDark } = useTheme();
  const accent = isDark ? '#FFFFFF' : '#2563EB';

  const [form, setForm]             = useState({ name:'', email:'', message:'', honey:'' });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent]             = useState(false);
  const [error, setError]           = useState('');
  const headRef  = useFadeUp('.fade-up', { sectionId: 'contact' });
  const leftRef  = useStaggerLeft('.stagger', { sectionId: 'contact' });
  const rightRef = useStaggerRight('.stagger-r', { sectionId: 'contact', watch: sent });

  const handleChange = e => {
    if (error) setError('');
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Serverless FormSubmit AJAX endpoint — delivers inquiries directly to
  // anishasingla23@gmail.com without opening a mail client or needing a backend.
  const handleSubmit = async e => {
    e.preventDefault();
    if (submitting) return;

    // Honeypot check: bots filling the hidden field are silently ignored.
    if (form.honey) {
      setSent(true);
      setForm({ name:'', email:'', message:'', honey:'' });
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://formsubmit.co/ajax/anishasingla23@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          _subject: `Portfolio Contact from ${form.name.trim()}`,
          _replyto: form.email.trim(),
          _template: 'table',
          _captcha: 'false',
          _honey: '',
        }),
      });

      const data = await response.json().catch(() => null);
      const ok = response.ok && (data?.success === true || data?.success === 'true');

      if (!ok) {
        throw new Error(data?.message || 'Unable to send message right now.');
      }

      setSent(true);
      setForm({ name:'', email:'', message:'', honey:'' });
    } catch (err) {
      setError(
        err?.message || 'Could not send message right now. You can email directly at'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const borderBottomRest = isDark ? '1px solid rgba(255,255,255,0.28)' : '1px solid rgba(37,99,235,0.3)';

  const inp = {
    background: isDark ? '#0B2D62' : '#FFFFFF',
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
          ? 'radial-gradient(ellipse at center bottom,rgba(255,255,255,0.06) 0%,transparent 70%)'
          : 'radial-gradient(ellipse at center bottom,rgba(37,99,235,0.08) 0%,transparent 70%)',
        filter: 'blur(40px)',
      }}/>

      <div ref={headRef} className="max-w-7xl mx-auto">
        <p className="section-label fade-up">08 / Get In Touch</p>
        <h2 className="section-title mb-4 fade-up" style={{ color: isDark ? '#FFFFFF' : '#111827' }}>
          Let's Connect
        </h2>
        <p className="fade-up font-body text-base md:text-lg mb-12" style={{ color: accent, fontWeight: 500 }}>
          Open to AI Business Analyst, AI Implementation &amp; AI Enablement roles in Toronto &amp; Remote.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left info */}
          <div ref={leftRef}>
            <p className="stagger font-body text-base md:text-lg leading-relaxed mb-8" style={{ color: isDark ? 'rgba(255,255,255,0.72)' : '#4B5563', fontWeight: 300 }}>
              Looking for someone to translate ambiguous business problems into scoped, adopted AI implementations? I'd love to connect with hiring managers, delivery leaders, and AI teams.
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
                    border: isDark ? '1px solid rgba(255,255,255,0.28)' : '1px solid rgba(37,99,235,0.25)',
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
              <div className="stagger-r flex flex-col items-center justify-center h-full text-center px-6 py-12"
                style={{
                  border: isDark ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(37,99,235,0.2)',
                  background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(37,99,235,0.05)',
                  borderRadius: '12px',
                }}>
                <svg className="mb-4" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <h3 className="font-title text-2xl mb-2" style={{ fontFamily:"'Bebas Neue',sans-serif", letterSpacing:'.1em', color: isDark ? '#FFFFFF' : '#111827' }}>Message Sent!</h3>
                <p className="font-body text-sm mb-6 max-w-sm" style={{ color: isDark ? 'rgba(255,255,255,0.68)' : '#4B5563' }}>
                  Thank you for reaching out. Your inquiry has been sent to Anisha and she will respond shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="font-body text-xs tracking-widest uppercase underline underline-offset-4 cursor-pointer"
                  style={{ color: accent }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                {/* Honeypot anti-spam field (hidden from real users) */}
                <input
                  type="text"
                  name="honey"
                  value={form.honey}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                {[
                  {name:'name',  type:'text',  label:'Full name',      placeholder:'Full name'},
                  {name:'email', type:'email', label:'Email Address',   placeholder:'Email address'},
                ].map(f => (
                  <div key={f.name} className="stagger-r">
                    <label className="font-body text-xs tracking-widest uppercase block mb-2" style={{ color: isDark ? 'rgba(255,255,255,0.46)' : '#6B7280' }}>{f.label}</label>
                    <input name={f.name} type={f.type} value={form[f.name]} onChange={handleChange} required placeholder={f.placeholder} style={inp}
                      onFocus={e=>e.target.style.borderBottomColor=accent}
                      onBlur={e=>e.target.style.borderBottomColor=isDark ? 'rgba(255,255,255,0.28)' : 'rgba(37,99,235,0.3)'}/>
                  </div>
                ))}
                <div className="stagger-r">
                  <label className="font-body text-xs tracking-widest uppercase block mb-2" style={{ color: isDark ? 'rgba(255,255,255,0.46)' : '#6B7280' }}>Your Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={4}
                    placeholder="Tell me about your project..." style={{...inp,resize:'none'}}
                    onFocus={e=>e.target.style.borderBottomColor=accent}
                    onBlur={e=>e.target.style.borderBottomColor=isDark ? 'rgba(255,255,255,0.28)' : 'rgba(37,99,235,0.3)'}/>
                </div>
                {error && (
                  <p
                    role="alert"
                    className="font-body text-xs px-3.5 py-2.5 rounded-lg"
                    style={{
                      background: isDark ? 'rgba(239,68,68,0.14)' : 'rgba(239,68,68,0.08)',
                      border: isDark ? '1px solid rgba(248,113,113,0.35)' : '1px solid rgba(220,38,38,0.25)',
                      color: isDark ? '#FCA5A5' : '#B91C1C',
                    }}
                  >
                    {error}{' '}
                    <a
                      href="mailto:anishasingla23@gmail.com"
                      className="underline font-medium"
                    >
                      anishasingla23@gmail.com
                    </a>
                  </p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className={`stagger-r btn-gold w-full ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
