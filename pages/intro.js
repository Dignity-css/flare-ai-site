import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Intro() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [condition, setCondition] = useState('');
  const [customCondition, setCustomCondition] = useState('');
  const [skinTone, setSkinTone] = useState('');
  const [triggers, setTriggers] = useState([]);
  const [openSections, setOpenSections] = useState({
    seasonal: false,
    lifestyle: false,
    mental: false,
  });

  const toggleTrigger = (value) => {
    setTriggers((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSubmit = () => {
    localStorage.setItem('name', name);
    localStorage.setItem(
      'condition',
      condition === 'other' ? customCondition : condition
    );
    localStorage.setItem('skinTone', skinTone);
    localStorage.setItem('triggers', JSON.stringify(triggers));
    localStorage.setItem('completedIntro', 'true');
    router.push('/home');
  };

  const TRIGGER_GROUPS = {
    seasonal: ['Cold', 'Heat', 'Rain', 'Dryness'],
    lifestyle: ['Alcohol', 'Smoking', 'Exercise'],
    mental: ['Anxiety'],
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1.5rem',
        background: 'linear-gradient(135deg, #EAD7C0 0%, #F5E6D3 100%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        '--primary-color': '#5C4033',
        '--accent-color': '#8C5C3A',
        '--text-color': '#2E2C29',
        '--secondary-text': '#6B5B4B',
        '--secondary-bg': '#E6D5C3',
        '--dot-inactive': '#C8B9A6',
      }}
    >
      <Head>
        <title>Skin Profile | Flare AI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#5C4033" />
        <meta name="description" content="Flare AI: Personalize your skin health profile" />
        <link rel="apple-touch-icon" href="/flare-logo.png" />
      </Head>

      <div
        style={{
          width: '100%',
          maxWidth: '380px',
          position: 'relative',
          padding: '1.25rem',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '0.75rem',
            left: '0.75rem',
            width: '100%',
            maxWidth: '356px',
            height: 'calc(100% - 1.5rem)',
            backgroundColor: 'var(--secondary-bg)',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '380px',
            padding: '1.5rem',
            backgroundColor: '#FAF7F2',
            borderRadius: '14px',
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)',
            textAlign: 'left',
            animation: 'fadeIn 0.5s ease-in-out',
            zIndex: 2,
          }}
        >
          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '1.5rem',
              textAlign: 'center',
              color: 'var(--text-color)',
            }}
          >
            Let’s personalize your experience
          </h1>

          <span
            style={{
              fontSize: '0.85rem',
              color: 'var(--secondary-text)',
              textAlign: 'center',
              display: 'block',
              marginBottom: '1rem',
            }}
          >
            Step 2 of 2
          </span>

          <label style={{ display: 'block', marginBottom: '1.25rem' }}>
            <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--secondary-text)' }}>
              Your name
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '0.9rem',
                background: '#FFFFFF',
                color: 'var(--text-color)',
                border: '1px solid var(--dot-inactive)',
                borderRadius: '8px',
                marginTop: '0.5rem',
                transition: 'border-color 0.3s',
              }}
              aria-label="Your name"
            />
          </label>

          <label style={{ display: 'block', marginBottom: '1.25rem' }}>
            <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--secondary-text)' }}>
              Select skin condition
            </span>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '0.9rem',
                background: '#FFFFFF',
                color: 'var(--text-color)',
                border: '1px solid var(--dot-inactive)',
                borderRadius: '8px',
                marginTop: '0.5rem',
                transition: 'border-color 0.3s',
              }}
              aria-label="Select skin condition"
            >
              <option value="">Choose one</option>
              <option value="eczema">Eczema</option>
              <option value="psoriasis">Psoriasis</option>
              <option value="acne">Acne</option>
              <option value="urticaria">Urticaria (Hives)</option>
              <option value="other">Other</option>
            </select>
          </label>

          {condition === 'other' && (
            <input
              type="text"
              value={customCondition}
              onChange={(e) => setCustomCondition(e.target.value)}
              placeholder="Type your condition"
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '0.9rem',
                background: '#FFFFFF',
                color: 'var(--text-color)',
                border: '1px solid var(--dot-inactive)',
                borderRadius: '8px',
                marginTop: '0.5rem',
                marginBottom: '1.25rem',
                transition: 'border-color 0.3s',
              }}
              aria-label="Custom skin condition"
            />
          )}

          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem', color: 'var(--secondary-text)' }}>
              Your skin tone
            </span>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {['#f9dcc4', '#e0ac69', '#c68642', '#8d5524', '#4b3621'].map((tone, idx) => (
                <div
                  key={idx}
                  onClick={() => setSkinTone(tone)}
                  style={{
                    backgroundColor: tone,
                    border: skinTone === tone ? '3px solid var(--primary-color)' : '2px solid var(--dot-inactive)',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    transition: 'border-color 0.3s, transform 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  aria-label={`Select skin tone ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem', color: 'var(--secondary-text)' }}>
              What usually triggers your flare-ups?
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {Object.entries(TRIGGER_GROUPS).map(([section, items], idx) => (
                <div key={idx}>
                  <button
                    onClick={() => toggleSection(section)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: openSections[section] ? '#FFFFFF' : 'var(--text-color)',
                      backgroundColor: openSections[section] ? 'var(--accent-color)' : '#FFFFFF',
                      border: '1px solid var(--dot-inactive)',
                      borderRadius: '8px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'background-color 0.3s',
                    }}
                    aria-expanded={openSections[section]}
                    aria-label={`Toggle ${section} triggers`}
                  >
                    <span>
                      {section === 'seasonal'
                        ? 'Seasonal/Weather Triggers'
                        : section === 'lifestyle'
                        ? 'Lifestyle Triggers'
                        : 'Mental Health Triggers'}
                    </span>
                    <span>{openSections[section] ? '−' : '+'}</span>
                  </button>
                  {openSections[section] && (
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                        padding: '0.75rem',
                        background: '#FFFFFF',
                        border: '1px solid var(--dot-inactive)',
                        borderRadius: '8px',
                        marginTop: '0.5rem',
                      }}
                    >
                      {items.map((trigger, triggerIdx) => (
                        <button
                          key={triggerIdx}
                          type="button"
                          onClick={() => toggleTrigger(trigger)}
                          style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '999px',
                            border: triggers.includes(trigger)
                              ? 'none'
                              : '1px solid var(--dot-inactive)',
                            backgroundColor: triggers.includes(trigger)
                              ? 'var(--accent-color)'
                              : '#FFFFFF',
                            color: triggers.includes(trigger) ? '#FFFFFF' : 'var(--text-color)',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            transition: 'background-color 0.3s, transform 0.2s',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                          aria-label={`Toggle ${trigger} trigger`}
                        >
                          {trigger}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            style={{
              backgroundColor: 'var(--primary-color)',
              color: '#FFFFFF',
              fontWeight: '600',
              fontSize: '1rem',
              padding: '0.75rem',
              width: '100%',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'transform 0.2s, background-color 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            aria-label="Finish personalization"
          >
            Finish
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        input:focus,
        select:focus,
        button:focus {
          outline: 2px solid var(--primary-color);
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}