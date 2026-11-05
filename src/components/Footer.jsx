import { navigateTo, navigateToSection } from '../routes';
import SocialBar from './SocialBar';
import { useTheme } from '../context/ThemeContext';

const links = [
  { label: 'Home', type: 'section', target: 'home' },
  { label: 'About', type: 'section', target: 'about' },
  { label: 'Capabilities', type: 'section', target: 'capabilities' },
  { label: 'Experience', type: 'section', target: 'experience' },
  { label: 'Projects', type: 'section', target: 'projects' },
  { label: 'Education', type: 'section', target: 'education' },
  { label: 'Skills', type: 'section', target: 'skills' },
  { label: 'Volunteer', type: 'section', target: 'volunteer' },
  { label: 'Contact', type: 'section', target: 'contact' },
];

export default function Footer() {
  const { isDark } = useTheme();
  const accent = isDark ? '#C9A84C' : '#2563EB';

  const go = (link) => {
    if (link.type === 'route') {
      navigateTo(link.target);
      return;
    }

    navigateToSection(link.target);
  };

  const hrefFor = (link) => (link.type === 'route' ? link.target : `/#${link.target}`);

  return (
    <footer
      className="py-10 px-6 md:px-14"
      style={{
        borderTop: isDark ? '1px solid rgba(201,168,76,0.15)' : '1px solid rgba(0,0,0,0.08)',
        background: 'var(--bg-primary)',
        contentVisibility: 'auto',
        containIntrinsicSize: 'auto 220px',
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <span
          className="font-title text-xl tracking-[.3em] cursor-pointer"
          style={{ fontFamily: "'Bebas Neue',sans-serif", color: isDark ? '#C9A84C' : '#111827' }}
          onClick={() => go(links[0])}
        >
          ANISHA.
        </span>

        <div className="flex flex-wrap justify-center gap-6">
          {links.map((l) =>
            l.target === 'contact' ? (
              <button
                key={l.label}
                onClick={() => go(l)}
                className="font-body text-xs tracking-widest uppercase transition-colors"
                style={{ color: isDark ? 'rgba(255,255,255,0.6)' : '#4B5563' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
                onMouseLeave={(e) => (e.currentTarget.style.color = isDark ? 'rgba(255,255,255,0.6)' : '#4B5563')}
              >
                {l.label}
              </button>
            ) : (
              <a
                key={l.label}
                href={hrefFor(l)}
                onClick={(e) => {
                  e.preventDefault();
                  go(l);
                }}
                className="font-body text-xs tracking-widest uppercase transition-colors"
                style={{ color: isDark ? 'rgba(255,255,255,0.6)' : '#4B5563' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
                onMouseLeave={(e) => (e.currentTarget.style.color = isDark ? 'rgba(255,255,255,0.6)' : '#4B5563')}
              >
                {l.label}
              </a>
            )
          )}
        </div>

        <SocialBar size="sm" />
      </div>
      <div
        className="max-w-7xl mx-auto mt-6 pt-6"
        style={{ borderTop: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.06)' }}
      >
        <p
          className="font-body text-xs text-center"
          style={{ color: isDark ? 'rgba(255,255,255,0.6)' : '#6B7280', letterSpacing: '.1em' }}
        >
          © 2026 Anisha Singla. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
