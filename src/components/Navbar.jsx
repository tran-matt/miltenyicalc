import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={navStyle}>
      <div style={navContainer}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={burgerButton}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <div
          style={{
            ...navInner,
            ...(isOpen ? navInnerMobileOpen : navInnerMobileClosed)
          }}
        >
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

const navContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '900px',
  margin: '0 auto',
  fontFamily: 'Inter, Arial, sans-serif'
};

const burgerButton = {
  fontSize: '1.5rem',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  display: 'none',
  '@media (max-width: 768px)': {
    display: 'block'
  }
};

const navInner = {
  display: 'flex',
  justifyContent: 'center',
  gap: '2rem',
  alignItems: 'center'
};

const navInnerMobileOpen = {
  flexDirection: 'column',
  position: 'absolute',
  top: '60px',
  left: 0,
  right: 0,
  backgroundColor: '#fff',
  padding: '1rem',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  zIndex: 999
};

const navInnerMobileClosed = {
  display: 'none'
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
