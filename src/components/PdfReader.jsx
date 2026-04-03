import { useCallback, useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

const DEFAULT_VIEWPORT_WIDTH = 1440;
const DESKTOP_BREAKPOINT = 1024;
const MOBILE_BREAKPOINT = 768;
const SMALL_MOBILE_BREAKPOINT = 480;

function getViewportWidth() {
  return typeof window !== 'undefined' ? window.innerWidth : DEFAULT_VIEWPORT_WIDTH;
}

function getCanvasPadding(viewportWidth) {
  if (viewportWidth < SMALL_MOBILE_BREAKPOINT) return 12;
  if (viewportWidth < MOBILE_BREAKPOINT) return 16;
  if (viewportWidth < DESKTOP_BREAKPOINT) return 20;
  return 32;
}

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
    <button
      type="button"
      onClick={onClick}
      style={{
        cursor: 'pointer',
        padding: '6px',
        border: `1px solid ${isActive ? 'rgba(201,168,76,0.7)' : 'rgba(255,255,255,0.08)'}`,
        background: isActive ? 'rgba(201,168,76,0.07)' : 'rgba(255,255,255,0.02)',
        transition: 'all .2s',
        borderRadius: 6,
        width: '100%',
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
        style={{
          width: '100%',
          display: 'block',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: 4,
        }}
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
    </button>
  );
}

export default function PdfReader({ study, onClose }) {
  const [pdfDoc, setPdfDoc] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(() => getViewportWidth() >= DESKTOP_BREAKPOINT);
  const [rendering, setRendering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [slideshowInterval, setSlideshowInterval] = useState(2000);
  const [pageFlash, setPageFlash] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(getViewportWidth);
  const [viewerWidth, setViewerWidth] = useState(0);

  const slideshowRef = useRef(null);
  const canvasRef = useRef(null);
  const renderTaskRef = useRef(null);
  const canvasAreaRef = useRef(null);
  const flashTimeoutRef = useRef(null);

  const isTablet = viewportWidth < DESKTOP_BREAKPOINT;
  const isMobile = viewportWidth < MOBILE_BREAKPOINT;
  const isSmallMobile = viewportWidth < SMALL_MOBILE_BREAKPOINT;
  const viewerPadding = getCanvasPadding(viewportWidth);
  const sidebarWidth = isMobile ? Math.min(Math.max(viewportWidth - 32, 220), 280) : isTablet ? 220 : 190;
  const controlSize = isSmallMobile ? 30 : 32;
  const progressRingSize = isSmallMobile ? 38 : isMobile ? 40 : 44;
  const progressRingRadius = isSmallMobile ? 15 : 18;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleResize = () => setViewportWidth(window.innerWidth);

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isTablet) {
      setSidebarOpen(false);
    }
  }, [isTablet]);

  useEffect(() => {
    const node = canvasAreaRef.current;
    if (!node) {
      return undefined;
    }

    const updateViewerWidth = () => setViewerWidth(node.clientWidth);

    updateViewerWidth();

    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(() => updateViewerWidth());
      observer.observe(node);
      return () => observer.disconnect();
    }

    window.addEventListener('resize', updateViewerWidth);
    return () => window.removeEventListener('resize', updateViewerWidth);
  }, [sidebarOpen, isTablet]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setPageNum((p) => Math.min(p + 1, numPages || 1));
      }

      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setPageNum((p) => Math.max(p - 1, 1));
      }

      if (e.key === 'Escape') {
        onClose();
      }

      if (e.key === '+' || e.key === '=') {
        setZoom((z) => Math.min(z + 0.2, 2.4));
      }

      if (e.key === '-') {
        setZoom((z) => Math.max(z - 0.2, 0.6));
      }

      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [numPages, onClose]);

  useEffect(() => {
    if (!study.pdfUrl) {
      setPdfDoc(null);
      setNumPages(0);
      setPageNum(1);
      setLoading(false);
      return undefined;
    }

    let cancelled = false;
    const loadingTask = pdfjsLib.getDocument(study.pdfUrl);

    setLoading(true);
    setError(false);
    setPdfDoc(null);
    setNumPages(0);
    setPageNum(1);

    loadingTask.promise
      .then((doc) => {
        if (cancelled) {
          doc.destroy();
          return;
        }

        setPdfDoc(doc);
        setNumPages(doc.numPages);
        setLoading(false);
        setIsPlaying(true);
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
      loadingTask.destroy();
    };
  }, [study.pdfUrl]);

  useEffect(() => {
    if (slideshowRef.current) {
      clearInterval(slideshowRef.current);
      slideshowRef.current = null;
    }

    if (isPlaying && numPages > 0) {
      slideshowRef.current = setInterval(() => {
        setPageNum((p) => {
          if (p >= numPages) {
            setIsPlaying(false);
            return p;
          }

          if (flashTimeoutRef.current) {
            clearTimeout(flashTimeoutRef.current);
          }

          setPageFlash(true);
          flashTimeoutRef.current = setTimeout(() => setPageFlash(false), 300);
          return p + 1;
        });
      }, slideshowInterval);
    }

    return () => {
      if (slideshowRef.current) {
        clearInterval(slideshowRef.current);
      }
    };
  }, [isPlaying, numPages, slideshowInterval]);

  useEffect(() => () => {
    if (flashTimeoutRef.current) {
      clearTimeout(flashTimeoutRef.current);
    }
  }, []);

  const renderPage = useCallback(async () => {
    if (!pdfDoc || !canvasRef.current) return;

    if (renderTaskRef.current) {
      renderTaskRef.current.cancel();
      renderTaskRef.current = null;
    }

    setRendering(true);

    try {
      const page = await pdfDoc.getPage(pageNum);
      const baseViewport = page.getViewport({ scale: 1 });
      const availableWidth = Math.max((viewerWidth || viewportWidth) - (viewerPadding * 2), 180);
      const fittedScale = availableWidth / baseViewport.width;
      const minBaseScale = isSmallMobile ? 0.42 : 0.55;
      const maxBaseScale = isMobile ? 0.92 : isTablet ? 1.1 : 1.35;
      const baseScale = Math.min(Math.max(fittedScale, minBaseScale), maxBaseScale);
      const viewport = page.getViewport({ scale: baseScale * zoom });
      const canvas = canvasRef.current;

      if (!canvas) return;

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const task = page.render({ canvasContext: canvas.getContext('2d'), viewport });
      renderTaskRef.current = task;
      await task.promise;
    } catch (err) {
      if (err?.name !== 'RenderingCancelledException') {
        console.error(err);
      }
    } finally {
      renderTaskRef.current = null;
      setRendering(false);
    }
  }, [
    isMobile,
    isSmallMobile,
    isTablet,
    pageNum,
    pdfDoc,
    viewerPadding,
    viewerWidth,
    viewportWidth,
    zoom,
  ]);

  useEffect(() => {
    renderPage();
  }, [renderPage]);

  useEffect(() => {
    if (canvasAreaRef.current) {
      canvasAreaRef.current.scrollTop = 0;
    }
  }, [pageNum]);

  useEffect(() => () => renderTaskRef.current?.cancel(), []);

  const progress = numPages ? (pageNum / numPages) * 100 : 0;

  const changePage = (nextPage) => {
    if (!numPages) return;

    setIsPlaying(false);
    setPageNum(Math.min(numPages, Math.max(1, nextPage)));

    if (isTablet) {
      setSidebarOpen(false);
    }
  };

  const handlePrevious = () => changePage(pageNum - 1);
  const handleNext = () => changePage(pageNum + 1);
  const zoomOut = () => setZoom((z) => Math.max(0.6, +(z - 0.2).toFixed(1)));
  const zoomIn = () => setZoom((z) => Math.min(2.4, +(z + 0.2).toFixed(1)));
  const resetZoom = () => setZoom(1);

  if (!study.pdfUrl) {
    return (
      <div
        className="fixed inset-0 z-50 flex flex-col"
        style={{ background: 'rgba(0,0,0,0.97)', backdropFilter: 'blur(8px)' }}
      >
        <ReaderTopBar
          study={study}
          onClose={onClose}
          isMobile={isMobile}
          isSmallMobile={isSmallMobile}
        />
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
            textAlign: 'center',
            padding: isSmallMobile ? '24px 16px' : '32px 20px',
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              border: '1px solid rgba(201,168,76,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(201,168,76,0.6)',
              borderRadius: 8,
            }}
          >
            <svg width="26" height="26" viewBox="0 0 22 22" fill="none">
              <rect x="2" y="1" width="13" height="18" rx="2" stroke="currentColor" strokeWidth="1.2" />
              <path d="M13 1v6h7" stroke="currentColor" strokeWidth="1.2" />
              <path d="M5 10h8M5 13h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: isSmallMobile ? '1.8rem' : '2.2rem',
                letterSpacing: '.1em',
                color: 'rgba(255,255,255,0.5)',
                marginBottom: 8,
              }}
            >
              Coming Soon
            </p>
            <p style={{ fontFamily: 'sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>
              This case study PDF has not been attached yet.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: '#000', backdropFilter: 'blur(8px)' }}>
      <ReaderTopBar
        study={study}
        onClose={onClose}
        isMobile={isMobile}
        isSmallMobile={isSmallMobile}
      />

      <div className="pdf-reader-toolbar">
        <div className="pdf-reader-toolbar__section pdf-reader-toolbar__section--nav">
          <ToolBtn
            onClick={() => setSidebarOpen((open) => !open)}
            title="Toggle page sidebar"
            size={controlSize}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="2" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" />
              <path d="M5 2v12" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </ToolBtn>

          <div className="pdf-reader-toolbar__divider" />

          <ToolBtn onClick={handlePrevious} disabled={pageNum <= 1} title="Previous page" size={controlSize}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ToolBtn>

          <div className="pdf-reader-toolbar__page-info">
            <span className="pdf-reader-optional-label" style={{ fontFamily: 'sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
              Page
            </span>
            <span
              style={{
                fontFamily: 'sans-serif',
                fontSize: 12,
                fontWeight: 600,
                color: '#C9A84C',
                minWidth: 18,
                textAlign: 'center',
              }}
            >
              {pageNum}
            </span>
            <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
              / {numPages || '-'}
            </span>
          </div>

          <ToolBtn onClick={handleNext} disabled={pageNum >= numPages} title="Next page" size={controlSize}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ToolBtn>
        </div>

        <div className="pdf-reader-toolbar__section pdf-reader-toolbar__section--center">
          <div className="pdf-reader-toolbar__speed">
            <span
              className="pdf-reader-speed-label"
              style={{
                fontFamily: 'sans-serif',
                fontSize: 9,
                letterSpacing: '.15em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
              }}
            >
              Speed
            </span>
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
                  padding: '5px 8px',
                  border: `1px solid ${slideshowInterval === ms ? 'rgba(201,168,76,0.7)' : 'rgba(255,255,255,0.12)'}`,
                  background: slideshowInterval === ms ? 'rgba(201,168,76,0.12)' : 'transparent',
                  color: slideshowInterval === ms ? '#C9A84C' : 'rgba(255,255,255,0.4)',
                  cursor: 'pointer',
                  transition: 'all .2s',
                  borderRadius: 6,
                }}
              >
                {ms / 1000}s
              </button>
            ))}
          </div>

          <div className="pdf-reader-toolbar__divider" />

          <button
            type="button"
            onClick={() => setIsPlaying((playing) => !playing)}
            disabled={!pdfDoc || numPages === 0}
            title={isPlaying ? 'Pause slideshow (Space)' : 'Play slideshow (Space)'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              padding: isSmallMobile ? '7px 12px' : '8px 16px',
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
              borderRadius: 6,
              opacity: (!pdfDoc || numPages === 0) ? 0.4 : 1,
              minHeight: controlSize,
            }}
          >
            {isPlaying ? (
              <>
                <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                  <rect x="0" y="0" width="3.5" height="12" rx="1" />
                  <rect x="6.5" y="0" width="3.5" height="12" rx="1" />
                </svg>
                Pause
              </>
            ) : (
              <>
                <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                  <path d="M0 0l10 6-10 6V0z" />
                </svg>
                Play
              </>
            )}
          </button>

          <ToolBtn
            onClick={() => {
              setIsPlaying(false);
              setPageNum(1);
            }}
            title="Stop and go to first page"
            disabled={!pdfDoc || numPages === 0}
            size={controlSize}
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="currentColor">
              <rect x="0.5" y="0.5" width="10" height="10" rx="1.5" />
            </svg>
          </ToolBtn>

          {(rendering || isPlaying) && (
            <span
              className="pdf-reader-status-badge"
              style={{
                fontFamily: 'sans-serif',
                fontSize: 9,
                letterSpacing: '.15em',
                textTransform: 'uppercase',
                color: 'rgba(201,168,76,0.6)',
              }}
            >
              {isPlaying ? 'Slideshow' : 'Rendering...'}
            </span>
          )}
        </div>

        <div className="pdf-reader-toolbar__section pdf-reader-toolbar__section--actions">
          <ToolBtn onClick={zoomOut} title="Zoom out" size={controlSize}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.2" />
              <path d="M3 5h4M8.5 8.5l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </ToolBtn>

          <span
            style={{
              fontFamily: 'sans-serif',
              fontSize: 11,
              color: 'rgba(255,255,255,0.45)',
              minWidth: 40,
              textAlign: 'center',
            }}
          >
            {Math.round(zoom * 100)}%
          </span>

          <ToolBtn onClick={zoomIn} title="Zoom in" size={controlSize}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.2" />
              <path d="M5 3v4M3 5h4M8.5 8.5l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </ToolBtn>

          <ToolBtn onClick={resetZoom} title="Reset zoom" size={controlSize}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6a4 4 0 1 1 4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M2 4v2h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ToolBtn>

          <div className="pdf-reader-toolbar__divider" />

          <a
            href={study.pdfUrl}
            download
            className="pdf-reader-download"
            style={{
              fontFamily: 'sans-serif',
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '.15em',
              textTransform: 'uppercase',
              padding: isSmallMobile ? '8px 12px' : '9px 14px',
              color: '#C9A84C',
              border: '1px solid rgba(201,168,76,0.4)',
              background: 'transparent',
              textDecoration: 'none',
              transition: 'all .2s',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 6,
              minHeight: controlSize,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#C9A84C';
              e.currentTarget.style.color = '#000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#C9A84C';
            }}
          >
            Download
          </a>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative', minHeight: 0 }}>
        {isTablet && sidebarOpen && (
          <button
            type="button"
            aria-label="Close page sidebar"
            onClick={() => setSidebarOpen(false)}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.45)',
              border: 'none',
              padding: 0,
              zIndex: 20,
              cursor: 'pointer',
            }}
          />
        )}

        {sidebarOpen && (
          <div
            className="pdf-reader-sidebar-panel"
            style={{
              width: sidebarWidth,
              flexShrink: 0,
              background: '#080808',
              borderRight: '1px solid rgba(255,255,255,0.07)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              position: isTablet ? 'absolute' : 'relative',
              inset: isTablet ? '0 auto 0 0' : 'auto',
              height: isTablet ? '100%' : 'auto',
              zIndex: 30,
              boxShadow: isTablet ? '16px 0 40px rgba(0,0,0,0.45)' : 'none',
              maxWidth: isTablet ? '84vw' : 'none',
            }}
          >
            <div style={{ padding: '12px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
              <span
                style={{
                  fontFamily: 'sans-serif',
                  fontSize: 9,
                  letterSpacing: '.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.35)',
                }}
              >
                Pages ({numPages})
              </span>
            </div>
            <div className="pdf-reader-sidebar-list">
              {pdfDoc && Array.from({ length: numPages }, (_, i) => (
                <PageThumb
                  key={i}
                  pdfDoc={pdfDoc}
                  pageIndex={i}
                  isActive={i + 1 === pageNum}
                  onClick={() => changePage(i + 1)}
                />
              ))}
            </div>
          </div>
        )}

        <div
          ref={canvasAreaRef}
          style={{
            flex: 1,
            overflow: 'auto',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: viewerPadding,
            background: '#141414',
            position: 'relative',
            minWidth: 0,
          }}
        >
          {loading && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#141414',
                zIndex: 10,
                padding: 20,
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    border: '2px solid rgba(201,168,76,0.2)',
                    borderTop: '2px solid #C9A84C',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                    margin: '0 auto 12px',
                  }}
                />
                <p
                  style={{
                    fontFamily: 'sans-serif',
                    fontSize: 11,
                    letterSpacing: '.2em',
                    color: 'rgba(255,255,255,0.4)',
                    textTransform: 'uppercase',
                  }}
                >
                  Loading PDF...
                </p>
              </div>
            </div>
          )}

          {error && (
            <div style={{ textAlign: 'center', paddingTop: isSmallMobile ? 32 : 80, paddingInline: 20 }}>
              <p
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: isSmallMobile ? '1.6rem' : '2rem',
                  letterSpacing: '.1em',
                  color: 'rgba(255,255,255,0.4)',
                  marginBottom: 8,
                }}
              >
                Failed to Load
              </p>
              <p style={{ fontFamily: 'sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
                The PDF could not be loaded. Try downloading it directly.
              </p>
            </div>
          )}

          {!loading && !error && (
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                transition: 'opacity 0.25s ease, transform 0.25s ease',
                opacity: pageFlash ? 0.3 : 1,
                transform: pageFlash ? 'scale(0.98)' : 'scale(1)',
              }}
            >
              <canvas
                ref={canvasRef}
                style={{
                  display: 'block',
                  boxShadow: '0 12px 60px rgba(0,0,0,0.9)',
                  border: '1px solid rgba(201,168,76,0.1)',
                  borderRadius: isSmallMobile ? 6 : 8,
                  background: '#fff',
                }}
              />
            </div>
          )}

          {isPlaying && (
            <div
              style={{
                position: 'absolute',
                bottom: isSmallMobile ? 12 : 20,
                right: isSmallMobile ? 12 : 20,
                width: progressRingSize,
                height: progressRingSize,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width={progressRingSize} height={progressRingSize} viewBox={`0 0 ${progressRingSize} ${progressRingSize}`}>
                <circle
                  cx={progressRingSize / 2}
                  cy={progressRingSize / 2}
                  r={progressRingRadius}
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="3"
                />
                <circle
                  cx={progressRingSize / 2}
                  cy={progressRingSize / 2}
                  r={progressRingRadius}
                  fill="none"
                  stroke="#C9A84C"
                  strokeWidth="3"
                  strokeDasharray={`${2 * Math.PI * progressRingRadius}`}
                  strokeDashoffset="0"
                  strokeLinecap="round"
                  style={{
                    transformOrigin: `${progressRingSize / 2}px ${progressRingSize / 2}px`,
                    transform: 'rotate(-90deg)',
                    animation: `slideshowRing ${slideshowInterval}ms linear infinite`,
                  }}
                />
              </svg>
              <span
                style={{
                  position: 'absolute',
                  fontFamily: 'sans-serif',
                  fontSize: isSmallMobile ? 8 : 9,
                  fontWeight: 700,
                  color: '#C9A84C',
                  letterSpacing: '.05em',
                }}
              >
                {pageNum}/{numPages}
              </span>
            </div>
          )}
        </div>
      </div>

      <div style={{ height: 2, background: 'rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(to right, #C9A84C, rgba(201,168,76,0.5))',
            transition: 'width .3s ease',
          }}
        />
      </div>

      <style>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes slideshowRing {
          from {
            stroke-dashoffset: ${2 * Math.PI * progressRingRadius};
          }

          to {
            stroke-dashoffset: 0;
          }
        }

        .pdf-reader-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 12px 24px;
          background: #0a0a0a;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          flex-shrink: 0;
        }

        .pdf-reader-topbar__meta {
          display: flex;
          align-items: center;
          gap: 14px;
          min-width: 0;
          flex-wrap: wrap;
          flex: 1;
        }

        .pdf-reader-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px 16px;
          padding: 8px 20px;
          background: #0a0a0a;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          flex-shrink: 0;
          min-width: 0;
        }

        .pdf-reader-toolbar__section {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
          flex-wrap: wrap;
        }

        .pdf-reader-toolbar__section--nav,
        .pdf-reader-toolbar__section--actions {
          flex: 1 1 240px;
        }

        .pdf-reader-toolbar__section--center {
          flex: 1 1 320px;
          justify-content: center;
        }

        .pdf-reader-toolbar__section--actions {
          justify-content: flex-end;
        }

        .pdf-reader-toolbar__page-info,
        .pdf-reader-toolbar__speed {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }

        .pdf-reader-toolbar__divider {
          width: 1px;
          height: 18px;
          background: rgba(255,255,255,0.1);
          flex-shrink: 0;
        }

        .pdf-reader-sidebar-list {
          flex: 1;
          overflow-y: auto;
          padding: 10px 8px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .pdf-reader-download {
          white-space: nowrap;
        }

        @media (max-width: 1023px) {
          .pdf-reader-topbar {
            padding: 14px 16px;
          }

          .pdf-reader-toolbar {
            padding: 10px 14px;
          }

          .pdf-reader-toolbar__section--nav,
          .pdf-reader-toolbar__section--center,
          .pdf-reader-toolbar__section--actions {
            flex-basis: calc(50% - 8px);
          }

          .pdf-reader-toolbar__section--center {
            justify-content: flex-start;
          }
        }

        @media (max-width: 767px) {
          .pdf-reader-topbar {
            align-items: flex-start;
            gap: 12px;
            padding: 12px 14px;
          }

          .pdf-reader-topbar__separator {
            display: none;
          }

          .pdf-reader-toolbar {
            align-items: stretch;
          }

          .pdf-reader-toolbar__section {
            width: 100%;
            flex: 1 1 100%;
            justify-content: flex-start;
            gap: 6px 8px;
          }

          .pdf-reader-toolbar__divider {
            display: none;
          }
        }

        @media (max-width: 479px) {
          .pdf-reader-toolbar {
            gap: 10px;
            padding: 10px 12px;
          }

          .pdf-reader-toolbar__section {
            gap: 6px;
          }

          .pdf-reader-optional-label {
            display: none;
          }

          .pdf-reader-speed-label,
          .pdf-reader-status-badge {
            width: 100%;
          }

          .pdf-reader-download {
            flex: 1 1 auto;
          }
        }
      `}</style>
    </div>
  );
}

function ReaderTopBar({ study, onClose, isMobile, isSmallMobile }) {
  const closeButtonSize = isSmallMobile ? 30 : 34;

  return (
    <div className="pdf-reader-topbar">
      <div className="pdf-reader-topbar__meta">
        <span
          style={{
            fontFamily: 'sans-serif',
            fontSize: 10,
            letterSpacing: '.25em',
            textTransform: 'uppercase',
            fontWeight: 600,
            color: '#C9A84C',
            whiteSpace: 'nowrap',
          }}
        >
          {study.category}
        </span>
        <span
          className="pdf-reader-topbar__separator"
          style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.2)', display: 'inline-block' }}
        />
        <h3
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: isSmallMobile ? '0.96rem' : isMobile ? '1.05rem' : '1.2rem',
            letterSpacing: '.08em',
            textTransform: 'uppercase',
            color: '#fff',
            margin: 0,
            minWidth: 0,
            lineHeight: 1.1,
            wordBreak: 'break-word',
          }}
        >
          {study.title}
          {study.subtitle ? ` - ${study.subtitle}` : ''}
        </h3>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close PDF reader"
        style={{
          width: closeButtonSize,
          height: closeButtonSize,
          border: '1px solid rgba(255,255,255,0.2)',
          background: 'transparent',
          cursor: 'pointer',
          color: 'rgba(255,255,255,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          transition: 'all .2s',
          borderRadius: 6,
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#C9A84C';
          e.currentTarget.style.color = '#C9A84C';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
          e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
        }}
      >
        x
      </button>
    </div>
  );
}

function ToolBtn({ onClick, children, title, disabled, size = 32 }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      disabled={disabled}
      style={{
        width: size,
        height: size,
        border: '1px solid rgba(255,255,255,0.12)',
        background: 'transparent',
        cursor: disabled ? 'not-allowed' : 'pointer',
        color: disabled ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.55)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all .2s',
        borderRadius: 6,
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)';
          e.currentTarget.style.color = '#C9A84C';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
          e.currentTarget.style.color = 'rgba(255,255,255,0.55)';
        }
      }}
    >
      {children}
    </button>
  );
}
