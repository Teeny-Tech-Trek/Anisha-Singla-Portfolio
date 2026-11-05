import { useEffect, useRef, useState } from 'react';

import { scrollToSection } from '../routes';

import SocialBar from './SocialBar';

import { useTheme } from '../context/ThemeContext';



// ── Typewriter hook ──────────────────────────────────────────────

function useTypewriter(text, { enabled = true, startDelay = 1000, duration = 1000 } = {}) {

  const [elapsed, setElapsed] = useState(0);

  const safeDuration = Math.max(duration, 1);

  const safeText = enabled ? (text ?? '') : '';



  useEffect(() => {

    if (!enabled || !text) {

      return undefined;

    }



    let timeoutId;

    let frameId;

    let animationStart = 0;



    timeoutId = window.setTimeout(() => {

      setElapsed(0);



      const step = (timestamp) => {

        if (!animationStart) {

          animationStart = timestamp;

        }



        const nextElapsed = Math.min(timestamp - animationStart, safeDuration);

        setElapsed(nextElapsed);



        if (nextElapsed < safeDuration) {

          frameId = window.requestAnimationFrame(step);

        }

      };



      frameId = window.requestAnimationFrame(step);

    }, startDelay);



    return () => {

      window.clearTimeout(timeoutId);

      if (frameId) {

        window.cancelAnimationFrame(frameId);

      }

    };

  }, [enabled, safeDuration, startDelay, text]);



  if (!enabled) {

    return { displayed: '', done: false };

  }



  if (!safeText) {

    return { displayed: '', done: true };

  }



  const progress = Math.min(elapsed / safeDuration, 1);

  const nextCount = progress <= 0 ? 0 : Math.ceil(progress * safeText.length);



  return {

    displayed: safeText.slice(0, nextCount),

    done: progress >= 1,

  };

}



const HERO_STATS = [

  { value: '3', label: 'AI products in production' },

  { value: '10', label: 'clients delivered' },

  { value: '3', label: 'verticals served' },

  { value: '100%', label: 'on-time delivery' },

];



// ── Blinking cursor ──────────────────────────────────────────────

function Cursor() {

  const { isDark } = useTheme();

  const [blink, setBlink] = useState(true);

  useEffect(() => {

    const t = setInterval(() => setBlink((b) => !b), 530);

    return () => clearInterval(t);

  }, []);

  return (

    <span

      style={{

        opacity: blink ? 1 : 0,

        transition: 'opacity 0.1s',

        color: isDark ? '#C9A84C' : '#2563EB',

        fontWeight: 'bold',

      }}

    >

      |

    </span>

  );

}



