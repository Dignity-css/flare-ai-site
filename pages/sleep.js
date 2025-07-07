// pages/sleep.js
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SleepPage() {
  const [sleepHours, setSleepHours] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    localStorage.setItem('sleep', sleepHours);
    router.push('/home');
  };

  return (
    <div style={{ backgroundColor: '#fce9e9', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Head><title>Sleep | Flare AI</title></Head>

      <div style={{
        background: '#fff',
        padding: '2rem',
        borderRadius: '1.5rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        textAlign: 'center',
        width: '90%',
        maxWidth: '400px'
      }}>
        {/* Arched SVG curve */}
        <svg width="100%" height="120" viewBox="0 0 200 100" style={{ marginBottom: '-30px' }}>
          <path
            d="M20 100 C60 0, 140 0, 180 100"
            fill="none"
            stroke="#2c3e50"
            strokeWidth="12"
            strokeLinecap="round"
          />
        </svg>

        {/* Sleep Icon */}
        <img src="/sleep-icon.png" alt="Sleep" style={{ width: '64px', height: '64px', marginBottom: '1rem' }} />

        {/* Text and input */}
        <h2 style={{ fontSize: '1.1rem', margin: '1rem 0 0.5rem', fontWeight: '600' }}>Hours of sleep:</h2>
        <input
          type="number"
          value={sleepHours}
          onChange={(e) => setSleepHours(e.target.value)}
          placeholder="e.g. 7"
          style={{
            background: '#fddde6',
            border: 'none',
            borderRadius: '999px',
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            textAlign: 'center',
            width: '120px',
            marginBottom: '1.5rem'
          }}
        />

        {/* Save button */}
        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: '#f78d8d',
            color: 'white',
            padding: '0.8rem',
            border: 'none',
            borderRadius: '1rem',
            fontWeight: '600',
            fontSize: '1rem',
            width: '100%',
            cursor: 'pointer'
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
