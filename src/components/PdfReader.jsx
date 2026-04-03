import { useCallback, useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

function PageThumb({ pdfDoc, pageIndex, isActive, onClick }) {
  const thumbRef = useRef(null);

  useEffect(() => {
    if (!pdfDoc || !thumbRef.current) {
      return undefined;
    }

    let cancelled = false;
    let task = null;

    pdfDoc.getPage(pageIndex + 1).then((page) => {
      if (cancelled) return;

      const viewport = page.getViewport({ scale: 0.2 });
      const canvas = thumbRef.current;
      if (!canvas) return;

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      task = page.render({ canvasContext: canvas.getContext('2d'), viewport });
    });

    return () => {
      cancelled = true;
      task?.cancel();
    };
  }, [pdfDoc, pageIndex]);

  return (
    <div
      onClick={onClick}
      style={{
        cursor: 'pointer',
        padding: '6px',
        border: `1px solid ${isActive ? 'rgba(201,168,76,0.7)' : 'rgba(255,255,255,0.08)'}`,
        background: isActive ? 'rgba(201,168,76,0.07)' : 'rgba(255,255,255,0.02)',
        transition: 'all .2s',
        borderRadius: 2,
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
          e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
          e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
        }
      }}
    >
      <canvas
        ref={thumbRef}
        style={{ width: '100%', display: 'block', border: '1px solid rgba(255,255,255,0.05)' }}
      />
      <p
        style={{
          fontFamily: 'sans-serif',
          fontSize: 9,
          color: isActive ? '#C9A84C' : 'rgba(255,255,255,0.35)',
          textAlign: 'center',
          marginTop: 5,
          letterSpacing: '.1em',
          textTransform: 'uppercase',
          transition: 'color .2s',
        }}
      >
        {pageIndex + 1}
      </p>
    </div>
  );
}