export default function Hero() {

  const { isDark } = useTheme();



  const LINE1 = 'Hey, there';

  const LINE2 = 'Anisha\nSingla';

  const LINE3 = 'AI Strategist & Business Analyst';

  const LINE4 =

    'I turn AI pilots into production systems. Three AI products shipped, ten clients delivered, and no demos that died on the way to launch.';



  const VIDEO_START_TIME = 1; // seconds (video starts from this point)

  const VIDEO_END_TIME = 7;   // seconds (video stops at 7s mark)

  const TEXT_START_DELAY_MS = 1500; // Text displays 1.5s after video starts playing

  const TYPE_SEQUENCE_START_DELAY_MS = 0;

  const videoPlayDurationMs = Math.max(1000, (VIDEO_END_TIME - VIDEO_START_TIME) * 1000);

  const TEXT_TOTAL_DURATION_MS = Math.max(1000, videoPlayDurationMs - TEXT_START_DELAY_MS);

  const VERCEL_VIDEO_URL =

    'Hero_Video.webm';

  const videoSrc = VERCEL_VIDEO_URL.startsWith('http') || VERCEL_VIDEO_URL.startsWith('/')

    ? VERCEL_VIDEO_URL

    : `/${VERCEL_VIDEO_URL}`;



  const totalTypingCharacters = [LINE1, LINE2, LINE3, LINE4].reduce((total, line) => total + line.length, 0);

  const getLineDuration = (line) => (line.length / totalTypingCharacters) * TEXT_TOTAL_DURATION_MS;



  const LINE1_DURATION = getLineDuration(LINE1);

  const LINE2_DURATION = getLineDuration(LINE2);

  const LINE3_DURATION = getLineDuration(LINE3);

  const LINE4_DURATION = getLineDuration(LINE4);



  const DELAY1 = TYPE_SEQUENCE_START_DELAY_MS;

  const DELAY2 = DELAY1 + LINE1_DURATION;

  const DELAY3 = DELAY2 + LINE2_DURATION;

  const DELAY4 = DELAY3 + LINE3_DURATION;

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const [startTyping, setStartTyping] = useState(false);



  const tw1 = useTypewriter(LINE1, { enabled: startTyping, startDelay: DELAY1, duration: LINE1_DURATION });

  const tw2 = useTypewriter(LINE2, { enabled: startTyping, startDelay: DELAY2, duration: LINE2_DURATION });

  const tw3 = useTypewriter(LINE3, { enabled: startTyping, startDelay: DELAY3, duration: LINE3_DURATION });

  const tw4 = useTypewriter(LINE4, { enabled: startTyping, startDelay: DELAY4, duration: LINE4_DURATION });



  useEffect(() => {

    if (!isVideoPlaying || startTyping) {

      return undefined;

    }



    const timeoutId = window.setTimeout(() => setStartTyping(true), TEXT_START_DELAY_MS);

    return () => window.clearTimeout(timeoutId);

  }, [isVideoPlaying, startTyping, TEXT_START_DELAY_MS]);



  useEffect(() => {

    const fallbackTimer = window.setTimeout(() => {

      setStartTyping(true);

    }, TEXT_START_DELAY_MS + 1000);

    return () => window.clearTimeout(fallbackTimer);

  }, [TEXT_START_DELAY_MS]);



  const showBtns = startTyping && tw4.done;



  const nameParts = tw2.displayed.split('\n');

  const nameL1 = nameParts[0] || '';

  const nameL2 = nameParts[1] !== undefined ? nameParts[1] : null;



  const videoRef = useRef(null);

  const heroSectionRef = useRef(null);

  const hasAutoScrolledRef = useRef(false);



  useEffect(() => {

    const videoElement = videoRef.current;

    if (!videoElement) {

      return undefined;

    }



    let readyTimerId;

    const seekToStart = () => {

      try {

        if (videoElement.currentTime < VIDEO_START_TIME) {

          videoElement.currentTime = VIDEO_START_TIME;

        }

      } catch {

        // ignore if not seekable yet

      }

    };



    const handleLoadedMetadata = () => {

      seekToStart();

    };



    const handleLoadedData = () => {

      seekToStart();

    };



    const handlePlaying = () => {

      seekToStart();

      setIsVideoPlaying(true);

    };



    const handleTimeUpdate = () => {

      if (videoElement.currentTime < VIDEO_START_TIME) {

        seekToStart();

        return;

      }

      if (videoElement.currentTime >= VIDEO_END_TIME) {

        videoElement.pause();

      }

    };



    if (videoElement.readyState >= 1) {

      seekToStart();

    }

    if (!videoElement.paused && videoElement.currentTime >= VIDEO_START_TIME) {

      setIsVideoPlaying(true);

    }



    videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);

    videoElement.addEventListener('loadeddata', handleLoadedData);

    videoElement.addEventListener('playing', handlePlaying);

    videoElement.addEventListener('timeupdate', handleTimeUpdate);



    const playPromise = videoElement.play();

    if (playPromise?.catch) {

      playPromise.catch(() => { });

    }



    if (videoElement.readyState >= 2) {

      readyTimerId = window.setTimeout(handleLoadedData, 0);

    }



    return () => {

      if (readyTimerId) {

        window.clearTimeout(readyTimerId);

      }

      videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);

      videoElement.removeEventListener('loadeddata', handleLoadedData);

      videoElement.removeEventListener('playing', handlePlaying);

      videoElement.removeEventListener('timeupdate', handleTimeUpdate);

      videoElement.pause();

      seekToStart();

    };

  }, []);



  useEffect(() => {

    if (!startTyping || !tw4.done) {

      return undefined;

    }



    videoRef.current?.pause();

  }, [startTyping, tw4.done]);



  // ── Palette Values ──────────────────────────────────────────────

  const heroBg = isDark ? '#000000' : '#FAF8F5';

  const eyebrowColor = isDark ? '#E8C97A' : '#2563EB';

  const nameColor = isDark ? '#FFFFFF' : '#111827';

  const badgeBg = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(37,99,235,0.08)';

  const badgeColor = isDark ? '#E5E7EB' : '#1D4ED8';

  const badgeBorder = isDark ? '1px solid rgba(201,168,76,0.25)' : '1px solid rgba(37,99,235,0.25)';

  const taglineColor = isDark ? 'rgba(255,255,255,0.68)' : '#374151';

  const statDivColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  const statLabelColor = isDark ? 'rgba(255,255,255,0.5)' : '#4B5563';



  return (

    <>

      <style>{`

        .hero-shell {

          position: relative;

          min-height: calc(100svh - var(--availability-banner-h, 65px) - 12px);

          width: 100%;

          max-width: 100%;

          overflow: hidden;

          display: flex;

          align-items: stretch;

          background: ${heroBg};

          isolation: isolate;

          transition: background 0.4s ease;

        }



        .hero-media {

          position: absolute;

          inset: 0;

          z-index: 1;

          width: 100%;

          max-width: 100%;

          overflow: hidden;

          pointer-events: none;

        }



        .hero-video {

          position: absolute;

          top: 0;

          left: 0;

          height: 100%;

          width: auto;

          max-width: none;

          min-width: 0;

          transform: translateX(-17.5%);

          object-fit: contain;

          object-position: left center;

        }



        /* Subtle glow backdrop behind subject in light & dark mode */

        .hero-media-glow {

          position: absolute;

          top: 15%;

          left: clamp(260px, 24vw, 420px);

          transform: translateX(-50%);

          width: 450px;

          height: 450px;

          border-radius: 50%;

          background: ${isDark ? 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)'};

          filter: blur(40px);

          pointer-events: none;

        }



        /* Gentle bottom blend only (no dark side overlay) */

        .hero-bottom-fade {

          position: absolute;

          bottom: 0;

          left: 0;

          right: 0;

          height: 120px;

          background: linear-gradient(to top, ${heroBg} 10%, transparent 100%);

          pointer-events: none;

        }



        .hero-content {

          position: relative;

          z-index: 10;

          width: 100%;

          max-width: 100%;

          display: flex;

          align-items: center;

          min-height: calc(100svh - var(--availability-banner-h, 65px) - 12px);

          padding: clamp(5.5rem, 10vh, 7rem) 0 clamp(1.5rem, 3.5vh, 2.5rem);

          box-sizing: border-box;

        }



        .hero-inner {

          max-width: 1280px;

          margin: 0 auto;

          padding: 0 clamp(1.25rem, 4vw, 4rem);

          width: 100%;

          box-sizing: border-box;

        }



        .hero-copy {

          display: flex;

          flex-direction: column;

          align-items: flex-end;

          text-align: right;

          margin-left: auto;

          width: min(50%, 42rem);

          max-width: 42rem;

          min-height: min(480px, 62vh);

          justify-content: center;

        }



        .hero-copy > * {

          max-width: 100%;

        }



        .hero-eyebrow {

          font-family: 'DM Sans', sans-serif;

          font-style: italic;

          font-size: clamp(1.1rem, 1.8vw, 1.5rem);

          font-weight: 600;

          line-height: 1.1;

          letter-spacing: 0.02em;

          margin: 0;

          min-height: 1.2em;

          transition: color 0.4s ease;

        }



        .hero-name {

          font-family: 'Bebas Neue', sans-serif;

          font-size: clamp(3.5rem, 6.2vw, 5.8rem);

          font-weight: 900;

          line-height: 0.9;

          letter-spacing: 0.03em;

          margin-top: 0.25rem;

          margin-bottom: 0;

          transition: color 0.4s ease;

        }



        .hero-badge-row {

          display: flex;

          align-items: center;

          justify-content: flex-end;

          width: 100%;

          margin-top: 0.65rem;

        }



        .hero-badge {

          max-width: 100%;

          box-sizing: border-box;

          font-family: 'DM Sans', sans-serif;

          font-size: clamp(0.7rem, 0.95vw, 0.78rem);

          font-weight: 700;

          letter-spacing: 0.2em;

          text-transform: uppercase;

          padding: 0.45rem 1.2rem;

          border-radius: 6px;

          display: inline-block;

          transition: all 0.4s ease;

        }



        .hero-tagline {

          font-family: 'DM Sans', sans-serif;

          font-size: clamp(0.92rem, 1.05vw, 1.02rem);

          font-style: italic;

          font-weight: 400;

          line-height: 1.55;

          margin-top: 1rem;

          max-width: 25rem;

          min-height: 3.2em;

          transition: color 0.4s ease;

        }



        .hero-actions {

          display: flex;

          flex-wrap: wrap;

          gap: 0.75rem;

          margin-top: 1.35rem;

          justify-content: flex-end;

          width: 100%;

        }



        .hero-button {

          display: inline-flex;

          align-items: center;

          justify-content: center;

          min-height: 42px;

          padding: 0.7rem 1.6rem;

          box-sizing: border-box;

          font-family: 'DM Sans', sans-serif;

          font-size: clamp(0.68rem, 0.8vw, 0.72rem);

          font-weight: 700;

          letter-spacing: 0.16em;

          text-transform: uppercase;

          border-radius: 8px;

          transition: all 0.25s ease;

        }



        .hero-stats {

          display: flex;

          gap: 1.5rem;

          margin-top: 1.35rem;

          padding-top: 1.1rem;

          justify-content: flex-end;

          width: 100%;

          flex-wrap: wrap;

          transition: border-color 0.4s ease;

        }



        .hero-stat {

          text-align: center;

          min-width: 3.5rem;

        }



        .hero-stat-value {

          font-family: 'Bebas Neue', sans-serif;

          font-size: clamp(1.4rem, 2vw, 1.9rem);

          color: ${isDark ? '#C9A84C' : '#2563EB'};

          line-height: 1;

        }



        .hero-stat-label {

          font-family: 'DM Sans', sans-serif;

          font-size: 0.62rem;

          letter-spacing: 0.02em;

          margin: 0.25rem 0 0;

          line-height: 1.25;

          max-width: 6rem;

          font-weight: 500;

          transition: color 0.4s ease;

        }



        .hero-link-row {

          display: flex;

          align-items: center;

          margin-top: 1.1rem;

          justify-content: flex-end;

          width: 100%;

        }



        @media (max-width: 1100px) {

          .hero-video {

            left: 0;

            height: 100%;

            width: auto;

            max-width: none;

            transform: translateX(-17.5%);

            object-fit: contain;

            object-position: left center;

          }

          .hero-media-glow {

            left: 24%;

            width: 380px;

            height: 380px;

          }

          .hero-copy {

            width: min(56%, 36rem);

          }

        }



        @media (max-width: 900px) {

          .hero-video {

            left: 0;

            height: 100%;

            width: auto;

            max-width: none;

            transform: translateX(-17.5%);

            object-fit: contain;

            object-position: left center;

          }

          .hero-media-glow {

            left: 22%;

            width: 320px;

            height: 320px;

          }

          .hero-copy {

            width: min(62%, 34rem);

          }

        }



        @media (max-width: 768px) {

          .hero-content {

            align-items: flex-end;

            padding: 6rem 0 2rem;

          }

          .hero-inner {

            padding: 0 1.25rem;

          }

          .hero-video {

            inset: 0;

            left: 0;

            width: 100%;

            height: 100%;

            min-width: 0;

            transform: none;

            object-fit: cover;

            object-position: 20% top;

            opacity: ${isDark ? 0.9 : 0.85};

          }

          .hero-media-glow {

            display: none;

          }

          .hero-copy {

            width: 100%;

            max-width: none;

            align-items: flex-start;

            text-align: left;

            margin-left: 0;

          }

          .hero-name {

            font-size: clamp(3.4rem, 16vw, 5.5rem);

          }

          .hero-badge-row,

          .hero-actions,

          .hero-link-row {

            justify-content: flex-start;

          }

          .hero-stats {

            display: grid;

            grid-template-columns: repeat(4, minmax(0, 1fr));

            justify-items: start;

            column-gap: 0.6rem;

          }

          .hero-stat {

            text-align: left;

          }

          .hero-actions {

            flex-direction: column;

            width: 100%;

          }

          .hero-button {

            width: min(100%, 20rem);

          }

        }

      `}</style>



      <section id="home" ref={heroSectionRef} className="hero-shell">

        {/* ── VIDEO BACKGROUND WITH TRANSPARENCY ── */}

        <div className="hero-media">

          <div className="hero-media-glow" />

          <video

            className="hero-video"

            ref={videoRef}

            muted

            playsInline

            preload="metadata"

            fetchPriority="high"

          >

            <source src={`${videoSrc}#t=${VIDEO_START_TIME},${VIDEO_END_TIME}`} type="video/webm" />

            <source src={videoSrc} type="video/webm" />

            <source src={videoSrc} type="video/mp4" />

          </video>

          <div className="hero-bottom-fade" />

        </div>



        {/* ── CONTENT ── */}

        <div className="hero-content">

          <div className="hero-inner">

            <div

              className="hero-copy"

              style={{

                opacity: startTyping ? 1 : 0,

                transform: startTyping ? 'translateY(0)' : 'translateY(20px)',

                transition: 'opacity 0.6s ease, transform 0.6s ease',

              }}

            >

              {/* LINE 1 — greeting */}

              <p className="hero-eyebrow" style={{ color: eyebrowColor }}>

                {tw1.displayed}

                {!tw1.done && tw1.displayed.length > 0 && <Cursor isDark={isDark} />}

              </p>



              {/* LINE 2 — name */}

              <h1 className="hero-name" style={{ color: nameColor }}>

                {nameL1}

                {nameL2 === null && !tw2.done && tw2.displayed.length > 0 && <Cursor isDark={isDark} />}

                {nameL2 !== null && (

                  <>

                    <br />

                    {nameL2}

                    {!tw2.done && <Cursor isDark={isDark} />}

                  </>

                )}

              </h1>



              {/* LINE 3 — badge */}

              <div className="hero-badge-row">

                {tw3.displayed.length > 0 && (

                  <h2

                    className="hero-badge"

                    style={{

                      background: badgeBg,

                      color: badgeColor,

                      border: badgeBorder,

                    }}

                  >

                    {tw3.displayed}

                    {!tw3.done && <Cursor isDark={isDark} />}

                  </h2>

                )}

              </div>



              {/* LINE 4 — tagline */}

              <p className="hero-tagline" style={{ color: taglineColor }}>

                {tw4.displayed}

                {!tw4.done && tw4.displayed.length > 0 && <Cursor isDark={isDark} />}

              </p>



              {/* CTAs */}

              <div

                className="hero-actions"

                style={{

                  opacity: showBtns ? 1 : 0,

                  transform: showBtns ? 'translateY(0)' : 'translateY(16px)',

                  transition: 'opacity 0.7s ease, transform 0.7s ease',

                }}

              >

                <a

                  className="hero-button shadow-md"

                  href="/#projects"

                  style={{

                    background: isDark ? '#FFFFFF' : '#111827',

                    color: isDark ? '#000000' : '#FFFFFF',

                    border: 'none',

                    textDecoration: 'none',

                  }}

                  onClick={(e) => {

                    e.preventDefault();

                    scrollToSection('projects');

                  }}

                  onMouseEnter={(e) => {

                    e.currentTarget.style.background = isDark ? '#C9A84C' : '#2563EB';

                    e.currentTarget.style.color = isDark ? '#000000' : '#FFFFFF';

                  }}

                  onMouseLeave={(e) => {

                    e.currentTarget.style.background = isDark ? '#FFFFFF' : '#111827';

                    e.currentTarget.style.color = isDark ? '#000000' : '#FFFFFF';

                  }}

                >

                  See the work

                </a>



                <a

                  className="hero-button"

                  href="/resume.pdf"

                  download="Anisha-Singla-Resume.pdf"

                  style={{

                    color: isDark ? '#C9A84C' : '#2563EB',

                    border: `1.5px solid ${isDark ? '#C9A84C' : '#2563EB'}`,

                    background: isDark ? 'transparent' : 'rgba(37,99,235,0.06)',

                    gap: '0.5rem',

                    textDecoration: 'none',

                  }}

                  onMouseEnter={(e) => {

                    e.currentTarget.style.background = isDark ? '#C9A84C' : '#2563EB';

                    e.currentTarget.style.color = '#FFFFFF';

                  }}

                  onMouseLeave={(e) => {

                    e.currentTarget.style.background = isDark ? 'transparent' : 'rgba(37,99,235,0.06)';

                    e.currentTarget.style.color = isDark ? '#C9A84C' : '#2563EB';

                  }}

                >

                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">

                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />

                    <polyline points="7 10 12 15 17 10" />

                    <line x1="12" y1="15" x2="12" y2="3" />

                  </svg>

                  Resume

                </a>



                <button

                  className="hero-button shadow-md"

                  style={{

                    background: isDark ? '#C9A84C' : '#2563EB',

                    color: isDark ? '#000000' : '#FFFFFF',

                    border: `1px solid ${isDark ? '#C9A84C' : '#2563EB'}`,

                    cursor: 'pointer',

                  }}

                  onClick={() => {

                    window.location.href = 'mailto:anishasingla23@gmail.com';

                  }}

                  onMouseEnter={(e) => {

                    e.currentTarget.style.background = isDark ? 'transparent' : '#1D4ED8';

                    e.currentTarget.style.color = isDark ? '#C9A84C' : '#FFFFFF';

                    e.currentTarget.style.borderColor = isDark ? '#C9A84C' : '#1D4ED8';

                  }}

                  onMouseLeave={(e) => {

                    e.currentTarget.style.background = isDark ? '#C9A84C' : '#2563EB';

                    e.currentTarget.style.color = isDark ? '#000000' : '#FFFFFF';

                    e.currentTarget.style.borderColor = isDark ? '#C9A84C' : '#2563EB';

                  }}

                >

                  Get in touch

                </button>

              </div>



              {/* Stats */}

              <div

                className="hero-stats"

                style={{

                  opacity: showBtns ? 1 : 0,

                  transform: showBtns ? 'translateY(0)' : 'translateY(16px)',

                  transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',

                  borderTop: `1px solid ${statDivColor}`,

                }}

              >

                {HERO_STATS.map((s) => (

                  <div key={s.label} className="hero-stat">

                    <div className="hero-stat-value">{s.value}</div>

                    <p className="hero-stat-label" style={{ color: statLabelColor }}>

                      {s.label}

                    </p>

                  </div>

                ))}

              </div>



              {/* Social bar */}

              <div

                className="hero-link-row"

                style={{

                  opacity: showBtns ? 1 : 0,

                  transition: 'opacity 0.7s ease 0.2s',

                }}

              >

                <SocialBar size="md" />

              </div>

            </div>

          </div>

        </div>

      </section>

    </>

  );

}






