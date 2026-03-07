import React, { useState } from 'react';
import { CheckCircle, Loader, ArrowRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import { useIsMobile } from '../hooks/useIsMobile';

const EVENTS = [
  { value: 'Nukkad Natak', label: 'Nukkad Natak', sub: 'Street Theatre · Team (8–20)' },
  { value: 'Monoact', label: 'Monoact', sub: 'Solo Acting · Individual' },
  { value: 'Stage Play (Audience)', label: 'Stage Play — ACID', sub: 'Free Entry · Open to All' },
  { value: 'Theatre Talks', label: 'Theatre Talks', sub: 'Workshops · Free Entry' },
];

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '2px',
  padding: '14px 18px',
  color: '#F5F0E8',
  fontSize: '13px',
  fontFamily: 'Inter, sans-serif',
  outline: 'none',
  transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
  boxSizing: 'border-box',
};

const labelStyle = {
  display: 'block',
  color: '#3A3A3A',
  fontSize: '9px',
  letterSpacing: '0.4em',
  textTransform: 'uppercase',
  fontFamily: 'Inter, sans-serif',
  fontWeight: 600,
  marginBottom: '8px',
};

function Field({ label, children }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

function FocusInput({ style: extraStyle, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      {...props}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputStyle,
        ...extraStyle,
        borderColor: focused ? '#CC0000' : 'rgba(255,255,255,0.1)',
        boxShadow: focused ? '0 0 0 1px rgba(204,0,0,0.2), 0 0 20px rgba(204,0,0,0.06)' : 'none',
      }}
    />
  );
}

function FocusTextarea({ ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      {...props}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputStyle,
        resize: 'none',
        lineHeight: '1.7',
        borderColor: focused ? '#CC0000' : 'rgba(255,255,255,0.1)',
        boxShadow: focused ? '0 0 0 1px rgba(204,0,0,0.2), 0 0 20px rgba(204,0,0,0.06)' : 'none',
      }}
    />
  );
}

