import React from "react";
import { useEffect } from 'react';

const ResourcePreloader = () => {
  useEffect(() => {
    // Précharger les polices importantes
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    link.href = '/fonts/your-font.woff2';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return null;
};

export default React.memo(ResourcePreloader);
