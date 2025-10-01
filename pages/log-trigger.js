import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LogTrigger() {
  const router = useRouter();
  // State for multi-select fields
  const [foodTriggers, setFoodTriggers] = useState([]);
  const [envExposures, setEnvExposures] = useState([]);
  
  // State for other inputs
  const [reactedAfter, setReactedAfter] = useState('');
  const [avoidedHelpful, setAvoidedHelpful] = useState('');

  // Function to handle multi-select with "None" mutual exclusivity
  const toggleCheckbox = (value, list, setter) => {
    setter((prev) => {
      const isSelected = prev.includes(value);

      if (value === 'None') {
        // If clicking 'None', either clear all or just select 'None'
        return isSelected ? [] : ['None']; 
      } else {
        // If selecting any other item, ensure 'None' is removed
        const filteredPrev = prev.filter(v => v !== 'None');
        return isSelected ? filteredPrev.filter((v) => v !== value) : [...filteredPrev, value];
      }
    });
  };

  const handleNext = () => {
    // Save all data to localStorage
    localStorage.setItem('foodTriggers', JSON.stringify(foodTriggers));
    localStorage.setItem('reactedAfter', reactedAfter);
    localStorage.setItem('envExposures', JSON.stringify(envExposures));
    // Save the text input, default to 'none specified' if empty
    localStorage.setItem('avoidedHelpful', avoidedHelpful || 'none specified'); 
    
    router.push('/log-emotion');
  };

  // Validation: Requires selection in all major categories (food, reaction, environment)
  const isReady = foodTriggers.length > 0 && reactedAfter && envExposures.length > 0;

  return (
    <div className="container">
      <Head>
        <title>Trigger Check | Dermind</title>
        <meta name="theme-color" content="#5C4033" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="card-wrapper">
        <div className="card-outline" />

        <div className="card-inner">
          <h1 className="title">🧪 Trigger Watch</h1>
          <p className="subtitle">
            Please log potential internal and external factors from the last 24 hours.
          </p>

          <div className="form-group">

            {/* --- 1. Food Triggers --- */}
            <div className="input-section">
              <label className="input-label required-label">
                Food: Did you eat anything that usually bothers your skin?
              </label>
              <div className="checkbox-options">
                {['Dairy', 'Gluten', 'Sugar', 'Spicy', 'Citrus', 'Chocolate', 'Seafood', 'Eggs', 'None'].map((item) => (
                  <button
                    key={item}
                    onClick={() => toggleCheckbox(item, foodTriggers, setFoodTriggers)}
                    className={`option-button ${foodTriggers.includes(item) ? 'active' : ''}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* --- 2. Reaction After Eating (Dropdown) --- */}
            <label className="input-label required-label">
              Gastrointestinal Reaction: Did you feel any digestive reaction (e.g., bloating, heartburn) within 6 hours of eating?
              <select
                value={reactedAfter}
                onChange={(e) => setReactedAfter(e.target.value)}
                className="styled-select"
              >
                <option value="">Select</option>
                <option value="Yes">Yes, felt a reaction</option>
                <option value="No">No reaction</option>
                <option value="Not sure">Not sure / N/A</option>
              </select>
            </label>

            {/* --- 3. Environmental Triggers --- */}
            <div className="input-section">
              <label className="input-label required-label">
                Environment: Any major environmental exposures today?
              </label>
              <div className="checkbox-options">
                {['Dust', 'Fragrance', 'Smoke', 'New Fabric', 'Pet Hair', 'Heat', 'Cold', 'Sweat', 'Pollen', 'None'].map((item) => (
                  <button
                    key={item}
                    onClick={() => toggleCheckbox(item, envExposures, setEnvExposures)}
                    className={`option-button ${envExposures.includes(item) ? 'active' : ''}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* --- 4. Missed Helpful Action (Text Input) --- */}
            <label className="input-label">
              Missed Care: Did you avoid anything you think usually helps you? (Optional)
              <input
                type="text"
                value={avoidedHelpful}
                onChange={(e) => setAvoidedHelpful(e.target.value)}
                placeholder="e.g. routine moisturizer, calming tea, antihistamine"
                className="styled-text-input"
              />
            </label>

          </div>

          <button
            onClick={handleNext}
            disabled={!isReady}
            className={`button ${!isReady ? 'disabled' : ''}`}
          >
            Log Triggers &rarr; Next
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
        
        /* --- Form Styling --- */
        .form-group {
            text-align: left;
            margin-bottom: 1.5rem;
        }

        .input-section {
            margin-bottom: 2rem;
        }

        .input-label {
            display: block;
            margin-bottom: 0.75rem;
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

        /* Text Input Styling */
        .styled-text-input {
            width: 100%;
            padding: 0.75rem 1rem;
            margin-top: 0.4rem;
            border-radius: 8px;
            border: 1px solid var(--input-border);
            background-color: var(--input-bg);
            font-size: 1rem;
            color: var(--text-color);
            transition: border-color 0.2s, box-shadow 0.2s;
        }
        
        .styled-text-input:focus {
             outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 2px rgba(92, 64, 51, 0.2);
        }

        /* Checkbox Options (Pill Buttons) */
        .checkbox-options {
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
            margin-top: 0.5rem;
        }

        .option-button {
            padding: 0.5rem 1rem;
            border-radius: 9999px; /* Pill shape */
            border: 1px solid var(--input-border);
            background-color: var(--input-bg);
            color: var(--secondary-text);
            cursor: pointer;
            font-size: 0.9rem;
            font-weight: 500;
            transition: background-color 0.2s, border-color 0.2s, color 0.2s, transform 0.1s;
        }

        .option-button:hover {
            border-color: var(--accent-color);
        }

        .option-button.active {
            border: 1px solid var(--primary-color);
            background-color: var(--primary-color);
            color: white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
          .option-button {
            font-size: 0.85rem;
            padding: 0.4rem 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}