export default function PdfReader({ study, onClose }) {
  const [pdfDoc, setPdfDoc] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [zoom, setZoom] = useState(1.2);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rendering, setRendering] = useState(false);

  // ── Slideshow state ──
  const [isPlaying, setIsPlaying] = useState(false);
  const [slideshowInterval, setSlideshowInterval] = useState(2000); // ms
  const [pageFlash, setPageFlash] = useState(false);
  const slideshowRef = useRef(null);

  const canvasRef = useRef(null);
  const renderTaskRef = useRef(null);
  const canvasAreaRef = useRef(null);

  // ── Lock body scroll ──
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // ── Keyboard shortcuts ──
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown')
        setPageNum((p) => Math.min(p + 1, numPages));
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp')
        setPageNum((p) => Math.max(p - 1, 1));
      if (e.key === 'Escape') onClose();
      if (e.key === '+' || e.key === '=')
        setZoom((z) => Math.min(z + 0.2, 3));
      if (e.key === '-') setZoom((z) => Math.max(z - 0.2, 0.5));
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [numPages, onClose]);

  // ── Load PDF ──
  useEffect(() => {
    if (!study.pdfUrl) {
      setPdfDoc(null); setNumPages(0); setPageNum(1); setLoading(false);
      return undefined;
    }

    let cancelled = false;
    const loadingTask = pdfjsLib.getDocument(study.pdfUrl);
    setLoading(true); setError(false); setPdfDoc(null); setNumPages(0); setPageNum(1);

    loadingTask.promise
      .then((doc) => {
        if (cancelled) { doc.destroy(); return; }
        setPdfDoc(doc);
        setNumPages(doc.numPages);
        setLoading(false);
        setIsPlaying(true); // Auto-play on open
      })
      .catch(() => { if (!cancelled) { setError(true); setLoading(false); } });

    return () => { cancelled = true; loadingTask.destroy(); };
  }, [study.pdfUrl]);

  // ── Slideshow timer ──
  useEffect(() => {
    if (slideshowRef.current) {
      clearInterval(slideshowRef.current);
      slideshowRef.current = null;
    }

    if (isPlaying && numPages > 0) {
      slideshowRef.current = setInterval(() => {
        setPageNum((p) => {
          if (p >= numPages) {
            // Reached last page — stop slideshow
            setIsPlaying(false);
            return p;
          }
          // Flash animation trigger
          setPageFlash(true);
          setTimeout(() => setPageFlash(false), 300);
          return p + 1;
        });
      }, slideshowInterval);
    }

    return () => {
      if (slideshowRef.current) clearInterval(slideshowRef.current);
    };
  }, [isPlaying, numPages, slideshowInterval]);

  // ── Render page ──
  const renderPage = useCallback(async () => {
    if (!pdfDoc || !canvasRef.current) return;

    if (renderTaskRef.current) {
      renderTaskRef.current.cancel();
      renderTaskRef.current = null;
    }

    setRendering(true);

    try {
      const page = await pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale: zoom });
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const task = page.render({ canvasContext: canvas.getContext('2d'), viewport });
      renderTaskRef.current = task;
      await task.promise;
    } catch (err) {
      if (err?.name !== 'RenderingCancelledException') console.error(err);
    } finally {
      renderTaskRef.current = null;
      setRendering(false);
    }
  }, [pageNum, pdfDoc, zoom]);

  useEffect(() => { renderPage(); }, [renderPage]);
  useEffect(() => {
    if (canvasAreaRef.current) canvasAreaRef.current.scrollTop = 0;
  }, [pageNum]);
  useEffect(() => () => renderTaskRef.current?.cancel(), []);

  const progress = numPages ? (pageNum / numPages) * 100 : 0;

  if (!study.pdfUrl) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col" style={{ background: 'rgba(0,0,0,0.97)', backdropFilter: 'blur(8px)' }}>
        <ReaderTopBar study={study} onClose={onClose} />
        <div className="flex-1 flex flex-col items-center justify-center gap-5 text-center">
          <div style={{ width: 64, height: 64, border: '1px solid rgba(201,168,76,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(201,168,76,0.6)' }}>
            <svg width="26" height="26" viewBox="0 0 22 22" fill="none">
              <rect x="2" y="1" width="13" height="18" rx="2" stroke="currentColor" strokeWidth="1.2" />
              <path d="M13 1v6h7" stroke="currentColor" strokeWidth="1.2" />
              <path d="M5 10h8M5 13h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.2rem', letterSpacing: '.1em', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>Coming Soon</p>
            <p style={{ fontFamily: 'sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>This case study PDF has not been attached yet.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: '#000', backdropFilter: 'blur(8px)' }}>
      <ReaderTopBar study={study} onClose={onClose} />

      {/* ── Toolbar ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 20px', background: '#0a0a0a', borderBottom: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 }}>

        {/* Left: sidebar + navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ToolBtn onClick={() => setSidebarOpen((o) => !o)} title="Toggle sidebar">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="2" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" />
              <path d="M5 2v12" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </ToolBtn>

          <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.1)', margin: '0 4px' }} />

          <ToolBtn onClick={() => { setIsPlaying(false); setPageNum((p) => Math.max(1, p - 1)); }} disabled={pageNum <= 1}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ToolBtn>

          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Page</span>
            <span style={{ fontFamily: 'sans-serif', fontSize: 12, fontWeight: 600, color: '#C9A84C', minWidth: 16, textAlign: 'center' }}>{pageNum}</span>
            <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>/ {numPages || '-'}</span>
          </div>

          <ToolBtn onClick={() => { setIsPlaying(false); setPageNum((p) => Math.min(numPages, p + 1)); }} disabled={pageNum >= numPages}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ToolBtn>
        </div>

        {/* Center: Slideshow controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Speed selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontFamily: 'sans-serif', fontSize: 9, letterSpacing: '.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>Speed</span>
            {[1000, 2000, 3000].map((ms) => (
              <button
                key={ms}
                type="button"
                onClick={() => setSlideshowInterval(ms)}
                style={{
                  fontFamily: 'sans-serif',
                  fontSize: 9,
                  fontWeight: 600,
                  letterSpacing: '.1em',
                  padding: '3px 8px',
                  border: `1px solid ${slideshowInterval === ms ? 'rgba(201,168,76,0.7)' : 'rgba(255,255,255,0.12)'}`,
                  background: slideshowInterval === ms ? 'rgba(201,168,76,0.12)' : 'transparent',
                  color: slideshowInterval === ms ? '#C9A84C' : 'rgba(255,255,255,0.4)',
                  cursor: 'pointer',
                  transition: 'all .2s',
                  borderRadius: 2,
                }}
              >
                {ms / 1000}s
              </button>
            ))}
          </div>

          <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.1)' }} />

          {/* Play / Pause button — main hero control */}
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            disabled={!pdfDoc || numPages === 0}
            title={isPlaying ? 'Pause slideshow (Space)' : 'Play slideshow (Space)'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              padding: '6px 16px',
              border: `1px solid ${isPlaying ? '#C9A84C' : 'rgba(201,168,76,0.4)'}`,
              background: isPlaying ? '#C9A84C' : 'transparent',
              color: isPlaying ? '#000' : '#C9A84C',
              cursor: (!pdfDoc || numPages === 0) ? 'not-allowed' : 'pointer',
              fontFamily: 'sans-serif',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '.18em',
              textTransform: 'uppercase',
              transition: 'all .2s',
              borderRadius: 2,
              opacity: (!pdfDoc || numPages === 0) ? 0.4 : 1,
            }}
          >
            {isPlaying ? (
              <>
                {/* Pause icon */}
                <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                  <rect x="0" y="0" width="3.5" height="12" rx="1" />
                  <rect x="6.5" y="0" width="3.5" height="12" rx="1" />
                </svg>
                Pause
              </>
            ) : (
              <>
                {/* Play icon */}
                <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                  <path d="M0 0l10 6-10 6V0z" />
                </svg>
                Play
              </>
            )}
          </button>

          {/* Stop button */}
          <ToolBtn
            onClick={() => { setIsPlaying(false); setPageNum(1); }}
            title="Stop & go to first page"
            disabled={!pdfDoc || numPages === 0}
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="currentColor">
              <rect x="0.5" y="0.5" width="10" height="10" rx="1.5" />
            </svg>
          </ToolBtn>

          {/* Rendering / playing status badge */}
          {(rendering || isPlaying) && (
            <span style={{ fontFamily: 'sans-serif', fontSize: 9, letterSpacing: '.15em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)' }}>
              {isPlaying ? '▶ Slideshow' : 'Rendering...'}
            </span>
          )}
        </div>

        {/* Right: Zoom + Download */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ToolBtn onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.2).toFixed(1)))}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.2" />
              <path d="M3 5h4M8.5 8.5l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </ToolBtn>

          <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.45)', minWidth: 36, textAlign: 'center' }}>
            {Math.round(zoom * 100)}%
          </span>

          <ToolBtn onClick={() => setZoom((z) => Math.min(3, +(z + 0.2).toFixed(1)))}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.2" />
              <path d="M5 3v4M3 5h4M8.5 8.5l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </ToolBtn>

          <ToolBtn onClick={() => setZoom(1.2)} title="Reset zoom">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6a4 4 0 1 1 4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M2 4v2h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ToolBtn>

          <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.1)', margin: '0 4px' }} />

          <a
            href={study.pdfUrl}
            download
            style={{ fontFamily: 'sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase', padding: '5px 14px', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.4)', background: 'transparent', textDecoration: 'none', transition: 'all .2s', display: 'inline-block' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#C9A84C'; e.currentTarget.style.color = '#000'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C9A84C'; }}
          >
            Download
          </a>
        </div>
      </div>

      {/* ── Main area ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {sidebarOpen && (
          <div style={{ width: 160, flexShrink: 0, background: '#080808', borderRight: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
              <span style={{ fontFamily: 'sans-serif', fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
                Pages ({numPages})
              </span>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '10px 8px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {pdfDoc && Array.from({ length: numPages }, (_, i) => (
                <PageThumb key={i} pdfDoc={pdfDoc} pageIndex={i} isActive={i + 1 === pageNum} onClick={() => { setIsPlaying(false); setPageNum(i + 1); }} />
              ))}
            </div>
          </div>
        )}

        <div
          ref={canvasAreaRef}
          style={{ flex: 1, overflow: 'auto', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 32, background: '#141414', position: 'relative' }}
        >
          {loading && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#141414', zIndex: 10 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 32, height: 32, border: '2px solid rgba(201,168,76,0.2)', borderTop: '2px solid #C9A84C', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
                <p style={{ fontFamily: 'sans-serif', fontSize: 11, letterSpacing: '.2em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Loading PDF...</p>
              </div>
            </div>
          )}

          {error && (
            <div style={{ textAlign: 'center', paddingTop: 80 }}>
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2rem', letterSpacing: '.1em', color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>Failed to Load</p>
              <p style={{ fontFamily: 'sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>The PDF could not be loaded. Try downloading it directly.</p>
            </div>
          )}

          {!loading && !error && (
            <div
              style={{
                transition: 'opacity 0.25s ease, transform 0.25s ease',
                opacity: pageFlash ? 0.3 : 1,
                transform: pageFlash ? 'scale(0.98)' : 'scale(1)',
              }}
            >
              <canvas
                ref={canvasRef}
                style={{ display: 'block', boxShadow: '0 12px 60px rgba(0,0,0,0.9)', border: '1px solid rgba(201,168,76,0.1)', maxWidth: '100%' }}
              />
            </div>
          )}

          {/* Slideshow progress ring (bottom-right corner) */}
          {isPlaying && (
            <div
              style={{
                position: 'absolute',
                bottom: 20,
                right: 20,
                width: 44,
                height: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="44" height="44" viewBox="0 0 44 44">
                <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
                <circle
                  cx="22" cy="22" r="18"
                  fill="none"
                  stroke="#C9A84C"
                  strokeWidth="3"
                  strokeDasharray={`${2 * Math.PI * 18}`}
                  strokeDashoffset="0"
                  strokeLinecap="round"
                  style={{
                    transformOrigin: '22px 22px',
                    transform: 'rotate(-90deg)',
                    animation: `slideshowRing ${slideshowInterval}ms linear infinite`,
                  }}
                />
              </svg>
              <span style={{ position: 'absolute', fontFamily: 'sans-serif', fontSize: 9, fontWeight: 700, color: '#C9A84C', letterSpacing: '.05em' }}>
                {pageNum}/{numPages}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div style={{ height: 2, background: 'rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(to right, #C9A84C, rgba(201,168,76,0.5))', transition: 'width .3s ease' }} />
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideshowRing {
          from { stroke-dashoffset: ${2 * Math.PI * 18}; }
          to   { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}

function ReaderTopBar({ study, onClose }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', background: '#0a0a0a', borderBottom: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{ fontFamily: 'sans-serif', fontSize: 10, letterSpacing: '.25em', textTransform: 'uppercase', fontWeight: 600, color: '#C9A84C' }}>{study.category}</span>
        <span style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.2)', display: 'inline-block' }} />
        <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.2rem', letterSpacing: '.08em', textTransform: 'uppercase', color: '#fff', margin: 0 }}>
          {study.title} - {study.subtitle}
        </h3>
      </div>
      <button
        type="button"
        onClick={onClose}
        style={{ width: 34, height: 34, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, transition: 'all .2s' }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#C9A84C'; e.currentTarget.style.color = '#C9A84C'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
      >
        x
      </button>
    </div>
  );
}

function ToolBtn({ onClick, children, title, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      disabled={disabled}
      style={{ width: 28, height: 28, border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', cursor: disabled ? 'not-allowed' : 'pointer', color: disabled ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s' }}
      onMouseEnter={(e) => { if (!disabled) { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'; e.currentTarget.style.color = '#C9A84C'; } }}
      onMouseLeave={(e) => { if (!disabled) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; } }}
    >
      {children}
    </button>
  );
}