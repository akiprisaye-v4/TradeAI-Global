import React, { useEffect } from 'react';

const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const colors = {
    success: { bg: 'rgba(0,200,83,0.9)', border: '#00C853' },
    error: { bg: 'rgba(255,61,0,0.9)', border: '#FF3D00' },
    warning: { bg: 'rgba(255,153,0,0.9)', border: '#FF9900' },
    info: { bg: 'rgba(59,130,246,0.9)', border: '#3B82F6' }
  };

  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      padding: '16px 24px',
      background: colors[type]?.bg || colors.info.bg,
      border: `2px solid ${colors[type]?.border || colors.info.border}`,
      borderRadius: '12px',
      color: '#fff',
      fontWeight: 600,
      fontSize: '14px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      zIndex: 1400,
      animation: 'slideIn 0.3s ease-out',
      maxWidth: '400px'
    }}>
      <span style={{ fontSize: '18px' }}>{icons[type] || icons.info}</span>
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          marginLeft: 'auto',
          background: 'none',
          border: 'none',
          color: '#fff',
          fontSize: '20px',
          cursor: 'pointer',
          padding: '0 4px'
        }}
      >
        ×
      </button>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default React.memo(Toast);
