import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function LogLifestyle() {
  const router = useRouter();
  const [sleepHours, setSleepHours] = useState('');
  const [sleepQuality, setSleepQuality] = useState('');
  const [stressLevel, setStressLevel] = useState(5);
  const [menstruating, setMenstruating] = useState('');
  const [caffeine, setCaffeine] = useState('');
  const [exercise, setExercise] = useState('');

  const handleNext = () => {
    // Collect all data, ensuring stressLevel is stored as a number
    const log = {
      sleepHours,
      sleepQuality,
      stressLevel: Number(stressLevel), 
      menstruating: menstruating || 'not specified', // Log optional field if selected
      caffeine,
      exercise
    };
    
    // Save to localStorage
    localStorage.setItem('logLifestyle', JSON.stringify(log));
    
    // Navigate to the next logging page
    router.push('/log-trigger');
  };

  // Check required fields (menstruating is optional)
  const allFilled = sleepHours && sleepQuality && caffeine && exercise;

  return (
    <div className="container">
      <Head>
        <title>Lifestyle Check | Dermind</title>
        <meta name="theme-color" content="#5C4033" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="card-wrapper">
        <div className="card-outline" />

        <div className="card-inner">
          <h1 className="title">🌙 Lifestyle Check-In</h1>
          <p className="subtitle">
            Log your general well-being for today to help identify potential flare triggers.
          </p>

          <div className="form-group">
            {/* Sleep Hours */}
            <label className="input-label">
              How many hours did you sleep last night?
              <select value={sleepHours} onChange={(e) => setSleepHours(e.target.value)} className="styled-select">
                <option value="">Select</option>
                <option value="<5">Less than 5 hours</option>
                <option value="5-6">5–6 hours</option>
                <option value="6-8">6–8 hours</option>
                <option value=">8">More than 8 hours</option>
              </select>
            </label>

            {/* Sleep Quality */}
            <label className="input-label">
              How would you rate your sleep quality?
              <select value={sleepQuality} onChange={(e) => setSleepQuality(e.target.value)} className="styled-select">
                <option value="">Select</option>
                <option value="restful">Very restful 😴</option>
                <option value="okay">Okay</option>
                <option value="restless">Restless night</option>
                <option value="poor">Couldn’t sleep 😵</option>
              </select>
            </label>

            {/* Stress Level (Range Input) */}
            <div className="input-label stress-input">
              How stressed did you feel today? (0 - 10)
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={stressLevel}
                onChange={(e) => setStressLevel(e.target.value)}
                className="stress-range-slider"
              />
              <div className="stress-value">
                <span className="stress-min">Calm (0)</span>
                <span className="stress-current">{stressLevel}</span>
                <span className="stress-max">High Stress (10)</span>
              </div>
            </div>

            {/* Menstruating (Optional) */}
            <label className="input-label">
              Are you menstruating today? (Optional)
              <select value={menstruating} onChange={(e) => setMenstruating(e.target.value)} className="styled-select">
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="irregular">Irregular/spotting</option>
              </select>
            </label>

            {/* Caffeine */}
            <label className="input-label">
              Did you have caffeine today?
              <select value={caffeine} onChange={(e) => setCaffeine(e.target.value)} className="styled-select">
                <option value="">Select</option>
                <option value="none">No caffeine</option>
                <option value="low">1 cup</option>
                <option value="moderate">2–3 cups</option>
                <option value="high">4+ cups ☕</option>
              </select>
            </label>

            {/* Exercise */}
            <label className="input-label">
              Did you do any physical activity today?
              <select value={exercise} onChange={(e) => setExercise(e.target.value)} className="styled-select">
                <option value="">Select</option>
                <option value="none">No exercise</option>
                <option value="light">Light walk / yoga</option>
                <option value="moderate">Moderate workout</option>
                <option value="intense">Intense training 💪</option>
              </select>
            </label>
          </div>

          <button
            onClick={handleNext}
            disabled={!allFilled}
            className={`button ${!allFilled ? 'disabled' : ''}`}
          >
            Log Lifestyle &rarr; Next
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
          --accent-color: #8C5C3A; /* Mid-Brown/Highlight (Hover/Range fill) */
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
        }

        .input-label {
            display: block;
            margin-bottom: 1.5rem;
            font-size: 1rem;
            font-weight: 500;
            color: var(--text-color);
        }

        /* Select styling */
        .styled-select {
            width: 100%;
            padding: 0.75rem 1rem;
            margin-top: 0.4rem;
            border-radius: 8px;
            border: 1px solid var(--input-border);
            background-color: var(--input-bg);
            font-size: 1rem;
            color: var(--text-color);
            appearance: none; /* Hide default arrow */
            /* Custom SVG arrow pointing down in the primary color */
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

        /* Range Slider Styling */
        .stress-input {
            margin-bottom: 2rem;
        }
        
        .stress-range-slider {
            -webkit-appearance: none;
            width: 100%;
            height: 8px;
            margin-top: 1rem;
            border-radius: 4px;
            cursor: pointer;
            transition: background 0.2s;
            /* Custom track fill based on stressLevel state */
            background: linear-gradient(to right, var(--accent-color) calc(var(--value) * 10%), var(--input-border) calc(var(--value) * 10%));
        }

        /* Set the CSS variable for track fill based on state */
        .stress-range-slider {
            --value: ${stressLevel};
        }

        /* Thumb styles (WebKit/Blink) */
        .stress-range-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 24px;
            height: 24px;
            background: var(--primary-color);
            border-radius: 50%;
            cursor: pointer;
            border: 3px solid #FFF;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
            transition: background 0.2s;
        }

        /* Firefox thumb styles */
        .stress-range-slider::-moz-range-thumb {
            width: 24px;
            height: 24px;
            background: var(--primary-color);
            border-radius: 50%;
            cursor: pointer;
            border: 3px solid #FFF;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }


        .stress-value {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.85rem;
            color: var(--secondary-text);
            margin-top: 0.5rem;
        }

        .stress-current {
            font-weight: 700;
            color: var(--primary-color);
            font-size: 1.2rem;
            padding: 0 0.5rem;
            background-color: var(--border-light);
            border-radius: 4px;
            min-width: 2.5rem;
            text-align: center;
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
