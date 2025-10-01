// pages/onboarding-adult.js
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function OnboardingAdult() {
  const router = useRouter();
  // 'adult' is set by default and is not intended to be changed here
  const [ageGroup, setAgeGroup] = useState('adult'); 
  const [gender, setGender] = useState('');
  const [skinTone, setSkinTone] = useState('');
  const [location, setLocation] = useState('');

  // The 'Dermind' brand seems to use a reddish/pink accent based on the original styles.
  // I will blend the previous warm/earthy theme with a soft rose accent for this component.

  const handleNext = () => {
    // Only proceed if required fields are filled
    if (!gender || !skinTone || !location) {
      alert('Please fill out all fields.');
      return;
    }

    localStorage.setItem('userType', 'adult');
    localStorage.setItem('ageGroup', ageGroup);
    localStorage.setItem('gender', gender);
    localStorage.setItem('skinTone', skinTone);
    localStorage.setItem('location', location);
    router.push('/onboarding-conditions');
  };

  const fetchLocation = () => {
    setLocation('Detecting...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Note: The geocode.maps.co service may require an API key for production use.
          // It's used here as per the original component's logic.
          fetch(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`)
            .then(res => res.json())
            .then(data => {
              const city = data?.address?.city || data?.address?.town || data?.address?.village || 'Unknown';
              setLocation(city);
            })
            .catch(() => {
              setLocation('Error detecting location');
            });
        },
        () => {
          setLocation('Location access denied');
        }
      );
    } else {
      setLocation('Geolocation not supported');
    }
  };

  // The skin tone colors provided in the original code
  const skinTones = [
    { color: '#f9dcc4', type: 'I' },
    { color: '#e0ac69', type: 'II' },
    { color: '#c68642', type: 'III' },
    { color: '#8d5524', type: 'IV' },
    { color: '#4b3621', type: 'V' },
    { color: '#2a1a0b', type: 'VI' },
  ];

  const allFieldsSelected = gender && skinTone && location;

  return (
    <div className="container">
      <Head>
        <title>Profile Info | Dermind</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="card-wrapper">
        <div className="card-outline" />

        <div className="card-inner">
          <h1 className="title">Tell us about you</h1>
          <p className="subtitle">
            This information helps us provide better, more accurate recommendations.
          </p>

          {/* Gender Select */}
          <label className="input-label">
            <span>Gender</span>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="select-input"
            >
              <option value="">Select your gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </label>

          {/* Skin Tone Selector */}
          <label className="input-label">
            <span>Skin Tone (Fitzpatrick I–VI)</span>
            <div className="skin-tone-group">
              {skinTones.map(({ color, type }) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSkinTone(color)}
                  className={`skin-tone-button ${skinTone === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  aria-label={`Skin Tone Fitzpatrick ${type}`}
                >
                  {/* Optional: Add a checkmark or number if selected for better accessibility */}
                </button>
              ))}
            </div>
          </label>

          {/* Location Input */}
          <label className="input-label">
            <span>Location (City)</span>
            <div className="location-group">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your city or state"
                className="text-input"
              />
              <button
                type="button"
                onClick={fetchLocation}
                className="autodetect-button"
              >
                📍 Auto-detect
              </button>
            </div>
          </label>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={!allFieldsSelected}
            className={`button ${!allFieldsSelected ? 'disabled' : ''}`}
          >
            Next: Review Conditions
          </button>
        </div>
      </div>

      <style jsx>{`
        /* --- Color & Font Variables --- */
        .container {
          --primary-color: #5C4033; /* Dark Brown (Theme Accent 1) */
          --accent-color: #DA3E52; /* Soft Rose/Red (Dermind Accent) */
          --text-color: #2E2C29; /* Very Dark Text */
          --secondary-text: #6B5B4B; /* Muted Text */
          --card-bg: #FAF7F2; /* Cream White */
          --border-light: #E6D5C3; /* Outer Card/Border */
          --inactive-color: #C8B9A6; /* Disabled/Inactive Color */
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
          box-sizing: border-box;
        }
        
        /* --- Card Structure & Aesthetics --- */
        .card-wrapper {
          width: 100%;
          max-width: 420px;
          position: relative;
          padding: 1rem;
        }

        /* The back layer for the layered shadow effect */
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
          padding: 2rem 1.75rem;
          background-color: var(--card-bg);
          border-radius: 22px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.7);
          text-align: left;
          animation: scaleIn 0.5s ease-in-out;
          z-index: 2;
        }

        /* --- Typography --- */
        .title {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--primary-color);
          text-align: center;
        }
        .subtitle {
          font-size: 0.95rem;
          color: var(--secondary-text);
          margin-bottom: 2rem;
          text-align: center;
        }

        /* --- Form Elements --- */
        .input-label {
          display: block;
          margin-bottom: 1.5rem;
          font-weight: 600;
          color: var(--text-color);
          font-size: 1rem;
        }
        
        .input-label > span {
          display: block;
          margin-bottom: 0.5rem;
        }

        .select-input, .text-input {
          width: 100%;
          padding: 0.8rem 1rem;
          margin-top: 0.2rem;
          border-radius: 10px;
          border: 1px solid var(--border-light);
          background-color: #FFF;
          font-size: 1rem;
          color: var(--text-color);
          appearance: none; /* Hide default arrow */
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%236B5B4B'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd' /%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 1em;
          box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);
        }
        
        .select-input:focus, .text-input:focus {
          border-color: var(--accent-color);
          outline: none;
          box-shadow: 0 0 0 3px rgba(218, 62, 82, 0.2); /* Soft focus ring */
        }
        
        /* --- Skin Tone Group --- */
        .skin-tone-group {
          display: flex;
          gap: 0.75rem;
          margin-top: 0.5rem;
          justify-content: space-between;
          padding: 0 0.5rem;
        }
        
        .skin-tone-button {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          cursor: pointer;
          border: 3px solid #FFF; /* White border for contrast */
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          flex-shrink: 0;
        }
        
        .skin-tone-button:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
        
        .skin-tone-button.selected {
          transform: scale(1.15);
          border: 3px solid var(--primary-color);
          box-shadow: 0 0 0 4px rgba(92, 64, 51, 0.2), 0 4px 10px rgba(0,0,0,0.3);
        }
        
        /* --- Location Group --- */
        .location-group {
          display: flex;
          gap: 0.75rem;
        }

        .text-input {
          flex-grow: 1;
          margin-top: 0;
        }
        
        .autodetect-button {
          background-color: var(--primary-color);
          color: white;
          padding: 0.8rem 1rem;
          border: none;
          border-radius: 10px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s, transform 0.1s;
          white-space: nowrap;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .autodetect-button:hover {
          background-color: var(--accent-color);
        }

        /* --- Next Button --- */
        .button {
          margin-top: 2.5rem;
          width: 100%;
          padding: 1rem;
          background-color: var(--accent-color); /* Using the soft rose accent for primary action */
          color: #FFFFFF;
          border: none;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.2s, opacity 0.3s;
          box-shadow: 0 6px 15px rgba(218, 62, 82, 0.4);
        }

        .button:not(.disabled):hover {
          background-color: #C53A49; /* Darker rose on hover */
          transform: translateY(-2px);
          box-shadow: 0 8px 18px rgba(218, 62, 82, 0.5);
        }

        .button.disabled {
          background-color: var(--inactive-color);
          cursor: not-allowed;
          opacity: 0.8;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          transform: none;
        }
        
        .button:focus {
          outline: 3px solid var(--primary-color);
          outline-offset: 2px;
        }

        /* --- Animation --- */
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}