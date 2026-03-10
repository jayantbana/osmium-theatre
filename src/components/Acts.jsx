import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useReveal, useStaggerReveal } from '../hooks/useReveal';

const acts = [
  {
    num: 'I',
    title: 'Stage Play',
    tagline: 'The Grand Narrative',
    description: 'Full-scale theatrical productions with elaborate sets, costumes, and multi-layered storytelling. Our stage plays bring iconic narratives to life, fusing powerful dialogue with precise ensemble direction.',
    detail: 'OSMIUM stage plays are the pinnacle of our creative expression. Each production undergoes weeks of rehearsal, script development, and design — resulting in a performance that moves audiences long after the curtain falls. Our latest production "ACID" premieres at ILHAAM 2026.',
    highlight: 'ILHAAM 2026 — "ACID"',
    meta: ['Full Ensemble', 'Original Scripts', 'Set & Costumes'],
    images: ['/images/stage-play.png'],
  },
  {
    num: 'II',
    title: 'Monoact',
    tagline: 'One Stage. One Soul.',
    description: 'A single performer commands the entire stage — no ensemble, just raw talent, emotion, and craft. The ultimate test of range and presence under the spotlight.',
    detail: 'Monoact is where the bravest performers shine. Armed with nothing but their body, voice, and imagination, a monoactor must hold an entire audience for up to 6 minutes. At ILHAAM 2026, the finest wins the title of Solo Acting God.',
    highlight: 'Prize ₹1,500 · Registration ₹100',
    meta: ['Solo Performance', '3–6 Minutes', 'Props Allowed'],
    images: ['/images/monoact.jpg'],
  },
  {
    num: 'III',
    title: 'Mime',
    tagline: 'Silence Speaks Volumes',
    description: 'The art of expression without words. OSMIUM mime artists weave stories through movement, gesture, and expression — proving the most powerful moments need no language.',
    detail: 'Mime is one of the oldest and purest theatrical forms. Our performers train rigorously in physical storytelling — every movement deliberate, every pause meaningful. A mime performance by OSMIUM leaves audiences in awe.',
    highlight: 'Physical Theatre · No Dialogue',
    meta: ['No Dialogue', 'Physical Theatre', 'Character Work'],
    images: ['/images/monoact.jpg', '/images/monoact2.png'],
  },
  {
    num: 'IV',
    title: 'Nukkad Natak',
    tagline: 'Theatre of the Streets',
    description: 'Street theatre rooted in social consciousness. Nukkad Natak uses performance to spark dialogue on pressing issues — performed without boundaries, reaching every corner.',
    detail: 'Nukkad Natak has been the carrier of change in India since the beginning. Teams of 8–20 members take to the open stage with live music, props, and conviction — addressing social issues that define our generation.',
    highlight: 'Prize ₹15,000 · Registration ₹1,300/team',
    meta: ['8–20 Members', 'Live Music Only', '15–25 Minutes'],
    images: ['/images/nukkad-natak.jpg'],
  },
  {
    num: 'V',
    title: 'Skits',
    tagline: 'Short. Sharp. Impactful.',
    description: 'Punchy, high-energy short performances that pack a punch in minutes. Skits blend humour, satire, and social commentary — perfect for teams leaving an unforgettable mark.',
    detail: 'Skits are theatre distilled to its most energetic form. A tight script, sharp ensemble, and brilliant comic timing — that\'s all it takes to steal the show. OSMIUM skits are known for their wit, timing, and cultural resonance.',
    highlight: 'Team Format · High Energy',
    meta: ['Team Format', 'High Energy', 'Humour & Satire'],
    images: ['/images/skit.jpg'],
  },
];

