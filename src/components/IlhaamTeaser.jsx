import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin, Award } from 'lucide-react';
import { useReveal, useStaggerReveal } from '../hooks/useReveal';
import { useIsMobile } from '../hooks/useIsMobile';

const events = [
  {
    num: '01',
    title: 'Nukkad Natak',
    subtitle: 'Street Theatre Competition',
    time: '9:30 AM',
    prize: '₹10,000',
    reg: '₹1,300 / team',
    team: '8–20 Members',
    image: '/images/nukkad.jpg',
    desc: 'Carrier of change — street theatre addressing the social pulse of our generation.',
  },
  {
    num: '02',
    title: 'Monoact',
    subtitle: 'Solo Acting Competition',
    time: '2:00 PM',
    prize: '₹1,500',
    reg: '₹100 / person',
    team: 'Individual',
    image: '/images/monoact.jpg',
    desc: 'One performer. One stage. The rawest form of theatrical expression.',
  },
  {
    num: '03',
    title: 'Stage Play — ACID',
    subtitle: 'Exclusive by OSMIUM',
    time: 'Evening',
    prize: 'Free Entry',
    reg: 'Open to All',
    team: 'OSMIUM Ensemble',
    image: '/images/stage-play.jpg',
    desc: 'OSMIUM\'s flagship production — a powerful evening of storytelling and purpose.',
  },
  {
    num: '04',
    title: 'Theatre Talks',
    subtitle: 'Workshops & Discussions',
    time: 'All Day',
    prize: 'Free Entry',
    reg: 'Open to All',
    team: 'All Artists Welcome',
    image: '/images/hero-stage.jpg',
    desc: 'Learn, interact, and explore the craft with hands-on training and open dialogue.',
  },
];

const INTERVAL = 4500;

