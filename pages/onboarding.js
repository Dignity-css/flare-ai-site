// pages/onboarding.js
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Onboarding() {
  const router = useRouter();
  const [userType, setUserType] = useState('');

  useEffect(() => {
    if (localStorage.getItem('onboardingComplete') === 'true') {
      router.push('/intro');
    }
  }, []);

  const handleNext = () => {
    localStorage.setItem('onboardingComplete', 'true');
    localStorage.setItem('userType', userType);

    if (userType === 'child') {
      router.push('/onboarding-child');
    } else if (userType === 'adult') {
      router.push('/onboarding-adult');
    }
  };

  return (
    <div
      className="container"
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
        backgroundColor: '#fce9e9' // 🌸 Soft pink background
      }}
    >
      <Head>
        <title>Start Onboarding | Dermind</title>
      </Head>

      <div
        className="card"
        style={{
          background: 'white',
          borderRadius: '1.25rem',
          padding: '2rem',
          maxWidth: '400px',
          width: '100%',
          boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
          textAlign: 'left'
        }}
      >
        <h1 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '1.5rem', textAlign: 'center' }}>
          Who is this app for?
        </h1>

        <label style={{ display: 'block', marginBottom: '1.25rem', fontSize: '1rem' }}>
          <input
            type="radio"
            name="userType"
            value="adult"
            onChange={() => setUserType('adult')}
            style={{ marginRight: '0.5rem' }}
          />
          Myself <span style={{ color: '#888', fontSize: '0.85rem' }}>(Age 13+)</span>
        </label>

        <label style={{ display: 'block', marginBottom: '1.5rem', fontSize: '1rem' }}>
          <input
            type="radio"
            name="userType"
            value="child"
            onChange={() => setUserType('child')}
            style={{ marginRight: '0.5rem' }}
          />
          My child <span style={{ color: '#888', fontSize: '0.85rem' }}>(Age 0–12)</span>
        </label>

        <button
          onClick={handleNext}
          disabled={!userType}
          className="button"
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#f78d8d',
            color: 'white',
            border: 'none',
            borderRadius: '1rem',
            fontWeight: 600,
            cursor: userType ? 'pointer' : 'not-allowed'
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
