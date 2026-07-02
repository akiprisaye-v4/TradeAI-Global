import React, { useState } from 'react';
export default function KeywordResearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const search = () => {
    if (!query.trim()) return;
    const mock = [
      { kw: query, vol: Math.floor(Math.random()*50000)+10000, diff: 30, cpc: 1.5 },
      { kw: query + ' pas cher', vol: 25000, diff: 40, cpc: 1.2 },
      { kw: 'meilleur ' + query, vol: 20000, diff: 50, cpc: 2.0 },
      { kw: query + ' avis', vol: 15000, diff: 35, cpc: 1.8 },
      { kw: query + ' amazon', vol: 18000, diff: 45, cpc: 2.2 },
    ];
    setResults(mock);
  };
  return (
    <div style={{ padding: 20, maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>🔍 Keyword Research</h1>
      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && search()}
          placeholder="Entrez un mot-clé..."
          style={{ flex: 1, padding: 14, background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 8, color: 'var(--text-primary)' }}
        />
        <button onClick={search} style={{ padding: '14px 28px', background: 'linear-gradient(135deg, #FF9900, #FFB800)', border: 'none', borderRadius: 8, color: '#0D1117', fontWeight: 600, cursor: 'pointer' }}>
          🔍 Rechercher
        </button>
      </div>
      {results.length > 0 && (
        <div style={{ background: 'var(--bg-secondary)', borderRadius: 12, padding: 20 }}>
          <h2 style={{ marginBottom: 16 }}>📊 {results.length} mots-clés trouvés</h2>
          {results.map((r, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 12, padding: 12, background: 'var(--bg-tertiary)', borderRadius: 8, marginBottom: 8 }}>
              <span style={{ fontWeight: 500 }}>{r.kw}</span>
              <span style={{ color: '#00C853' }}>{r.vol.toLocaleString()}</span>
              <span>{r.diff}/100</span>
              <span>{r.cpc}€</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