/////////////////////////////////////////////////////////

// import { useEffect, useRef, useState } from 'react';
// import { scrollToSection } from '../routes';
// import SocialBar from './SocialBar';
// import { useTheme } from '../context/ThemeContext';

// // ── Typewriter hook ──────────────────────────────────────────────
// function useTypewriter(text, { enabled = true, startDelay = 0, duration = 1000 } = {}) {
//   const [elapsed, setElapsed] = useState(0);
//   const safeDuration = Math.max(duration, 1);
//   const safeText = enabled ? (text ?? '') : '';

//   useEffect(() => {
//     if (!enabled || !text) return undefined;
//     let timeoutId;
//     let frameId;
//     let animationStart = 0;
//     timeoutId = window.setTimeout(() => {
//       setElapsed(0);
//       const step = (ts) => {
//         if (!animationStart) animationStart = ts;
//         const next = Math.min(ts - animationStart, safeDuration);
//         setElapsed(next);
//         if (next < safeDuration) frameId = window.requestAnimationFrame(step);
//       };
//       frameId = window.requestAnimationFrame(step);
//     }, startDelay);
//     return () => {
//       window.clearTimeout(timeoutId);
//       if (frameId) window.cancelAnimationFrame(frameId);
//     };
//   }, [enabled, safeDuration, startDelay, text]);

//   if (!enabled) return { displayed: '', done: false };
//   if (!safeText) return { displayed: '', done: true };
//   const progress = Math.min(elapsed / safeDuration, 1);
//   const count = progress <= 0 ? 0 : Math.ceil(progress * safeText.length);
//   return { displayed: safeText.slice(0, count), done: progress >= 1 };
// }

