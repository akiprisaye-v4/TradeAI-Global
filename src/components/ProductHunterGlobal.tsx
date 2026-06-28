import React, { useState } from "react";

const REGIONS: Record<string, any> = {
  EUROPE: { label: "Europe", countries: ["France", "Allemagne", "Italie", "Espagne", "UK", "Pologne", "Pays-Bas", "Belgique"], marketplaces: ["Amazon", "eBay", "Cdiscount", "Allegro", "OTTO"], risk: 22, demand: 74, logistics: 82 },
  AFRICA: { label: "Afrique", countries: ["Nigeria", "Afrique du Sud", "Kenya", "Ghana", "Côte d’Ivoire", "Sénégal", "Maroc"], marketplaces: ["Jumia", "Takealot", "Konga"], risk: 47, demand: 83, logistics: 52 },
  CARIBBEAN: { label: "Caraïbes / DOM-TOM", countries: ["Guadeloupe", "Martinique", "Guyane", "Réunion", "Mayotte", "Saint-Martin"], marketplaces: ["Amazon", "Leclerc", "Carrefour"], risk: 35, demand: 70, logistics: 58 },
  NORTH_AM: { label: "Amérique du Nord", countries: ["États-Unis", "Canada", "Mexique"], marketplaces: ["Amazon", "Walmart", "eBay"], risk: 25, demand: 88, logistics: 85 },
  SOUTH_AM: { label: "Amérique du Sud", countries: ["Brésil", "Argentine", "Chili", "Colombie"], marketplaces: ["Mercado Libre", "Amazon"], risk: 43, demand: 76, logistics: 60 },
  ASIA: { label: "Asie", countries: ["Chine", "Inde", "Japon", "Corée", "Vietnam", "Thaïlande"], marketplaces: ["Alibaba", "1688", "Shopee", "Lazada"], risk: 33, demand: 86, logistics: 72 },
  MIDDLE_EAST: { label: "Moyen-Orient", countries: ["UAE", "Arabie saoudite", "Qatar", "Koweït"], marketplaces: ["Noon", "Amazon"], risk: 31, demand: 79, logistics: 76 },
  OCEANIA: { label: "Océanie", countries: ["Australie", "Nouvelle-Zélande", "Fidji"], marketplaces: ["Amazon", "eBay", "Catch"], risk: 28, demand: 68, logistics: 63 },
};

const SEEDS = [
  { name: "Kit solaire portable", source: "Alibaba", buy: 12.4, sell: 39.9, category: "Énergie", trend: 91, weight: 1.4 },
  { name: "Powerbank USB-C 20Ah", source: "Alibaba", buy: 8.8, sell: 29.9, category: "Téléphonie", trend: 86, weight: 0.45 },
  { name: "Gourde inox isotherme", source: "1688", buy: 3.2, sell: 19.9, category: "Maison", trend: 74, weight: 0.35 },
  { name: "Lampe solaire extérieur", source: "Alibaba", buy: 5.5, sell: 24.9, category: "Maison", trend: 88, weight: 0.7 },
  { name: "Organisateur voiture", source: "Temu", buy: 4.1, sell: 18.9, category: "Auto", trend: 69, weight: 0.55 },
  { name: "Mini pompe irrigation", source: "Alibaba", buy: 18.5, sell: 69.9, category: "Agriculture", trend: 84, weight: 2.2 },
];

export default function ProductHunterGlobal() {
  const [region, setRegion] = useState("CARIBBEAN");
  const [budget, setBudget] = useState(5000);
  const [minMargin, setMinMargin] = useState(30);
  const r = REGIONS[region];
  const filtered = SEEDS.map(s => {
    const margin = ((s.sell - s.buy) / s.sell) * 100;
    const units = Math.floor(budget / s.buy);
    const profit = (s.sell - s.buy) * units;
    const score = Math.min(100, Math.round(margin * 0.4 + (profit / 100) * 0.3 + (s.trend / 100) * 30));
    return { ...s, margin, units, profit, score };
  }).filter(s => s.margin >= minMargin).sort((a, b) => b.score - a.score);

  return (
    <div className="product-hunter-global">
      <h2>🌍 Product Hunter Global</h2>
      <p className="subtitle">Opportunités par continent</p>
      <div className="dashboard-grid">
        <div className="dashboard-form">
          <label>Région</label>
          <select value={region} onChange={e => setRegion(e.target.value)}>{Object.entries(REGIONS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}</select>
          <label>Budget: {budget} €</label>
          <input type="range" min="500" max="20000" step="500" value={budget} onChange={e => setBudget(Number(e.target.value))} />
          <label>Marge min: {minMargin}%</label>
          <input type="range" min="10" max="80" value={minMargin} onChange={e => setMinMargin(Number(e.target.value))} />
          <div className="kpi-grid" style={{ marginTop: 16 }}>
            <div className="kpi-card"><div className="kpi-label">Risque</div><div className="kpi-value" style={{ color: r.risk > 40 ? '#ef4444' : '#22c55e' }}>{r.risk}%</div></div>
            <div className="kpi-card"><div className="kpi-label">Demande</div><div className="kpi-value" style={{ color: '#3b82f6' }}>{r.demand}%</div></div>
            <div className="kpi-card"><div className="kpi-label">Logistique</div><div className="kpi-value" style={{ color: '#a855f7' }}>{r.logistics}%</div></div>
          </div>
          <div className="notice gn" style={{ marginTop: 12 }}>
            <b>Pays :</b> {r.countries.join(", ")}<br/>
            <b>Marketplaces :</b> {r.marketplaces.join(", ")}
          </div>
        </div>
        <div>
          <div className="comp-grid">
            {filtered.map((s, i) => (
              <div key={s.name} className="comp-card" style={{ borderTop: i === 0 ? '4px solid #22c55e' : '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <h4>{s.name}</h4>
                  <span className="badge" style={{ background: s.source === 'Alibaba' ? '#FF9900' : s.source === '1688' ? '#ef4444' : '#3b82f6' }}>{s.source}</span>
                </div>
                <div className="comp-metric"><span>Achat</span><strong>{s.buy.toFixed(2)} €</strong></div>
                <div className="comp-metric"><span>Vente</span><strong>{s.sell.toFixed(2)} €</strong></div>
                <div className="comp-metric"><span>Marge</span><strong style={{ color: s.margin >= 50 ? '#22c55e' : '#f59e0b' }}>{s.margin.toFixed(1)}%</strong></div>
                <div className="comp-metric"><span>Unités</span><strong>{s.units}</strong></div>
                <div className="comp-metric"><span>Profit estimé</span><strong style={{ color: '#22c55e' }}>{s.profit.toFixed(0)} €</strong></div>
                <div className="comp-metric" style={{ borderTop: '2px solid rgba(255,153,0,0.3)', marginTop: 8, paddingTop: 12 }}>
                  <span>Score TradeAI</span><strong style={{ color: '#FF9900', fontSize: '18px' }}>{s.score}/100</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
