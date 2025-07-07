// pages/onboarding-consent.js
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function OnboardingConsent() {
  const router = useRouter();
  const [consent1, setConsent1] = useState(false);
  const [consent2, setConsent2] = useState(false);

  const handleContinue = () => {
    if (consent1 && consent2) {
      localStorage.setItem('consentMedical', 'true');
      localStorage.setItem('consentAI', 'true');
      router.push('/baseline-summary');
    }
  };

  return (
    <div className="container" style={{ backgroundColor: '#fce9e9', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
      <Head>
        <title>Consent | Dermind</title>
      </Head>

      <div style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '2rem', maxWidth: '400px', width: '100%', textAlign: 'left' }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: '600', marginBottom: '1.5rem', textAlign: 'center' }}>
          Final Step: Consent
        </h1>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <input
            type="checkbox"
            checked={consent1}
            onChange={() => setConsent1(!consent1)}
          />{' '}
          I understand this app does not replace medical care.
        </label>

        <label style={{ display: 'block', marginBottom: '1.5rem' }}>
          <input
            type="checkbox"
            checked={consent2}
            onChange={() => setConsent2(!consent2)}
          />{' '}
          I consent to anonymous data being used for training the AI.
        </label>

        <button
          onClick={handleContinue}
          disabled={!consent1 || !consent2}
          className="button"
          style={{ width: '100%' }}
        >
          Start My Skin Journey
        </button>
      </div>
    </div>
  );
}
