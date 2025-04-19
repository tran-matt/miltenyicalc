import React, { useState } from 'react';

function TimeCalculator() {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [dayDifference, setDayDifference] = useState(0);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const formatToStandardTime = (milTime) => {
    if (milTime.length !== 4) return '';
    const hour = parseInt(milTime.slice(0, 2));
    const minute = parseInt(milTime.slice(2));
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${suffix}`;
  };

  const isValidMilitaryTime = (input) => {
    return /^\d{4}$/.test(input) && parseInt(input.slice(0, 2)) < 24 && parseInt(input.slice(2)) < 60;
  };

  const calculateTimeDifference = () => {
    setError('');
    setResult('');

    if (!isValidMilitaryTime(startTime) || !isValidMilitaryTime(endTime)) {
      setError('Please enter valid 4-digit military times (e.g., 1430, 0845).');
      return;
    }

    const startHour = parseInt(startTime.slice(0, 2));
    const startMinute = parseInt(startTime.slice(2));
    const endHour = parseInt(endTime.slice(0, 2));
    const endMinute = parseInt(endTime.slice(2));

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
      maxWidth: '420px',
      margin: '2rem auto',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#fff'
    }}>
      <h2 style={{ textAlign: 'center' }}>⏱️ Time Calculator</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="start">Start Time (military):</label>
        <input
          id="start"
          type="text"
          placeholder="e.g. 1630"
          maxLength={4}
          value={startTime}
          onChange={(e) => setStartTime(e.target.value.replace(/\D/g, ''))}
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
        {isValidMilitaryTime(startTime) && (
          <p style={{ color: '#555', marginTop: '0.25rem' }}>
            🕒 Standard Time: <strong>{formatToStandardTime(startTime)}</strong>
          </p>
        )}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="end">End Time (military):</label>
        <input
          id="end"
          type="text"
          placeholder="e.g. 0815"
          maxLength={4}
          value={endTime}
          onChange={(e) => setEndTime(e.target.value.replace(/\D/g, ''))}
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
        {isValidMilitaryTime(endTime) && (
          <p style={{ color: '#555', marginTop: '0.25rem' }}>
            🕒 Standard Time: <strong>{formatToStandardTime(endTime)}</strong>
          </p>
        )}
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
