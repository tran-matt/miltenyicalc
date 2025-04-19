// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TimeCalculator from './components/TimeCalculator';
import ValueCalculator from './components/ValueCalculator';
import Navbar from './components/Navbar';
import Home from './Home';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/time" element={<TimeCalculator />} />
        <Route path="/value" element={<ValueCalculator />} />
      </Routes>
    </Router>
  );
}

export default App;