export default function IlhaamTeaser() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef(null);
  const progressRef = useRef(null);
  const isMobile = useIsMobile();
  const [headerRef, headerVisible] = useReveal(0.15);
  const [infoRef, infoVisible] = useReveal(0.15);
  const [listRef, listTriggered, listDelays] = useStaggerReveal(events.length, 100, 120);

  const goTo = useCallback((i) => {
    setTransitioning(true);
    clearInterval(timerRef.current);
    clearInterval(progressRef.current);
    setTimeout(() => {
      setActive(i);
      setProgress(0);
      setTransitioning(false);
    }, 250);
  }, []);

  const startTimer = useCallback((current) => {
    clearInterval(progressRef.current);
    let p = 0;
    progressRef.current = setInterval(() => {
      p += (100 / (INTERVAL / 50));
      setProgress(p);
      if (p >= 100) {
        clearInterval(progressRef.current);
        goTo((current + 1) % events.length);
      }
    }, 50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goTo]);

  useEffect(() => {
    startTimer(0);
    const timerInterval = timerRef.current;
    const progressInterval = progressRef.current;
    return () => {
      clearInterval(timerInterval);
      clearInterval(progressInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ev = events[active];

  return (
    <section style={{
      background: '#080808',
      borderTop: '3px solid #CC0000',
      position: 'relative', overflow: 'hidden',
    }}>

      {/* Background photo with overlay */}
      <div style={{
        position: 'absolute', inset: 0, overflow: 'hidden',
        transition: 'opacity 0.5s',
        opacity: transitioning ? 0 : 1,
      }}>
        <img
          src={ev.image}
          alt=""
          onError={e => e.target.style.opacity = 0}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', opacity: 0.08,
            filter: 'grayscale(100%)',
          }}
        />
      </div>

      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: isMobile ? '60px 24px' : '100px 48px',
        position: 'relative', zIndex: 2,
      }}>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: isMobile ? 'flex-start' : 'flex-end',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          marginBottom: '72px', flexWrap: 'wrap', gap: '24px',
        }}>
          <div
            ref={headerRef}
            style={{
              opacity: headerVisible ? 1 : 0,
              animation: headerVisible ? 'reveal-up 0.9s cubic-bezier(0.22,1,0.36,1) both' : 'none',
            }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '14px',
              marginBottom: '16px',
            }}>
              <div style={{ width: '32px', height: '1px', background: '#B8960C' }} />
              <span style={{
                color: '#B8960C', fontSize: '10px',
                letterSpacing: '0.5em', textTransform: 'uppercase',
                fontWeight: 600, fontFamily: 'Inter, sans-serif',
              }}>
                OSMIUM Presents
              </span>
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: 'clamp(64px, 12vw, 120px)',
              background: 'linear-gradient(135deg, #B8960C 0%, #E8C86A 45%, #B8960C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 0.9, letterSpacing: '-2px',
              marginBottom: '8px',
            }}>
              ILHAAM
            </h2>
            <div style={{
              color: '#3A3A3A', fontSize: '11px',
              letterSpacing: '0.6em', textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif',
            }}>
              2 0 2 6
            </div>
          </div>

          <div
            ref={infoRef}
            style={{
              display: 'flex', flexDirection: 'column', gap: '10px',
              alignItems: 'flex-end',
              opacity: infoVisible ? 1 : 0,
              animation: infoVisible ? 'reveal-right 0.8s cubic-bezier(0.22,1,0.36,1) 0.15s both' : 'none',
            }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              color: '#6B6B6B', fontSize: '11px',
              fontFamily: 'Inter, sans-serif',
            }}>
              <Calendar size={13} color="#CC0000" />
              30 March 2026
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              color: '#6B6B6B', fontSize: '11px',
              fontFamily: 'Inter, sans-serif',
            }}>
              <MapPin size={13} color="#CC0000" />
              UIET, Panjab University
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              color: '#6B6B6B', fontSize: '11px',
              fontFamily: 'Inter, sans-serif',
            }}>
              <Award size={13} color="#B8960C" />
              Prize Pool ₹11,500
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 380px',
          gap: '48px', alignItems: 'start',
        }}>

          {/* Main event display */}
          <div style={{
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? 'translateY(8px)' : 'translateY(0)',
            transition: 'all 0.25s ease',
          }}>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic', fontWeight: 900,
              fontSize: '100px', color: 'rgba(204,0,0,0.07)',
              lineHeight: 1, marginBottom: '-20px',
              userSelect: 'none',
            }}>
              {ev.num}
            </div>

            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: 'clamp(36px, 5vw, 60px)',
              color: '#F5F0E8', lineHeight: 1,
              marginBottom: '8px',
            }}>
              {ev.title}
            </h3>

            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              marginBottom: '28px',
            }}>
              <div style={{ width: '28px', height: '1px', background: '#CC0000' }} />
              <span style={{
                color: '#CC0000', fontSize: '10px',
                letterSpacing: '0.4em', textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif', fontWeight: 600,
              }}>
                {ev.subtitle}
              </span>
            </div>

            <p style={{
              color: '#9CA3AF', fontSize: '16px',
              lineHeight: '1.8', fontWeight: 300,
              fontFamily: 'Inter, sans-serif',
              maxWidth: '480px', marginBottom: '40px',
            }}>
              {ev.desc}
            </p>

            {/* Stats row */}
            <div style={{
              display: 'flex', gap: '0',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              marginBottom: '40px',
            }}>
              {[
                { label: 'Prize', value: ev.prize, gold: true },
                { label: 'Registration', value: ev.reg },
                { label: 'Team Size', value: ev.team },
                { label: 'Time', value: ev.time },
              ].map((s, i) => (
                <div key={s.label} style={{
                  flex: 1, padding: '20px 24px',
                  borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}>
                  <div style={{
                    color: '#3A3A3A', fontSize: '9px',
                    letterSpacing: '0.3em', textTransform: 'uppercase',
                    fontFamily: 'Inter, sans-serif', marginBottom: '6px',
                  }}>
                    {s.label}
                  </div>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700, fontSize: '16px',
                    color: s.gold ? '#B8960C' : '#F5F0E8',
                  }}>
                    {s.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div style={{
              height: '1px', background: 'rgba(255,255,255,0.08)',
              marginBottom: '32px', position: 'relative',
            }}>
              <div style={{
                position: 'absolute', left: 0, top: 0, height: '100%',
                background: '#CC0000',
                width: `${progress}%`,
                transition: 'width 0.05s linear',
              }} />
            </div>
          </div>

          {/* Event selector list */}
          <div ref={listRef} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {events.map((e, i) => (
              <button
                key={e.num}
                onClick={() => goTo(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '16px',
                  padding: '20px 0',
                  background: 'transparent', border: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.2s ease',
                  opacity: listTriggered ? (active === i ? 1 : 0.4) : 0,
                  animation: listTriggered
                    ? `reveal-right 0.6s cubic-bezier(0.22,1,0.36,1) ${listDelays[i]}ms both`
                    : 'none',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                onMouseLeave={e => {
                  if (active !== i) e.currentTarget.style.opacity = 0.4;
                }}
              >
                <span style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: 'italic', fontWeight: 400,
                  fontSize: '18px',
                  color: active === i ? '#CC0000' : '#3A3A3A',
                  minWidth: '28px',
                  transition: 'color 0.2s',
                }}>
                  {e.num}
                </span>
                <div>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700, fontSize: '15px',
                    color: active === i ? '#F5F0E8' : '#6B6B6B',
                    transition: 'color 0.2s',
                  }}>
                    {e.title}
                  </div>
                  <div style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '10px', color: '#3A3A3A',
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    marginTop: '3px',
                  }}>
                    {e.time} · {e.prize}
                  </div>
                </div>
                {active === i && (
                  <div style={{
                    marginLeft: 'auto',
                    width: '20px', height: '1px',
                    background: '#CC0000', flexShrink: 0,
                  }} />
                )}
              </button>
            ))}

            {/* CTA */}
            <div style={{ paddingTop: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link to="/ilhaam" style={{
                background: '#CC0000', color: '#F5F0E8',
                textDecoration: 'none', padding: '14px 28px',
                fontSize: '10px', fontWeight: 700,
                letterSpacing: '0.25em', textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif',
                borderRadius: '2px', display: 'flex',
                alignItems: 'center', justifyContent: 'center', gap: '10px',
                boxShadow: '0 0 28px rgba(204,0,0,0.3)',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 40px rgba(204,0,0,0.5)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 28px rgba(204,0,0,0.3)'}
              >
                Full Event Details <ArrowRight size={14} />
              </Link>
              <Link to="/register" style={{
                background: 'transparent',
                border: '1px solid rgba(245,240,232,0.15)',
                color: '#F5F0E8', textDecoration: 'none',
                padding: '14px 28px', fontSize: '10px', fontWeight: 700,
                letterSpacing: '0.25em', textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif',
                borderRadius: '2px', display: 'block', textAlign: 'center',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#CC0000';
                  e.currentTarget.style.color = '#CC0000';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(245,240,232,0.15)';
                  e.currentTarget.style.color = '#F5F0E8';
                }}
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
