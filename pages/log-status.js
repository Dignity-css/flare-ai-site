// pages/log-status.js
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function LogStatus() {
  const router = useRouter();
  const [itchLevel, setItchLevel] = useState(5);
  const [sleepImpact, setSleepImpact] = useState('');
  const [inflammation, setInflammation] = useState('');
  const [flareToday, setFlareToday] = useState('');
  const [flareZone, setFlareZone] = useState('');

  const handleNext = () => {
    localStorage.setItem('log-status', JSON.stringify({
      itchLevel,
      sleepImpact,
      inflammation,
      flareToday,
      flareZone
    }));
    router.push('/log-barrier');
  };

  const selectStyle = {
    width: '100%',
    padding: '0.6rem',
    marginTop: '0.3rem',
    borderRadius: '0.8rem',
    border: '1px solid #ccc',
    backgroundColor: '#fdfdfd',
    fontSize: '1rem'
  };

  return (
    <div
      className="container"
      style={{
        minHeight: '100vh',
        backgroundColor: '#fce9e9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem'
      }}
    >
      <Head>
        <title>Skin Status | Dermind</title>
      </Head>

      <div
        style={{
          maxWidth: '500px',
          width: '100%',
          background: 'white',
          padding: '2rem',
          borderRadius: '1.5rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
        }}
      >
        <h1 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', textAlign: 'center' }}>
          Skin Status Check
        </h1>

        <label style={{ display: 'block', marginBottom: '1.2rem' }}>
          Itch level (0–10):
          <input
            type="range"
            min="0"
            max="10"
            value={itchLevel}
            onChange={(e) => setItchLevel(e.target.value)}
            style={{ width: '100%', marginTop: '0.5rem' }}
          />
        </label>

        <label style={{ display: 'block', marginBottom: '1.2rem' }}>
          How did sleep affect your skin?
          <select value={sleepImpact} onChange={(e) => setSleepImpact(e.target.value)} style={selectStyle}>
            <option value="">Select one</option>
            <option value="rested">Felt rested and skin feels better</option>
            <option value="interrupted">Woke up a few times</option>
            <option value="poor">Barely slept, felt irritated</option>
          </select>
        </label>

        <label style={{ display: 'block', marginBottom: '1.2rem' }}>
          Any burning, stinging, or tenderness today?
          <select value={inflammation} onChange={(e) => setInflammation(e.target.value)} style={selectStyle}>
            <option value="">Select one</option>
            <option value="yes">Yes, uncomfortable</option>
            <option value="no">No discomfort</option>
          </select>
        </label>

        <label style={{ display: 'block', marginBottom: '1.2rem' }}>
          Did you experience a flare-up today?
          <select value={flareToday} onChange={(e) => setFlareToday(e.target.value)} style={selectStyle}>
            <option value="">Select one</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="unsure">Not sure</option>
          </select>
        </label>

        <label style={{ display: 'block', marginBottom: '1.5rem' }}>
          Where was the flare-up?
          <select value={flareZone} onChange={(e) => setFlareZone(e.target.value)} style={selectStyle}>
            <option value="">Choose location</option>
            <option>Face</option>
            <option>Neck</option>
            <option>Arms</option>
            <option>Legs</option>
            <option>Hands</option>
            <option>Torso</option>
            <option>Scalp</option>
            <option>Multiple areas</option>
          </select>
        </label>

        <button
          className="button"
          onClick={handleNext}
          style={{
            marginTop: '1rem',
            backgroundColor: '#f78d8d',
            color: 'white',
            padding: '0.85rem',
            borderRadius: '1rem',
            width: '100%',
            fontWeight: 600,
            fontSize: '1rem',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
