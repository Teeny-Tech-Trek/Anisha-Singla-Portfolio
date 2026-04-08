// import { useState } from 'react';
// import { useStaggerLeft, useStaggerRight } from '../hooks/useGsap';
// import { awardsData } from '../data/awardsData';
// import { certificationsData } from '../data/certificationsData';
// import PdfReader from './PdfReader';

// export default function Certifications() {
//   const leftRef  = useStaggerLeft('.stagger');
//   const rightRef = useStaggerRight('.stagger-r');

//   const [expandedId, setExpandedId] = useState(null);
//   const [activePdf, setActivePdf]   = useState(null);

//   function toggleAward(id) {
//     setExpandedId(prev => (prev === id ? null : id));
//   }

//   function openPdf(award, item) {
//     setActivePdf({ category: award.title, title: item.name, pdfUrl: item.pdfUrl });
//   }

//   return (
//     <>
//       <section id="certifications" className="py-8 px-6 md:px-14" style={{ background: '#050505' }}>
//         <div className="max-w-7xl mx-auto">
//           <p className="section-label">07 / Recognition</p>
//           <h2 className="section-title text-white mb-14">Certifications &amp; Awards</h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//             {/* Certifications */}
//             <div ref={leftRef}>
//               <h3
//                 className="font-title mb-6 text-gold"
//                 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.8rem', letterSpacing: '.08em' }}
//               >
//                 Certifications
//               </h3>
//               <div className="flex flex-col gap-3">
//                 {certificationsData.map(cert => (
//                   <button
//                     type="button"
//                     key={cert.id}
//                     onClick={() => cert.pdfUrl && setActivePdf({ category: 'Certification', title: cert.name, pdfUrl: cert.pdfUrl })}
//                     className="stagger card flex items-center gap-4 p-4"
//                     style={{
//                       width: '100%',
//                       textAlign: 'left',
//                       cursor: cert.pdfUrl ? 'pointer' : 'default',
//                       background: 'transparent',
//                       border: 'none',
//                     }}
//                     onMouseEnter={e => { if (cert.pdfUrl) e.currentTarget.style.background = 'rgba(201,168,76,0.05)'; }}
//                     onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
//                   >
//                     <div
//                       className="shrink-0 rounded-full"
//                       style={{ width: '8px', height: '8px', background: '#C9A84C' }}
//                     />
//                     <span className="font-body font-medium text-sm text-white flex-1">{cert.name}</span>
//                     {cert.pdfUrl && (
//                       <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.6)" strokeWidth="2">
//                         <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//                         <polyline points="14 2 14 8 20 8"/>
//                       </svg>
//                     )}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Awards & Honors */}
//             <div ref={rightRef}>
//               <h3
//                 className="font-title mb-6 text-gold"
//                 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.8rem', letterSpacing: '.08em' }}
//               >
//                 Awards &amp; Honors
//               </h3>
//               <div className="flex flex-col gap-4">
//                 {awardsData.map(award => {
//                   const isOpen = expandedId === award.id;
//                   const count  = award.items.length;

//                   return (
//                     <div key={award.id}>
//                       {/* Award card — clickable */}
//                       <button
//                         type="button"
//                         onClick={() => toggleAward(award.id)}
//                         className="stagger-r card w-full text-left p-5 flex items-center justify-between"
//                         style={{
//                           borderLeft: '3px solid #C9A84C',
//                           cursor: 'pointer',
//                           background: isOpen ? 'rgba(201,168,76,0.06)' : undefined,
//                           transition: 'background .2s',
//                         }}
//                       >
//                         <div className="flex items-start gap-3">
//                           <svg
//                             className="shrink-0 mt-0.5"
//                             width="20"
//                             height="20"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="#C9A84C"
//                             strokeWidth="1.5"
//                           >
//                             <circle cx="12" cy="8" r="6" />
//                             <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
//                           </svg>
//                           <p className="font-body font-semibold text-sm text-white">{award.title}</p>
//                         </div>

//                         <div className="flex items-center gap-3 shrink-0">
//                           {count > 1 && (
//                             <span
//                               className="font-body text-xs font-bold px-3 py-1"
//                               style={{
//                                 background: 'rgba(201,168,76,0.15)',
//                                 color: '#C9A84C',
//                                 border: '1px solid rgba(201,168,76,0.3)',
//                               }}
//                             >
//                               x{count}
//                             </span>
//                           )}
//                           {/* Chevron */}
//                           <svg
//                             width="14"
//                             height="14"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="rgba(201,168,76,0.7)"
//                             strokeWidth="2"
//                             style={{
//                               transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
//                               transition: 'transform .25s',
//                             }}
//                           >
//                             <polyline points="6 9 12 15 18 9" />
//                           </svg>
//                         </div>
//                       </button>

