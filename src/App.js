import React, { useState } from 'react';
import './styles/App.css';
import Calculator from './components/Calculator';
import ResetCalculator from './components/ResetCalculator';

function App() {
  const [activeTab, setActiveTab] = useState('build');

  return (
    <div className="App">
      <div className="app-header">
        <h1>MU Calculator - The Classic 97D</h1>
        <div className="tab-navigation">
          <button
            className={`tab-btn ${activeTab === 'build' ? 'active' : ''}`}
            onClick={() => setActiveTab('build')}
          >
            Calculadora de Build
          </button>
          <button
            className={`tab-btn ${activeTab === 'reset' ? 'active' : ''}`}
            onClick={() => setActiveTab('reset')}
          >
            Calculadora de Reset
          </button>
        </div>
      </div>

      <div className="app-content">
        {activeTab === 'build' && <Calculator />}
        {activeTab === 'reset' && <ResetCalculator />}
      </div>
    </div>
  );
}

export default App;
