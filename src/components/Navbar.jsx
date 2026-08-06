import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';
import { navigateTo, navigateToSection, ROUTES } from '../routes';

const links = [
  { label: 'Home', type: 'section', target: 'home' },
  { label: 'About', type: 'section', target: 'about' },
  { label: 'Services', type: 'section', target: 'services' },
  { label: 'Experience', type: 'section', target: 'experience' },
  { label: 'Education', type: 'section', target: 'education' },
  { label: 'Skills', type: 'section', target: 'skills' },
  { label: 'Volunteer', type: 'section', target: 'volunteer' },
  // { label: 'Contact', type: 'section', target: 'contact' },
  { label: 'Projects', type: 'section', target: 'projects' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);

  // GSAP entrance
  useEffect(() => {
    const tween = gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    );
    return () => tween.kill();
  }, []);

  // rAF-throttled scroll listener: native `scroll` can fire faster than the
  // display refresh rate, so we coalesce to at most one check per frame and
  // only touch state (triggering a re-render) when the threshold actually
  // flips, instead of on every scroll event.
  useEffect(() => {
    const scrolledRef = { current: false };
    let frameId = 0;

    const checkScroll = () => {
      frameId = 0;
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolledRef.current) {
        scrolledRef.current = isScrolled;
        setScrolled(isScrolled);
      }
    };

    const onScroll = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(checkScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  const go = (link) => {
    setOpen(false);

    if (link.type === 'route') {
      navigateTo(link.target);
      return;
    }

    navigateToSection(link.target);
  };

  // Real, followable href per link -- route links point at the route path,
  // section links point at "/#sectionId" (all section ids live on the home
  // page). Click handlers still preventDefault() and drive navigation
  // through go()/navigateTo()/navigateToSection(), so SPA behavior (no full
  // reload, Lenis-smooth scroll) is unchanged -- this just gives crawlers
  // and "open in new tab" a real destination to follow.
  const hrefFor = (link) => (link.type === 'route' ? link.target : `/#${link.target}`);

  return (
    <header>
    <nav ref={navRef}
      data-scroll-header
      className="fixed top-0 left-0 right-0 z-50 w-full max-w-full overflow-x-hidden transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(0,0,0,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(18px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : '1px solid transparent',
      }}
    >
      <div className="mx-auto flex w-full max-w-7xl min-w-0 items-center justify-between px-4 py-5 sm:px-6 md:px-14">
        <span className="max-w-[70vw] shrink min-w-0 cursor-pointer whitespace-nowrap font-title text-lg tracking-[.18em] text-gold sm:text-2xl sm:tracking-[.3em]"
          onClick={() => navigateToSection('home')}>ANISHA.</span>

        {/* desktop — full horizontal nav only once there's room for all
            links + the logo (~1060px). Below xl we use the hamburger so the
            links never overlap the logo at tablet / small-laptop widths. */}
        <ul className="hidden xl:flex items-center gap-8">
          {links.map(link => link.label === 'Projects' ? (
            <li key={link.label}>
              <a href={hrefFor(link)} onClick={(e) => { e.preventDefault(); go(link); }}
                className="font-body text-xs rounded-lg tracking-widest uppercase border border-gold text-gold px-5 py-[14px] transition-all duration-300 hover:bg-gold hover:text-black">
                Projects
              </a>
            </li>
          ) : (
            <li key={link.label}>
              <a href={hrefFor(link)} onClick={(e) => { e.preventDefault(); go(link); }}
                className="group inline-flex min-h-[44px] items-center font-body text-xs tracking-widest uppercase text-gray-400 hover:text-gold transition-colors">
                <span className="relative">
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* hamburger */}
        <button
          className="ml-4 shrink-0 text-gold xl:hidden flex items-center justify-center min-w-[44px] min-h-[44px]"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <div className="flex w-full max-w-full flex-col gap-5 overflow-x-hidden border-t border-gold/10 bg-black/95 px-5 py-6 sm:px-6 xl:hidden">
          {links.map(link => (
            <a key={link.label} href={hrefFor(link)} onClick={(e) => { e.preventDefault(); go(link); }}
              className="font-body text-sm tracking-widest uppercase text-gray-300 hover:text-gold text-left transition-colors">
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
    </header>
  );
}
