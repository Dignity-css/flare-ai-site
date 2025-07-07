// pages/onboarding-lifestyle.js
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function OnboardingLifestyle() {
  const router = useRouter();
  const [moisturize, setMoisturize] = useState('');
  const [allergies, setAllergies] = useState('');
  const [smoking, setSmoking] = useState('');
  const [foods, setFoods] = useState([]);
  const [sweat, setSweat] = useState('');
  const [medications, setMedications] = useState('');

  const toggleFood = (item) => {
    setFoods((prev) =>
      prev.includes(item) ? prev.filter((f) => f !== item) : [...prev, item]
    );
  };

  const handleNext = () => {
    localStorage.setItem('moisturize', moisturize);
    localStorage.setItem('allergies', allergies);
    localStorage.setItem('smoking', smoking);
    localStorage.setItem('foods', JSON.stringify(foods));
    localStorage.setItem('sweat', sweat);
    localStorage.setItem('medications', medications);
    router.push('/onboarding-summary');
  };

  return (
    <div className="container" style={{ padding: '2rem', backgroundColor: '#fce9e9', minHeight: '100vh' }}>
      <Head><title>Lifestyle Inputs | Dermind</title></Head>

      <div style={{ background: 'white', padding: '2rem', borderRadius: '1.5rem', maxWidth: '500px', margin: '0 auto', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
        <h1 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', textAlign: 'center' }}>Barrier & Lifestyle</h1>

        <label style={{ display: 'block', marginBottom: '1rem' }}>Do you regularly moisturize?</label>
        <select value={moisturize} onChange={(e) => setMoisturize(e.target.value)} style={{ width: '100%', marginBottom: '1rem' }}>
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="sometimes">Sometimes</option>
        </select>

        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Known allergies or sensitivities</label>
        <input type="text" value={allergies} onChange={(e) => setAllergies(e.target.value)} placeholder="e.g. fragrance, gluten, etc." style={{ width: '100%', marginBottom: '1rem' }} />

        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Smoking exposure</label>
        <select value={smoking} onChange={(e) => setSmoking(e.target.value)} style={{ width: '100%', marginBottom: '1rem' }}>
          <option value="">Select</option>
          <option value="yes">Yes, regularly</option>
          <option value="occasionally">Occasionally</option>
          <option value="no">No</option>
          <option value="lives_with_smoker">I live with someone who smokes</option>
        </select>

        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Foods you consume regularly</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
          {['Dairy', 'Sugar', 'Gluten', 'Spicy', 'None'].map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => toggleFood(item)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '999px',
                border: foods.includes(item) ? 'none' : '1px solid #ccc',
                backgroundColor: foods.includes(item) ? '#f78d8d' : '#fff',
                color: foods.includes(item) ? 'white' : '#333',
                cursor: 'pointer'
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Do you sweat frequently?</label>
        <select value={sweat} onChange={(e) => setSweat(e.target.value)} style={{ width: '100%', marginBottom: '1rem' }}>
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="sometimes">Sometimes</option>
          <option value="no">No</option>
        </select>

        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Medications that might affect skin</label>
        <input type="text" value={medications} onChange={(e) => setMedications(e.target.value)} placeholder="e.g. steroids, birth control..." style={{ width: '100%', marginBottom: '1.5rem' }} />

        <button
          onClick={handleNext}
          className="button"
          style={{ width: '100%', backgroundColor: '#f78d8d', color: 'white', border: 'none', padding: '0.8rem', borderRadius: '1rem', fontWeight: 'bold' }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
