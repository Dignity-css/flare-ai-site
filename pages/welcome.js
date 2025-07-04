// pages/welcome.js
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Welcome() {
  const router = useRouter();

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Head>
        <title>Welcome | Flare AI</title>
      </Head>

      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <img
          src="/flare-logo.png"
          alt="Flare AI Logo"
          className="icon"
          style={{ width: '60px', height: '60px', margin: '0 auto 1rem auto' }}
        />
        <h1 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>Let’s get to know your skin</h1>
        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1.5rem' }}>
          We&rsquo;ll ask you a few questions to personalize your experience
        </p>

        <button
          className="button"
          onClick={() => router.push('/intro')}
        >
          Next
        </button>
      </div>
    </div>
  );
}
