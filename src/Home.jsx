import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Welcome to MiltenyiTrain</h1>

      <p style={subtextStyle}>
        Practice timing precision, reinforce calculations, and train upstream biotech instincts — all in one place.
      </p>

      {/* Tool Section */}
      <div style={sectionStyle}>
        <h2 style={sectionHeading}>🛠 Tools</h2>
        <Link to="/time" style={buttonStyle}>⏱️ Time Calculator</Link>
        <Link to="/value" style={buttonStyle}>🔢 Value Calculator</Link>
        <Link to="/doubling-time" style={buttonStyle}>📈 Doubling Time Calculator</Link>
      </div>

      {/* Game Section */}
      <div style={sectionStyle}>
        <h2 style={sectionHeading}>🎮 Training Games</h2>
        <Link to="/game" style={buttonStyle}>🎯 Fill Timing Game</Link>
      </div>
    </div>
  );
}
const containerStyle = {
  padding: '4rem 1rem',
  maxWidth: '720px',
  margin: '0 auto',
  fontFamily: 'Inter, Arial, sans-serif',
  color: '#333',
  textAlign: 'center'
};

const headingStyle = {
  fontSize: '2.75rem',
  fontWeight: '700',
  marginBottom: '1rem',
  color: '#007bff'
};

const subtextStyle = {
  fontSize: '1.15rem',
  color: '#555',
  marginBottom: '3rem',
  maxWidth: '600px',
  marginInline: 'auto',
  lineHeight: 1.6
};

const sectionStyle = {
  marginBottom: '3rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  alignItems: 'center'
};

const sectionHeading = {
  fontSize: '1.25rem',
  fontWeight: '600',
  color: '#333',
  marginBottom: '0.5rem'
};

const buttonStyle = {
  display: 'inline-block',
  padding: '0.75rem 1.5rem',
  backgroundColor: '#007bff',
  color: '#fff',
  fontWeight: '600',
  borderRadius: '12px',
  textDecoration: 'none',
  fontSize: '1.05rem',
  transition: 'all 0.25s ease',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  width: 'fit-content'
};

export default Home;
