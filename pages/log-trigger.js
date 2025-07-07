// pages/log-trigger.js
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LogTrigger() {
  const router = useRouter();
  const [foodTriggers, setFoodTriggers] = useState([]);
  const [reactedAfter, setReactedAfter] = useState('');
  const [envExposures, setEnvExposures] = useState([]);
  const [avoidedHelpful, setAvoidedHelpful] = useState('');

  const toggleCheckbox = (value, list, setter) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleNext = () => {
    localStorage.setItem('foodTriggers', JSON.stringify(foodTriggers));
    localStorage.setItem('reactedAfter', reactedAfter);
    localStorage.setItem('envExposures', JSON.stringify(envExposures));
    localStorage.setItem('avoidedHelpful', avoidedHelpful);
    router.push('/log-emotion');
  };

  const checkboxStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '0.5rem'
  };

  const optionButtonStyle = (active) => ({
    padding: '0.5rem 1rem',
    borderRadius: '1rem',
    border: active ? 'none' : '1px solid #ccc',
    backgroundColor: active ? '#f78d8d' : '#fdfdfd',
    color: active ? 'white' : '#333',
    cursor: 'pointer'
  });

  return (
    <div
      className="container"
      style={{
        padding: '2rem',
        minHeight: '100vh',
        backgroundColor: '#fce9e9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Head><title>Trigger Check | Dermind</title></Head>

      <div
        style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '1.5rem',
          maxWidth: '600px',
          width: '100%',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}
      >
        <h1 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>🧪 Trigger Watch</h1>

        {/* Food Triggers */}
        <label style={{ fontWeight: 500 }}>
          Did you eat anything that usually bothers your skin?
          <div style={checkboxStyle}>
            {['Dairy', 'Gluten', 'Nuts', 'Spicy', 'Citrus', 'Chocolate', 'Seafood', 'Eggs', 'None'].map((item) => (
              <button
                key={item}
                onClick={() => toggleCheckbox(item, foodTriggers, setFoodTriggers)}
                style={optionButtonStyle(foodTriggers.includes(item))}
              >
                {item}
              </button>
            ))}
          </div>
        </label>

        {/* Reaction After Eating */}
        <label style={{ fontWeight: 500, marginTop: '1.5rem', display: 'block' }}>
          Did you feel a reaction after eating? (within 6 hrs)
          <select
            value={reactedAfter}
            onChange={(e) => setReactedAfter(e.target.value)}
            style={{
              width: '100%',
              padding: '0.6rem',
              marginTop: '0.5rem',
              borderRadius: '0.8rem',
              border: '1px solid #ccc',
              backgroundColor: '#fdfdfd'
            }}
          >
            <option value="">Select</option>
            <option>Yes</option>
            <option>No</option>
            <option>Not sure</option>
          </select>
        </label>

        {/* Environmental Triggers */}
        <label style={{ fontWeight: 500, marginTop: '1.5rem', display: 'block' }}>
          Any environmental exposures today?
          <div style={checkboxStyle}>
            {['Dust', 'Fragrance', 'Smoke', 'New Fabric', 'Pet Hair', 'Heat', 'Cold', 'Sweat', 'Pollen'].map((item) => (
              <button
                key={item}
                onClick={() => toggleCheckbox(item, envExposures, setEnvExposures)}
                style={optionButtonStyle(envExposures.includes(item))}
              >
                {item}
              </button>
            ))}
          </div>
        </label>

        {/* Avoided Something Helpful */}
        <label style={{ fontWeight: 500, marginTop: '1.5rem', display: 'block' }}>
          Did you avoid anything you think usually helps you?
          <input
            type="text"
            value={avoidedHelpful}
            onChange={(e) => setAvoidedHelpful(e.target.value)}
            placeholder="e.g. moisturizer, calming tea, antihistamine"
            style={{
              width: '100%',
              padding: '0.7rem',
              borderRadius: '0.8rem',
              marginTop: '0.5rem',
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
            padding: '0.9rem',
            backgroundColor: '#f78d8d',
            color: 'white',
            border: 'none',
            borderRadius: '1rem',
            fontWeight: 600,
            fontSize: '1rem'
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
