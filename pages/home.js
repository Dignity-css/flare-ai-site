// pages/home.js
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [uvIndex, setUvIndex] = useState('Fetching...');
  const [pollenIndex, setPollenIndex] = useState('Fetching...');

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setName(storedName);
    }

    // Simulated environmental data (replace with actual API later)
    setTimeout(() => {
      setUvIndex('6.2 (Moderate)');
      setPollenIndex('High');
    }, 1000);
  }, []);

  return (
    <div className="container" style={{ paddingBottom: '5rem' }}>
      <Head>
        <title>Home | Flare AI</title>
      </Head>

      <h1 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
        Hello{name ? `, ${name}` : ''} 👋
      </h1>

      <div className="card">
        <div className="icon">
          <img src="/weather-icon.png" alt="Weather Icon" />
        </div>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Flare Risk Today</h2>
        <h1 style={{ fontSize: '2rem' }}>60%</h1>
        <p style={{ color: '#d9534f', fontWeight: '600' }}>Moderate</p>
      </div>

      <h2 style={{ fontSize: '1.2rem', marginTop: '1.5rem' }}>Today’s Data:</h2>

      <div className="data-icons">
        <div className="data-item" onClick={() => router.push('/sleep')}>
          <div className="icon"><img src="/sleep-icon.png" alt="Sleep" /></div>
          Sleep
        </div>
        <div className="data-item" onClick={() => alert('UV fetched: ' + uvIndex)}>
          <div className="icon"><img src="/uv-icon.png" alt="UV" /></div>
          UV Index
        </div>
        <div className="data-item" onClick={() => alert('Pollen level: ' + pollenIndex)}>
          <div className="icon"><img src="/pollen-icon.png" alt="Pollen" /></div>
          Pollen
        </div>
      </div>

      <button
        className="button"
        onClick={() => router.push('/photo')}
        style={{ marginTop: '1rem', backgroundColor: '#fcbf49' }}
      >
        Upload Skin Photo
      </button>

      <button
        className="button"
        onClick={() => router.push('/log-daily')}
      >
        Log Today's Data
      </button>

      <button
        className="button"
        onClick={() => router.push('/history')}
        style={{ backgroundColor: '#7ed6df', color: 'black', marginTop: '0.5rem' }}
      >
        View Log History
      </button>

      <div className="bottom-nav">
        <span>🏠</span>
        <span>📝</span>
        <span>📊</span>
        <span>⚙️</span>
      </div>
    </div>
  );
}
