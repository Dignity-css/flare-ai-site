import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SleepPage() {
  const router = useRouter();
  const [sleepHours, setSleepHours] = useState('');
  const [validationError, setValidationError] = useState('');
  const [tip, setTip] = useState('Consistent sleep improves skin barrier function. Aim for 7-9 hours nightly.');

  useEffect(() => {
    if (sleepHours) {
      const hours = Number(sleepHours);
      if (hours < 1 || hours > 24) {
        setValidationError('Please enter 1-24 hours.');
      } else {
        setValidationError('');
      }

      const triggers = JSON.parse(localStorage.getItem('triggers') || '[]');
      if (hours >= 7 && hours <= 9) {
        setTip('Great sleep! 7-9 hours supports optimal skin health.');
      } else if (triggers.includes('Stress') && hours < 7) {
        setTip('Poor sleep can worsen stress-related flares. Try relaxing before bed.');
      } else if (triggers.includes('Dryness') && hours < 7) {
        setTip('Low sleep may increase skin dryness. Aim for 7-9 hours.');
      } else if (hours < 7) {
        setTip('Less than 7 hours may impact skin recovery. Try for more rest.');
      } else if (hours > 9) {
        setTip('Over 9 hours? Ensure quality sleep for healthy skin.');
      }
    } else {
      setValidationError('');
      setTip('Consistent sleep improves skin barrier function. Aim for 7-9 hours nightly.');
    }
  }, [sleepHours]);

  const handleSubmit = () => {
    const hours = Number(sleepHours);
    if (hours >= 1 && hours <= 24) {
      localStorage.setItem('sleep', sleepHours);
      router.push('/home');
    } else {
      setValidationError('Please enter 1-24 hours.');
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 0 && Number(value) <= 24)) {
      setSleepHours(value);
    }
  };

  const sleepQualityColor = sleepHours >= 7 && sleepHours <= 9 ? '#4CAF50' : '#FFC107';

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1.5rem 1.25rem',
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
        <title>Sleep | Flare AI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#5C4033" />
        <meta name="description" content="Flare AI: Log your sleep hours" />
        <link rel="apple-touch-icon" href="/flare-logo.png" />
      </Head>

      <div
        style={{
          width: '100%',
          maxWidth: '380px',
          background: 'linear-gradient(145deg, #FFFFFF, #F8F6F2)',
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
          textAlign: 'center',
          animation: 'fadeIn 0.5s ease-in-out',
        }}
      >
        <button
          onClick={() => router.push('/home')}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--primary-color)',
            fontSize: '0.9rem',
            fontWeight: '600',
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          aria-label="Back to home"
        >
          ← Back
        </button>

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
          aria-label="Sleep icon"
        >
          <path d="M12 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10 10 10 0 0 0 10-10 10 10 0 0 0-10-10zm0 18a8 8 0 0 1-8-8 8 8 0 0 1 8-8 8 8 0 0 1 8 8 8 8 0 0 1-8 8z" />
          <path d="M12 6v6l4 2" />
        </svg>

        <h2
          style={{
            fontSize: '1.3rem',
            fontWeight: '600',
            marginBottom: '0.5rem',
            color: 'var(--text-color)',
          }}
        >
          Log Your Sleep
        </h2>
        <p
          style={{
            fontSize: '0.9rem',
            color: 'var(--secondary-text)',
            marginBottom: '1.5rem',
          }}
        >
          How many hours did you sleep last night?
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
          }}
        >
          <button
            onClick={() => setSleepHours((prev) => Math.max(1, Number(prev) - 1))}
            style={{
              background: 'var(--dot-inactive)',
              color: 'var(--text-color)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              fontSize: '1.2rem',
              cursor: 'pointer',
              transition: 'transform 0.2s, background-color 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            aria-label="Decrease sleep hours"
          >
            −
          </button>
          <input
            type="number"
            value={sleepHours}
            onChange={handleInputChange}
            placeholder="e.g. 7"
            style={{
              width: '100px',
              padding: '0.75rem',
              fontSize: '1rem',
              textAlign: 'center',
              background: '#FFFFFF',
              color: 'var(--text-color)',
              border: `1px solid ${validationError ? '#D9534F' : 'var(--dot-inactive)'}`,
              borderRadius: '12px',
              transition: 'border-color 0.3s',
            }}
            aria-label="Hours of sleep"
            aria-invalid={!!validationError}
            aria-describedby="validation-error"
          />
          <button
            onClick={() => setSleepHours((prev) => Math.min(24, Number(prev) + 1))}
            style={{
              background: 'var(--dot-inactive)',
              color: 'var(--text-color)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              fontSize: '1.2rem',
              cursor: 'pointer',
              transition: 'transform 0.2s, background-color 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            aria-label="Increase sleep hours"
          >
            +
          </button>
        </div>

        {validationError && (
          <p
            id="validation-error"
            style={{
              fontSize: '0.85rem',
              color: '#D9534F',
              marginBottom: '1rem',
            }}
          >
            {validationError}
          </p>
        )}

        {sleepHours && !validationError && (
          <div
            style={{
              position: 'relative',
              width: '120px',
              height: '120px',
              margin: '0 auto 1rem',
              animation: 'pulse 0.5s ease-in-out',
            }}
            aria-label={`Sleep quality: ${sleepHours >= 7 && sleepHours <= 9 ? 'Optimal' : 'Suboptimal'}`}
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
                stroke={sleepQualityColor}
                strokeWidth="12"
                strokeDasharray="339.292"
                strokeDashoffset={sleepHours ? (339.292 * (1 - Math.min(sleepHours / 24, 1))) : 339.292}
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
                {sleepHours}h
              </text>
            </svg>
          </div>
        )}

        <button
          onClick={handleSubmit}
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
            marginBottom: '1.5rem',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          aria-label="Save sleep hours"
        >
          Save
        </button>

        <div
          style={{
            background: 'linear-gradient(145deg, #FFFFFF, #F8F6F2)',
            borderRadius: '12px',
            padding: '1rem',
            boxShadow: '0 3px 10px rgba(0, 0, 0, 0.05)',
            animation: 'fadeIn 0.5s ease-in-out 0.2s both',
          }}
        >
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: 'var(--secondary-text)',
            }}
          >
            Daily Tip
          </h3>
          <p
            style={{
              fontSize: '0.85rem',
              color: 'var(--secondary-text)',
              lineHeight: '1.4',
            }}
          >
            {tip}
          </p>
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
        input:focus,
        button:focus {
          outline: 2px solid var(--primary-color);
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}