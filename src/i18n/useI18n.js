import { useState, useEffect } from 'react';
import fr from './fr.json';
import en from './en.json';

const translations = { fr, en };

export const useI18n = () => {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('lang') || 'fr';
    }
    return 'fr';
  });

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[lang];
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return key;
    }
    return value;
  };

  return { t, lang, setLang };
};

export default useI18n;