//                       {/* Expanded PDF options */}
//                       {isOpen && (
//                         <div
//                           style={{
//                             background: 'rgba(201,168,76,0.03)',
//                             border: '1px solid rgba(201,168,76,0.12)',
//                             borderTop: 'none',
//                             padding: '8px 12px 10px',
//                           }}
//                         >
//                           {award.items.map(item => (
//                             <button
//                               type="button"
//                               key={item.name}
//                               onClick={() => openPdf(award, item)}
//                               style={{
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 gap: 10,
//                                 width: '100%',
//                                 background: 'transparent',
//                                 border: 'none',
//                                 cursor: 'pointer',
//                                 padding: '9px 8px',
//                                 borderBottom: '1px solid rgba(255,255,255,0.05)',
//                                 textAlign: 'left',
//                               }}
//                               onMouseEnter={e => {
//                                 e.currentTarget.style.background = 'rgba(201,168,76,0.07)';
//                               }}
//                               onMouseLeave={e => {
//                                 e.currentTarget.style.background = 'transparent';
//                               }}
//                             >
//                               {/* PDF icon */}
//                               <svg
//                                 width="14"
//                                 height="14"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 stroke="#C9A84C"
//                                 strokeWidth="1.8"
//                                 style={{ shrink: 0 }}
//                               >
//                                 <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
//                                 <polyline points="14 2 14 8 20 8" />
//                               </svg>
//                               <span
//                                 style={{
//                                   fontFamily: 'sans-serif',
//                                   fontSize: 12,
//                                   color: 'rgba(255,255,255,0.75)',
//                                   letterSpacing: '.03em',
//                                 }}
//                               >
//                                 {item.name}
//                               </span>
//                               {/* Open arrow */}
//                               <svg
//                                 width="11"
//                                 height="11"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 stroke="rgba(201,168,76,0.5)"
//                                 strokeWidth="2"
//                                 style={{ marginLeft: 'auto' }}
//                               >
//                                 <polyline points="9 18 15 12 9 6" />
//                               </svg>
//                             </button>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* PDF Viewer overlay */}
//       {activePdf && (
//         <PdfReader study={activePdf} onClose={() => setActivePdf(null)} />
//       )}
//     </>
//   );
// }


import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import * as pdfjsLib from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { certificationsData } from '../data/certificationsData';
import { awardsData }         from '../data/awardsData';
import { getIcon, FOLDER_COLORS } from './Icons';
import PdfReader from './PdfReader';

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

/* ─────────────────────────────────────────────
   Build unified folder list from data files
───────────────────────────────────────────── */
function buildFolders() {
  const certs = certificationsData.map(c => ({
    id: c.id, label: c.name, category: 'cert',
    items: c.pdfUrl || c.imageUrl
      ? [{ name: c.name, pdfUrl: c.pdfUrl, imageUrl: c.imageUrl }]
      : [],
  }));
  const awards = awardsData.map(a => ({
    id: a.id, label: a.title, category: 'award',
    items: a.items || [],
  }));
  return [...certs, ...awards];
}
const FOLDERS = buildFolders();

