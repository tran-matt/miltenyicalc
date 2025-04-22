import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={navStyle}>
      <div style={navInner}>
        <Link to="/" style={{ ...linkStyle, ...(isActive('/') ? activeStyle : {}) }}>
          Home
        </Link>
        <Link to="/time" style={{ ...linkStyle, ...(isActive('/time') ? activeStyle : {}) }}>
          Time
        </Link>
        <Link to="/value" style={{ ...linkStyle, ...(isActive('/value') ? activeStyle : {}) }}>
          Value
        </Link>
        <Link to="/doubling-time" style={{ ...linkStyle, ...(isActive('/doubling-time') ? activeStyle : {}) }}>
          Doubling Time
        </Link>
        <Link to="/game" style={{ ...linkStyle, ...(isActive('/game') ? activeStyle : {}) }}>
          Fill Game
        </Link>
  
      </div>
    </nav>
  );
}

const navStyle = {
  backgroundColor: '#ffffff',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  padding: '0.75rem 1.5rem',
  position: 'sticky',
  top: 0,
  zIndex: 1000
};

const navInner = {
  display: 'flex',
  justifyContent: 'center',
  gap: '2rem',
  alignItems: 'center',
  maxWidth: '900px',
  margin: '0 auto',
  fontFamily: 'Inter, Arial, sans-serif'
};

const linkStyle = {
  textDecoration: 'none',
  color: '#333',
  fontWeight: '600',
  fontSize: '1rem',
  padding: '0.5rem 1rem',
  borderRadius: '8px',
  transition: 'background-color 0.2s ease, color 0.2s ease'
};

const activeStyle = {
  backgroundColor: '#007bff',
  color: 'white'
};

export default Navbar;
