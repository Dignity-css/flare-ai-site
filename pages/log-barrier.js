// pages/log-barrier.js
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LogBarrier() {
  const router = useRouter();
  const [moisturized, setMoisturized] = useState('');
  const [newProduct, setNewProduct] = useState('');
  const [productType, setProductType] = useState('');
  const [sweatWash, setSweatWash] = useState('');
  const [sunscreen, setSunscreen] = useState('');

  const handleNext = () => {
    const prevLog = JSON.parse(localStorage.getItem('logEntry')) || {};
    const updatedLog = {
      ...prevLog,
      moisturized,
      newProduct,
      productType: newProduct === 'Yes' ? productType : '',
      sweatWash,
      sunscreen,
    };
    localStorage.setItem('logEntry', JSON.stringify(updatedLog));
    router.push('/log-lifestyle');
  };

  const selectStyle = {
    width: '100%',
    padding: '0.6rem',
    marginTop: '0.4rem',
    borderRadius: '0.8rem',
    border: '1px solid #ccc',
    backgroundColor: '#fdfdfd',
    fontSize: '1rem'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.6rem',
    marginTop: '0.4rem',
    borderRadius: '0.8rem',
    border: '1px solid #ccc',
    fontSize: '1rem'
  };

  const allFilled = moisturized && newProduct && sweatWash && sunscreen && (newProduct !== 'Yes' || productType);

  return (
    <div
      className="container"
      style={{
        minHeight: '100vh',
        backgroundColor: '#fce9e9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem'
      }}
    >
      <Head><title>Barrier Care | Dermind</title></Head>

      <div
        style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '1.5rem',
          maxWidth: '480px',
          width: '100%',
          boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
        }}
      >
        <h1 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', textAlign: 'center' }}>
          🧴 Barrier & Skincare
        </h1>

        <label style={{ display: 'block', marginBottom: '1.2rem' }}>
          Did you apply your regular moisturizer today?
          <select value={moisturized} onChange={(e) => setMoisturized(e.target.value)} style={selectStyle}>
            <option value="">Select</option>
            <option>Yes</option>
            <option>No</option>
            <option>Sometimes</option>
          </select>
        </label>

        <label style={{ display: 'block', marginBottom: '1.2rem' }}>
          Did you try any new product today?
          <select value={newProduct} onChange={(e) => setNewProduct(e.target.value)} style={selectStyle}>
            <option value="">Select</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </label>

        {newProduct === 'Yes' && (
          <label style={{ display: 'block', marginBottom: '1.2rem' }}>
            What type of product?
            <input
              type="text"
              placeholder="e.g. serum, ointment, cream"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              style={inputStyle}
            />
          </label>
        )}

        <label style={{ display: 'block', marginBottom: '1.2rem' }}>
          Did you sweat today and delay washing?
          <select value={sweatWash} onChange={(e) => setSweatWash(e.target.value)} style={selectStyle}>
            <option value="">Select</option>
            <option>Yes</option>
            <option>Washed late</option>
            <option>Didn’t sweat</option>
          </select>
        </label>

        <label style={{ display: 'block', marginBottom: '1.5rem' }}>
          Did you use sunscreen today?
          <select value={sunscreen} onChange={(e) => setSunscreen(e.target.value)} style={selectStyle}>
            <option value="">Select</option>
            <option>Yes</option>
            <option>No</option>
            <option>N/A</option>
          </select>
        </label>

        <button
          onClick={handleNext}
          disabled={!allFilled}
          className="button"
          style={{
            width: '100%',
            padding: '0.85rem',
            borderRadius: '1rem',
            backgroundColor: allFilled ? '#f78d8d' : '#ccc',
            color: 'white',
            fontWeight: 600,
            fontSize: '1rem',
            border: 'none',
            cursor: allFilled ? 'pointer' : 'not-allowed'
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
