import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{
      padding: '3rem 1rem',
      maxWidth: '700px',
      margin: '0 auto',
      fontFamily: 'Inter, Arial, sans-serif',
      color: '#333'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        marginBottom: '1rem',
        fontWeight: '700',
        textAlign: 'center'
      }}>
        Time & Value Calculator
      </h1>

      <p style={{
        fontSize: '1.1rem',
        textAlign: 'center',
        color: '#555',
        maxWidth: '600px',
        margin: '0 auto 2rem'
      }}>
        This simple tool lets you quickly calculate time differences in days and hours, perform value-based operations like adding or averaging with scientific notation, and simulate timing precision for upstream bioprocessing.
      </p>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center'
      }}>
        <Link to="/time" style={buttonStyle}>
          ⏱️ Time Calculator
        </Link>

        <Link to="/value" style={buttonStyle}>
          🔢 Value Calculator
        </Link>

        <Link to="/doubling-time" style={buttonStyle}>
          📈 Doubling Time Calculator
        </Link>

        <Link to="/game" style={buttonStyle}>
          🎮 Fill Timing Game
        </Link>

      </div>
    </div>
  );
}

const buttonStyle = {
  display: 'inline-block',
  padding: '0.75rem 1.5rem',
  backgroundColor: '#007bff',
  color: 'white',
  fontWeight: '600',
  borderRadius: '12px',
  textDecoration: 'none',
  fontSize: '1.1rem',
  transition: 'background-color 0.3s ease',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  width: 'fit-content',
};

export default Home;
