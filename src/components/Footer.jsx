import { navigateTo, navigateToSection, ROUTES } from '../routes';

const links = [
  { label: 'Home', type: 'section', target: 'home' },
  { label: 'About', type: 'section', target: 'about' },
  { label: 'Services', type: 'section', target: 'services' },
  { label: 'Experience', type: 'section', target: 'experience' },
  { label: 'Projects', type: 'section', target: 'projects' },
  { label: 'Education', type: 'section', target: 'education' },
  { label: 'Skills', type: 'section', target: 'skills' },
  { label: 'Case Studies', type: 'route', target: ROUTES.CASE_STUDIES },
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

  return (
    <footer className="py-10 px-6 md:px-14" style={{borderTop:'1px solid rgba(201,168,76,0.15)',background:'#000'}}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="font-title text-xl tracking-[.3em] text-gold cursor-pointer"
          style={{fontFamily:"'Bebas Neue',sans-serif"}} onClick={() => go(links[0])}>ANISHA.</span>

        <div className="flex flex-wrap justify-center gap-6">
          {links.map(l => (
            <button key={l.label} onClick={() => go(l)}
              className="font-body text-xs tracking-widest uppercase hover:text-gold transition-colors"
              style={{color:'rgba(255,255,255,0.6)'}}>
              {l.label}
            </button>
          ))}
        </div>

        <a href="https://www.linkedin.com/in/singlaanisha" target="_blank" rel="noreferrer"
          className="text-gray-200 hover:text-gold transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
            <circle cx="4" cy="4" r="2"/>
          </svg>
        </a>
      </div>
      <div className="max-w-7xl mx-auto mt-6 pt-6" style={{borderTop:'1px solid rgba(255,255,255,0.05)'}}>
        <p className="font-body text-xs text-center" style={{color:'rgba(255,255,255,0.6)',letterSpacing:'.1em'}}>
          © 2026 Anisha Singla. All rights reserved. · Teeny Tech Trek
        </p>
      </div>
    </footer>
  );
}
