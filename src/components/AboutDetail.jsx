import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { navigateTo, navigateToSection, ROUTES } from '../routes';
import { socials } from '../data/socials';

const GOLD = '#C9A84C';
const GOLD_SOFT = 'rgba(201,168,76,0.35)';
const TITLE_FONT = "'Bebas Neue', sans-serif";

const linkedInHref = socials.find(s => s.label === 'LinkedIn')?.href || 'https://www.linkedin.com/in/singlaanisha';
const emailHref = socials.find(s => s.label === 'Email')?.href || 'mailto:anishasingla23@gmail.com';

/* ---------- Small shared pieces ---------- */

function BackToHomeButton({ label = 'Back to Home', className = '' }) {
  return (
    <button
      onClick={() => navigateTo(ROUTES.HOME)}
      className={`font-body flex items-center gap-2 transition-all duration-300 hover:gap-3 ${className}`}
      style={{
        fontSize: '.72rem', letterSpacing: '.2em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.55)', background: 'transparent', border: 'none',
        cursor: 'pointer', padding: 0,
      }}
      onMouseEnter={e => e.currentTarget.style.color = GOLD}
      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      {label}
    </button>
  );
}

function SectionEyebrow({ index, label }) {
  return (
    <div className="flex items-baseline gap-3 mb-6">
      <span
        className="font-body text-[.65rem] tracking-[.3em] font-semibold"
        style={{ color: GOLD }}
      >
        {index}
      </span>
      <span className="h-[1px] w-8" style={{ background: GOLD_SOFT }} />
      <p className="font-body text-xs tracking-[.25em] uppercase font-semibold text-white/70">
        {label}
      </p>
    </div>
  );
}

function Divider() {
  return (
    <div
      className="mt-12"
      style={{ height: 1, background: `linear-gradient(to right, ${GOLD_SOFT}, transparent)` }}
    />
  );
}

function GoldCheck() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <path d="M20 6L9 17l-5-5" stroke={GOLD} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------- Icons for "How I Work" ---------- */
const workIcons = {
  target: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" fill={GOLD} stroke="none" />
    </svg>
  ),
  grid: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.6">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  shield: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.6">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
    </svg>
  ),
  chat: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.6">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  ),
};

const workItems = [
  { icon: 'target', title: 'Business problem first', body: 'I begin by understanding the workflow, user needs, and expected business value before selecting a model or technology.' },
  { icon: 'grid', title: 'Structured delivery', body: 'My project management background helps me manage scope, milestones, timelines, communication, and stakeholder expectations.' },
  { icon: 'shield', title: 'Responsible implementation', body: 'I consider grounded responses, citations, fallback options, human oversight, and adoption requirements throughout the development process.' },
  { icon: 'chat', title: 'Clear communication', body: 'I\u2019m comfortable translating business requirements into technical direction and explaining technical decisions to non-technical stakeholders.' },
];

const timeline = [
  { era: 'Early Career', text: 'My career began in computer engineering and frontend development, where I learned the importance of building solutions that work reliably for real users.' },
  { era: 'Manufacturing & Digital Transformation', text: 'Before and after my time in Toronto, I worked with Appu International, a precision-engineering manufacturer \u2014 first implementing its earliest digital systems (raising adoption from 10% to 40% in three months), and later returning to lead international business development and automation R&D. Bringing AI and automation into a traditional factory taught me that adoption, training, and change management matter as much as the technology.' },
  { era: 'Toronto', text: 'After moving to Toronto, I completed postgraduate programs in Applied AI Solutions and Project Management at George Brown College \u2014 understanding both how AI systems are built and how they should be planned, communicated, and delivered.' },
  { era: 'AI Club & startGBC', text: 'I served as Vice President and later President of the AI Club, organizing workshops for a community interested in practical AI, and worked with startGBC helping early-stage founders validate ideas and think through go-to-market plans.' },
  { era: '2024 \u2014 Teeny Tech Trek', text: 'I founded Teeny Tech Trek to combine AI implementation with business strategy \u2014 gaining experience in client discovery, requirement gathering, solution architecture, and end-to-end delivery.' },
];

