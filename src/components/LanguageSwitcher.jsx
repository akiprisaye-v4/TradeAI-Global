import React from 'react';
import { useI18n } from '../i18n/useI18n';

const LanguageSwitcher = () => {
  const { lang, setLang } = useI18n();
  
  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      zIndex: 1000,
      display: 'flex',
      gap: 8,
      background: 'rgba(22, 27, 34, 0.95)',
      padding: '8px 12px',
      borderRadius: 20,
      border: '1px solid #30363D',
      backdropFilter: 'blur(10px)'
    }}>
      <button
        onClick={() => setLang('fr')}
        style={{
          padding: '6px 12px',
          borderRadius: 16,
          border: 'none',
          background: lang === 'fr' ? '#FF9900' : '#21262D',
          color: lang === 'fr' ? '#0D1117' : '#8B949E',
          fontSize: 12,
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
      >
        🇫🇷 FR
      </button>
      <button
        onClick={() => setLang('en')}
        style={{
          padding: '6px 12px',
          borderRadius: 16,
          border: 'none',
          background: lang === 'en' ? '#FF9900' : '#21262D',
          color: lang === 'en' ? '#0D1117' : '#8B949E',
          fontSize: 12,
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
      >
        🇬🇧 EN
      </button>
    </div>
  );
};

export default React.memo(LanguageSwitcher);
