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
      const sleepScore =
        sleepImpact === "Couldn not sleep" ? 2 :
        sleepImpact === "Woke once" ? 1 : 0;
      const score = Math.min(10, itch + sleepScore);
      setFlareScore(score);

      // Pattern detection
      const lastFour = logs.slice(-4);
      const poorSleepCount = lastFour.filter(log => log.sleepImpact === "Could not sleep").length;
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
      <div className="container">
        <Head><title>Summary | Dermind</title></Head>
        <p>Loading your log summary...</p>
        <style jsx>{`
          .container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #EAD7C0 0%, #F5E6D3 100%);
            font-family: 'Inter', sans-serif;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="container">
      <Head><title>Your Log Summary | Dermind</title></Head>

      <div className="card-wrapper">
        <div className="card-outline" />
        <div className="card-inner">

          <h1 className="title">✅ Log Summary</h1>

          <ul className="summary-list">
            {Object.entries(log).map(([key, value]) => (
              <li key={key}>
                <strong>{key.replace(/([A-Z])/g, ' $1')}:</strong>{' '}
                {Array.isArray(value) ? value.join(', ') : value}
              </li>
            ))}
          </ul>

          {/* Personalized AI-style Feedback */}
          <div className="feedback-box">
            <p>🔢 <strong>Flare Score:</strong> {flareScore}/10 — {flareScore <= 3 ? "mild" : flareScore <= 6 ? "moderate" : "high"}</p>
            {patternHint && <p>💡 <strong>Pattern Hint:</strong> {patternHint}</p>}
            {tip && <p>🧴 <strong>Tip:</strong> {tip}</p>}
            <p>💙 <strong>Encouragement:</strong> Thanks for checking in. You are helping your skin and your future self.</p>
          </div>

          <button
            className="button"
            onClick={() => router.push('/home')}
          >
            Go to Home
          </button>
        </div>
      </div>

      <style jsx>{`
        /* --- Theme Variables --- */
        .container {
          --primary-color: #5C4033;
          --accent-color: #8C5C3A;
          --text-color: #2E2C29;
          --secondary-text: #6B5B4B;
          --card-bg: #FAF7F2;
          --border-light: #E6D5C3;
          --inactive-color: #C8B9A6;
          --gradient-start: #EAD7C0;
          --gradient-end: #F5E6D3;

          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem;
          background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
          font-family: 'Inter', sans-serif;
        }

        .card-wrapper {
          width: 100%;
          max-width: 600px;
          position: relative;
          padding: 1rem;
        }

        .card-outline {
          position: absolute;
          top: 0.5rem;
          left: 0.5rem;
          width: calc(100% - 1rem);
          height: calc(100% - 1rem);
          background: var(--border-light);
          border-radius: 18px;
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);
          z-index: 1;
        }

        .card-inner {
          position: relative;
          background: var(--card-bg);
          border-radius: 22px;
          padding: 2rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.7);
          z-index: 2;
          text-align: left;
        }

        .title {
          font-size: 1.6rem;
          font-weight: 700;
          margin-bottom: 1.2rem;
          text-align: center;
          color: var(--primary-color);
        }

        .summary-list {
          list-style: none;
          padding: 0;
          margin: 0 0 1.5rem;
        }
        .summary-list li {
          margin-bottom: 0.75rem;
          font-size: 1rem;
          color: var(--text-color);
        }
        .summary-list strong {
          color: var(--primary-color);
        }

        .feedback-box {
          margin-top: 1.5rem;
          background: #fefcf9;
          padding: 1rem 1.25rem;
          border-radius: 1rem;
          border: 1px solid var(--border-light);
          color: var(--secondary-text);
        }

        .button {
          margin-top: 2rem;
          width: 100%;
          padding: 1rem;
          background-color: var(--primary-color);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1.05rem;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.2s;
          box-shadow: 0 6px 15px rgba(92, 64, 51, 0.3);
        }
        .button:hover {
          background-color: var(--accent-color);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
