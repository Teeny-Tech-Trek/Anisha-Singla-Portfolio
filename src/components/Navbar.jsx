import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';

const links = ['Home','About','Services','Projects','Experience','Education','Skills','Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const navRef = useRef(null);

  // GSAP entrance
  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0,   opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = (id) => {
    setOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 w-full max-w-full overflow-x-hidden transition-all duration-500"
      style={{
        background:    scrolled ? 'rgba(0,0,0,0.88)' : 'transparent',
        backdropFilter:scrolled ? 'blur(18px)'        : 'none',
        borderBottom:  scrolled ? '1px solid rgba(201,168,76,0.15)' : '1px solid transparent',
      }}
    >
      <div className="mx-auto flex w-full max-w-7xl min-w-0 items-center justify-between px-4 py-5 sm:px-6 md:px-14">
        <span className="max-w-[70vw] shrink min-w-0 cursor-pointer whitespace-nowrap font-title text-lg tracking-[.18em] text-gold sm:text-2xl sm:tracking-[.3em]"
          onClick={() => go('home')}>ANISHA.</span>

        {/* desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(l => l === 'Contact' ? (
            <li key={l}>
              <button onClick={() => go(l)}
                className="font-body text-xs tracking-widest uppercase border border-gold text-gold px-5 py-2 transition-all duration-300 hover:bg-gold hover:text-black">
                Contact
              </button>
            </li>
          ) : (
            <li key={l}>
              <button onClick={() => go(l)}
                className="font-body text-xs tracking-widest uppercase text-gray-400 hover:text-gold transition-colors relative group">
                {l}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </button>
            </li>
          ))}
        </ul>

        {/* hamburger */}
        <button className="ml-4 shrink-0 text-gold md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24}/> : <Menu size={24}/>}
        </button>
      </div>

      {open && (
        <div className="flex w-full max-w-full flex-col gap-5 overflow-x-hidden border-t border-gold/10 bg-black/95 px-5 py-6 sm:px-6 md:hidden">
          {links.map(l => (
            <button key={l} onClick={() => go(l)}
              className="font-body text-sm tracking-widest uppercase text-gray-300 hover:text-gold text-left transition-colors">
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