export default function Acts() {
  const [active, setActive] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [labelRef, labelVisible] = useReveal(0.2);
  const [titleRef, titleVisible] = useReveal(0.2);
  const [listRef, listTriggered, listDelays] = useStaggerReveal(acts.length, 0, 110);

  const switchAct = (i) => {
    if (i === active) return;
    setTransitioning(true);
    setTimeout(() => {
      setActive(i);
      setCurrentImageIndex(0);
      setTransitioning(false);
    }, 200);
  };

  const act = acts[active];

  return (
    <section id="acts" style={{
      background: '#0C0C0C',
      borderTop: '1px solid rgba(204,0,0,0.1)',
    }}>

      {/* Section label row */}
      <div
        ref={labelRef}
        style={{
          maxWidth: '1280px', margin: '0 auto',
          padding: '72px 48px 48px',
          display: 'flex', alignItems: 'center', gap: '20px',
          opacity: labelVisible ? 1 : 0,
          animation: labelVisible ? 'reveal-left 0.7s cubic-bezier(0.22,1,0.36,1) both' : 'none',
        }}>
        <div style={{ width: '32px', height: '1px', background: '#CC0000' }} />
        <span style={{
          color: '#B8960C', fontSize: '10px',
          letterSpacing: '0.5em', textTransform: 'uppercase',
          fontWeight: 600, fontFamily: 'Inter, sans-serif',
        }}>
          What We Perform
        </span>
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
        <span style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: 'italic', color: 'rgba(245,240,232,0.15)',
          fontSize: '11px', letterSpacing: '0.2em',
        }}>
          Five disciplines. One stage.
        </span>
      </div>

      {/* Main title */}
      <div
        ref={titleRef}
        style={{
          maxWidth: '1280px', margin: '0 auto', padding: '0 48px 64px',
          opacity: titleVisible ? 1 : 0,
          animation: titleVisible ? 'reveal-up 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s both' : 'none',
        }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 900, fontSize: 'clamp(48px, 7vw, 80px)',
          color: '#F5F0E8', lineHeight: 1, letterSpacing: '-1px',
        }}>
          Our <span style={{
            fontStyle: 'italic', color: '#CC0000',
          }}>Acts</span>
        </h2>
      </div>

      {/* Split panel */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '280px 1fr',
        minHeight: isMobile ? 'auto' : '600px',
        border: '1px solid rgba(255,255,255,0.05)',
        borderTop: 'none',
      }}>

        {/* LEFT — Act selector */}
        <div style={{
          borderRight: isMobile ? 'none' : '1px solid rgba(255,255,255,0.05)',
          borderBottom: isMobile ? '1px solid rgba(255,255,255,0.05)' : 'none',
          background: '#0E0E0E',
          display: 'flex',
          flexDirection: isMobile ? 'row' : 'column',
          overflowX: isMobile ? 'auto' : 'visible',
        }}>
          {acts.map((a, i) => (
            <button
              key={a.num}
              onClick={() => switchAct(i)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: isMobile ? '8px' : '20px',
                padding: isMobile ? '16px 20px' : '28px 32px',
                background: active === i ? 'rgba(204,0,0,0.08)' : 'transparent',
                border: 'none',
                borderBottom: isMobile ? 'none' : '1px solid rgba(255,255,255,0.04)',
                borderRight: isMobile ? '1px solid rgba(255,255,255,0.04)' : 'none',
                borderLeft: !isMobile && active === i ? '2px solid #CC0000' : '2px solid transparent',
                borderTop: isMobile && active === i ? '2px solid #CC0000' : isMobile ? '2px solid transparent' : 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.25s ease',
                flexShrink: 0,
                whiteSpace: isMobile ? 'nowrap' : 'normal',
              }}
            >
              <span style={{
                fontFamily: "'Cormorant', serif",
                fontWeight: 400, fontStyle: 'italic',
                fontSize: isMobile ? '16px' : '22px',
                color: active === i ? '#CC0000' : '#3A3A3A',
                transition: 'color 0.25s ease',
                minWidth: isMobile ? 'auto' : '28px',
              }}>
                {a.num}
              </span>
              <div>
                <div style={{
                  fontFamily: "'Cormorant', serif",
                  fontWeight: 700,
                  fontSize: isMobile ? '13px' : '16px',
                  color: active === i ? '#F5F0E8' : '#6B6B6B',
                  transition: 'color 0.25s ease',
                  marginBottom: '2px',
                }}>
                  {a.title}
                </div>
                {!isMobile && (
                  <div style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '10px',
                    color: active === i ? '#CC0000' : '#3A3A3A',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    transition: 'color 0.25s ease',
                  }}>
                    {a.tagline}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* RIGHT — Detail panel */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          opacity: transitioning ? 0 : 1,
          transition: 'opacity 0.2s ease',
        }}>

          {/* Text content */}
          <div style={{
            padding: isMobile ? '32px 24px' : '56px 52px',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between',
            background: '#0C0C0C',
          }}>
            <div>
              <div style={{
                fontFamily: "'Cormorant', serif",
                fontStyle: 'italic', fontWeight: 900,
                fontSize: isMobile ? '60px' : '120px',
                color: 'rgba(204,0,0,0.06)',
                lineHeight: 1, marginBottom: '-12px',
                userSelect: 'none', pointerEvents: 'none',
              }}>
                {act.num}
              </div>

              <h3 style={{
                fontFamily: "'Cormorant', serif",
                fontWeight: 900,
                fontSize: isMobile ? '36px' : 'clamp(36px, 4vw, 56px)',
                color: '#F5F0E8', lineHeight: 1,
                marginBottom: '6px',
              }}>
                {act.title}
              </h3>

              <div style={{
                display: 'flex', alignItems: 'center',
                gap: '12px', marginBottom: '20px',
              }}>
                <div style={{ width: '28px', height: '1px', background: '#CC0000' }} />
                <span style={{
                  color: '#CC0000', fontSize: '10px',
                  letterSpacing: '0.4em', textTransform: 'uppercase',
                  fontFamily: 'Inter, sans-serif', fontWeight: 600,
                }}>
                  {act.tagline}
                </span>
              </div>

              <p style={{
                color: '#D4CFC8', fontSize: '14px',
                lineHeight: '1.85', marginBottom: '16px',
                fontFamily: 'Inter, sans-serif', fontWeight: 300,
              }}>
                {act.description}
              </p>

              <p style={{
                color: '#5A5A5A', fontSize: '13px',
                lineHeight: '1.85', fontFamily: 'Inter, sans-serif',
                fontWeight: 300, fontStyle: 'italic',
              }}>
                {act.detail}
              </p>
            </div>

            {/* Bottom */}
            <div style={{ marginTop: '32px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                {act.meta.map(m => (
                  <span key={m} style={{
                    border: '1px solid rgba(184,150,12,0.3)',
                    color: '#B8960C', fontSize: '9px',
                    letterSpacing: '0.25em', textTransform: 'uppercase',
                    padding: '6px 14px', borderRadius: '1px',
                    fontFamily: 'Inter, sans-serif', fontWeight: 600,
                    background: 'rgba(184,150,12,0.04)',
                  }}>
                    {m}
                  </span>
                ))}
              </div>

              <div style={{
                borderTop: '1px solid rgba(255,255,255,0.06)',
                paddingTop: '20px',
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', gap: '16px',
                flexWrap: 'wrap',
              }}>
                <span style={{
                  color: '#B8960C', fontSize: '12px',
                  fontWeight: 600, fontFamily: 'Inter, sans-serif',
                }}>
                  {act.highlight}
                </span>
                <a href="/register" style={{
                  background: 'transparent', border: '1px solid #CC0000',
                  color: '#CC0000', textDecoration: 'none',
                  padding: '10px 24px', borderRadius: '2px',
                  fontSize: '10px', letterSpacing: '0.25em',
                  textTransform: 'uppercase', fontWeight: 700,
                  fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#CC0000'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#CC0000'; }}
                >
                  Register
                </a>
              </div>
            </div>
          </div>

          {/* Photo panel — blended into text on mobile */}
          {isMobile ? (
            /* Mobile: photo as background blend behind text — already shown above */
            null
          ) : (
            <div style={{
              position: 'relative', overflow: 'hidden',
              minHeight: '500px', background: '#141414',
            }}>
              <img
                src={act.images[currentImageIndex]}
                alt={act.title}
                onError={e => e.target.style.opacity = 0}
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover', opacity: 0.7,
                  transition: 'opacity 0.4s ease',
                }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(12,12,12,0.4) 0%, rgba(12,12,12,0.1) 100%)',
              }} />
              <div style={{
                position: 'absolute', bottom: '32px', left: '32px', right: '32px',
              }}>
                <div style={{
                  fontFamily: "'Cormorant', serif",
                  fontStyle: 'italic', fontWeight: 900,
                  fontSize: '42px', color: 'rgba(245,240,232,0.12)', lineHeight: 1,
                }}>
                  {act.title}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
