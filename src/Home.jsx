// src/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to Time & Value Calculator</h1>
      <p>This simple app helps you quickly calculate time differences and custom value-based calculations.</p>
      <div style={{ marginTop: '2rem' }}>
        <Link to="/time" style={linkStyle}>→ Time Calculator</Link><br />
        <Link to="/value" style={linkStyle}>→ Value Calculator</Link>
      </div>
    </div>
  );
}

const linkStyle = {
  display: 'inline-block',
  margin: '1rem 0',
  textDecoration: 'none',
  color: '#007bff',
  fontWeight: 'bold'
};

export default Home;
