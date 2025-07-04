// pages/intro.js
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Intro() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [condition, setCondition] = useState('');
  const [skinTone, setSkinTone] = useState('');
  const [triggers, setTriggers] = useState([]);

  const toggleTrigger = (value) => {
    setTriggers((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSubmit = () => {
    localStorage.setItem('name', name);
    localStorage.setItem('condition', condition);
    localStorage.setItem('skinTone', skinTone);
    localStorage.setItem('triggers', JSON.stringify(triggers));
    localStorage.setItem('completedIntro', 'true');
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
        padding: '1rem'
      }}
    >
      <Head>
        <title>Skin Profile | Flare AI</title>
      </Head>

      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '380px',
          textAlign: 'left',
          padding: '1.5rem'
        }}
      >
        <h1
          style={{
            fontSize: '1.4rem',
            fontWeight: '600',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}
        >
          Let’s personalize your experience
        </h1>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span style={{ fontWeight: '500', fontSize: '0.9rem' }}>Your name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="your name"
            style={{
              width: '80%',
              padding: '0.6rem',
              fontSize: '0.9rem',
              background: 'white',
              color: '#333',
              border: '1px solid #ccc',
              borderRadius: '8px',
              marginTop: '0.5rem'
            }}
          />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span style={{ fontWeight: '500', fontSize: '0.9rem' }}>Select skin condition</span>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            style={{
              width: '100%',
              padding: '0.6rem',
              fontSize: '0.9rem',
              background: 'white',
              color: '#333',
              border: '1px solid #ccc',
              borderRadius: '8px',
              marginTop: '0.5rem'
            }}
          >
            <option value="">Choose one</option>
            <option value="eczema">Eczema</option>
            <option value="psoriasis">Psoriasis</option>
            <option value="acne">Acne</option>
            <option value="urticaria">Urticaria (Hives)</option>
            <option value="other">Other</option>
          </select>
        </label>

        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>
            Your skin tone
          </span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['#f9dcc4', '#e0ac69', '#c68642', '#8d5524', '#4b3621'].map((tone, idx) => (
              <div
                key={idx}
                onClick={() => setSkinTone(tone)}
                style={{
                  backgroundColor: tone,
                  border: skinTone === tone ? '3px solid black' : '2px solid transparent',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  cursor: 'pointer'
                }}
              ></div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>
            What usually triggers your flare-ups?
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {['Sun', 'Pollen', 'Dust', 'Cosmetics', 'Food', 'Sleep', 'Stress', 'Humidity'].map((trigger, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => toggleTrigger(trigger)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '999px',
                  border: triggers.includes(trigger) ? 'none' : '1px solid #ccc',
                  backgroundColor: triggers.includes(trigger) ? '#f78d8d' : '#fff',
                  color: triggers.includes(trigger) ? 'white' : '#333',
                  cursor: 'pointer'
                }}
              >
                {trigger}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: '#f78d8d',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1rem',
            padding: '0.75rem',
            width: '100%',
            border: 'none',
            borderRadius: '1rem',
            cursor: 'pointer'
          }}
        >
          Finish
        </button>
      </div>
    </div>
  );
}
