import { navigateTo, navigateToSection, ROUTES } from '../routes';
import SocialBar from './SocialBar';

const links = [
  { label: 'Home', type: 'section', target: 'home' },
  { label: 'About', type: 'section', target: 'about' },
  { label: 'Services', type: 'section', target: 'services' },
  { label: 'Experience', type: 'section', target: 'experience' },
  { label: 'Projects', type: 'section', target: 'projects' },
  { label: 'Education', type: 'section', target: 'education' },
  { label: 'Skills', type: 'section', target: 'skills' },
  { label: 'Volunteer', type: 'section', target: 'volunteer' },
  // { label: 'Case Studies', type: 'route', target: ROUTES.CASE_STUDIES },
  { label: 'Contact', type: 'section', target: 'contact' },
];

export default function Footer() {
  const go = (link) => {
    if (link.type === 'route') {
      navigateTo(link.target);
      return;
    }

    navigateToSection(link.target);
  };

  // Same href convention as Navbar.jsx -- route links get their route path,
  // section links get "/#sectionId". Not used for "Contact": that target id
  // doesn't exist in the live DOM (Contact.jsx is never mounted), so it stays
  // a plain button rather than pointing at a fake anchor.
  const hrefFor = (link) => (link.type === 'route' ? link.target : `/#${link.target}`);

  return (
    <footer className="py-10 px-6 md:px-14" style={{
      borderTop:'1px solid rgba(201,168,76,0.15)', background:'#000',
      // Footer has no GSAP/ScrollTrigger tied to it, so it's safe to skip its
      // rendering work entirely while off-screen — browser un-skips it (and
      // paints normally) once it's near the viewport.
      contentVisibility: 'auto', containIntrinsicSize: 'auto 220px',
    }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="font-title text-xl tracking-[.3em] text-gold cursor-pointer"
          style={{fontFamily:"'Bebas Neue',sans-serif"}} onClick={() => go(links[0])}>ANISHA.</span>

        <div className="flex flex-wrap justify-center gap-6">
          {links.map(l => (
            l.target === 'contact' ? (
              <button key={l.label} onClick={() => go(l)}
                className="font-body text-xs tracking-widest uppercase hover:text-gold transition-colors"
                style={{color:'rgba(255,255,255,0.6)'}}>
                {l.label}
              </button>
            ) : (
              <a key={l.label} href={hrefFor(l)} onClick={(e) => { e.preventDefault(); go(l); }}
                className="font-body text-xs tracking-widest uppercase hover:text-gold transition-colors"
                style={{color:'rgba(255,255,255,0.6)'}}>
                {l.label}
              </a>
            )
          ))}
        </div>

        <SocialBar size="sm" />
      </div>
     <div className="max-w-7xl mx-auto mt-6 pt-6" style={{borderTop:'1px solid rgba(255,255,255,0.05)'}}>
  <p className="font-body text-xs text-center" style={{color:'rgba(255,255,255,0.6)',letterSpacing:'.1em'}}>
    © 2026 Anisha Singla. All rights reserved.
  </p>
</div>
    </footer>
  );
}
