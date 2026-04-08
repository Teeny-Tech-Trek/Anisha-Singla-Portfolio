import { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

const AUTO_MS   = 4000;
const ANIM_MS   = 380;
const SIDE_FRAC = 0.25;
const PAD       = 28;

/* ─────────────────────────────────────────────
   PageCanvas
───────────────────────────────────────────── */
function PageCanvas({ pdfDoc, pageNum, maxW, maxH, zoom, rotation = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!pdfDoc || !ref.current || !pageNum || pageNum < 1 || pageNum > pdfDoc.numPages) return;
    let cancelled = false;
    let task = null;

    (async () => {
      try {
        const page = await pdfDoc.getPage(pageNum);
        if (cancelled || !ref.current) return;
        const base  = page.getViewport({ scale: 1, rotation });
        const dpr   = window.devicePixelRatio || 1;
        const scale = Math.min(maxW / base.width, maxH / base.height) * (zoom || 1) * dpr;
        const vp    = page.getViewport({ scale, rotation });
        const c     = ref.current;
        c.width  = vp.width;
        c.height = vp.height;
        c.style.width  = `${vp.width  / dpr}px`;
        c.style.height = `${vp.height / dpr}px`;
        task = page.render({ canvasContext: c.getContext('2d'), viewport: vp });
        await task.promise;
      } catch (e) {
        if (e?.name !== 'RenderingCancelledException') console.error(e);
      }
    })();

    return () => { cancelled = true; task?.cancel(); };
  }, [pdfDoc, pageNum, maxW, maxH, zoom, rotation]);

  return (
    <canvas
      ref={ref}
      style={{ display: 'block', background: '#fff', borderRadius: 8 }}
    />
  );
}

/* ─────────────────────────────────────────────
   Icons
───────────────────────────────────────────── */
const IcoPrev  = () => <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M7.5 1.5l-4 4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IcoNext  = () => <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M3.5 1.5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IcoPlay  = () => <svg width="9" height="10" viewBox="0 0 9 10" fill="currentColor"><path d="M0 0l9 5L0 10z"/></svg>;
const IcoPause = () => <svg width="9" height="10" viewBox="0 0 9 10" fill="currentColor"><rect x="0" y="0" width="3" height="10" rx="1"/><rect x="6" y="0" width="3" height="10" rx="1"/></svg>;
const IcoMinus = () => <svg width="10" height="2" viewBox="0 0 10 2"><line x1="0" y1="1" x2="10" y2="1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>;
const IcoPlus  = () => <svg width="10" height="10" viewBox="0 0 10 10"><line x1="5" y1="0" x2="5" y2="10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><line x1="0" y1="5" x2="10" y2="5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>;
const IcoRotate = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M20 11a8 8 0 1 1-2.34-5.66" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 4v7h-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IcoClose = () => <svg width="12" height="12" viewBox="0 0 12 12"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>;
const IcoDl    = () => <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v7M3 6l3 3 3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M1 10h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>;