// // ── Blinking cursor ──────────────────────────────────────────────
// function Cursor() {
//   const { isDark } = useTheme();
//   const [blink, setBlink] = useState(true);
//   useEffect(() => {
//     const t = setInterval(() => setBlink((b) => !b), 530);
//     return () => clearInterval(t);
//   }, []);
//   return (
//     <span
//       style={{
//         opacity: blink ? 1 : 0,
//         transition: 'opacity 0.1s',
//         color: isDark ? '#C9A84C' : '#2563EB',
//         fontWeight: 'bold',
//       }}
//     >
//       |
//     </span>
//   );
// }

// // ── Count-up hook (for stats) ────────────────────────────────────
// function useCountUp(target, enabled, duration = 1400, delay = 0) {
//   const [value, setValue] = useState(0);
//   useEffect(() => {
//     if (!enabled) return undefined;
//     let frameId;
//     let start = 0;
//     const timeoutId = window.setTimeout(() => {
//       const step = (ts) => {
//         if (!start) start = ts;
//         const p = Math.min((ts - start) / duration, 1);
//         const eased = 1 - Math.pow(1 - p, 3);
//         setValue(Math.round(eased * target));
//         if (p < 1) frameId = window.requestAnimationFrame(step);
//       };
//       frameId = window.requestAnimationFrame(step);
//     }, delay);
//     return () => {
//       window.clearTimeout(timeoutId);
//       if (frameId) window.cancelAnimationFrame(frameId);
//     };
//   }, [enabled, target, duration, delay]);
//   return value;
// }

// const HERO_STATS = [
//   { value: '3', label: 'AI products in production' },
//   { value: '10', label: 'clients delivered' },
//   { value: '3', label: 'verticals served' },
//   { value: '100%', label: 'on-time delivery' },
// ];

// const PARTICLES = Array.from({ length: 26 }, (_, i) => {
//   const r = (n) => {
//     const x = Math.sin((i + 1) * n) * 10000;
//     return x - Math.floor(x);
//   };
//   return {
//     left: `${Math.round(r(12.9898) * 100)}%`,
//     size: 2 + Math.round(r(78.233) * 3),
//     delay: (r(39.346) * 14).toFixed(1),
//     dur: (11 + r(11.135) * 12).toFixed(1),
//   };
// });

// function StatItem({ stat, enabled, index, baseDelay = 0 }) {
//   const numeric = parseInt(stat.value, 10);
//   const suffix = stat.value.replace(/\d+/g, '');
//   const count = useCountUp(numeric, enabled, 1000, baseDelay + index * 120);
//   return (
//     <div className="hero-stat">
//       <div className="hero-stat-value">
//         {count}
//         {suffix}
//       </div>
//       <p className="hero-stat-label">{stat.label}</p>
//     </div>
//   );
// }

// export default function Hero() {
//   const { isDark } = useTheme();

//   const LINE1 = 'Hey, there';
//   const NAME1 = 'Anisha';
//   const NAME2 = 'Singla';
//   const LINE3 = 'AI Strategist & Business Analyst';
//   // Spoken line (synced to dialogue) + supporting line (appears right after)
//   const LINE4A = 'I turn AI pilots into production systems.';
//   const LINE4B =
//     'Three AI products shipped, ten clients delivered, and no demos that died on the way to launch.';
//   const LINE4 = `${LINE4A} ${LINE4B}`;

//   // ── Video timing (edit these) ──
//   // The dialogue script is written for 10s. The REAL video length is auto-detected
//   // from the file, and every cue is scaled to it (so a 9s clip still shows everything).
//   const SCRIPT_DURATION_S = 9;
//   const VIDEO_START_TIME = 1; // seconds
//   const VIDEO_STOP_S = 8.9; // video freezes on this frame (seconds)

//   const VERCEL_VIDEO_URL = 'Sample-video.webm';
//   const videoSrc =
//     VERCEL_VIDEO_URL.startsWith('http') || VERCEL_VIDEO_URL.startsWith('/')
//       ? VERCEL_VIDEO_URL
//       : `/${VERCEL_VIDEO_URL}`;

//   const [isVideoPlaying, setIsVideoPlaying] = useState(false);
//   const [startTyping, setStartTyping] = useState(false);
//   const [stage, setStage] = useState(0); // how many text cues have fired (driven by video time)
//   const [isMuted, setIsMuted] = useState(false);
//   const [S, setS] = useState(1); // time scale = real video length / script length
//   const userChoseSoundRef = useRef(false);
//   const videoStoppedRef = useRef(false);

//   // Cues = video time (seconds) when each line appears, synced to the dialogue:
//   //  1–3s "Hey, there!" | 3–5s "I'm Anisha Singla." | 5–7s "AI Strategist and Business Analyst."
//   //  7–10s "I turn AI pilots into production systems." | then support line, buttons, stats, socials
//   const CUES = [1, 3, 5, 7, 9.2].map((c) => c * S);
//   const on = (n) => (stage >= n ? ' on' : '');
//   const cuesRef = useRef(CUES);
//   cuesRef.current = CUES;

//   // Continuous typewriter: each line starts at its dialogue cue, the support line
//   // starts right after the spoken line finishes, buttons/stats/socials follow.
//   const tw1 = useTypewriter(LINE1, { enabled: stage >= 1, duration: 900 * S });
//   const tw2 = useTypewriter(`${NAME1}\n${NAME2}`, { enabled: stage >= 2, duration: 1500 * S });
//   const tw3 = useTypewriter(LINE3, { enabled: stage >= 3, duration: 1700 * S });
//   const tw4 = useTypewriter(LINE4A, { enabled: stage >= 4, duration: 2200 * S });
//   const tw5 = useTypewriter(LINE4B, { enabled: stage >= 5 && tw4.done, duration: 2200 * S });
//   const showBtns = tw5.done;
//   const nameParts = tw2.displayed.split('\n');
//   const nameL1 = nameParts[0] || '';
//   const nameL2 = nameParts[1] !== undefined ? nameParts[1] : null;

//   const videoRef = useRef(null);
//   const heroSectionRef = useRef(null);

//   // Text timeline is anchored to the moment the video actually starts playing (t = 0s)
//   useEffect(() => {
//     if (isVideoPlaying) setStartTyping(true);
//   }, [isVideoPlaying]);

//   // Fallback if video never fires "playing" (autoplay blocked, slow network)
//   useEffect(() => {
//     const id = window.setTimeout(() => setStartTyping(true), 1500);
//     return () => window.clearTimeout(id);
//   }, []);

//   // Text clock: follows video.currentTime so lines stay in sync with the voice
//   // (even if the video buffers). If the video never plays, a timer takes over.
//   useEffect(() => {
//     let raf;
//     const mountedAt = performance.now();
//     let fallbackStart = 0;

//     let endedAt = 0;
//     let stoppedAt = 0;
//     const tick = (now) => {
//       const cues = cuesRef.current;
//       const v = videoRef.current;

//       // freeze the video exactly at VIDEO_STOP_S
//       if (v && !stoppedAt && !v.paused && !v.ended && v.currentTime >= VIDEO_STOP_S) {
//         v.pause();
//         videoStoppedRef.current = true;
//         stoppedAt = now;
//       }

//       let t;
//       if (stoppedAt) {
//         // video frozen -> clock keeps running so the typing / buttons / stats still play out
//         t = VIDEO_STOP_S + (now - stoppedAt) / 1000;
//       } else if (v && v.ended) {
//         videoStoppedRef.current = true;
//         if (!endedAt) endedAt = now;
//         const dur = Number.isFinite(v.duration) ? v.duration : cues[cues.length - 1];
//         t = dur + (now - endedAt) / 1000;
//       } else if (v && (!v.paused || v.currentTime > 0)) {
//         t = v.currentTime;
//         fallbackStart = 0;
//       } else if (now - mountedAt > 2500) {
//         if (!fallbackStart) fallbackStart = now;
//         t = (now - fallbackStart) / 1000;
//       } else {
//         t = -1;
//       }
//       let st = 0;
//       for (let i = 0; i < cues.length; i += 1) if (t >= cues[i]) st = i + 1;
//       setStage((prev) => (st > prev ? st : prev)); // never goes backwards
//       const finished = st >= cues.length && (stoppedAt || (v && v.ended));
//       if (!finished && now - mountedAt < 60000) raf = window.requestAnimationFrame(tick);
//     };
//     raf = window.requestAnimationFrame(tick);
//     return () => window.cancelAnimationFrame(raf);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // Browsers block autoplay-with-sound. If that happened, the first click/tap/key anywhere unmutes.
//   useEffect(() => {
//     const unlock = () => {
//       const v = videoRef.current;
//       if (!v || userChoseSoundRef.current) return;
//       v.muted = false;
//       if (v.volume === 0) v.volume = 1;
//       if (v.paused && !v.ended && !videoStoppedRef.current) {
//         const p = v.play();
//         if (p?.catch) p.catch(() => { });
//       }
//     };
//     const events = ['pointerdown', 'pointerup', 'click', 'keydown', 'touchstart', 'touchend'];
//     events.forEach((e) => window.addEventListener(e, unlock, { once: true, passive: true }));
//     return () => events.forEach((e) => window.removeEventListener(e, unlock));
//   }, []);

