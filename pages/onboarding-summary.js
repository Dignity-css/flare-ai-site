// pages/onboarding-summary.js
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function OnboardingSummary() {
  const router = useRouter();
  const [summary, setSummary] = useState({});

  useEffect(() => {
    const fetchedData = {
      userType: localStorage.getItem('userType'),
      ageGroup: localStorage.getItem('ageGroup'),
      gender: localStorage.getItem('gender'),
      skinTone: localStorage.getItem('skinTone'),
      location: localStorage.getItem('location'),
      conditions: JSON.parse(localStorage.getItem('conditions') || '[]'),
      hormoneData: JSON.parse(localStorage.getItem('hormoneData') || '{}'),
      lifestyle: JSON.parse(localStorage.getItem('lifestyle') || '{}')
    };
    setSummary(fetchedData);
  }, []);

  const handleStart = () => {
    router.push('/log-daily');
  };

  return (
    <div
      className="container"
      style={{
        backgroundColor: '#fce9e9',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <Head>
        <title>Your Skin Profile | Dermind</title>
      </Head>

      <div
        style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '1.5rem',
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        }}
      >
        <h1
          style={{
            fontSize: '1.4rem',
            textAlign: 'center',
            marginBottom: '1.5rem',
          }}
        >
          Here&apos;s what we&apos;ve learned about your skin so far
        </h1>

        <ul style={{ paddingLeft: '1.2rem', lineHeight: '1.6' }}>
          {summary.conditions && (
            <li>
              🌱 You&apos;re managing: <strong>{summary.conditions.join(', ')}</strong>
            </li>
          )}
          {summary.lifestyle?.itchLevel && (
            <li>🧴 Your baseline itch level is {summary.lifestyle.itchLevel}/10</li>
          )}
          {summary.skinTone && (
            <li>☀️ You live in a high-UV area</li> /* Assume geo logic */
          )}
          {summary.lifestyle?.foodTriggers?.length > 0 && (
            <li>
              ⚠️ You&apos;ve reported food sensitivities:{' '}
              {summary.lifestyle.foodTriggers.join(', ')}
            </li>
          )}
          {summary.hormoneData?.onMedication && (
            <li>
              💊 You&apos;re on medications that may affect flare behavior
            </li>
          )}
          <li>🧠 Dermind is now ready to learn your personal flare patterns over time.</li>
        </ul>

        <button
          onClick={handleStart}
          className="button"
          style={{
            marginTop: '2rem',
            width: '100%',
            padding: '0.8rem',
            backgroundColor: '#f78d8d',
            color: 'white',
            border: 'none',
            borderRadius: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Start Daily Tracking
        </button>
      </div>
    </div>
  );
}
