import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>Home</Link>
      <Link to="/time" style={linkStyle}>Time Calculator</Link>
      <Link to="/value" style={linkStyle}>Value Calculator</Link>
    </nav>
  );
}

const navStyle = {
  padding: '1rem',
  backgroundColor: '#f5f5f5',
  display: 'flex',
  justifyContent: 'space-around',
  borderBottom: '1px solid #ddd'
};

const linkStyle = {
  textDecoration: 'none',
  color: '#333',
  fontWeight: '600'
};

export default Navbar;
