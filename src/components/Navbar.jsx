import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Our Acts', section: 'acts' },
  { label: 'ILHAAM', path: '/ilhaam', highlight: true },
  { label: 'Performances', section: 'performances' },
  { label: 'Contact', section: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const handleNavClick = (link) => {
    setOpen(false);
    if (link.section) {
      // If already on home page — just scroll
      if (location.pathname === '/') {
        const el = document.getElementById(link.section);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Navigate to home first, then scroll after page loads
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(link.section);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    } else {
      navigate(link.path);
    }
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
          <img
            src="/images/logo.png"
            alt="OSMIUM Logo"
            style={{
              height: '42px',
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
            }}
          />
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
          {navLinks.map(link => {
            const isActive = link.path && location.pathname === link.path;
            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                style={{
                  background: link.highlight
                    ? (isActive ? '#DC143C' : 'transparent')
                    : 'none',
                  border: link.highlight
                    ? `1px solid ${isActive ? '#DC143C' : 'rgba(204,0,0,0.5)'}`
                    : 'none',
                  cursor: 'pointer',
                  color: link.highlight
                    ? (isActive ? '#fff' : '#DC143C')
                    : (isActive ? '#CC0000' : '#9CA3AF'),
                  fontSize: '11px',
                  fontWeight: link.highlight ? 700 : 600,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  fontFamily: 'Inter, sans-serif',
                  padding: link.highlight ? '8px 18px' : '8px 0',
                  transition: 'all 0.2s ease',
                  borderRadius: '6px',
                }}
                onMouseEnter={e => {
                  if (link.highlight) {
                    e.currentTarget.style.background = '#DC143C';
                    e.currentTarget.style.color = '#fff';
                  } else {
                    e.currentTarget.style.color = '#F5F0E8';
                  }
                }}
                onMouseLeave={e => {
                  if (link.highlight) {
                    e.currentTarget.style.background = isActive ? '#DC143C' : 'transparent';
                    e.currentTarget.style.color = isActive ? '#fff' : '#DC143C';
                  } else {
                    e.currentTarget.style.color = isActive ? '#CC0000' : '#9CA3AF';
                  }
                }}
              >
                {link.label}
              </button>
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
          {navLinks.map(link => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: link.highlight ? '#DC143C' : '#9CA3AF',
                fontSize: '12px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                fontWeight: 600,
                padding: 0,
                textAlign: 'left',
              }}
            >
              {link.label}
            </button>
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
