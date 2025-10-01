// pages/onboarding-conditions.js
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect, useMemo } from 'react';

export default function OnboardingConditions() {
  const router = useRouter();
  const [conditions, setConditions] = useState([]);
  const [other, setOther] = useState('');
  const [userType, setUserType] = useState('');

  // --- Logic ---

  const conditionList = useMemo(() => [
    'Eczema',
    'Psoriasis',
    'Acne',
    'Urticaria (Hives)',
    'Rosacea', 
    'Seborrheic Dermatitis',
    'I’m not sure',
  ], []);

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    if (storedUserType) setUserType(storedUserType);
  }, []);

  const toggleCondition = (value) => {
    setConditions((prev) => {
      // If "None" is selected, clear other options
      if (value === 'None of the above') {
        return prev.includes(value) ? [] : [value];
      }

      // If any other option is selected, remove "None of the above"
      const updatedConditions = prev.filter((v) => v !== 'None of the above');

      return updatedConditions.includes(value) 
        ? updatedConditions.filter((v) => v !== value) 
        : [...updatedConditions, value];
    });
  };

  const handleNext = () => {
    const allConditions = [...conditions];
    if (other.trim()) allConditions.push(`Other: ${other.trim()}`);
    
    // Do not save 'I'm not sure' or 'None of the above' to localStorage as actionable data
    const cleanedConditions = allConditions.filter(c => 
      c !== 'I’m not sure' && c !== 'None of the above'
    );
    
    localStorage.setItem('conditions', JSON.stringify(cleanedConditions));

    // Logic for conditional redirect (checking if hormonal conditions are present)
    const isHormonal = allConditions.some(c =>
      ['Acne', 'Urticaria (Hives)'].includes(c)
    );

    const gender = localStorage.getItem('gender');
    const isAdultFemale = userType === 'adult' && gender === 'female'; 

    if (isAdultFemale && isHormonal) {
      router.push('/onboarding-medical');
    } else {
      router.push('/onboarding-summary');
    }
  };

  const canProceed = conditions.length > 0 || other.trim() !== '';

  // --- Render ---

  return (
    <div className="container">
      <Head><title>Conditions | Dermind</title></Head>

      <div className="card-wrapper">
        <div className="card-outline" />

        <div className="card-inner">
          <h1 className="title">
            Which skin condition(s) are you managing?
          </h1>
          <p className="subtitle">
            Select all that apply. This helps personalize your treatment plan.
          </p>

          <div className="conditions-group">
            {conditionList.map((item) => {
              const isSelected = conditions.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleCondition(item)}
                  className={`condition-tag ${isSelected ? 'selected' : ''}`}
                  disabled={conditions.includes('None of the above') && item !== 'None of the above'}
                >
                  {item}
                </button>
              );
            })}
             {/* New Option for Clarity */}
            <button
                type="button"
                onClick={() => toggleCondition('None of the above')}
                className={`condition-tag tertiary ${conditions.includes('None of the above') ? 'selected' : ''}`}
            >
                None of the above
            </button>
          </div>

          <label className="other-label">
            Other:
            <input
              type="text"
              value={other}
              onChange={(e) => setOther(e.target.value)}
              placeholder="Enter another condition (e.g., vitiligo, scarring)"
              className="text-input"
            />
          </label>

          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={`button ${!canProceed ? 'disabled' : ''}`}
          >
            Next
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
          max-width: 480px;
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

        /* --- Condition Tags (The improved selection buttons) --- */
        .conditions-group {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 2rem;
          justify-content: center;
        }
        
        .condition-tag {
          padding: 0.7rem 1.1rem;
          border-radius: 20px; /* Highly rounded for a tag look */
          border: 1px solid var(--border-light);
          background-color: #FFF;
          color: var(--text-color);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          user-select: none;
          flex-grow: 0;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .condition-tag:hover:not(.selected):not(:disabled) {
          border-color: var(--primary-color);
          background-color: #F8F4F0;
        }

        .condition-tag.selected {
          background-color: var(--accent-color);
          color: white;
          border-color: var(--accent-color);
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(218, 62, 82, 0.3);
        }
        
        .condition-tag:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          background-color: var(--card-bg);
          color: var(--secondary-text);
        }

        .condition-tag.tertiary {
             background-color: var(--border-light);
             color: var(--primary-color);
             border-color: var(--border-light);
             font-weight: 600;
        }
        .condition-tag.tertiary.selected {
             background-color: var(--primary-color);
             color: white;
             border-color: var(--primary-color);
        }


        /* --- Other Input Field --- */
        .other-label {
          display: block;
          font-weight: 600;
          color: var(--text-color);
          margin-bottom: 0.5rem;
        }
        
        .text-input {
          width: 100%;
          padding: 0.8rem 1rem;
          margin-top: 0.5rem;
          border-radius: 10px;
          border: 1px solid var(--border-light);
          background-color: #FFF;
          font-size: 1rem;
          color: var(--text-color);
          box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);
          /* --- FIX APPLIED HERE --- */
          text-align: center; 
          /* ------------------------- */
        }
        
        .text-input:focus {
          border-color: var(--accent-color);
          outline: none;
          box-shadow: 0 0 0 3px rgba(218, 62, 82, 0.2);
        }

        /* --- Next Button --- */
        .button {
          margin-top: 2.5rem;
          width: 100%;
          padding: 1rem;
          background-color: var(--accent-color);
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
          background-color: #C53A49;
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