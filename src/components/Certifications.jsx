import { useState } from 'react';
import { useStaggerLeft, useStaggerRight } from '../hooks/useGsap';
import { awardsData } from '../data/awardsData';
import { certificationsData } from '../data/certificationsData';
import PdfReader from './PdfReader';

export default function Certifications() {
  const leftRef  = useStaggerLeft('.stagger');
  const rightRef = useStaggerRight('.stagger-r');

  const [expandedId, setExpandedId] = useState(null);
  const [activePdf, setActivePdf]   = useState(null);

  function toggleAward(id) {
    setExpandedId(prev => (prev === id ? null : id));
  }

  function openPdf(award, item) {
    setActivePdf({ category: award.title, title: item.name, pdfUrl: item.pdfUrl });
  }

  return (
    <>
      <section id="certifications" className="py-28 px-6 md:px-14" style={{ background: '#050505' }}>
        <div className="max-w-7xl mx-auto">
          <p className="section-label">07 / Recognition</p>
          <h2 className="section-title text-white mb-14">Certifications &amp; Awards</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Certifications */}
            <div ref={leftRef}>
              <h3
                className="font-title mb-6 text-gold"
                style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.8rem', letterSpacing: '.08em' }}
              >
                Certifications
              </h3>
              <div className="flex flex-col gap-3">
                {certificationsData.map(cert => (
                  <button
                    type="button"
                    key={cert.id}
                    onClick={() => cert.pdfUrl && setActivePdf({ category: 'Certification', title: cert.name, pdfUrl: cert.pdfUrl })}
                    className="stagger card flex items-center gap-4 p-4"
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      cursor: cert.pdfUrl ? 'pointer' : 'default',
                      background: 'transparent',
                      border: 'none',
                    }}
                    onMouseEnter={e => { if (cert.pdfUrl) e.currentTarget.style.background = 'rgba(201,168,76,0.05)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <div
                      className="shrink-0 rounded-full"
                      style={{ width: '8px', height: '8px', background: '#C9A84C' }}
                    />
                    <span className="font-body font-medium text-sm text-white flex-1">{cert.name}</span>
                    {cert.pdfUrl && (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.6)" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Awards & Honors */}
            <div ref={rightRef}>
              <h3
                className="font-title mb-6 text-gold"
                style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.8rem', letterSpacing: '.08em' }}
              >
                Awards &amp; Honors
              </h3>
              <div className="flex flex-col gap-4">
                {awardsData.map(award => {
                  const isOpen = expandedId === award.id;
                  const count  = award.items.length;

                  return (
                    <div key={award.id}>
                      {/* Award card — clickable */}
                      <button
                        type="button"
                        onClick={() => toggleAward(award.id)}
                        className="stagger-r card w-full text-left p-5 flex items-center justify-between"
                        style={{
                          borderLeft: '3px solid #C9A84C',
                          cursor: 'pointer',
                          background: isOpen ? 'rgba(201,168,76,0.06)' : undefined,
                          transition: 'background .2s',
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <svg
                            className="shrink-0 mt-0.5"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#C9A84C"
                            strokeWidth="1.5"
                          >
                            <circle cx="12" cy="8" r="6" />
                            <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                          </svg>
                          <p className="font-body font-semibold text-sm text-white">{award.title}</p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          {count > 1 && (
                            <span
                              className="font-body text-xs font-bold px-3 py-1"
                              style={{
                                background: 'rgba(201,168,76,0.15)',
                                color: '#C9A84C',
                                border: '1px solid rgba(201,168,76,0.3)',
                              }}
                            >
                              x{count}
                            </span>
                          )}
                          {/* Chevron */}
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="rgba(201,168,76,0.7)"
                            strokeWidth="2"
                            style={{
                              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: 'transform .25s',
                            }}
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </div>
                      </button>

                      {/* Expanded PDF options */}
                      {isOpen && (
                        <div
                          style={{
                            background: 'rgba(201,168,76,0.03)',
                            border: '1px solid rgba(201,168,76,0.12)',
                            borderTop: 'none',
                            padding: '8px 12px 10px',
                          }}
                        >
                          {award.items.map(item => (
                            <button
                              type="button"
                              key={item.name}
                              onClick={() => openPdf(award, item)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                width: '100%',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '9px 8px',
                                borderBottom: '1px solid rgba(255,255,255,0.05)',
                                textAlign: 'left',
                              }}
                              onMouseEnter={e => {
                                e.currentTarget.style.background = 'rgba(201,168,76,0.07)';
                              }}
                              onMouseLeave={e => {
                                e.currentTarget.style.background = 'transparent';
                              }}
                            >
                              {/* PDF icon */}
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#C9A84C"
                                strokeWidth="1.8"
                                style={{ shrink: 0 }}
                              >
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                              </svg>
                              <span
                                style={{
                                  fontFamily: 'sans-serif',
                                  fontSize: 12,
                                  color: 'rgba(255,255,255,0.75)',
                                  letterSpacing: '.03em',
                                }}
                              >
                                {item.name}
                              </span>
                              {/* Open arrow */}
                              <svg
                                width="11"
                                height="11"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="rgba(201,168,76,0.5)"
                                strokeWidth="2"
                                style={{ marginLeft: 'auto' }}
                              >
                                <polyline points="9 18 15 12 9 6" />
                              </svg>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PDF Viewer overlay */}
      {activePdf && (
        <PdfReader study={activePdf} onClose={() => setActivePdf(null)} />
      )}
    </>
  );
}
