// pages/history.js
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function History() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const storedLogs = JSON.parse(localStorage.getItem('logHistory')) || [];
    setLogs(storedLogs.reverse()); // show latest first
  }, []);

  return (
    <div className="container" style={{ paddingBottom: '4rem' }}>
      <Head>
        <title>Log History | Flare AI</title>
      </Head>

      <h1 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>📘 Log History</h1>

      {logs.length === 0 ? (
        <p>No entries yet. Go log your day!</p>
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
            <p><strong>Mood:</strong> {entry.mood || '—'}</p>
            <p><strong>Skin Feel:</strong> {entry.skinFeel || '—'}</p>
            <p><strong>Symptoms:</strong> {entry.symptoms || '—'}</p>
            <p><strong>Notes:</strong> {entry.notes || 'None'}</p>
          </div>
        ))
      )}

      <button
        className="button"
        onClick={() => window.location.href = '/home'}
        style={{ marginTop: '1rem', backgroundColor: '#ddd', color: 'black' }}
      >
        ← Back to Home
      </button>
    </div>
  );
}
