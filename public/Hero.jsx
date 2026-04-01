// import { useEffect, useState } from 'react';

// export default function Hero() {
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const t = setTimeout(() => setVisible(true), 100);
//     return () => clearTimeout(t);
//   }, []);

//   return (
//     <section
//       id="home"
//       className="relative min-h-screen overflow-hidden flex items-stretch"
//       style={{ background: '#0a0a0a' }}
//     >
//       {/* ── FULL-BG PHOTO ── */}
//       <div className="absolute inset-0 z-0 ">
//         <img
//           src="/Anisha-Singla.png"
//           alt="Anisha Singla"
//           className=" h-screen object-cover object-center ml-52"
//           // style={{ opacity: 0.92 }}
//         />
//         {/* dark gradient — left edge */}
//         <div
//           className="absolute inset-0"
//           style={{
//             background:
//               'linear-gradient(to right, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.88) 100%)',
//           }}
//         />
//         {/* dark gradient — bottom edge */}
//         <div
//           className="absolute inset-0"
//           style={{
//             background:
//               'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 40%)',
//           }}
//         />
//         {/* warm glow behind subject */}
//         <div
//           className="absolute pointer-events-none"
//           style={{
//             width: '520px',
//             height: '620px',
//             borderRadius: '50%',
//             background:
//               'radial-gradient(ellipse at center, rgba(255,200,140,0.13) 0%, rgba(201,168,76,0.07) 45%, transparent 75%)',
//             filter: 'blur(40px)',
//             top: '50%',
//             left: '28%',
//             transform: 'translate(-50%, -50%)',
//           }}
//         />
//       </div>

//       {/* ── NAV SPACER ── */}
//       <div className="relative z-10 w-full flex items-center">
//         <div className="max-w-7xl mx-auto px-6 md:px-16 w-full">

//           {/* ── TEXT BLOCK — right aligned ── */}
//           <div className="flex flex-col items-start md:items-end text-left md:text-right ml-auto md:w-1/2">

//             {/* "Hey, there" — script style */}
//             <p
//               style={{
//                 fontFamily: "'Dancing Script', cursive",
//                 fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
//                 fontWeight: 500,
//                 color: 'rgba(255,255,255,0.92)',
//                 lineHeight: 1,
//                 opacity: visible ? 1 : 0,
//                 transform: visible ? 'translateY(0)' : 'translateY(20px)',
//                 transition: 'all 0.8s ease 0.2s',
//                 letterSpacing: '0.01em',
//               }}
//             >
//               Hey, there
//             </p>

//             {/* "I AM ANISHA SINGLA" — bold display */}
//             <h1
//               style={{
//                 fontFamily: "'Bebas Neue', sans-serif",
//                 fontSize: 'clamp(3.8rem, 8.5vw, 7.5rem)',
//                 fontWeight: 900,
//                 color: '#ffffff',
//                 lineHeight: 0.88,
//                 letterSpacing: '0.02em',
//                 marginTop: '0.25rem',
//                 opacity: visible ? 1 : 0,
//                 transform: visible ? 'translateY(0)' : 'translateY(30px)',
//                 transition: 'all 0.8s ease 0.38s',
//               }}
//             >
//               I AM ANISHA
//               <br />
//               <span style={{ color: '#ffffff' }}>SINGLA</span>
//             </h1>

//             {/* Dark badge — title */}
//             <div
//               style={{
//                 marginTop: '1rem',
//                 opacity: visible ? 1 : 0,
//                 transform: visible ? 'translateY(0)' : 'translateY(16px)',
//                 transition: 'all 0.8s ease 0.55s',
//               }}
//             >
//               <span
//                 style={{
//                   fontFamily: "'DM Sans', sans-serif",
//                   fontSize: 'clamp(0.65rem, 1.4vw, 0.82rem)',
//                   fontWeight: 700,
//                   letterSpacing: '0.22em',
//                   textTransform: 'uppercase',
//                   background: 'rgba(0,0,0,0.82)',
//                   color: '#ffffff',
//                   padding: '0.6rem 1.6rem',
//                   display: 'inline-block',
//                 }}
//               >
//                 AI Founder &amp; Innovator
//               </span>
//             </div>