//   const toggleSound = () => {
//     const v = videoRef.current;
//     if (!v) return;
//     userChoseSoundRef.current = true;
//     v.muted = !v.muted;
//     if (!v.muted && v.volume === 0) v.volume = 1;
//     if (v.paused && !v.ended && !videoStoppedRef.current) {
//       const p = v.play();
//       if (p?.catch) p.catch(() => { });
//     }
//   };

//   // Video control
//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video) return undefined;

//     let readyTimerId;
//     const seekToStart = () => {
//       try {
//         if (video.currentTime < VIDEO_START_TIME) video.currentTime = VIDEO_START_TIME;
//       } catch {
//         /* not seekable yet */
//       }
//     };
//     const onMeta = () => {
//       seekToStart();
//       if (Number.isFinite(video.duration) && video.duration > 1) {
//         setS(video.duration / SCRIPT_DURATION_S);
//       }
//     };
//     const onData = () => seekToStart();
//     const onPlaying = () => {
//       seekToStart();
//       setIsVideoPlaying(true);
//     };
//     const onTime = () => {
//       if (video.currentTime < VIDEO_START_TIME) {
//         seekToStart();
//         return;
//       }
//     };

//     if (video.readyState >= 1) onMeta();
//     if (!video.paused && video.currentTime >= VIDEO_START_TIME) setIsVideoPlaying(true);

//     video.addEventListener('loadedmetadata', onMeta);
//     video.addEventListener('loadeddata', onData);
//     video.addEventListener('playing', onPlaying);
//     const onVol = () => setIsMuted(video.muted);
//     video.addEventListener('timeupdate', onTime);
//     video.addEventListener('volumechange', onVol);

//     // Try with sound first; if the browser blocks it, fall back to muted (first click unmutes)
//     video.muted = false;
//     setIsMuted(false);
//     const p = video.play();
//     if (p?.catch) {
//       p.catch(() => {
//         video.muted = true;
//         setIsMuted(true);
//         const p2 = video.play();
//         if (p2?.catch) p2.catch(() => { });
//       });
//     }
//     if (video.readyState >= 2) readyTimerId = window.setTimeout(onData, 0);

//     return () => {
//       if (readyTimerId) window.clearTimeout(readyTimerId);
//       video.removeEventListener('loadedmetadata', onMeta);
//       video.removeEventListener('loadeddata', onData);
//       video.removeEventListener('playing', onPlaying);
//       video.removeEventListener('timeupdate', onTime);
//       video.removeEventListener('volumechange', onVol);
//       video.pause();
//       seekToStart();
//     };
//   }, []);

//   // Mouse parallax (CSS vars only, no re-render)
//   useEffect(() => {
//     const el = heroSectionRef.current;
//     if (!el) return undefined;
//     if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
//     if (window.matchMedia('(max-width: 768px)').matches) return undefined;

//     let raf;
//     const onMove = (e) => {
//       if (raf) return;
//       raf = window.requestAnimationFrame(() => {
//         const r = el.getBoundingClientRect();
//         const x = (e.clientX - r.left) / r.width - 0.5;
//         const y = (e.clientY - r.top) / r.height - 0.5;
//         el.style.setProperty('--mx', x.toFixed(3));
//         el.style.setProperty('--my', y.toFixed(3));
//         raf = 0;
//       });
//     };
//     el.addEventListener('mousemove', onMove);
//     return () => {
//       el.removeEventListener('mousemove', onMove);
//       if (raf) window.cancelAnimationFrame(raf);
//     };
//   }, []);

//   // ── Reveal timeline (ms after text start) ──
//   // Stagger inside each line (the line itself starts from CUES, driven by video time)
//   const LETTER_STEP = 110 * S; // "Anisha Singla" types in over ~1.3s
//   const WORD_STEP = 280 * S; // spoken line: 7 words over ~2s, matches speech pace
//   const WORD_STEP_2 = 45 * S; // supporting line: quick

//   const words1 = LINE4A.split(' ');
//   const words2 = LINE4B.split(' ');

//   // ── Palette ──
//   const accent = isDark ? '#C9A84C' : '#2563EB';
//   const accentSoft = isDark ? '#E8C97A' : '#3B82F6';
//   const bg = isDark ? '#060912' : '#F3F5FF';
//   const nameColor = isDark ? '#FFFFFF' : '#0F172A';
//   const taglineColor = isDark ? 'rgba(255,255,255,0.7)' : '#374151';
//   const statLabelColor = isDark ? 'rgba(255,255,255,0.5)' : '#4B5563';
//   const lineColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.1)';

//   return (
//     <>
//       <style>{`
//         .hero-shell {
//           --mx: 0;
//           --my: 0;
//           --accent: ${accent};
//           --accent-soft: ${accentSoft};
//           position: relative;
//           min-height: calc(100svh - var(--availability-banner-h, 65px) - 12px);
//           width: 100%;
//           max-width: 100%;
//           overflow: hidden;
//           display: flex;
//           align-items: stretch;
//           background: ${bg};
//           isolation: isolate;
//           transition: background 0.4s ease;
//         }

//         /* ───────── BACKGROUND SYSTEM (studio / depth) ───────── */
//         .hero-bg { position: absolute; inset: 0; z-index: 0; overflow: hidden; pointer-events: none; }

//         .hero-bg-base {
//           position: absolute; inset: 0;
//           background: ${isDark
//           ? `radial-gradient(1100px 760px at 24% 48%, rgba(79,70,229,0.38), transparent 62%),
//                radial-gradient(900px 640px at 88% 12%, rgba(201,168,76,0.16), transparent 60%),
//                radial-gradient(800px 600px at 60% 112%, rgba(14,165,233,0.22), transparent 60%),
//                linear-gradient(160deg, #0a0f24 0%, #070a18 55%, #04060d 100%)`
//           : `radial-gradient(1100px 760px at 24% 48%, rgba(99,102,241,0.30), transparent 62%),
//                radial-gradient(900px 640px at 88% 10%, rgba(251,191,36,0.22), transparent 60%),
//                radial-gradient(800px 600px at 60% 112%, rgba(56,189,248,0.26), transparent 60%),
//                linear-gradient(160deg, #EAEEFF 0%, #F6F7FF 50%, #FFF6EA 100%)`};
//         }

//         .hero-aurora { position: absolute; border-radius: 50%; filter: blur(90px); will-change: transform; }
//         .hero-aurora.a1 {
//           width: 640px; height: 640px; left: -8%; top: 2%;
//           background: ${isDark ? 'rgba(99,102,241,0.42)' : 'rgba(99,102,241,0.28)'};
//           animation: aur1 18s ease-in-out infinite;
//         }
//         .hero-aurora.a2 {
//           width: 520px; height: 520px; left: 26%; bottom: -20%;
//           background: ${isDark ? 'rgba(14,165,233,0.30)' : 'rgba(56,189,248,0.32)'};
//           animation: aur2 22s ease-in-out infinite;
//         }
//         .hero-aurora.a3 {
//           width: 460px; height: 460px; right: -6%; top: -12%;
//           background: ${isDark ? 'rgba(201,168,76,0.22)' : 'rgba(251,191,36,0.30)'};
//           animation: aur3 20s ease-in-out infinite;
//         }
//         @keyframes aur1 { 0%,100% { transform: translate(0,0) scale(1);} 50% { transform: translate(70px,50px) scale(1.12);} }
//         @keyframes aur2 { 0%,100% { transform: translate(0,0) scale(1);} 50% { transform: translate(-60px,-50px) scale(1.15);} }
//         @keyframes aur3 { 0%,100% { transform: translate(0,0) scale(1);} 50% { transform: translate(-40px,60px) scale(1.1);} }

