import React from 'react';

const LoadingScreen = () => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0D1117',
    color: '#FF9900'
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ 
        fontSize: 48, 
        marginBottom: 20,
        animation: 'pulse 1.5s ease-in-out infinite'
      }}>
        📦
      </div>
      <div style={{ fontSize: 18, fontWeight: 700 }}>
        Amazon Profit Pro
      </div>
      <div style={{ 
        fontSize: 12, 
        color: '#8B949E',
        marginTop: 10 
      }}>
        Chargement...
      </div>
    </div>
  </div>
);

export default React.memo(LoadingScreen);
