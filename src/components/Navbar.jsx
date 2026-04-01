import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';

const links = ['Home','About','Services','Experience','Education','Skills','Contact'];

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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background:    scrolled ? 'rgba(0,0,0,0.88)' : 'transparent',
        backdropFilter:scrolled ? 'blur(18px)'        : 'none',
        borderBottom:  scrolled ? '1px solid rgba(201,168,76,0.15)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-14 py-5 flex items-center justify-between">
        <span className="font-title text-2xl tracking-[.3em] text-gold cursor-pointer"
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
        <button className="md:hidden text-gold" onClick={() => setOpen(!open)}>
          {open ? <X size={24}/> : <Menu size={24}/>}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-black/95 border-t border-gold/10 px-8 py-6 flex flex-col gap-5">
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