//             {/* Tagline */}
//             <p
//               style={{
//                 fontFamily: "'DM Sans', sans-serif",
//                 fontSize: '1rem',
//                 fontStyle: 'italic',
//                 fontWeight: 300,
//                 color: 'rgba(255,255,255,0.55)',
//                 marginTop: '1.4rem',
//                 maxWidth: '360px',
//                 lineHeight: 1.65,
//                 opacity: visible ? 1 : 0,
//                 transition: 'all 0.8s ease 0.7s',
//               }}
//             >
//               Transforming businesses through the power of Artificial Intelligence — one solution at a time.
//             </p>

//             {/* CTAs */}
//             <div
//               className="flex flex-wrap gap-4 mt-8"
//               style={{
//                 opacity: visible ? 1 : 0,
//                 transition: 'all 0.8s ease 0.85s',
//               }}
//             >
//               <button
//                 className="btn-shimmer"
//                 style={{
//                   fontFamily: "'DM Sans', sans-serif",
//                   fontWeight: 700,
//                   fontSize: '0.72rem',
//                   letterSpacing: '0.2em',
//                   textTransform: 'uppercase',
//                   color: '#000',
//                   padding: '0.85rem 2.2rem',
//                   border: 'none',
//                   cursor: 'pointer',
//                 }}
//                 onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
//               >
//                 Explore My Work
//               </button>
//               <button
//                 style={{
//                   fontFamily: "'DM Sans', sans-serif",
//                   fontWeight: 600,
//                   fontSize: '0.72rem',
//                   letterSpacing: '0.2em',
//                   textTransform: 'uppercase',
//                   color: '#C9A84C',
//                   padding: '0.85rem 2.2rem',
//                   border: '1px solid #C9A84C',
//                   background: 'transparent',
//                   cursor: 'pointer',
//                   transition: 'all 0.3s ease',
//                 }}
//                 onMouseEnter={(e) => { e.currentTarget.style.background = '#C9A84C'; e.currentTarget.style.color = '#000'; }}
//                 onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C9A84C'; }}
//                 onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
//               >
//                 Let's Connect
//               </button>
//             </div>

//             {/* LinkedIn */}
//             <div
//               className="flex items-center gap-3 mt-6"
//               style={{ opacity: visible ? 1 : 0, transition: 'all 0.8s ease 1s' }}
//             >
//               <div style={{ width: '36px', height: '1px', background: 'rgba(201,168,76,0.6)' }} />
//               <a
//                 href="https://www.linkedin.com/in/singlaanisha"
//                 target="_blank"
//                 rel="noreferrer"
//                 style={{
//                   fontFamily: "'DM Sans', sans-serif",
//                   fontSize: '0.65rem',
//                   letterSpacing: '0.2em',
//                   textTransform: 'uppercase',
//                   color: 'rgba(255,255,255,0.4)',
//                   textDecoration: 'none',
//                   transition: 'color 0.3s',
//                 }}
//                 onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A84C')}
//                 onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
//               >
//                 linkedin.com/in/singlaanisha
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom gold line */}
//       <div
//         className="absolute bottom-0 left-0 right-0 z-10"
//         style={{
//           height: '1px',
//           background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.5), transparent)',
//         }}
//       />
//     </section>
//   );
// }


// import { useEffect, useState } from 'react';

// export default function Hero() {
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const t = setTimeout(() => setVisible(true), 100);
//     return () => clearTimeout(t);
//   }, []);

//   return (
//     <>
//       {/* Google Fonts */}
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;600&family=Bebas+Neue&family=DM+Sans:wght@300;400;600;700&display=swap');

