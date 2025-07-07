// pages/history.js
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function History() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('logs');
    if (stored) {
      setLogs(JSON.parse(stored).reverse()); // newest first
    }
  }, []);

  return (
    <div className="container" style={{ paddingBottom: '4rem', padding: '2rem', backgroundColor: '#fce9e9', minHeight: '100vh' }}>
      <Head>
        <title>Log History | Dermind</title>
      </Head>

      <h1 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', textAlign: 'center' }}>📘 Log History</h1>

      {logs.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No entries yet. Go log your day!</p>
      ) : (
        logs.map((entry, idx) => (
          <div
            key={idx}
            className="card"
            style={{
              marginBottom: '1rem',
              background: '#fff',
              padding: '1rem',
              borderRadius: '1rem',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
            }}
          >
            <p><strong>Date:</strong> {entry.date}</p>
            <p><strong>Itch Level:</strong> {entry.itchLevel}</p>
            <p><strong>Flare Zone:</strong> {entry.flareZone}</p>
            <p><strong>Stress:</strong> {entry.stress}</p>
            <p><strong>Confidence:</strong> {entry.confidence}</p>
            <p><strong>Triggers:</strong> {entry.foodTriggers?.join(', ') || '—'}</p>
          </div>
        ))
      )}

      <button
        className="button"
        onClick={() => window.location.href = '/home'}
        style={{
          marginTop: '2rem',
          width: '100%',
          backgroundColor: '#ddd',
          color: 'black',
          borderRadius: '1rem',
          padding: '0.8rem'
        }}
      >
        ← Back to Home
      </button>
    </div>
  );
}

