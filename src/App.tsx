import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import ProductHunter from './components/ProductHunter';
import TradeCopilot from './components/TradeCopilot';
import DomTom from './components/DomTom';
import './App.css';

type Tab = 'dashboard' | 'hunter' | 'copilot' | 'domtom';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  const tabs = [
    { id: 'dashboard' as Tab, label: 'Dashboard', icon: '📊' },
    { id: 'hunter' as Tab, label: 'Product Hunter', icon: '🎯' },
    { id: 'copilot' as Tab, label: 'Trade Copilot', icon: '🤖' },
    { id: 'domtom' as Tab, label: 'Taxes Régionales', icon: '🌴' },
  ];

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>TradeAI Global <span className="version">v5.2</span></h1>
          <div className="status-badge">
            <span className="status-dot"></span>
            <span>En ligne — 55 produits actifs</span>
          </div>
        </div>
        <nav className="tab-nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </nav>
      </header>
      <main className="app-main">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'hunter' && <ProductHunter />}
        {activeTab === 'copilot' && <TradeCopilot />}
        {activeTab === 'domtom' && <DomTom />}
      </main>
    </div>
  );
};

export default App;
