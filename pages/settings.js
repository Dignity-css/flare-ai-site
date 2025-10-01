import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Settings() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [tempName, setTempName] = useState('');
  const [message, setMessage] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [resetType, setResetType] = useState(null); // 'onboarding' or 'all'

  // Load the current name on component mount
  useEffect(() => {
    const storedName = localStorage.getItem('name') || '';
    setName(storedName);
    setTempName(storedName);
  }, []);

  // Function to save the new name
  const handleSaveName = () => {
    if (tempName.trim() !== '') {
      localStorage.setItem('name', tempName.trim());
      setName(tempName.trim());
      setMessage('Name updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('Please enter a valid name.');
    }
  };

  // Function to initiate data reset confirmation
  const initiateReset = (type) => {
    setResetType(type);
    setShowConfirm(true);
  };

  // Function to execute the data reset
  const executeReset = () => {
    if (resetType === 'onboarding') {
      localStorage.removeItem('name');
      // Clear message and redirect
      setMessage('Onboarding data cleared. Redirecting...');
      setTimeout(() => {
        router.push('/intro');
      }, 1000);
    } else if (resetType === 'all') {
      // Clear all log-related data, including temporary logs
      localStorage.removeItem('name');
      localStorage.removeItem('logs');
      localStorage.removeItem('lastLogEntry');
      localStorage.removeItem('skinPhoto'); // The baseline photo
      
      // Clear temporary log items (just in case)
      localStorage.removeItem('logLifestyle');
      localStorage.removeItem('foodTriggers');
      localStorage.removeItem('reactedAfter');
      localStorage.removeItem('envExposures');
      localStorage.removeItem('avoidedHelpful');

      setMessage('All data successfully wiped. You are starting fresh!');
      setTimeout(() => {
        router.push('/intro');
      }, 1000);
    }
    setShowConfirm(false);
    setResetType(null);
  };

  // Helper for rendering reset confirmation message
  const getConfirmationText = () => {
    if (resetType === 'onboarding') {
      return 'Are you sure you want to reset your name and go back to the Introduction page?';
    }
    if (resetType === 'all') {
      return '⚠️ DANGER: Are you absolutely sure you want to wipe ALL your saved logs and history? This cannot be undone.';
    }
    return '';
  };

  return (
    <div className="container">
      <Head>
        <title>Settings | Dermind</title>
        <meta name="theme-color" content="#5C4033" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="card-wrapper">
        <div className="card-outline" />

        <div className="card-inner">
          <button onClick={() => router.back()} className="back-button" aria-label="Go back">
            &larr; Back
          </button>
          
          <h1 className="title">⚙️ App Settings</h1>
          <p className="subtitle">
            Manage your profile and data preferences.
          </p>

          {/* User Name Setting */}
          <div className="setting-section">
            <h2 className="section-header">User Profile</h2>
            <label className="input-label">
              Your Display Name
              <div className="input-group">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="styled-input"
                  placeholder="Enter your name"
                />
                <button 
                  onClick={handleSaveName} 
                  className="save-button"
                  disabled={tempName.trim() === name || tempName.trim() === ''}
                >
                  Save
                </button>
              </div>
            </label>
            {message && <p className={`status-message ${message.includes('success') ? 'success' : 'error'}`}>{message}</p>}
          </div>
          
          {/* Data Management Settings */}
          <div className="setting-section danger-zone">
            <h2 className="section-header danger">Data Management</h2>
            
            <button
              onClick={() => initiateReset('onboarding')}
              className="action-button secondary"
            >
              Reset Name & Onboarding
            </button>
            
            <button
              onClick={() => initiateReset('all')}
              className="action-button danger"
            >
              Wipe All Log History & Data
            </button>
            <p className="danger-note">This action is permanent and cannot be undone.</p>
          </div>

        </div>
      </div>
      
      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{getConfirmationText()}</p>
            <div className="modal-actions">
              <button 
                onClick={() => setShowConfirm(false)} 
                className="modal-button secondary"
              >
                Cancel
              </button>
              <button 
                onClick={executeReset} 
                className={`modal-button ${resetType === 'all' ? 'danger' : ''}`}
              >
                {resetType === 'all' ? 'Confirm Wipe' : 'Confirm Reset'}
              </button>
            </div>
          </div>
        </div>
      )}


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
          --danger-color: #D9534F;
          --success-color: #4CAF50;

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
        
        .back-button {
            position: absolute;
            top: 1.5rem;
            left: 1.5rem;
            background: none;
            border: none;
            color: var(--primary-color);
            font-weight: 600;
            cursor: pointer;
            font-size: 0.9rem;
            transition: color 0.2s;
        }
        .back-button:hover {
            color: var(--accent-color);
        }

        .title {
          font-size: 1.65rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--primary-color);
          margin-top: 1rem;
        }
        .subtitle {
          font-size: 0.95rem;
          color: var(--secondary-text);
          margin-bottom: 2rem;
        }

        /* --- Settings Sections --- */
        .setting-section {
            text-align: left;
            padding: 1rem 0;
            border-top: 1px solid var(--border-light);
        }

        .section-header {
            font-size: 1.1rem;
            font-weight: 700;
            color: var(--primary-color);
            margin-bottom: 1rem;
        }
        
        .section-header.danger {
            color: var(--danger-color);
        }

        .input-label {
            display: block;
            margin-bottom: 1rem;
            font-size: 0.95rem;
            font-weight: 500;
            color: var(--text-color);
        }
        
        .input-group {
            display: flex;
            gap: 0.5rem;
        }

        .styled-input {
            flex-grow: 1;
            padding: 0.75rem 1rem;
            border-radius: 8px;
            border: 1px solid var(--input-border);
            background-color: var(--input-bg);
            font-size: 1rem;
            color: var(--text-color);
            transition: border-color 0.2s, box-shadow 0.2s;
        }

        .styled-input:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 2px rgba(92, 64, 51, 0.2);
        }

        .save-button {
            padding: 0.75rem 1rem;
            background-color: var(--accent-color);
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        
        .save-button:hover:not(:disabled) {
            background-color: var(--primary-color);
        }
        
        .save-button:disabled {
            background-color: var(--inactive-color);
            cursor: not-allowed;
            opacity: 0.7;
        }
        
        .status-message {
            font-size: 0.85rem;
            margin-top: 0.5rem;
            font-weight: 500;
            padding: 0.5rem 0;
            border-radius: 4px;
        }
        
        .status-message.success {
            color: var(--success-color);
        }
        
        .status-message.error {
            color: var(--danger-color);
        }

        /* --- Action Buttons (Resets) --- */
        .action-button {
            width: 100%;
            padding: 0.75rem;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 0.95rem;
            cursor: pointer;
            margin-bottom: 0.75rem;
            transition: background-color 0.2s, transform 0.1s;
        }
        
        .action-button.secondary {
            background-color: var(--border-light);
            color: var(--text-color);
        }
        .action-button.secondary:hover {
            background-color: #e0d0bf;
        }

        .action-button.danger {
            background-color: var(--danger-color);
            color: white;
            box-shadow: 0 3px 6px rgba(217, 83, 79, 0.3);
        }
        .action-button.danger:hover {
            background-color: #c9403d;
        }
        
        .danger-note {
            font-size: 0.8rem;
            color: var(--danger-color);
            text-align: center;
            margin-top: -0.25rem;
            font-style: italic;
        }
        
        /* --- Modal Styling --- */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10;
        }

        .modal-content {
            background: var(--card-bg);
            padding: 2rem;
            border-radius: 12px;
            max-width: 350px;
            width: 90%;
            text-align: center;
            color: var(--text-color);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
        
        .modal-content p {
            margin-bottom: 1.5rem;
            font-weight: 500;
            line-height: 1.4;
        }
        
        .modal-actions {
            display: flex;
            justify-content: space-between;
            gap: 1rem;
        }
        
        .modal-button {
            flex: 1;
            padding: 0.75rem;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        
        .modal-button.secondary {
            background-color: var(--border-light);
            color: var(--text-color);
        }
        .modal-button.secondary:hover {
            background-color: #e0d0bf;
        }
        
        .modal-button:not(.secondary) {
            background-color: var(--primary-color);
            color: white;
        }
        .modal-button:not(.secondary):hover {
            background-color: var(--accent-color);
        }
        
        .modal-button.danger {
            background-color: var(--danger-color);
        }
        .modal-button.danger:hover {
            background-color: #c9403d;
        }
        
        /* Responsive Adjustments */
        @media (max-width: 480px) {
          .card-inner {
            padding: 2rem 1.25rem;
          }
          .title {
            font-size: 1.5rem;
          }
          .back-button {
            top: 1rem;
            left: 1rem;
          }
          .input-group {
            flex-direction: column;
          }
          .save-button {
            width: 100%;
          }
        }

      `}</style>
    </div>
  );
}
