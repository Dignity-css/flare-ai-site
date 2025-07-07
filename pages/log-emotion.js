// pages/log-emotion.js
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function LogEmotion() {
  const router = useRouter();
  const [confidence, setConfidence] = useState('');
  const [socialImpact, setSocialImpact] = useState('');

  const handleSubmit = () => {
    const previousLog = JSON.parse(localStorage.getItem('logEntry')) || {};
    const newLog = {
      ...previousLog,
      confidence,
      socialImpact,
      date: new Date().toISOString().slice(0, 10),
    };

    // Save full entry
    localStorage.setItem('logEntry', JSON.stringify(newLog));
    const existingLogs = JSON.parse(localStorage.getItem('logs')) || [];
    localStorage.setItem('logs', JSON.stringify([...existingLogs, newLog]));
    router.push('/log-summary');
  };

  const selectStyle = {
    width: '100%',
    padding: '0.7rem',
    borderRadius: '0.8rem',
    border: '1px solid #ccc',
    backgroundColor: '#fdfdfd',
    marginTop: '0.5rem'
  };

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
      <Head><title>Emotional Check | Dermind</title></Head>

      <div
        style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '1.5rem',
          maxWidth: '480px',
          width: '100%',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}
      >
        <h1 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
          🧠 Emotional & Social Check-In
        </h1>

        {/* Confidence */}
        <label style={{ display: 'block', marginBottom: '1.5rem', fontWeight: 500 }}>
          How confident did you feel today regarding your skin?
          <select
            value={confidence}
            onChange={(e) => setConfidence(e.target.value)}
            style={selectStyle}
          >
            <option value="">Select</option>
            <option value="Very low">😞 Very low – I felt insecure</option>
            <option value="Low">😐 Low – I was a bit self-conscious</option>
            <option value="Neutral">😶 Neutral – No major impact</option>
            <option value="Good">🙂 Good – I felt okay</option>
            <option value="Great">😄 Great – I felt confident!</option>
          </select>
        </label>

        {/* Social impact */}
        <label style={{ display: 'block', marginBottom: '2rem', fontWeight: 500 }}>
          Did your skin affect your mood or social plans today?
          <select
            value={socialImpact}
            onChange={(e) => setSocialImpact(e.target.value)}
            style={selectStyle}
          >
            <option value="">Select</option>
            <option value="Not at all">No, not at all</option>
            <option value="A little">A little – I hesitated or avoided something</option>
            <option value="Yes">Yes – It had a clear impact</option>
          </select>
        </label>

        <button
          onClick={handleSubmit}
          className="button"
          style={{
            width: '100%',
            padding: '0.9rem',
            backgroundColor: '#f78d8d',
            color: 'white',
            border: 'none',
            borderRadius: '1rem',
            fontWeight: 600,
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Finish Check-In
        </button>
      </div>
    </div>
  );
}
