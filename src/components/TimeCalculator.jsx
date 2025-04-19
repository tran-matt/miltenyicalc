import React, { useState } from 'react';

function TimeCalculator() {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [dayDifference, setDayDifference] = useState(0);
  const [result, setResult] = useState('');

  const calculateTimeDifference = () => {
    if (!startTime || !endTime) return;

    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const start = new Date(1970, 0, 1, startHour, startMinute);
    const end = new Date(1970, 0, 1 + Number(dayDifference), endHour, endMinute);

    const diffMs = end - start;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    setResult(`${diffHours} hour(s) and ${diffMinutes} minute(s)`);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Time Calculator</h2>
      <label>Start Time (HH:MM):</label><br />
      <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} /><br />

      <label>End Time (HH:MM):</label><br />
      <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} /><br />

      <label>Days Between Start and End Time:</label><br />
      <input type="number" min="0" value={dayDifference} onChange={(e) => setDayDifference(e.target.value)} /><br />

      <button onClick={calculateTimeDifference} style={{ marginTop: '1rem' }}>Calculate</button>

      {result && <p><strong>Difference:</strong> {result}</p>}
    </div>
  );
}

export default TimeCalculator;
