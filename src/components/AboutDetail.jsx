import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { navigateTo, ROUTES } from '../routes';
import { socials } from '../data/socials';
import { useSeo } from '../hooks/useSeo';
import { SEO } from '../seo/seoConfig';

const GOLD = '#FFFFFF';
const GOLD_SOFT = 'rgba(255,255,255,0.35)';
const TITLE_FONT = "'Bebas Neue', sans-serif";

const linkedInHref = socials.find(s => s.label === 'LinkedIn')?.href || 'https://www.linkedin.com/in/singlaanisha';

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
      <h2 className="font-body text-xs tracking-[.25em] uppercase font-semibold text-white/70 m-0">
        {label}
      </h2>
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
  { icon: 'target', title: 'Business problem first', body: 'Every engagement starts with the question the client has not asked yet, a written scope, and acceptance criteria with concrete input and output examples including failure cases.' },
  { icon: 'grid', title: 'Scope & trade-off discipline', body: 'I have said no to features more often than yes, and every no comes with the trade-off written down so delivery stays focused and predictable.' },
  { icon: 'shield', title: 'Clear BA/engineering boundary', body: 'I run discovery, write specifications, set priorities, and verify acceptance. I do not write production code — and being clear about that line is what makes me useful between the business and engineering teams.' },
  { icon: 'chat', title: 'Adoption beyond launch', body: 'An AI solution only succeeds when business users adopt it. I author SOPs, run interactive training workshops, and establish handover owners so workflows survive.' },
];

const timeline = [
  { era: '2017 – 2021 · Engineering Foundation', text: 'Graduated with a Bachelor of Technology in Computer Engineering from CGC Jhanjeri, developing an understanding of technical architectures and systems logic.' },
  { era: '2021 – 2022 · IT Implementation & Coordination', text: 'At Appu International, evaluated options and recommended an inventory and production-tracking system; cleaned master data, reconciled physical stock counts, authored SOPs, and trained staff.' },
  { era: '2022 – 2024 · Toronto Postgraduate Studies', text: 'Completed two graduate certificates at George Brown College: Applied AI Solutions Development and Project Management, earning Dean’s Honour List standing across all four terms.' },
  { era: '2023 · startGBC & AI Leadership', text: 'Served as Support Advisor at startGBC, authoring the Entrepreneurship Club’s constitution and operating plan. Served as Vice President and later President of George Brown’s AI Club.' },
  { era: '2024 – 2026 · Project Manager, Appu International', text: 'Managed domestic and international client handling, RFQ costings, and export operations. Designed five process automations across quotation, order tracking, and production reporting.' },
  { era: 'Sep 2024 – Present · Founder & AI Strategist, Teeny Tech Trek', text: 'Founded a boutique AI consultancy delivering 15 engagements for 10 clients across six industries (retrieval-augmented assistants, workflow automation, and custom AI applications) with a team of up to five engineers. The firm runs day-to-day under its team lead; I own clients, priorities, and budget.' },
  { era: 'Sep 2026 – Present · Toronto & Rotman', text: 'Joined APT Growth Digital in Toronto as an AI-Powered Digital Marketing Consultant (AEO/GEO optimization), while completing Generative and Agentic AI for Business at the Rotman School of Management, University of Toronto.' },
];

const roles = [
  'AI Business Analyst',
  'AI Implementation Specialist',
  'AI Enablement Specialist',
  'Business Systems Analyst (AI)',
  'AI Solutions Consultant',
  'Technical Project Manager (AI)',
];