/* ─────────────────────────────────────────────
   LAPTOP SVG SHELL
───────────────────────────────────────────── */
function LaptopShell({ children }) {
  const screenRef = useRef(null);
  const rootRef   = useRef(null);
  const [ov, setOv] = useState({});

  const sync = useCallback(() => {
    const el = screenRef.current, root = rootRef.current;
    if (!el || !root) return;
    const sr = el.getBoundingClientRect();
    const rr = root.getBoundingClientRect();
    setOv({ left: sr.left - rr.left, top: sr.top - rr.top, width: sr.width, height: sr.height });
  }, []);

  useEffect(() => {
    sync();
    const ro = new ResizeObserver(sync);
    if (screenRef.current) ro.observe(screenRef.current);
    window.addEventListener('resize', sync);
    return () => { ro.disconnect(); window.removeEventListener('resize', sync); };
  }, [sync]);

  return (
    <div ref={rootRef} style={{ position: 'relative', width: '100%', maxWidth: 920, margin: '0 auto' }}>
      <svg viewBox="0 0 920 582" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%' }}>
        <defs>
          <linearGradient id="lsS" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1a2e"/><stop offset="100%" stopColor="#0d0d1a"/>
          </linearGradient>
          <linearGradient id="lsB" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#242436"/><stop offset="100%" stopColor="#18182a"/>
          </linearGradient>
          <linearGradient id="lsBase" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#222232"/><stop offset="100%" stopColor="#18182a"/>
          </linearGradient>
          <linearGradient id="lsR" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.05"/>
            <stop offset="55%" stopColor="#fff" stopOpacity="0"/>
          </linearGradient>
          <filter id="lsShad">
            <feDropShadow dx="0" dy="10" stdDeviation="16" floodColor="#000" floodOpacity="0.65"/>
          </filter>
        </defs>
        {/* Bezel */}
        <rect x="30" y="8" width="860" height="516" rx="14" fill="url(#lsB)" filter="url(#lsShad)"/>
        {/* Screen */}
        <rect ref={screenRef} x="52" y="26" width="816" height="480" rx="6" fill="url(#lsS)"/>
        {/* Reflection */}
        <rect x="52" y="26" width="816" height="480" rx="6" fill="url(#lsR)" style={{ pointerEvents: 'none' }}/>
        {/* Gold border */}
        <rect x="52" y="26" width="816" height="480" rx="6" fill="none" stroke="rgba(201,168,76,0.14)" strokeWidth="1"/>
        {/* Webcam */}
        <circle cx="460" cy="17.5" r="3.5" fill="#1e1e30"/>
        <circle cx="460" cy="17.5" r="1.8" fill="#0a0a18"/>
        <circle cx="460" cy="17.5" r="0.7" fill="#2a9" opacity="0.85"/>
        {/* Hinge */}
        <rect x="20" y="522" width="880" height="10" rx="3" fill="#111120"/>
        {/* Base */}
        <rect x="0" y="530" width="920" height="50" rx="9" fill="url(#lsBase)" filter="url(#lsShad)"/>
        {/* Keyboard */}
        <rect x="70" y="540" width="680" height="30" rx="5"
          fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
        {[0, 1, 2].map(row =>
          Array.from({ length: 14 - row }).map((_, i) => (
            <rect key={`k${row}-${i}`}
              x={78 + i * (row === 0 ? 47 : row === 1 ? 49 : 52) + row * 3}
              y={543 + row * 8}
              width={row === 0 ? 41 : row === 1 ? 43 : 46}
              height="5" rx="1.5"
              fill="rgba(255,255,255,0.05)"
            />
          ))
        )}
        {/* Trackpad */}
        <rect x="380" y="542" width="162" height="32" rx="7"
          fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
        {/* Ports */}
        <rect x="0" y="543" width="14" height="5" rx="2" fill="rgba(255,255,255,0.06)"/>
        <rect x="0" y="551" width="14" height="5" rx="2" fill="rgba(255,255,255,0.06)"/>
        <rect x="906" y="543" width="14" height="5" rx="2" fill="rgba(255,255,255,0.06)"/>
        <rect x="906" y="551" width="14" height="5" rx="2" fill="rgba(255,255,255,0.06)"/>
      </svg>
      {/* HTML overlay */}
      <div style={{ position: 'absolute', ...ov, overflow: 'hidden', borderRadius: 6 }}>
        {children}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   OS SHELL
───────────────────────────────────────────── */
function DesktopOS({ children, time, openPanel }) {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative',
      background: 'radial-gradient(ellipse at 28% 38%, #1c1540 0%, #0e0e1e 55%, #060610 100%)',
      fontFamily: "'SF Mono','JetBrains Mono',monospace",
      overflow: 'hidden',
    }}>
      {/* Grid lines */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage:
          'linear-gradient(rgba(201,168,76,0.03) 1px,transparent 1px),' +
          'linear-gradient(90deg,rgba(201,168,76,0.03) 1px,transparent 1px)',
        backgroundSize: '46px 46px',
      }}/>
      {/* Menubar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 24,
        background: 'rgba(8,8,18,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(201,168,76,0.1)',
        display: 'flex', alignItems: 'center', padding: '0 14px', gap: 16, zIndex: 100,
      }}>
        <span style={{ color: '#C9A84C', fontSize: 9, fontWeight: 700, letterSpacing: '0.12em' }}>◆ PORTFOLIO OS</span>
        <span style={{ color: 'rgba(255,255,255,0.22)', fontSize: 8.5 }}>Certifications</span>
        <span style={{ color: 'rgba(255,255,255,0.22)', fontSize: 8.5 }}>Awards</span>
        <div style={{ flex: 1 }}/>
        {openPanel && (
          <span style={{ color: '#C9A84C', fontSize: 8, opacity: 0.75, letterSpacing: '0.1em' }}>
            {openPanel.toUpperCase()}
          </span>
        )}
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 8.5 }}>{time}</span>
      </div>
      {/* Content */}
      <div style={{ position: 'absolute', top: 24, left: 0, right: 0, bottom: 26, overflow: 'hidden' }}>
        {children}
      </div>
      {/* Dock */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 26,
        background: 'rgba(8,8,18,0.92)', backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(201,168,76,0.08)',
        display: 'flex', alignItems: 'center', padding: '0 14px', gap: 6, zIndex: 100,
      }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#C9A84C', boxShadow: '0 0 5px #C9A84C' }}/>
        <span style={{ color: 'rgba(255,255,255,0.22)', fontSize: 7.5, letterSpacing: '0.12em' }}>
          CLICK ANY ICON · PREVIEW CERTIFICATE · OPEN DOCUMENT
        </span>
        <div style={{ flex: 1 }}/>
        <span style={{ color: 'rgba(255,255,255,0.18)', fontSize: 7.5 }}>11 ITEMS</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ICON TILE  — fills entire row width evenly
