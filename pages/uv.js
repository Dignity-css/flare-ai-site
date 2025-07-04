// pages/uv.js
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function UVPage() {
  const [uv, setUV] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=33.6844&longitude=73.0479&daily=uv_index_max&timezone=auto')
      .then(res => res.json())
      .then(data => {
        const uvIndex = data?.daily?.uv_index_max?.[0];
        setUV(uvIndex);
        localStorage.setItem('uv', uvIndex);
      });
  }, []);

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Head>
        <title>UV Index | Flare AI</title>
      </Head>

      <div className="card" style={{ maxWidth: '400px', textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>Today&apos;s UV Index</h1>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          {uv !== null ? uv : 'Loading...'}
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