/* ─────────────────────────────────────────────
   CtrlBtn
───────────────────────────────────────────── */
function CtrlBtn({ onClick, disabled, title, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={{
        width: 30, height: 30,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: '1px solid rgba(255,255,255,0.1)',
        background: 'transparent',
        color: disabled ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.6)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        borderRadius: 6,
        transition: 'color .15s, border-color .15s',
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  );
}

/* ─────────────────────────────────────────────
   TopBar
───────────────────────────────────────────── */
function TopBar({
  study, pageNum, numPages, zoom,
  isPlaying, pdfDoc,
  onClose, onPrev, onNext,
  onZoomIn, onZoomOut, onZoomReset,
  onPlayToggle,
}) {
  const canPlay = !!pdfDoc && numPages > 1;

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '0 18px', height: 52,
      background: '#080808',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0, overflow: 'hidden' }}>
        <span style={{
          fontFamily: 'sans-serif', fontSize: 9,
          letterSpacing: '.25em', textTransform: 'uppercase',
          color: '#C9A84C', whiteSpace: 'nowrap', fontWeight: 700,
        }}>
          {study.category}
        </span>
        <span style={{ width: 1, height: 10, background: 'rgba(255,255,255,0.15)', flexShrink: 0 }} />
        <span style={{
          fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.08rem',
          letterSpacing: '.07em', color: '#fff',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {study.title}{study.subtitle ? ` — ${study.subtitle}` : ''}
        </span>
      </div>

      {/* Page nav */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
        <CtrlBtn onClick={onPrev} disabled={pageNum <= 1} title="Previous (←)"><IcoPrev /></CtrlBtn>
        <span style={{
          fontFamily: 'monospace', fontSize: 11,
          color: '#C9A84C', fontWeight: 700,
          minWidth: 46, textAlign: 'center',
        }}>
          {pageNum || '—'}
          <span style={{ color: 'rgba(255,255,255,0.22)', fontWeight: 400 }}> / {numPages || '—'}</span>
        </span>
        <CtrlBtn onClick={onNext} disabled={pageNum >= numPages} title="Next (→)"><IcoNext /></CtrlBtn>
      </div>

      <span style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.08)', flexShrink: 0 }} />

      {/* Auto-play */}
      <button
        type="button"
        onClick={onPlayToggle}
        disabled={!canPlay}
        title={isPlaying ? 'Pause (Space)' : 'Auto-play 4s (Space)'}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '0 13px', height: 30,
          border: `1px solid ${isPlaying ? '#C9A84C' : 'rgba(201,168,76,0.35)'}`,
          background: isPlaying ? '#C9A84C' : 'transparent',
          color: isPlaying ? '#000' : '#C9A84C',
          cursor: !canPlay ? 'not-allowed' : 'pointer',
          fontFamily: 'sans-serif', fontSize: 9, fontWeight: 700,
          letterSpacing: '.2em', textTransform: 'uppercase',
          borderRadius: 5, opacity: !canPlay ? 0.35 : 1,
          transition: 'all .2s', flexShrink: 0,
        }}
      >
        {isPlaying ? <><IcoPause /> Pause</> : <><IcoPlay /> Auto</>}
      </button>

      <span style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.08)', flexShrink: 0 }} />

      {/* Zoom */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0 }}>
        <CtrlBtn onClick={onZoomOut} title="Zoom out"><IcoMinus /></CtrlBtn>
        <button
          type="button"
          onClick={onZoomReset}
          title="Reset zoom"
          style={{
            fontFamily: 'monospace', fontSize: 10,
            color: 'rgba(255,255,255,0.38)', background: 'transparent',
            border: 'none', cursor: 'pointer',
            minWidth: 38, textAlign: 'center', padding: 0,
          }}
        >
          {Math.round((zoom || 1) * 100)}%
        </button>
        <CtrlBtn onClick={onZoomIn} title="Zoom in"><IcoPlus /></CtrlBtn>
      </div>

      <span style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.08)', flexShrink: 0 }} />

      {study.pdfUrl && (
        <a
          href={study.pdfUrl}
          download
          title="Download PDF"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '0 12px', height: 30,
            fontFamily: 'sans-serif', fontSize: 9, fontWeight: 700,
            letterSpacing: '.18em', textTransform: 'uppercase',
            color: '#C9A84C', border: '1px solid rgba(201,168,76,0.35)',
            background: 'transparent', textDecoration: 'none',
            borderRadius: 5, whiteSpace: 'nowrap', flexShrink: 0,
          }}
        >
          <IcoDl /> Download
        </a>
      )}

      <button
        type="button"
        onClick={onClose}
        title="Close (Esc)"
        style={{
          width: 30, height: 30, flexShrink: 0,
          border: '1px solid rgba(255,255,255,0.12)',
          background: 'transparent', cursor: 'pointer',
          color: 'rgba(255,255,255,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: 6, transition: 'color .15s',
        }}
      >
        <IcoClose />
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   NavArrow
───────────────────────────────────────────── */
function NavArrow({ side, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        position: 'absolute', top: '50%',
        [side]: 10,
        transform: 'translateY(-50%)',
        zIndex: 12,
        width: 38, height: 38,
        border: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(6,6,6,0.7)',
        backdropFilter: 'blur(8px)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        color: disabled ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 8,
        opacity: disabled ? 0.25 : 1,
        transition: 'opacity .2s, color .2s',
      }}
    >
      {side === 'left' ? <IcoPrev /> : <IcoNext />}
    </button>
  );
}

