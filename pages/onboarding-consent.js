import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function OnboardingConsent() {
  const router = useRouter();
  const [hasMedicalConsent, setHasMedicalConsent] = useState(false);
  const [hasAIConsent, setHasAIConsent] = useState(false);

  const handleContinue = () => {
    if (hasMedicalConsent && hasAIConsent) {
      // Save consent to localStorage
      localStorage.setItem('medicalConsent', 'true');
      localStorage.setItem('aiConsent', 'true');
      
      // Navigate to the next step
      router.push('/onboarding-summary');
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Consent | Dermind</title>
        <meta name="theme-color" content="#5C4033" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="card-wrapper">
        <div className="card-outline" />

        <div className="card-inner">
          <h1 className="title">Consent Agreement</h1>
          <p className="subtitle">
            Please review and agree to the terms below to continue using Dermind.
          </p>

          <div className="consent-group">
            {/* Medical Disclaimer Consent */}
            <label className={`checkbox-label ${hasMedicalConsent ? 'checked' : ''}`}>
              <input
                type="checkbox"
                checked={hasMedicalConsent}
                onChange={() => setHasMedicalConsent(!hasMedicalConsent)}
                className="hidden-checkbox"
                aria-label="Consent to medical disclaimer"
              />
              <span className="custom-checkbox"></span>
              <span className="consent-text">
                I understand this app is a tracking and pattern-detection tool and does not replace professional medical advice or care.
              </span>
            </label>

            {/* AI Data Usage Consent */}
            <label className={`checkbox-label ${hasAIConsent ? 'checked' : ''}`}>
              <input
                type="checkbox"
                checked={hasAIConsent}
                onChange={() => setHasAIConsent(!hasAIConsent)}
                className="hidden-checkbox"
                aria-label="Consent to anonymous data usage"
              />
              <span className="custom-checkbox"></span>
              <span className="consent-text">
                I agree to my anonymous, non-identifiable data being used solely to train and improve the Flare AI model.
              </span>
            </label>
          </div>

          <button
            onClick={handleContinue}
            disabled={!hasMedicalConsent || !hasAIConsent}
            className={`button ${!hasMedicalConsent || !hasAIConsent ? 'disabled' : ''}`}
          >
            Begin Skin Journey
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
        /* --- Color & Font Variables (Consistent Theme) --- */
        .container {
          --primary-color: #5C4033; /* Dark Brown (Main Button/Checked) */
          --accent-color: #8C5C3A; /* Mid-Brown/Highlight (Hover State) */
          --text-color: #2E2C29;
          --secondary-text: #6B5B4B;
          --card-bg: #FAF7F2; /* Cream White */
          --border-light: #E6D5C3;
          --inactive-color: #C8B9A6;
          --gradient-start: #EAD7C0;
          --gradient-end: #F5E6D3;
          --checkbox-checked: var(--primary-color);

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

        /* --- Consent Group --- */
        .consent-group {
          text-align: left;
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .checkbox-label {
          display: flex;
          align-items: flex-start;
          cursor: pointer;
          font-size: 1rem;
          line-height: 1.4;
          color: var(--text-color);
          position: relative;
          padding-left: 2rem;
        }

        .hidden-checkbox {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }

        .custom-checkbox {
          position: absolute;
          top: 0;
          left: 0;
          height: 1.25rem;
          width: 1.25rem;
          background-color: #FFF;
          border: 2px solid var(--inactive-color);
          border-radius: 6px;
          transition: all 0.2s;
          flex-shrink: 0;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .checkbox-label:hover .custom-checkbox {
          border-color: var(--primary-color);
        }

        .checkbox-label.checked .custom-checkbox {
          background-color: var(--checkbox-checked);
          border-color: var(--checkbox-checked);
        }

        .custom-checkbox:after {
          content: "";
          position: absolute;
          display: none;
        }

        .checkbox-label.checked .custom-checkbox:after {
          display: block;
        }

        .checkbox-label .custom-checkbox:after {
          left: 4px;
          top: 0px;
          width: 6px;
          height: 12px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }

        .consent-text {
          display: inline-block;
        }

        /* --- Button --- */
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
          /* Use the consistent mid-brown accent color for hover */
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
          .checkbox-label {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </div>
  );
}
