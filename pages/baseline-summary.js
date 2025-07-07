// pages/baseline-summary.js
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function BaselineSummary() {
  const router = useRouter();
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const condition = JSON.parse(localStorage.getItem('conditions')) || ['Not specified'];
    const itch = localStorage.getItem('itch') || 'Not recorded';
    const dryness = localStorage.getItem('dryness') || 'Unknown';
    const uv = localStorage.getItem('uv') || 'moderate';
    const sensitivities = localStorage.getItem('sensitivities') || 'None reported';
    const meds = localStorage.getItem('medications') || 'None';
    const skinTone = localStorage.getItem('skinTone') || 'Not selected';
    const location = localStorage.getItem('location') || 'Unknown';

    setSummary({
      condition: Array.isArray(condition) ? condition.join(', ') : condition,
      itch,
      dryness,
      uv,
      sensitivities,
      meds,
      skinTone,
      location,
    });
  }, []);

  return (
    <div
      className="container"
      style={{
        minHeight: '100vh',
        padding: '2rem',
        backgroundColor: '#fce9e9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Head>
        <title>Baseline Summary | Dermind</title>
      </Head>

      <div
        style={{
          maxWidth: '420px',
          background: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <h1
          style={{
            fontSize: '1.4rem',
            fontWeight: 600,
            marginBottom: '1rem',
            textAlign: 'center',
          }}
        >
          Here’s what we’ve learned about your skin so far:
        </h1>

        {summary && (
          <ul style={{ paddingLeft: '1rem', fontSize: '1rem', lineHeight: 1.6 }}>
            <li>🌱 You’re managing: <strong>{summary.condition}</strong>.</li>
            <li>🧴 Baseline itch level: <strong>{summary.itch}/10</strong>, dryness: <strong>{summary.dryness}</strong>.</li>
            <li>🎨 Skin tone: <strong>{summary.skinTone}</strong></li>
            <li>☀️ Location: <strong>{summary.location}</strong> — <strong>{summary.uv}-UV</strong> zone</li>
            <li>⚠️ Sensitivities: <strong>{summary.sensitivities}</strong></li>
            <li>💊 Medications that may affect flares: <strong>{summary.meds}</strong></li>
            <li>🧠 Dermind is now ready to learn your personal flare patterns.</li>
          </ul>
        )}

        <button
          className="button"
          onClick={() => router.push('/log-daily')}
          style={{
            marginTop: '2rem',
            width: '100%',
            padding: '0.9rem',
            backgroundColor: '#f78d8d',
            color: 'white',
            border: 'none',
            borderRadius: '1rem',
            fontWeight: 600,
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Start Daily Tracking
        </button>
      </div>
    </div>
  );
}