//         .btn-shimmer {
//           position: relative;
//           overflow: hidden;
//           background: #ffffff;
//           transition: background 0.3s ease;
//         }
//         .btn-shimmer::after {
//           content: '';
//           position: absolute;
//           top: -50%;
//           left: -75%;
//           width: 50%;
//           height: 200%;
//           background: linear-gradient(120deg, transparent, rgba(255,255,255,0.45), transparent);
//           transform: skewX(-20deg);
//           animation: shimmer 2.8s infinite;
//         }
//         @keyframes shimmer {
//           0%   { left: -75%; }
//           100% { left: 125%; }
//         }
//       `}</style>

//       <section
//         id="home"
//         style={{
//           position: 'relative',
//           minHeight: '100vh',
//           overflow: 'hidden',
//           display: 'flex',
//           alignItems: 'stretch',
//           background: '#0a0a0a',
//         }}
//       >
//         {/* ── FULL-BG PHOTO ── */}
//         <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
//           <img
//             src="/Anisha-Singla.png"
//             alt="Anisha Singla"
//             style={{
//               height: '100vh',
//               objectFit: 'cover',
//               objectPosition: 'center top',
//               marginLeft: '13rem',
//             }}
//           />

//           {/* Warm radial glow — sits behind/around the subject (center-left area) */}
//           <div
//             style={{
//               position: 'absolute',
//               top: '50%',
//               left: '32%',
//               transform: 'translate(-50%, -50%)',
//               width: '680px',
//               height: '680px',
//               borderRadius: '50%',
//               background:
//                 'radial-gradient(ellipse at center, rgba(200,230,180,0.28) 0%, rgba(210,200,120,0.18) 30%, rgba(180,140,80,0.08) 60%, transparent 75%)',
//               filter: 'blur(32px)',
//               pointerEvents: 'none',
//             }}
//           />

//           {/* Left dark vignette */}
//           <div
//             style={{
//               position: 'absolute',
//               inset: 0,
//               background:
//                 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 35%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.6) 68%, rgba(0,0,0,0.93) 100%)',
//             }}
//           />

//           {/* Bottom dark fade */}
//           <div
//             style={{
//               position: 'absolute',
//               inset: 0,
//               background:
//                 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 38%)',
//             }}
//           />

//           {/* Top dark fade */}
//           <div
//             style={{
//               position: 'absolute',
//               inset: 0,
//               background:
//                 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 20%)',
//             }}
//           />
//         </div>

//         {/* ── CONTENT ── */}
//         <div style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', alignItems: 'center' }}>
//           <div
//             style={{
//               maxWidth: '1280px',
//               margin: '0 auto',
//               padding: '0 4rem',
//               width: '100%',
//             }}
//           >
//             {/* Text block — right side */}
//             <div
//               style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'flex-end',
//                 textAlign: 'right',
//                 marginLeft: 'auto',
//                 width: '48%',
//               }}
//             >
//               {/* Script greeting */}
//               <p
//                 style={{
//                   fontFamily: "'Dancing Script', cursive",
//                   fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
//                   fontWeight: 500,
//                   color: 'rgba(255,255,255,0.93)',
//                   lineHeight: 1,
//                   letterSpacing: '0.01em',
//                   margin: 0,
//                   opacity: visible ? 1 : 0,
//                   transform: visible ? 'translateY(0)' : 'translateY(22px)',
//                   transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
//                 }}
//               >
//                 Hey, there
//               </p>

//               {/* Bold name */}
//               <h1
//                 style={{
//                   fontFamily: "'Bebas Neue', sans-serif",
//                   fontSize: 'clamp(4rem, 9vw, 8rem)',
//                   fontWeight: 900,
//                   color: '#ffffff',
//                   lineHeight: 0.88,
//                   letterSpacing: '0.025em',
//                   marginTop: '0.2rem',
//                   marginBottom: 0,
//                   opacity: visible ? 1 : 0,
//                   transform: visible ? 'translateY(0)' : 'translateY(32px)',
//                   transition: 'opacity 0.8s ease 0.38s, transform 0.8s ease 0.38s',
//                 }}
//               >
//                 I AM ANISHA
//                 <br />
//                 SINGLA
//               </h1>

