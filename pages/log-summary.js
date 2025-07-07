// pages/log-summary.js
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function LogSummary() {
  const router = useRouter();
  const [log, setLog] = useState(null);
  const [flareScore, setFlareScore] = useState(null);
  const [patternHint, setPatternHint] = useState('');
  const [tip, setTip] = useState('');

  useEffect(() => {
    const savedLog = JSON.parse(localStorage.getItem('logEntry'));
    const logs = JSON.parse(localStorage.getItem('logs')) || [];

    if (savedLog) {
      setLog(savedLog);

      // Simple flare score (itch + poor sleep bonus)
      const itch = parseInt(savedLog.itchLevel || 0);
      const sleepImpact = savedLog.sleepImpact;
      const sleepScore = sleepImpact === 'Couldn’t sleep' ? 2 : sleepImpact === 'Woke once' ? 1 : 0;
      const score = Math.min(10, itch + sleepScore);
      setFlareScore(score);

      // Pattern detection (mocked from last 4 logs)
      const lastFour = logs.slice(-4);
      const poorSleepCount = lastFour.filter(log => log.sleepImpact === "Couldn’t sleep").length;
      const missedMoisturizerCount = lastFour.filter(log => log.moisturized === "No").length;

      if (poorSleepCount >= 2 && missedMoisturizerCount >= 2) {
        setPatternHint("3 out of your last 4 flares followed poor sleep and skipped moisturizer.");
      }

      // Tip suggestion
      if (score > 5 || savedLog.moisturized === 'No') {
        setTip("Tonight might be a good night for a barrier-rich moisturizer and minimal actives.");
      }
    }
  }, []);

  if (!log) {
    return (
      <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>
        <Head><title>Summary | Dermind</title></Head>
        <p>Loading your log summary...</p>
      </div>
    );
  }

  return (
    <div className="container" style={{
      padding: '2rem',
      minHeight: '100vh',
      backgroundColor: '#fce9e9',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Head><title>Your Log Summary | Dermind</title></Head>

      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '1.5rem',
        maxWidth: '600px',
        width: '100%',
        boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
      }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '1.2rem', textAlign: 'center' }}>✅ Log Summary</h1>

        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1rem' }}>
          {Object.entries(log).map(([key, value]) => (
            <li key={key} style={{ marginBottom: '0.75rem' }}>
              <strong style={{ textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1')}:</strong>{' '}
              {Array.isArray(value) ? value.join(', ') : value}
            </li>
          ))}
        </ul>

        {/* Personalized AI-style Feedback */}
        <div style={{ marginTop: '2rem', background: '#fef8f8', padding: '1rem', borderRadius: '1rem' }}>
          <p>🔢 <strong>Today’s Flare Score:</strong> {flareScore}/10 — {flareScore <= 3 ? "mild" : flareScore <= 6 ? "moderate" : "high"}</p>
          {patternHint && <p>💡 <strong>Pattern Hint:</strong> {patternHint}</p>}
          {tip && <p>🧴 <strong>Tip:</strong> {tip}</p>}
          <p>💙 <strong>Encouragement:</strong> Thanks for checking in. You’re helping your skin and your future self.</p>
        </div>

        <button
          className="button"
          onClick={() => router.push('/home')}
          style={{
            marginTop: '2rem',
            width: '100%',
            padding: '0.9rem',
            backgroundColor: '#f78d8d',
            color: 'white',
            border: 'none',
            borderRadius: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
