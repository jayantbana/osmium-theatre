import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Award, ArrowRight, ArrowUpRight, Mail } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import { useIsMobile } from '../hooks/useIsMobile';

const events = [
  {
    num: '01',
    title: 'Nukkad Natak',
    tagline: 'Street Theatre Competition',
    time: '9:30 AM',
    date: '30 March 2026',
    prize: '₹15,000',
    reg: '₹1,300 / team',
    team: '8–20 Members',
    duration: '15–25 Minutes',
    image: '/images/nukkad-natak.jpg',
    desc: 'Nukkad Natak has been the carrier of change in India since the very beginning. This event is about creating awareness of social problems that plague our soil and bringing about realization in our youth.',
    rules: [
      'Team size must be between 8 and 20 members',
      'Duration strictly 15–25 minutes',
      'Only live music permitted — electronic instruments prohibited',
      'No microphones provided; recorded music not allowed',
      'Props permitted — sharp or harmful objects strictly prohibited',
      'Obscenity at the discretion of judges is not permitted',
      'Decision of the judges is final and binding',
    ],
  },
  {
    num: '02',
    title: 'Monoact',
    tagline: 'Solo Acting Competition',
    time: '2:00 PM',
    date: '30 March 2026',
    prize: '₹1,500',
    reg: '₹100 / person',
    team: 'Individual',
    duration: '3–6 Minutes',
    image: '/images/monoact.jpg',
    desc: 'The Solo Acting God — do you have what it takes to earn that title? Bring your most unconventional and erratic ideas and tease the audience with your brilliance. Fiddle with the hearts and minds of spectators, giving them a feast of art.',
    rules: [
      'Individual entries only — team size is one',
      'Duration strictly 3–6 minutes',
      'Props allowed — must be brought by participant',
      'Pre-recorded music on USB pendrive in MP3 format only',
      'No microphone provided',
      'Live music allowed — no amplifiers or plug points provided',
      'No fluids, live animals, flame, or heavy/sharp objects',
      'Decision of the judges is final and binding',
    ],
  },
];

