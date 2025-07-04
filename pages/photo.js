// pages/photo.js
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function UploadPhoto() {
  const router = useRouter();
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        localStorage.setItem('skinPhoto', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container" style={{ minHeight: '100vh', padding: '1rem' }}>
      <Head>
        <title>Upload Photo | Flare AI</title>
      </Head>

      <div className="card" style={{ maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Upload Skin Photo</h1>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginBottom: '1rem' }}
        />

        {preview && (
          <div style={{ marginTop: '1rem' }}>
            <p style={{ fontWeight: '500' }}>Preview:</p>
            <img src={preview} alt="Preview" style={{ maxWidth: '100%', borderRadius: '12px' }} />
          </div>
        )}

        <button
          className="button"
          style={{ marginTop: '1.5rem' }}
          onClick={() => router.push('/home')}
        >
          Done
        </button>
      </div>
    </div>
  );
}
