import { useEffect, useRef, useState } from 'react';
import { scrollToSection } from '../routes';
import SocialBar from './SocialBar';

// ── Tweak knobs ──────────────────────────────────────────────────
const FLIP_VIDEO = false; // video has character left, desk centre; text goes in the empty wall on the right
const VIDEO_POSITION_MOBILE = '32% top'; // keeps the character visible on phones

// Responsive video sources — browser picks the first matching <source media>.
const VIDEO_MOBILE = 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/HeroPageVideo-ForMobile.mp4';   // ≤ 767 px
const VIDEO_LAPTOP = 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/HeroPageVideo-ForLaptop.mp4';   // 768 px +

// Video background is navy blue in both themes, so colours are fixed.
const ACCENT = '#FFFFFF';
const ACCENT_SOFT = 'rgba(255,255,255,0.88)';
const BG = '#072450';
const NAME_COLOR = '#FFFFFF';
const TAGLINE_COLOR = 'rgba(255,255,255,0.92)';
const STAT_LABEL_COLOR = 'rgba(255,255,255,0.78)';
const LINE_COLOR = 'rgba(255,255,255,0.28)';

// ── Typewriter hook ──────────────────────────────────────────────
function useTypewriter(text, { enabled = true, startDelay = 0, duration = 1000 } = {}) {
  const [elapsed, setElapsed] = useState(0);
  const safeDuration = Math.max(duration, 1);
  const safeText = enabled ? (text ?? '') : '';

  useEffect(() => {
    if (!enabled || !text) return undefined;
    let frameId;
    let animationStart = 0;
    const timeoutId = window.setTimeout(() => {
      setElapsed(0);
      const step = (ts) => {
        if (!animationStart) animationStart = ts;
        const next = Math.min(ts - animationStart, safeDuration);
        setElapsed(next);
        if (next < safeDuration) frameId = window.requestAnimationFrame(step);
      };
      frameId = window.requestAnimationFrame(step);
    }, startDelay);
    return () => {
      window.clearTimeout(timeoutId);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [enabled, safeDuration, startDelay, text]);

  if (!enabled) return { displayed: '', done: false };
  if (!safeText) return { displayed: '', done: true };
  const progress = Math.min(elapsed / safeDuration, 1);
  const count = progress <= 0 ? 0 : Math.ceil(progress * safeText.length);
  return { displayed: safeText.slice(0, count), done: progress >= 1 };
}

// ── Blinking cursor ──────────────────────────────────────────────
function Cursor() {
  const [blink, setBlink] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(t);
  }, []);
  return (
    <span style={{ opacity: blink ? 1 : 0, transition: 'opacity 0.1s', color: ACCENT, fontWeight: 'bold' }}>
      |
    </span>
  );
}

// ── Count-up hook (for stats) ────────────────────────────────────
function useCountUp(target, enabled, duration = 1400, delay = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!enabled) return undefined;
    let frameId;
    let start = 0;
    const timeoutId = window.setTimeout(() => {
      const step = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(eased * target));
        if (p < 1) frameId = window.requestAnimationFrame(step);
      };
      frameId = window.requestAnimationFrame(step);
    }, delay);
    return () => {
      window.clearTimeout(timeoutId);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [enabled, target, duration, delay]);
  return value;
}

const HERO_STATS = [
  { value: '10', label: 'Clients' },
  { value: '15', label: 'Engagements' },
  { value: '6', label: 'Industries' },
  { value: '2 years', label: 'AI consultancy' },
];

const HERO_CUES = [1.0, 1.55, 2.35, 3.4, 4.8];

const PARTICLES = Array.from({ length: 22 }, (_, i) => {
  const r = (n) => {
    const x = Math.sin((i + 1) * n) * 10000;
    return x - Math.floor(x);
  };
  return {
    left: `${Math.round(r(12.9898) * 100)}%`,
    size: 2 + Math.round(r(78.233) * 3),
    delay: (r(39.346) * 14).toFixed(1),
    dur: (11 + r(11.135) * 12).toFixed(1),
  };
});

