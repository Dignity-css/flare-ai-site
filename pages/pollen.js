// pages/pollen.js
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function PollenPage() {
  const [pollen, setPollen] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Dummy pollen level for now
    const pollenLevel = 'High';
    setPollen(pollenLevel);
    localStorage.setItem('pollen', pollenLevel);
  }, []);

  return (
    <div
      className="container"
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Head>
        <title>Pollen | Flare AI</title>
      </Head>

      <div
        className="card"
        style={{ maxWidth: '400px', textAlign: 'center', padding: '2rem' }}
      >
        <h1 style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>
          Today&apos;s Pollen Level
        </h1>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          {pollen || 'Loading...'}
        </h2>

        <button
          onClick={() => router.push('/home')}
          className="button"
          style={{ backgroundColor: '#fcbf49', fontWeight: '600' }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
