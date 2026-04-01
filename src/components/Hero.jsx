

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
//               // marginTop: 'rem',
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

import { useEffect, useRef, useState } from 'react';

// ── Typewriter hook ──────────────────────────────────────────────
function useTypewriter(text, { startDelay = 1000, duration = 1000 } = {}) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!text) {
      setDisplayed('');
      setDone(true);
      return undefined;
    }

    setDisplayed('');
    setDone(false);
    let timeoutId;
    let frameId;
    let animationStart = 0;

    timeoutId = window.setTimeout(() => {
      const step = (timestamp) => {
        if (!animationStart) {
          animationStart = timestamp;
        }

        const elapsed = timestamp - animationStart;
        const progress = Math.min(elapsed / duration, 1);
        const nextCount = progress <= 0 ? 0 : Math.ceil(progress * text.length);

        setDisplayed(text.slice(0, nextCount));

        if (progress < 1) {
          frameId = window.requestAnimationFrame(step);
          return;
        }

        setDisplayed(text);
        setDone(true);
      };

      frameId = window.requestAnimationFrame(step);
    }, startDelay);

    return () => {
      window.clearTimeout(timeoutId);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [text, startDelay, duration]);

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

  const LINE1 = 'Hey, there';
  const LINE2 = 'I AM ANISHA\nSINGLA';
  const LINE3 = 'AI Founder & Innovator';
  const LINE4 = 'Transforming businesses through the power of Artificial Intelligence — one solution at a time.';

  const TEXT_START_DELAY_MS = 2000;
  const TEXT_TOTAL_DURATION_MS = 6000;
  const VIDEO_PLAY_DURATION_MS = 8000;

  const totalTypingCharacters = [LINE1, LINE2, LINE3, LINE4].reduce((total, line) => total + line.length, 0);
  const getLineDuration = (line) => (line.length / totalTypingCharacters) * TEXT_TOTAL_DURATION_MS;

  const LINE1_DURATION = getLineDuration(LINE1);
  const LINE2_DURATION = getLineDuration(LINE2);
  const LINE3_DURATION = getLineDuration(LINE3);
  const LINE4_DURATION = getLineDuration(LINE4);

  const DELAY1 = TEXT_START_DELAY_MS;
  const DELAY2 = DELAY1 + LINE1_DURATION;
  const DELAY3 = DELAY2 + LINE2_DURATION;
  const DELAY4 = DELAY3 + LINE3_DURATION;
  const DELAY_BTNS = TEXT_START_DELAY_MS + TEXT_TOTAL_DURATION_MS;

  const tw1 = useTypewriter(LINE1, { startDelay: DELAY1, duration: LINE1_DURATION });
  const tw2 = useTypewriter(LINE2, { startDelay: DELAY2, duration: LINE2_DURATION });
  const tw3 = useTypewriter(LINE3, { startDelay: DELAY3, duration: LINE3_DURATION });
  const tw4 = useTypewriter(LINE4, { startDelay: DELAY4, duration: LINE4_DURATION });

  const [showBtns, setShowBtns] = useState(false);
  useEffect(() => {
    const timeoutId = window.setTimeout(() => setShowBtns(true), DELAY_BTNS);
    return () => window.clearTimeout(timeoutId);
  }, [DELAY_BTNS]);

  const nameParts = tw2.displayed.split('\n');
  const nameL1 = nameParts[0] || '';
  const nameL2 = nameParts[1] !== undefined ? nameParts[1] : null;

  const VIDEO_EDGE_COLOR = '#000000';
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) {
      return undefined;
    }

    let stopTimerId;

    const stopVideo = () => {
      videoElement.pause();
      const stopAtSecond = VIDEO_PLAY_DURATION_MS / 1000;

      if (Number.isFinite(videoElement.duration) && videoElement.duration > 0) {
        videoElement.currentTime = Math.min(stopAtSecond, videoElement.duration);
        return;
      }

      videoElement.currentTime = stopAtSecond;
    };

    videoElement.currentTime = 0;
    const playPromise = videoElement.play();
    if (playPromise?.catch) {
      playPromise.catch(() => {});
    }

    stopTimerId = window.setTimeout(stopVideo, VIDEO_PLAY_DURATION_MS);

    return () => {
      window.clearTimeout(stopTimerId);
      videoElement.pause();
      videoElement.currentTime = 0;
    };
  }, [VIDEO_PLAY_DURATION_MS]);

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
          /* ✅ Background ab video ke edge color se match karta hai */
          background: VIDEO_EDGE_COLOR,
        }}
      >
        {/* ── VIDEO BACKGROUND ── */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <video
            ref={videoRef}
            src="/Final-Video.MP4"
            muted
            playsInline
            preload="auto"
            style={{
              /* ✅ Video ab center mein hai, marginLeft hata diya */
              position: 'absolute',
              top: 0,
              left: '30%',
              transform: 'translateX(-50%)',
              height: '100vh',
              width: 'auto',
              objectFit: 'cover',
              objectPosition: 'center top',
            }}
          />



          {/* ✅ Left vignette — VIDEO_EDGE_COLOR se fade karo taaki seamless blend ho */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(to right, ${VIDEO_EDGE_COLOR} 0%, rgba(13,12,11,0.85) 12%, rgba(13,12,11,0.08) 35%, rgba(13,12,11,0.05) 50%, rgba(13,12,11,0.62) 68%, rgba(13,12,11,0.93) 84%, ${VIDEO_EDGE_COLOR} 100%)`,
          }} />

          {/* Bottom fade */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(to top, ${VIDEO_EDGE_COLOR} 0%, rgba(13,12,11,0.78) 8%, transparent 38%)`,
          }} />

          {/* Top fade */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(to bottom, ${VIDEO_EDGE_COLOR} 0%, rgba(13,12,11,0.35) 5%, transparent 20%)`,
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
                {!tw1.done && tw1.displayed.length > 0 && <Cursor />}
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
