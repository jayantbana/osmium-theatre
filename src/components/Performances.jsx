import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useReveal, useStaggerReveal } from '../hooks/useReveal';
import { useIsMobile } from '../hooks/useIsMobile';

const upcoming = [
  {
    id: 'acid',
    year: '2026',
    date: '30 March',
    title: 'ACID',
    type: 'Stage Play',
    venue: 'UIET, Panjab University',
    desc: 'OSMIUM\'s exclusive flagship production at ILHAAM 2026. A powerful evening of storytelling, heartfelt emotions, and impactful expression. As the curtains rise, OSMIUM takes the audience on a captivating theatrical journey filled with creativity, passion, and purpose.',
    status: 'UPCOMING',
    images: ['/images/stage-play.png'],
  },
];

const past = [
  {
    id: 'past-1',
    year: '2025',
    date: 'Archive',
    title: 'Past Productions',
    type: 'Performance Archive',
    desc: 'Watch highlights, behind-the-scenes clips, and full performance reels from our previous productions on Instagram.',
    link: 'https://www.instagram.com/osmium_osm/',
    images: ['/images/hero-stage-2.jpg'],
  },
  {
    id: 'past-2',
    year: '2024',
    date: 'Archive',
    title: 'Earlier Works',
    type: 'Performance Archive',
    desc: 'Explore our formative productions and the performances that shaped OSMIUM\'s identity on stage.',
    link: 'https://www.instagram.com/osmium_osm/',
    images: ['/images/hero-stage.jpg'],
  },
];

