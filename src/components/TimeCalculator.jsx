import React, { useState } from 'react';

function TimeCalculator() {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [dayDifference, setDayDifference] = useState(0);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const calculateTimeDifference = () => {
    setError('');
    setResult('');

    if (!startTime || !endTime) {
      setError('Please enter both start and end times.');
      return;
    }

    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const start = new Date(1970, 0, 1, startHour, startMinute);
    const end = new Date(1970, 0, 1 + Number(dayDifference), endHour, endMinute);

    const diffMs = end - start;

    if (diffMs < 0) {
      setError('End time must be after start time.');
      return;
    }

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    setResult(`${diffHours} hour(s) and ${diffMinutes} minute(s)`);
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '2rem auto',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#fff'
    }}>
      <h2 style={{ textAlign: 'center' }}>⏱️ Time Calculator</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="start">Start Time:</label>
        <input
          id="start"
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="end">End Time:</label>
        <input
          id="end"
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="days">Incubation Days Between:</label>
        <input
          id="days"
          type="number"
          min="0"
          value={dayDifference}
          onChange={(e) => setDayDifference(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
      </div>

      <button
        onClick={calculateTimeDifference}
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Calculate
      </button>

      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      {result && <p style={{ color: 'green', marginTop: '1rem' }}><strong>Difference:</strong> {result}</p>}
    </div>
  );
}

export default TimeCalculator;
