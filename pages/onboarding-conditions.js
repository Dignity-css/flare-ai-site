// pages/onboarding-conditions.js
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function OnboardingConditions() {
  const router = useRouter();
  const [conditions, setConditions] = useState([]);
  const [other, setOther] = useState('');
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    if (storedUserType) setUserType(storedUserType);
  }, []);

  const toggleCondition = (value) => {
    setConditions((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleNext = () => {
    const allConditions = [...conditions];
    if (other.trim()) allConditions.push(`Other: ${other}`);
    localStorage.setItem('conditions', JSON.stringify(allConditions));

    const isHormonal = allConditions.some(c =>
      ['Acne', 'Urticaria (Hives)'].includes(c)
    );

    const gender = localStorage.getItem('gender');
    const ageGroup = localStorage.getItem('ageGroup');

    if (userType === 'adult' && isHormonal && gender === 'female' && ageGroup !== 'child') {
      router.push('/onboarding-medical');
    } else {
      router.push('/onboarding-summary');
    }
  };

  const conditionList = [
    'Eczema',
    'Psoriasis',
    'Acne',
    'Urticaria (Hives)',
    'Seborrheic Dermatitis',
    'I’m not sure'
  ];

  return (
    <div className="container"
      style={{
        backgroundColor: '#fce9e9',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem'
      }}
    >
      <Head><title>Conditions | Dermind</title></Head>

      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '1.5rem',
        maxWidth: '480px',
        width: '100%',
        boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
      }}>
        <h1 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', textAlign: 'center' }}>
          Which skin condition(s) are you managing?
        </h1>

        {conditionList.map((item, idx) => (
          <label key={idx} style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 500 }}>
            <input
              type="checkbox"
              checked={conditions.includes(item)}
              onChange={() => toggleCondition(item)}
              style={{ marginRight: '0.5rem' }}
            />
            {item}
          </label>
        ))}

        <label style={{ display: 'block', marginTop: '1.25rem', fontWeight: 500 }}>
          Other:
          <input
            type="text"
            value={other}
            onChange={(e) => setOther(e.target.value)}
            placeholder="Enter another condition"
            style={{
              marginTop: '0.5rem',
              width: '100%',
              padding: '0.6rem',
              borderRadius: '10px',
              border: '1px solid #ccc'
            }}
          />
        </label>

        <button
          onClick={handleNext}
          className="button"
          style={{
            marginTop: '2rem',
            width: '100%',
            padding: '0.8rem',
            backgroundColor: '#f78d8d',
            color: 'white',
            border: 'none',
            borderRadius: '1rem',
            fontWeight: 600
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
