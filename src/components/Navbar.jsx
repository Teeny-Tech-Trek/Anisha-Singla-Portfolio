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
  const navRef = useRef(null);
  const { toggle, isDark } = useTheme();

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

  // Text colours
  const linkColor = isDark ? '#d1d5db' : '#1f2937';
  const logoColor = isDark ? '#C9A84C' : '#111827';

  return (
    <header>
      <nav
        ref={navRef}
        data-scroll-header
        className="fixed top-0 left-0 right-0 z-50 w-full max-w-full overflow-x-hidden"
        style={{
          background: 'transparent',
          border: 'none',
          borderBottom: 'none',
        }}
      >
        {/* Blur Fade Background without any border */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: isDark
              ? 'linear-gradient(to bottom, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.45) 60%, transparent 100%)'
              : 'linear-gradient(to bottom, rgba(250, 248, 245, 0.92) 0%, rgba(250, 248, 245, 0.5) 60%, transparent 100%)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            maskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)',
            border: 'none',
            outline: 'none',
          }}
        />
        <div className="mx-auto flex w-full max-w-7xl min-w-0 items-center justify-between px-5 py-5 sm:px-8 md:px-14">
          {/* Logo */}
          <span
            className="max-w-[70vw] shrink min-w-0 cursor-pointer whitespace-nowrap font-title text-2xl tracking-[.25em] sm:text-3xl sm:tracking-[.3em] font-extrabold transition-colors duration-200"
            style={{ color: logoColor }}
            onClick={() => navigateToSection('home')}
          >
            ANISHA.
          </span>

          {/* Desktop links */}
          <ul className="hidden xl:flex items-center gap-7">
            {links.map((link) =>
              link.label === 'Projects' ? (
                <li key={link.label}>
                  <a
                    href={hrefFor(link)}
                    onClick={(e) => {
                      e.preventDefault();
                      go(link);
                    }}
                    className="font-body text-xs font-semibold rounded-lg tracking-widest uppercase px-5 py-2.5 transition-all duration-200 border"
                    style={{
                      borderColor: isDark ? '#C9A84C' : '#2563EB',
                      color: isDark ? '#C9A84C' : '#1D4ED8',
                      background: isDark ? 'transparent' : 'rgba(37, 99, 235, 0.08)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = isDark ? '#C9A84C' : '#2563EB';
                      e.currentTarget.style.color = isDark ? '#000000' : '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = isDark ? 'transparent' : 'rgba(37, 99, 235, 0.08)';
                      e.currentTarget.style.color = isDark ? '#C9A84C' : '#1D4ED8';
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
                    className="group relative inline-flex min-h-[40px] items-center font-body text-xs font-medium tracking-widest uppercase transition-colors"
                    style={{ color: linkColor }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = isDark ? '#C9A84C' : '#2563EB')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = linkColor)}
                  >
                    <span>{link.label}</span>
                    <span
                      className="absolute -bottom-1 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full"
                      style={{ background: isDark ? '#C9A84C' : '#2563EB' }}
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
                  borderColor: isDark ? 'rgba(201,168,76,0.4)' : 'rgba(0,0,0,0.15)',
                  color: isDark ? '#E8C97A' : '#1f2937',
                  background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.4)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = isDark ? '#C9A84C' : '#2563EB';
                  e.currentTarget.style.background = isDark ? 'rgba(201,168,76,0.2)' : 'rgba(37, 99, 235, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = isDark ? 'rgba(201,168,76,0.4)' : 'rgba(0,0,0,0.15)';
                  e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.4)';
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
                borderColor: isDark ? 'rgba(201,168,76,0.4)' : 'rgba(0,0,0,0.15)',
                color: isDark ? '#E8C97A' : '#1f2937',
                background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.4)',
              }}
            >
              {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
            </button>

            <button
              className="flex items-center justify-center w-10 h-10 rounded-lg transition-colors"
              style={{ color: isDark ? '#C9A84C' : '#1f2937' }}
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
              background: isDark ? 'rgba(10,10,10,0.96)' : 'rgba(250,248,245,0.98)',
              borderColor: isDark ? 'rgba(201,168,76,0.15)' : 'rgba(0,0,0,0.08)',
              backdropFilter: 'blur(16px)',
            }}
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={hrefFor(link)}
                onClick={(e) => {
                  e.preventDefault();
                  go(link);
                }}
                className="font-body text-sm font-semibold tracking-widest uppercase text-left transition-colors py-1"
                style={{ color: isDark ? '#e5e7eb' : '#1f2937' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = isDark ? '#C9A84C' : '#2563EB')}
                onMouseLeave={(e) => (e.currentTarget.style.color = isDark ? '#e5e7eb' : '#1f2937')}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
