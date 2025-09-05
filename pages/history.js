import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function History() {
  const router = useRouter();
  const [logs, setLogs] = useState([]);
  const [expandedLog, setExpandedLog] = useState(null);
  const [filter, setFilter] = useState('all');
  const [triggerFilter, setTriggerFilter] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('logs');
    if (stored) {
      setLogs(JSON.parse(stored).reverse()); // Newest first
    }
  }, []);

  const getUniqueTriggers = () => {
    const allTriggers = logs.flatMap((entry) => entry.foodTriggers || []);
    return [...new Set(allTriggers)];
  };

  const filteredLogs = logs.filter((entry) => {
    if (filter === '7days') {
      const date = new Date(entry.date);
      const now = new Date();
      const diffDays = (now - date) / (1000 * 60 * 60 * 24);
      if (diffDays > 7) return false;
    }
    if (triggerFilter && !entry.foodTriggers?.includes(triggerFilter)) {
      return false;
    }
    return true;
  });

  const averageItchLevel = logs.length
    ? (logs.reduce((sum, entry) => sum + Number(entry.itchLevel), 0) / logs.length).toFixed(1)
    : 0;

  const commonTrigger = logs.length
    ? Object.entries(
        logs
          .flatMap((entry) => entry.foodTriggers || [])
          .reduce((acc, trigger) => ({ ...acc, [trigger]: (acc[trigger] || 0) + 1 }), {})
      )
        .sort((a, b) => b[1] - a[1])[0]?.[0] || 'None'
    : 'None';

  const deleteLog = (index) => {
    const originalLogs = JSON.parse(localStorage.getItem('logs') || '[]');
    const updatedLogs = originalLogs.filter((_, i) => i !== (originalLogs.length - 1 - index));
    localStorage.setItem('logs', JSON.stringify(updatedLogs));
    setLogs(updatedLogs.reverse());
  };

  const getTrendData = () => {
    const recentLogs = logs.slice(0, 7).reverse(); // Last 7 logs, oldest to newest for chart
    return recentLogs.map((entry) => Number(entry.itchLevel) || 0);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.5rem 1.25rem 5rem',
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
        <title>Log History | Flare AI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#5C4033" />
        <meta name="description" content="Flare AI: View your skin health logs" />
        <link rel="apple-touch-icon" href="/flare-logo.png" />
      </Head>

      <div style={{ width: '100%', maxWidth: '380px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1.5rem',
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
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            aria-label="Back to home"
          >
            ← Back
          </button>
          <h1
            style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              color: 'var(--text-color)',
              textAlign: 'center',
              flex: 1,
            }}
          >
            📘 Log History
          </h1>
        </div>

        <div
          style={{
            background: 'linear-gradient(145deg, #FFFFFF, #F8F6F2)',
            borderRadius: '16px',
            padding: '1rem',
            boxShadow: '0 3px 10px rgba(0, 0, 0, 0.05)',
            marginBottom: '1.5rem',
            animation: 'fadeIn 0.5s ease-in-out',
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
            Summary
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--secondary-text)' }}>
            Average Itch Level: {averageItchLevel}
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--secondary-text)' }}>
            Most Common Trigger: {commonTrigger}
          </p>
          {logs.length > 1 && (
            <div
              style={{
                marginTop: '1rem',
                height: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="100%" height="80" viewBox="0 0 200 80" aria-label="Itch level trend">
                <polyline
                  fill="none"
                  stroke="var(--primary-color)"
                  strokeWidth="3"
                  points={getTrendData()
                    .map((value, i, arr) => {
                      const x = (i / (arr.length - 1)) * 180 + 10;
                      const y = 70 - (value / 10) * 60;
                      return `${x},${y}`;
                    })
                    .join(' ')}
                />
              </svg>
            </div>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
          }}
        >
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: '0.5rem',
              fontSize: '0.9rem',
              background: '#FFFFFF',
              color: 'var(--text-color)',
              border: '1px solid var(--dot-inactive)',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
            aria-label="Filter logs by time"
          >
            <option value="all">All Time</option>
            <option value="7days">Last 7 Days</option>
          </select>
          <select
            value={triggerFilter}
            onChange={(e) => setTriggerFilter(e.target.value)}
            style={{
              padding: '0.5rem',
              fontSize: '0.9rem',
              background: '#FFFFFF',
              color: 'var(--text-color)',
              border: '1px solid var(--dot-inactive)',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
            aria-label="Filter logs by trigger"
          >
            <option value="">All Triggers</option>
            {getUniqueTriggers().map((trigger) => (
              <option key={trigger} value={trigger}>
                {trigger}
              </option>
            ))}
          </select>
        </div>

        {filteredLogs.length === 0 ? (
          <div
            style={{
              background: 'linear-gradient(145deg, #FFFFFF, #F8F6F2)',
              borderRadius: '16px',
              padding: '1.5rem',
              boxShadow: '0 3px 10px rgba(0, 0, 0, 0.05)',
              textAlign: 'center',
              animation: 'fadeIn 0.5s ease-in-out 0.2s both',
            }}
          >
            <p style={{ fontSize: '0.9rem', color: 'var(--secondary-text)', marginBottom: '1rem' }}>
              No entries yet. Go log your day!
            </p>
            <button
              onClick={() => router.push('/log-daily')}
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
                transition: 'transform 0.2s, background-color 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              aria-label="Go to log daily page"
            >
              Log Now
            </button>
          </div>
        ) : (
          filteredLogs.map((entry, idx) => (
            <div
              key={idx}
              style={{
                background: 'linear-gradient(145deg, #FFFFFF, #F8F6F2)',
                borderRadius: '16px',
                padding: '1rem',
                marginBottom: '1rem',
                boxShadow: '0 3px 10px rgba(0, 0, 0, 0.05)',
                animation: `fadeIn 0.5s ease-in-out ${0.3 + idx * 0.1}s both`,
                cursor: 'pointer',
              }}
              onClick={() => setExpandedLog(expandedLog === idx ? null : idx)}
              role="button"
              tabIndex={0}
              aria-expanded={expandedLog === idx}
              aria-label={`Log entry for ${entry.date}`}
              onKeyDown={(e) => e.key === 'Enter' && setExpandedLog(expandedLog === idx ? null : idx)}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <p style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-color)' }}>
                  {entry.date}
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--secondary-text)' }}>
                  Itch: {entry.itchLevel}
                </p>
              </div>
              {expandedLog === idx && (
                <div style={{ marginTop: '0.5rem' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--secondary-text)' }}>
                    <strong>Flare Zone:</strong> {entry.flareZone}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--secondary-text)' }}>
                    <strong>Stress:</strong> {entry.stress}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--secondary-text)' }}>
                    <strong>Confidence:</strong> {entry.confidence}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--secondary-text)' }}>
                    <strong>Triggers:</strong> {entry.foodTriggers?.join(', ') || '—'}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteLog(idx);
                    }}
                    style={{
                      background: '#D9534F',
                      color: '#FFFFFF',
                      fontWeight: '600',
                      fontSize: '0.85rem',
                      padding: '0.5rem',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      marginTop: '0.5rem',
                      width: '100%',
                      transition: 'transform 0.2s, background-color 0.3s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    aria-label={`Delete log entry for ${entry.date}`}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
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
        <button
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--secondary-text)',
            fontSize: '0.75rem',
            transition: 'transform 0.2s',
            padding: '0.5rem',
            width: '60px',
          }}
          onClick={() => router.push('/home')}
          aria-label="Home"
        >
          <span style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🏠</span>
          Home
        </button>
        <button
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--secondary-text)',
            fontSize: '0.75rem',
            transition: 'transform 0.2s',
            padding: '0.5rem',
            width: '60px',
          }}
          onClick={() => router.push('/log-daily')}
          aria-label="Log Data"
        >
          <span style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>📝</span>
          Log
        </button>
        <button
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'var(--primary-color)',
            color: '#FFFFFF',
            borderRadius: '12px',
            padding: '0.5rem',
            width: '60px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.75rem',
            transition: 'transform 0.2s',
          }}
          onClick={() => router.push('/history')}
          aria-label="History"
        >
          <span style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>📊</span>
          History
        </button>
        <button
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--secondary-text)',
            fontSize: '0.75rem',
            transition: 'transform 0.2s',
            padding: '0.5rem',
            width: '60px',
          }}
          onClick={() => router.push('/settings')}
          aria-label="Settings"
        >
          <span style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>⚙️</span>
          Settings
        </button>
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
        button:focus,
        select:focus,
        [role='button']:focus {
          outline: 2px solid var(--primary-color);
          outline-offset: 2px;
        }
        button:hover,
        [role='button']:hover {
          transform: scale(1.03);
        }
      `}</style>
    </div>
  );
}