import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';

const links = [
  { label: 'Home', to: '/', anchor: false },
  { label: 'Our Acts', to: '#acts', anchor: true },
  { label: 'ILHAAM', to: '/ilhaam', anchor: false, highlight: true },
  { label: 'Performances', to: '#performances', anchor: true },
  { label: 'Contact', to: '#contact', anchor: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const handleAnchor = (id) => {
    setOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
    transition: 'padding 0.4s ease, background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease',
    padding: scrolled ? '10px 0' : '20px 0',
    background: scrolled
      ? 'rgba(8, 8, 8, 0.72)'
      : 'transparent',
    backdropFilter: scrolled ? 'blur(22px) saturate(180%)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(22px) saturate(180%)' : 'none',
    borderBottom: scrolled
      ? '1px solid rgba(220, 20, 60, 0.22)'
      : '1px solid transparent',
    boxShadow: scrolled
      ? '0 1px 24px rgba(0,0,0,0.55), 0 0 0 0.5px rgba(220,20,60,0.08) inset'
      : 'none',
  };

  return (
    <nav style={navStyle}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '50%',
            background: '#DC143C', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 16px rgba(220,20,60,0.4)',
          }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#fff', fontSize: '18px' }}>O</span>
          </div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#fff', fontSize: '18px', letterSpacing: '0.15em', lineHeight: 1 }}>
              OSMIUM
            </div>
            <div style={{ color: '#DC143C', fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase', lineHeight: 1, marginTop: '3px' }}>
              The Theatre Club
            </div>
          </div>
        </Link>

        {/* Desktop links — hidden on mobile */}
        {!isMobile && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {links.map(l => {
            if (l.highlight) return (
              <Link key={l.label} to={l.to} style={{
                color: '#DC143C', fontSize: '11px', fontWeight: 700,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                textDecoration: 'none',
                border: '1px solid rgba(220,20,60,0.5)',
                padding: '8px 18px', borderRadius: '6px',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#DC143C'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#DC143C'; }}
              >
                {l.label}
              </Link>
            );
            if (l.anchor) return (
              <button key={l.label}
                onClick={() => handleAnchor(l.to.replace('#', ''))}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#9CA3AF', fontSize: '11px', fontWeight: 500,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  transition: 'color 0.2s', padding: 0,
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#DC143C'}
                onMouseLeave={e => e.currentTarget.style.color = '#9CA3AF'}
              >
                {l.label}
              </button>
            );
            return (
              <Link key={l.label} to={l.to} style={{
                color: '#9CA3AF', fontSize: '11px', fontWeight: 500,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                textDecoration: 'none', transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#DC143C'}
                onMouseLeave={e => e.currentTarget.style.color = '#9CA3AF'}
              >
                {l.label}
              </Link>
            );
          })}
          <Link to="/register" style={{
            background: '#DC143C', color: '#fff',
            textDecoration: 'none', padding: '10px 22px',
            borderRadius: '6px', fontSize: '11px',
            fontWeight: 700, letterSpacing: '0.2em',
            textTransform: 'uppercase',
            boxShadow: '0 0 20px rgba(220,20,60,0.3)',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#8B0000'; e.currentTarget.style.boxShadow = '0 0 30px rgba(220,20,60,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#DC143C'; e.currentTarget.style.boxShadow = '0 0 20px rgba(220,20,60,0.3)'; }}
          >
            Register
          </Link>
        </div>
        )}

        {/* Mobile hamburger — shown only on mobile */}
        {isMobile && (
        <button
          onClick={() => setOpen(!open)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff' }}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
        )}
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: 'rgba(8,8,8,0.99)', borderTop: '1px solid rgba(220,20,60,0.15)',
          padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px',
        }}>
          {links.map(l => (
            <a key={l.label} href={l.anchor ? l.to : undefined}
              onClick={() => l.anchor ? handleAnchor(l.to.replace('#', '')) : setOpen(false)}
              style={{
                color: l.highlight ? '#DC143C' : '#9CA3AF',
                fontSize: '12px', letterSpacing: '0.25em',
                textTransform: 'uppercase', textDecoration: 'none', fontWeight: 600,
              }}
            >
              {l.label}
            </a>
          ))}
          <Link to="/register" onClick={() => setOpen(false)} style={{
            background: '#DC143C', color: '#fff', textDecoration: 'none',
            padding: '14px', borderRadius: '6px', textAlign: 'center',
            fontSize: '12px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
          }}>
            Register for ILHAAM
          </Link>
        </div>
      )}
    </nav>
  );
}
