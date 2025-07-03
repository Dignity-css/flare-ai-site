import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Flare Tracker</title>
      </Head>

      <h1>Hello, Mamoon</h1>

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
        <div className="data-item">
          <div className="icon"><img src="/sleep-icon.png" alt="Sleep" /></div>
          Sleep
        </div>
        <div className="data-item">
          <div className="icon"><img src="/uv-icon.png" alt="UV" /></div>
          UV Index
        </div>
        <div className="data-item">
          <div className="icon"><img src="/pollen-icon.png" alt="Pollen" /></div>
          Pollen Index
        </div>
      </div>

      <Link href="/log" passHref>
        <div className="button">Log Today’s Data</div>
      </Link>

      <div className="bottom-nav">
        <span>🏠</span>
        <span>📝</span>
        <span>📊</span>
        <span>⚙️</span>
      </div>
    </div>
  );
}
