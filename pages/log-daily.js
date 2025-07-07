// pages/log-daily.js
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function LogDailyIntro() {
  const router = useRouter();

  return (
    <div className="container" style={{
      backgroundColor: '#fce9e9',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <Head><title>Start Daily Log | Dermind</title></Head>

      <div style={{
        background: 'white',
        borderRadius: '1.5rem',
        padding: '2rem',
        maxWidth: '480px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
      }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
          Start Your Daily Check-In
        </h1>
        <p style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>
          Tracking your skin daily helps Dermind learn your unique flare patterns over time.
        </p>
        <button
          onClick={() => router.push('/log-status')}  // ✅ First step of daily flow
          className="button"
          style={{
            width: '100%',
            padding: '0.9rem',
            backgroundColor: '#f78d8d',
            color: 'white',
            border: 'none',
            borderRadius: '1rem',
            fontWeight: 600,
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Start My Daily Log
        </button>
      </div>
    </div>
  );
}
