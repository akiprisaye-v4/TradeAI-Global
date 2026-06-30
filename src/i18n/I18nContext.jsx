import React, { createContext, useContext, useState } from 'react';
import { translations, defaultLang } from './translations';

const I18nContext = createContext();

export const useI18n = () => useContext(I18nContext);

export const I18nProvider = ({ children }) => {
  const [lang, setLang] = useState(defaultLang);
  const t = (path) => {
    const keys = path.split('.');
    let value = translations[lang];
    for (const key of keys) {
      value = value?.[key];
    }
    return value || path;
  };
  
  return (
    <I18nContext.Provider value={{ t, lang, setLang }}>
      {children}
    </I18nContext.Provider>
  );
};
