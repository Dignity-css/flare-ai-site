// pages/onboarding-child.js
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function OnboardingChild() {
  const router = useRouter();
  const [ageGroup, setAgeGroup] = useState('0-3');
  const [skinTone, setSkinTone] = useState('');
  const [condition, setCondition] = useState([]);
  const [location, setLocation] = useState('');
  const [otherCondition, setOtherCondition] = useState('');

  const toggleCondition = (value) => {
    setCondition((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleNext = () => {
    let allConditions = [...condition];
    if (condition.includes('Other') && otherCondition.trim()) {
      allConditions = allConditions.filter((c) => c !== 'Other');
      allConditions.push(`Other: ${otherCondition.trim()}`);
    }

    // Save data to localStorage
    localStorage.setItem('userType', 'child');
    localStorage.setItem('ageGroup', ageGroup);
    localStorage.setItem('skinTone', skinTone);
    localStorage.setItem('conditions', JSON.stringify(allConditions));
    localStorage.setItem('location', location);
    
    // Proceed to the next step
    router.push('/onboarding-consent');
  };

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        // Use google tool to get city/location data from coordinates
        // Using a direct geocoding URL as per the original code's intention:
        fetch(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`)
          .then((res) => res.json())
          .then((data) => {
            const city =
              data?.address?.city ||
              data?.address?.town ||
              data?.address?.village ||
              'Unknown';
            setLocation(city);
          })
          .catch(() => {
            // Handle error case for failed fetch
            setLocation('Location fetch failed');
          });
      }, (error) => {
          // Handle error case for denied geolocation
          console.error("Geolocation Error: ", error.message);
          setLocation('Permission denied');
      });
    } else {
        // Handle case where geolocation is not supported
        setLocation('Not supported');
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Child Profile | Dermind</title>
        <meta name="theme-color" content="#5C4033" />
      </Head>

      <div className="card-wrapper">
        <div className="card-outline" />

        <div className="card-inner">
          <h1 className="title">👶 Parent Profile Setup</h1>

          {/* Age Group */}
          <label className="input-label">
            Child&apos;s age group:
            <select
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
              className="select-input"
            >
              <option value="0-3">0–3 yrs (Infant/Toddler)</option>
              <option value="4-7">4–7 yrs (Preschool/Early School)</option>
              <option value="8-12">8–12 yrs (Pre-teen)</option>
            </select>
          </label>

          {/* Skin Tone */}
          <div className="input-group">
            <span className="input-label">Skin tone (Fitzpatrick scale reference):</span>
            <div className="swatch-container">
              {['#f9dcc4', '#e0ac69', '#c68642', '#8d5524', '#4b3621', '#2a1a0b'].map((tone, idx) => (
                <button
                  key={idx}
                  onClick={() => setSkinTone(tone)}
                  className={`skin-swatch ${skinTone === tone ? 'selected' : ''}`}
                  style={{ backgroundColor: tone }}
                  aria-label={`Select skin tone ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Conditions */}
          <div className="input-group">
            <span className="input-label">Conditions being managed:</span>
            <div className="tag-container">
              {['Eczema', 'Psoriasis', 'Acne', 'Urticaria', 'Seborrheic Dermatitis', 'not sure', 'Other'].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => toggleCondition(item)}
                  className={`tag-button ${condition.includes(item) ? 'selected' : ''}`}
                >
                  {item}
                </button>
              ))}
            </div>

            {condition.includes('Other') && (
              <input
                type="text"
                placeholder="Type the condition (e.g., Contact Dermatitis)"
                value={otherCondition}
                onChange={(e) => setOtherCondition(e.target.value)}
                className="text-input other-input"
              />
            )}
          </div>

          {/* Location */}
          <label className="input-label">
            City (for environmental data):
            <div className="location-group">
              <input
                type="text"
                placeholder="e.g. Islamabad"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="text-input"
              />
              <button
                onClick={fetchLocation}
                type="button"
                className="detect-button"
                disabled={location === 'Permission denied' || location === 'Not supported'}
              >
                Auto-detect
              </button>
            </div>
          </label>

          <button
            onClick={handleNext}
            className="button"
            disabled={!skinTone || condition.length === 0}
          >
            Continue
          </button>
        </div>
      </div>

      <style jsx global>{`
        /* Global Reset to ensure clean slate */
        .container, .container * {
            box-sizing: border-box;
        }
      `}</style>
      <style jsx>{`
        /* --- Color & Font Variables --- */
        .container {
          --primary-color: #5C4033; /* Dark Brown */
          --accent-color: #8C5C3A; /* Mid-Brown/Highlight */
          --text-color: #2E2C29;
          --secondary-text: #6B5B4B;
          --card-bg: #FAF7F2; /* Cream White */
          --border-light: #E6D5C3;
          --inactive-color: #C8B9A6;
          --selection-bg: #F8F4F0; /* Selected background */
          --button-fill: #5C4033; /* Primary Button fill */
          --gradient-start: #EAD7C0;
          --gradient-end: #F5E6D3;

          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, var(--gradient-start) 0%, var(--gradient-end) 100%);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          padding: 1rem;
        }

        /* --- Card Structure & Typography (Same as Onboarding.js) --- */
        .card-wrapper {
          width: 100%;
          max-width: 440px;
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
          border-radius: 16px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          z-index: 1;
        }

        .card-inner {
          position: relative;
          width: 100%;
          padding: 2.5rem 2rem;
          background-color: var(--card-bg);
          border-radius: 20px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.6);
          text-align: center;
          z-index: 2;
        }
        
        .title {
          font-size: 1.6rem;
          font-weight: 700;
          margin-bottom: 2rem;
          color: var(--primary-color);
          letter-spacing: -0.02em;
        }

        /* --- Form Elements --- */
        .input-label {
            display: block;
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
            font-weight: 600;
            color: var(--secondary-text);
            text-align: left;
        }
        
        .input-group {
            margin-bottom: 1.5rem;
            text-align: left;
        }

        .select-input {
            width: 100%;
            padding: 0.75rem 1rem;
            margin-top: 0.3rem;
            border-radius: 8px;
            border: 1px solid var(--border-light);
            background-color: #FFF;
            color: var(--text-color);
            font-size: 1rem;
            appearance: none; /* Remove default arrow in some browsers */
            cursor: pointer;
            box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        /* --- Skin Tone Swatches --- */
        .swatch-container {
            display: flex;
            gap: 0.75rem;
            margin-top: 0.5rem;
            justify-content: center;
        }
        
        .skin-swatch {
            width: 38px;
            height: 38px;
            border-radius: 50%;
            border: 2px solid var(--border-light);
            cursor: pointer;
            transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
            padding: 0;
            flex-shrink: 0;
        }

        .skin-swatch:hover {
            transform: scale(1.05);
            border-color: var(--accent-color);
        }
        
        .skin-swatch.selected {
            border: 3px solid var(--primary-color);
            transform: scale(1.1);
            box-shadow: 0 0 0 3px var(--selection-bg);
        }
        
        /* --- Condition Tags --- */
        .tag-container {
            display: flex;
            flex-wrap: wrap;
            gap: 0.6rem;
            margin-top: 0.5rem;
        }
        
        .tag-button {
            padding: 0.4rem 0.8rem;
            border-radius: 999px; /* Pill shape */
            border: 1px solid var(--inactive-color);
            background-color: #FFF;
            color: var(--secondary-text);
            font-weight: 500;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s;
            flex-shrink: 0;
        }
        
        .tag-button.selected {
            background-color: var(--primary-color);
            color: #FFFFFF;
            border-color: var(--primary-color);
            box-shadow: 0 2px 5px rgba(92, 64, 51, 0.2);
        }
        
        .tag-button:hover:not(.selected) {
            border-color: var(--accent-color);
            color: var(--accent-color);
        }
        
        .text-input {
            width: 100%;
            padding: 0.75rem 1rem;
            border-radius: 8px;
            border: 1px solid var(--border-light);
            background-color: #FFF;
            color: var(--text-color);
            font-size: 1rem;
            box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .other-input {
            margin-top: 0.75rem;
        }
        
        /* --- Location Input --- */
        .location-group {
            display: flex;
            gap: 0.5rem;
            margin-top: 0.3rem;
        }

        .detect-button {
            background-color: var(--accent-color);
            color: white;
            border: none;
            padding: 0.75rem 1rem;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            font-size: 0.9rem;
            transition: background-color 0.2s;
            flex-shrink: 0;
        }
        
        .detect-button:hover:not(:disabled) {
            background-color: #7A5338;
        }

        .detect-button:disabled {
            background-color: var(--inactive-color);
            cursor: not-allowed;
            opacity: 0.7;
        }

        /* --- Button --- */
        .button {
          margin-top: 1.5rem;
          width: 100%;
          padding: 1rem;
          background-color: var(--button-fill);
          color: #FFFFFF;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.2s, opacity 0.3s;
          box-shadow: 0 4px 8px rgba(92, 64, 51, 0.3);
        }

        .button:not(:disabled):hover {
          background-color: var(--accent-color);
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(92, 64, 51, 0.35);
        }

        .button:disabled {
          background-color: var(--inactive-color);
          cursor: not-allowed;
          opacity: 0.8;
          box-shadow: none;
        }
      `}</style>
    </div>
  );
}