function FocusSelect({ children, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      {...props}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputStyle,
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23CC0000' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 18px center',
        cursor: 'pointer',
        borderColor: focused ? '#CC0000' : 'rgba(255,255,255,0.1)',
        boxShadow: focused ? '0 0 0 1px rgba(204,0,0,0.2), 0 0 20px rgba(204,0,0,0.06)' : 'none',
      }}
    >
      {children}
    </select>
  );
}

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', college: '',
    event: '', teamName: '', teamSize: '', message: '',
  });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [btnHover, setBtnHover] = useState(false);
  const [formRef, formVisible] = useReveal(0.05);
  const [headerRef, headerVisible] = useReveal(0.1);
  const isMobile = useIsMobile();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Registration failed');
      setStatus('success');
    } catch (err) {
      setErrorMsg(err.message);
      setStatus('error');
    }
  };

  // ── Success screen ─────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <div style={{
        minHeight: '100vh', background: '#0A0A0A',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '120px 24px',
      }}>
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <CheckCircle size={56} color="#CC0000" style={{ margin: '0 auto 28px' }} />
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900, fontSize: '52px',
            color: '#F5F0E8', lineHeight: 0.9,
            letterSpacing: '-1px', marginBottom: '24px',
          }}>
            You're<br /><span style={{ color: '#CC0000', fontStyle: 'italic' }}>Registered!</span>
          </h2>
          <div style={{ width: '40px', height: '1px', background: '#CC0000', margin: '0 auto 24px' }} />
          <p style={{
            color: '#9CA3AF', fontSize: '14px',
            lineHeight: '1.8', fontFamily: 'Inter, sans-serif',
            fontWeight: 300, marginBottom: '8px',
          }}>
            A confirmation email has been sent to{' '}
            <span style={{ color: '#CC0000' }}>{form.email}</span>
          </p>
          <p style={{
            color: '#3A3A3A', fontSize: '11px',
            letterSpacing: '0.3em', textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif',
          }}>
            See you at ILHAAM 2026 · 30 March · UIET
          </p>
        </div>
      </div>
    );
  }

  // ── Main form ──────────────────────────────────────────────────────
  return (
    <div style={{
      minHeight: '100vh',
      background: `
        radial-gradient(ellipse 80% 50% at 50% 0%, rgba(204,0,0,0.06), transparent 60%),
        #0A0A0A
      `,
      padding: '130px 24px 80px',
    }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>

        {/* ── Header ──────────────────────────────────────────── */}
        <div
          ref={headerRef}
          style={{
            marginBottom: '64px',
            opacity: headerVisible ? 1 : 0,
            animation: headerVisible ? 'reveal-up 0.85s cubic-bezier(0.22,1,0.36,1) both' : 'none',
          }}
        >
          {/* Section label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
            <div style={{ width: '40px', height: '1px', background: '#CC0000' }} />
            <span style={{
              color: '#CC0000', fontSize: '10px',
              letterSpacing: '0.5em', textTransform: 'uppercase',
              fontWeight: 600, fontFamily: 'Inter, sans-serif',
            }}>
              ILHAAM 2026 · Registration
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            fontSize: 'clamp(56px, 10vw, 100px)',
            color: '#F5F0E8',
            lineHeight: 0.9,
            letterSpacing: '-3px',
            marginBottom: '24px',
          }}>
            Register<br />
            <span style={{ fontStyle: 'italic', color: '#CC0000' }}>Now</span>
          </h1>

          <p style={{
            color: '#6B6B6B', fontSize: '13px',
            letterSpacing: '0.25em', textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif',
          }}>
            30 March 2026 · UIET, Panjab University · Prize Pool ₹11,500
          </p>
        </div>

        {/* ── Form ────────────────────────────────────────────── */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          style={{
            border: '1px solid rgba(255,255,255,0.06)',
            borderTop: '3px solid #CC0000',
            background: 'rgba(255,255,255,0.015)',
            padding: '52px 52px',
            opacity: formVisible ? 1 : 0,
            animation: formVisible ? 'reveal-up 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s both' : 'none',
          }}
        >
          {/* Grid: name + email */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            <Field label="Full Name *">
              <FocusInput type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Your full name" />
            </Field>
            <Field label="Email Address *">
              <FocusInput type="email" name="email" required value={form.email} onChange={handleChange} placeholder="you@college.edu" />
            </Field>
          </div>

          {/* Grid: phone + college */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            <Field label="Phone Number *">
              <FocusInput type="tel" name="phone" required value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" />
            </Field>
            <Field label="College / Institution *">
              <FocusInput type="text" name="college" required value={form.college} onChange={handleChange} placeholder="e.g. NIT Kurukshetra" />
            </Field>
          </div>

          {/* Event select */}
          <div style={{ marginBottom: '24px' }}>
            <Field label="Select Event *">
              <FocusSelect name="event" required value={form.event} onChange={handleChange}>
                <option value="" style={{ background: '#0C0C0C' }}>— Choose an Event —</option>
                {EVENTS.map(ev => (
                  <option key={ev.value} value={ev.value} style={{ background: '#0C0C0C' }}>
                    {ev.label} · {ev.sub}
                  </option>
                ))}
              </FocusSelect>
            </Field>
          </div>

          {/* Event detail pills */}
          {form.event && (
            <div style={{
              borderTop: '1px solid rgba(255,255,255,0.05)',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              padding: '16px 0',
              marginBottom: '24px',
              display: 'flex', gap: '12px', flexWrap: 'wrap',
            }}>
              {EVENTS.find(e => e.value === form.event) && (
                <>
                  <span style={{
                    border: '1px solid rgba(184,150,12,0.3)',
                    color: '#B8960C', fontSize: '9px',
                    letterSpacing: '0.25em', textTransform: 'uppercase',
                    padding: '5px 12px',
                    fontFamily: 'Inter, sans-serif', fontWeight: 600,
                    background: 'rgba(184,150,12,0.04)',
                  }}>
                    {form.event}
                  </span>
                  <span style={{
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#6B6B6B', fontSize: '9px',
                    letterSpacing: '0.25em', textTransform: 'uppercase',
                    padding: '5px 12px',
                    fontFamily: 'Inter, sans-serif',
                  }}>
                    {EVENTS.find(e => e.value === form.event)?.sub}
                  </span>
                </>
              )}
            </div>
          )}

          {/* Nukkad Natak team fields */}
          {form.event === 'Nukkad Natak' && (
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <Field label="Team Name">
                <FocusInput type="text" name="teamName" value={form.teamName} onChange={handleChange} placeholder="Your team name" />
              </Field>
              <Field label="Team Size (8–20)">
                <FocusInput type="number" name="teamSize" min="8" max="20" value={form.teamSize} onChange={handleChange} placeholder="e.g. 12" />
              </Field>
            </div>
          )}

          {/* Message */}
          <div style={{ marginBottom: '36px' }}>
            <Field label="Message / Queries (Optional)">
              <FocusTextarea name="message" rows={3} value={form.message} onChange={handleChange} placeholder="Any specific questions or notes?" />
            </Field>
          </div>

          {/* Error */}
          {status === 'error' && (
            <div style={{
              marginBottom: '24px',
              border: '1px solid rgba(204,0,0,0.3)',
              background: 'rgba(204,0,0,0.06)',
              padding: '14px 18px',
              color: '#FF6B6B',
              fontSize: '13px',
              fontFamily: 'Inter, sans-serif',
            }}>
              ⚠️ {errorMsg || 'Something went wrong. Please try again.'}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={status === 'loading'}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            style={{
              width: '100%',
              background: btnHover && status !== 'loading' ? 'transparent' : '#CC0000',
              border: '1px solid #CC0000',
              color: btnHover && status !== 'loading' ? '#CC0000' : '#F5F0E8',
              padding: '18px 36px',
              fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.3em', textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif',
              borderRadius: '2px',
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              opacity: status === 'loading' ? 0.6 : 1,
              transition: 'all 0.25s ease',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
              boxShadow: btnHover && status !== 'loading'
                ? '0 0 20px rgba(204,0,0,0.1)'
                : '0 0 32px rgba(204,0,0,0.3)',
            }}
          >
            {status === 'loading' ? (
              <><Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> Submitting...</>
            ) : (
              <>Complete Registration <ArrowRight size={14} /></>
            )}
          </button>

          <p style={{
            marginTop: '20px',
            color: '#3A3A3A', fontSize: '11px',
            textAlign: 'center', fontFamily: 'Inter, sans-serif',
            letterSpacing: '0.1em',
          }}>
            A confirmation email will be sent to your registered address.
          </p>
        </form>

        {/* ── Bottom event info strip ─────────────────────────── */}
        <div style={{
          marginTop: '48px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: '32px',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        }}>
          {[
            { label: 'Date', value: '30 March 2026' },
            { label: 'Venue', value: 'UIET, Panjab\u00a0University' },
            { label: 'Prize Pool', value: '₹11,500' },
          ].map((s, i) => (
            <div
              key={s.label}
              style={{
                padding: '20px 0',
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                paddingRight: i < 2 ? '24px' : 0,
                paddingLeft: i > 0 ? '24px' : 0,
              }}
            >
              <div style={{
                color: '#3A3A3A', fontSize: '9px',
                letterSpacing: '0.35em', textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif', marginBottom: '6px',
              }}>{s.label}</div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700, fontSize: '15px',
                color: i === 2 ? '#B8960C' : '#F5F0E8',
              }}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Spinner keyframe */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input::placeholder, textarea::placeholder { color: #3A3A3A; }
        select option { background: #0C0C0C; color: #F5F0E8; }
      `}</style>
    </div>
  );
}