───────────────────────────────────────────── */
function IconTile({ folder, onClick, isActive }) {
  const [hov, setHov] = useState(false);
  const color  = FOLDER_COLORS[folder.id] || '#C9A84C';
  const active = isActive || hov;
  const rgb    = hexToRgb(color);
  const isCert = folder.category === 'cert';
  const iconScale = isCert ? '44%' : '52%';
  const iconSize = isCert ? 52 : 58;
  const tileWidth = isCert ? 148 : null;

  return (
    <button
      onClick={() => onClick(folder)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        flex: isCert ? `0 0 ${tileWidth}px` : '1 1 0',
        width: isCert ? tileWidth : 'auto',
        minWidth: isCert ? tileWidth : 0,
        transition: 'transform 0.18s ease',
        transform: hov ? `translateY(-5px) scale(${isCert ? 1.04 : 1.07})` : 'none',
      }}
    >
      {/* Square icon box — fills full flex width */}
      <div style={{
        width: '100%', aspectRatio: '1',
        borderRadius: isCert ? 16 : 18,
        background: active ? `rgba(${rgb},0.18)` : 'rgba(255,255,255,0.04)',
        border: `1.5px solid ${active ? color + '88' : 'rgba(255,255,255,0.08)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: active
          ? `0 0 24px ${color}55, 0 8px 22px rgba(0,0,0,0.5)`
          : '0 3px 14px rgba(0,0,0,0.4)',
        transition: 'all 0.18s ease',
        position: 'relative', overflow: 'hidden',
      }}>
        {active && (
          <div style={{
            position: 'absolute', inset: 0, borderRadius: isCert ? 16 : 18,
            background: `radial-gradient(ellipse at 50% 0%, ${color}28 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}/>
        )}
        {/* Icon at 52% of box size */}
        <div style={{
          width: iconScale, height: iconScale,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {getIconScaled(folder.id, iconSize)}
        </div>
        {/* Count badge */}
        {folder.items.length > 1 && (
          <div style={{
            position: 'absolute', bottom: 6, right: 6,
            minWidth: 17, height: 17, borderRadius: 9,
            background: color, fontSize: 8, fontWeight: 700, color: '#000',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'monospace', padding: '0 4px',
          }}>
            {folder.items.length}
          </div>
        )}
        {folder.items.length === 0 && (
          <div style={{
            position: 'absolute', bottom: 6, right: 6,
            width: 7, height: 7, borderRadius: '50%',
            background: 'rgba(255,255,255,0.18)',
          }}/>
        )}
      </div>
      {/* Label */}
      <span style={{
        fontSize: 9.5, color: active ? '#fff' : 'rgba(255,255,255,0.6)',
        textAlign: 'center', lineHeight: 1.25,
        width: '100%', letterSpacing: '0.01em',
        fontFamily: "'SF Mono',monospace",
        transition: 'color 0.15s',
        textShadow: active ? '0 0 10px rgba(255,255,255,0.3)' : 'none',
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      }}>
        {folder.label}
      </span>
    </button>
  );
}

/* ─────────────────────────────────────────────
   PDF THUMBNAIL CANVAS
───────────────────────────────────────────── */
// function PdfThumb({ pdfUrl, thumbW = 200, thumbH = 130 }) {
//   const ref = useRef(null);
//   const [state, setState] = useState('loading'); // loading | done | err

//   useEffect(() => {
//     if (!pdfUrl || !ref.current) return;
//     let cancelled = false; let task = null;
//     setState('loading');

//     (async () => {
//       try {
//         const doc  = await pdfjsLib.getDocument(pdfUrl).promise;
//         if (cancelled) { doc.destroy(); return; }
//         const page = await doc.getPage(1);
//         if (cancelled) return;
//         const base  = page.getViewport({ scale: 1 });
//         const dpr   = window.devicePixelRatio || 1;
//         const scale = Math.min(thumbW / base.width, thumbH / base.height) * dpr;
//         const vp    = page.getViewport({ scale });
//         const c     = ref.current;
//         if (!c) return;
//         c.width  = vp.width;
//         c.height = vp.height;
//         c.style.width  = `${vp.width / dpr}px`;
//         c.style.height = `${vp.height / dpr}px`;
//         task = page.render({ canvasContext: c.getContext('2d'), viewport: vp });
//         await task.promise;
//         setState('done');
//         doc.destroy();
//       } catch (e) {
//         if (!cancelled && e?.name !== 'RenderingCancelledException') setState('err');
//       }
//     })();

//     return () => { cancelled = true; task?.cancel(); };
//   }, [pdfUrl, thumbW, thumbH]);

//   return (
//     <div style={{
//       width: '100%', height: thumbH,
//       borderRadius: 7, overflow: 'hidden',
//       background: '#fff',
//       display: 'flex', alignItems: 'center', justifyContent: 'center',
//       position: 'relative', flexShrink: 0,
//     }}>
//       {state === 'loading' && (
//         <div style={{
//           width: 18, height: 18,
//           border: '2px solid rgba(201,168,76,0.15)',
//           borderTop: '2px solid #C9A84C', borderRadius: '50%',
//           animation: 'thumbSpin 0.8s linear infinite',
//         }}/>
//       )}
//       {state === 'err' && (
//         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
//           <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="1.3">
//             <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//             <polyline points="14 2 14 8 20 8"/>
//           </svg>
//           <span style={{ fontSize: 8, color: 'rgba(0,0,0,0.3)' }}>PDF</span>
//         </div>
//       )}
//       <canvas
//         ref={ref}
//         style={{
//           display: state === 'done' ? 'block' : 'none',
//           position: 'absolute', inset: 0, width: '100%', height: '100%',
//           objectFit: 'contain',
//         }}
//       />
//     </div>
//   );
// }

/* ─────────────────────────────────────────────
   PDF THUMBNAIL CANVAS  — fixed version
   
   Changes made:
   1. Added `rotation: page.rotate` to both getViewport calls
      → fixes rotated/vertical PDFs showing correctly
   2. Canvas wrapper uses flex centering instead of position:absolute
      → fixes thumbnail appearing only on left side
   3. Removed objectFit (doesn't work on canvas) — canvas is now
      sized correctly by pdfjs itself and centered via flex
───────────────────────────────────────────── */
function PdfThumb({ pdfUrl, thumbW = 200, thumbH = 130 }) {
  const ref = useRef(null);
  const [state, setState] = useState('loading'); // loading | done | err

  useEffect(() => {
    if (!pdfUrl || !ref.current) return;
    let cancelled = false;

    setState('loading');

    (async () => {
      try {
        const doc  = await pdfjsLib.getDocument(pdfUrl).promise;
        if (cancelled) { doc.destroy(); return; }

        const page = await doc.getPage(1);
        if (cancelled) return;

        // ✅ FIX 1: pass page.rotate so portrait-saved PDFs render correctly
        const base  = page.getViewport({ scale: 1, rotation: page.rotate });
        const dpr   = window.devicePixelRatio || 1;
        const scale = Math.min(thumbW / base.width, thumbH / base.height) * dpr;

        // ✅ FIX 1 (cont): rotation on final viewport too
        const vp = page.getViewport({ scale, rotation: page.rotate });

        const c = ref.current;
        if (!c) return;

        c.width  = vp.width;
        c.height = vp.height;

        // Let CSS display size be driven by the logical (non-dpr) dimensions
        c.style.width  = `${vp.width  / dpr}px`;
        c.style.height = `${vp.height / dpr}px`;
        // ✅ FIX 2: clamp so it never overflows the card
        c.style.maxWidth  = '100%';
        c.style.maxHeight = `${thumbH}px`;

        const task = page.render({ canvasContext: c.getContext('2d'), viewport: vp });
        await task.promise;

        setState('done');
        doc.destroy();
      } catch (e) {
        if (!cancelled && e?.name !== 'RenderingCancelledException') setState('err');
      }
    })();

    return () => { cancelled = true; };
  }, [pdfUrl, thumbW, thumbH]);

  return (
    // ✅ FIX 3: flex centering replaces position:absolute trick
    <div style={{
      width: '100%',
      height: thumbH,
      borderRadius: 7,
      overflow: 'hidden',
      background: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}>
      {/* Loading spinner */}
      {state === 'loading' && (
        <div style={{
          width: 18, height: 18,
          border: '2px solid rgba(201,168,76,0.15)',
          borderTop: '2px solid #C9A84C',
          borderRadius: '50%',
          animation: 'thumbSpin 0.8s linear infinite',
        }}/>
      )}

      {/* Error fallback */}
      {state === 'err' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="1.3">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          <span style={{ fontSize: 8, color: 'rgba(0,0,0,0.3)' }}>PDF</span>
        </div>
      )}

      {/* Canvas — hidden until rendered, then shown centered */}
      <canvas
        ref={ref}
        style={{
          display: state === 'done' ? 'block' : 'none',
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   PDF CARD  (image-3 style)
───────────────────────────────────────────── */
function CertificateThumb({ imageUrl, pdfUrl, alt, thumbW = 200, thumbH = 130 }) {
  const [imageError, setImageError] = useState(false);
  const showImage = !!imageUrl && !imageError;

  if (showImage) {
    return (
      <div style={{
        width: '100%',
        height: thumbH,
        borderRadius: 7,
        overflow: 'hidden',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <img
          src={imageUrl}
          alt={alt}
          loading="lazy"
          onError={() => setImageError(true)}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </div>
    );
  }

  if (pdfUrl) {
    return <PdfThumb pdfUrl={pdfUrl} thumbW={thumbW} thumbH={thumbH} />;
  }

  return (
    <div style={{
      width: '100%',
      height: thumbH,
      borderRadius: 7,
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.06)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.3">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>
    </div>
  );
}

function PdfCard({ item, index, color, onSelect, totalItems }) {
  const [hov, setHov] = useState(false);
  const hasPdf = !!item.pdfUrl;
  const hasPreview = !!(item.imageUrl || item.pdfUrl);
  const rgb    = hexToRgb(color);
  // Use taller thumb when only 1 item in the list
  const thumbH = totalItems === 1 ? 180 : 130;

  return (
    <button
      onClick={() => hasPdf && onSelect(item)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      disabled={!hasPdf}
      style={{
        background: hov && hasPdf ? `rgba(${rgb},0.1)` : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hov && hasPdf ? color + '55' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 10, padding: '10px',
        display: 'flex', flexDirection: 'column', gap: 8,
        cursor: hasPdf ? 'pointer' : 'default',
        transition: 'all 0.18s ease',
        boxShadow: hov && hasPdf
          ? `0 8px 24px rgba(0,0,0,0.5), 0 0 18px ${color}22`
          : '0 2px 8px rgba(0,0,0,0.3)',
        transform: hov && hasPdf ? 'translateY(-3px)' : 'none',
        textAlign: 'left',
      }}
    >
      {/* Certificate preview image with PDF fallback */}
      <CertificateThumb
        imageUrl={hasPreview ? item.imageUrl : null}
        pdfUrl={hasPreview ? item.pdfUrl : null}
        alt={item.name}
        thumbH={thumbH}
      />

      {/* Name row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
        <span style={{
          fontSize: 7.5, color: 'rgba(255,255,255,0.2)',
          fontFamily: 'monospace', marginTop: 1, flexShrink: 0,
        }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span style={{
          fontSize: 10.5, fontWeight: 600, flex: 1,
          color: hasPdf ? (hov ? '#fff' : 'rgba(255,255,255,0.85)') : 'rgba(255,255,255,0.28)',
          lineHeight: 1.35, letterSpacing: '0.01em',
          fontFamily: "'SF Mono',monospace",
          transition: 'color 0.15s',
        }}>
          {item.name}
        </span>
      </div>

      {/* CTA */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 5,
        borderTop: `1px solid ${hasPdf ? color + '22' : 'rgba(255,255,255,0.04)'}`,
        paddingTop: 7,
      }}>
        {hasPdf ? (
          <>
            <div style={{
              width: 16, height: 16, borderRadius: 4,
              background: `rgba(${rgb},0.2)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <span style={{
              fontSize: 8, color: hov ? color : 'rgba(255,255,255,0.35)',
              letterSpacing: '0.1em', fontWeight: 700, flex: 1,
              transition: 'color 0.15s',
            }}>
              OPEN CERTIFICATE
            </span>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
              stroke={hov ? color : 'rgba(255,255,255,0.2)'} strokeWidth="2.5"
              style={{ flexShrink: 0, transition: 'stroke 0.15s' }}>
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </>
        ) : (
          <span style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.12em' }}>
            COMING SOON
          </span>
        )}
      </div>
    </button>
  );
}

/* ─────────────────────────────────────────────
   PDF LIST PANEL  — slide-over with card grid
───────────────────────────────────────────── */
function PdfListPanel({ folder, onSelectPdf, onClose }) {
  const [visible, setVisible] = useState(false);
  const color = FOLDER_COLORS[folder.id] || '#C9A84C';
  const rgb   = hexToRgb(color);

  useEffect(() => { requestAnimationFrame(() => setVisible(true)); }, []);

  function handleClose() {
    setVisible(false);
    setTimeout(onClose, 220);
  }

  const cols = folder.items.length === 1 ? '1fr' : 'repeat(2,1fr)';

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) handleClose(); }}
      style={{
        position: 'absolute', inset: 0, zIndex: 50,
        background: 'rgba(6,6,16,0.55)', backdropFilter: 'blur(5px)',
        display: 'flex', alignItems: 'stretch', justifyContent: 'flex-end',
        opacity: visible ? 1 : 0, transition: 'opacity 0.22s ease',
      }}
    >
      <div style={{
        width: '72%', height: '100%',
        background: 'linear-gradient(155deg, #13132a 0%, #0c0c1e 100%)',
        borderLeft: `1.5px solid ${color}44`,
        boxShadow: `-20px 0 60px rgba(0,0,0,0.7), 0 0 40px ${color}11`,
        display: 'flex', flexDirection: 'column',
        transform: visible ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.22s cubic-bezier(0.34,1.1,0.64,1)',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          padding: '9px 14px 8px',
          borderBottom: `1px solid ${color}22`,
          background: `rgba(${rgb},0.07)`,
          display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0,
        }}>
          <button onClick={handleClose} style={dotBtn('#ef4444')}/>
          <div style={dotBtn('#f59e0b')}/>
          <div style={dotBtn('#22c55e')}/>
          <div style={{ flex: 1, minWidth: 0, marginLeft: 4 }}>
            <div style={{ fontSize: 8.5, color, letterSpacing: '0.12em', fontWeight: 700 }}>
              {folder.category === 'cert' ? '◆ CERTIFICATION' : '★ AWARD'}
            </div>
            <div style={{
              fontSize: 12, color: '#fff', fontWeight: 700,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {folder.label}
            </div>
          </div>
          <div style={{
            width: 36, height: 36, borderRadius: 8, flexShrink: 0,
            background: `rgba(${rgb},0.12)`, border: `1px solid ${color}44`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {getIcon(folder.id, 20)}
          </div>
        </div>

        {/* Gold line */}
        <div style={{ height: 2, background: `linear-gradient(to right,${color},transparent)`, flexShrink: 0 }}/>

        {/* Card grid */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
          {folder.items.length === 0 ? (
            <div style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              height: '100%', gap: 10,
            }}>
              <span style={{ fontSize: 30, opacity: 0.18 }}>📄</span>
              <span style={{
                fontSize: 9, color: 'rgba(255,255,255,0.22)',
                letterSpacing: '0.12em', textAlign: 'center',
              }}>
                NO CERTIFICATES ATTACHED YET
              </span>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 10 }}>
              {folder.items.map((item, i) => (
                <PdfCard
                  key={item.name} item={item} index={i} color={color}
                  onSelect={onSelectPdf} totalItems={folder.items.length}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '6px 14px', borderTop: '1px solid rgba(255,255,255,0.05)',
          fontSize: 7.5, color: 'rgba(255,255,255,0.18)', letterSpacing: '0.1em', flexShrink: 0,
        }}>
          {folder.items.length} ITEM{folder.items.length !== 1 ? 'S' : ''} · CLICK CARD TO OPEN CERTIFICATE
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function Certifications() {
  const [activeFolder, setActiveFolder] = useState(null);
  const [activePdf,    setActivePdf]    = useState(null);
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);

  function openFolder(folder) {
    setActiveFolder(prev => prev?.id === folder.id ? null : folder);
  }

  function openPdf(item) {
    setActivePdf({ category: activeFolder?.label || '', title: item.name, pdfUrl: item.pdfUrl });
  }

  const certs  = FOLDERS.filter(f => f.category === 'cert');
  const awards = FOLDERS.filter(f => f.category === 'award');

  return (
    <>
      <section id="certifications" style={{ background: '#050505', padding: '60px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <p style={{
            fontSize: 10.5, letterSpacing: '0.22em', color: '#C9A84C',
            fontFamily: "'SF Mono',monospace", marginBottom: 8,
          }}>
            07 / RECOGNITION
          </p>
          <h2 style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: 'clamp(2.2rem,5vw,3.2rem)',
            letterSpacing: '0.06em', color: '#fff',
            marginBottom: 36, lineHeight: 1,
          }}>
            Certifications &amp; Awards
          </h2>

          <LaptopShell>
            <DesktopOS time={time} openPanel={activeFolder?.label}>
              <div style={{
                position: 'absolute', inset: 0,
                padding: '16px 20px 12px',
                overflowY: 'auto',
                display: 'flex', flexDirection: 'column',
              }}>
                {/* ── Certifications row ── */}
                <div style={catLabel}>◆ Certifications</div>
                <div style={{
                  display: 'flex',
                  gap: 14,
                  padding: '8px 0 18px',
                  flex: '0 0 auto',
                  flexWrap: 'wrap',
                  alignItems: 'flex-start',
                }}>
                  {certs.map(f => (
                    <IconTile key={f.id} folder={f} onClick={openFolder} isActive={activeFolder?.id === f.id}/>
                  ))}
                </div>

                <div style={{ height: 1, background: 'rgba(201,168,76,0.08)', marginBottom: 14 }}/>

                {/* ── Awards row ── */}
                <div style={catLabel}>★ Awards &amp; Honors</div>
                <div style={{ display: 'flex', gap: 10, padding: '8px 0 10px', flex: '0 0 auto' }}>
                  {awards.map(f => (
                    <IconTile key={f.id} folder={f} onClick={openFolder} isActive={activeFolder?.id === f.id}/>
                  ))}
                </div>
              </div>

              {/* Slide-over panel */}
              {activeFolder && (
                <PdfListPanel
                  folder={activeFolder}
                  onSelectPdf={openPdf}
                  onClose={() => setActiveFolder(null)}
                />
              )}
            </DesktopOS>
          </LaptopShell>

          <p style={{
            textAlign: 'center', marginTop: 14,
            fontSize: 9.5, color: 'rgba(255,255,255,0.15)',
            letterSpacing: '0.14em', fontFamily: "'SF Mono',monospace",
          }}>
            ↑ CLICK ANY ICON → PREVIEW CERTIFICATE → OPEN DOCUMENT
          </p>
        </div>
      </section>

      {/* Portal — escapes all stacking contexts */}
      {activePdf && createPortal(
        <PdfReader study={activePdf} onClose={() => setActivePdf(null)} />,
        document.body
      )}

      <style>{`@keyframes thumbSpin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}

/* ─────────── helpers ─────────── */
const catLabel = {
  fontSize: 9.5, color: '#C9A84C', letterSpacing: '0.14em',
  fontFamily: "'SF Mono',monospace", marginBottom: 0,
  paddingLeft: 2, fontWeight: 700,
};

const dotBtn = (color) => ({
  width: 9, height: 9, borderRadius: '50%',
  background: color, border: 'none', cursor: 'pointer',
  boxShadow: `0 0 5px ${color}88`, flexShrink: 0, padding: 0,
});

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}` : '201,168,76';
}

/* getIcon with large size — parent div clips/scales it */
function getIconScaled(id, size = 48) {
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {getIcon(id, size)}
    </div>
  );
}
