import React, { useState } from 'react';

const OptimizedImage = ({ src, alt, className, fallback = '/placeholder.png' }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {isLoading && (
        <div style={{
          background: 'linear-gradient(90deg, #1C2128 25%, #21262D 50%, #1C2128 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
          position: 'absolute',
          inset: 0
        }} />
      )}
      <img
        src={error ? fallback : src}
        alt={alt}
        className={className}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true);
          setIsLoading(false);
        }}
        style={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s'
        }}
      />
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};

export default React.memo(OptimizedImage);
