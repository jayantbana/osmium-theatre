import React, { useState } from 'react';
import { Mail, Instagram, Phone, ArrowUpRight } from 'lucide-react';
import { useReveal, useStaggerReveal } from '../hooks/useReveal';
import { useIsMobile } from '../hooks/useIsMobile';

const team = [
  { name: 'Dinesh Nawani', role: 'Event Coordinator', phone: '+91 90572 54349' },
  { name: 'Kaushal Kumar', role: 'Event Head', phone: '+91 82792 52303' },
  { name: 'Malay Kumar Jha', role: 'Production Lead', phone: '+91 63959 35126' },
  { name: 'Dolly', role: 'Creative Director', phone: '+91 84271 60280' },
];

export default function Contact() {
  const [hoveredTeam, setHoveredTeam] = useState(null);
  const [hoveredTile, setHoveredTile] = useState(null);
  const isMobile = useIsMobile();
  const [labelRef, labelVisible] = useReveal(0.2);
  const [headRef, headVisible] = useReveal(0.15);
  const [tilesRef, tilesTriggered, tilesDelays] = useStaggerReveal(3, 0, 120);
  const [teamRef, teamTriggered, teamDelays] = useStaggerReveal(team.length, 0, 100);

  return (
    <section id="contact" style={{
      background: '#0C0C0C',
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
            Get In Touch
          </span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.05)' }} />
        </div>

        {/* Big heading */}
        <div
          ref={headRef}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '24px' : '80px',
            alignItems: 'end', marginBottom: '80px',
            opacity: headVisible ? 1 : 0,
            animation: headVisible ? 'reveal-up 0.85s cubic-bezier(0.22,1,0.36,1) 0.05s both' : 'none',
          }}>
          <h2 style={{
            fontFamily: "'Cormorant', serif",
            fontWeight: 900,
            fontSize: 'clamp(48px, 7vw, 88px)',
            color: '#F5F0E8', lineHeight: 0.9,
            letterSpacing: '-2px',
          }}>
            Let's Talk<span style={{ color: '#CC0000' }}>.</span>
          </h2>

          <p style={{
            color: '#6B6B6B', fontSize: '15px',
            lineHeight: '1.85', fontFamily: 'Inter, sans-serif',
            fontWeight: 300,
          }}>
            Have questions about ILHAAM 2026, want to collaborate, or looking to join OSMIUM?
            Reach out to us through any of the channels below — we'd love to hear from you.
          </p>
        </div>

        {/* ── Primary Contact Channels ──────────────────────── */}
        <div
          ref={tilesRef}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            borderLeft: '1px solid rgba(255,255,255,0.05)',
            marginBottom: '80px',
          }}>
          {[
            {
              Icon: Mail,
              label: 'Email',
              value: 'Osmiumosm@gmail.com',
              sub: 'For general enquiries & collaborations',
              href: 'mailto:Osmiumosm@gmail.com',
            },
            {
              Icon: Instagram,
              label: 'Instagram',
              value: '@osmium_osm',
              sub: 'Follow for updates, reels & announcements',
              href: 'https://www.instagram.com/osmium_osm/',
              external: true,
            },
            {
              Icon: Phone,
              label: 'Helpline',
              value: '+91 90572 54349',
              sub: 'Direct line — Dinesh Nawani',
              href: 'tel:+919057254349',
            },
          ].map(({ Icon, label, value, sub, href, external }, i) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                onMouseEnter={() => setHoveredTile(i)}
                onMouseLeave={() => setHoveredTile(null)}
                style={{
                  display: 'block', textDecoration: 'none',
                  padding: '44px 40px',
                  borderRight: '1px solid rgba(255,255,255,0.05)',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  background: hoveredTile === i ? 'rgba(204,0,0,0.04)' : 'transparent',
                  transition: 'background 0.3s ease',
                  position: 'relative',
                  opacity: tilesTriggered ? 1 : 0,
                  animation: tilesTriggered
                    ? `reveal-up 0.65s cubic-bezier(0.22,1,0.36,1) ${tilesDelays[i]}ms both`
                    : 'none',
                }}
              >
                {/* Top row */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'flex-start', marginBottom: '28px',
                }}>
                  <Icon
                    size={20}
                    color={hov ? '#CC0000' : '#3A3A3A'}
                    style={{ transition: 'color 0.2s' }}
                  />
                  <ArrowUpRight
                    size={14}
                    color={hov ? '#CC0000' : '#3A3A3A'}
                    style={{
                      transition: 'all 0.2s',
                      transform: hov ? 'translate(2px,-2px)' : 'translate(0,0)',
                    }}
                  />
                </div>

                <div style={{
                  color: '#3A3A3A', fontSize: '9px',
                  letterSpacing: '0.35em', textTransform: 'uppercase',
                  fontFamily: 'Inter, sans-serif', marginBottom: '8px',
                }}>
                  {label}
                </div>

                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 600, fontSize: '18px',
                  color: hov ? '#F5F0E8' : '#9CA3AF',
                  transition: 'color 0.3s', marginBottom: '10px',
                }}>
                  {value}
                </div>

                <div style={{
                  color: '#3A3A3A', fontSize: '12px',
                  fontFamily: 'Inter, sans-serif', fontWeight: 300,
                  lineHeight: '1.6',
                }}>
                  {sub}
                </div>

                {/* Bottom red line on hover */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '2px', background: '#CC0000',
                  transform: hov ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.3s ease',
                }} />
              </a>
            ))}
        </div>

        {/* ── Team Contacts ─────────────────────────────────── */}
        <div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '20px',
            marginBottom: '40px',
          }}>
            <span style={{
              color: '#3A3A3A', fontSize: '10px',
              letterSpacing: '0.5em', textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif', fontWeight: 600,
            }}>
              Direct Contacts
            </span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.05)' }} />
          </div>

          <div
            ref={teamRef}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
              borderTop: '1px solid rgba(255,255,255,0.05)',
            }}>
            {team.map((t, i) => (
              <a
                key={t.name}
                href={`tel:${t.phone.replace(/\s/g, '')}`}
                onMouseEnter={() => setHoveredTeam(i)}
                onMouseLeave={() => setHoveredTeam(null)}
                style={{
                  display: 'block', textDecoration: 'none',
                  padding: '32px 28px',
                  borderRight: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  background: hoveredTeam === i ? 'rgba(255,255,255,0.02)' : 'transparent',
                  transition: 'background 0.2s',
                  opacity: teamTriggered ? 1 : 0,
                  animation: teamTriggered
                    ? `reveal-up 0.6s cubic-bezier(0.22,1,0.36,1) ${teamDelays[i]}ms both`
                    : 'none',
                }}
              >
                {/* Initial circle */}
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  border: `1px solid ${hoveredTeam === i ? '#CC0000' : 'rgba(255,255,255,0.08)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '20px',
                  transition: 'border-color 0.2s',
                }}>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: 'italic', fontWeight: 700,
                    fontSize: '16px',
                    color: hoveredTeam === i ? '#CC0000' : '#3A3A3A',
                    transition: 'color 0.2s',
                  }}>
                    {t.name.charAt(0)}
                  </span>
                </div>

                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700, fontSize: '17px',
                  color: hoveredTeam === i ? '#F5F0E8' : '#6B6B6B',
                  marginBottom: '4px', transition: 'color 0.2s',
                }}>
                  {t.name}
                </div>

                <div style={{
                  color: '#3A3A3A', fontSize: '9px',
                  letterSpacing: '0.3em', textTransform: 'uppercase',
                  fontFamily: 'Inter, sans-serif', marginBottom: '16px',
                }}>
                  {t.role}
                </div>

                <div style={{
                  color: hoveredTeam === i ? '#CC0000' : '#3A3A3A',
                  fontSize: '12px', fontFamily: 'Inter, sans-serif',
                  fontWeight: 400, transition: 'color 0.2s',
                  letterSpacing: '0.05em',
                }}>
                  {t.phone}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ── Bottom strip ──────────────────────────────────── */}
        <div style={{
          marginTop: '80px', paddingTop: '40px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '20px',
        }}>
          <div style={{
            fontFamily: "'Cormorant', serif",
            fontWeight: 900, fontSize: '28px',
            color: 'rgba(245,240,232,0.08)', letterSpacing: '-1px',
          }}>
            OSMIUM
          </div>
          <div style={{
            color: '#3A3A3A', fontSize: '11px',
            fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em',
          }}>
            UIET · Panjab University · Chandigarh
          </div>
          <a href="mailto:Osmiumosm@gmail.com" style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            textDecoration: 'none',
            border: '1px solid rgba(204,0,0,0.3)',
            padding: '12px 24px', color: '#CC0000',
            fontSize: '10px', letterSpacing: '0.3em',
            textTransform: 'uppercase', fontFamily: 'Inter, sans-serif',
            fontWeight: 700, transition: 'all 0.2s',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#CC0000';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#CC0000';
            }}
          >
            <Mail size={12} /> Write To Us
          </a>
        </div>
      </div>
    </section>
  );
}
