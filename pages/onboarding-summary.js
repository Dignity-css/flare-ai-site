// pages/onboarding-summary.js
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function OnboardingSummary() {
  const router = useRouter();
  const [summary, setSummary] = useState({});

  useEffect(() => {
    const getStorageItem = (key, isJson = false) => {
      const item = localStorage.getItem(key);
      if (isJson) {
        try {
          return JSON.parse(item || '{}');
        } catch {
          return {};
        }
      }
      return item || '';
    };

    const fetchedData = {
      userType: getStorageItem('userType'),
      gender: getStorageItem('gender'),
      skinTone: getStorageItem('skinTone'),
      location: getStorageItem('location'),
      conditions: JSON.parse(localStorage.getItem('conditions') || '[]'),
      hormoneData: getStorageItem('hormoneData', true),
      lifestyle: getStorageItem('lifestyle', true),
    };
    setSummary(fetchedData);
  }, []);

  const handleStart = () => {
    localStorage.setItem('onboardingComplete', 'true');
    router.push('/log-daily');
  };

  // Helper function to render conditions as pill tags
  const renderConditions = (conditions) => {
    if (!conditions || conditions.length === 0)
      return <span className="empty">None reported</span>;
    return conditions.map((c, i) => (
      <span key={i} className="pill">
        {c}
      </span>
    ));
  };

  // Helper function to format value strings
  const formatValue = (value) => {
    if (typeof value !== 'string' || value.length === 0) return '';
    
    if (value.includes('_')) {
      return value
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase());
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  // New simplified rendering function for a single line
  const renderSimpleDetail = (label, value) => {
    if (!value || (Array.isArray(value) && value.length === 0)) return null;

    const displayValue = formatValue(value);
    
    return (
      <div className="summary-item">
        <span className="summary-label">{label}:</span>
        <span className="summary-value">{displayValue}</span>
      </div>
    );
  };
  
  // Custom render for the Skin Tone to include the color swatch
  const renderSkinTone = () => {
    if (!summary.skinTone) return renderSimpleDetail('Skin Tone', 'Not provided');
    
    return (
      <div className="summary-item">
        <span className="summary-label">Skin Tone:</span>
        <span className="summary-value" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="skin-code">{summary.skinTone}</span>
          <span
            className="skin-swatch"
            style={{ backgroundColor: summary.skinTone }}
            aria-label={`Selected skin tone color ${summary.skinTone}`}
          ></span>
        </span>
      </div>
    );
  };

  // Custom render for Conditions
  const renderConditionsSection = () => {
      if (!summary.conditions || summary.conditions.length === 0) {
          return renderSimpleDetail('Conditions Managed', 'None reported');
      }
      return (
          <div className="summary-item conditions-row">
              <span className="summary-label">Conditions Managed:</span>
              <div className="summary-value conditions-list">
                  {renderConditions(summary.conditions)}
              </div>
          </div>
      );
  };

  const getEnvironmentalRisk = () => {
    if (!summary.location) return 'Risk data unavailable';
    return 'High UV Exposure';
  };
  
  // Combine all items into a single flat array for simple mapping
  const allSummaryItems = [
      // Profile
      { title: 'Your Profile', items: [
          renderSimpleDetail('User Type', summary.userType),
          renderSimpleDetail('Location', summary.location),
          renderSimpleDetail('Gender', summary.gender),
      ]},
      // Skin
      { title: 'Skin Snapshot', items: [
          renderConditionsSection(),
          renderSkinTone(),
          // Always show environmental risk for completeness
          renderSimpleDetail('Environmental Risk', getEnvironmentalRisk()),
      ]},
      // Lifestyle & Medical (only show section if there is data)
      { title: 'Key Lifestyle Factors', items: [
          summary.lifestyle?.itchLevel && renderSimpleDetail('Baseline Itch Level', `${summary.lifestyle.itchLevel}/10`),
          summary.hormoneData?.cycleLength && renderSimpleDetail('Hormone Cycle Length', `${summary.hormoneData.cycleLength} Days`),
          summary.hormoneData?.onMedication && renderSimpleDetail('Current Medication', summary.hormoneData.medicationName || 'Yes (Check medical notes)'),
          summary.lifestyle?.foodTriggers?.length > 0 && renderSimpleDetail('Food Sensitivities', summary.lifestyle.foodTriggers.join(', ')),
      ]},
  ].filter(section => section.items.some(item => item !== null));

  return (
    <div className="container">
      <Head>
        <title>Your Skin Profile | Dermind</title>
      </Head>

      <div className="card-wrapper">
        <div className="card-outline" />

        <div className="card-inner">
          <h1 className="title">All Set! 🎉 Your Skin Profile is Ready.</h1>
          <p className="subtitle">
            A quick look at the information we'll use to personalize your tracking.
          </p>

          <div className="summary-content">
            {allSummaryItems.map((section, index) => (
              <div key={index} className="section">
                <h2 className="section-title">
                  {section.title}
                  <button
                    className="edit-btn"
                    onClick={() => router.push('/onboarding')}
                  >
                    Edit
                  </button>
                </h2>
                <div className="section-details">
                    {section.items.filter((item) => item !== null)}
                </div>
              </div>
            ))}
          </div>

          <div className="ready-message">
            🧠 Flare AI is now ready to learn your personal flare patterns over time.
          </div>

          <button onClick={handleStart} className="button">
            Start Daily Tracking
          </button>
        </div>
      </div>

      <style jsx global>{`
        /* Global Reset to ensure clean slate */
        .summary-content, .summary-content * {
            box-sizing: border-box;
        }
      `}</style>
      <style jsx>{`
        /* --- Color & Font Variables --- */
        .container {
          --primary-color: #5C4033; /* Dark Brown */
          --accent-color: #DA3E52; /* Soft Rose/Red */
          --text-color: #2E2C29; 
          --secondary-text: #6B5B4B; 
          --card-bg: #FAF7F2; /* Cream White */
          --border-light: #E6D5C3; 
          --inactive-color: #C8B9A6; 
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

        /* --- Card Structure & Typography --- */
        .card-wrapper {
          width: 100%;
          max-width: 500px;
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
          margin-bottom: 1.5rem;
        }
        
        /* --- Simplified Summary Structure --- */
        .summary-content {
            text-align: left;
            margin-bottom: 2rem;
            padding-top: 0.5rem;
        }
        
        .section {
            margin-bottom: 2rem;
            padding: 0 0.5rem;
            border-bottom: 1px solid var(--border-light);
            padding-bottom: 1rem;
        }
        
        .section:last-child {
             border-bottom: none;
        }

        .section-title {
            font-size: 1.2rem;
            font-weight: 700;
            color: var(--primary-color);
            margin-bottom: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid var(--accent-color); /* Clean separator for section title */
            padding-bottom: 0.3rem;
        }
        
        .section-details {
            padding-left: 0.5rem;
        }

        .summary-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem 0;
            font-size: 0.95rem;
        }

        .summary-label {
            color: var(--secondary-text);
            font-weight: 500;
            flex-shrink: 0; 
            margin-right: 1rem;
        }
        
        .summary-value {
            color: var(--text-color);
            font-weight: 600;
            text-align: right; 
            flex-grow: 1; /* Allows value to take up remaining space */
            word-break: break-word; 
        }
        
        .conditions-row {
            /* Fix for conditions that wrap */
            align-items: flex-start;
        }

        /* --- Custom Value Styling --- */
        .pill {
          display: inline-block;
          background-color: #E6D5C3; 
          color: var(--primary-color);
          padding: 0.2rem 0.6rem;
          border-radius: 999px;
          font-weight: 500;
          font-size: 0.8rem;
          white-space: nowrap; 
          margin-left: 0.4rem; /* Spacing between pills */
        }
        
        .conditions-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-end;
            gap: 0.4rem; 
            line-height: 1.2;
        }
        
        .high-risk {
            color: var(--accent-color); 
            font-weight: 700;
        }
        
        .skin-swatch {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            border: 1px solid var(--primary-color);
            flex-shrink: 0;
        }
        
        .skin-code {
            font-size: 0.85rem;
            color: var(--secondary-text);
        }

        .empty {
            font-style: italic;
            color: var(--inactive-color);
        }

        .ready-message {
            background-color: #F7EAE3;
            color: var(--primary-color);
            padding: 1rem;
            border-radius: 10px;
            margin-bottom: 2rem;
            font-size: 0.95rem;
            text-align: center;
            box-shadow: inset 0 0 0 1px var(--border-light);
        }
        
        .edit-btn {
            background-color: var(--card-bg);
            border: 1px solid var(--border-light);
            padding: 0.2rem 0.6rem;
            border-radius: 10px;
            font-size: 0.85rem;
            font-weight: 600;
            color: var(--secondary-text);
            cursor: pointer;
            transition: all 0.2s;
        }
        .edit-btn:hover {
            background-color: #FFF;
            color: var(--accent-color);
            border-color: var(--accent-color);
        }

        /* --- Button --- */
        .button {
          margin-top: 1rem;
          width: 100%;
          padding: 1rem;
          background-color: var(--accent-color);
          color: #FFFFFF;
          border: none;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.2s;
          box-shadow: 0 6px 15px rgba(218, 62, 82, 0.4);
        }

        .button:hover {
          background-color: #C53A49;
          transform: translateY(-2px);
          box-shadow: 0 8px 18px rgba(218, 62, 82, 0.5);
        }
      `}</style>
    </div>
  );
}