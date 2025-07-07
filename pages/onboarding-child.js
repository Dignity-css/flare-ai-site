// pages/onboarding-child.js
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function OnboardingChild() {
  const router = useRouter();
  const [ageGroup, setAgeGroup] = useState('0-3');
  const [skinTone, setSkinTone] = useState('');
  const [condition, setCondition] = useState([]);
  const [location, setLocation] = useState('');
  const [otherCondition, setOtherCondition] = useState('');

  const toggleCondition = (value) => {
    setCondition((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleNext = () => {
    let allConditions = [...condition];
    if (condition.includes('Other') && otherCondition.trim()) {
      allConditions = allConditions.filter((c) => c !== 'Other');
      allConditions.push(`Other: ${otherCondition.trim()}`);
    }

    localStorage.setItem('userType', 'child');
    localStorage.setItem('ageGroup', ageGroup);
    localStorage.setItem('skinTone', skinTone);
    localStorage.setItem('conditions', JSON.stringify(allConditions));
    localStorage.setItem('location', location);
    router.push('/onboarding-consent');
  };

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetch(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`)
          .then((res) => res.json())
          .then((data) => {
            const city =
              data?.address?.city ||
              data?.address?.town ||
              data?.address?.village ||
              'Unknown';
            setLocation(city);
          });
      });
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#fce9e9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <Head>
        <title>Child Onboarding | Dermind</title>
      </Head>

      <div
        style={{
          background: '#fff',
          borderRadius: '1.5rem',
          padding: '2rem',
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        }}
      >
        <h1 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', textAlign: 'center' }}>
          👶 Parent Profile Setup
        </h1>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          Child&apos;s age group:
          <select
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              marginTop: '0.3rem',
              borderRadius: '0.5rem',
              border: '1px solid #ccc',
            }}
          >
            <option value="0-3">0–3 yrs</option>
            <option value="4-7">4–7 yrs</option>
            <option value="8-12">8–12 yrs</option>
          </select>
        </label>

        <div style={{ marginBottom: '1.5rem' }}>
          Skin tone:
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.3rem' }}>
            {['#f9dcc4', '#e0ac69', '#c68642', '#8d5524', '#4b3621', '#2a1a0b'].map((tone, idx) => (
              <div
                key={idx}
                onClick={() => setSkinTone(tone)}
                style={{
                  backgroundColor: tone,
                  border: skinTone === tone ? '3px solid black' : '2px solid transparent',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                }}
              ></div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          Conditions being managed:
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.3rem' }}>
            {[
              'Eczema',
              'Psoriasis',
              'Acne',
              'Urticaria',
              'Seborrheic Dermatitis',
              "I'm not sure",
              'Other',
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => toggleCondition(item)}
                style={{
                  padding: '0.4rem 0.8rem',
                  borderRadius: '1rem',
                  border: condition.includes(item) ? 'none' : '1px solid #ccc',
                  backgroundColor: condition.includes(item) ? '#f78d8d' : '#fff',
                  color: condition.includes(item) ? 'white' : '#333',
                  cursor: 'pointer',
                }}
              >
                {item === "I'm not sure" ? 'I’m not sure' : item}
              </button>
            ))}
          </div>

          {condition.includes('Other') && (
            <input
              type="text"
              placeholder="Type the condition"
              value={otherCondition}
              onChange={(e) => setOtherCondition(e.target.value)}
              style={{
                marginTop: '0.75rem',
                width: '100%',
                padding: '0.5rem',
                borderRadius: '0.5rem',
                border: '1px solid #ccc',
              }}
            />
          )}
        </div>

        <label style={{ display: 'block', marginBottom: '1.5rem' }}>
          City (optional):
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.3rem' }}>
            <input
              type="text"
              placeholder="e.g. Islamabad"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{
                flex: 1,
                padding: '0.5rem',
                borderRadius: '0.5rem',
                border: '1px solid #ccc',
              }}
            />
            <button
              onClick={fetchLocation}
              type="button"
              style={{
                backgroundColor: '#f78d8d',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              Auto-detect
            </button>
          </div>
        </label>

        <button
          onClick={handleNext}
          style={{
            width: '100%',
            backgroundColor: '#f78d8d',
            color: 'white',
            padding: '0.75rem',
            borderRadius: '1rem',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
