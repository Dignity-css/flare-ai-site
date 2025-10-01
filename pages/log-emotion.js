import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function LogEmotion() {
  const router = useRouter();
  const [confidence, setConfidence] = useState('');
  const [socialImpact, setSocialImpact] = useState('');

  // Check if both fields are filled for enabling the button
  const isReady = confidence && socialImpact;

  const handleSubmit = () => {
    // 1. GATHER ALL LOGGED DATA from localStorage (from previous steps)
    const lifestyle = JSON.parse(localStorage.getItem('logLifestyle') || '{}');
    const foodTriggers = JSON.parse(localStorage.getItem('foodTriggers') || '[]');
    const envExposures = JSON.parse(localStorage.getItem('envExposures') || '[]');
    const reactedAfter = localStorage.getItem('reactedAfter') || 'N/A';
    const avoidedHelpful = localStorage.getItem('avoidedHelpful') || 'none specified';
    const skinPhotoBase64 = localStorage.getItem('skinPhoto'); // This is the baseline photo, kept separate.

    // 2. CREATE THE COMPLETE LOG ENTRY
    const newLogEntry = {
      date: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
      timestamp: new Date().toISOString(),
      
      // Lifestyle data from previous page
      ...lifestyle,
      
      // Trigger data from previous page
      foodTriggers,
      reactedAfter,
      envExposures,
      avoidedHelpful,
      
      // Emotion data (current page)
      confidence,
      socialImpact,
      
      // Baseline Photo (optional)
      skinPhotoBase64: skinPhotoBase64 ? skinPhotoBase64.substring(0, 50) + '...' : 'none' // Store only a snippet/status, the full base64 image is often too large for logs.
    };
    
    // --- 3. SAVE LOG ENTRY HISTORY ---
    // Get existing logs, add the new entry, and save back
    const existingLogs = JSON.parse(localStorage.getItem('logs') || '[]');
    localStorage.setItem('logs', JSON.stringify([...existingLogs, newLogEntry]));
    
    // Save the most recent log for immediate summary display
    localStorage.setItem('lastLogEntry', JSON.stringify(newLogEntry));
    
    // --- 4. CLEAN UP TEMPORARY DATA ---
    // Remove the individual, temporary log items used during the check-in flow
    localStorage.removeItem('logLifestyle');
    localStorage.removeItem('foodTriggers');
    localStorage.removeItem('reactedAfter');
    localStorage.removeItem('envExposures');
    localStorage.removeItem('avoidedHelpful');
    // NOTE: We keep 'skinPhoto' as it's the user's permanent baseline photo.

    router.push('/log-summary');
  };

  return (
    <div className="container">
      <Head>
        <title>Emotional Check | Dermind</title>
        <meta name="theme-color" content="#5C4033" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="card-wrapper">
        <div className="card-outline" />

        <div className="card-inner">
          <h1 className="title">🧠 Emotional Check-In</h1>
          <p className="subtitle">
            How has your skin affected your mood and confidence today?
          </p>

          <div className="form-group">
            {/* Confidence */}
            <label className="input-label required-label">
              Confidence: How confident did you feel today regarding your skin?
              <select
                value={confidence}
                onChange={(e) => setConfidence(e.target.value)}
                className="styled-select"
              >
                <option value="">Select</option>
                <option value="Very low">😞 Very low – I felt insecure</option>
                <option value="Low">😐 Low – I was a bit self-conscious</option>
                <option value="Neutral">😶 Neutral – No major impact</option>
                <option value="Good">🙂 Good – I felt okay</option>
                <option value="Great">😄 Great – I felt confident!</option>
              </select>
            </label>

            {/* Social impact */}
            <label className="input-label required-label">
              Social Impact: Did your skin affect your mood or social plans today?
              <select
                value={socialImpact}
                onChange={(e) => setSocialImpact(e.target.value)}
                className="styled-select"
              >
                <option value="">Select</option>
                <option value="Not at all">No, not at all</option>
                <option value="A little">A little – I hesitated or avoided something</option>
                <option value="Yes">Yes – It had a clear impact</option>
              </select>
            </label>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!isReady}
            className={`button ${!isReady ? 'disabled' : ''}`}
          >
            Finish Check-In
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

          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, var(--gradient-start) 0%, var(--gradient-end) 100%);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          padding: 1rem;
        }

        /* --- Card Structure & Typography (Consistent) --- */
        .card-wrapper {
          width: 100%;
          max-width: 480px;
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
        
        /* --- Form Styling --- */
        .form-group {
            text-align: left;
            margin-bottom: 1.5rem;
        }
        
        .input-label {
            display: block;
            margin-bottom: 1.5rem;
            font-size: 1rem;
            font-weight: 500;
            color: var(--text-color);
        }
        
        .required-label:after {
            content: ' *';
            color: var(--accent-color);
        }

        /* Select Styling */
        .styled-select {
            width: 100%;
            padding: 0.75rem 1rem;
            margin-top: 0.4rem;
            border-radius: 8px;
            border: 1px solid var(--input-border);
            background-color: var(--input-bg);
            font-size: 1rem;
            color: var(--text-color);
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%235C4033' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 1rem center;
            cursor: pointer;
            transition: border-color 0.2s, box-shadow 0.2s;
        }

        .styled-select:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 2px rgba(92, 64, 51, 0.2);
        }


        /* --- Button (Consistent Style) --- */
        .button {
          margin-top: 1rem;
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

        .button:not(.disabled):hover {
          background-color: var(--accent-color);
          transform: translateY(-2px);
          box-shadow: 0 8px 18px rgba(92, 64, 51, 0.4);
        }

        .button.disabled {
          background-color: var(--inactive-color);
          cursor: not-allowed;
          opacity: 0.8;
          box-shadow: none;
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
          .button {
            font-size: 1rem;
            padding: 0.75rem;
          }
          .input-label {
            font-size: 0.95rem;
          }
          .styled-select {
            padding: 0.6rem 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}
