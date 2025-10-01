import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState, useMemo } from 'react';

// Map of internal state keys to user-friendly labels for the summary display
const LOG_DISPLAY_MAP = {
  // Severity (assuming the first step had these, based on original code)
  severity: "Overall Severity (1-10)",
  itchLevel: "Itch Level (1-10)",
  painLevel: "Pain Level (1-10)",
  moisturized: "Moisturized Skin?",
  moisturizedAmount: "Moisturizer Used",
  sleepImpact: "Skin Wakeups (at night)",

  // Lifestyle
  sleepHours: "Sleep Duration",
  sleepQuality: "Sleep Quality",
  stressLevel: "Stress Level (0-10)",
  menstruating: "Menstrual Status",
  caffeine: "Caffeine Intake",
  exercise: "Physical Activity",

  // Triggers
  foodTriggers: "Food Triggers Logged",
  reactedAfter: "Gastrointestinal Reaction?",
  envExposures: "Environmental Exposures",
  avoidedHelpful: "Avoided Helpful Care",

  // Emotion
  confidence: "Skin Confidence",
  socialImpact: "Social Impact",
};


export default function LogSummary() {
  const router = useRouter();
  // We use 'lastLogEntry' which was saved by the previous page's successful submit
  const [log, setLog] = useState(null);
  const [flareScore, setFlareScore] = useState(null);
  const [patternHint, setPatternHint] = useState('');
  const [tip, setTip] = useState('');

  useEffect(() => {
    // 1. Retrieve the completed log entry
    const savedLog = JSON.parse(localStorage.getItem('lastLogEntry') || null);
    
    // Also retrieve the full history for pattern detection
    const logs = JSON.parse(localStorage.getItem('logs') || '[]');

    if (savedLog) {
      setLog(savedLog);

      // --- Flare Score Calculation (Reconciled with aggregated data) ---
      // Assume itchLevel, severity, sleepImpact are captured on a previous (unseen) page
      const itch = parseInt(savedLog.itchLevel || 0);
      const severity = parseInt(savedLog.severity || 0);
      
      // Bonus score for poor sleep
      const sleepImpact = savedLog.sleepImpact || 'None';
      const sleepBonus = 
        sleepImpact === 'Couldn’t sleep' ? 2 : 
        (sleepImpact === 'Woke once' || savedLog.sleepQuality === 'poor') ? 1 : 0;
        
      // Score based on severity, itch, and poor sleep
      const score = Math.min(10, severity + itch / 2 + sleepBonus); 
      setFlareScore(Math.round(score * 10) / 10); // Round to one decimal

      // --- Pattern Detection (Mocked from last 4 logs) ---
      const lastFour = logs.slice(-4);
      const dairyTriggerCount = lastFour.filter(l => l.foodTriggers && l.foodTriggers.includes("Dairy")).length;
      const highStressCount = lastFour.filter(l => l.stressLevel > 7).length;

      if (dairyTriggerCount >= 2 && highStressCount >= 2) {
        setPatternHint("High stress days combined with dairy intake appear frequently in your last few logs. Consider tracking those together.");
      } else if (savedLog.sleepHours === '<5' || savedLog.sleepHours === '5-6') {
        setPatternHint("Your sleep duration was low. Lack of sleep often precedes a flare for many people.");
      } else {
        setPatternHint("No immediate recurring pattern detected. Keep logging consistently!");
      }

      // --- Tip Suggestion ---
      if (savedLog.moisturized === 'No' || savedLog.moisturizedAmount === 'Just a bit') {
        setTip("Reminder: Apply a generous layer of moisturizer tonight. Consistency is crucial for barrier repair.");
      } else if (savedLog.stressLevel > 7) {
        setTip("Consider a 10-minute mindful breathing exercise to downregulate stress hormones before bed.");
      } else {
        setTip("Great job on your consistent logging! Stick to your routine and check back tomorrow.");
      }
    }
  }, []);

  // Filter and format log entries for display
  const displayEntries = useMemo(() => {
    if (!log) return [];
    
    return Object.entries(log)
      .filter(([key, value]) => LOG_DISPLAY_MAP[key]) // Only display relevant keys
      .map(([key, value]) => ({
        key: LOG_DISPLAY_MAP[key],
        value: Array.isArray(value) ? value.join(', ') : value,
        isImportant: key === 'stressLevel' || key === 'foodTriggers' || key === 'severity'
      }));
  }, [log]);


  if (!log) {
    return (
      <div className="container" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ color: '#5C4033', fontSize: '1.2rem' }}>Loading your log summary...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <Head>
        <title>Your Log Summary | Dermind</title>
        <meta name="theme-color" content="#5C4033" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="card-wrapper wide">
        <div className="card-outline" />

        <div className="card-inner">
          <h1 className="title">✅ Check-In Completed</h1>
          <p className="subtitle">
            Your detailed daily log for **{log.date}** has been saved. Review your entries and get personalized insights below.
          </p>

          {/* Flare Score Section */}
          <div className="score-box">
            <div className="score-value-container">
                <span className="score-label">Today's Flare Score</span>
                <span className="score-value">{flareScore !== null ? flareScore : 'N/A'}/10</span>
            </div>
            <div className="score-description">
                {flareScore <= 3 ? "👍 Low Flare Risk. Great management!" : 
                 flareScore <= 6 ? "⚠️ Moderate Flare Risk. Stay attentive to triggers." : 
                 "🔥 High Flare Risk. Prioritize skin calming and rest."}
            </div>
          </div>
          
          <h2 className="section-header">Detailed Entries</h2>

          {/* Full Log Summary List */}
          <ul className="log-list">
            {displayEntries.map((item) => (
              <li key={item.key} className={`log-item ${item.isImportant ? 'important' : ''}`}>
                <span className="log-key">{item.key}</span>
                <span className="log-value">{item.value || 'N/A'}</span>
              </li>
            ))}
          </ul>

          {/* Personalized AI-style Feedback */}
          <div className="feedback-box">
            <h3 className="feedback-title">Insight & Guidance</h3>
            
            {patternHint && (
                <p className="feedback-tip">💡 Pattern Hint: {patternHint}</p>
            )}
            {tip && (
                <p className="feedback-tip">🧴 Personalized Tip: {tip}</p>
            )}
            <p className="feedback-encouragement">
                💙 Thanks for checking in! Consistent logging is the first step toward understanding and healing your skin.
            </p>
          </div>

          <button
            className="button"
            onClick={() => router.push('/home')}
          >
            Go to Home Dashboard
          </button>
        </div>
      </div>

      <style jsx global>{`
        .container, .container * {
          box-sizing: border-box;
        }
      `}</style>
      <style jsx>{`
        /* --- Color & Font Variables (Consistent Theme) --- */
        .container {
          --primary-color: #5C4033; /* Dark Brown (Main Button/Text) */
          --accent-color: #8C5C3A; /* Mid-Brown/Highlight (Active/Hover) */
          --text-color: #2E2C29;
          --secondary-text: #6B5B4B;
          --card-bg: #FAF7F2; /* Cream White */
          --border-light: #E6D5C3;
          --inactive-color: #C8B9A6;
          --gradient-start: #EAD7C0;
          --gradient-end: #F5E6D3;
          --input-border: #D1C0B0;
          --input-bg: #FFFFFF;
          --info-bg: #F0EADF; /* Light beige for info boxes */

          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, var(--gradient-start) 0%, var(--gradient-end) 100%);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          padding: 1rem;
        }

        /* --- Card Structure & Typography --- */
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
          width: 100%;
          padding: 2.5rem 1.75rem 2rem;
          background-color: var(--card-bg);
          border-radius: 22px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.7);
          text-align: center;
          z-index: 2;
        }

        .title {
          font-size: 1.65rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--primary-color);
        }
        .subtitle {
          font-size: 0.95rem;
          color: var(--secondary-text);
          margin-bottom: 2rem;
        }

        /* --- Score Box Styling --- */
        .score-box {
            background: var(--input-bg);
            border: 2px solid var(--accent-color);
            border-radius: 12px;
            padding: 1.5rem;
            margin-bottom: 2rem;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
            text-align: center;
        }
        
        .score-value-container {
            display: flex;
            justify-content: center;
            align-items: baseline;
            gap: 1rem;
        }

        .score-label {
            font-size: 1rem;
            font-weight: 500;
            color: var(--secondary-text);
        }
        
        .score-value {
            font-size: 3rem;
            font-weight: 800;
            color: var(--primary-color);
            line-height: 1;
        }

        .score-description {
            margin-top: 0.5rem;
            font-size: 1rem;
            font-weight: 600;
            color: var(--text-color);
        }

        /* --- Log List Styling --- */
        .section-header {
            font-size: 1.2rem;
            font-weight: 700;
            color: var(--primary-color);
            margin: 1.5rem 0 1rem;
            text-align: left;
            border-bottom: 1px solid var(--border-light);
            padding-bottom: 0.5rem;
        }
        
        .log-list {
            list-style: none;
            padding: 0;
            margin-bottom: 2rem;
            text-align: left;
        }

        .log-item {
            display: flex;
            justify-content: space-between;
            padding: 0.5rem 0;
            border-bottom: 1px dashed var(--border-light);
            font-size: 0.95rem;
        }

        .log-item:last-child {
            border-bottom: none;
        }

        .log-key {
            font-weight: 600;
            color: var(--secondary-text);
            width: 50%;
        }

        .log-value {
            font-weight: 500;
            color: var(--text-color);
            text-align: right;
            width: 50%;
        }
        
        .log-item.important .log-value {
            font-weight: 700;
            color: var(--accent-color);
        }

        /* --- Feedback Box Styling --- */
        .feedback-box {
            margin-top: 1rem;
            background: var(--info-bg);
            padding: 1.5rem;
            border-radius: 12px;
            text-align: left;
            border: 1px solid var(--border-light);
        }
        
        .feedback-title {
            font-size: 1.1rem;
            font-weight: 700;
            color: var(--primary-color);
            margin-bottom: 1rem;
        }

        .feedback-tip {
            margin-bottom: 0.75rem;
            font-size: 0.95rem;
            line-height: 1.4;
            color: var(--text-color);
        }
        
        .feedback-encouragement {
            margin-top: 1rem;
            font-style: italic;
            font-size: 0.85rem;
            color: var(--secondary-text);
            border-top: 1px dashed var(--border-light);
            padding-top: 0.75rem;
        }

        /* --- Button (Consistent Style) --- */
        .button {
          margin-top: 2rem;
          width: 100%;
          padding: 1rem;
          background-color: var(--primary-color);
          color: #FFFFFF;
          border: none;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.2s, opacity 0.3s;
          box-shadow: 0 6px 15px rgba(92, 64, 51, 0.3);
        }

        .button:hover {
          background-color: var(--accent-color);
          transform: translateY(-2px);
          box-shadow: 0 8px 18px rgba(92, 64, 51, 0.4);
        }
        
        /* Responsive Adjustments */
        @media (max-width: 480px) {
          .card-inner {
            padding: 2rem 1.25rem;
          }
          .title {
            font-size: 1.5rem;
          }
          .subtitle {
            font-size: 0.9rem;
          }
          .score-value {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
}
