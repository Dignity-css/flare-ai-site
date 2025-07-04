// pages/sleep.js
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SleepPage() {
  const [sleepHours, setSleepHours] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    localStorage.setItem('sleep', sleepHours);
    router.push('/home');
  };

  return (
    <div className="container">
      <Head><title>Sleep | Flare AI</title></Head>
      <h1>How many hours did you sleep last night?</h1>
      <input
        type="number"
        value={sleepHours}
        onChange={(e) => setSleepHours(e.target.value)}
        placeholder="e.g. 7"
        style={{
          marginTop: '1rem',
          padding: '0.5rem',
          width: '100%',
          borderRadius: '8px',
          border: '1px solid #ccc'
        }}
      />
      <button
        onClick={handleSubmit}
        className="button"
        style={{ marginTop: '1rem' }}
      >
        Save
      </button>
    </div>
  );
}