export default function IlhaamPage() {
  const [activeEvent, setActiveEvent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const ev = events[activeEvent];

  // Scroll reveal refs — one per major section / element
  const [heroLabelRef, heroLabelVis] = useReveal(0.1);
  const [heroTitleRef, heroTitleVis] = useReveal(0.1);
  const [heroMetaRef, heroMetaVis] = useReveal(0.1);
  const [compPanelRef, compPanelVis] = useReveal(0.1);
  const [talksRef, talksVis] = useReveal(0.15);
  const [ctaRef, ctaVis] = useReveal(0.15);
  const isMobile = useIsMobile();

  const switchEvent = (i) => {
    if (i === activeEvent) return;
    setTransitioning(true);
    setTimeout(() => { setActiveEvent(i); setTransitioning(false); }, 200);
  };

  return (
    <div style={{ background: '#0C0C0C', minHeight: '100vh', paddingTop: '80px' }}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        padding: isMobile ? '60px 20px 0' : '100px 48px 0',
        borderBottom: '3px solid #CC0000',
      }}>
        {/* Background photo */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <img
            src="/images/hero-stage.jpg"
            alt=""
            onError={e => e.target.style.opacity = 0}
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', opacity: 0.04,
              filter: 'grayscale(100%)',
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(12,12,12,0.3) 0%, #0C0C0C 90%)',
          }} />
        </div>

        <div style={{
          maxWidth: '1280px', margin: '0 auto',
          position: 'relative', zIndex: 2,
        }}>
          {/* Label */}
          <div
            ref={heroLabelRef}
            style={{
              display: 'flex', alignItems: 'center', gap: '14px',
              marginBottom: '40px',
              opacity: heroLabelVis ? 1 : 0,
              animation: heroLabelVis ? 'reveal-left 0.7s cubic-bezier(0.22,1,0.36,1) both' : 'none',
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

          {/* Giant title */}
          <h1
            ref={heroTitleRef}
            style={{
              fontFamily: "'Cormorant', serif",
              fontWeight: 900,
              fontSize: isMobile ? 'clamp(72px, 22vw, 120px)' : 'clamp(100px, 18vw, 200px)',
              background: 'linear-gradient(135deg, #B8960C 0%, #E8C86A 40%, #B8960C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 0.85, letterSpacing: isMobile ? '-2px' : '-4px',
              marginBottom: '0',
              opacity: heroTitleVis ? 1 : 0,
              animation: heroTitleVis ? 'reveal-up 1s cubic-bezier(0.22,1,0.36,1) 0.1s both' : 'none',
            }}
          >
            ILHAAM
          </h1>

          {/* Bottom meta strip */}
          <div
            ref={heroMetaRef}
            style={{
              display: 'flex', alignItems: isMobile ? 'flex-start' : 'center',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'space-between',
              padding: '32px 0 40px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              marginTop: '24px',
              flexWrap: 'wrap', gap: '20px',
              opacity: heroMetaVis ? 1 : 0,
              animation: heroMetaVis ? 'reveal-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.25s both' : 'none',
            }}
          >
            {/* Left — tagline */}
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic', fontWeight: 300,
              fontSize: isMobile ? '16px' : '20px', color: 'rgba(245,240,232,0.4)',
              letterSpacing: '0.05em',
            }}>
              A celebration of imagination, culture, and artistic expression.
            </div>

            {/* Meta info row */}
            <div style={{
              display: 'flex', alignItems: 'center',
              gap: isMobile ? '16px' : '32px', flexWrap: 'wrap',
            }}>
              {[
                { Icon: Calendar, text: '30 March 2026' },
                { Icon: MapPin, text: 'UIET, Panjab University' },
                { Icon: Award, text: 'Prize Pool ₹11,500' },
              ].map(({ Icon, text }) => (
                <div key={text} style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  color: '#6B6B6B', fontSize: '12px',
                  fontFamily: 'Inter, sans-serif',
                }}>
                  <Icon size={13} color="#CC0000" />
                  {text}
                </div>
              ))}
            </div>

            {/* Download Brochure Button */}
            <a
              href="/brochure/ilhaam-2026-brochure.pdf"
              download="ILHAAM-2026-Brochure.pdf"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                padding: '13px 28px',
                width: isMobile ? '100%' : 'auto',
                boxSizing: 'border-box',
                background: 'transparent',
                border: '1px solid #B8960C',
                color: '#B8960C',
                textDecoration: 'none',
                fontSize: '10px', fontWeight: 700,
                letterSpacing: '0.3em', textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif',
                borderRadius: '2px',
                position: 'relative', overflow: 'hidden',
                transition: 'all 0.3s ease',
                boxShadow: '0 0 20px rgba(184,150,12,0.15), inset 0 0 20px rgba(184,150,12,0.03)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#B8960C';
                e.currentTarget.style.color = '#0C0C0C';
                e.currentTarget.style.boxShadow = '0 0 40px rgba(184,150,12,0.5), inset 0 0 20px rgba(184,150,12,0.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#B8960C';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(184,150,12,0.15), inset 0 0 20px rgba(184,150,12,0.03)';
              }}
            >
              {/* Animated shimmer line */}
              <div style={{
                position: 'absolute', top: 0, left: '-100%',
                width: '100%', height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(184,150,12,0.15), transparent)',
                animation: 'shimmer 2.5s infinite',
                pointerEvents: 'none',
              }} />

              {/* Download icon SVG */}
              <svg
                width="14" height="14" viewBox="0 0 24 24"
                fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ flexShrink: 0 }}
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>

              Download Brochure
            </a>
          </div>
        </div>
      </section>

      {/* ── ABOUT ILHAAM ──────────────────────────────────────── */}
      <section style={{
        background: '#0E0E0E',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div style={{
          maxWidth: '1280px', margin: '0 auto',
          padding: isMobile ? '60px 24px' : '80px 48px',
          display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '40px' : '80px', alignItems: 'center',
        }}>
          <div>
            <h2 style={{
              fontFamily: "'Cormorant', serif",
              fontWeight: 900, fontSize: 'clamp(40px, 5vw, 60px)',
              color: '#F5F0E8', lineHeight: 1,
              letterSpacing: '-1px', marginBottom: '28px',
            }}>
              What is<br />
              <span style={{ fontStyle: 'italic', color: '#CC0000' }}>ILHAAM?</span>
            </h2>
            <div style={{
              width: '48px', height: '2px',
              background: '#CC0000', marginBottom: '28px',
            }} />
            <p style={{
              color: '#9CA3AF', fontSize: '15px',
              lineHeight: '1.9', fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
            }}>
              Over the years, OSMIUM has grown into a vibrant theatre collective that celebrates
              storytelling, expression, and the transformative power of performance. Rooted in
              passion and creativity, our group continues to provide a dynamic platform where
              young artists can explore their voices, challenge perspectives, and bring powerful
              narratives to life.
            </p>
          </div>
          <div>
            <p style={{
              color: '#6B6B6B', fontSize: '15px',
              lineHeight: '1.9', fontFamily: 'Inter, sans-serif',
              fontWeight: 300, marginBottom: '24px',
            }}>
              Through every production and initiative, OSMIUM strives to nurture talent,
              encourage collaboration, and build confidence among performers both on and off
              the stage.
            </p>
            <p style={{
              color: '#6B6B6B', fontSize: '15px',
              lineHeight: '1.9', fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
            }}>
              ILHAAM is not just an event — it is a canvas where emotions become art and ideas
              become impactful performances. It reflects our commitment to fostering creativity
              and providing meaningful opportunities for emerging artists to shine.
            </p>
          </div>
        </div>
      </section>

      {/* ── STAGE PLAY SPOTLIGHT ──────────────────────────────── */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        background: '#080808',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src="/images/stage-play.png"
            alt=""
            onError={e => e.target.style.opacity = 0}
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', opacity: 0.12,
              filter: 'grayscale(60%)',
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, #080808 40%, rgba(8,8,8,0.6) 100%)',
          }} />
        </div>

        <div style={{
          maxWidth: '1280px', margin: '0 auto',
          padding: isMobile ? '60px 24px' : '100px 48px', position: 'relative', zIndex: 2,
          display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '40px' : '80px', alignItems: 'center',
        }}>
          <div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '14px',
              marginBottom: '24px',
            }}>
              <div style={{ width: '28px', height: '1px', background: '#B8960C' }} />
              <span style={{
                color: '#B8960C', fontSize: '10px',
                letterSpacing: '0.5em', textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif', fontWeight: 600,
              }}>
                Exclusive Performance
              </span>
            </div>

            <div style={{
              color: '#3A3A3A', fontSize: '11px',
              letterSpacing: '0.4em', textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif', marginBottom: '12px',
            }}>
              Stage Play
            </div>

            <h2 style={{
              fontFamily: "'Cormorant', serif",
              fontWeight: 900,
              fontSize: 'clamp(56px, 8vw, 96px)',
              color: '#F5F0E8', lineHeight: 0.9,
              letterSpacing: '-2px', marginBottom: '8px',
            }}>
              ACID
            </h2>

            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic', fontWeight: 300,
              fontSize: '18px', color: 'rgba(245,240,232,0.3)',
              marginBottom: '32px', letterSpacing: '0.05em',
            }}>
              Performed by OSMIUM
            </div>

            <p style={{
              color: '#9CA3AF', fontSize: '15px',
              lineHeight: '1.9', fontFamily: 'Inter, sans-serif',
              fontWeight: 300, marginBottom: '40px',
            }}>
              ILHAAM proudly presents an exclusive stage play by OSMIUM. This performance
              promises an evening of powerful storytelling, heartfelt emotions, and impactful
              expression. As the curtains rise, OSMIUM takes the audience on a captivating
              theatrical journey filled with creativity, passion, and purpose — an experience
              that will resonate long after the final bow.
            </p>

            <div style={{
              display: 'flex', gap: '32px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              paddingTop: '28px',
            }}>
              {[
                { label: 'Date', value: '30 March 2026' },
                { label: 'Entry', value: 'Free for All' },
                { label: 'Venue', value: 'UIET, PU' },
              ].map(s => (
                <div key={s.label}>
                  <div style={{
                    color: '#3A3A3A', fontSize: '9px',
                    letterSpacing: '0.35em', textTransform: 'uppercase',
                    fontFamily: 'Inter, sans-serif', marginBottom: '6px',
                  }}>
                    {s.label}
                  </div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 600, fontSize: '16px',
                    color: '#F5F0E8',
                  }}>
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — large italic quote */}
          <div style={{
            borderLeft: isMobile ? 'none' : '1px solid rgba(255,255,255,0.06)',
            borderTop: isMobile ? '1px solid rgba(255,255,255,0.06)' : 'none',
            paddingLeft: isMobile ? '0' : '80px',
            paddingTop: isMobile ? '24px' : '0',
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic', fontWeight: 300,
              fontSize: 'clamp(28px, 3vw, 40px)',
              color: 'rgba(245,240,232,0.15)',
              lineHeight: 1.4,
              letterSpacing: '-0.5px',
            }}>
              "An experience that will resonate long after the final bow."
            </div>
            <div style={{
              width: '40px', height: '1px',
              background: '#CC0000', marginTop: '32px',
            }} />
          </div>
        </div>
      </section>

      {/* ── COMPETITION EVENTS ────────────────────────────────── */}
      <section style={{
        background: '#0C0C0C',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: isMobile ? '60px 24px' : '100px 48px' }}>

          {/* Label */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '20px',
            marginBottom: '72px',
          }}>
            <div style={{ width: '32px', height: '1px', background: '#CC0000' }} />
            <span style={{
              color: '#B8960C', fontSize: '10px',
              letterSpacing: '0.5em', textTransform: 'uppercase',
              fontWeight: 600, fontFamily: 'Inter, sans-serif',
            }}>
              Open Competitions
            </span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.05)' }} />
          </div>

          <h2 style={{
            fontFamily: "'Cormorant', serif",
            fontWeight: 900,
            fontSize: 'clamp(48px, 7vw, 80px)',
            color: '#F5F0E8', lineHeight: 1,
            letterSpacing: '-1px', marginBottom: '64px',
          }}>
            Competition <span style={{ fontStyle: 'italic', color: '#CC0000' }}>Events</span>
          </h2>

          {/* Tab selector */}
          <div style={{
            display: 'flex', gap: '0',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            marginBottom: '0',
          }}>
            {events.map((e, i) => (
              <button
                key={e.num}
                onClick={() => switchEvent(i)}
                style={{
                  padding: '16px 36px', border: 'none',
                  background: 'transparent', cursor: 'pointer',
                  borderBottom: activeEvent === i
                    ? '2px solid #CC0000'
                    : '2px solid transparent',
                  marginBottom: '-1px',
                  transition: 'all 0.2s',
                }}
              >
                <span style={{
                  fontFamily: "'Cormorant', serif",
                  fontWeight: 700, fontSize: '18px',
                  color: activeEvent === i ? '#F5F0E8' : '#3A3A3A',
                  transition: 'color 0.2s',
                }}>
                  {e.title}
                </span>
              </button>
            ))}
          </div>

          {/* Event detail panel */}
          <div
            ref={compPanelRef}
            style={{
              display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              border: '1px solid rgba(255,255,255,0.06)',
              borderTop: 'none',
              opacity: compPanelVis ? (transitioning ? 0 : 1) : 0,
              animation: compPanelVis ? 'reveal-up 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s both' : 'none',
              transition: 'opacity 0.2s ease',
            }}>

            {/* Left — details */}
            <div style={{
              padding: isMobile ? '32px 24px' : '56px 52px',
              borderRight: isMobile ? 'none' : '1px solid rgba(255,255,255,0.06)',
              borderBottom: isMobile ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}>
              <div style={{
                fontFamily: "'Cormorant', serif",
                fontStyle: 'italic', fontWeight: 900,
                fontSize: '100px', color: 'rgba(204,0,0,0.06)',
                lineHeight: 1, marginBottom: '-20px',
                userSelect: 'none',
              }}>
                {ev.num}
              </div>

              <h3 style={{
                fontFamily: "'Cormorant', serif",
                fontWeight: 900,
                fontSize: 'clamp(36px, 4vw, 52px)',
                color: '#F5F0E8', lineHeight: 1,
                marginBottom: '20px',
              }}>
                {ev.title}
              </h3>

              <p style={{
                color: '#9CA3AF', fontSize: '15px',
                lineHeight: '1.85', fontFamily: 'Inter, sans-serif',
                fontWeight: 300, marginBottom: '40px',
              }}>
                {ev.desc}
              </p>

              {/* Stats */}
              <div style={{
                display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: '1px', background: 'rgba(255,255,255,0.05)',
                marginBottom: '40px',
              }}>
                {[
                  { label: 'Prize', value: ev.prize, gold: true },
                  { label: 'Registration', value: ev.reg },
                  { label: 'Team Size', value: ev.team },
                  { label: 'Duration', value: ev.duration },
                ].map(s => (
                  <div key={s.label} style={{
                    background: '#0C0C0C', padding: '20px 24px',
                  }}>
                    <div style={{
                      color: '#3A3A3A', fontSize: '9px',
                      letterSpacing: '0.35em', textTransform: 'uppercase',
                      fontFamily: 'Inter, sans-serif', marginBottom: '8px',
                    }}>
                      {s.label}
                    </div>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 700, fontSize: '18px',
                      color: s.gold ? '#B8960C' : '#F5F0E8',
                    }}>
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/register" style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: '#CC0000', color: '#F5F0E8',
                textDecoration: 'none', padding: '14px 32px',
                fontSize: '10px', fontWeight: 700,
                letterSpacing: '0.25em', textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif', borderRadius: '2px',
                boxShadow: '0 0 28px rgba(204,0,0,0.3)',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 40px rgba(204,0,0,0.5)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 28px rgba(204,0,0,0.3)'}
              >
                Register Now <ArrowRight size={14} />
              </Link>
            </div>

            {/* Right — rules */}
            <div style={{ padding: isMobile ? '32px 24px' : '56px 52px', background: '#0E0E0E' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                marginBottom: '32px',
              }}>
                <div style={{ width: '20px', height: '1px', background: '#CC0000' }} />
                <span style={{
                  color: '#CC0000', fontSize: '10px',
                  letterSpacing: '0.45em', textTransform: 'uppercase',
                  fontFamily: 'Inter, sans-serif', fontWeight: 600,
                }}>
                  Rules & Guidelines
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {ev.rules.map((rule, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: '20px',
                    padding: '16px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    alignItems: 'flex-start',
                  }}>
                    <span style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: 'italic', fontWeight: 400,
                      fontSize: '13px', color: '#CC0000',
                      minWidth: '20px', marginTop: '2px',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{
                      color: '#6B6B6B', fontSize: '13px',
                      lineHeight: '1.7', fontFamily: 'Inter, sans-serif',
                      fontWeight: 300,
                    }}>
                      {rule}
                    </span>
                  </div>
                ))}
              </div>

              {/* Time badge */}
              <div style={{
                marginTop: '32px', padding: '20px 24px',
                border: '1px solid rgba(184,150,12,0.2)',
                background: 'rgba(184,150,12,0.04)',
              }}>
                <div style={{
                  color: '#3A3A3A', fontSize: '9px',
                  letterSpacing: '0.35em', textTransform: 'uppercase',
                  fontFamily: 'Inter, sans-serif', marginBottom: '6px',
                }}>
                  Event Time
                </div>
                <div style={{
                  fontFamily: "'Cormorant', serif",
                  fontWeight: 700, fontSize: '22px',
                  color: '#B8960C',
                }}>
                  {ev.date} · {ev.time}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THEATRE TALKS ─────────────────────────────────────── */}
      <section style={{
        background: '#0E0E0E',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div
          ref={talksRef}
          style={{
            maxWidth: '1280px', margin: '0 auto',
            padding: isMobile ? '60px 24px' : '100px 48px',
            display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr',
            gap: isMobile ? '40px' : '80px', alignItems: 'center',
            opacity: talksVis ? 1 : 0,
            animation: talksVis ? 'reveal-up 0.8s cubic-bezier(0.22,1,0.36,1) both' : 'none',
          }}>
          <div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '14px',
              marginBottom: '24px',
            }}>
              <div style={{ width: '28px', height: '1px', background: '#CC0000' }} />
              <span style={{
                color: '#B8960C', fontSize: '10px',
                letterSpacing: '0.5em', textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif', fontWeight: 600,
              }}>
                Open Session
              </span>
            </div>
            <h2 style={{
              fontFamily: "'Cormorant', serif",
              fontWeight: 900,
              fontSize: 'clamp(40px, 5vw, 64px)',
              color: '#F5F0E8', lineHeight: 0.9,
              letterSpacing: '-1px',
            }}>
              Theatre<br />
              <span style={{ fontStyle: 'italic', color: '#CC0000' }}>Talks</span>
            </h2>
          </div>

          <div>
            <p style={{
              color: '#9CA3AF', fontSize: '16px',
              lineHeight: '1.9', fontFamily: 'Inter, sans-serif',
              fontWeight: 300, marginBottom: '24px',
            }}>
              An engaging platform to learn, interact, and explore the art of performance.
              From insightful discussions to hands-on training, the session nurtures creativity,
              confidence, and stage skills.
            </p>
            <p style={{
              color: '#6B6B6B', fontSize: '14px',
              lineHeight: '1.9', fontFamily: 'Inter, sans-serif',
              fontWeight: 300, marginBottom: '36px',
            }}>
              Join us for an inspiring experience in the world of theatre — open to all artists,
              students, and theatre enthusiasts regardless of experience level.
            </p>
            <div style={{ display: 'flex', gap: '32px' }}>
              {[
                { label: 'Date', value: '30 March 2026' },
                { label: 'Entry', value: 'Free & Open' },
                { label: 'Level', value: 'All Welcome' },
              ].map(s => (
                <div key={s.label} style={{
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  paddingTop: '16px',
                }}>
                  <div style={{
                    color: '#3A3A3A', fontSize: '9px',
                    letterSpacing: '0.35em', textTransform: 'uppercase',
                    fontFamily: 'Inter, sans-serif', marginBottom: '6px',
                  }}>
                    {s.label}
                  </div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 600, fontSize: '16px', color: '#F5F0E8',
                  }}>
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── REGISTER CTA ──────────────────────────────────────── */}
      <section style={{
        background: '#080808', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '600px', height: '300px',
          background: 'radial-gradient(ellipse, rgba(204,0,0,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div
          ref={ctaRef}
          style={{
            maxWidth: '1280px', margin: '0 auto',
            padding: isMobile ? '60px 24px' : '100px 48px',
            display: 'flex', alignItems: isMobile ? 'flex-start' : 'center',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '40px',
            position: 'relative', zIndex: 2,
            opacity: ctaVis ? 1 : 0,
            animation: ctaVis ? 'reveal-up 0.85s cubic-bezier(0.22,1,0.36,1) both' : 'none',
          }}>
          <div>
            <div style={{
              color: '#3A3A3A', fontSize: '10px',
              letterSpacing: '0.5em', textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif', marginBottom: '16px',
            }}>
              30 March 2026 · UIET, Panjab University
            </div>
            <h2 style={{
              fontFamily: "'Cormorant', serif",
              fontWeight: 900,
              fontSize: 'clamp(40px, 6vw, 72px)',
              color: '#F5F0E8', lineHeight: 1,
              letterSpacing: '-1px',
            }}>
              Secure Your<br />
              <span style={{ fontStyle: 'italic', color: '#CC0000' }}>Spot Now</span>
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: isMobile ? '100%' : 'auto' }}>
            <Link to="/register" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
              background: '#CC0000', color: '#F5F0E8',
              textDecoration: 'none', padding: '18px 44px',
              fontSize: '11px', fontWeight: 700,
              width: isMobile ? '100%' : 'auto',
              boxSizing: 'border-box',
              letterSpacing: '0.3em', textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif', borderRadius: '2px',
              boxShadow: '0 0 40px rgba(204,0,0,0.3)',
              transition: 'all 0.25s',
            }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 60px rgba(204,0,0,0.5)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 40px rgba(204,0,0,0.3)'}
            >
              Register for ILHAAM 2026 <ArrowRight size={16} />
            </Link>

            <div style={{
              display: 'flex', gap: '20px',
              justifyContent: 'center', paddingTop: '4px',
            }}>
              <a href="mailto:Osmiumosm@gmail.com" style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                color: '#3A3A3A', fontSize: '11px',
                fontFamily: 'Inter, sans-serif', textDecoration: 'none',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#CC0000'}
                onMouseLeave={e => e.currentTarget.style.color = '#3A3A3A'}
              >
                <Mail size={12} /> Osmiumosm@gmail.com
              </a>
              <a href="https://instagram.com/osmium_osm" target="_blank" rel="noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  color: '#3A3A3A', fontSize: '11px',
                  fontFamily: 'Inter, sans-serif', textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#CC0000'}
                onMouseLeave={e => e.currentTarget.style.color = '#3A3A3A'}
              >
                <ArrowUpRight size={12} /> @osmium_osm
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Shimmer keyframe */}
      <style>{`
        @keyframes shimmer {
          0%   { left: -100%; }
          60%  { left: 100%; }
          100% { left: 100%; }
        }
      `}</style>

    </div>
  );
}