const roles = [
  'AI Business Analyst / Business Analyst (AI Implementation & Enablement)',
  'AI Product or Program Manager',
  'Applied AI Consultant',
  'Forward-Deployed AI Engineer',
  'AI Solutions or Implementation Specialist',
  'Responsible AI or AI Governance Analyst',
  'Technical Project Manager for AI systems',
];

export default function AboutDetail() {
  const pageRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: .5, ease: 'power2.out' });
    gsap.fromTo('.abt-hero', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .9, ease: 'power3.out', stagger: .1, delay: 0.15 });
    gsap.fromTo('.abt-section', { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: .7, ease: 'power3.out', stagger: 0.1, delay: 0.3 });
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen pt-24 pb-20 px-6 md:px-14 relative" style={{ background: '#000' }}>

      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div style={{
          position: 'absolute', top: '10%', left: '-5%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(201,168,76,0.05) 0%,transparent 70%)',
          filter: 'blur(80px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '-5%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(100,150,255,0.04) 0%,transparent 70%)',
          filter: 'blur(80px)',
        }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Back button */}
        <div className="abt-hero mb-10">
          <BackToHomeButton />
        </div>

        {/* Hero: portrait video + intro, side by side */}
        <div className="abt-hero grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-10 lg:gap-14 items-start mb-20">

          {/* Portrait video card */}
          <div className="mx-auto lg:mx-0 w-full max-w-[300px] lg:max-w-none lg:sticky lg:top-28">
            <div
              className="overflow-hidden rounded-2xl relative"
              style={{ border: '1px solid rgba(201,168,76,0.25)', background: 'rgba(255,255,255,0.02)', boxShadow: '0 30px 60px -20px rgba(0,0,0,0.6)' }}
            >
              <div className="aspect-[9/16] w-full relative">
                <video
                  className="w-full h-full object-cover"
                  src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054ba208d8c30fe33fcfd3f118de0d0&profile_id=139&oauth2_token_id=57447761"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                />
              </div>
              {/* corner accent */}
              <div
                className="absolute top-3 right-3 px-2.5 py-1 rounded-full font-body text-[.6rem] tracking-[.15em] uppercase font-semibold"
                style={{ background: 'rgba(0,0,0,0.55)', color: GOLD, border: '1px solid rgba(201,168,76,0.35)', backdropFilter: 'blur(4px)' }}
              >
                Intro
              </div>
            </div>
          </div>

          {/* Header + intro text */}
          <div>
            <p className="font-body text-xs tracking-[.35em] uppercase mb-2 font-semibold" style={{ color: GOLD }}>
              Profile & Story
            </p>
            <h1
              className="font-title uppercase text-white mb-8"
              style={{
                fontFamily: TITLE_FONT,
                fontSize: 'clamp(2.6rem, 5.2vw, 4.6rem)',
                letterSpacing: '.04em', lineHeight: 1,
              }}
            >
              About Me
            </h1>

            <div className="flex flex-col gap-6">
              <p className="font-body text-base md:text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 300 }}>
                I'm <span className="font-semibold text-white">Anisha Singla</span>, an Applied AI and Project Management professional working at the intersection of AI implementation, business analysis, and delivery. I turn business problems into production AI systems &mdash; RAG assistants, agentic workflows, automations, and governance-ready deployments &mdash; and I've done it for 10+ clients across real estate, immigration, and education, plus automation R&amp;D inside a traditional manufacturing business.
              </p>
              <p className="font-body text-sm md:text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>
                I hold postgraduate credentials in Applied AI Solutions and Project Management from George Brown College in Toronto. I'm also the founder of Teeny Tech Trek, where I manage AI projects from initial discovery and solution design through implementation and delivery.
              </p>
              <p className="font-body text-sm md:text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>
                My strength is combining technical understanding with project leadership &mdash; working with stakeholders to define the right use case, collaborating on system architecture, and guiding the solution toward a reliable launch.
              </p>

              {/* Quick stat strip */}
              <div className="flex flex-wrap gap-8 mt-4 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div>
                  <p className="font-title text-white" style={{ fontFamily: TITLE_FONT, fontSize: '2rem', lineHeight: 1 }}>2024</p>
                  <p className="font-body text-[.65rem] tracking-[.15em] uppercase text-white/45 mt-1.5">Founded Teeny Tech Trek</p>
                </div>
                <div>
                  <p className="font-title text-white" style={{ fontFamily: TITLE_FONT, fontSize: '2rem', lineHeight: 1 }}>2</p>
                  <p className="font-body text-[.65rem] tracking-[.15em] uppercase text-white/45 mt-1.5">Postgrad Credentials</p>
                </div>
                <div>
                  <p className="font-title text-white" style={{ fontFamily: TITLE_FONT, fontSize: '2rem', lineHeight: 1 }}>CA</p>
                  <p className="font-body text-[.65rem] tracking-[.15em] uppercase text-white/45 mt-1.5">Work Permit Holder</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: At a Glance — single panel, split by hairline */}
        <section className="abt-section mb-16">
          <SectionEyebrow index="01" label="At a Glance" />
          <div
            className="rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
            style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}
          >
            <div className="p-7 md:border-r" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <h3 className="font-body text-xs tracking-[.2em] uppercase font-semibold text-white/90 mb-4">Background</h3>
              <ul className="list-none p-0 m-0 flex flex-col gap-3 text-[.8rem] text-white/60 leading-snug">
                <li className="flex gap-2.5"><GoldCheck /><span><strong className="text-white/85 font-medium">Founder &amp; AI Strategist, Teeny Tech Trek</strong> &mdash; 10+ client AI deployments, 100% on-time delivery</span></li>
                <li className="flex gap-2.5"><GoldCheck /><span>Automation R&amp;D Lead in manufacturing &mdash; 5 process automations, Industry 4.0 pilots</span></li>
                <li className="flex gap-2.5"><GoldCheck /><span>Postgraduate credentials in Applied AI Solutions &amp; Project Management (George Brown College, Toronto)</span></li>
                <li className="flex gap-2.5"><GoldCheck /><span>B.Tech in Computer Engineering</span></li>
                <li className="flex gap-2.5"><GoldCheck /><span>Authorized to work in Canada &mdash; valid work permit, no sponsorship required</span></li>
              </ul>
            </div>

            <div className="p-7">
              <h3 className="font-body text-xs tracking-[.2em] uppercase font-semibold text-white/90 mb-4">Capabilities</h3>
              <ul className="list-none p-0 m-0 flex flex-col gap-3 text-[.8rem] text-white/60 leading-snug">
                <li className="flex gap-2.5"><GoldCheck /><span>RAG, agents, chatbots, automations</span></li>
                <li className="flex gap-2.5"><GoldCheck /><span>Python, FastAPI, React, TS, LangChain</span></li>
                <li className="flex gap-2.5"><GoldCheck /><span>n8n, Qdrant, FAISS, Neo4j</span></li>
                <li className="flex gap-2.5"><GoldCheck /><span>Leadership: AI Club President</span></li>
              </ul>
            </div>
          </div>
          <Divider />
        </section>

        {/* Section 3: My Story — timeline */}
        <section className="abt-section mb-16">
          <SectionEyebrow index="02" label="My Story" />
          <div className="relative pl-8">
            <div className="absolute top-1 bottom-1 left-[5px] w-[1px]" style={{ background: 'rgba(255,255,255,0.1)' }} />
            <div className="flex flex-col gap-9">
              {timeline.map((item, i) => (
                <div key={i} className="relative">
                  <span
                    className="absolute -left-8 top-1 w-[11px] h-[11px] rounded-full"
                    style={{ background: '#000', border: `2px solid ${GOLD}` }}
                  />
                  <p className="font-body text-[.68rem] tracking-[.15em] uppercase font-semibold mb-2" style={{ color: GOLD }}>
                    {item.era}
                  </p>
                  <p className="font-body text-sm md:text-base text-white/65 font-light leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <Divider />
        </section>

        {/* Section 4: How I Work */}
        <section className="abt-section mb-16">
          <SectionEyebrow index="03" label="How I Work" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workItems.map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-xl relative overflow-hidden transition-all duration-300"
                style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'; e.currentTarget.style.background = 'rgba(201,168,76,0.03)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(255,255,255,0.015)'; }}
              >
                <div className="mb-3">{workIcons[item.icon]}</div>
                <span className="font-body text-xs tracking-wider text-white font-semibold block mb-2">{item.title}</span>
                <p className="font-body text-xs text-white/50 leading-relaxed font-light">{item.body}</p>
              </div>
            ))}
          </div>
          <Divider />
        </section>

        {/* Section 5: What I'm Looking For */}
        <section className="abt-section mb-16">
          <SectionEyebrow index="04" label="What I'm Looking For" />
          <div className="flex flex-col gap-6 text-sm md:text-base text-white/65 font-light leading-relaxed">
            <p>
              I'm seeking full-time opportunities in Canada where I can help organizations turn AI ideas into dependable and useful systems.
            </p>
            <div>
              <p className="font-semibold text-white text-sm mb-3">Roles of interest include:</p>
              <div className="flex flex-wrap gap-2">
                {roles.map((role, i) => (
                  <span
                    key={i}
                    className="font-body text-[.7rem] px-3.5 py-2 rounded-full"
                    style={{ border: '1px solid rgba(201,168,76,0.3)', color: 'rgba(255,255,255,0.75)', background: 'rgba(201,168,76,0.04)' }}
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
            <p>
              I hold a valid Canadian work permit and do not require sponsorship to begin working. I'm open to opportunities across Canada, including hybrid and remote roles.
            </p>
            <p>
              I'm currently based between Toronto and India while completing current client commitments, and I'm available to begin working in Canada.
            </p>

            {/* CTA bar */}
            <div className="flex flex-wrap items-center gap-3 mt-4 pt-6 border-t border-white/5">
              <a
                href="/resume.pdf"
                download="Anisha-Singla-Resume.pdf"
                className="btn-gold"
                style={{ padding: '1rem 2rem', fontSize: '.7rem' }}
              >
                View Resume
              </a>
              <button
                onClick={() => navigateToSection('projects')}
                className="btn-outline"
                style={{ padding: '1rem 2rem', fontSize: '.7rem' }}
              >
                View Projects
              </button>
              <a
                href={emailHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body flex items-center gap-2 transition-colors duration-300"
                style={{ fontSize: '.7rem', letterSpacing: '.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}
                onMouseEnter={e => e.currentTarget.style.color = GOLD}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
              >
                Email Me
              </a>
              <a
                href={linkedInHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body flex items-center gap-2 transition-colors duration-300"
                style={{ fontSize: '.7rem', letterSpacing: '.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}
                onMouseEnter={e => e.currentTarget.style.color = GOLD}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
              >
                LinkedIn
              </a>
            </div>
          </div>
          <Divider />
        </section>

        {/* Section 6: Beyond Work */}
        <section className="abt-section mb-20">
          <SectionEyebrow index="05" label="Beyond Work" />
          <div className="flex flex-col gap-5 text-sm md:text-base text-white/65 font-light leading-relaxed">
            <p>
              Outside of client projects, I remain involved in technology, entrepreneurship, and professional communities. I'm a Charter Member of TiE Chandigarh, a Community Coordinator with Connect Circles, and I write about applied AI on Medium.
            </p>
            <p>
              Mentorship and community-building have remained important throughout my career, from supporting student founders to leading the AI Club at George Brown College.
            </p>
          </div>
        </section>

        {/* Footer Back button */}
        <div className="abt-section mt-10 flex justify-center">
          <button
            onClick={() => navigateTo(ROUTES.HOME)}
            className="font-body flex items-center gap-3 transition-all duration-300"
            style={{
              fontWeight: 600, fontSize: '.72rem', letterSpacing: '.2em', textTransform: 'uppercase',
              color: GOLD, padding: '.9rem 3rem',
              border: '1px solid rgba(201,168,76,0.4)', background: 'transparent', cursor: 'pointer',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = '#000'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = GOLD; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>
        </div>

      </div>
    </div>
  );
}