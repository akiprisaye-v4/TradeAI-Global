import React, { useState, useMemo } from 'react';
import { products } from '../data/products';
import { territories } from '../data/territories';
import { marketplaces } from '../data/marketplaces';
import { calculateLandedCostTerritory, calculateLandedCostMarketplace, formatCurrency, formatPercent } from '../utils/calculations';

const Dashboard: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>(products[0].id);
  const [calculationMode, setCalculationMode] = useState<'marketplace' | 'territory'>('marketplace');
  const [selectedMarketplace, setSelectedMarketplace] = useState<string>(marketplaces[0].id);
  const [selectedTerritory, setSelectedTerritory] = useState<string>(territories[0].id);
  const [quantity, setQuantity] = useState<number>(1);
  const [sellingPrice, setSellingPrice] = useState<number>(0);

  const product = useMemo(() => products.find(p => p.id === selectedProduct) || products[0], [selectedProduct]);
  
  const calc = useMemo(() => {
    const sp = sellingPrice > 0 ? sellingPrice : product.amazonPrice;
    if (calculationMode === 'marketplace') {
      const marketplace = marketplaces.find(m => m.id === selectedMarketplace) || marketplaces[0];
      return calculateLandedCostMarketplace(product, marketplace, {
        factoryPrice: product.alibabaPrice,
        shippingPrice: product.shippingPrice,
        sellingPrice: sp,
        quantity,
      });
    } else {
      const territory = territories.find(t => t.id === selectedTerritory) || territories[0];
      return calculateLandedCostTerritory(product, territory, {
        factoryPrice: product.alibabaPrice,
        shippingPrice: product.shippingPrice,
        sellingPrice: sp,
        quantity,
      });
    }
  }, [product, calculationMode, selectedMarketplace, selectedTerritory, quantity, sellingPrice]);

  const profitabilityScore = useMemo(() => {
    const marginScore = Math.min(calc.margin, 100);
    const profitScore = Math.min((calc.profit / 100) * 10, 100);
    const demandScore = product.demand === 'Très élevée' ? 100 : product.demand === 'Élevée' ? 75 : product.demand === 'Moyenne' ? 50 : 25;
    const difficultyScore = product.difficulty === 'Facile' ? 100 : product.difficulty === 'Moyen' ? 60 : 30;
    return Math.round((marginScore * 0.4 + profitScore * 0.3 + demandScore * 0.15 + difficultyScore * 0.15));
  }, [calc, product]);

  const scoreColor = profitabilityScore >= 80 ? '#22c55e' : profitabilityScore >= 60 ? '#f59e0b' : '#ef4444';
  const destinationName = calculationMode === 'marketplace' 
    ? marketplaces.find(m => m.id === selectedMarketplace)?.name 
    : territories.find(t => t.id === selectedTerritory)?.name;

  return (
    <div className="dashboard">
      <h2>📊 Dashboard</h2>
      
      <div className="dashboard-grid">
        <div className="dashboard-form">
          <label>Produit</label>
          <select value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)}>
            {products.map(p => <option key={p.id} value={p.id}>{p.name} — {p.margin}% marge</option>)}
          </select>

          <label>Mode de calcul</label>
          <select value={calculationMode} onChange={e => setCalculationMode(e.target.value as 'marketplace' | 'territory')}>
            <option value="marketplace">🌍 Marketplace Mondiale</option>
            <option value="territory">🏝️ Territoire DOM-TOM</option>
          </select>

          {calculationMode === 'marketplace' ? (
            <>
              <label>Marketplace</label>
              <select value={selectedMarketplace} onChange={e => setSelectedMarketplace(e.target.value)}>
                {marketplaces.map(m => <option key={m.id} value={m.id}>{m.flag} {m.name} ({m.country})</option>)}
              </select>
            </>
          ) : (
            <>
              <label>Territoire DOM-TOM</label>
              <select value={selectedTerritory} onChange={e => setSelectedTerritory(e.target.value)}>
                {territories.map(t => <option key={t.id} value={t.id}>{t.name} ({t.code})</option>)}
              </select>
            </>
          )}

          <label>Quantité</label>
          <input type="number" min="1" value={quantity} onChange={e => setQuantity(Math.max(1, Number(e.target.value)))} />

          <label>Prix de vente (0 = prix Amazon)</label>
          <input type="number" min="0" step="0.01" value={sellingPrice || ''} onChange={e => setSellingPrice(Number(e.target.value))} placeholder={product.amazonPrice.toFixed(2)} />
        </div>

        <div className="dashboard-results">
          <div className="score-card" style={{ background: `linear-gradient(135deg, ${scoreColor}25 0%, ${scoreColor}15 100%)`, borderColor: `${scoreColor}40` }}>
            <div>
              <div className="score-label">Score de rentabilité</div>
              <div className="score-subtitle">{product.name} → {destinationName}</div>
            </div>
            <div className="score-value">
              <div style={{ color: scoreColor, textShadow: `0 0 30px ${scoreColor}80` }}>{profitabilityScore}</div>
              <div className="score-max">/ 100</div>
            </div>
          </div>

          <div className="kpi-grid">
            <div className="kpi-card"><div className="kpi-label">Profit net</div><div className="kpi-value" style={{ color: '#3b82f6' }}>{formatCurrency(calc.profit)}</div></div>
            <div className="kpi-card"><div className="kpi-label">Marge</div><div className="kpi-value" style={{ color: '#22c55e' }}>{formatPercent(calc.margin)}</div></div>
            <div className="kpi-card"><div className="kpi-label">Coût rendu</div><div className="kpi-value" style={{ color: '#a855f7' }}>{formatCurrency(calc.landedCost)}</div></div>
            <div className="kpi-card"><div className="kpi-label">Seuil rentabilité</div><div className="kpi-value" style={{ color: '#f59e0b' }}>{formatCurrency(calc.breakEven)}</div></div>
          </div>

          <div className="breakdown">
            <h3>📋 Détail du calcul</h3>
            <div className="breakdown-row"><span>Prix d'achat (Alibaba × {quantity})</span><span>{formatCurrency(product.alibabaPrice * quantity)}</span></div>
            <div className="breakdown-row"><span>Frais de port × {quantity}</span><span>{formatCurrency(product.shippingPrice * quantity)}</span></div>
            <div className="breakdown-row"><span>CIF</span><span>{formatCurrency(calc.cif)}</span></div>
            
            {calculationMode === 'marketplace' ? (
              <>
                <div className="breakdown-row"><span>Commission Amazon ({calc.marketplace?.referralFee}%)</span><span>{formatCurrency(calc.referralFee || 0)}</span></div>
                {(calc.marketplace?.vatRate || 0) > 0 && <div className="breakdown-row"><span>TVA ({calc.marketplace?.vatRate}%)</span><span>{formatCurrency(calc.vat || 0)}</span></div>}
              </>
            ) : (
              <>
                <div className="breakdown-row"><span>Octroi de Mer ({calc.territory?.octroiDeMer}%)</span><span>{formatCurrency(calc.octroiDeMer || 0)}</span></div>
                <div className="breakdown-row"><span>Taxe Régionale ({calc.territory?.taxeRegionale}%)</span><span>{formatCurrency(calc.taxeRegionale || 0)}</span></div>
                <div className="breakdown-row"><span>TVA ({calc.territory?.tva}%)</span><span>{formatCurrency(calc.tva || 0)}</span></div>
              </>
            )}
            
            <div className="breakdown-row total"><span>Total taxes</span><span>{formatCurrency(calc.totalTaxes)}</span></div>
            <div className="breakdown-row total"><span>Coût rendu total</span><span>{formatCurrency(calc.landedCost)}</span></div>
            <div className="breakdown-row total"><span>Prix de vente</span><span>{formatCurrency(calc.sellingPrice || product.amazonPrice)}</span></div>
            <div className="breakdown-row total"><span>Profit net</span><span style={{ color: '#22c55e' }}>{formatCurrency(calc.profit)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
