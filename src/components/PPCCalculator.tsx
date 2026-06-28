import React, { useState, useMemo } from 'react';
import { products } from '../data/products';
import { territories } from '../data/territories';
import { calculateLandedCost } from '../utils/calculations';
import { formatCurrency } from '../utils/currency';
import { CurrencyCode } from '../utils/currency';
const PPCCalculator: React.FC<{ currency?: CurrencyCode }> = ({ currency = 'EUR' }) => {
  const [pid, setPid] = useState(products[0].id);
  const [ads, setAds] = useState(1.5);
  const [conv, setConv] = useState(10);
  const product = products.find(p => p.id === pid) || products[0];
  const territory = territories[0];
  const calc = useMemo(() => calculateLandedCost(product, territory), [product, territory]);
  const priceHT = calc.sellingPrice || product.amazonPrice;
  const acos = ads > 0 ? (ads / priceHT) * 100 : 0;
  const acosBE = priceHT > 0 ? ((priceHT - product.alibabaPrice - product.shippingPrice - (priceHT * 0.15) - 4.5) / priceHT) * 100 : 0;
  const roas = acos > 0 ? 100 / acos : 0;
  const tacos = (priceHT * 100) > 0 ? (ads * 100 / (priceHT * 100)) * 100 : 0;
  const maxCpc = (priceHT * (Math.max(0, acosBE) * 0.8 / 100)) / Math.max(1, conv) * 100;
  return (
    <div className="ppc-calculator">
      <h2>📣 PPC & ROAS</h2>
      <p className="subtitle">Rentabilité publicitaire Amazon</p>
      <div className="dashboard-grid">
        <div className="dashboard-form">
          <label>Produit</label>
          <select value={pid} onChange={e => setPid(e.target.value)}>{products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select>
          <label>PPC par unité vendue (€)</label>
          <input type="number" min="0" step="0.1" value={ads} onChange={e => setAds(Number(e.target.value))} />
          <label>Taux conversion clic→achat (%)</label>
          <input type="number" min="1" step="0.5" value={conv} onChange={e => setConv(Number(e.target.value))} />
        </div>
        <div className="dashboard-results">
          <div className="kpi-grid">
            <div className="kpi-card"><div className="kpi-label">ACoS</div><div className="kpi-value" style={{ color: acos > acosBE ? '#ef4444' : '#22c55e' }}>{acos.toFixed(1)}%</div></div>
            <div className="kpi-card"><div className="kpi-label">ACoS Break-even</div><div className="kpi-value" style={{ color: '#FF9900' }}>{Math.max(0, acosBE).toFixed(1)}%</div></div>
            <div className="kpi-card"><div className="kpi-label">ROAS</div><div className="kpi-value" style={{ color: roas > 4 ? '#22c55e' : '#f59e0b' }}>{roas.toFixed(2)}x</div></div>
            <div className="kpi-card"><div className="kpi-label">TACoS</div><div className="kpi-value" style={{ color: tacos > 15 ? '#ef4444' : '#22c55e' }}>{tacos.toFixed(1)}%</div></div>
          </div>
          <div className="score-card" style={{ marginTop: 12 }}>
            <div><div className="score-label">CPC max recommandé</div><div className="score-subtitle">Pour rester rentable</div></div>
            <div className="score-value" style={{ color: '#FF9900' }}>{formatCurrency(maxCpc, currency)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PPCCalculator;