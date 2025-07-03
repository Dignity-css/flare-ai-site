// pages/log.js
import Head from 'next/head';
import Link from 'next/link';

export default function Log() {
  return (
    <>
      <Head>
        <title>Log Data</title>
      </Head>

      <div className="container">
        <h1>Log Today’s Data</h1>

        <div className="card">
          <p>Track your health indicators below:</p>

          <div style={{ marginTop: '1rem', textAlign: 'left' }}>
            <label>
              Hours Slept: <br />
              <input type="number" placeholder="e.g. 7" style={inputStyle} />
            </label>
          </div>

          <div style={{ marginTop: '1rem', textAlign: 'left' }}>
            <label>
              UV Exposure: <br />
              <input type="text" placeholder="e.g. Moderate" style={inputStyle} />
            </label>
          </div>

          <div style={{ marginTop: '1rem', textAlign: 'left' }}>
            <label>
              Pollen Symptoms: <br />
              <input type="text" placeholder="e.g. Sneezing" style={inputStyle} />
            </label>
          </div>
        </div>

        <button className="button">Submit</button>

        <Link href="/" passHref>
          <div className="button" style={{ backgroundColor: '#ccc', color: '#000', marginTop: '0.5rem' }}>
            ← Back to Home
          </div>
        </Link>

        <div className="bottom-nav">
          <span>🏠</span>
          <span>📝</span>
          <span>📊</span>
          <span>⚙️</span>
        </div>
      </div>
    </>
  );
}

// inline styling for input fields
const inputStyle = {
  width: '100%',
  padding: '0.5rem',
  borderRadius: '8px',
  border: '1px solid #ccc',
  marginTop: '0.25rem',
};
