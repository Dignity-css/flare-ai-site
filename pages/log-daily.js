import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function LogDailyIntro() {
  const router = useRouter();
  const [tip, setTip] = useState('Track daily to uncover your skin’s patterns.');
  const [streak, setStreak] = useState(0);
  const [lastLog, setLastLog] = useState(null);
  const [name, setName] = useState('');
  const [motivationalMessage, setMotivationalMessage] = useState('');

  useEffect(() => {
    // Check if onboarding is complete
    const storedName = localStorage.getItem('name');
    if (!storedName) {
      router.push('/intro');
    } else {
      setName(storedName);
    }

    // Set dynamic tip based on triggers
    const triggers = JSON.parse(localStorage.getItem('triggers') || '[]');
    if (triggers.includes('Stress')) {
      setTip('🧘 Breathe. Reducing stress can calm flare-ups.');
    } else if (triggers.includes('Dryness')) {
      setTip('💧 Moisturize daily to stay ahead of dryness.');
    } else if (triggers.includes('Dairy')) {
      setTip('🥛 Consider cutting back on dairy to see improvements.');
    }

    // Calculate logging streak and last log
    const logs = JSON.parse(localStorage.getItem('logs') || '[]');
    if (logs.length) {
      let streakCount = 1;
      const sortedLogs = logs.sort((a, b) => new Date(b.date) - new Date(a.date));
      let lastDate = new Date(sortedLogs[0].date);
      setLastLog({ date: sortedLogs[0].date, itchLevel: sortedLogs[0].itchLevel });

      for (let i = 1; i < sortedLogs.length; i++) {
        const currentDate = new Date(sortedLogs[i].date);
        const diffDays = (lastDate - currentDate) / (1000 * 60 * 60 * 24);
        if (diffDays === 1) {
          streakCount++;
          lastDate = currentDate;
        } else if (diffDays > 1) break;
      }
      setStreak(streakCount);
    }

    // Set random motivational message
    const messages = [
      'Keep logging to master your skin health! 🌟',
      'Your daily check-in powers Flare AI’s insights! 🚀',
      'Stay consistent to uncover your flare patterns! 💪',
    ];
    setMotivationalMessage(messages[Math.floor(Math.random() * messages.length)]);
  }, [router]);

  const handleButtonClick = (path) => {
    if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in window.navigator) {
      window.navigator.vibrate(50); // Subtle haptic feedback
    }
    router.push(path);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '2rem 1.25rem 6rem',
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
        <title>Daily Log | Flare AI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#5C4033" />
        <meta name="description" content="Flare AI: Start your daily skin health check-in" />
        <link rel="apple-touch-icon" href="/flare-logo.png" />
      </Head>

      {/* Greeting + Date */}
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          marginBottom: '1.5rem',
          animation: 'fadeIn 0.5s ease-in-out',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
          <button
            onClick={() => handleButtonClick('/home')}
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
            aria-label="Back to home"
          >
            ← Back
          </button>
        </div>
        <p
          style={{
            fontSize: '0.85rem',
            fontWeight: '500',
            color: 'var(--secondary-text)',
            animation: 'fadeIn 0.5s ease-in-out 0.1s both',
          }}
        >
          📅 {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
          })}
        </p>
        <h1
          style={{
            fontSize: '1.6rem',
            fontWeight: '700',
            color: 'var(--text-color)',
            animation: 'fadeIn 0.5s ease-in-out 0.2s both',
          }}
        >
          Hey {name || 'there'} 👋
        </h1>
      </div>

      {/* Log Card */}
      <div
        style={{
          width: '100%',
          maxWidth: '380px',
          background: 'linear-gradient(145deg, #FFFFFF, #F8F6F2)',
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
          textAlign: 'center',
          marginBottom: '1.5rem',
          animation: 'fadeIn 0.5s ease-in-out 0.3s both',
        }}
      >
        <h2
          style={{
            fontSize: '1.3rem',
            fontWeight: '600',
            marginBottom: '0.75rem',
            color: 'var(--text-color)',
          }}
        >
          Start Your Daily Log
        </h2>
        <p
          style={{
            fontSize: '0.9rem',
            color: 'var(--secondary-text)',
            marginBottom: '1rem',
          }}
        >
          {motivationalMessage}
        </p>
        <div
          style={{
            position: 'relative',
            width: '90px',
            height: '90px',
            margin: '0 auto 1rem',
            animation: 'pulse 0.5s ease-in-out',
          }}
          aria-label={`Logging streak: ${streak} days`}
        >
          <svg width="90" height="90" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="36" fill="none" stroke="var(--dot-inactive)" strokeWidth="8" />
            <circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="var(--primary-color)"
              strokeWidth="8"
              strokeDasharray="226.195"
              strokeDashoffset={226.195 * (1 - Math.min(streak / 7, 1))}
              transform="rotate(-90 40 40)"
            />
            <text
              x="40"
              y="45"
              textAnchor="middle"
              fontSize="16"
              fontWeight="700"
              fill="var(--text-color)"
              style={{ animation: streak >= 3 ? 'emojiRotate 2s infinite linear' : 'none' }}
            >
              {streak}d {streak >= 7 ? '🔥' : streak >= 3 ? '☕' : ''}
            </text>
          </svg>
        </div>
        <p
          style={{
            fontSize: '0.9rem',
            color: 'var(--secondary-text)',
            marginBottom: '1rem',
          }}
        >
          {streak > 0 ? `You're on a ${streak}-day streak!` : 'Start your streak today!'}
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
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
        <button
          onClick={() => handleButtonClick('/log-status')}
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
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          aria-label="Start daily log"
        >
          Start My Daily Log
        </button>
      </div>

      {/* Quick Stats */}
      {(lastLog || streak > 0) && (
        <div
          style={{
            background: 'linear-gradient(145deg, #FFFFFF, #F8F6F2)',
            borderRadius: '12px',
            padding: '1rem',
            boxShadow: '0 3px 10px rgba(0, 0, 0, 0.05)',
            marginBottom: '1.5rem',
            width: '100%',
            maxWidth: '380px',
            animation: 'fadeIn 0.5s ease-in-out 0.4s both',
          }}
        >
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: '600',
              marginBottom: '0.75rem',
              color: 'var(--secondary-text)',
            }}
          >
            Quick Stats
          </h3>
          {lastLog && (
            <p style={{ fontSize: '0.85rem', color: 'var(--secondary-text)' }}>
              Last Log: {lastLog.date}, Itch: {lastLog.itchLevel}
            </p>
          )}
          <p style={{ fontSize: '0.85rem', color: 'var(--secondary-text)' }}>
            Streak: {streak} day{streak !== 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* Sticky Note Tip */}
      <div
        style={{
          background: '#F9E6C8',
          borderRadius: '12px',
          padding: '1rem',
          boxShadow: '2px 4px 8px rgba(0, 0, 0, 0.08)',
          width: '100%',
          maxWidth: '380px',
          transform: 'rotate(-1deg)',
          animation: 'fadeIn 0.5s ease-in-out 0.5s both',
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

      {/* Bottom Nav */}
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
            onClick={() => handleButtonClick(nav.path)}
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
        @keyframes emojiRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        button:focus {
          outline: 2px solid var(--primary-color);
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}