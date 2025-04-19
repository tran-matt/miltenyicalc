import React, { useState } from 'react';

function ValueCalculator() {
  const [values, setValues] = useState(['']);
  const [result, setResult] = useState({ sum: 0, avg: 0 });

  const handleValueChange = (index, newValue) => {
    const updated = [...values];
    updated[index] = newValue;
    setValues(updated);
  };

  const addInput = () => {
    setValues([...values, '']);
  };

  const removeInput = (index) => {
    const updated = values.filter((_, i) => i !== index);
    setValues(updated.length ? updated : ['']);
  };

  const calculate = () => {
    try {
      const numericValues = values.map(v => parseFloat(v)).filter(v => !isNaN(v));
      const sum = numericValues.reduce((acc, val) => acc + val, 0);
      const avg = numericValues.length ? sum / numericValues.length : 0;
      setResult({ sum, avg });
    } catch {
      setResult({ sum: 0, avg: 0 });
    }
  };

  const hasValidInput = values.some(v => v.trim() !== '');

  return (
    <div style={{
      maxWidth: '600px',
      margin: '2rem auto',
      padding: '2rem',
      borderRadius: '16px',
      boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
      fontFamily: 'Inter, Arial, sans-serif',
      backgroundColor: '#f9f9f9',
      transition: 'all 0.3s ease'
    }}>
      <h2 style={{
        textAlign: 'center',
        marginBottom: '1.5rem',
        fontWeight: '600',
        color: '#333'
      }}>🔢 Value Calculator</h2>

      {values.map((val, idx) => (
        <div key={idx} style={{
          display: 'flex',
          marginBottom: '0.75rem',
          alignItems: 'center',
          transition: 'all 0.3s ease'
        }}>
          <input
            type="text"
            placeholder="e.g., 2.5e6"
            title="Supports scientific notation"
            value={val}
            onChange={(e) => handleValueChange(idx, e.target.value)}
            style={{
              flex: 1,
              padding: '0.5rem 0.75rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '1rem',
              marginRight: '0.5rem',
              transition: 'border-color 0.2s ease'
            }}
          />
          {values.length > 1 && (
            <button
              onClick={() => removeInput(idx)}
              aria-label="Remove input"
              title="Remove this value"
              style={{
                padding: '0.4rem 0.6rem',
                backgroundColor: '#e74c3c',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              ×
            </button>
          )}
        </div>
      ))}

      <button
        onClick={addInput}
        style={{
          marginBottom: '1rem',
          width: '100%',
          padding: '0.75rem',
          backgroundColor: '#6c757d',
          color: '#fff',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: '500'
        }}
      >
        ➕ Add Value
      </button>

      <button
        onClick={calculate}
        disabled={!hasValidInput}
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: hasValidInput ? '#007bff' : '#a0a0a0',
          color: '#fff',
          border: 'none',
          borderRadius: '10px',
          cursor: hasValidInput ? 'pointer' : 'not-allowed',
          fontWeight: 'bold',
          fontSize: '1rem',
          transition: 'background-color 0.3s ease'
        }}
      >
        ✅ Calculate
      </button>

      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        lineHeight: '1.6'
      }}>
        <p><strong>Total:</strong> {result.sum.toExponential(3)} <span style={{ color: '#888' }}>({result.sum.toLocaleString()})</span></p>
        <p><strong>Average:</strong> {result.avg.toExponential(3)} <span style={{ color: '#888' }}>({result.avg.toLocaleString()})</span></p>
        <p><strong>Values Count:</strong> {values.filter(v => v.trim() !== '').length}</p>
      </div>
    </div>
  );
}

export default ValueCalculator;
