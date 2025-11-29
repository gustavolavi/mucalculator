import React, { useState } from 'react';
import './styles/App.css';
import Calculator from './components/Calculator';
import ResetCalculator from './components/ResetCalculator';

function App() {
  const [activeTab, setActiveTab] = useState('reset');

  return (
    <div className="App">
      <div className="app-header">
        <h1>MU Calculator - The Classic 97D</h1>
        <div className="tab-navigation">
          <button
            className={`tab-btn ${activeTab === 'reset' ? 'active' : ''}`}
            onClick={() => setActiveTab('reset')}
          >
            Calculadora de Reset
          </button>
          <button
            className={`tab-btn ${activeTab === 'build' ? 'active' : ''}`}
            onClick={() => setActiveTab('build')}
          >
            Calculadora de Build
          </button>
        </div>
      </div>

      <div className="app-content">
        {activeTab === 'reset' && <ResetCalculator />}
        {activeTab === 'build' && <Calculator />}
      </div>
    </div>
  );
}

export default App;