//         /* studio light strips */
//         .hero-beams { position: absolute; inset: 0; }
//         .hero-beams i {
//           position: absolute; top: -25%; width: 150px; height: 150%;
//           transform: rotate(18deg);
//           background: linear-gradient(to bottom, transparent, ${isDark ? 'rgba(165,180,252,0.16)' : 'rgba(99,102,241,0.11)'}, transparent);
//           filter: blur(22px);
//           animation: beamShift 9s ease-in-out infinite;
//         }
//         .hero-beams i:nth-child(1) { left: 6%; }
//         .hero-beams i:nth-child(2) { left: 20%; width: 90px; animation-delay: -3s; }
//         .hero-beams i:nth-child(3) { left: 36%; width: 200px; animation-delay: -6s; }
//         @keyframes beamShift { 0%,100% { opacity: .45; transform: rotate(18deg) translateX(0);} 50% { opacity: 1; transform: rotate(18deg) translateX(40px);} }

//         /* perspective floor grid (the "stage") */
//         .hero-floorgrid {
//           position: absolute; left: -10%; right: -10%; bottom: 0; height: 48%;
//           overflow: hidden;
//           -webkit-mask-image: linear-gradient(to top, #000 8%, transparent 92%);
//                   mask-image: linear-gradient(to top, #000 8%, transparent 92%);
//         }
//         .hero-floorgrid::before {
//           content: ''; position: absolute; left: -30%; right: -30%; top: -60%; bottom: 0;
//           background-image:
//             linear-gradient(${isDark ? 'rgba(129,140,248,0.32)' : 'rgba(79,70,229,0.20)'} 1px, transparent 1px),
//             linear-gradient(90deg, ${isDark ? 'rgba(129,140,248,0.32)' : 'rgba(79,70,229,0.20)'} 1px, transparent 1px);
//           background-size: 72px 72px;
//           transform: perspective(520px) rotateX(64deg);
//           transform-origin: 50% 100%;
//           animation: gridMove 5s linear infinite;
//         }
//         @keyframes gridMove { to { background-position: 0 72px; } }

//         /* spotlight + floor glow behind character */
//         .hero-spot {
//           position: absolute;
//           left: clamp(200px, 22vw, 400px);
//           top: 2%;
//           width: 600px; height: 88%;
//           transform: translateX(-50%) translate3d(calc(var(--mx) * 14px), calc(var(--my) * 8px), 0);
//           background: ${isDark
//           ? 'conic-gradient(from 180deg at 50% 0%, transparent 36%, rgba(165,180,252,0.22) 50%, transparent 64%)'
//           : 'conic-gradient(from 180deg at 50% 0%, transparent 36%, rgba(99,102,241,0.18) 50%, transparent 64%)'};
//           filter: blur(16px);
//         }
//         .hero-floor {
//           position: absolute;
//           left: clamp(200px, 22vw, 400px);
//           bottom: 5%;
//           width: 700px; height: 130px;
//           transform: translateX(-50%);
//           background: radial-gradient(ellipse at center, ${isDark ? 'rgba(129,140,248,0.50)' : 'rgba(79,70,229,0.28)'} 0%, transparent 70%);
//           filter: blur(14px);
//           animation: floorPulse 5s ease-in-out infinite;
//         }
//         @keyframes floorPulse { 0%,100% { opacity: .7; transform: translateX(-50%) scaleX(1);} 50% { opacity: 1; transform: translateX(-50%) scaleX(1.08);} }

//         /* giant outlined word behind the copy */
//         .hero-giant {
//           position: absolute; right: 1%; top: 4%;
//           font-family: 'Bebas Neue', sans-serif;
//           font-size: clamp(16rem, 40vw, 42rem); line-height: 0.8; letter-spacing: 0.02em;
//           color: transparent;
//           -webkit-text-stroke: 1.5px ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(79,70,229,0.12)'};
//           transform: translate3d(calc(var(--mx) * -18px), calc(var(--my) * -12px), 0);
//           user-select: none;
//         }

//         /* floating particles */
//         .hero-particles i {
//           position: absolute; bottom: -12px; border-radius: 50%;
//           background: ${accentSoft};
//           box-shadow: 0 0 10px ${accentSoft};
//           opacity: 0;
//           animation: rise var(--dur, 16s) linear var(--delay, 0s) infinite;
//         }
//         @keyframes rise {
//           0%   { transform: translateY(0); opacity: 0; }
//           12%  { opacity: ${isDark ? 0.8 : 0.55}; }
//           100% { transform: translateY(-112vh); opacity: 0; }
//         }

//         .hero-noise {
//           position: absolute; inset: 0;
//           opacity: ${isDark ? 0.08 : 0.05};
//           mix-blend-mode: ${isDark ? 'screen' : 'multiply'};
//           background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
//         }

//         /* gentle right-side readability veil (lighter than before) */
//         .hero-veil {
//           position: absolute; inset: 0;
//           background: linear-gradient(to left, ${isDark ? 'rgba(6,9,18,0.72)' : 'rgba(243,245,255,0.70)'} 0%, ${isDark ? 'rgba(6,9,18,0.42)' : 'rgba(243,245,255,0.40)'} 30%, transparent 60%);
//         }
//         .hero-vignette {
//           position: absolute; inset: 0;
//           background: radial-gradient(ellipse at 32% 52%, transparent 45%, ${isDark ? 'rgba(0,0,0,0.45)' : 'rgba(30,41,90,0.10)'} 100%);
//         }

//         /* ───────── VIDEO ───────── */
//         .hero-media {
//           position: absolute; inset: 0; z-index: 1;
//           width: 100%; max-width: 100%;
//           overflow: hidden; pointer-events: none;
//         }
//         .hero-video {
//           position: absolute; top: 0; left: 0;
//           height: 100%; width: auto; max-width: none; min-width: 0;
//           transform: translateX(-17.5%);
//           object-fit: contain; object-position: left center;
//           -webkit-mask-image: linear-gradient(to bottom, #000 90%, transparent 100%);
//                   mask-image: linear-gradient(to bottom, #000 90%, transparent 100%);
//           filter: drop-shadow(0 30px 40px rgba(0,0,0,${isDark ? 0.55 : 0.22}));
//           animation: videoIn 1.2s cubic-bezier(.2,.7,.2,1) both;
//         }
//         @keyframes videoIn {
//           from { opacity: 0; filter: blur(14px) drop-shadow(0 30px 40px rgba(0,0,0,0.3)); }
//           to   { opacity: 1; }
//         }
//         .hero-bottom-fade { display: none; }

//         /* ───────── CONTENT ───────── */
//         .hero-content {
//           position: relative; z-index: 10;
//           width: 100%; max-width: 100%;
//           display: flex; align-items: center;
//           min-height: calc(100svh - var(--availability-banner-h, 65px) - 12px);
//           padding: clamp(4.75rem, 8vh, 6rem) 0 clamp(2rem, 5vh, 3.5rem);
//           box-sizing: border-box;
//         }
//         .hero-inner {
//           max-width: 1320px; margin: 0 auto;
//           padding: 0 clamp(1.25rem, 4vw, 4rem);
//           width: 100%; box-sizing: border-box;
//         }
//         .hero-copy {
//           display: flex; flex-direction: column;
//           align-items: flex-end; text-align: right;
//           margin-left: auto;
//           width: min(50%, 42rem); max-width: 42rem;
//           min-height: min(560px, 72vh);
//           justify-content: center;
//         }
//         .hero-copy > * { max-width: 100%; }

//         /* blur-fade reveal */
//         .reveal { opacity: 0; }
//         .reveal.on {
//           animation: blurIn 0.95s cubic-bezier(.2,.7,.2,1) var(--d, 0ms) both;
//         }

