import React, { useState } from 'react';

function DoublingTimeCalculator() {
  const [initial, setInitial] = useState('');
  const [final, setFinal] = useState('');
  const [timeElapsed, setTimeElapsed] = useState('');
  const [timeUnit, setTimeUnit] = useState('hours'); // 'hours' or 'minutes'
  const [result, setResult] = useState(null);

  const parseInput = (val) => {
    const parsed = parseFloat(val);
    return isNaN(parsed) ? null : parsed;
  };

  const calculateDoublingTime = () => {
    const N0 = parseInput(initial);
    const Nt = parseInput(final);
    let t = parseInput(timeElapsed);

    if (N0 > 0 && Nt > N0 && t > 0) {
      if (timeUnit === 'minutes') t = t / 60;

      const Td = (t * Math.log(2)) / Math.log(Nt / N0);
      setResult({
        value: Td,
        scientific: Td.toExponential(3),
        formatted: Td.toLocaleString(undefined, { maximumFractionDigits: 2 }),
      });
    } else {
      setResult('⚠️ Invalid input. Ensure: Final > Initial and Time > 0.');
    }
  };

  const reset = () => {
    setInitial('');
    setFinal('');
    setTimeElapsed('');
    setResult(null);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🧬 Doubling Time Calculator</h2>
      <p style={styles.subtext}>Enter values below. Supports scientific notation (e.g., 1.2e6).</p>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Initial Cell Count:</label>
        <input
          type="text"
          placeholder="e.g., 0.5e6"
          value={initial}
          onChange={(e) => setInitial(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Final Cell Count:</label>
        <input
          type="text"
          placeholder="e.g., 1.2e6"
          value={final}
          onChange={(e) => setFinal(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Time Elapsed:</label>
        <div style={styles.timeRow}>
          <input
            type="text"
            placeholder="e.g., 90"
            value={timeElapsed}
            onChange={(e) => setTimeElapsed(e.target.value)}
            style={{ ...styles.input, flex: 1 }}
          />
          <select
            value={timeUnit}
            onChange={(e) => setTimeUnit(e.target.value)}
            style={styles.unitSelect}
          >
            <option value="hours">Hours</option>
            <option value="minutes">Minutes</option>
          </select>
        </div>
      </div>

      <div style={styles.buttonRow}>
        <button onClick={calculateDoublingTime} style={styles.buttonPrimary}>📊 Calculate</button>
        <button onClick={reset} style={styles.buttonSecondary}>🔄 Reset</button>
      </div>

      {result && typeof result === 'object' && (
        <div style={styles.resultBox}>
          <p><strong>Doubling Time:</strong> {result.scientific} <span style={{ color: '#777' }}>({result.formatted} hours)</span></p>
        </div>
      )}

      {typeof result === 'string' && (
        <p style={{ color: '#dc3545', marginTop: '1rem', fontWeight: 'bold' }}>{result}</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '2rem',
    borderRadius: '16px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    fontFamily: 'Inter, Arial, sans-serif',
    textAlign: 'center'
  },
  heading: {
    fontSize: '1.75rem',
    marginBottom: '0.5rem'
  },
  subtext: {
    fontSize: '1rem',
    marginBottom: '1.5rem',
    color: '#555'
  },
  inputGroup: {
    textAlign: 'left',
    marginBottom: '1rem'
  },
  label: {
    display: 'block',
    marginBottom: '0.4rem',
    fontWeight: 'bold',
    color: '#333'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '10px',
    border: '1px solid #ccc'
  },
  timeRow: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center'
  },
  unitSelect: {
    padding: '0.65rem',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    backgroundColor: '#fff',
    cursor: 'pointer'
  },
  buttonRow: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    marginTop: '1rem'
  },
  buttonPrimary: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer'
  },
  buttonSecondary: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer'
  },
  resultBox: {
    marginTop: '2rem',
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    fontSize: '1.1rem'
  }
};

export default DoublingTimeCalculator;