/* ─────────────────────────────────────────────
   PageDots
───────────────────────────────────────────── */
function PageDots({ pageNum, numPages, onChange }) {
  if (numPages <= 1 || numPages > 30) return null;
  return (
    <div style={{
      position: 'absolute', bottom: 16, left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex', gap: 5, alignItems: 'center',
      zIndex: 10, pointerEvents: 'auto',
    }}>
      {Array.from({ length: numPages }, (_, i) => {
        const active = i + 1 === pageNum;
        return (
          <button
            key={i}
            type="button"
            onClick={() => onChange(i + 1)}
            style={{
              width: active ? 20 : 5, height: 5,
              borderRadius: 3, border: 'none',
              background: active ? '#C9A84C' : 'rgba(255,255,255,0.18)',
              cursor: 'pointer', padding: 0,
              transition: 'all .3s ease', flexShrink: 0,
            }}
          />
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
   NoPdfOverlay
───────────────────────────────────────────── */
function NoPdfOverlay({ study, onClose }) {
  return (
    <div style={{
      position: 'fixed', inset: 0,
      zIndex: 9999,          /* ← always on top */
      background: '#060606',
      display: 'flex', flexDirection: 'column',
    }}>
      <TopBar
        study={study} pageNum={0} numPages={0} zoom={1}
        isPlaying={false} pdfDoc={null}
        onClose={onClose}
        onPrev={() => {}} onNext={() => {}}
        onZoomIn={() => {}} onZoomOut={() => {}} onZoomReset={() => {}}
        onPlayToggle={() => {}}
      />
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 16,
      }}>
        <div style={{
          width: 64, height: 64,
          border: '1px solid rgba(201,168,76,0.25)', borderRadius: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'rgba(201,168,76,0.45)',
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="1" width="13" height="18" rx="2" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M13 1v6h7" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M5 10h8M5 13h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
        </div>
        <p style={{
          fontFamily: "'Bebas Neue', sans-serif", fontSize: '2rem',
          letterSpacing: '.1em', color: 'rgba(255,255,255,0.35)', margin: 0,
        }}>
          Coming Soon
        </p>
        <p style={{ fontFamily: 'sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.28)', margin: 0 }}>
          This PDF has not been attached yet.
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PdfReader — main export
───────────────────────────────────────────── */
export default function PdfReader({ study, onClose }) {
  const [pdfDoc,    setPdfDoc]    = useState(null);
  const [numPages,  setNumPages]  = useState(0);
  const [pageNum,   setPageNum]   = useState(1);
  const [zoom,      setZoom]      = useState(1);
  const [rotation,  setRotation]  = useState(0);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [shiftPx,   setShiftPx]  = useState(0);
  const [animOn,    setAnimOn]    = useState(true);
  const animatingRef = useRef(false);

  const areaRef  = useRef(null);
  const playRef  = useRef(null);
  const navRef   = useRef(null);

  const [aw, setAw] = useState(0);
  const [ah, setAh] = useState(0);

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  /* Measure carousel area */
  useEffect(() => {
    const el = areaRef.current;
    if (!el) return;
    const upd = () => { setAw(el.clientWidth); setAh(el.clientHeight); };
    upd();
    const ro = new ResizeObserver(upd);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* Load PDF */
  useEffect(() => {
    if (!study?.pdfUrl) { setLoading(false); return; }
    setLoading(true); setError(false);
    setPdfDoc(null); setNumPages(0); setPageNum(1); setRotation(0);

    let cancelled = false;
    const t = pdfjsLib.getDocument(study.pdfUrl);

    t.promise
      .then(doc => {
        if (cancelled) { doc.destroy(); return; }
        setPdfDoc(doc);
        setNumPages(doc.numPages);
        setLoading(false);
        if (doc.numPages > 1) setIsPlaying(true);
      })
      .catch(() => { if (!cancelled) { setError(true); setLoading(false); } });

    return () => { cancelled = true; t.destroy(); };
  }, [study?.pdfUrl]);

  /* Carousel dimensions */
  const isMobile = aw < 600;
  const slideW   = isMobile ? aw : aw * (1 - SIDE_FRAC * 2);
  const sideVis  = isMobile ? 0 : aw * SIDE_FRAC;

  const posL = isMobile ? -aw    : -slideW + sideVis;
  const posC = sideVis;
  const posR = isMobile ? aw     : sideVis + slideW;

  const availW = Math.max(slideW - PAD * 2, 80);
  const availH = Math.max(ah - PAD * 2, 80);
  const rotateBtnLeft = Math.max(posC + PAD, 12);

  /* Navigate */
  const navigate = (dir) => {
    if (animatingRef.current) return;
    if (dir === 1  && pageNum >= numPages) return;
    if (dir === -1 && pageNum <= 1)        return;

    animatingRef.current = true;
    setAnimOn(true);
    setShiftPx(-dir * slideW);

    setTimeout(() => {
      setAnimOn(false);
      setShiftPx(0);
      setPageNum(p => p + dir);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnimOn(true);
          animatingRef.current = false;
        })
      );
    }, ANIM_MS);
  };

  navRef.current = navigate;

  /* Keyboard */
  useEffect(() => {
    const handle = (e) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowRight') navRef.current(1);
      if (e.key === 'ArrowLeft')  navRef.current(-1);
      if (e.key === ' ')          { e.preventDefault(); setIsPlaying(p => !p); }
      if (e.key.toLowerCase() === 'r') setRotation(r => (r + 90) % 360);
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [onClose]);

  /* Auto-play */
  useEffect(() => {
    if (playRef.current) clearInterval(playRef.current);
    if (isPlaying && numPages > 1) {
      playRef.current = setInterval(() => navRef.current(1), AUTO_MS);
    }
    return () => clearInterval(playRef.current);
  }, [isPlaying, numPages]);

  /* Stop at last page */
  useEffect(() => {
    if (pageNum >= numPages && isPlaying) setIsPlaying(false);
  }, [pageNum, numPages, isPlaying]);

  const prevPage = pageNum > 1          ? pageNum - 1 : null;
  const nextPage = pageNum < numPages   ? pageNum + 1 : null;

  const slot = (baseLeft, isSide) => ({
    position: 'absolute', top: 0, left: 0,
    width: slideW, height: ah,
    transform: `translateX(${baseLeft + shiftPx}px)`,
    transition: animOn ? `transform ${ANIM_MS}ms cubic-bezier(0.4,0,0.2,1)` : 'none',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: PAD, boxSizing: 'border-box',
    opacity: isSide ? 0.45 : 1,
    filter: isSide ? 'blur(1px) brightness(0.7)' : 'none',
    pointerEvents: isSide ? 'none' : 'auto',
    overflow: 'hidden',
  });

  if (!study?.pdfUrl) return <NoPdfOverlay study={study} onClose={onClose} />;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,          /* ← always on top of everything */
      background: '#060606',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* TopBar */}
      <TopBar
        study={study}
        pageNum={pageNum} numPages={numPages}
        zoom={zoom} isPlaying={isPlaying} pdfDoc={pdfDoc}
        onClose={onClose}
        onPrev={() => { setIsPlaying(false); navigate(-1); }}
        onNext={() => { setIsPlaying(false); navigate(1); }}
        onZoomIn={() => setZoom(z => Math.min(3, +(z + 0.25).toFixed(2)))}
        onZoomOut={() => setZoom(z => Math.max(0.5, +(z - 0.25).toFixed(2)))}
        onZoomReset={() => setZoom(1)}
        onPlayToggle={() => setIsPlaying(p => !p)}
      />

      {/* Carousel area */}
      <div
        ref={areaRef}
        style={{
          flex: 1, position: 'relative', overflow: 'hidden',
          background: 'radial-gradient(ellipse at center, #0f0f0f 0%, #060606 100%)',
        }}
      >
        {loading && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 14,
          }}>
            <div style={{
              width: 32, height: 32,
              border: '2px solid rgba(201,168,76,0.15)',
              borderTop: '2px solid #C9A84C',
              borderRadius: '50%',
              animation: 'pdfSpin 0.75s linear infinite',
            }} />
            <span style={{
              fontFamily: 'sans-serif', fontSize: 10,
              letterSpacing: '.22em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.28)',
            }}>
              Loading PDF…
            </span>
          </div>
        )}

        {error && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 10,
          }}>
            <p style={{
              fontFamily: "'Bebas Neue', sans-serif", fontSize: '2rem',
              letterSpacing: '.1em', color: 'rgba(255,255,255,0.3)', margin: 0,
            }}>
              Failed to Load
            </p>
            <p style={{ fontFamily: 'sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.28)', margin: 0 }}>
              Could not load the PDF.
            </p>
          </div>
        )}

        {!loading && !error && aw > 0 && pdfDoc && (
          <>
            <button
              type="button"
              onClick={() => setRotation(r => (r + 90) % 360)}
              title="Rotate 90° (R)"
              style={{
                position: 'absolute',
                top: 10,
                left: rotateBtnLeft,
                zIndex: 14,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                height: 38,
                padding: '0 14px',
                borderRadius: 9,
                border: '1px solid rgba(201,168,76,0.42)',
                background: 'rgba(8,8,8,0.86)',
                backdropFilter: 'blur(10px)',
                color: '#C9A84C',
                cursor: 'pointer',
                boxShadow: '0 10px 26px rgba(0,0,0,0.45)',
                fontFamily: 'sans-serif',
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: '.18em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              <IcoRotate />
              <span>Rotate</span>
              <span style={{
                fontFamily: 'monospace',
                fontSize: 10,
                letterSpacing: '0.08em',
                color: 'rgba(255,255,255,0.62)',
              }}>
                {rotation}°
              </span>
            </button>

            {prevPage && (
              <div style={slot(posL, true)}>
                <PageCanvas pdfDoc={pdfDoc} pageNum={prevPage} maxW={availW} maxH={availH} zoom={1} rotation={rotation} />
              </div>
            )}

            <div style={{
              ...slot(posC, false),
              overflow: zoom > 1 ? 'auto' : 'hidden',
            }}>
              <div style={{ boxShadow: '0 28px 100px rgba(0,0,0,0.96)', borderRadius: 8, lineHeight: 0 }}>
                <PageCanvas pdfDoc={pdfDoc} pageNum={pageNum} maxW={availW} maxH={availH} zoom={zoom} rotation={rotation} />
              </div>
            </div>

            {nextPage && (
              <div style={slot(posR, true)}>
                <PageCanvas pdfDoc={pdfDoc} pageNum={nextPage} maxW={availW} maxH={availH} zoom={1} rotation={rotation} />
              </div>
            )}

            <NavArrow side="left"  onClick={() => { setIsPlaying(false); navigate(-1); }} disabled={pageNum <= 1} />
            <NavArrow side="right" onClick={() => { setIsPlaying(false); navigate(1); }}  disabled={pageNum >= numPages} />

            <PageDots
              pageNum={pageNum}
              numPages={numPages}
              onChange={(p) => { setIsPlaying(false); setPageNum(p); }}
            />

            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5,
              background: 'linear-gradient(to right, rgba(6,6,6,0.65) 0%, transparent 22%, transparent 78%, rgba(6,6,6,0.65) 100%)',
            }} />
          </>
        )}
      </div>

      {/* Progress bar */}
      <div style={{ height: 2, background: 'rgba(255,255,255,0.05)', flexShrink: 0 }}>
        <div style={{
          height: '100%',
          width: `${numPages ? (pageNum / numPages) * 100 : 0}%`,
          background: 'linear-gradient(to right, #C9A84C, rgba(201,168,76,0.5))',
          transition: 'width 0.4s ease',
        }} />
      </div>

      <style>{`@keyframes pdfSpin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