export default function Performances() {
  const [hoveredPast, setHoveredPast] = useState(null);
  const isMobile = useIsMobile();
  const [labelRef, labelVisible] = useReveal(0.2);
  const [titleRef, titleVisible] = useReveal(0.2);
  const [upcomingRef, upcomingVisible] = useReveal(0.1);
  const [pastRef, pastTriggered, pastDelays] = useStaggerReveal(past.length, 0, 150);

  return (
    <section id="performances" style={{
      background: '#0E0E0E',
      borderTop: '1px solid rgba(255,255,255,0.04)',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: isMobile ? '60px 24px' : '100px 48px' }}>

        {/* Section label */}
        <div
          ref={labelRef}
          style={{
            display: 'flex', alignItems: 'center', gap: '20px',
            marginBottom: '72px',
            opacity: labelVisible ? 1 : 0,
            animation: labelVisible ? 'reveal-left 0.7s cubic-bezier(0.22,1,0.36,1) both' : 'none',
          }}>
          <div style={{ width: '32px', height: '1px', background: '#CC0000' }} />
          <span style={{
            color: '#B8960C', fontSize: '10px',
            letterSpacing: '0.5em', textTransform: 'uppercase',
            fontWeight: 600, fontFamily: 'Inter, sans-serif',
          }}>
            On Stage
          </span>
          <div style={{
            flex: 1, height: '1px',
            background: 'rgba(255,255,255,0.05)',
          }} />
        </div>

        <h2
          ref={titleRef}
          style={{
            fontFamily: "'Cormorant', serif",
            fontWeight: 900,
            fontSize: 'clamp(48px, 7vw, 80px)',
            color: '#F5F0E8', lineHeight: 1,
            letterSpacing: '-1px', marginBottom: '80px',
            opacity: titleVisible ? 1 : 0,
            animation: titleVisible ? 'reveal-up 0.85s cubic-bezier(0.22,1,0.36,1) 0.1s both' : 'none',
          }}>
          Performances
        </h2>

        {/* ── UPCOMING ─────────────────────────────────────── */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            marginBottom: '32px',
          }}>
            <div style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: '#CC0000',
              boxShadow: '0 0 12px rgba(204,0,0,0.6)',
              animation: 'pulse 1.5s infinite',
            }} />
            <span style={{
              color: '#CC0000', fontSize: '10px',
              letterSpacing: '0.4em', textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif', fontWeight: 600,
            }}>
              Upcoming
            </span>
          </div>

          {upcoming.map(p => (
            <div
              key={p.id}
              ref={upcomingRef}
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                border: '1px solid rgba(204,0,0,0.2)',
                background: 'rgba(204,0,0,0.03)',
                overflow: 'hidden',
                opacity: upcomingVisible ? 1 : 0,
                animation: upcomingVisible ? 'reveal-scale 0.85s cubic-bezier(0.22,1,0.36,1) 0.05s both' : 'none',
              }}>
              {/* Left — text */}
              <div style={{ padding: isMobile ? '32px 24px' : '52px 52px' }}>
                {/* Badge */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  border: '1px solid #CC0000',
                  padding: '5px 14px', marginBottom: '28px',
                  background: 'rgba(204,0,0,0.08)',
                }}>
                  <div style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: '#CC0000', animation: 'pulse 1.5s infinite',
                  }} />
                  <span style={{
                    color: '#CC0000', fontSize: '9px',
                    letterSpacing: '0.35em', textTransform: 'uppercase',
                    fontFamily: 'Inter, sans-serif', fontWeight: 700,
                  }}>
                    {p.status}
                  </span>
                </div>

                {/* Date */}
                <div style={{
                  color: '#3A3A3A', fontSize: '11px',
                  letterSpacing: '0.3em', textTransform: 'uppercase',
                  fontFamily: 'Inter, sans-serif', marginBottom: '12px',
                }}>
                  {p.date} · {p.year}
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: "'Cormorant', serif",
                  fontWeight: 900,
                  fontSize: 'clamp(40px, 5vw, 64px)',
                  color: '#F5F0E8', lineHeight: 1,
                  marginBottom: '6px', letterSpacing: '-1px',
                }}>
                  {p.title}
                </h3>

                <div style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  marginBottom: '24px',
                }}>
                  <div style={{ width: '20px', height: '1px', background: '#CC0000' }} />
                  <span style={{
                    color: '#CC0000', fontSize: '10px',
                    letterSpacing: '0.4em', textTransform: 'uppercase',
                    fontFamily: 'Inter, sans-serif', fontWeight: 600,
                  }}>
                    {p.type}
                  </span>
                </div>

                <p style={{
                  color: '#6B6B6B', fontSize: '14px',
                  lineHeight: '1.85', fontFamily: 'Inter, sans-serif',
                  fontWeight: 300, marginBottom: '36px',
                  maxWidth: '400px',
                }}>
                  {p.desc}
                </p>

                <div style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  color: '#3A3A3A', fontSize: '11px',
                  fontFamily: 'Inter, sans-serif',
                }}>
                  <div style={{ width: '16px', height: '1px', background: '#3A3A3A' }} />
                  {p.venue}
                </div>
              </div>

              {/* Right — photo */}
              <div style={{
                position: 'relative', overflow: 'hidden',
                minHeight: '400px', background: '#141414',
              }}>
                <img
                  src={p.images[0]}
                  alt={p.title}
                  onError={e => e.target.style.opacity = 0}
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover', opacity: 0.6,
                    filter: 'grayscale(20%)',
                  }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(90deg, rgba(14,14,14,0.5) 0%, rgba(14,14,14,0.1) 100%)',
                }} />
                {/* Year watermark */}
                <div style={{
                  position: 'absolute', bottom: '24px', right: '28px',
                  fontFamily: "'Cormorant', serif",
                  fontStyle: 'italic', fontWeight: 900,
                  fontSize: '80px', color: 'rgba(245,240,232,0.06)',
                  lineHeight: 1, userSelect: 'none',
                }}>
                  {p.year}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── PAST ─────────────────────────────────────────── */}
        <div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            marginBottom: '32px',
          }}>
            <div style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: '#3A3A3A',
            }} />
            <span style={{
              color: '#6B6B6B', fontSize: '10px',
              letterSpacing: '0.4em', textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif', fontWeight: 600,
            }}>
              Past Performances
            </span>
          </div>

          <div ref={pastRef} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1px', background: 'rgba(255,255,255,0.04)' }}>
            {past.map((p, i) => (
              <a
                key={p.id}
                href={p.link}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setHoveredPast(i)}
                onMouseLeave={() => setHoveredPast(null)}
                style={{
                  display: 'block', textDecoration: 'none',
                  position: 'relative', overflow: 'hidden',
                  background: '#0E0E0E', padding: '48px 44px',
                  transition: 'background 0.3s ease',
                  cursor: 'pointer',
                  backgroundColor: hoveredPast === i ? '#111111' : '#0E0E0E',
                  opacity: pastTriggered ? 1 : 0,
                  animation: pastTriggered
                    ? `reveal-up 0.7s cubic-bezier(0.22,1,0.36,1) ${pastDelays[i]}ms both`
                    : 'none',
                }}
              >
                {/* Background image on hover */}
                <div style={{
                  position: 'absolute', inset: 0, overflow: 'hidden',
                  opacity: hoveredPast === i ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                }}>
                  <img
                    src={p.images[0]}
                    alt=""
                    onError={e => e.target.style.opacity = 0}
                    style={{
                      width: '100%', height: '100%',
                      objectFit: 'cover', opacity: 0.08,
                      filter: 'grayscale(100%)',
                    }}
                  />
                </div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* Year + arrow */}
                  <div style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', marginBottom: '28px',
                  }}>
                    <span style={{
                      fontFamily: "'Cormorant', serif",
                      fontStyle: 'italic', fontWeight: 400,
                      fontSize: '15px', color: '#3A3A3A',
                    }}>
                      {p.year}
                    </span>
                    <ArrowUpRight
                      size={16}
                      color={hoveredPast === i ? '#CC0000' : '#3A3A3A'}
                      style={{ transition: 'color 0.2s' }}
                    />
                  </div>

                  <h4 style={{
                    fontFamily: "'Cormorant', serif",
                    fontWeight: 700, fontSize: '28px',
                    color: hoveredPast === i ? '#F5F0E8' : '#6B6B6B',
                    marginBottom: '8px', transition: 'color 0.3s',
                  }}>
                    {p.title}
                  </h4>

                  <div style={{
                    color: '#3A3A3A', fontSize: '10px',
                    letterSpacing: '0.3em', textTransform: 'uppercase',
                    fontFamily: 'Inter, sans-serif', marginBottom: '20px',
                  }}>
                    {p.type}
                  </div>

                  <p style={{
                    color: '#4B4B4B', fontSize: '13px',
                    lineHeight: '1.8', fontFamily: 'Inter, sans-serif',
                    fontWeight: 300,
                  }}>
                    {p.desc}
                  </p>

                  <div style={{
                    marginTop: '28px',
                    display: 'flex', alignItems: 'center', gap: '10px',
                    opacity: hoveredPast === i ? 1 : 0,
                    transition: 'opacity 0.3s',
                  }}>
                    <div style={{ width: '20px', height: '1px', background: '#CC0000' }} />
                    <span style={{
                      color: '#CC0000', fontSize: '10px',
                      letterSpacing: '0.3em', textTransform: 'uppercase',
                      fontFamily: 'Inter, sans-serif', fontWeight: 600,
                    }}>
                      View on Instagram
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
