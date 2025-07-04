// pages/pollen.js
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function PollenPage() {
  const [pollen, setPollen] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Dummy data for now
    const pollenLevel = 'High';
    setPollen(pollenLevel);
    localStorage.setItem('pollen', pollenLevel);
  }, []);

  return (
    <div className="container">
      <Head><title>Pollen | Flare AI</title></Head>
     <h1>Today&#39;s Pollen Level:</h1>

      <h2 style={{ margin: '1rem 0' }}>{pollen || 'Loading...'}</h2>
      <button onClick={() => router.push('/home')} className="button">Back to Home</button>
    </div>
  );
}