function StatItem({ stat, enabled, index, baseDelay = 0 }) {
  const numeric = parseInt(stat.value, 10);
  const suffix = stat.value.replace(/\d+/g, '');
  const count = useCountUp(numeric, enabled, 1000, baseDelay + index * 120);
  return (
    <div className="hero-stat">
      <div className="hero-stat-value">
        {count}
        {suffix}
      </div>
      <p className="hero-stat-label">{stat.label}</p>
    </div>
  );
}

export default function Hero() {
  const LINE1 = 'Hey, there';
  const NAME1 = 'Anisha';
  const NAME2 = 'Singla';
  const LINE3 = 'AI Business Analyst · GenAI adoption,\nrequirements and delivery';
  const LINE4A = 'I turn ambiguous business problems into AI implementations that teams adopt.';
  const LINE4B = 'Two years running an AI consultancy with a team of up to five engineers; now in Toronto.';
  const LINE4 = `${LINE4A} ${LINE4B}`;

  // Script is written for ~10s; real video length is detected and cues are scaled to it.
  const SCRIPT_DURATION_S = 10;

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [fallbackTyping, setFallbackTyping] = useState(false);
  const startTyping = isVideoPlaying || fallbackTyping;
  const [stage, setStage] = useState(0);
  const [, setS] = useState(1);
  const videoStoppedRef = useRef(false);

  // Video-time (seconds) at which each line appears.
  const cuesRef = useRef(HERO_CUES);
  const unmutedEverRef = useRef(false);

  const tw1 = useTypewriter(LINE1, { enabled: stage >= 1, duration: 400 });
  const tw2 = useTypewriter(`${NAME1}\n${NAME2}`, { enabled: stage >= 2, duration: 600 });
  const tw3 = useTypewriter(LINE3, { enabled: stage >= 3, duration: 850 });
  const tw4 = useTypewriter(LINE4A, { enabled: stage >= 4, duration: 1300 });
  const tw5 = useTypewriter(LINE4B, { enabled: stage >= 5 && tw4.done, duration: 2400 });
  const showBtns = tw5.done;
  const nameParts = tw2.displayed.split('\n');
  const nameL1 = nameParts[0] || '';
  const nameL2 = nameParts[1] !== undefined ? nameParts[1] : null;

  const videoRef = useRef(null);
  const heroSectionRef = useRef(null);
  const isHeroInViewRef = useRef(true);
  const lastTimeRef = useRef(0);

  const [isMobileScreen, setIsMobileScreen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 767;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const updateMobile = (e) => {
      if (videoRef.current && Number.isFinite(videoRef.current.currentTime)) {
        lastTimeRef.current = videoRef.current.currentTime;
      }
      setIsMobileScreen(e.matches);
    };

    const handleResize = () => {
      const matches = window.innerWidth <= 767;
      setIsMobileScreen((prev) => {
        if (prev !== matches) {
          if (videoRef.current && Number.isFinite(videoRef.current.currentTime)) {
            lastTimeRef.current = videoRef.current.currentTime;
          }
          return matches;
        }
        return prev;
      });
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateMobile);
    } else {
      mediaQuery.addListener(updateMobile);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', updateMobile);
      } else {
        mediaQuery.removeListener(updateMobile);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const videoSrc = isMobileScreen ? VIDEO_MOBILE : VIDEO_LAPTOP;

  // Fallback if video never fires "playing" (autoplay blocked, slow network)
  useEffect(() => {
    const id = window.setTimeout(() => setFallbackTyping(true), 1500);
    return () => window.clearTimeout(id);
  }, []);

  // Text clock: follows video.currentTime so lines stay in sync with the voice.
  useEffect(() => {
    let raf;
    const mountedAt = performance.now();
    let fallbackStart = 0;
    let endedAt = 0;

    const tick = (now) => {
      const cues = cuesRef.current;
      const v = videoRef.current;

      const isEnded = v && (v.ended || (v.duration && v.currentTime >= v.duration - 0.05));
      if (isEnded) {
        videoStoppedRef.current = true;
        if (!endedAt) endedAt = now;
      }

      let t;
      if (isEnded) {
        const dur = Number.isFinite(v.duration) ? v.duration : cues[cues.length - 1];
        t = dur + (now - endedAt) / 1000;
      } else if (v && (!v.paused || v.currentTime > 0)) {
        t = v.currentTime;
        fallbackStart = 0;
      } else if (now - mountedAt > 2500) {
        if (!fallbackStart) fallbackStart = now;
        t = (now - fallbackStart) / 1000;
      } else {
        t = -1;
      }
      let st = 0;
      for (let i = 0; i < cues.length; i += 1) if (t >= cues[i]) st = i + 1;
      setStage((prev) => (st > prev ? st : prev)); // never goes backwards
      const finished = st >= cues.length && isEnded;
      if (!finished && now - mountedAt < 60000) raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, []);

  // Ensure video always plays unmuted. If browser autoplay policy temporarily
  // holds audio on cold load, any user interaction instantly un-mutes and rewinds
  // so the spoken greeting is heard clearly from the beginning.
  useEffect(() => {
    const unlock = () => {
      const v = videoRef.current;
      if (!v) return;
      if (!isHeroInViewRef.current) return;

      if (v.muted || !unmutedEverRef.current) {
        v.muted = false;
        v.volume = 1;
        const wasMuted = !unmutedEverRef.current;
        unmutedEverRef.current = true;
        videoStoppedRef.current = false;

        if (wasMuted && (v.currentTime > 0.4 || v.ended)) {
          try {
            v.currentTime = 0;
            setStage(0);
          } catch {
            /* ignore seek error */
          }
        }
        v.play()?.catch?.(() => { });
      }
    };

    const events = ['pointerdown', 'pointerup', 'click', 'keydown', 'touchstart', 'touchend', 'scroll', 'wheel'];
    events.forEach((e) => window.addEventListener(e, unlock, { passive: true }));
    return () => {
      events.forEach((e) => window.removeEventListener(e, unlock));
    };
  }, []);

  // Video control — only play while the Hero section is visible on screen
  useEffect(() => {
    const video = videoRef.current;
    const section = heroSectionRef.current;
    if (!video) return undefined;

    const onMeta = () => {
      if (Number.isFinite(video.duration) && video.duration > 1) {
        setS(video.duration / SCRIPT_DURATION_S);
      }
      if (lastTimeRef.current > 0 && Number.isFinite(video.duration)) {
        try {
          video.currentTime = Math.min(lastTimeRef.current, video.duration);
        } catch {
          /* ignore seek error */
        }
      }
    };
    const onPlaying = () => setIsVideoPlaying(true);

    const safePlay = async () => {
      if (!isHeroInViewRef.current || document.hidden) {
        return;
      }
      if (video.ended && unmutedEverRef.current) {
        return;
      }

      // Always aim for unmuted playback with sound
      video.muted = false;
      video.volume = 1;
      try {
        await video.play();
        unmutedEverRef.current = true;
      } catch {
        // If initial autoplay with sound is held by browser policy before user gesture,
        // start muted so video frames flow visually, and unlock listener un-mutes on first interaction.
        video.muted = true;
        video.play()?.catch?.(() => { });
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else {
        safePlay();
      }
    };

    let observer;
    if (section && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        ([entry]) => {
          const inView = Boolean(entry?.isIntersecting);
          isHeroInViewRef.current = inView;
          if (!inView) {
            video.pause();
          } else {
            safePlay();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(section);
    }

    if (video.readyState >= 1) onMeta();
    if (!video.paused) queueMicrotask(onPlaying);

    video.addEventListener('loadedmetadata', onMeta);
    video.addEventListener('playing', onPlaying);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    safePlay();

    return () => {
      if (video && Number.isFinite(video.currentTime)) {
        lastTimeRef.current = video.currentTime;
      }
      observer?.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      video.removeEventListener('loadedmetadata', onMeta);
      video.removeEventListener('playing', onPlaying);
      video.pause();
    };
  }, [videoSrc]);

  const words = LINE4.length;

  return (
    <>
      <style>{`
        .hero-shell {
          --accent: ${ACCENT};
          --accent-soft: ${ACCENT_SOFT};
          position: relative;
          min-height: 100vh;
          min-height: 100svh;
          width: 100%;
          max-width: 100%;
          overflow: hidden;
          display: flex;
          align-items: stretch;
          background: ${BG};
          isolation: isolate;
        }

        /* ───────── BACKGROUND ───────── */
        .hero-bg { position: absolute; inset: 0; z-index: 0; overflow: hidden; pointer-events: none; }
        .hero-bg-base { position: absolute; inset: 0; background: ${BG}; }

        .hero-particles i {
          position: absolute; bottom: -12px; border-radius: 50%;
          background: ${ACCENT_SOFT};
          box-shadow: 0 0 10px ${ACCENT_SOFT};
          opacity: 0;
          animation: rise var(--dur, 16s) linear var(--delay, 0s) infinite;
        }
        @keyframes rise {
          0%   { transform: translateY(0); opacity: 0; }
          12%  { opacity: 0.55; }
          100% { transform: translateY(-112vh); opacity: 0; }
        }

        /* ───────── VIDEO: full-bleed cover ───────── */
        .hero-media {
          position: absolute; inset: 0; z-index: 1;
          width: 100%; height: 100%;
          overflow: hidden; pointer-events: none;
        }
        .hero-video {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center bottom;
          transform: ${FLIP_VIDEO ? 'scaleX(-1)' : 'none'};
          animation: videoIn 1.2s cubic-bezier(.2,.7,.2,1) both;
        }
        @keyframes videoIn { from { opacity: 0; } to { opacity: 1; } }

        /* soft scrim behind the text so it stays readable on the wall */
        .hero-scrim {
          position: absolute; inset: 0; z-index: 2; pointer-events: none;
          background: linear-gradient(to right,
            rgba(7, 36, 80, 0.68) 0%,
            rgba(7, 36, 80, 0.42) 30%,
            rgba(7, 36, 80, 0.15) 45%,
            transparent 60%);
        }

        /* ───────── CONTENT ───────── */
        .hero-content {
          position: relative; z-index: 10;
          width: 100%;
          display: flex; align-items: center;
          min-height: calc(100svh - var(--availability-banner-h, 65px) - 12px);
          padding: clamp(5rem, 9vh, 6.5rem) 0 clamp(2rem, 5vh, 3.5rem);
          box-sizing: border-box;
        }
        .hero-inner {
          max-width: none; margin: 0 auto;
          padding: 0 clamp(1.25rem, 4vw, 4rem);
          width: 100%; box-sizing: border-box;
        }
        .hero-copy {
          display: flex; flex-direction: column;
          align-items: flex-start; text-align: left;
          margin-left: 0; margin-right: auto;
          width: min(36rem, 42vw); max-width: 36rem;
          min-height: min(560px, 72vh);
          justify-content: center;
        }
        .hero-copy > * { max-width: 100%; }

        .reveal { opacity: 0; }
        .reveal.on { animation: blurIn 0.95s cubic-bezier(.2,.7,.2,1) var(--d, 0ms) both; }
        @keyframes blurIn {
          from { opacity: 0; filter: blur(14px); transform: translate3d(-28px, 12px, 0); }
          to   { opacity: 1; filter: blur(0);    transform: translate3d(0, 0, 0); }
        }

        .hero-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-style: italic;
          font-size: clamp(1.1rem, 1.8vw, 1.5rem);
          font-weight: 600; line-height: 1.1; letter-spacing: 0.02em;
          margin: 0; color: ${ACCENT_SOFT}; min-height: 1.2em;
          display: inline-flex; align-items: center; gap: 0.75rem;
          text-shadow: 0 2px 12px rgba(0,0,0,0.45);
        }
        .hero-eyebrow::before {
          content: ''; display: inline-block; width: 44px; height: 1.5px;
          background: linear-gradient(270deg, transparent, ${ACCENT_SOFT});
          order: 2;
        }

        .hero-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3.4rem, 6.2vw, 5.8rem);
          font-weight: 900; line-height: 0.9; letter-spacing: 0.03em;
          margin: 0.35rem 0 0; color: ${NAME_COLOR};
          text-shadow: 0 4px 24px rgba(0,0,0,0.5);
        }
        .hero-shell .hero-name,
        .hero-shell .hero-name .line { color: ${NAME_COLOR} !important; }
        .hero-name .line { display: block; min-height: 0.9em; }
        .hero-shell .hero-name .line.accent { color: ${ACCENT} !important; }

        .hero-badge-row {
          display: flex; align-items: center; justify-content: flex-start;
          width: 100%; margin-top: 0.9rem; min-height: 2.4rem;
        }
        .hero-badge {
          position: relative; overflow: hidden;
          max-width: 100%; box-sizing: border-box; margin: 0;
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(0.66rem, 0.9vw, 0.76rem);
          font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
          padding: 0.5rem 1.1rem; border-radius: 6px; display: inline-block;
          background: rgba(255,255,255,0.14);
          color: #FFFFFF;
          border: 1px solid rgba(255,255,255,0.4);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          white-space: pre-line;
          line-height: 1.6;
        }
        .hero-badge::after {
          content: ''; position: absolute; top: 0; left: -60%; width: 40%; height: 100%;
          background: linear-gradient(100deg, transparent, rgba(255,255,255,0.35), transparent);
          transform: skewX(-20deg);
          animation: sweep 4.5s ease-in-out 3s infinite;
        }
        @keyframes sweep { 0% { left: -60%; } 40%,100% { left: 130%; } }

        .hero-tagline {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(0.92rem, 1.05vw, 1.04rem);
          font-style: normal; font-weight: 400; line-height: 1.65;
          margin: 1.1rem 0 0; max-width: 30rem; min-height: 6em;
          color: ${TAGLINE_COLOR};
          text-shadow: 0 1px 10px rgba(0,0,0,0.45);
        }
        .hero-tagline .tagline-spoken { font-style: normal; font-weight: 600; color: #FFFFFF; }
        .hero-tagline .tagline-support { font-style: normal; color: rgba(255,255,255,0.85); }

        .hero-auth-note {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(0.74rem, 0.86vw, 0.82rem);
          line-height: 1.5; margin-top: 0.85rem;
          color: rgba(255,255,255,0.82);
          max-width: 30rem;
        }
        .hero-roles-note {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(0.72rem, 0.82vw, 0.78rem);
          font-weight: 600; letter-spacing: 0.04em;
          color: ${ACCENT};
          margin-top: 0.35rem;
          text-transform: uppercase;
        }

        .hero-actions {
          display: flex; flex-wrap: wrap; gap: 0.75rem;
          margin-top: 1.3rem; justify-content: flex-start; width: 100%;
        }
        .hero-button {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; justify-content: center;
          min-height: 44px; padding: 0.7rem 1.4rem; box-sizing: border-box;
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(0.66rem, 0.8vw, 0.72rem);
          font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase;
          border-radius: 10px; cursor: pointer; text-decoration: none;
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
        }
        .hero-button:hover { transform: translateY(-3px); }
        .hero-button:focus-visible { outline: 2px solid #FFFFFF; outline-offset: 3px; }
        .hero-button.primary {
          background: #0B2D62; color: #FFFFFF; border: 1px solid rgba(255,255,255,0.25);
          box-shadow: 0 10px 28px rgba(0,0,0,0.3);
        }
        .hero-button.primary:hover { background: #FFFFFF; color: #072450; }
        .hero-button.ghost {
          color: #FFFFFF; border: 1.5px solid rgba(255,255,255,0.85); gap: 0.5rem;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
        .hero-button.ghost:hover { background: #FFFFFF; color: #072450; }
        .hero-button.solid {
          background: ${ACCENT}; color: #072450; border: 1px solid ${ACCENT};
          box-shadow: 0 10px 28px rgba(0,0,0,0.3);
        }
        .hero-button.solid:hover { background: transparent; color: ${ACCENT}; }

        .hero-stats {
          display: flex; gap: 1.6rem;
          margin-top: 1.3rem; padding-top: 1.1rem;
          justify-content: flex-start; width: 100%; flex-wrap: wrap;
          border-top: 1px solid ${LINE_COLOR};
        }
        .hero-stat { text-align: left; min-width: 4rem; }
        .hero-stat-value {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.6rem, 2.2vw, 2.2rem);
          color: ${ACCENT}; line-height: 1;
          font-variant-numeric: tabular-nums;
          text-shadow: 0 2px 10px rgba(0,0,0,0.4);
        }
        .hero-stat-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.64rem; letter-spacing: 0.03em;
          margin: 0.3rem 0 0; line-height: 1.25; max-width: 6.5rem;
          font-weight: 500; color: ${STAT_LABEL_COLOR};
          text-transform: capitalize;
        }

        .hero-link-row {
          display: flex; align-items: center;
          margin-top: 1.1rem; justify-content: flex-start; width: 100%;
        }
        .hero-link-row a,
        .hero-link-row button {
          color: #FFFFFF !important;
          background: rgba(255,255,255,0.16) !important;
          border: 1px solid rgba(255,255,255,0.5) !important;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
        .hero-link-row a:hover,
        .hero-link-row button:hover { background: #FFFFFF !important; color: #072450 !important; }
        .hero-link-row svg { color: inherit; fill: currentColor; }

        .hero-scroll {
          position: absolute; z-index: 11;
          right: calc(clamp(1.25rem, 4vw, 4rem) + 15px); bottom: calc(2.2rem + 90px);
          display: flex; align-items: center; gap: 0.7rem;
          font-family: 'DM Sans', sans-serif; font-size: 0.64rem;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: ${STAT_LABEL_COLOR};
          opacity: 0;
        }
        .hero-shell.is-in .hero-scroll { animation: blurIn 0.8s ease 8s both; }
        .hero-scroll-line {
          position: relative; width: 1.5px; height: 44px; overflow: hidden;
          background: ${LINE_COLOR};
        }
        .hero-scroll-line::after {
          content: ''; position: absolute; left: 0; top: -50%; width: 100%; height: 50%;
          background: ${ACCENT};
          animation: scrollDrop 2s cubic-bezier(.6,0,.3,1) infinite;
        }
        @keyframes scrollDrop { to { top: 110%; } }

        /* ───────── RESPONSIVE ───────── */
        @media (max-width: 1100px) {
          .hero-name { font-size: clamp(3rem, 5.4vw, 5rem); }
        }
        @media (max-width: 960px) {
          .hero-media { inset: 0; }
          .hero-media::before { display: none; }
          .hero-content { align-items: flex-end; padding: 6rem 0 2.25rem; }
          .hero-inner { padding: 0 1.25rem; }
          .hero-video {
            left: 0; top: 0; right: auto; bottom: auto;
            width: 100%; height: 100%; max-width: none; min-width: 0; aspect-ratio: auto;
            object-fit: cover; object-position: ${VIDEO_POSITION_MOBILE};
            -webkit-mask-image: none; mask-image: none;
          }
          .hero-scrim {
            background: linear-gradient(to top,
              rgba(7, 36, 80, 0.95) 0%, rgba(7, 36, 80, 0.84) 42%, rgba(7, 36, 80, 0.35) 68%, transparent 88%);
          }
          .hero-scroll { display: none; }
          .hero-copy { width: 100%; max-width: none; min-height: 0; }
          .hero-eyebrow::before { display: none; }
          .hero-name { font-size: clamp(3.2rem, 15vw, 5rem); }
          .hero-tagline { min-height: 0; }
          .hero-stats {
            display: grid; grid-template-columns: repeat(4, minmax(0, 1fr));
            justify-items: start; column-gap: 0.6rem;
          }
          .hero-actions { flex-direction: column; width: 100%; }
          .hero-button { width: min(100%, 20rem); }
          .reveal.on { animation-name: blurInMobile; }
        }
        @keyframes blurInMobile {
          from { opacity: 0; filter: blur(12px); transform: translate3d(0, 22px, 0); }
          to   { opacity: 1; filter: blur(0);    transform: translate3d(0, 0, 0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-particles i, .hero-badge::after, .hero-scroll-line::after { animation: none !important; }
          .hero-particles { display: none; }
          .reveal.on { animation-duration: 0.01s !important; }
        }
      `}</style>

      <section
        id="home"
        ref={heroSectionRef}
        className={`hero-shell${startTyping ? ' is-in' : ''}`}
        onClick={() => {
          const v = videoRef.current;
          if (!v) return;
          v.muted = false;
          v.volume = 1;
          const wasMuted = !unmutedEverRef.current;
          unmutedEverRef.current = true;
          videoStoppedRef.current = false;
          if (wasMuted && (v.currentTime > 0.4 || v.ended)) {
            try {
              v.currentTime = 0;
              setStage(0);
            } catch {}
          }
          v.play()?.catch?.(() => {});
        }}
      >
        {/* ── BACKGROUND ── */}
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-bg-base" />
          <div className="hero-particles">
            {PARTICLES.map((p, i) => (
              <i
                key={i}
                style={{ left: p.left, width: p.size, height: p.size, '--delay': `-${p.delay}s`, '--dur': `${p.dur}s` }}
              />
            ))}
          </div>
        </div>

        {/* ── VIDEO (full-bleed, responsive) ── */}
        <div className="hero-media">
          <video
            key={videoSrc}
            className="hero-video"
            ref={videoRef}
            src={videoSrc}
            autoPlay
            playsInline
            preload="auto"
            fetchPriority="high"
            aria-hidden="true"
          />
        </div>

        {/* readability scrim */}
        <div className="hero-scrim" aria-hidden="true" />

        {/* ── CONTENT ── */}
        <div className="hero-content">
          <div className="hero-inner">
            <div className="hero-copy">
              {/* LINE 1 — greeting */}
              <p className="hero-eyebrow">
                {tw1.displayed}
                {stage >= 1 && !tw1.done && <Cursor />}
              </p>

              {/* LINE 2 — name */}
              <h1 className="hero-name" aria-label={`${NAME1} ${NAME2}`}>
                <span className="line" aria-hidden="true">
                  {nameL1}
                  {stage >= 2 && nameL2 === null && !tw2.done && <Cursor />}
                </span>
                <span className="line accent" aria-hidden="true">
                  {nameL2 ?? ''}
                  {nameL2 !== null && !tw2.done && <Cursor />}
                </span>
              </h1>

              {/* LINE 3 — badge */}
              <div className="hero-badge-row">
                {tw3.displayed.length > 0 && (
                  <h2 className="hero-badge">
                    {tw3.displayed}
                    {!tw3.done && <Cursor />}
                  </h2>
                )}
              </div>

              {/* LINE 4 — tagline */}
              <p className="hero-tagline" aria-label={LINE4} data-len={words}>
                <span className="tagline-spoken" aria-hidden="true">
                  {tw4.displayed}
                  {stage >= 4 && !tw4.done && <Cursor />}
                </span>
                {tw4.done ? ' ' : ''}
                <span className="tagline-support" aria-hidden="true">
                  {tw5.displayed}
                  {tw4.done && !tw5.done && <Cursor />}
                </span>
              </p>

              {/* Work Authorization & Target Roles */}
              <div className={`reveal${showBtns ? ' on' : ''}`} style={{ '--d': '40ms' }}>
                <p className="hero-auth-note">
                  Based in Toronto. Valid PGWP with full work authorization for any Canadian employer; no sponsorship required.
                </p>
                <p className="hero-roles-note">
                  Open to AI Business Analyst, AI Implementation and AI Enablement roles.
                </p>
              </div>

              {/* CTAs */}
              <div className={`hero-actions reveal${showBtns ? ' on' : ''}`}>
                <a
                  className="hero-button primary"
                  href="/#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('projects');
                  }}
                >
                  See the work
                </a>

                <a
                  className="hero-button ghost"
                  href="https://arbgtqtruugewk5g.public.blob.vercel-storage.com/Anisha_Singla_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open resume PDF"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                  View Resume
                </a>

                <a
                  className="hero-button solid"
                  href="/#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('contact');
                  }}
                >
                  Get in touch
                </a>
              </div>

              {/* Stats */}
              <div className={`hero-stats reveal${showBtns ? ' on' : ''}`} style={{ '--d': '80ms' }}>
                {HERO_STATS.map((st, i) => (
                  <StatItem key={st.label} stat={st} enabled={showBtns} index={i} baseDelay={80} />
                ))}
              </div>

              {/* Social bar */}
              <div className={`hero-link-row reveal${showBtns ? ' on' : ''}`} style={{ '--d': '160ms' }}>
                <SocialBar size="md" />
              </div>
            </div>
          </div>
        </div>

        {/* scroll cue */}
        <div className="hero-scroll" aria-hidden="true">
          <span className="hero-scroll-line" />
          Scroll
        </div>
      </section>
    </>
  );
}
