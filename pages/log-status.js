import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function LogStatus() {
  const router = useRouter();
  const [itchLevel, setItchLevel] = useState(5);
  const [sleepImpact, setSleepImpact] = useState('');
  const [inflammation, setInflammation] = useState('');
  const [flareToday, setFlareToday] = useState('');
  const [flareZone, setFlareZone] = useState('');
  const [validationError, setValidationError] = useState('');
  const [tip, setTip] = useState('Log your skin status to track flare patterns.');

  useEffect(() => {
    // Dynamic tip based on triggers or itch level
    const triggers = JSON.parse(localStorage.getItem('triggers') || '[]');
    if (itchLevel >= 7) {
      setTip('High itch? Try a soothing moisturizer and log triggers next.');
    } else if (triggers.includes('Stress')) {
      setTip('Stress can worsen flares. Log your status to stay on top.');
    } else if (triggers.includes('Dryness')) {
      setTip('Dryness can irritate skin. Track your status daily.');
    }
  }, [itchLevel]);

  const handleNext = () => {
    if (!sleepImpact || !inflammation || !flareToday || (flareToday === 'yes' && !flareZone)) {
      setValidationError('Please fill out all fields' + (flareToday === 'yes' ? ' and select a flare zone.' : '.'));
      return;
    }
    localStorage.setItem('log-status', JSON.stringify({
      itchLevel,
      sleepImpact,
      inflammation,
      flareToday,
      flareZone
    }));
    if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in window.navigator) {
      window.navigator.vibrate(50); // Haptic feedback
    }
    router.push('/log-barrier');
  };

  const selectStyle = {
    width: '100%',
    padding: '0.75rem',
    marginTop: '0.5rem',
    borderRadius: '12px',
    border: `1px solid ${validationError && !sleepImpact ? '#D9534F' : 'var(--dot-inactive)'}`,
    background: '#FFFFFF',
    fontSize: '0.9rem',
    color: 'var(--text-color)',
    transition: 'border-color 0.3s',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1.5rem 1.25rem 6rem',
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
        <title>Skin Status | Flare AI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#5C4033" />
        <meta name="description" content="Flare AI: Log your skin status" />
        <link rel="apple-touch-icon" href="/flare-logo.png" />
      </Head>

      <div style={{ width: '100%', maxWidth: '380px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
          <button
            onClick={() => {
              if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in window.navigator) {
                window.navigator.vibrate(50);
              }
              router.push('/log-daily');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary-color)',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer',
              padding: '0.5rem',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            aria-label="Back to daily log"
          >
            ← Back
          </button>
          <h1
            style={{
              fontSize: '1.6rem',
              fontWeight: '700',
              color: 'var(--text-color)',
              textAlign: 'center',
              flex: 1,
              animation: 'fadeIn 0.5s ease-in-out',
            }}
          >
            Skin Status
          </h1>
        </div>

        <div
          style={{
            background: 'linear-gradient(145deg, #FFFFFF, #F8F6F2)',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
            animation: 'fadeIn 0.5s ease-in-out 0.2s both',
          }}
        >
          <svg
            width="56"
            height="56"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--primary-color)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ margin: '0 auto 1rem', display: 'block' }}
            aria-label="Skin status icon"
          >
            <path d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2z" />
            <path d="M12 6v6l4 2" />
          </svg>

          <label
            style={{
              display: 'block',
              marginBottom: '1.5rem',
              animation: 'fadeIn 0.5s ease-in-out 0.3s both',
            }}
          >
            <span style={{ fontSize: '0.9rem', color: 'var(--secondary-text)' }}>
              Itch level (0–10)
            </span>
            <div
              style={{
                position: 'relative',
                width: '120px',
                height: '120px',
                margin: '0.5rem auto',
              }}
              aria-label={`Itch level: ${itchLevel}`}
            >
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="var(--dot-inactive)"
                  strokeWidth="12"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke={itchLevel >= 7 ? '#D9534F' : itchLevel >= 4 ? '#FFC107' : '#4CAF50'}
                  strokeWidth="12"
                  strokeDasharray="339.292"
                  strokeDashoffset={339.292 * (1 - itchLevel / 10)}
                  transform="rotate(-90 60 60)"
                />
                <text
                  x="60"
                  y="65"
                  textAnchor="middle"
                  fontSize="24"
                  fontWeight="700"
                  fill="var(--text-color)"
                >
                  {itchLevel}
                </text>
              </svg>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={itchLevel}
              onChange={(e) => {
                setItchLevel(Number(e.target.value));
                if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in window.navigator) {
                  window.navigator.vibrate(20);
                }
              }}
              style={{
                width: '100%',
                marginTop: '0.5rem',
                accentColor: 'var(--primary-color)',
                animation: 'pulse 0.5s ease-in-out',
              }}
              aria-label="Itch level slider"
            />
          </label>

          <label
            style={{
              display: 'block',
              marginBottom: '1.5rem',
              animation: 'fadeIn 0.5s ease-in-out 0.4s both',
            }}
          >
            <span style={{ fontSize: '0.9rem', color: 'var(--secondary-text)' }}>
              How did sleep affect your skin?
            </span>
            <select
              value={sleepImpact}
              onChange={(e) => setSleepImpact(e.target.value)}
              style={selectStyle}
              aria-label="Sleep impact on skin"
              aria-invalid={validationError && !sleepImpact}
            >
              <option value="">Select one</option>
              <option value="rested">Felt rested and skin feels better</option>
              <option value="interrupted">Woke up a few times</option>
              <option value="poor">Barely slept, felt irritated</option>
            </select>
          </label>

          <label
            style={{
              display: 'block',
              marginBottom: '1.5rem',
              animation: 'fadeIn 0.5s ease-in-out 0.5s both',
            }}
          >
            <span style={{ fontSize: '0.9rem', color: 'var(--secondary-text)' }}>
              Any burning, stinging, or tenderness today?
            </span>
            <select
              value={inflammation}
              onChange={(e) => setInflammation(e.target.value)}
              style={selectStyle}
              aria-label="Inflammation symptoms"
              aria-invalid={validationError && !inflammation}
            >
              <option value="">Select one</option>
              <option value="yes">Yes, uncomfortable</option>
              <option value="no">No discomfort</option>
            </select>
          </label>

          <label
            style={{
              display: 'block',
              marginBottom: '1.5rem',
              animation: 'fadeIn 0.5s ease-in-out 0.6s both',
            }}
          >
            <span style={{ fontSize: '0.9rem', color: 'var(--secondary-text)' }}>
              Did you experience a flare-up today?
            </span>
            <select
              value={flareToday}
              onChange={(e) => setFlareToday(e.target.value)}
              style={selectStyle}
              aria-label="Flare-up today"
              aria-invalid={validationError && !flareToday}
            >
              <option value="">Select one</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="unsure">Not sure</option>
            </select>
          </label>

          {flareToday === 'yes' && (
            <label
              style={{
                display: 'block',
                marginBottom: '1.5rem',
                animation: 'fadeIn 0.5s ease-in-out 0.7s both',
              }}
            >
              <span style={{ fontSize: '0.9rem', color: 'var(--secondary-text)' }}>
                Where was the flare-up?
              </span>
              <select
                value={flareZone}
                onChange={(e) => setFlareZone(e.target.value)}
                style={{
                  ...selectStyle,
                  border: `1px solid ${validationError && !flareZone ? '#D9534F' : 'var(--dot-inactive)'}`,
                }}
                aria-label="Flare-up location"
                aria-invalid={validationError && !flareZone}
              >
                <option value="">Choose location</option>
                <option>Face</option>
                <option>Neck</option>
                <option>Arms</option>
                <option>Legs</option>
                <option>Hands</option>
                <option>Torso</option>
                <option>Scalp</option>
                <option>Multiple areas</option>
              </select>
            </label>
          )}

          {validationError && (
            <p
              style={{
                fontSize: '0.85rem',
                color: '#D9534F',
                marginBottom: '1rem',
                animation: 'fadeIn 0.5s ease-in-out 0.8s both',
              }}
            >
              {validationError}
            </p>
          )}

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: '1rem',
              animation: 'fadeIn 0.5s ease-in-out 0.9s both',
            }}
            aria-label="Logging flow progress"
          >
            {['Status', 'Triggers', 'Confirm'].map((step, idx) => (
              <div
                key={idx}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: idx === 0 ? 'var(--primary-color)' : 'var(--dot-inactive)',
                  transition: 'background 0.3s',
                }}
              />
            ))}
          </div>

          <p
            style={{
              fontSize: '0.9rem',
              color: 'var(--secondary-text)',
              marginBottom: '1rem',
              animation: 'fadeIn 0.5s ease-in-out 1s both',
            }}
          >
            You’re one step closer to understanding your skin! 🌟
          </p>

          <button
            onClick={handleNext}
            style={{
              background: 'var(--primary-color)',
              color: '#FFFFFF',
              fontWeight: '600',
              fontSize: '1rem',
              padding: '0.75rem',
              width: '100%',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              boxShadow: '0 3px 10px rgba(0, 0, 0, 0.05)',
              transition: 'transform 0.2s, background-color 0.3s',
              animation: 'fadeIn 0.5s ease-in-out 1.1s both',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            aria-label="Next step"
          >
            Next
          </button>
        </div>

        <div
          style={{
            background: '#F9E6C8',
            borderRadius: '12px',
            padding: '1rem',
            boxShadow: '2px 4px 8px rgba(0, 0, 0, 0.08)',
            width: '100%',
            maxWidth: '380px',
            transform: 'rotate(-1deg)',
            marginTop: '1.5rem',
            animation: 'fadeIn 0.5s ease-in-out 1.2s both',
          }}
        >
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: 'var(--accent-color)',
            }}
          >
            💡 Daily Tip
          </h3>
          <p
            style={{
              fontSize: '0.9rem',
              color: 'var(--text-color)',
              lineHeight: '1.4',
            }}
          >
            {tip}
          </p>
        </div>
      </div>

      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(250, 247, 242, 0.9)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          justifyContent: 'space-around',
          padding: '0.75rem 0',
          boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.05)',
          zIndex: 3,
        }}
      >
        {[
          { label: 'Home', icon: '🏠', path: '/home' },
          { label: 'Log', icon: '📝', path: '/log-daily' },
          { label: 'History', icon: '📊', path: '/history' },
          { label: 'Settings', icon: '⚙️', path: '/settings' },
        ].map((nav, i) => (
          <button
            key={i}
            onClick={() => {
              if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in window.navigator) {
                window.navigator.vibrate(50);
              }
              router.push(nav.path);
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: nav.label === 'Log' ? 'var(--primary-color)' : 'none',
              color: nav.label === 'Log' ? '#FFF' : 'var(--secondary-text)',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.75rem',
              padding: '0.5rem',
              width: '60px',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            aria-label={nav.label}
          >
            <span style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{nav.icon}</span>
            {nav.label}
          </button>
        ))}
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
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
        input[type="range"]::-webkit-slider-thumb {
          animation: pulse 0.5s ease-in-out;
        }
        input[type="range"]::-moz-range-thumb {
          animation: pulse 0.5s ease-in-out;
        }
        button:focus,
        select:focus,
        input:focus {
          outline: 2px solid var(--primary-color);
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}