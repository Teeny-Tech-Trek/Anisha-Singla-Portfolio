import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { navigateTo, navigateToSection, ROUTES } from '../routes';
import { useTheme } from '../context/ThemeContext';

const links = [
  { label: 'Home', type: 'section', target: 'home' },
  { label: 'About', type: 'section', target: 'about' },
  { label: 'Capabilities', type: 'section', target: 'capabilities' },
  { label: 'Experience', type: 'section', target: 'experience' },
  { label: 'Education', type: 'section', target: 'education' },
  { label: 'Skills', type: 'section', target: 'skills' },
  { label: 'Volunteer', type: 'section', target: 'volunteer' },
  { label: 'Projects', type: 'section', target: 'projects' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const { toggle, isDark } = useTheme();

  // Scroll detection for sticky header background
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // GSAP entrance
  useEffect(() => {
    const tween = gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    );
    return () => tween.kill();
  }, []);

  const go = (link) => {
    setOpen(false);
    if (link.type === 'route') {
      navigateTo(link.target);
      return;
    }
    navigateToSection(link.target);
  };

  const hrefFor = (link) => (link.type === 'route' ? link.target : `/#${link.target}`);

  // Text colours - Pure white on Hero (unscrolled) or in dark mode for maximum contrast against hero & dark sections
  const isLightScrolled = !isDark && scrolled;
  const linkColor = isLightScrolled ? '#1f2937' : '#FFFFFF';
  const logoColor = isLightScrolled ? '#111827' : '#FFFFFF';

  // Projects button colors
  const projectsBorder = isLightScrolled ? '#2563EB' : 'rgba(255, 255, 255, 0.55)';
  const projectsColor = isLightScrolled ? '#1D4ED8' : '#FFFFFF';
  const projectsBg = isLightScrolled ? 'rgba(37, 99, 235, 0.08)' : 'rgba(255, 255, 255, 0.14)';

  // Theme toggle button colors
  const toggleBorder = isLightScrolled ? 'rgba(0,0,0,0.15)' : 'rgba(255, 255, 255, 0.4)';
  const toggleColor = isLightScrolled ? '#1f2937' : '#FFFFFF';
  const toggleBg = isLightScrolled ? 'rgba(0,0,0,0.05)' : 'rgba(255, 255, 255, 0.14)';

  return (
    <header>
      <nav
        ref={navRef}
        data-scroll-header
        className="fixed top-0 left-0 right-0 z-50 w-full max-w-full overflow-x-hidden transition-all duration-300"
        style={{
          background: 'transparent',
          border: 'none',
          borderBottom: 'none',
        }}
      >
        {/* Blur Fade Backdrop - Appears smoothly on scroll with no fixed solid bar or border */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            opacity: scrolled ? 1 : 0,
            background: isDark
              ? 'linear-gradient(to bottom, rgba(7, 36, 80, 0.85) 0%, rgba(7, 36, 80, 0.42) 60%, transparent 100%)'
              : 'linear-gradient(to bottom, rgba(250, 248, 245, 0.9) 0%, rgba(250, 248, 245, 0.48) 60%, transparent 100%)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            maskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)',
            border: 'none',
            borderBottom: 'none',
            outline: 'none',
            transition: 'opacity 0.35s ease, background 0.35s ease',
          }}
        />
        <div data-scroll-bar className="mx-auto flex w-full max-w-7xl min-w-0 items-center justify-between px-5 py-5 sm:px-8 md:px-14">
          {/* Logo */}
          <span
            className="max-w-[70vw] shrink min-w-0 cursor-pointer whitespace-nowrap font-title text-2xl tracking-[.25em] sm:text-3xl sm:tracking-[.3em] font-extrabold transition-colors duration-200"
            style={{
              color: logoColor,
              textShadow: isLightScrolled ? 'none' : '0 2px 12px rgba(0,0,0,0.4)',
            }}
            onClick={() => navigateToSection('home')}
          >
            ANISHA.
          </span>

          {/* Desktop links */}
          <ul className="hidden xl:flex items-center gap-6">
            {links.map((link) =>
              link.label === 'Projects' ? (
                <li key={link.label}>
                  <a
                    href={hrefFor(link)}
                    onClick={(e) => {
                      e.preventDefault();
                      go(link);
                    }}
                    className="font-body text-xs font-semibold rounded-lg tracking-widest uppercase px-4 py-2 transition-all duration-200 border"
                    style={{
                      borderColor: projectsBorder,
                      color: projectsColor,
                      background: projectsBg,
                      backdropFilter: isLightScrolled ? 'none' : 'blur(8px)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = isLightScrolled ? '#2563EB' : '#FFFFFF';
                      e.currentTarget.style.color = isLightScrolled ? '#FFFFFF' : '#072450';
                      e.currentTarget.style.borderColor = isLightScrolled ? '#2563EB' : '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = projectsBg;
                      e.currentTarget.style.color = projectsColor;
                      e.currentTarget.style.borderColor = projectsBorder;
                    }}
                  >
                    Projects
                  </a>
                </li>
              ) : (
                <li key={link.label}>
                  <a
                    href={hrefFor(link)}
                    onClick={(e) => {
                      e.preventDefault();
                      go(link);
                    }}
                    className="group relative inline-flex min-h-[40px] items-center font-body text-xs font-semibold tracking-widest uppercase transition-colors"
                    style={{
                      color: linkColor,
                      textShadow: isLightScrolled ? 'none' : '0 1px 8px rgba(0,0,0,0.35)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = isLightScrolled ? '#2563EB' : '#FFFFFF')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = linkColor)}
                  >
                    <span>{link.label}</span>
                    <span
                      className="absolute -bottom-1 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full"
                      style={{ background: isLightScrolled ? '#2563EB' : '#FFFFFF' }}
                    />
                  </a>
                </li>
              )
            )}

            {/* Theme Toggle Button */}
            <li>
              <button
                onClick={toggle}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 shadow-sm"
                style={{
                  borderColor: toggleBorder,
                  color: toggleColor,
                  background: toggleBg,
                  backdropFilter: 'blur(8px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = isLightScrolled ? '#2563EB' : 'rgba(255, 255, 255, 0.8)';
                  e.currentTarget.style.background = isLightScrolled ? 'rgba(37, 99, 235, 0.12)' : 'rgba(255, 255, 255, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = toggleBorder;
                  e.currentTarget.style.background = toggleBg;
                }}
              >
                {isDark ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
              </button>
            </li>
          </ul>

          {/* Mobile controls */}
          <div className="flex items-center gap-3 xl:hidden">
            <button
              onClick={toggle}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-200"
              style={{
                borderColor: toggleBorder,
                color: toggleColor,
                background: toggleBg,
                backdropFilter: 'blur(8px)',
              }}
            >
              {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
            </button>

            <button
              className="flex items-center justify-center w-10 h-10 rounded-lg transition-colors"
              style={{ color: toggleColor }}
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {open && (
          <div
            className="flex w-full max-w-full flex-col gap-4 overflow-x-hidden border-t px-6 py-6 xl:hidden"
            style={{
              background: isDark ? 'rgba(7, 36, 80, 0.98)' : 'rgba(250, 248, 245, 0.98)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0,0,0,0.08)',
              backdropFilter: 'blur(16px)',
            }}
          >
            {links.map((link) =>
              link.label === 'Projects' ? (
                <a
                  key={link.label}
                  href={hrefFor(link)}
                  onClick={(e) => {
                    e.preventDefault();
                    go(link);
                  }}
                  className="font-body text-sm font-semibold tracking-widest uppercase text-center rounded-lg border py-2.5 px-4 mt-1 transition-all duration-200"
                  style={{
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.45)' : '#2563EB',
                    color: isDark ? '#FFFFFF' : '#1D4ED8',
                    background: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(37, 99, 235, 0.08)',
                  }}
                >
                  Projects
                </a>
              ) : (
                <a
                  key={link.label}
                  href={hrefFor(link)}
                  onClick={(e) => {
                    e.preventDefault();
                    go(link);
                  }}
                  className="font-body text-sm font-semibold tracking-widest uppercase text-left transition-colors py-1"
                  style={{ color: isDark ? '#FFFFFF' : '#1f2937' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = isDark ? 'rgba(255, 255, 255, 0.8)' : '#2563EB')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = isDark ? '#FFFFFF' : '#1f2937')}
                >
                  {link.label}
                </a>
              )
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