//               {/* Title badge */}
//               <div
//                 style={{
//                   marginTop: '1rem',
//                   opacity: visible ? 1 : 0,
//                   transform: visible ? 'translateY(0)' : 'translateY(18px)',
//                   transition: 'opacity 0.8s ease 0.55s, transform 0.8s ease 0.55s',
//                 }}
//               >
//                 <span
//                   style={{
//                     fontFamily: "'DM Sans', sans-serif",
//                     fontSize: 'clamp(0.65rem, 1.3vw, 0.8rem)',
//                     fontWeight: 700,
//                     letterSpacing: '0.22em',
//                     textTransform: 'uppercase',
//                     background: 'rgba(0,0,0,0.88)',
//                     color: '#ffffff',
//                     padding: '0.6rem 1.7rem',
//                     display: 'inline-block',
//                   }}
//                 >
//                   AI Founder &amp; Innovator
//                 </span>
//               </div>

//               {/* Tagline */}
//               <p
//                 style={{
//                   fontFamily: "'DM Sans', sans-serif",
//                   fontSize: '1rem',
//                   fontStyle: 'italic',
//                   fontWeight: 300,
//                   color: 'rgba(255,255,255,0.52)',
//                   marginTop: '1.4rem',
//                   maxWidth: '360px',
//                   lineHeight: 1.65,
//                   opacity: visible ? 1 : 0,
//                   transition: 'opacity 0.8s ease 0.7s',
//                 }}
//               >
//                 Transforming businesses through the power of Artificial Intelligence — one solution at a time.
//               </p>

//               {/* CTAs */}
//               <div
//                 style={{
//                   display: 'flex',
//                   flexWrap: 'wrap',
//                   gap: '1rem',
//                   marginTop: '2rem',
//                   justifyContent: 'flex-end',
//                   opacity: visible ? 1 : 0,
//                   transition: 'opacity 0.8s ease 0.85s',
//                 }}
//               >
//                 <button
//                   className="btn-shimmer"
//                   style={{
//                     fontFamily: "'DM Sans', sans-serif",
//                     fontWeight: 700,
//                     fontSize: '0.72rem',
//                     letterSpacing: '0.2em',
//                     textTransform: 'uppercase',
//                     color: '#000',
//                     padding: '0.85rem 2.2rem',
//                     border: 'none',
//                     cursor: 'pointer',
//                   }}
//                   onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
//                 >
//                   Explore My Work
//                 </button>
//                 <button
//                   style={{
//                     fontFamily: "'DM Sans', sans-serif",
//                     fontWeight: 600,
//                     fontSize: '0.72rem',
//                     letterSpacing: '0.2em',
//                     textTransform: 'uppercase',
//                     color: '#C9A84C',
//                     padding: '0.85rem 2.2rem',
//                     border: '1px solid #C9A84C',
//                     background: 'transparent',
//                     cursor: 'pointer',
//                     transition: 'all 0.3s ease',
//                   }}
//                   onMouseEnter={(e) => { e.currentTarget.style.background = '#C9A84C'; e.currentTarget.style.color = '#000'; }}
//                   onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C9A84C'; }}
//                   onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
//                 >
//                   Let's Connect
//                 </button>
//               </div>

//               {/* LinkedIn */}
//               <div
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '0.75rem',
//                   marginTop: '1.5rem',
//                   opacity: visible ? 1 : 0,
//                   transition: 'opacity 0.8s ease 1s',
//                 }}
//               >
//                 <div style={{ width: '36px', height: '1px', background: 'rgba(201,168,76,0.6)' }} />
//                 <a
//                   href="https://www.linkedin.com/in/singlaanisha"
//                   target="_blank"
//                   rel="noreferrer"
//                   style={{
//                     fontFamily: "'DM Sans', sans-serif",
//                     fontSize: '0.65rem',
//                     letterSpacing: '0.2em',
//                     textTransform: 'uppercase',
//                     color: 'rgba(255,255,255,0.38)',
//                     textDecoration: 'none',
//                     transition: 'color 0.3s',
//                   }}
//                   onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A84C')}
//                   onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.38)')}
//                 >
//                   linkedin.com/in/singlaanisha
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom gold line */}
//         <div
//           style={{
//             position: 'absolute',
//             bottom: 0,
//             left: 0,
//             right: 0,
//             zIndex: 10,
//             height: '1px',
//             background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.5), transparent)',
//           }}
//         />
//       </section>
//     </>
//   );
// }


