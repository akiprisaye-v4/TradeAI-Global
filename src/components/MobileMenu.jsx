import React, { useState } from 'react';

const MobileMenu = ({ tabs, activeTab, onTabChange, onAboutClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleTabClick = (tab) => {
    onTabChange(tab);
    setIsOpen(false);
  };

  return (
    <>
      {/* Bouton Burger - Visible uniquement sur mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'none',
          position: 'fixed',
          top: 14,
          right: 14,
          zIndex: 1210,
          background: '#FF9900',
          border: 'none',
          borderRadius: 8,
          width: 44,
          height: 44,
          cursor: 'pointer',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 4,
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}
        className="mobile-menu-toggle"
      >
        <span style={{
          display: 'block',
          width: 20,
          height: 2,
          background: '#0D1117',
          borderRadius: 2,
          transition: 'all 0.3s'
        }} />
        <span style={{
          display: 'block',
          width: 20,
          height: 2,
          background: '#0D1117',
          borderRadius: 2,
          transition: 'all 0.3s'
        }} />
        <span style={{
          display: 'block',
          width: 20,
          height: 2,
          background: '#0D1117',
          borderRadius: 2,
          transition: 'all 0.3s'
        }} />
      </button>

      {/* Menu déroulant */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(13, 17, 23, 0.98)',
            zIndex: 1200,
            padding: 80,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            overflowY: 'auto'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              style={{
                padding: '16px 20px',
                borderRadius: 12,
                border: 'none',
                background: activeTab === tab.id ? '#FF9900' : '#21262D',
                color: activeTab === tab.id ? '#0D1117' : '#E6EDF3',
                fontSize: 16,
                fontWeight: 700,
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                transition: 'all 0.2s'
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
          
          <button
            onClick={onAboutClick}
            style={{
              padding: '16px 20px',
              borderRadius: 12,
              border: 'none',
              background: '#161B22',
              color: '#8B949E',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              textAlign: 'center',
              marginTop: 20,
              borderTop: '1px solid #30363D'
            }}
          >
            ℹ️ À propos de l'application
          </button>
        </div>
      )}

      {/* CSS pour afficher le burger sur mobile */}
      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-toggle {
            display: flex !important;
          }
          .desktop-tabs {
            display: none !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-menu-toggle {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default React.memo(MobileMenu);
