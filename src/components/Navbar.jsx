import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sectionsOpen, setSectionsOpen] = useState({
    tools: true,
    games: true,
  });

  // Auto-open menu on desktop screen sizes
  useEffect(() => {
    if (window.innerWidth > 768) {
      setMenuOpen(true);
    }
  }, []);

  const isActive = (path) => location.pathname === path;
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleSection = (section) =>
    setSectionsOpen((prev) => ({ ...prev, [section]: !prev[section] }));

  return (
    <nav style={navStyle}>
      <div style={navInner}>
        <Link to="/" style={brandStyle}>MiltenyiTrain</Link>

        <button onClick={toggleMenu} style={hamburgerStyle} aria-label="Toggle menu">
          ☰
        </button>

        {menuOpen && (
          <div style={menuStyle}>
            {/* 🛠 Tools */}
            <div style={sectionHeader} onClick={() => toggleSection('tools')}>
              🛠 Tools {sectionsOpen.tools ? '▲' : '▼'}
            </div>
            {sectionsOpen.tools && (
              <>
                <Link to="/time" style={{ ...linkStyle, ...(isActive('/time') ? activeStyle : {}) }}>
                  Time Calculator
                </Link>
                <Link to="/value" style={{ ...linkStyle, ...(isActive('/value') ? activeStyle : {}) }}>
                  Value Calculator
                </Link>
                <Link to="/doubling-time" style={{ ...linkStyle, ...(isActive('/doubling-time') ? activeStyle : {}) }}>
                  Doubling Time
                </Link>
              </>
            )}
            <div style={dividerStyle} />

            {/* 🎮 Games */}
            <div style={sectionHeader} onClick={() => toggleSection('games')}>
              🎮 Games {sectionsOpen.games ? '▲' : '▼'}
            </div>
            {sectionsOpen.games && (
              <>
                <Link to="/game" style={{ ...linkStyle, ...(isActive('/game') ? activeStyle : {}) }}>
                  Fill Game
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
const navStyle = {
  backgroundColor: '#fff',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  padding: '0.75rem 1.5rem',
  position: 'sticky',
  top: 0,
  zIndex: 1000
};

const navInner = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '900px',
  margin: '0 auto',
  fontFamily: 'Inter, Arial, sans-serif',
  flexWrap: 'wrap'
};

const brandStyle = {
  fontWeight: 'bold',
  fontSize: '1.25rem',
  color: '#007bff',
  textDecoration: 'none',
  padding: '0.5rem 0',
  cursor: 'pointer'
};

const hamburgerStyle = {
  fontSize: '1.5rem',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  display: 'block',
  marginLeft: 'auto',
  color: '#333'
};

const menuStyle = {
  flexBasis: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginTop: '0.75rem'
};

const sectionHeader = {
  fontWeight: 'bold',
  fontSize: '1rem',
  color: '#007bff',
  padding: '0.5rem 1rem',
  cursor: 'pointer',
  width: '100%'
};

const linkStyle = {
  textDecoration: 'none',
  color: '#333',
  fontWeight: '600',
  fontSize: '1rem',
  padding: '0.5rem 1.5rem',
  borderRadius: '8px',
  transition: 'background-color 0.2s ease, color 0.2s ease',
  width: '100%'
};

const activeStyle = {
  backgroundColor: '#007bff',
  color: 'white'
};

const dividerStyle = {
  height: '1px',
  backgroundColor: '#e0e0e0',
  width: '90%',
  margin: '0.5rem auto'
};

export default Navbar;