export default function AboutDetail() {
  useSeo(SEO.about);

  const pageRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: .5, ease: 'power2.out' });
      gsap.fromTo('.abt-hero', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .9, ease: 'power3.out', stagger: .1, delay: 0.15 });
      gsap.fromTo('.abt-section', { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: .7, ease: 'power3.out', stagger: 0.1, delay: 0.3 });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;

    const start = async () => {
      video.muted = false;
      try {
        await video.play();
      } catch {
        if (cancelled) return;
        video.muted = true;
        video.play().catch(() => {});
      }
    };

    start();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen pt-24 pb-20 px-6 md:px-14 relative" style={{ background: '#072450' }}>

      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div style={{
          position: 'absolute', top: '10%', left: '-5%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(255,255,255,0.05) 0%,transparent 70%)',
          filter: 'blur(80px)', contain: 'paint',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '-5%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(100,150,255,0.04) 0%,transparent 70%)',
          filter: 'blur(80px)', contain: 'paint',
        }} />
      </div>

      <main className="max-w-6xl mx-auto relative z-10">

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
              style={{ border: '1px solid rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.02)', boxShadow: '0 30px 60px -20px rgba(0,0,0,0.6)' }}
            >
              <div className="aspect-[9/16] w-full relative">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  src="https://arbgtqtruugewk5g.public.blob.vercel-storage.com/AboutUsVideo/AboutMe.mp4"
                  loop
                  playsInline
                  controls
                  preload="auto"
                />
              </div>
              {/* corner accent */}
              <div
                className="absolute top-3 right-3 px-2.5 py-1 rounded-full font-body text-[.6rem] tracking-[.15em] uppercase font-semibold"
                style={{ background: 'rgba(0,0,0,0.55)', color: GOLD, border: '1px solid rgba(255,255,255,0.35)', backdropFilter: 'blur(4px)' }}
              >
                Intro
              </div>
            </div>
          </div>

          {/* Header + intro text */}
          <div>
            <p className="font-body text-xs tracking-[.35em] uppercase mb-2 font-semibold" style={{ color: GOLD }}>
              Profile &amp; Story
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
              <p className="font-body text-base md:text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 400 }}>
                I turn ambiguous business problems into AI implementations that teams actually adopt: the discovery, the requirements and acceptance criteria, the coordination of engineers and vendors, and the acceptance review at the end.
              </p>
              <p className="font-body text-sm md:text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>
                I hold postgraduate credentials in Applied AI Solutions Development and Project Management from George Brown College in Toronto (both Dean’s Honour List), and a B.Tech in Computer Engineering. As founder of Teeny Tech Trek, I ran client discovery, scoping, proposals, budgets, and acceptance for 15 engagements across six industries, working with a team of up to five engineers building the solutions.
              </p>
              <p className="font-body text-sm md:text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>
                My professional strength is combining business analysis discipline with practical AI understanding — defining measurable business value, scoping concrete input and output criteria, coordinating technical teams, and ensuring non-technical stakeholders adopt the resulting workflows.
              </p>

              {/* Quick stat strip */}
              <div className="flex flex-wrap gap-8 mt-4 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div>
                  <p className="font-title text-white" style={{ fontFamily: TITLE_FONT, fontSize: '2rem', lineHeight: 1 }}>10</p>
                  <p className="font-body text-[.65rem] tracking-[.15em] uppercase text-white/45 mt-1.5">Clients Delivered</p>
                </div>
                <div>
                  <p className="font-title text-white" style={{ fontFamily: TITLE_FONT, fontSize: '2rem', lineHeight: 1 }}>15</p>
                  <p className="font-body text-[.65rem] tracking-[.15em] uppercase text-white/45 mt-1.5">Engagements</p>
                </div>
                <div>
                  <p className="font-title text-white" style={{ fontFamily: TITLE_FONT, fontSize: '2rem', lineHeight: 1 }}>6</p>
                  <p className="font-body text-[.65rem] tracking-[.15em] uppercase text-white/45 mt-1.5">Industries</p>
                </div>
                <div>
                  <p className="font-title text-white" style={{ fontFamily: TITLE_FONT, fontSize: '2rem', lineHeight: 1 }}>2 YRS</p>
                  <p className="font-body text-[.65rem] tracking-[.15em] uppercase text-white/45 mt-1.5">AI Consultancy</p>
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
              <h3 className="font-body text-xs tracking-[.2em] uppercase font-semibold text-white/90 mb-4">Background &amp; Experience</h3>
              <ul className="list-none p-0 m-0 flex flex-col gap-3 text-[.8rem] text-white/60 leading-snug">
                <li className="flex gap-2.5"><GoldCheck /><span><strong className="text-white/85 font-medium">Founder &amp; AI Strategist, Teeny Tech Trek</strong> &mdash; 15 engagements, 10 clients across six industries (team of up to 5 engineers)</span></li>
                <li className="flex gap-2.5"><GoldCheck /><span><strong className="text-white/85 font-medium">Project Manager, Appu International</strong> &mdash; 5 process automations, export documentation process &amp; logistics</span></li>
                <li className="flex gap-2.5"><GoldCheck /><span><strong className="text-white/85 font-medium">AI-Powered Consultant, APT Growth Digital</strong> &mdash; AEO/GEO answer-engine visibility &amp; audits in Toronto</span></li>
                <li className="flex gap-2.5"><GoldCheck /><span>Postgraduate credentials in Applied AI Solutions &amp; Project Management (George Brown College, Dean's Honour List, all 4 terms)</span></li>
                <li className="flex gap-2.5"><GoldCheck /><span>Rotman School of Management &mdash; Generative and Agentic AI for Business (in progress)</span></li>
                <li className="flex gap-2.5"><GoldCheck /><span>Authorized to work in Canada &mdash; valid PGWP, no sponsorship required</span></li>
              </ul>
            </div>

            <div className="p-7">
              <h3 className="font-body text-xs tracking-[.2em] uppercase font-semibold text-white/90 mb-4">Core Competencies</h3>
              <ul className="list-none p-0 m-0 flex flex-col gap-3 text-[.8rem] text-white/60 leading-snug">
                <li className="flex gap-2.5"><GoldCheck /><span>Business Analysis &amp; Requirements Elicitation</span></li>
                <li className="flex gap-2.5"><GoldCheck /><span>User Stories, Acceptance Criteria &amp; Failure-Case Design</span></li>
                <li className="flex gap-2.5"><GoldCheck /><span>Delivery Coordination &amp; Release Acceptance (Jira, ClickUp)</span></li>
                <li className="flex gap-2.5"><GoldCheck /><span>AI Adoption, SOP Authoring &amp; Change Management</span></li>
                <li className="flex gap-2.5"><GoldCheck /><span>Data Modelling for PostgreSQL &amp; MongoDB</span></li>
                <li className="flex gap-2.5"><GoldCheck /><span>Model Selection (Anthropic, OpenAI, Gemini, Azure OpenAI)</span></li>
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
                    style={{ background: '#072450', border: `2px solid ${GOLD}` }}
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
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
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
              I'm seeking full-time AI Business Analyst, AI Implementation, and AI Enablement roles in the Greater Toronto Area (or Remote in Canada) where owning requirements and seeing an AI implementation through to adoption is the whole job.
            </p>
            <div>
              <p className="font-semibold text-white text-sm mb-3">Target Roles:</p>
              <div className="flex flex-wrap gap-2">
                {roles.map((role, i) => (
                  <span
                    key={i}
                    className="font-body text-[.7rem] px-3.5 py-2 rounded-full"
                    style={{ border: '1px solid rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.85)', background: 'rgba(255,255,255,0.05)' }}
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
            <p>
              I hold a valid Post-Graduation Work Permit (PGWP) and need no sponsorship. I am currently completing Generative and Agentic AI for Business at the Rotman School of Management, University of Toronto (December 2026).
            </p>

            {/* CTA bar */}
            <div className="flex flex-wrap items-center gap-3 mt-4 pt-6 border-t border-white/5">
              <a
                href="https://arbgtqtruugewk5g.public.blob.vercel-storage.com/Anisha_Singla_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
                style={{ padding: '0.85rem 1.8rem', fontSize: '.72rem' }}
              >
                View Resume
              </a>
              <a
                href={linkedInHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ padding: '0.85rem 1.8rem', fontSize: '.72rem' }}
              >
                View LinkedIn
              </a>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
