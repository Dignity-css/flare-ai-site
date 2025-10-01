import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Onboarding() {
  const router = useRouter();
  const [userType, setUserType] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // --- Data & Logic (Kept the same) ---

  useEffect(() => {
    // Reset localStorage for testing/initial run, as per original logic
    console.log('Resetting localStorage for testing...');
    localStorage.removeItem('onboardingComplete');
    localStorage.removeItem('userType');

    const onboardingComplete = localStorage.getItem('onboardingComplete') === 'true';
    const storedUserType = localStorage.getItem('userType');

    if (onboardingComplete && storedUserType === 'adult') {
      console.log('Redirecting to /intro due to localStorage conditions');
      router.push('/intro');
    }

    setIsLoading(false);
  }, [router]);

  const handleNext = () => {
    if (!userType) return;

    localStorage.setItem('userType', userType);

    // ******************************************************
    // *** FIX APPLIED HERE: Changed path to /onboarding-child ***
    // ******************************************************
    if (userType === 'child') {
      router.push('/onboarding-child'); 
    } else if (userType === 'adult') {
      router.push('/onboarding-adult');
    }
  };

  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="loading-container">
        <p>Loading...</p>

        <style jsx global>{`
          .loading-container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #EAD7C0 0%, #F5E6D3 100%);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            color: #2E2C29;
            font-size: 1.1rem;
          }
        `}</style>
      </div>
    );
  }

  // --- Main Component Render ---
  return (
    <div
      className="container"
      role="main"
      aria-label="Flare AI onboarding selection"
    >
      <Head>
        <title>Start Onboarding | Flare AI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#5C4033" />
        <meta name="description" content="Flare AI: Select user type to begin onboarding" />
      </Head>

      <div className="card-wrapper">
        <div className="card-outline" /> {/* For the layered shadow effect */}

        <div className="card-inner">
          <h1 className="title">Who is this app for?</h1>

          <div className="selection-group">
            {/* Adult Selection */}
            <label className={`radio-label ${userType === 'adult' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="userType"
                value="adult"
                checked={userType === 'adult'}
                onChange={() => setUserType('adult')}
                className="hidden-radio"
                aria-label="Select Myself (Age 13+)"
              />
              <span className="radio-text">
                Myself <span className="age-range">(Age 13+)</span>
              </span>
            </label>

            {/* Child Selection */}
            <label className={`radio-label ${userType === 'child' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="userType"
                value="child"
                checked={userType === 'child'}
                onChange={() => setUserType('child')}
                className="hidden-radio"
                aria-label="Select My child (Age 0–12)"
              />
              <span className="radio-text">
                My child <span className="age-range">(Age 0–12)</span>
              </span>
            </label>
          </div>

          <button
            onClick={handleNext}
            disabled={!userType}
            className={`button ${!userType ? 'disabled' : ''}`}
            aria-label="Proceed to next onboarding step"
          >
            Next
          </button>
        </div>
      </div>

      <style jsx>{`
        /* --- Color & Font Variables --- */
        .container {
          --primary-color: #5C4033; /* Dark Brown */
          --accent-color: #8C5C3A; /* Mid-Brown/Highlight */
          --text-color: #2E2C29; /* Very Dark Text */
          --secondary-text: #6B5B4B; /* Muted Text */
          --card-bg: #FAF7F2; /* Cream White */
          --border-light: #E6D5C3; /* Outer Card/Border */
          --inactive-color: #C8B9A6; /* Disabled/Inactive Color */
          
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #EAD7C0 0%, #F5E6D3 100%);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          padding: 1rem;
          box-sizing: border-box;
        }

        /* --- Card Structure & Aesthetics --- */
        .card-wrapper {
          width: 100%;
          max-width: 360px;
          position: relative;
          padding: 1rem;
        }

        /* The back layer for the layered shadow effect */
        .card-outline {
          position: absolute;
          top: 0.5rem; /* Lowered offset for a smoother shadow */
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
          padding: 2rem 1.5rem; /* More vertical padding */
          background-color: var(--card-bg);
          border-radius: 20px; /* Softer, more modern corners */
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.6); /* Soft inner glow */
          text-align: center;
          animation: scaleIn 0.5s ease-in-out;
          z-index: 2;
        }
        
        /* --- Typography --- */
        .title {
          font-size: 1.6rem;
          font-weight: 700;
          margin-bottom: 2rem;
          color: var(--primary-color); /* Title color matching primary accent */
          letter-spacing: -0.02em;
        }

        .selection-group {
          display: flex;
          flex-direction: column;
          gap: 1rem; /* Space between the custom radio buttons */
          margin-bottom: 2rem;
        }

        /* --- Custom Radio Buttons (Tactile Selection) --- */
        .hidden-radio {
          display: none; /* Hide the native radio input */
        }

        .radio-label {
          display: block;
          position: relative;
          padding: 1rem;
          border-radius: 12px;
          border: 2px solid var(--border-light);
          background-color: #FFF;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          text-align: left;
          font-size: 1.05rem;
          font-weight: 500;
          color: var(--text-color);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
        }

        .radio-label:hover {
          background-color: #FEFBF8;
          border-color: var(--accent-color);
        }

        .radio-label.selected {
          border-color: var(--primary-color);
          background-color: #F8F4F0; /* Slightly darker selected background */
          box-shadow: 0 0 0 4px rgba(92, 64, 51, 0.1); /* Subtle ring effect */
          color: var(--primary-color);
          font-weight: 600;
        }

        .age-range {
          display: block;
          font-size: 0.85rem;
          color: var(--secondary-text);
          margin-top: 0.2rem;
          font-weight: 400;
        }
        .radio-label.selected .age-range {
          color: var(--primary-color);
        }

        /* --- Button --- */
        .button {
          width: 100%;
          padding: 1rem;
          background-color: var(--primary-color);
          color: #FFFFFF;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.2s, opacity 0.3s;
          touch-action: manipulation;
          box-shadow: 0 4px 8px rgba(92, 64, 51, 0.3); /* Prominent button shadow */
        }

        .button:not(.disabled):hover {
          background-color: var(--accent-color);
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(92, 64, 51, 0.35);
        }

        .button.disabled {
          background-color: var(--inactive-color);
          cursor: not-allowed;
          opacity: 0.8;
          box-shadow: none;
        }
        
        .button:focus {
          outline: 3px solid var(--accent-color);
          outline-offset: 2px;
        }

        /* --- Animations (from original) --- */
        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}