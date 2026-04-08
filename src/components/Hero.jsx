

import { useEffect, useRef, useState } from 'react';
import { scrollToSection } from '../routes';

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

  const VIDEO_READY_TEXT_DELAY_MS = 1000;
  const TYPE_SEQUENCE_START_DELAY_MS = 0;
  const TEXT_TOTAL_DURATION_MS = 6000;
  const VIDEO_PLAY_DURATION_MS = 8000;

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
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [startTyping, setStartTyping] = useState(false);

  const tw1 = useTypewriter(LINE1, { enabled: startTyping, startDelay: DELAY1, duration: LINE1_DURATION });
  const tw2 = useTypewriter(LINE2, { enabled: startTyping, startDelay: DELAY2, duration: LINE2_DURATION });
  const tw3 = useTypewriter(LINE3, { enabled: startTyping, startDelay: DELAY3, duration: LINE3_DURATION });
  const tw4 = useTypewriter(LINE4, { enabled: startTyping, startDelay: DELAY4, duration: LINE4_DURATION });

  useEffect(() => {
    if (!isVideoReady || startTyping) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => setStartTyping(true), VIDEO_READY_TEXT_DELAY_MS);
    return () => window.clearTimeout(timeoutId);
  }, [isVideoReady, startTyping, VIDEO_READY_TEXT_DELAY_MS]);

  const showBtns = startTyping && tw4.done;

  const nameParts = tw2.displayed.split('\n');
  const nameL1 = nameParts[0] || '';
  const nameL2 = nameParts[1] !== undefined ? nameParts[1] : null;

  const VIDEO_EDGE_COLOR = '#000000';
  const videoRef = useRef(null);
  const hasAutoScrolledRef = useRef(false);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) {
      return undefined;
    }

    let stopTimerId;
    let readyTimerId;
    let scrollTimerId;

    const scheduleAboutScroll = () => {
      if (hasAutoScrolledRef.current) {
        return;
      }

      hasAutoScrolledRef.current = true;
      scrollTimerId = window.setTimeout(() => {
        scrollToSection('about');
      }, 250);
    };

    const stopVideo = () => {
      videoElement.pause();
      const stopAtSecond = VIDEO_PLAY_DURATION_MS / 1000;

      if (Number.isFinite(videoElement.duration) && videoElement.duration > 0) {
        videoElement.currentTime = Math.min(stopAtSecond, videoElement.duration);
        scheduleAboutScroll();
        return;
      }

      videoElement.currentTime = stopAtSecond;
      scheduleAboutScroll();
    };

    const handleLoadedData = () => {
      setIsVideoReady(true);
    };

    const handleVideoEnded = () => {
      if (stopTimerId) {
        window.clearTimeout(stopTimerId);
      }

      scheduleAboutScroll();
    };

    videoElement.currentTime = 0;
    videoElement.addEventListener('loadeddata', handleLoadedData);
    videoElement.addEventListener('ended', handleVideoEnded);
    const playPromise = videoElement.play();
    if (playPromise?.catch) {
      playPromise.catch(() => {});
    }

    if (videoElement.readyState >= 2) {
      readyTimerId = window.setTimeout(handleLoadedData, 0);
    }

    stopTimerId = window.setTimeout(stopVideo, VIDEO_PLAY_DURATION_MS);

    return () => {
      if (readyTimerId) {
        window.clearTimeout(readyTimerId);
      }
      if (scrollTimerId) {
        window.clearTimeout(scrollTimerId);
      }
      window.clearTimeout(stopTimerId);
      videoElement.removeEventListener('loadeddata', handleLoadedData);
      videoElement.removeEventListener('ended', handleVideoEnded);
      videoElement.pause();
      videoElement.currentTime = 0;
    };
  }, [VIDEO_PLAY_DURATION_MS]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;600&family=Bebas+Neue&family=DM+Sans:wght@300;400;600;700&display=swap');

        .hero-shell {
          position: relative;
          min-height: 100svh;
          width: 100%;
          max-width: 100%;
          overflow: hidden;
          display: flex;
          align-items: stretch;
          background: var(--hero-edge-color);
          isolation: isolate;
        }
        .hero-media {
          position: absolute;
          inset: 0;
          z-index: 0;
          width: 100%;
          max-width: 100%;
          overflow: hidden;
        }
        .hero-video {
          position: absolute;
          top: 0;
          left: 30%;
          transform: translateX(-50%);
          height: 100%;
          width: min(54vw, 860px);
          min-width: 540px;
          max-width: none;
          object-fit: cover;
          object-position: center top;
        }
        .hero-vignette,
        .hero-bottom-fade,
        .hero-top-fade {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .hero-vignette {
          background: linear-gradient(to right, var(--hero-edge-color) 0%, rgba(13,12,11,0.85) 12%, rgba(13,12,11,0.08) 35%, rgba(13,12,11,0.05) 50%, rgba(13,12,11,0.62) 68%, rgba(13,12,11,0.93) 84%, var(--hero-edge-color) 100%);
        }
        .hero-bottom-fade {
          background: linear-gradient(to top, var(--hero-edge-color) 0%, rgba(13,12,11,0.78) 8%, transparent 38%);
        }
        .hero-top-fade {
          background: linear-gradient(to bottom, var(--hero-edge-color) 0%, rgba(13,12,11,0.35) 5%, transparent 20%);
        }
        .hero-content {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 100%;
          display: flex;
          align-items: center;
          min-height: 100svh;
          padding: clamp(5rem, 11vh, 7rem) 0 clamp(2.5rem, 7vh, 4rem);
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
          width: min(48%, 40rem);
          max-width: 40rem;
          overflow: hidden;
        }
        .hero-copy > * {
          max-width: 100%;
        }
        .hero-eyebrow {
          font-family: 'Dancing Script', cursive;
          font-size: clamp(2.2rem, 4.2vw, 4rem);
          font-weight: 500;
          color: rgba(255,255,255,0.93);
          line-height: 1;
          letter-spacing: 0.01em;
          margin: 0;
          min-height: 1.2em;
        }
        .hero-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(4.5rem, 8vw, 8rem);
          font-weight: 900;
          color: #ffffff;
          line-height: 0.88;
          letter-spacing: 0.025em;
          margin-top: 0.2rem;
          margin-bottom: 0;
          min-height: 1.9em;
        }
        .hero-badge-row {
          margin-top: 1rem;
          min-height: 2.6rem;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          width: 100%;
        }
        .hero-badge {
          max-width: 100%;
          box-sizing: border-box;
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(0.7rem, 1.1vw, 0.8rem);
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          background: rgba(0,0,0,0.88);
          color: #ffffff;
          padding: 0.6rem 1.7rem;
          display: inline-block;
        }
        .hero-tagline {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(0.96rem, 1vw, 1rem);
          font-style: italic;
          font-weight: 300;
          color: rgba(255,255,255,0.52);
          margin-top: 1.4rem;
          max-width: 24rem;
          line-height: 1.65;
          min-height: 3.4em;
        }
        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 2rem;
          justify-content: flex-end;
          width: 100%;
        }
        .hero-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 0.85rem 2.2rem;
          box-sizing: border-box;
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(0.68rem, 0.85vw, 0.72rem);
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .hero-link-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 1.5rem;
          justify-content: flex-end;
          width: 100%;
          flex-wrap: wrap;
        }
        .hero-link-line {
          height: 1px;
          background: rgba(201,168,76,0.6);
          flex: 0 0 36px;
        }
        .hero-link {
          max-width: 100%;
          overflow-wrap: anywhere;
          text-align: right;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.38);
          text-decoration: none;
          transition: color 0.3s;
        }

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
        @media (max-width: 1100px) {
          .hero-video {
            left: 26%;
            width: min(60vw, 760px);
            min-width: 480px;
          }
          .hero-copy {
            width: min(56%, 36rem);
          }
        }
        @media (max-width: 900px) {
          .hero-content {
            padding-top: clamp(5.5rem, 12vh, 7rem);
          }
          .hero-video {
            left: 22%;
            width: min(66vw, 720px);
            min-width: 420px;
          }
          .hero-copy {
            width: min(62%, 34rem);
          }
        }
        @media (max-width: 768px) {
          .hero-content {
            align-items: flex-end;
            padding: 6.25rem 0 2rem;
          }
          .hero-inner {
            padding: 0 1rem;
          }
          .hero-video {
            inset: 0;
            left: 0;
            width: 100%;
            height: 100%;
            min-width: 0;
            transform: none;
            object-position: 34% top;
          }
          .hero-vignette {
            background: linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.26) 26%, rgba(0,0,0,0.58) 70%, var(--hero-edge-color) 100%);
          }
          .hero-bottom-fade {
            background: linear-gradient(to top, var(--hero-edge-color) 0%, rgba(13,12,11,0.88) 12%, transparent 42%);
          }
          .hero-top-fade {
            background: linear-gradient(to bottom, rgba(0,0,0,0.42) 0%, transparent 22%);
          }
          .hero-copy {
            width: 100%;
            max-width: none;
            align-items: center;
            text-align: center;
            margin-left: 0;
          }
          .hero-copy > * {
            width: 100%;
          }
          .hero-name {
            font-size: clamp(3.3rem, 16vw, 5.5rem);
            min-height: auto;
          }
          .hero-badge-row,
          .hero-actions,
          .hero-link-row {
            justify-content: center;
          }
          .hero-tagline {
            max-width: 30rem;
            margin-left: auto;
            margin-right: auto;
            min-height: 0;
          }
          .hero-actions {
            flex-direction: column;
            align-items: center;
          }
          .hero-button {
            width: min(100%, 20rem);
          }
          .hero-link-row {
            flex-direction: column;
            gap: 0.65rem;
          }
          .hero-link {
            text-align: center;
          }
        }
        @media (max-width: 480px) {
          .hero-content {
            padding-top: 5.75rem;
            padding-bottom: 1.5rem;
          }
          .hero-inner {
            padding: 0 0.9rem;
          }
          .hero-eyebrow {
            font-size: clamp(1.9rem, 10vw, 2.7rem);
          }
          .hero-name {
            font-size: clamp(3rem, 17vw, 4.8rem);
          }
          .hero-badge-row {
            margin-top: 0.85rem;
            min-height: 2.2rem;
          }
          .hero-badge {
            font-size: 0.68rem;
            letter-spacing: 0.14em;
            padding: 0.55rem 1rem;
          }
          .hero-tagline {
            font-size: 0.94rem;
            line-height: 1.55;
            max-width: 21rem;
          }
          .hero-actions {
            gap: 0.75rem;
            margin-top: 1.5rem;
          }
          .hero-button {
            padding: 0.8rem 1rem;
          }
          .hero-link {
            font-size: 0.58rem;
            letter-spacing: 0.14em;
          }
        }
        @media (max-height: 760px) and (min-width: 769px) {
          .hero-content {
            padding-top: 4.5rem;
            padding-bottom: 2rem;
          }
          .hero-copy {
            width: min(52%, 38rem);
          }
        }
      `}</style>

      <section
        id="home"
        className="hero-shell"
        style={{
          '--hero-edge-color': VIDEO_EDGE_COLOR,
          /* ✅ Background ab video ke edge color se match karta hai */
          background: VIDEO_EDGE_COLOR,
        }}
      >
        {/* ── VIDEO BACKGROUND ── */}
        <div className="hero-media">
          <video
            className="hero-video"
            ref={videoRef}
            src="/Final-Video.MP4"
            muted
            playsInline
            preload="auto"
            style={{
              /* ✅ Video ab center mein hai, marginLeft hata diya */
              position: undefined,
              top: undefined,
              left: undefined,
              transform: undefined,
              height: undefined,
              width: undefined,
              objectFit: undefined,
              objectPosition: undefined,
            }}
          />



          {/* ✅ Left vignette — VIDEO_EDGE_COLOR se fade karo taaki seamless blend ho */}
          <div className="hero-vignette" />

          {/* Bottom fade */}
          <div className="hero-bottom-fade" />

          {/* Top fade */}
          <div className="hero-top-fade" />
        </div>

        {/* ── CONTENT ── */}
        <div className="hero-content">
          <div className="hero-inner">

            {/* Right-side text block */}
            <div
              className="hero-copy"
              style={{
                opacity: startTyping ? 1 : 0,
                transform: startTyping ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
              }}
            >

              {/* LINE 1 — script greeting */}
              <p className="hero-eyebrow">
                {tw1.displayed}
                {!tw1.done && tw1.displayed.length > 0 && <Cursor />}
              </p>

              {/* LINE 2 — bold name (2 lines) */}
              <h1 className="hero-name">
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
              <div className="hero-badge-row">
                {tw3.displayed.length > 0 && (
                  <span className="hero-badge">
                    {tw3.displayed}
                    {!tw3.done && <Cursor />}
                  </span>
                )}
              </div>

              {/* LINE 4 — tagline */}
              <p className="hero-tagline">
                {tw4.displayed}
                {!tw4.done && tw4.displayed.length > 0 && <Cursor />}
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
                <button
                  className="hero-button btn-shimmer  rounded-lg"
                  style={{
                    fontWeight: 700,
                    color: '#000',
                    border: 'none', cursor: 'pointer',
                  }}
                  onClick={() => scrollToSection('experience')}
                >
                  Explore My Work
                </button>
                <button
                  className="hero-button rounded-lg"
                  style={{
                    fontWeight: 600,
                    color: '#C9A84C',
                    border: '1px solid #C9A84C', background: 'transparent',
                    cursor: 'pointer', transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#C9A84C'; e.currentTarget.style.color = '#000'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C9A84C'; }}
                  onClick={() => scrollToSection('contact')}
                >
                  Let's Connect
                </button>
              </div>

              {/* LinkedIn */}
              <div
                className="hero-link-row"
                style={{
                  opacity: showBtns ? 1 : 0,
                  transition: 'opacity 0.7s ease 0.2s',
                }}
              >
                <div className="hero-link-line" />
                <a
                  className="hero-link text-white "
                  href="https://www.linkedin.com/in/singlaanisha"
                  target="_blank" rel="noreferrer"
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
