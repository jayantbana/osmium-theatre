import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useIsMobile } from '../hooks/useIsMobile';

const words = ['STORYTELLING', 'EXPRESSION', 'PASSION', 'CREATIVITY', 'THEATRE'];

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const heroRef = useRef(null);
  const isMobile = useIsMobile();

  // Cursor spotlight effect
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const handleMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      hero.style.setProperty('--mx', `${x}px`);
      hero.style.setProperty('--my', `${y}px`);
    };
    hero.addEventListener('mousemove', handleMove);
    return () => hero.removeEventListener('mousemove', handleMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIdx(i => (i + 1) % words.length);
        setVisible(true);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={heroRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        /* Spotlight follows CSS vars --mx / --my set by mousemove */
        background: `
          radial-gradient(
            700px circle at var(--mx, 50%) var(--my, 50%),
            rgba(204, 0, 0, 0.09),
            transparent 45%
          ),
          #0C0C0C
        `,
        transition: 'background 0.05s ease',
      }}>

      {/* RIGHT HALF — Photo/Video: hidden on mobile */}
      {!isMobile && (
      <div style={{
        position: 'absolute',
        right: 0, top: 0, bottom: 0,
        width: '50%',
        overflow: 'hidden',
      }}>
        {/* Video background — falls back to image */}
        {!videoError ? (
          <video
            autoPlay muted loop playsInline
            onError={() => setVideoError(true)}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', opacity: 0.55,
            }}
          >
            <source src="/videos/hero-reel.mp4" type="video/mp4" />
          </video>
        ) : (
          <img
            src="/images/hero-stage.jpg"
            alt="OSMIUM Performance"
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', opacity: 0.55,
            }}
          />
        )}

        {/* Left fade overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, #0C0C0C 0%, rgba(12,12,12,0.6) 40%, rgba(12,12,12,0.1) 100%)',
        }} />

        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
          background: 'linear-gradient(0deg, #0C0C0C 0%, transparent 100%)',
        }} />

        {/* Red tint overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(140,0,0,0.08)',
        }} />
      </div>
      )}

      {/* ── LEFT HALF — Content ──────────────────────────── */}
      <div style={{
        position: 'relative', zIndex: 10,
        width: '100%', maxWidth: '1280px',
        margin: '0 auto',
        padding: isMobile ? '100px 24px 80px' : '120px 48px 80px',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center',
      }}>

        {/* Pre-title label */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '14px',
          marginBottom: '32px',
        }}>
          <div style={{ width: '40px', height: '1px', background: '#CC0000' }} />
          <span style={{
            color: '#CC0000', fontSize: '10px',
            letterSpacing: '0.5em', textTransform: 'uppercase',
            fontWeight: 600, fontFamily: 'Inter, sans-serif',
          }}>
            UIET · Panjab University
          </span>
        </div>

        {/* Main Title */}
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 900,
          fontSize: 'clamp(80px, 12vw, 148px)',
          color: '#F5F0E8',
          lineHeight: 0.9,
          letterSpacing: '-3px',
          marginBottom: '28px',
          maxWidth: '600px',
        }}>
          OSMIUM
        </h1>

        {/* Subtitle row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '16px',
          marginBottom: '40px',
        }}>
          <div style={{ width: '1px', height: '48px', background: '#CC0000' }} />
          <div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic', color: '#F5F0E8',
              fontSize: 'clamp(16px, 2vw, 22px)',
              fontWeight: 400, letterSpacing: '0.05em',
            }}>
              The Theatre Club
            </div>
            <div style={{
              color: '#6B6B6B', fontSize: '11px',
              letterSpacing: '0.3em', textTransform: 'uppercase',
              marginTop: '4px', fontFamily: 'Inter, sans-serif',
            }}>
              Where every stage tells a story of{' '}
              <span style={{
                color: '#CC0000',
                fontStyle: 'italic',
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                transition: 'all 0.35s ease',
                opacity: visible ? 1 : 0,
                display: 'inline-block',
                transform: visible ? 'translateY(0)' : 'translateY(-6px)',
              }}>
                {words[wordIdx]}
              </span>
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Link to="/ilhaam" style={{
            background: '#CC0000', color: '#F5F0E8',
            textDecoration: 'none', padding: '15px 36px',
            fontSize: '11px', fontWeight: 700,
            letterSpacing: '0.25em', textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif',
            borderRadius: '2px',
            boxShadow: '0 0 32px rgba(204,0,0,0.35)',
            transition: 'all 0.25s ease',
            border: '1px solid #CC0000',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#CC0000';
              e.currentTarget.style.boxShadow = '0 0 40px rgba(204,0,0,0.2)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#CC0000';
              e.currentTarget.style.color = '#F5F0E8';
              e.currentTarget.style.boxShadow = '0 0 32px rgba(204,0,0,0.35)';
            }}
          >
            Explore ILHAAM 2026
          </Link>

          <a
            href="#acts"
            onClick={e => {
              e.preventDefault();
              document.getElementById('acts')?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              background: 'transparent', color: '#F5F0E8',
              textDecoration: 'none', padding: '15px 36px',
              fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.25em', textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif',
              borderRadius: '2px',
              border: '1px solid rgba(245,240,232,0.2)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#CC0000';
              e.currentTarget.style.color = '#CC0000';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(245,240,232,0.2)';
              e.currentTarget.style.color = '#F5F0E8';
            }}
          >
            Our Acts
          </a>
        </div>
      </div>

      {/* ── Bottom Marquee Ticker ─────────────────────────── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        borderTop: '1px solid rgba(204,0,0,0.2)',
        background: 'rgba(12,12,12,0.9)',
        padding: '14px 0',
        overflow: 'hidden',
        zIndex: 20,
      }}>
        <div style={{
          display: 'flex', gap: '0',
          animation: 'marquee 22s linear infinite',
          whiteSpace: 'nowrap',
        }}>
          {[...Array(3)].map((_, i) => (
            <span key={i} style={{
              color: '#6B6B6B', fontSize: '10px',
              letterSpacing: '0.4em', textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif', paddingRight: '0',
            }}>
              <span style={{ color: '#CC0000', marginRight: '24px' }}>◆</span>
              ILHAAM 2026
              <span style={{ color: '#CC0000', margin: '0 24px' }}>◆</span>
              30 MARCH · UIET
              <span style={{ color: '#CC0000', margin: '0 24px' }}>◆</span>
              STAGE PLAY: ACID
              <span style={{ color: '#CC0000', margin: '0 24px' }}>◆</span>
              NUKKAD NATAK
              <span style={{ color: '#CC0000', margin: '0 24px' }}>◆</span>
              MONOACT
              <span style={{ color: '#CC0000', margin: '0 24px' }}>◆</span>
              THEATRE TALKS
              <span style={{ color: '#CC0000', margin: '0 24px' }}>◆</span>
              PRIZE POOL ₹11,500
              <span style={{ color: '#CC0000', margin: '0 24px' }}>◆</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '60px', right: '48px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '8px', zIndex: 20,
      }}>
        <div style={{
          writingMode: 'vertical-rl',
          color: '#4B4B4B', fontSize: '9px',
          letterSpacing: '0.4em', textTransform: 'uppercase',
          fontFamily: 'Inter, sans-serif',
        }}>
          Scroll
        </div>
        <div style={{
          width: '1px', height: '48px',
          background: 'linear-gradient(180deg, #CC0000, transparent)',
          animation: 'pulse 2s infinite',
        }} />
      </div>

      {/* Marquee keyframe */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
      `}</style>
    </section>
  );
}
