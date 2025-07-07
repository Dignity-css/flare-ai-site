// pages/onboarding-medical.js
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function OnboardingMedical() {
  const router = useRouter();
  const [hormonalBreakouts, setHormonalBreakouts] = useState('');
  const [menstruation, setMenstruation] = useState('');
  const [diagnoses, setDiagnoses] = useState([]);

  const handleCheckboxChange = (value) => {
    setDiagnoses((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const handleNext = () => {
    localStorage.setItem('hormonalBreakouts', hormonalBreakouts);
    localStorage.setItem('menstruation', menstruation);
    localStorage.setItem('diagnoses', JSON.stringify(diagnoses));
    router.push('/onboarding-summary');
  };

  const diagnosisList = [
    'PCOS',
    'Thyroid disorder',
    'Autoimmune disorder',
    'Diabetes / Insulin resistance',
    'None',
  ];

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
        <title>Medical Info | Dermind</title>
      </Head>

      <div
        style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '1.5rem',
          maxWidth: '480px',
          width: '100%',
          boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
        }}
      >
        <h1 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', textAlign: 'center' }}>
          Medical & Hormonal Info
        </h1>

        <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 500 }}>
          Do you experience hormonal breakouts?
          <select
            value={hormonalBreakouts}
            onChange={(e) => setHormonalBreakouts(e.target.value)}
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="not_sure">Not sure</option>
          </select>
        </label>

        <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 500 }}>
          Do you menstruate regularly?
          <select
            value={menstruation}
            onChange={(e) => setMenstruation(e.target.value)}
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="birth_control">On birth control</option>
            <option value="dont_menstruate">I don&apos;t menstruate</option>
          </select>
        </label>

        <div style={{ marginTop: '1rem' }}>
          <p style={{ fontWeight: 500, marginBottom: '0.75rem' }}>
            Have you been diagnosed with any of the following?
          </p>
          {diagnosisList.map((item, idx) => (
            <label key={idx} style={{ display: 'block', marginBottom: '0.5rem' }}>
              <input
                type="checkbox"
                checked={diagnoses.includes(item)}
                onChange={() => handleCheckboxChange(item)}
                style={{ marginRight: '0.5rem' }}
              />
              {item}
            </label>
          ))}
        </div>

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
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
