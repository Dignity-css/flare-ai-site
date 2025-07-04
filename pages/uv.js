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
    <div className="container">
      <Head><title>UV Index | Flare AI</title></Head>
      <h1>Today&#39;s UV Index:</h1>

      <h2 style={{ margin: '1rem 0' }}>{uv !== null ? uv : 'Loading...'}</h2>
      <button onClick={() => router.push('/home')} className="button">Back to Home</button>
    </div>
  );
}
