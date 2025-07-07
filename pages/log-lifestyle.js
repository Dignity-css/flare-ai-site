// pages/log-lifestyle.js
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function LogLifestyle() {
  const router = useRouter();
  const [sleepHours, setSleepHours] = useState('');
  const [sleepQuality, setSleepQuality] = useState('');
  const [stressLevel, setStressLevel] = useState(5);
  const [menstruating, setMenstruating] = useState('');
  const [caffeine, setCaffeine] = useState('');
  const [exercise, setExercise] = useState('');

  const handleNext = () => {
    const log = {
      sleepHours,
      sleepQuality,
      stressLevel,
      menstruating,
      caffeine,
      exercise
    };
    localStorage.setItem('logLifestyle', JSON.stringify(log));
    router.push('/log-trigger');
  };

  const selectStyle = {
    width: '100%',
    padding: '0.6rem',
    marginTop: '0.4rem',
    borderRadius: '0.8rem',
    border: '1px solid #ccc',
    backgroundColor: '#fdfdfd',
    fontSize: '1rem'
  };

  const allFilled = sleepHours && sleepQuality && caffeine && exercise;

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
      <Head><title>Lifestyle Check | Dermind</title></Head>

      <div
        style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '1.5rem',
          maxWidth: '480px',
          width: '100%',
          boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
        }}
      >
        <h1 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', textAlign: 'center' }}>
          🌙 Lifestyle Check-In
        </h1>

        <label style={{ display: 'block', marginBottom: '1.5rem' }}>
          How many hours did you sleep last night?
          <select value={sleepHours} onChange={(e) => setSleepHours(e.target.value)} style={selectStyle}>
            <option value="">Select</option>
            <option value="<5">Less than 5 hours</option>
            <option value="5-6">5–6 hours</option>
            <option value="6-8">6–8 hours</option>
            <option value=">8">More than 8 hours</option>
          </select>
        </label>

        <label style={{ display: 'block', marginBottom: '1.5rem' }}>
          How would you rate your sleep quality?
          <select value={sleepQuality} onChange={(e) => setSleepQuality(e.target.value)} style={selectStyle}>
            <option value="">Select</option>
            <option value="restful">Very restful 😴</option>
            <option value="okay">Okay</option>
            <option value="restless">Restless night</option>
            <option value="poor">Couldn’t sleep 😵</option>
          </select>
        </label>

        <label style={{ display: 'block', marginBottom: '1.5rem' }}>
          How stressed did you feel today? (0–10)
          <input
            type="range"
            min="0"
            max="10"
            value={stressLevel}
            onChange={(e) => setStressLevel(e.target.value)}
            style={{ width: '100%' }}
          />
          <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>{stressLevel}</div>
        </label>

        <label style={{ display: 'block', marginBottom: '1.5rem' }}>
          Are you menstruating today? (optional)
          <select value={menstruating} onChange={(e) => setMenstruating(e.target.value)} style={selectStyle}>
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="irregular">Irregular/spotting</option>
          </select>
        </label>

        <label style={{ display: 'block', marginBottom: '1.5rem' }}>
          Did you have caffeine today?
          <select value={caffeine} onChange={(e) => setCaffeine(e.target.value)} style={selectStyle}>
            <option value="">Select</option>
            <option value="none">No caffeine</option>
            <option value="low">1 cup</option>
            <option value="moderate">2–3 cups</option>
            <option value="high">4+ cups ☕</option>
          </select>
        </label>

        <label style={{ display: 'block', marginBottom: '2rem' }}>
          Did you do any physical activity today?
          <select value={exercise} onChange={(e) => setExercise(e.target.value)} style={selectStyle}>
            <option value="">Select</option>
            <option value="none">No exercise</option>
            <option value="light">Light walk / yoga</option>
            <option value="moderate">Moderate workout</option>
            <option value="intense">Intense training 💪</option>
          </select>
        </label>

        <button
          onClick={handleNext}
          disabled={!allFilled}
          className="button"
          style={{
            width: '100%',
            padding: '0.9rem',
            backgroundColor: allFilled ? '#f78d8d' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '1rem',
            fontWeight: 600,
            fontSize: '1rem',
            cursor: allFilled ? 'pointer' : 'not-allowed'
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
