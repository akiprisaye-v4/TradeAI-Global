import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // Vérifier localStorage ou préférence système
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('theme');
        if (saved) return saved === 'dark';
      } catch {
        // Stockage indisponible : fallback sur la préférence système.
      }

      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true; // Par défaut : sombre
  });

  useEffect(() => {
    // Appliquer le thème au body
    document.body.className = isDark ? 'theme-dark' : 'theme-light';

    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch {
      // Stockage indisponible : le thème reste appliqué pour la session.
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
