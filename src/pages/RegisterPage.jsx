import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

const events = [
  {
    id: 'nukkad',
    title: 'Nukkad Natak',
    subtitle: 'Street Theatre Competition',
    reg: '₹1,300 / team',
    prize: '₹15,000',
    team: '8–20 Members',
    num: 'I',
  },
  {
    id: 'monoact',
    title: 'Monoact',
    subtitle: 'Solo Acting Competition',
    reg: '₹100 / person',
    prize: '₹1,500',
    team: 'Individual',
    num: 'II',
  },
];

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyAG2d_m1oBd0v4v7BvEqpGsQ9H1e3KctJKlbH5-prYtlJ82pUYkYiS-RQ48YDybHA/exec';

export default function Register() {
  const [selectedEvent, setSelectedEvent] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    teamName: '',
    members: '',
    message: '',
  });
  const [screenshot, setScreenshot] = useState(null);
  const [screenshotName, setScreenshotName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const selectedEventData = events.find(e => e.id === selectedEvent);

  const handleInput = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFile = (file) => {
    if (!file) return;
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPG, PNG, WEBP)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be under 5MB');
      return;
    }
    setScreenshot(file);
    setScreenshotName(file.name);
    setError('');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEvent) { setError('Please select an event'); return; }
    if (!screenshot) { setError('Please upload your payment screenshot'); return; }
    setSubmitting(true);
    setError('');

    try {
      // Convert screenshot to base64
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          // Strip the "data:image/jpeg;base64," prefix
          const base64String = reader.result.split(',')[1];
          resolve(base64String);
        };
        reader.onerror = reject;
        reader.readAsDataURL(screenshot);
      });

      const ext = screenshot.name.split('.').pop();

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        college: formData.college,
        event: selectedEventData?.title || selectedEvent,
        teamName: formData.teamName || '',
        members: formData.members || '',
        memberNames: formData.message || '',
        screenshot: {
          data: base64,
          mimeType: screenshot.type,
          ext: ext,
        },
      };

      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload),
      });

      // no-cors means we can't read response — assume success
      setSubmitted(true);

    } catch (err) {
      setError('Network error. Please try again or email Osmiumosm@gmail.com directly.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success State ─────────────────────────────────────
  if (submitted) {
    return (
      <div style={{
        background: '#0C0C0C', minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px 24px', paddingTop: '100px',
      }}>
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <CheckCircle size={48} color="#CC0000" style={{ marginBottom: '28px' }} />
          <h2 style={{
            fontFamily: "'Cormorant', serif",
            fontWeight: 900, fontSize: '52px',
            color: '#F5F0E8', lineHeight: 1,
            letterSpacing: '-1px', marginBottom: '16px',
          }}>
            Registration Received
          </h2>
          <div style={{ width: '40px', height: '2px', background: '#CC0000', margin: '0 auto 24px' }} />
          <p style={{
            color: '#6B6B6B', fontSize: '15px',
            fontFamily: 'Inter, sans-serif', fontWeight: 300,
            lineHeight: '1.8', marginBottom: '40px',
          }}>
            Thank you, <span style={{ color: '#F5F0E8' }}>{formData.name}</span>.
            Your registration for <span style={{ color: '#CC0000' }}>
              {selectedEventData?.title}
            </span> has been submitted. We'll verify your payment and confirm via email shortly.
          </p>
          <a href="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: '#CC0000', color: '#F5F0E8',
            textDecoration: 'none', padding: '14px 32px',
            fontSize: '10px', fontWeight: 700,
            letterSpacing: '0.25em', textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif', borderRadius: '2px',
          }}>
            Back to Home <ArrowRight size={14} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#0C0C0C', minHeight: '100vh', paddingTop: '80px' }}>

      {/* ── Page Header ──────────────────────────────────── */}
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: '80px 48px 64px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '14px',
          marginBottom: '24px',
        }}>
          <div style={{ width: '32px', height: '1px', background: '#B8960C' }} />
          <span style={{
            color: '#B8960C', fontSize: '10px',
            letterSpacing: '0.5em', textTransform: 'uppercase',
            fontWeight: 600, fontFamily: 'Inter, sans-serif',
          }}>
            ILHAAM 2026
          </span>
        </div>
        <h1 style={{
          fontFamily: "'Cormorant', serif",
          fontWeight: 900,
          fontSize: 'clamp(56px, 8vw, 96px)',
          color: '#F5F0E8', lineHeight: 0.9,
          letterSpacing: '-2px',
        }}>
          Register<span style={{ color: '#CC0000' }}>.</span>
        </h1>
      </div>

      {/* ── Main Content ─────────────────────────────────── */}
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: '64px 48px 100px',
        display: 'grid',
        gridTemplateColumns: '1fr 440px',
        gap: '64px', alignItems: 'start',
      }}>

        {/* ── LEFT — Form ───────────────────────────────── */}
        <form onSubmit={handleSubmit}>

          {/* Event Selection */}
          <div style={{ marginBottom: '48px' }}>
            <div style={{
              color: '#3A3A3A', fontSize: '9px',
              letterSpacing: '0.45em', textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif', fontWeight: 600,
              marginBottom: '20px',
            }}>
              Select Event
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {events.map(ev => (
                <button
                  key={ev.id}
                  type="button"
                  onClick={() => setSelectedEvent(ev.id)}
                  style={{
                    textAlign: 'left', padding: '28px 28px',
                    border: selectedEvent === ev.id
                      ? '1px solid #CC0000'
                      : '1px solid rgba(255,255,255,0.07)',
                    background: selectedEvent === ev.id
                      ? 'rgba(204,0,0,0.06)'
                      : '#0E0E0E',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    borderRadius: '2px',
                    position: 'relative',
                  }}
                >
                  {selectedEvent === ev.id && (
                    <div style={{
                      position: 'absolute', top: '14px', right: '14px',
                      width: '8px', height: '8px', borderRadius: '50%',
                      background: '#CC0000',
                    }} />
                  )}
                  <div style={{
                    fontFamily: "'Cormorant', serif",
                    fontStyle: 'italic', fontWeight: 400,
                    fontSize: '18px', color: '#CC0000',
                    marginBottom: '8px',
                  }}>
                    {ev.num}
                  </div>
                  <div style={{
                    fontFamily: "'Cormorant', serif",
                    fontWeight: 700, fontSize: '22px',
                    color: selectedEvent === ev.id ? '#F5F0E8' : '#6B6B6B',
                    marginBottom: '4px', transition: 'color 0.2s',
                  }}>
                    {ev.title}
                  </div>
                  <div style={{
                    color: '#3A3A3A', fontSize: '9px',
                    letterSpacing: '0.3em', textTransform: 'uppercase',
                    fontFamily: 'Inter, sans-serif', marginBottom: '16px',
                  }}>
                    {ev.subtitle}
                  </div>
                  <div style={{
                    display: 'flex', gap: '16px',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    paddingTop: '14px',
                  }}>
                    <div>
                      <div style={{
                        color: '#3A3A3A', fontSize: '8px',
                        letterSpacing: '0.3em', textTransform: 'uppercase',
                        fontFamily: 'Inter, sans-serif', marginBottom: '4px',
                      }}>
                        Prize
                      </div>
                      <div style={{
                        color: '#B8960C', fontSize: '13px',
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 700,
                      }}>
                        {ev.prize}
                      </div>
                    </div>
                    <div>
                      <div style={{
                        color: '#3A3A3A', fontSize: '8px',
                        letterSpacing: '0.3em', textTransform: 'uppercase',
                        fontFamily: 'Inter, sans-serif', marginBottom: '4px',
                      }}>
                        Fee
                      </div>
                      <div style={{
                        color: '#F5F0E8', fontSize: '13px',
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 700,
                      }}>
                        {ev.reg}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Personal Info */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{
              color: '#3A3A3A', fontSize: '9px',
              letterSpacing: '0.45em', textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif', fontWeight: 600,
              marginBottom: '20px',
            }}>
              Your Details
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { name: 'name', label: 'Full Name', placeholder: 'Your full name', type: 'text', required: true },
                { name: 'email', label: 'Email Address', placeholder: 'your@email.com', type: 'email', required: true },
                { name: 'phone', label: 'Phone Number', placeholder: '+91 XXXXX XXXXX', type: 'tel', required: true },
                { name: 'college', label: 'College / Institution', placeholder: 'Your college name', type: 'text', required: true },
              ].map(field => (
                <div key={field.name}>
                  <label style={{
                    display: 'block',
                    color: '#3A3A3A', fontSize: '9px',
                    letterSpacing: '0.3em', textTransform: 'uppercase',
                    fontFamily: 'Inter, sans-serif', marginBottom: '8px',
                  }}>
                    {field.label}
                    {field.required && <span style={{ color: '#CC0000', marginLeft: '4px' }}>*</span>}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    required={field.required}
                    value={formData[field.name]}
                    onChange={handleInput}
                    style={{
                      width: '100%', padding: '14px 16px',
                      background: '#0E0E0E',
                      border: '1px solid rgba(255,255,255,0.07)',
                      color: '#F5F0E8', fontSize: '14px',
                      fontFamily: 'Inter, sans-serif', fontWeight: 300,
                      outline: 'none', borderRadius: '2px',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = '#CC0000'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.07)'}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Team Info — only for Nukkad Natak */}
          {selectedEvent === 'nukkad' && (
            <div style={{ marginBottom: '40px' }}>
              <div style={{
                color: '#3A3A3A', fontSize: '9px',
                letterSpacing: '0.45em', textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif', fontWeight: 600,
                marginBottom: '20px',
              }}>
                Team Details
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                {[
                  { name: 'teamName', label: 'Team Name', placeholder: 'Your team name' },
                  { name: 'members', label: 'Number of Members', placeholder: '8–20' },
                ].map(field => (
                  <div key={field.name}>
                    <label style={{
                      display: 'block', color: '#3A3A3A', fontSize: '9px',
                      letterSpacing: '0.3em', textTransform: 'uppercase',
                      fontFamily: 'Inter, sans-serif', marginBottom: '8px',
                    }}>
                      {field.label} <span style={{ color: '#CC0000' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name={field.name}
                      placeholder={field.placeholder}
                      required
                      value={formData[field.name]}
                      onChange={handleInput}
                      style={{
                        width: '100%', padding: '14px 16px',
                        background: '#0E0E0E',
                        border: '1px solid rgba(255,255,255,0.07)',
                        color: '#F5F0E8', fontSize: '14px',
                        fontFamily: 'Inter, sans-serif', fontWeight: 300,
                        outline: 'none', borderRadius: '2px',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={e => e.target.style.borderColor = '#CC0000'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.07)'}
                    />
                  </div>
                ))}
              </div>

              {/* Member names textarea */}
              <div>
                <label style={{
                  display: 'block', color: '#3A3A3A', fontSize: '9px',
                  letterSpacing: '0.3em', textTransform: 'uppercase',
                  fontFamily: 'Inter, sans-serif', marginBottom: '8px',
                }}>
                  All Member Names <span style={{ color: '#CC0000' }}>*</span>
                </label>
                <textarea
                  name="message"
                  placeholder="List all team member names, one per line"
                  required
                  value={formData.message}
                  onChange={handleInput}
                  rows={5}
                  style={{
                    width: '100%', padding: '14px 16px',
                    background: '#0E0E0E',
                    border: '1px solid rgba(255,255,255,0.07)',
                    color: '#F5F0E8', fontSize: '14px',
                    fontFamily: 'Inter, sans-serif', fontWeight: 300,
                    outline: 'none', borderRadius: '2px',
                    boxSizing: 'border-box', resize: 'vertical',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = '#CC0000'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.07)'}
                />
              </div>
            </div>
          )}

          {/* Payment Screenshot Upload */}
          <div style={{ marginBottom: '36px' }}>
            <div style={{
              color: '#3A3A3A', fontSize: '9px',
              letterSpacing: '0.45em', textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif', fontWeight: 600,
              marginBottom: '20px',
            }}>
              Payment Screenshot <span style={{ color: '#CC0000' }}>*</span>
            </div>

            <div
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById('screenshot-upload').click()}
              style={{
                border: dragOver
                  ? '1px solid #CC0000'
                  : screenshot
                    ? '1px solid rgba(184,150,12,0.4)'
                    : '1px dashed rgba(255,255,255,0.1)',
                background: dragOver
                  ? 'rgba(204,0,0,0.04)'
                  : screenshot
                    ? 'rgba(184,150,12,0.04)'
                    : '#0E0E0E',
                borderRadius: '2px', padding: '36px 24px',
                textAlign: 'center', cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <input
                id="screenshot-upload"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={e => handleFile(e.target.files[0])}
              />

              {screenshot ? (
                <>
                  <CheckCircle size={28} color="#B8960C" style={{ marginBottom: '12px' }} />
                  <div style={{
                    color: '#B8960C', fontSize: '13px',
                    fontFamily: 'Inter, sans-serif', fontWeight: 500,
                    marginBottom: '4px',
                  }}>
                    {screenshotName}
                  </div>
                  <div style={{
                    color: '#3A3A3A', fontSize: '10px',
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                  }}>
                    Click to change
                  </div>
                </>
              ) : (
                <>
                  <Upload size={28} color="#3A3A3A" style={{ marginBottom: '12px' }} />
                  <div style={{
                    color: '#6B6B6B', fontSize: '13px',
                    fontFamily: 'Inter, sans-serif', fontWeight: 400,
                    marginBottom: '6px',
                  }}>
                    Drop your payment screenshot here
                  </div>
                  <div style={{
                    color: '#3A3A3A', fontSize: '10px',
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                  }}>
                    or click to browse · JPG, PNG, WEBP · Max 5MB
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: 'rgba(204,0,0,0.08)',
              border: '1px solid rgba(204,0,0,0.25)',
              padding: '14px 18px', marginBottom: '24px',
              borderRadius: '2px',
            }}>
              <AlertCircle size={16} color="#CC0000" />
              <span style={{
                color: '#CC0000', fontSize: '12px',
                fontFamily: 'Inter, sans-serif',
              }}>
                {error}
              </span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            style={{
              width: '100%', padding: '18px',
              background: submitting ? '#2A0000' : '#CC0000',
              border: 'none', color: '#F5F0E8',
              fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.3em', textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif', cursor: submitting ? 'not-allowed' : 'pointer',
              borderRadius: '2px', display: 'flex',
              alignItems: 'center', justifyContent: 'center', gap: '10px',
              boxShadow: submitting ? 'none' : '0 0 32px rgba(204,0,0,0.25)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => { if (!submitting) e.currentTarget.style.boxShadow = '0 0 48px rgba(204,0,0,0.45)'; }}
            onMouseLeave={e => { if (!submitting) e.currentTarget.style.boxShadow = '0 0 32px rgba(204,0,0,0.25)'; }}
          >
            {submitting ? (
              <>
                <div style={{
                  width: '14px', height: '14px',
                  border: '2px solid rgba(255,255,255,0.2)',
                  borderTopColor: '#fff', borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }} />
                Submitting...
              </>
            ) : (
              <>
                Submit Registration <ArrowRight size={16} />
              </>
            )}
          </button>

          {/* ── OR Google Forms ─────────────────────────── */}
          <div style={{ marginTop: '32px' }}>
            {/* Divider */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '16px',
              marginBottom: '24px',
            }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
              <span style={{
                color: '#3A3A3A', fontSize: '10px',
                letterSpacing: '0.3em', textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif',
              }}>
                or
              </span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
            </div>

            {/* Google Forms button */}
            <a
              href="https://forms.gle/your-google-form-link"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: '14px',
                width: '100%', padding: '16px',
                background: '#0E0E0E',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#9CA3AF', textDecoration: 'none',
                fontSize: '12px', fontWeight: 500,
                letterSpacing: '0.1em',
                fontFamily: 'Inter, sans-serif',
                borderRadius: '2px',
                transition: 'all 0.25s ease',
                boxSizing: 'border-box',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
                e.currentTarget.style.color = '#F5F0E8';
                e.currentTarget.style.background = '#141414';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.color = '#9CA3AF';
                e.currentTarget.style.background = '#0E0E0E';
              }}
            >
              {/* Google Logo SVG */}
              <svg width="18" height="18" viewBox="0 0 48 48" style={{ flexShrink: 0 }}>
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                <path fill="none" d="M0 0h48v48H0z" />
              </svg>
              Register via Google Forms
            </a>

            <p style={{
              textAlign: 'center', marginTop: '12px',
              color: '#2A2A2A', fontSize: '11px',
              fontFamily: 'Inter, sans-serif',
            }}>
              Alternative registration method — same process, different platform
            </p>
          </div>

          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
            input::placeholder, textarea::placeholder {
              color: #2A2A2A;
            }
          `}</style>
        </form>

        {/* ── RIGHT — Payment QR + Info ──────────────────── */}
        <div style={{ position: 'sticky', top: '100px' }}>

          {/* QR Code Box */}
          <div style={{
            border: '1px solid rgba(255,255,255,0.07)',
            background: '#0E0E0E', marginBottom: '24px',
            overflow: 'hidden',
          }}>
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center', gap: '12px',
            }}>
              <div style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: '#CC0000',
                boxShadow: '0 0 8px rgba(204,0,0,0.6)',
              }} />
              <span style={{
                color: '#CC0000', fontSize: '9px',
                letterSpacing: '0.4em', textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif', fontWeight: 700,
              }}>
                Payment Required
              </span>
            </div>

            {/* QR Image */}
            <div style={{
              padding: '32px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              background: '#F5F0E8',
            }}>
              <img
                src="/images/payment-qr.jpeg"
                alt="Payment QR Code"
                onError={e => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
                style={{
                  width: '200px', height: '200px',
                  objectFit: 'contain',
                }}
              />
              {/* Fallback if QR not added yet */}
              <div style={{
                display: 'none', width: '200px', height: '200px',
                flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                background: '#1A1A1A', gap: '12px',
              }}>
                <div style={{
                  width: '60px', height: '60px',
                  border: '2px dashed #3A3A3A',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <span style={{
                    color: '#3A3A3A', fontSize: '9px',
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    fontFamily: 'Inter, sans-serif', textAlign: 'center',
                    padding: '8px',
                  }}>
                    QR
                  </span>
                </div>
                <span style={{
                  color: '#3A3A3A', fontSize: '9px',
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  fontFamily: 'Inter, sans-serif', textAlign: 'center',
                }}>
                  Add payment-qr.png to /images/
                </span>
              </div>
            </div>

            <div style={{ padding: '20px 24px' }}>
              <div style={{
                color: '#3A3A3A', fontSize: '9px',
                letterSpacing: '0.3em', textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif', marginBottom: '8px',
              }}>
                Instructions
              </div>
              <div style={{
                display: 'flex', flexDirection: 'column', gap: '10px',
              }}>
                {[
                  'Scan the QR code above with any UPI app',
                  'Pay the registration fee for your event',
                  'Take a screenshot of the payment confirmation',
                  'Upload the screenshot in the form',
                ].map((step, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: '12px', alignItems: 'flex-start',
                  }}>
                    <span style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: 'italic', color: '#CC0000',
                      fontSize: '13px', minWidth: '16px', marginTop: '1px',
                    }}>
                      {i + 1}
                    </span>
                    <span style={{
                      color: '#6B6B6B', fontSize: '12px',
                      fontFamily: 'Inter, sans-serif', fontWeight: 300,
                      lineHeight: '1.6',
                    }}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Fee summary */}
          {selectedEventData && (
            <div style={{
              border: '1px solid rgba(184,150,12,0.2)',
              background: 'rgba(184,150,12,0.03)',
              padding: '24px',
            }}>
              <div style={{
                color: '#3A3A3A', fontSize: '9px',
                letterSpacing: '0.35em', textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif', marginBottom: '16px',
              }}>
                Selected Event
              </div>
              <div style={{
                fontFamily: "'Cormorant', serif",
                fontWeight: 700, fontSize: '24px',
                color: '#F5F0E8', marginBottom: '4px',
              }}>
                {selectedEventData.title}
              </div>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                marginTop: '16px', paddingTop: '16px',
                borderTop: '1px solid rgba(255,255,255,0.05)',
              }}>
                <span style={{
                  color: '#3A3A3A', fontSize: '10px',
                  fontFamily: 'Inter, sans-serif', letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}>
                  Registration Fee
                </span>
                <span style={{
                  color: '#B8960C', fontFamily: "'Cormorant', serif",
                  fontWeight: 700, fontSize: '20px',
                }}>
                  {selectedEventData.reg}
                </span>
              </div>
            </div>
          )}

          {/* Contact note */}
          <div style={{
            marginTop: '16px', padding: '16px 20px',
            background: '#0E0E0E',
            border: '1px solid rgba(255,255,255,0.05)',
          }}>
            <p style={{
              color: '#3A3A3A', fontSize: '11px',
              fontFamily: 'Inter, sans-serif', lineHeight: '1.7',
            }}>
              Questions? Write to{' '}
              <a href="mailto:Osmiumosm@gmail.com" style={{
                color: '#CC0000', textDecoration: 'none',
              }}>
                Osmiumosm@gmail.com
              </a>
              {' '}or call{' '}
              <a href="tel:+919057254349" style={{
                color: '#CC0000', textDecoration: 'none',
              }}>
                +91 90572 54349
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
