import React, { useState } from 'react';

function ValueCalculator() {
  const [values, setValues] = useState(['']);
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);

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
      if (numericValues.length === 0) return setResult('Invalid input');

      let resultValue;
      switch (operation) {
        case 'add':
          resultValue = numericValues.reduce((a, b) => a + b, 0);
          break;
        case 'subtract':
          resultValue = numericValues.reduce((a, b) => a - b);
          break;
        case 'multiply':
          resultValue = numericValues.reduce((a, b) => a * b, 1);
          break;
        case 'divide':
          resultValue = numericValues.reduce((a, b) => a / b);
          break;
        case 'average':
          resultValue = numericValues.reduce((a, b) => a + b, 0) / numericValues.length;
          break;
        default:
          resultValue = 'Unknown operation';
      }

      setResult({
        value: resultValue,
        scientific: resultValue.toExponential(3),
        formatted: resultValue.toLocaleString(),
        count: numericValues.length
      });
    } catch {
      setResult('Error');
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

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="operation" style={{ fontWeight: 'bold' }}>Select Operation:</label>
        <select
          id="operation"
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          style={{
            display: 'block',
            width: '100%',
            padding: '0.6rem',
            marginTop: '0.5rem',
            borderRadius: '10px',
            border: '1px solid #ccc',
            fontSize: '1rem'
          }}
        >
          <option value="add">➕ Add</option>
          <option value="subtract">➖ Subtract</option>
          <option value="multiply">✖ Multiply</option>
          <option value="divide">➗ Divide</option>
          <option value="average"> Average</option>
        </select>
      </div>

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
        Calculate
      </button>

      {result && typeof result === 'object' && (
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#fff',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          lineHeight: '1.6'
        }}>
          <p><strong>Result:</strong> {result.scientific} <span style={{ color: '#888' }}>({result.formatted})</span></p>
          <p><strong>Values Count:</strong> {result.count}</p>
        </div>
      )}
    </div>
  );
}

export default ValueCalculator;