//         /* sound toggle */
//         .hero-sound {
//           position: absolute; z-index: 13;
//           left: clamp(1.25rem, 4vw, 4rem);
//           top: clamp(5.25rem, 10vh, 7rem);
//           display: inline-flex; align-items: center; gap: 0.5rem;
//           padding: 0.55rem 0.95rem; border-radius: 999px; cursor: pointer;
//           font-family: 'DM Sans', sans-serif; font-size: 0.7rem; font-weight: 700;
//           letter-spacing: 0.1em; text-transform: uppercase;
//           color: ${isDark ? '#F3F4F6' : '#0F172A'};
//           background: ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.75)'};
//           border: 1px solid ${isDark ? 'rgba(201,168,76,0.35)' : 'rgba(37,99,235,0.3)'};
//           backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
//           transition: transform 0.2s ease, background 0.2s ease;
//         }
//         .hero-sound:hover { transform: translateY(-2px); }
//         .hero-sound.is-muted { animation: soundPulse 1.8s ease-in-out infinite; }
//         @keyframes soundPulse {
//           0%,100% { box-shadow: 0 0 0 0 ${isDark ? 'rgba(201,168,76,0.5)' : 'rgba(37,99,235,0.45)'}; }
//           50% { box-shadow: 0 0 0 10px transparent; }
//         }
//         @keyframes blurIn {
//           from { opacity: 0; filter: blur(16px); transform: translate3d(36px, 14px, 0); }
//           to   { opacity: 1; filter: blur(0);    transform: translate3d(0, 0, 0); }
//         }
//         .reveal-letter { display: inline-block; }
//         .reveal-word   { display: inline-block; }

//         .hero-eyebrow {
//           font-family: 'DM Sans', sans-serif;
//           font-style: italic;
//           font-size: clamp(1.1rem, 1.8vw, 1.5rem);
//           font-weight: 600; line-height: 1.1; letter-spacing: 0.02em;
//           margin: 0; color: ${accentSoft}; min-height: 1.2em;
//           display: inline-flex; align-items: center; gap: 0.75rem;
//         }
//         .hero-eyebrow::after {
//           content: ''; display: inline-block; width: 44px; height: 1.5px;
//           background: linear-gradient(90deg, transparent, ${accentSoft});
//         }

//         .hero-name {
//           font-family: 'Bebas Neue', sans-serif;
//           font-size: clamp(3.8rem, 7vw, 6.6rem);
//           font-weight: 900; line-height: 0.88; letter-spacing: 0.03em;
//           margin: 0.35rem 0 0; color: ${nameColor};
//         }
//         .hero-name .line { display: block; min-height: 0.88em; }
//         /* solid accent colour (gradient background-clip breaks with animated letters) */
//         .hero-name .line.accent {
//           color: ${accent};
//           text-shadow: 0 0 40px ${isDark ? 'rgba(201,168,76,0.35)' : 'rgba(37,99,235,0.25)'};
//         }

//         .hero-badge-row {
//           display: flex; align-items: center; justify-content: flex-end;
//           width: 100%; margin-top: 0.9rem; min-height: 2.4rem;
//         }
//         .hero-badge {
//           position: relative; overflow: hidden;
//           max-width: 100%; box-sizing: border-box; margin: 0;
//           font-family: 'DM Sans', sans-serif;
//           font-size: clamp(0.7rem, 0.95vw, 0.78rem);
//           font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;
//           padding: 0.5rem 1.2rem; border-radius: 6px; display: inline-block;
//           background: ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(37,99,235,0.08)'};
//           color: ${isDark ? '#E5E7EB' : '#1D4ED8'};
//           border: 1px solid ${isDark ? 'rgba(201,168,76,0.3)' : 'rgba(37,99,235,0.28)'};
//           backdrop-filter: blur(8px);
//         }
//         .hero-badge::after {
//           content: ''; position: absolute; top: 0; left: -60%; width: 40%; height: 100%;
//           background: linear-gradient(100deg, transparent, ${isDark ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.7)'}, transparent);
//           transform: skewX(-20deg);
//           animation: sweep 4.5s ease-in-out 3s infinite;
//         }
//         @keyframes sweep { 0% { left: -60%; } 40%,100% { left: 130%; } }

//         .hero-tagline {
//           font-family: 'DM Sans', sans-serif;
//           font-size: clamp(0.95rem, 1.1vw, 1.06rem);
//           font-style: italic; font-weight: 400; line-height: 1.65;
//           margin: 1.1rem 0 0; max-width: 27rem; min-height: 7em;
//           color: ${taglineColor};
//         }
//         .hero-tagline .tagline-spoken {
//           font-style: normal; font-weight: 600;
//           color: ${nameColor};
//         }

//         .hero-actions {
//           display: flex; flex-wrap: wrap; gap: 0.75rem;
//           margin-top: 1.5rem; justify-content: flex-end; width: 100%;
//         }
//         .hero-button {
//           position: relative; overflow: hidden;
//           display: inline-flex; align-items: center; justify-content: center;
//           min-height: 44px; padding: 0.7rem 1.6rem; box-sizing: border-box;
//           font-family: 'DM Sans', sans-serif;
//           font-size: clamp(0.68rem, 0.8vw, 0.72rem);
//           font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase;
//           border-radius: 10px; cursor: pointer; text-decoration: none;
//           transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
//         }
//         .hero-button:hover { transform: translateY(-3px); }
//         .hero-button.primary {
//           background: ${isDark ? '#FFFFFF' : '#0F172A'}; color: ${isDark ? '#000' : '#FFF'}; border: none;
//           box-shadow: 0 10px 28px rgba(0,0,0,${isDark ? 0.4 : 0.18});
//         }
//         .hero-button.primary:hover { background: ${accent}; color: ${isDark ? '#000' : '#FFF'}; box-shadow: 0 14px 34px ${isDark ? 'rgba(201,168,76,0.35)' : 'rgba(37,99,235,0.35)'}; }
//         .hero-button.ghost {
//           color: ${accent}; border: 1.5px solid ${accent}; gap: 0.5rem;
//           background: ${isDark ? 'transparent' : 'rgba(37,99,235,0.06)'};
//         }
//         .hero-button.ghost:hover { background: ${accent}; color: ${isDark ? '#000' : '#FFF'}; }
//         .hero-button.solid {
//           background: ${accent}; color: ${isDark ? '#000' : '#FFF'}; border: 1px solid ${accent};
//           box-shadow: 0 10px 28px ${isDark ? 'rgba(201,168,76,0.25)' : 'rgba(37,99,235,0.3)'};
//         }
//         .hero-button.solid:hover { background: ${isDark ? 'transparent' : '#1D4ED8'}; color: ${isDark ? accent : '#FFF'}; }

//         .hero-stats {
//           display: flex; gap: 1.5rem;
//           margin-top: 1.6rem; padding-top: 1.2rem;
//           justify-content: flex-end; width: 100%; flex-wrap: wrap;
//           border-top: 1px solid ${lineColor};
//         }
//         .hero-stat { text-align: center; min-width: 3.6rem; }
//         .hero-stat-value {
//           font-family: 'Bebas Neue', sans-serif;
//           font-size: clamp(1.5rem, 2.1vw, 2rem);
//           color: ${accent}; line-height: 1;
//           font-variant-numeric: tabular-nums;
//         }
//         .hero-stat-label {
//           font-family: 'DM Sans', sans-serif;
//           font-size: 0.62rem; letter-spacing: 0.02em;
//           margin: 0.3rem 0 0; line-height: 1.25; max-width: 6rem;
//           font-weight: 500; color: ${statLabelColor};
//         }

//         .hero-link-row {
//           display: flex; align-items: center;
//           margin-top: 1.2rem; justify-content: flex-end; width: 100%;
//         }

//         /* scroll cue */
//         .hero-scroll {
//           position: absolute; z-index: 11;
//           left: clamp(1.25rem, 4vw, 4rem); bottom: 2.2rem;
//           display: flex; align-items: center; gap: 0.7rem;
//           font-family: 'DM Sans', sans-serif; font-size: 0.64rem;
//           letter-spacing: 0.3em; text-transform: uppercase;
//           color: ${statLabelColor};
//           opacity: 0;
//         }
//         .hero-shell.is-in .hero-scroll { animation: blurIn 1s ease ${(10.8 * S).toFixed(2)}s both; }
//         .hero-scroll-line {
//           position: relative; width: 1.5px; height: 44px; overflow: hidden;
//           background: ${lineColor};
//         }
//         .hero-scroll-line::after {
//           content: ''; position: absolute; left: 0; top: -50%; width: 100%; height: 50%;
//           background: ${accent};
//           animation: scrollDrop 2s cubic-bezier(.6,0,.3,1) infinite;
//         }
//         @keyframes scrollDrop { to { top: 110%; } }

