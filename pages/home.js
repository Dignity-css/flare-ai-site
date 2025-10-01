import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');
  
  // Dynamic Data States (Simulating API Fetch Success)
  const [uvIndex, setUvIndex] = useState('Fetching...');
  const [pollenIndex, setPollenIndex] = useState('Fetching...');
  const location = 'Islamabad'; // Updated location

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setName(storedName);
    } else {
      router.push('/intro'); // Redirect if onboarding not completed
    }

    // --- Dynamic Data Injection for Islamabad ---
    // UV Index: 4.0 (Moderate)
    const fetchedUv = '4.0 (Moderate)';
    // Pollen Level: Low
    const fetchedPollen = 'Low';
    
    setUvIndex(fetchedUv);
    setPollenIndex(fetchedPollen);

    // If you wanted to calculate a dynamic flare risk based on this:
    // With Moderate UV and Low Pollen, let's keep the risk as Moderate for now.

  }, [router]);

  // Helper function to determine color based on index level
  const getPollenColor = (index) => {
    if (index.includes('High')) return '#D9534F'; // Red
    if (index.includes('Moderate')) return '#F0AD4E'; // Orange
    return '#4CAF50'; // Green (Low)
  };
  
  // Helper function to calculate risk color for the main dial (60% Moderate placeholder)
  const getRiskDialColor = (risk) => {
    if (risk === 'Moderate') return '#F0AD4E'; // Changed to Orange for Moderate
    if (risk === 'Low') return '#4CAF50'; 
    return '#D9534F'; // High/Severe
  };
  
  const currentRisk = 'Moderate'; // Placeholder for the risk assessment

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: 'linear-gradient(135deg, #EAD7C0 0%, #F5E6D3 100%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        '--primary-color': '#5C4033',
        '--accent-color': '#8C5C3A',
        '--text-color': '#2E2C29',
        '--secondary-text': '#6B5B4B',
        '--secondary-bg': '#E6D5C3',
        '--dot-inactive': '#C8B9A6',
        padding: '1.5rem 1.25rem 5rem',
      }}
    >
      <Head>
        <title>Home | Flare AI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#5C4033" />
        <meta name="description" content="Flare AI: Your skin health dashboard" />
        <link rel="apple-touch-icon" href="/flare-logo.png" />
      </Head>

      <div style={{ width: '100%', maxWidth: '380px', margin: '0 auto' }}>
        <h1
          style={{
            fontSize: '1.8rem',
            fontWeight: '700',
            marginBottom: '0.5rem',
            color: 'var(--text-color)',
            textAlign: 'left',
            animation: 'fadeIn 0.5s ease-in-out',
          }}
        >
          Hello{name ? `, ${name}` : ''} 👋
        </h1>
        <p style={{ 
            fontSize: '0.9rem', 
            marginBottom: '1.5rem', 
            color: 'var(--secondary-text)' 
        }}>
            Data for **{location}**
        </p>

        <div
          style={{
            background: 'linear-gradient(145deg, #FFFFFF, #F8F6F2)',
            borderRadius: '16px',
            padding: '1.25rem',
            marginBottom: '1.25rem',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
            animation: 'fadeIn 0.5s ease-in-out 0.1s both',
          }}
        >
          <h2
            style={{
              fontSize: '1.2rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: 'var(--secondary-text)',
            }}
          >
            Flare Risk Today
          </h2>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              width: '120px',
              height: '120px',
              margin: '0 auto',
            }}
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
              {/* Dynamic Stroke based on risk level */}
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke={getRiskDialColor(currentRisk)}
                strokeWidth="12"
                strokeDasharray="339.292"
                strokeDashoffset="135.717" // 60% completion (Moderate)
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
                60%
              </text>
            </svg>
          </div>
          <p
            style={{
              color: getRiskDialColor(currentRisk),
              fontWeight: '600',
              fontSize: '1rem',
              textAlign: 'center',
              marginTop: '0.5rem',
            }}
          >
            {currentRisk}
          </p>
        </div>

        <h2
          style={{
            fontSize: '1.2rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: 'var(--secondary-text)',
            textAlign: 'left',
          }}
        >
          Today’s Data
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          <button
            onClick={() => router.push('/sleep')}
            style={{
              background: 'linear-gradient(145deg, #FFFFFF, #F8F6F2)',
              borderRadius: '16px',
              padding: '1rem',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'center',
              boxShadow: '0 3px 10px rgba(0, 0, 0, 0.05)',
              transition: 'transform 0.2s, box-shadow 0.3s',
              animation: 'fadeIn 0.5s ease-in-out 0.2s both',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            aria-label="View sleep data"
          >
            <img
              src="/sleep-icon.png"
              alt="Sleep"
              style={{ width: '48px', height: '48px', marginBottom: '0.5rem' }}
            />
            <span style={{ fontSize: '0.9rem', color: 'var(--text-color)' }}>
              Sleep
            </span>
          </button>
          
          {/* Dynamic UV Index Card */}
          <button
            style={{
              background: 'linear-gradient(145deg, #FFFFFF, #F8F6F2)',
              borderRadius: '16px',
              padding: '1rem',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'center',
              boxShadow: '0 3px 10px rgba(0, 0, 0, 0.05)',
              transition: 'transform 0.2s, box-shadow 0.3s',
              animation: 'fadeIn 0.5s ease-in-out 0.3s both',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            aria-label={`UV Index: ${uvIndex}`}
          >
            <img
              src="/uv-icon.png"
              alt="UV Index"
              style={{ width: '48px', height: '48px', marginBottom: '0.5rem' }}
            />
            <span style={{ fontSize: '0.9rem', color: 'var(--text-color)' }}>
              UV Index
            </span>
            <span
              style={{
                fontSize: '0.85rem',
                color: getPollenColor(uvIndex), // UV is Moderate, so it will be orange/yellow
                display: 'block',
              }}
            >
              {uvIndex}
            </span>
          </button>
          
          {/* Dynamic Pollen Card */}
          <button
            style={{
              background: 'linear-gradient(145deg, #FFFFFF, #F8F6F2)',
              borderRadius: '16px',
              padding: '1rem',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'center',
              boxShadow: '0 3px 10px rgba(0, 0, 0, 0.05)',
              transition: 'transform 0.2s, box-shadow 0.3s',
              animation: 'fadeIn 0.5s ease-in-out 0.4s both',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            aria-label={`Pollen Level: ${pollenIndex}`}
          >
            <img
              src="/pollen-icon.png"
              alt="Pollen"
              style={{ width: '48px', height: '48px', marginBottom: '0.5rem' }}
            />
            <span style={{ fontSize: '0.9rem', color: 'var(--text-color)' }}>
              Pollen
            </span>
            <span
              style={{
                fontSize: '0.85rem',
                color: getPollenColor(pollenIndex), // Pollen is Low, so it will be green
                display: 'block',
              }}
            >
              {pollenIndex}
            </span>
          </button>
        </div>

        <button
          onClick={() => router.push('/photo')}
          style={{
            background: 'var(--primary-color)',
            color: '#FFFFFF',
            fontWeight: '600',
            fontSize: '1rem',
            padding: '0.75rem',
            width: '100%',
            border: 'none',
            borderRadius: '16px',
            cursor: 'pointer',
            marginBottom: '0.75rem',
            boxShadow: '0 3px 10px rgba(0, 0, 0, 0.05)',
            transition: 'transform 0.2s, box-shadow 0.3s',
            animation: 'fadeIn 0.5s ease-in-out 0.5s both',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          aria-label="Upload skin photo"
        >
          Upload Skin Photo
        </button>

        <button
          onClick={() => router.push('/log-daily')}
          style={{
            background: 'var(--accent-color)',
            color: '#FFFFFF',
            fontWeight: '600',
            fontSize: '1rem',
            padding: '0.75rem',
            width: '100%',
            border: 'none',
            borderRadius: '16px',
            cursor: 'pointer',
            marginBottom: '0.75rem',
            boxShadow: '0 3px 10px rgba(0, 0, 0, 0.05)',
            transition: 'transform 0.2s, box-shadow 0.3s',
            animation: 'fadeIn 0.5s ease-in-out 0.6s both',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          aria-label="Log today's data"
        >
          Log Today’s Data
        </button>

        <button
          onClick={() => router.push('/history')}
          style={{
            background: 'linear-gradient(145deg, #FFFFFF, #F8F6F2)',
            color: 'var(--text-color)',
            fontWeight: '600',
            fontSize: '1rem',
            padding: '0.75rem',
            width: '100%',
            border: 'none',
            borderRadius: '16px',
            cursor: 'pointer',
            boxShadow: '0 3px 10px rgba(0, 0, 0, 0.05)',
            transition: 'transform 0.2s, box-shadow 0.3s',
            animation: 'fadeIn 0.5s ease-in-out 0.7s both',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          aria-label="View log history"
        >
          View Log History
        </button>
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
            background: 'var(--primary-color)',
            color: '#FFFFFF',
            borderRadius: '12px',
            padding: '0.5rem',
            width: '60px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.75rem',
            transition: 'transform 0.2s, background-color 0.3s',
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
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--secondary-text)',
            fontSize: '0.75rem',
            transition: 'transform 0.2s',
            padding: '0.5rem',
            width: '60px',
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
        button:focus {
          outline: 2px solid var(--primary-color);
          outline-offset: 2px;
        }
        button:hover {
          transform: scale(1.03);
        }
      `}</style>
    </div>
  );
}
