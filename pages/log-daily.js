// pages/log-daily.js
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function LogDaily() {
  const router = useRouter();
  const [mood, setMood] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [skinFeel, setSkinFeel] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    const newLog = {
      mood,
      symptoms,
      skinFeel,
      notes,
      date: new Date().toISOString().slice(0, 10),
    };

    const existingLogs = JSON.parse(localStorage.getItem('logHistory')) || [];
    existingLogs.push(newLog);
    localStorage.setItem('logHistory', JSON.stringify(existingLogs));

    router.push('/home');
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
      }}
    >
      <Head>
        <title>Log Data | Flare AI</title>
      </Head>

      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '1.5rem',
          textAlign: 'left',
        }}
      >
        <h1
          style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '1.5rem',
            textAlign: 'center',
          }}
        >
          Log Today&rsquo;s Skin Update
        </h1>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span style={{ fontWeight: '500' }}>Mood</span>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              marginTop: '0.3rem',
            }}
          >
            <option value="">Choose</option>
            <option value="happy">😊 Happy</option>
            <option value="okay">😐 Okay</option>
            <option value="low">😞 Low</option>
          </select>
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span style={{ fontWeight: '500' }}>Skin feels like:</span>
          <select
            value={skinFeel}
            onChange={(e) => setSkinFeel(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              marginTop: '0.3rem',
            }}
          >
            <option value="">Choose</option>
            <option value="normal">Normal</option>
            <option value="itchy">Itchy</option>
            <option value="burning">Burning</option>
            <option value="dry">Dry</option>
            <option value="flaky">Flaky</option>
          </select>
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span style={{ fontWeight: '500' }}>Any visible symptoms?</span>
          <input
            type="text"
            placeholder="e.g. redness, swelling..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              marginTop: '0.3rem',
            }}
          />
        </label>

        <label style={{ display: 'block', marginBottom: '1.5rem' }}>
          <span style={{ fontWeight: '500' }}>Additional Notes</span>
          <textarea
            rows="3"
            placeholder="Optional observations..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              marginTop: '0.3rem',
              resize: 'none',
            }}
          />
        </label>

        <button
          onClick={handleSubmit}
          className="button"
          style={{
            width: '100%',
            backgroundColor: '#f78d8d',
            color: 'white',
            fontWeight: 'bold',
            padding: '0.75rem',
            border: 'none',
            borderRadius: '1rem',
            cursor: 'pointer',
          }}
        >
          Save Entry
        </button>
      </div>
    </div>
  );
}
