// pages/onboarding-adult.js
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function OnboardingAdult() {
  const router = useRouter();
  const [ageGroup, setAgeGroup] = useState('adult');
  const [gender, setGender] = useState('');
  const [skinTone, setSkinTone] = useState('');
  const [location, setLocation] = useState('');

  const handleNext = () => {
    localStorage.setItem('userType', 'adult');
    localStorage.setItem('ageGroup', ageGroup);
    localStorage.setItem('gender', gender);
    localStorage.setItem('skinTone', skinTone);
    localStorage.setItem('location', location);
    router.push('/onboarding-conditions');
  };

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetch(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`)
          .then(res => res.json())
          .then(data => {
            const city = data?.address?.city || data?.address?.town || data?.address?.village || 'Unknown';
            setLocation(city);
          });
      });
    }
  };

  return (
    <div
      className="container"
      style={{
        background: '#fce9e9',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <Head>
        <title>Profile Info | Dermind</title>
      </Head>

      <div
        className="card"
        style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '1.5rem',
          boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
          width: '100%',
          maxWidth: '420px',
        }}
      >
        <h1 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', textAlign: 'center' }}>
          Tell us about you
        </h1>

        <label style={{ display: 'block', marginBottom: '1.25rem' }}>
          <span style={{ fontWeight: 500 }}>Gender</span>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            style={{
              width: '100%',
              marginTop: '0.5rem',
              padding: '0.6rem',
              borderRadius: '0.75rem',
              border: '1px solid #ccc',
            }}
          >
            <option value="">Select</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
          </select>
        </label>

        <label style={{ display: 'block', marginBottom: '1.25rem' }}>
          <span style={{ fontWeight: 500 }}>Skin Tone (Fitzpatrick I–VI)</span>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            {['#f9dcc4', '#e0ac69', '#c68642', '#8d5524', '#4b3621', '#2a1a0b'].map((tone, idx) => (
              <div
                key={idx}
                onClick={() => setSkinTone(tone)}
                style={{
                  backgroundColor: tone,
                  border: skinTone === tone ? '3px solid black' : '2px solid #ccc',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                }}
              ></div>
            ))}
          </div>
        </label>

        <label style={{ display: 'block', marginBottom: '1.25rem' }}>
          <span style={{ fontWeight: 500 }}>Location</span>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter city"
              style={{
                flex: 1,
                padding: '0.6rem',
                borderRadius: '0.75rem',
                border: '1px solid #ccc',
              }}
            />
            <button
              type="button"
              onClick={fetchLocation}
              style={{
                background: '#f78d8d',
                color: 'white',
                padding: '0.6rem 1rem',
                border: 'none',
                borderRadius: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Auto-detect
            </button>
          </div>
        </label>

        <button
          onClick={handleNext}
          disabled={!gender || !skinTone || !location}
          className="button"
          style={{
            marginTop: '1.5rem',
            width: '100%',
            padding: '0.8rem',
            fontWeight: 600,
            fontSize: '1rem',
            backgroundColor: '#f78d8d',
            color: 'white',
            border: 'none',
            borderRadius: '1rem',
            cursor: 'pointer',
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
