import React, { useState } from 'react';
import { products } from '../data/products';
import { territories } from '../data/territories';
import { calculateLandedCost } from '../utils/calculations';
import { formatCurrency } from '../utils/currency';
import { CurrencyCode } from '../utils/currency';
const PricingStrategique: React.FC<{ currency?: CurrencyCode }> = ({ currency = 'EUR' }) => {
  const [pid, setPid] = useState(products[0].id);
  const [comp, setComp] = useState([0, 0, 0, 0, 0]);
  const product = products.find(p => p.id === pid) || products[0];
  const calc = calculateLandedCost(product, territories[0]);
  const valid = comp.filter(c => c > 0);
  const avg = valid.length > 0 ? valid.reduce((a, b) => a + b, 0) / valid.length : null;
  const min = valid.length > 0 ? Math.min(...valid) : null;
  const pos = avg ? ((product.amazonPrice - avg) / avg) * 100 : null;
  const strategies = [
    { label: 'Pénétration', desc: 'Prix bas pour gagner des parts', price: calc.landedCost * 1.05 },
    { label: 'Compétitif', desc: "S'aligner sur la moyenne", price: avg || product.amazonPrice },
    { label: 'Premium', desc: 'Prix élevé, qualité', price: product.amazonPrice * 1.25 },
    { label: 'Ancrage', desc: 'Prix de référence élevé', price: product.amazonPrice * 1.4 },
  ];
  return (
    <div className="pricing-strategique">
      <h2>💲 Pricing Stratégique</h2>
      <p className="subtitle">Analyse concurrentielle & stratégies de prix</p>
      <div className="dashboard-form">
        <label>Produit</label>
        <select value={pid} onChange={e => setPid(e.target.value)}>{products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select>
        <label>Prix concurrents BSR (top 5)</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
          {comp.map((c, i) => <input key={i} type="number" placeholder={`C${i + 1}`} value={c || ''} onChange={e => { const n = [...comp]; n[i] = Number(e.target.value); setComp(n); }} style={{ padding: 10, borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(15,23,42,0.6)', color: '#f1f5f9' }} />)}
        </div>
        {avg !== null && (
          <div className="kpi-grid" style={{ marginTop: 12 }}>
            <div className="kpi-card"><div className="kpi-label">Prix moyen</div><div className="kpi-value">{formatCurrency(avg, currency)}</div></div>
            <div className="kpi-card"><div className="kpi-label">Prix min</div><div className="kpi-value">{formatCurrency(min!, currency)}</div></div>
            <div className="kpi-card"><div className="kpi-label">Votre position</div><div className="kpi-value" style={{ color: pos! > 10 ? '#f59e0b' : '#22c55e' }}>{pos!.toFixed(0)}%</div></div>
          </div>
        )}
      </div>
      <h3 style={{ margin: '24px 0 12px', fontSize: 16 }}>📐 Stratégies</h3>
      <div className="comp-grid">
        {strategies.map(s => {
          const c = calculateLandedCost({ ...product, amazonPrice: s.price }, territories[0]);
          return (
            <div key={s.label} className="comp-card">
              <h4>{s.label}</h4>
              <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 8 }}>{s.desc}</p>
              <div className="comp-metric"><span>Prix</span><strong>{formatCurrency(s.price, currency)}</strong></div>
              <div className="comp-metric"><span>Marge</span><strong style={{ color: c.margin >= 0 ? '#22c55e' : '#ef4444' }}>{c.margin.toFixed(1)}%</strong></div>
            </div>
          );
        })}
      </div>
      <h3 style={{ margin: '24px 0 12px', fontSize: 16 }}>🥊 Simulateur guerre des prix</h3>
      <div className="comp-grid">
        {[0, -5, -10, -15, -20, -25].map(delta => {
          const test = product.amazonPrice * (1 + delta / 100);
          const c = calculateLandedCost({ ...product, amazonPrice: test }, territories[0]);
          return (
            <div key={delta} className="comp-card" style={{ border: delta === 0 ? '1px solid rgba(255,153,0,0.4)' : undefined }}>
              <h4>{delta === 0 ? 'Actuel' : `${delta}%`}</h4>
              <div className="comp-metric"><span>Prix</span><strong>{formatCurrency(test, currency)}</strong></div>
              <div className="comp-metric"><span>Profit</span><strong style={{ color: c.profit >= 0 ? '#22c55e' : '#ef4444' }}>{formatCurrency(c.profit, currency)}</strong></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default PricingStrategique;