//         /* ───────── RESPONSIVE ───────── */
//         @media (max-width: 1100px) {
//           .hero-media-glow, .hero-spot { left: 24%; }
//           .hero-floor { left: 24%; width: 460px; }
//           .hero-copy { width: min(56%, 36rem); }
//         }
//         @media (max-width: 900px) {
//           .hero-copy { width: min(62%, 34rem); }
//         }
//         @media (max-width: 768px) {
//           .hero-content { align-items: flex-end; padding: 6rem 0 2.5rem; }
//           .hero-inner { padding: 0 1.25rem; }
//           .hero-video {
//             inset: 0; left: 0; width: 100%; height: 100%; min-width: 0;
//             transform: none; object-fit: cover; object-position: 20% top;
//             opacity: ${isDark ? 0.9 : 0.85};
//           }
//           .hero-veil { background: linear-gradient(to top, ${bg} 18%, ${isDark ? 'rgba(5,5,5,0.7)' : 'rgba(250,248,245,0.7)'} 45%, transparent 75%); }
//           .hero-spot, .hero-floor, .hero-scroll { display: none; }
//           .hero-copy {
//             width: 100%; max-width: none;
//             align-items: flex-start; text-align: left; margin-left: 0;
//           }
//           .hero-eyebrow::after { display: none; }
//           .hero-name { font-size: clamp(3.4rem, 16vw, 5.5rem); }
//           .hero-badge-row, .hero-actions, .hero-link-row { justify-content: flex-start; }
//           .hero-stats {
//             display: grid; grid-template-columns: repeat(4, minmax(0, 1fr));
//             justify-items: start; column-gap: 0.6rem;
//           }
//           .hero-stat { text-align: left; }
//           .hero-actions { flex-direction: column; width: 100%; }
//           .hero-button { width: min(100%, 20rem); }
//           .reveal { --shift: -20px; }
//           .reveal.on { animation-name: blurInMobile; }
//           .hero-sound { top: 5rem; }
//         }
//         @keyframes blurInMobile {
//           from { opacity: 0; filter: blur(14px); transform: translate3d(0, 22px, 0); }
//           to   { opacity: 1; filter: blur(0);    transform: translate3d(0, 0, 0); }
//         }

//         @media (prefers-reduced-motion: reduce) {
//           .hero-aurora, .hero-beams i, .hero-floorgrid::before, .hero-particles i, .hero-floor,
//           .hero-badge::after, .hero-scroll-line::after { animation: none !important; }
//           .hero-particles { display: none; }
//           .reveal.on { animation-duration: 0.01s !important; }
//         }
//       `}</style>

//       <section
//         id="home"
//         ref={heroSectionRef}
//         className={`hero-shell${startTyping ? ' is-in' : ''}`}
//       >
//         {/* ── BACKGROUND ── */}
//         <div className="hero-bg" aria-hidden="true">
//           <div className="hero-bg-base" />
//           <div className="hero-aurora a1" />
//           <div className="hero-aurora a2" />
//           <div className="hero-aurora a3" />
//           <div className="hero-beams"><i /><i /><i /></div>
//           <div className="hero-floorgrid" />
//           <div className="hero-spot" />
//           <div className="hero-floor" />
//           <div className="hero-giant">AI</div>
//           <div className="hero-particles">
//             {PARTICLES.map((p, i) => (
//               <i
//                 key={i}
//                 style={{ left: p.left, width: p.size, height: p.size, '--delay': `-${p.delay}s`, '--dur': `${p.dur}s` }}
//               />
//             ))}
//           </div>
//           <div className="hero-noise" />
//           <div className="hero-veil" />
//           <div className="hero-vignette" />
//         </div>

//         {/* ── VIDEO (transparent webm) ── */}
//         <div className="hero-media">
//           <video
//             className="hero-video"
//             ref={videoRef}
//             playsInline
//             preload="metadata"
//             fetchPriority="high"
//           >
//             <source src={`${videoSrc}#t=${VIDEO_START_TIME}`} type="video/webm" />
//             <source src={videoSrc} type="video/webm" />
//             <source src={videoSrc} type="video/mp4" />
//           </video>
//           <div className="hero-bottom-fade" />
//         </div>

//         {/* sound toggle */}
//         <button
//           type="button"
//           className={`hero-sound${isMuted ? ' is-muted' : ''}`}
//           onClick={toggleSound}
//           aria-label={isMuted ? 'Turn sound on' : 'Mute video'}
//         >
//           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//             <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
//             {isMuted ? (
//               <>
//                 <line x1="22" y1="9" x2="16" y2="15" />
//                 <line x1="16" y1="9" x2="22" y2="15" />
//               </>
//             ) : (
//               <>
//                 <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
//                 <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
//               </>
//             )}
//           </svg>
//           <span>{isMuted ? 'Tap for sound' : 'Sound on'}</span>
//         </button>

//         {/* ── CONTENT ── */}
//         <div className="hero-content">
//           <div className="hero-inner">
//             <div className={`hero-copy${startTyping ? ' is-in' : ''}`}>
//               {/* LINE 1 — greeting */}
//               <p className="hero-eyebrow">
//                 {tw1.displayed}
//                 {stage >= 1 && !tw1.done && <Cursor />}
//               </p>

//               {/* LINE 2 — name */}
//               <h1 className="hero-name" aria-label={`${NAME1} ${NAME2}`}>
//                 <span className="line" aria-hidden="true">
//                   {nameL1}
//                   {stage >= 2 && nameL2 === null && !tw2.done && <Cursor />}
//                 </span>
//                 <span className="line accent" aria-hidden="true">
//                   {nameL2 ?? ''}
//                   {nameL2 !== null && !tw2.done && <Cursor />}
//                 </span>
//               </h1>

//               {/* LINE 3 — badge */}
//               <div className="hero-badge-row">
//                 {tw3.displayed.length > 0 && (
//                   <h2 className="hero-badge">
//                     {tw3.displayed}
//                     {!tw3.done && <Cursor />}
//                   </h2>
//                 )}
//               </div>

//               {/* LINE 4 — tagline */}
//               <p className="hero-tagline" aria-label={LINE4}>
//                 <span className="tagline-spoken" aria-hidden="true">
//                   {tw4.displayed}
//                   {stage >= 4 && !tw4.done && <Cursor />}
//                 </span>
//                 {tw4.done ? ' ' : ''}
//                 <span className="tagline-support" aria-hidden="true">
//                   {tw5.displayed}
//                   {tw4.done && !tw5.done && <Cursor />}
//                 </span>
//               </p>

//               {/* CTAs */}
//               <div className={`hero-actions reveal${showBtns ? ' on' : ''}`}>
//                 <a
//                   className="hero-button primary"
//                   href="/#projects"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     scrollToSection('projects');
//                   }}
//                 >
//                   See the work
//                 </a>

//                 <a
//                   className="hero-button ghost"
//                   href="/resume.pdf"
//                   download="Anisha-Singla-Resume.pdf"
//                 >
//                   <svg
//                     width="15"
//                     height="15"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2.2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     aria-hidden="true"
//                   >
//                     <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
//                     <polyline points="7 10 12 15 17 10" />
//                     <line x1="12" y1="15" x2="12" y2="3" />
//                   </svg>
//                   Resume
//                 </a>

//                 <button
//                   type="button"
//                   className="hero-button solid"
//                   onClick={() => {
//                     window.location.href = 'mailto:anishasingla23@gmail.com';
//                   }}
//                 >
//                   Get in touch
//                 </button>
//               </div>

//               {/* Stats */}
//               <div className={`hero-stats reveal${showBtns ? ' on' : ''}`} style={{ '--d': '80ms' }}>
//                 {HERO_STATS.map((st, i) => (
//                   <StatItem key={st.label} stat={st} enabled={showBtns} index={i} baseDelay={80} />
//                 ))}
//               </div>

//               {/* Social bar */}
//               <div className={`hero-link-row reveal${showBtns ? ' on' : ''}`} style={{ '--d': '160ms' }}>
//                 <SocialBar size="md" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* scroll cue */}
//         <div className="hero-scroll" aria-hidden="true">
//           <span className="hero-scroll-line" />
//           Scroll
//         </div>

//       </section>
//     </>
//   );
// }