import { useEffect, useState } from 'react';

// ── Typewriter hook ──────────────────────────────────────────────
function useTypewriter(text, { startDelay = 1000, speed = 55 } = {}) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let timeout;
    let interval;
    timeout = setTimeout(() => {
      let i = 0;
      interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);
    return () => { clearTimeout(timeout); clearInterval(interval); };
  }, [text, startDelay, speed]);

  return { displayed, done };
}

// ── Blinking cursor ──────────────────────────────────────────────
function Cursor() {
  const [blink, setBlink] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(t);
  }, []);
  return <span style={{ opacity: blink ? 1 : 0, transition: 'opacity 0.1s' }}>|</span>;
}

export default function Hero() {
  const SPEED = 48;

  const LINE1 = 'Hey, there';
  const LINE2 = 'I AM ANISHA\nSINGLA';
  const LINE3 = 'AI Founder & Innovator';
  const LINE4 = 'Transforming businesses through the power of Artificial Intelligence — one solution at a time.';

  // Each line starts after the previous one finishes
  const DELAY1 = 1000;
  const DELAY2 = DELAY1 + LINE1.length * SPEED + 320;
  const DELAY3 = DELAY2 + LINE2.length * SPEED + 320;
  const DELAY4 = DELAY3 + LINE3.length * SPEED + 320;
  const DELAY_BTNS = DELAY4 + LINE4.length * SPEED + 450;

  const tw1 = useTypewriter(LINE1, { startDelay: DELAY1, speed: SPEED });
  const tw2 = useTypewriter(LINE2, { startDelay: DELAY2, speed: SPEED });
  const tw3 = useTypewriter(LINE3, { startDelay: DELAY3, speed: SPEED });
  const tw4 = useTypewriter(LINE4, { startDelay: DELAY4, speed: SPEED });

  const [showBtns, setShowBtns] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShowBtns(true), DELAY_BTNS);
    return () => clearTimeout(t);
  }, []);

  // Split name display on \n
  const nameParts = tw2.displayed.split('\n');
  const nameL1 = nameParts[0] || '';
  const nameL2 = nameParts[1] !== undefined ? nameParts[1] : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;600&family=Bebas+Neue&family=DM+Sans:wght@300;400;600;700&display=swap');

        .btn-shimmer {
          position: relative;
          overflow: hidden;
          background: #ffffff;
          transition: background 0.3s ease;
        }
        .btn-shimmer::after {
          content: '';
          position: absolute;
          top: -50%; left: -75%;
          width: 50%; height: 200%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.45), transparent);
          transform: skewX(-20deg);
          animation: shimmer 2.8s infinite;
        }
        @keyframes shimmer {
          0%   { left: -75%; }
          100% { left: 125%; }
        }
      `}</style>

      <section
        id="home"
        style={{
          position: 'relative',
          minHeight: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'stretch',
          background: '#0a0a0a',
        }}
      >
        {/* ── VIDEO BACKGROUND ── */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <video
            src="/WhatsApp Video 2026-03-31 at 5.33.49 PM.mp4"
            autoPlay
            muted
            loop
            playsInline
            style={{
              // position: 'absolute',
              // top: 0, left: 0,
              // width: '100%', height: '100%',
              height: '100vh', marginLeft: '13rem',
              objectFit: 'cover',
              objectPosition: 'center top',
            }}
          />

          {/* Warm radial glow behind subject */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '32%',
            transform: 'translate(-50%, -50%)',
            width: '680px', height: '680px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, rgba(200,230,180,0.26) 0%, rgba(210,200,120,0.16) 30%, rgba(180,140,80,0.07) 60%, transparent 75%)',
            filter: 'blur(32px)',
            pointerEvents: 'none',
          }} />

          {/* Left + right dark vignette */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.08) 35%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.62) 68%, rgba(0,0,0,0.93) 100%)',
          }} />

          {/* Bottom fade */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, transparent 38%)',
          }} />

          {/* Top fade */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 20%)',
          }} />
        </div>

        {/* ── CONTENT ── */}
        <div style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', alignItems: 'center' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 4rem', width: '100%' }}>

            {/* Right-side text block */}
            <div style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'flex-end', textAlign: 'right',
              marginLeft: 'auto', width: '48%',
            }}>

              {/* LINE 1 — script greeting */}
              <p style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.93)',
                lineHeight: 1,
                letterSpacing: '0.01em',
                margin: 0,
                minHeight: '1.2em',
              }}>
                {tw1.displayed}
                {!tw1.done && <Cursor />}
              </p>

              {/* LINE 2 — bold name (2 lines) */}
              <h1 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(4rem, 9vw, 8rem)',
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 0.88,
                letterSpacing: '0.025em',
                marginTop: '0.2rem',
                marginBottom: 0,
                minHeight: '1.9em',
              }}>
                {nameL1}
                {nameL2 === null && !tw2.done && tw2.displayed.length > 0 && <Cursor />}
                {nameL2 !== null && (
                  <>
                    <br />
                    {nameL2}
                    {!tw2.done && <Cursor />}
                  </>
                )}
              </h1>

              {/* LINE 3 — badge */}
              <div style={{ marginTop: '1rem', minHeight: '2.6rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                {tw3.displayed.length > 0 && (
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 'clamp(0.65rem, 1.3vw, 0.8rem)',
                    fontWeight: 700,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    background: 'rgba(0,0,0,0.88)',
                    color: '#ffffff',
                    padding: '0.6rem 1.7rem',
                    display: 'inline-block',
                  }}>
                    {tw3.displayed}
                    {!tw3.done && <Cursor />}
                  </span>
                )}
              </div>

              {/* LINE 4 — tagline */}
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '1rem',
                fontStyle: 'italic',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.52)',
                marginTop: '1.4rem',
                maxWidth: '360px',
                lineHeight: 1.65,
                minHeight: '3.4em',
              }}>
                {tw4.displayed}
                {!tw4.done && tw4.displayed.length > 0 && <Cursor />}
              </p>

              {/* CTAs */}
              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: '1rem',
                marginTop: '2rem', justifyContent: 'flex-end',
                opacity: showBtns ? 1 : 0,
                transform: showBtns ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.7s ease, transform 0.7s ease',
              }}>
                <button
                  className="btn-shimmer"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 700, fontSize: '0.72rem',
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: '#000', padding: '0.85rem 2.2rem',
                    border: 'none', cursor: 'pointer',
                  }}
                  onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Explore My Work
                </button>
                <button
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600, fontSize: '0.72rem',
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: '#C9A84C', padding: '0.85rem 2.2rem',
                    border: '1px solid #C9A84C', background: 'transparent',
                    cursor: 'pointer', transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#C9A84C'; e.currentTarget.style.color = '#000'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C9A84C'; }}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Let's Connect
                </button>
              </div>

              {/* LinkedIn */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1.5rem',
                opacity: showBtns ? 1 : 0,
                transition: 'opacity 0.7s ease 0.2s',
              }}>
                <div style={{ width: '36px', height: '1px', background: 'rgba(201,168,76,0.6)' }} />
                <a
                  href="https://www.linkedin.com/in/singlaanisha"
                  target="_blank" rel="noreferrer"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.65rem', letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)',
                    textDecoration: 'none', transition: 'color 0.3s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A84C')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.38)')}
                >
                  linkedin.com/in/singlaanisha
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gold line */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.5), transparent)',
        }} />
      </section>
    </>
  );
}