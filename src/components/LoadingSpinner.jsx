import React from 'react';

const LoadingSpinner = ({ size = 'medium', text = 'Chargement...' }) => {
  const sizes = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      padding: '40px'
    }}>
      <div style={{
        width: sizes[size] || sizes.medium,
        height: sizes[size] || sizes.medium,
        border: '4px solid rgba(255,153,0,0.1)',
        borderTop: '4px solid #FF9900',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      {text && (
        <div style={{
          color: '#8B949E',
          fontSize: '14px',
          fontWeight: 500
        }}>
          {text}
        </div>
      )}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default React.memo(LoadingSpinner);
