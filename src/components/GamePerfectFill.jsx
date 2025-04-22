import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';

function GamePerfectFill() {
  const [isRunning, setIsRunning] = useState(false);
  const [volume, setVolume] = useState(0);
  const [result, setResult] = useState(null);
  const [highScore, setHighScore] = useState(null);
  const intervalRef = useRef(null);

  const targetVolume = 32.3;
  const maxVolume = 32.7;
  const fullVolume = 50;

  const startTimer = () => {
    setIsRunning(true);
    setResult(null);
    setVolume(0);

    intervalRef.current = setInterval(() => {
      setVolume(prev => {
        const next = +(prev + 0.01).toFixed(2);
        if (next >= fullVolume) {
          stopTimer(next);
        }
        return next;
      });
    }, 10);
  };

  const stopTimer = (stoppedAtInput = volume) => {
    const stoppedAt = typeof stoppedAtInput === 'number' ? stoppedAtInput : volume;
    clearInterval(intervalRef.current);
    setIsRunning(false);

    const rounded = +stoppedAt.toFixed(2);

    if (rounded >= targetVolume && rounded <= maxVolume) {
      setResult(`✅ Success! You stopped at ${rounded.toFixed(2)}L`);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else if (rounded < targetVolume) {
      const diff = (targetVolume - rounded).toFixed(2);
      setResult(`🟡 Too early by ${diff}L`);
    } else {
      const diff = (rounded - maxVolume).toFixed(2);
      setResult(`❌ Overfilled! You went past 32.7L by ${diff}L`);
    }

    const deviation = Math.min(
      Math.abs(stoppedAt - targetVolume),
      Math.abs(stoppedAt - maxVolume)
    );

    if (stoppedAt <= maxVolume) {
      if (highScore === null || deviation < highScore.deviation) {
        setHighScore({ value: stoppedAt, deviation });
      }
    }
  };

  const resetGame = () => {
    setIsRunning(false);
    setVolume(0);
    setResult(null);
    clearInterval(intervalRef.current);
  };

  const fillPercentage = Math.min((volume / fullVolume) * 100, 100);
  const fillColor = volume <= targetVolume
    ? '#007bff'
    : volume <= maxVolume
      ? '#ffc107'
      : '#dc3545';

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🧪 Bioreactor Fill Game</h2>
      <p style={styles.subtext}>Try to stop the fill between <strong>32.3L</strong> and <strong>32.7L</strong>. Overshooting means deviation! Undershooting means incomplete fill!</p>

      <div style={styles.gameWrap}>
        <div style={styles.bioreactor}>
          <div style={{
            ...styles.fill,
            height: `${fillPercentage}%`,
            backgroundColor: fillColor
          }} />
        </div>
        <div style={styles.timerDisplay}>{volume.toFixed(2)}L</div>
      </div>

      <div style={styles.buttonRow}>
        {!isRunning ? (
          <button onClick={startTimer} style={styles.buttonPrimary}>▶️ Start</button>
        ) : (
          <button onClick={() => stopTimer()} style={styles.buttonStop}>⏹️ Stop</button>
        )}
        <button onClick={resetGame} style={styles.buttonSecondary}>🔄 Reset</button>
      </div>

      {result && <p style={styles.resultText}>{result}</p>}
      {highScore && (
        <p style={{ ...styles.resultText, color: '#28a745' }}>
          🏆 Best so far: {highScore.value.toFixed(2)}L (±{highScore.deviation.toFixed(2)}L)
        </p>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '2rem auto',
    padding: '2rem',
    borderRadius: '16px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
    fontFamily: 'Inter, Arial, sans-serif',
    textAlign: 'center'
  },
  heading: {
    fontSize: '1.75rem',
    marginBottom: '0.5rem'
  },
  subtext: {
    fontSize: '1rem',
    marginBottom: '2rem',
    color: '#555'
  },
  gameWrap: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '2rem',
    justifyContent: 'center',
    marginBottom: '2rem'
  },
  bioreactor: {
    width: '80px',
    height: '250px',
    border: '4px solid #ccc',
    borderRadius: '12px',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#eaeaea'
  },
  fill: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    transition: 'height 0.1s ease-in-out',
    backgroundImage: 'radial-gradient(circle at 10% 10%, rgba(255,255,255,0.3) 2%, transparent 0%), radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 1%, transparent 0%)',
    backgroundRepeat: 'repeat',
    backgroundSize: '20px 20px'
  },
  timerDisplay: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#007bff'
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '1.5rem'
  },
  buttonPrimary: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  buttonStop: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  buttonSecondary: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  resultText: {
    fontSize: '1.2rem',
    color: '#333',
    fontWeight: '500'
  }
};

export default GamePerfectFill;
