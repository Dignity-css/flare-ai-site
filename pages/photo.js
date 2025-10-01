import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useRef, useEffect } from 'react';

export default function UploadPhoto() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);

  // Load existing photo from localStorage on mount
  useEffect(() => {
    const existingPhoto = localStorage.getItem('skinPhoto');
    if (existingPhoto) {
      setPreview(existingPhoto);
      setIsPhotoUploaded(true);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setPreview(result);
        setIsPhotoUploaded(true);
        // Save the base64 string to localStorage
        localStorage.setItem('skinPhoto', result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleNext = () => {
      // Logic to continue: ensures a photo is present (even if previously saved)
      if (preview) {
          router.push('/home');
      }
  }

  return (
    <div className="container">
      <Head>
        <title>Upload Photo | Dermind</title>
        <meta name="theme-color" content="#5C4033" />
      </Head>

      <div className="card-wrapper">
        <div className="card-outline" />

        <div className="card-inner">
          <h1 className="title">📸 Baseline Photo</h1>
          <p className="subtitle">
            Please take a well-lit photo of the affected skin area. This helps the AI establish a baseline.
          </p>

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            capture="environment" // Suggests using the back camera on mobile
            onChange={handleImageChange}
            ref={fileInputRef}
            className="hidden-file-input"
            id="skin-photo-upload"
          />

          {/* Custom Upload Button */}
          <button
            className="upload-button"
            onClick={() => fileInputRef.current.click()}
            aria-label={isPhotoUploaded ? "Change photo" : "Take or choose photo"}
          >
            {isPhotoUploaded ? 'Change Photo' : 'Take/Select Photo'}
          </button>

          {/* Photo Preview Section */}
          <div className="preview-section">
            {preview ? (
              <>
                <p className="preview-label">Current Baseline Photo:</p>
                <img 
                    src={preview} 
                    alt="Skin Photo Preview" 
                    className="photo-preview"
                />
              </>
            ) : (
                <div className="no-photo-placeholder">
                    No photo uploaded yet.
                </div>
            )}
          </div>

          <button
            className={`button ${!isPhotoUploaded ? 'disabled' : ''}`}
            onClick={handleNext}
            disabled={!isPhotoUploaded}
          >
            Continue to Home
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
          --primary-color: #5C4033; /* Dark Brown (Main Button) */
          --accent-color: #8C5C3A; /* Mid-Brown/Highlight (Hover/Upload Button) */
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
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          padding: 1rem;
        }

        /* --- Card Structure & Typography (Consistent) --- */
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
        
        .hidden-file-input {
            display: none; /* Hide the ugly default file input */
        }

        /* --- Custom Upload Button --- */
        .upload-button {
            width: 100%;
            padding: 0.75rem 1rem;
            background-color: var(--accent-color);
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: background-color 0.2s, box-shadow 0.2s;
            margin-bottom: 1.5rem;
        }

        .upload-button:hover {
            background-color: #7A5338;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        /* --- Preview Section --- */
        .preview-section {
            background-color: #EFEBE4; /* Light background for the preview area */
            border-radius: 12px;
            padding: 1rem;
            margin-bottom: 2rem;
            border: 1px dashed var(--border-light);
            text-align: center;
        }
        
        .preview-label {
            font-weight: 600;
            color: var(--primary-color);
            margin-bottom: 0.75rem;
            font-size: 0.95rem;
        }

        .photo-preview {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            display: block;
            margin: 0 auto;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .no-photo-placeholder {
            padding: 3rem 1rem;
            color: var(--secondary-text);
            font-style: italic;
        }

        /* --- Continue Button (Consistent) --- */
        .button {
          margin-top: 0.5rem;
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
      `}</style>
    </div>
  );
}