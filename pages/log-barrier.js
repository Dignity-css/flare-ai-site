import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function LogBarrier() {
  const router = useRouter();
  const [moisturized, setMoisturized] = useState('');
  const [newProduct, setNewProduct] = useState('');
  const [productType, setProductType] = useState('');
  const [sweatWash, setSweatWash] = useState('');
  const [sunscreen, setSunscreen] = useState('');
  const [validationError, setValidationError] = useState('');
  const [tip, setTip] = useState('Log your skincare routine to track its impact.');

  useEffect(() => {
    // Load draft from localStorage
    const draft = JSON.parse(localStorage.getItem('log-barrier-draft') || '{}');
    if (draft.moisturized) setMoisturized(draft.moisturized);
    if (draft.newProduct) setNewProduct(draft.newProduct);
    if (draft.productType) setProductType(draft.productType);
    if (draft.sweatWash) setSweatWash(draft.sweatWash);
    if (draft.sunscreen) setSunscreen(draft.sunscreen);

    // Dynamic tip based on triggers or inputs
    const triggers = JSON.parse(localStorage.getItem('triggers') || '[]');
    if (moisturized === 'No') {
      setTip('Moisturizing daily can strengthen your skin barrier.');
    } else if (triggers.includes('Dryness')) {
      setTip('Dryness can worsen flares. Log your moisturizer use.');
    } else if (newProduct === 'Yes') {
      setTip('New products can affect your skin. Track them carefully.');
    }
  }, [moisturized, newProduct]);

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in window.navigator) {
      window.navigator.vibrate(20); // Haptic feedback for input changes
    }
    // Save draft to localStorage
    localStorage.setItem(
      'log-barrier-draft',
      JSON.stringify({
        moisturized,
        newProduct,
        productType,
        sweatWash,
        sunscreen,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleNext = () => {
    if (!moisturized || !newProduct || !sweatWash || !sunscreen || (newProduct === 'Yes' && !productType)) {
      setValidationError(
        'Please fill out all fields' + (newProduct === 'Yes' ? ' and specify the product type.' : '.')
      );
      return;
    }
    const prevLog = JSON.parse(localStorage.getItem('logEntry') || '{}');
    const updatedLog = {
      ...prevLog,
      moisturized,
      newProduct,
      productType: newProduct === 'Yes' ? productType : '',
      sweatWash,
      sunscreen,
    };
    localStorage.setItem('logEntry', JSON.stringify(updatedLog));
    localStorage.removeItem('log-barrier-draft'); // Clear draft
    if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in window.navigator) {
      window.navigator.vibrate(50); // Haptic feedback for button
    }
    router.push('/log-lifestyle');
  };

  const selectStyle = {
    width: '100%',
    padding: '0.75rem',
    marginTop: '0.5rem',
    borderRadius: '12px',
    border: `1px solid ${validationError && !moisturized ? '#D9534F' : 'var(--dot-inactive)'}`,
    background: '#FFFFFF',
    fontSize: '0.9rem',
    color: 'var(--text-color)',
    transition: 'border-color 0.3s, transform 0.3s',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    marginTop: '0.5rem',
    borderRadius: '12px',
    border: `1px solid ${validationError && newProduct === 'Yes' && !productType ? '#D9534F' : 'var(--dot-inactive)'}`,
    fontSize: '0.9rem',
    color: 'var(--text-color)',
    transition: 'border-color 0.3s, transform 0.3s',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1.5rem 1.25rem 6rem',
        background: 'linear-gradient(135deg, #EAD7C0 0%, #F5E6D3 100%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        '--primary-color': '#5C4033',
        '--accent-color': '#8C5C3A',
        '--text-color': '#2E2C29',
        '--secondary-text': '#6B5B4B',
        '--secondary-bg': '#E6D5C3',
        '--dot-inactive': '#C8B9A6',
      }}
    >
      <Head>
        <title>Barrier Care | Flare AI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#5C4033" />
        <meta name="description" content="Flare AI: Log your skincare routine" />
        <link rel="apple-touch-icon" href="/flare-logo.png" />
      </Head>

      <div style={{ width: '100%', maxWidth: '380px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
          <button
            onClick={() => {
              if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in window.navigator) {
                window.navigator.vibrate(50);
              }
              router.push('/log-status');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary-color)',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer',
              padding: '0.5rem',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            aria-label="Back to skin status"
          >
            ← Back
          </button>
          <h1
            style={{
              fontSize: '1.6rem',
              fontWeight: '700',
              color: 'var(--text-color)',
              textAlign: 'center',
              flex: 1,
              animation: 'fadeIn 0.5s ease-in-out',
            }}
          >
            Barrier & Skincare
          </h1>
        </div>

        <div
          style={{
            background: 'linear-gradient(145deg, #FFFFFF, #F8F6F2)',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
            animation: 'fadeIn 0.5s ease-in-out 0.2s both',
          }}
        >
          <svg
            width="56"
            height="56"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--primary-color)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ margin: '0 auto 1rem', display: 'block' }}
            aria-label="Skincare bottle icon"
          >
            <path d="M10 2h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
            <path d="M6 8h12v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8z" />
            <circle cx="12" cy="12" r="2" />
          </svg>

          <label
            style={{
              display: 'block',
              marginBottom: '1.5rem',
              animation: 'fadeIn 0.5s ease-in-out 0.3s both',
            }}
          >
            <span style={{ fontSize: '0.9rem', color: 'var(--secondary-text)' }}>
              Did you apply your regular moisturizer today?
            </span>
            <select
              value={moisturized}
              onChange={handleInputChange(setMoisturized)}
              style={{
                ...selectStyle,
                border: `1px solid ${validationError && !moisturized ? '#D9534F' : 'var(--dot-inactive)'}`,
              }}
              aria-label="Moisturizer use"
              aria-invalid={validationError && !moisturized}
              name="moisturized"
            >
              <option value="">Select</option>
              <option>Yes</option>
              <option>No</option>
              <option>Sometimes</option>
            </select>
          </label>

          <label
            style={{
              display: 'block',
              marginBottom: '1.5rem',
              animation: 'fadeIn 0.5s ease-in-out 0.4s both',
            }}
          >
            <span style={{ fontSize: '0.9rem', color: 'var(--secondary-text)' }}>
              Did you try any new product today?
            </span>
            <select
              value={newProduct}
              onChange={handleInputChange(setNewProduct)}
              style={{
                ...selectStyle,
                border: `1px solid ${validationError && !newProduct ? '#D9534F' : 'var(--dot-inactive)'}`,
              }}
              aria-label="New product use"
              aria-invalid={validationError && !newProduct}
              name="newProduct"
            >
              <option value="">Select</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </label>

          {newProduct === 'Yes' && (
            <label
              style={{
                display: 'block',
                marginBottom: '1.5rem',
                animation: 'fadeIn 0.5s ease-in-out 0.5s both',
              }}
            >
              <span style={{ fontSize: '0.9rem', color: 'var(--secondary-text)' }}>
                What type of product?
              </span>
              <input
                type="text"
                placeholder="e.g., serum, ointment, cream"
                value={productType}
                onChange={handleInputChange(setProductType)}
                style={inputStyle}
                aria-label="Product type"
                aria-invalid={validationError && !productType}
                name="productType"
              />
            </label>
          )}

          <label
            style={{
              display: 'block',
              marginBottom: '1.5rem',
              animation: 'fadeIn 0.5s ease-in-out 0.6s both',
            }}
          >
            <span style={{ fontSize: '0.9rem', color: 'var(--secondary-text)' }}>
              Did you sweat today and delay washing?
            </span>
            <select
              value={sweatWash}
              onChange={handleInputChange(setSweatWash)}
              style={{
                ...selectStyle,
                border: `1px solid ${validationError && !sweatWash ? '#D9534F' : 'var(--dot-inactive)'}`,
              }}
              aria-label="Sweat and washing"
              aria-invalid={validationError && !sweatWash}
              name="sweatWash"
            >
              <option value="">Select</option>
              <option>Yes</option>
              <option>Washed late</option>
              <option>Didn’t sweat</option>
            </select>
          </label>

          <label
            style={{
              display: 'block',
              marginBottom: '1.5rem',
              animation: 'fadeIn 0.5s ease-in-out 0.7s both',
            }}
          >
            <span style={{ fontSize: '0.9rem', color: 'var(--secondary-text)' }}>
              Did you use sunscreen today?
            </span>
            <select
              value={sunscreen}
              onChange={handleInputChange(setSunscreen)}
              style={{
                ...selectStyle,
                border: `1px solid ${validationError && !sunscreen ? '#D9534F' : 'var(--dot-inactive)'}`,
              }}
              aria-label="Sunscreen use"
              aria-invalid={validationError && !sunscreen}
              name="sunscreen"
            >
              <option value="">Select</option>
              <option>Yes</option>
              <option>No</option>
              <option>N/A</option>
            </select>
          </label>

          {validationError && (
            <p
              style={{
                fontSize: '0.85rem',
                color: '#D9534F',
                marginBottom: '1rem',
                animation: 'fadeIn 0.5s ease-in-out 0.8s both',
              }}
            >
              {validationError}
            </p>
          )}

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: '1rem',
              animation: 'fadeIn 0.5s ease-in-out 0.9s both',
            }}
            aria-label="Logging flow progress"
          >
            {['Status', 'Skincare', 'Lifestyle'].map((step, idx) => (
              <div
                key={idx}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: idx === 1 ? 'var(--primary-color)' : 'var(--dot-inactive)',
                  transition: 'background 0.3s',
                }}
              />
            ))}
          </div>

          <p
            style={{
              fontSize: '0.9rem',
              color: 'var(--secondary-text)',
              marginBottom: '1rem',
              textAlign: 'center',
              animation: 'fadeIn 0.5s ease-in-out 1s both',
            }}
          >
            Great job logging your skincare routine! 🌟
          </p>

          <button
            onClick={handleNext}
            disabled={!(moisturized && newProduct && sweatWash && sunscreen && (newProduct !== 'Yes' || productType))}
            style={{
              background: moisturized && newProduct && sweatWash && sunscreen && (newProduct !== 'Yes' || productType)
                ? 'var(--primary-color)'
                : 'var(--dot-inactive)',
              color: '#FFFFFF',
              fontWeight: '600',
              fontSize: '1rem',
              padding: '0.75rem',
              width: '100%',
              border: 'none',
              borderRadius: '12px',
              cursor: moisturized && newProduct && sweatWash && sunscreen && (newProduct !== 'Yes' || productType)
                ? 'pointer'
                : 'not-allowed',
              boxShadow: '0 3px 10px rgba(0, 0, 0, 0.05)',
              transition: 'transform 0.2s, background-color 0.3s',
              animation: 'fadeIn 0.5s ease-in-out 1.1s both',
            }}
            onMouseEnter={(e) => {
              if (moisturized && newProduct && sweatWash && sunscreen && (newProduct !== 'Yes' || productType)) {
                e.currentTarget.style.transform = 'scale(1.02)';
              }
            }}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            aria-label="Next step"
          >
            Next
          </button>
        </div>

        <div
          style={{
            background: '#F9E6C8',
            borderRadius: '12px',
            padding: '1rem',
            boxShadow: '2px 4px 8px rgba(0, 0, 0, 0.08)',
            width: '100%',
            maxWidth: '380px',
            transform: 'rotate(-1deg)',
            marginTop: '1.5rem',
            animation: 'fadeIn 0.5s ease-in-out 1.2s both',
          }}
        >
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: 'var(--accent-color)',
            }}
          >
            💡 Daily Tip
          </h3>
          <p
            style={{
              fontSize: '0.9rem',
              color: 'var(--text-color)',
              lineHeight: '1.4',
            }}
          >
            {tip}
          </p>
        </div>
      </div>

      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(250, 247, 242, 0.9)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          justifyContent: 'space-around',
          padding: '0.75rem 0',
          boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.05)',
          zIndex: 3,
        }}
      >
        {[
          { label: 'Home', icon: '🏠', path: '/home' },
          { label: 'Log', icon: '📝', path: '/log-daily' },
          { label: 'History', icon: '📊', path: '/history' },
          { label: 'Settings', icon: '⚙️', path: '/settings' },
        ].map((nav, i) => (
          <button
            key={i}
            onClick={() => {
              if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in window.navigator) {
                window.navigator.vibrate(50);
              }
              router.push(nav.path);
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: nav.label === 'Log' ? 'var(--primary-color)' : 'none',
              color: nav.label === 'Log' ? '#FFF' : 'var(--secondary-text)',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.75rem',
              padding: '0.5rem',
              width: '60px',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            aria-label={nav.label}
          >
            <span style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{nav.icon}</span>
            {nav.label}
          </button>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
        select:focus,
        input:focus {
          outline: 2px solid var(--primary-color);
          outline-offset: 2px;
          animation: pulse 0.5s ease-in-out;
        }
        button:focus {
          outline: 2px solid var(--primary-color);
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}