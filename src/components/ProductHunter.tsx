import React, { useState, useMemo } from 'react';
import { products, categories, demands, difficulties } from '../data/products';
import { Product, FilterState } from '../types';
import { formatCurrency } from '../utils/calculations';

const ProductHunter: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    category: 'Tous',
    minMargin: 0,
    minGrowth: 0,
    demand: 'Tous',
    difficulty: 'Tous',
    search: '',
  });

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchCategory = filters.category === 'Tous' || p.category === filters.category;
      const matchMargin = p.margin >= filters.minMargin;
      const matchGrowth = p.growth >= filters.minGrowth;
      const matchDemand = filters.demand === 'Tous' || p.demand === filters.demand;
      const matchDifficulty = filters.difficulty === 'Tous' || p.difficulty === filters.difficulty;
      const matchSearch = p.name.toLowerCase().includes(filters.search.toLowerCase()) || 
                         p.tags.some(t => t.toLowerCase().includes(filters.search.toLowerCase()));
      return matchCategory && matchMargin && matchGrowth && matchDemand && matchDifficulty && matchSearch;
    });
  }, [filters]);

  const exportToCSV = () => {
    const headers = ['Nom', 'Catégorie', 'Prix Amazon', 'Prix Alibaba', 'Marge %', 'Croissance %', 'Profit', 'Demande', 'Difficulté'];
    const rows = filteredProducts.map(p => [
      `"${p.name}"`, p.category, p.amazonPrice.toFixed(2), p.alibabaPrice.toFixed(2),
      p.margin.toString(), p.growth.toString(), p.profit.toFixed(2), p.demand, p.difficulty
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tradeai-produits-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="product-hunter">
      <div className="hunter-header">
        <h2>🎯 Product Hunter v2</h2>
        <button onClick={exportToCSV} className="btn-export" disabled={filteredProducts.length === 0}>
          📤 Exporter CSV ({filteredProducts.length})
        </button>
      </div>
      <div className="filters-bar">
        <input type="text" placeholder="🔍 Rechercher un produit..." value={filters.search} onChange={e => updateFilter('search', e.target.value)} className="filter-search" />
        <select value={filters.category} onChange={e => updateFilter('category', e.target.value)}>
          <option value="Tous">Toutes catégories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={filters.demand} onChange={e => updateFilter('demand', e.target.value)}>
          <option value="Tous">Toutes demandes</option>
          {demands.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={filters.difficulty} onChange={e => updateFilter('difficulty', e.target.value)}>
          <option value="Tous">Toutes difficultés</option>
          {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <div className="range-filter">
          <label>Marge min: {filters.minMargin}%</label>
          <input type="range" min="0" max="100" value={filters.minMargin} onChange={e => updateFilter('minMargin', Number(e.target.value))} />
        </div>
        <div className="range-filter">
          <label>Croissance min: {filters.minGrowth}%</label>
          <input type="range" min="0" max="100" value={filters.minGrowth} onChange={e => updateFilter('minGrowth', Number(e.target.value))} />
        </div>
      </div>
      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <div className="no-results">Aucun produit ne correspond à vos critères</div>
        ) : (
          filteredProducts.map(product => <ProductCard key={product.id} product={product} />)
        )}
      </div>
    </div>
  );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="product-card">
      <div className="product-image">
        <div className="product-category">{product.category}</div>
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <div className="product-tags">
          {product.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
        <div className="product-metrics">
          <div className="metric">
            <span className="metric-label">Marge</span>
            <span className="metric-value highlight">{product.margin}%</span>
          </div>
          <div className="metric">
            <span className="metric-label">Croissance</span>
            <span className="metric-value">+{product.growth}%</span>
          </div>
          <div className="metric">
            <span className="metric-label">Profit</span>
            <span className="metric-value">{formatCurrency(product.profit)}</span>
          </div>
        </div>
        <div className="product-prices">
          <span className="price-amazon">{formatCurrency(product.amazonPrice)}</span>
          <span className="price-alibaba">{formatCurrency(product.alibabaPrice)}</span>
        </div>
        <div className="product-meta">
          <span className={`demand ${product.demand.toLowerCase().replace(' ', '-')}`}>{product.demand}</span>
          <span className={`difficulty ${product.difficulty.toLowerCase()}`}>{product.difficulty}</span>
        </div>
        <button className="btn-expand" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Réduire' : 'Détails'}
        </button>
        {expanded && (
          <div className="product-details">
            <p>Prix Amazon: {formatCurrency(product.amazonPrice)}</p>
            <p>Prix Alibaba: {formatCurrency(product.alibabaPrice)}</p>
            <p>Frais de port: {formatCurrency(product.shippingPrice)}</p>
            <p>Profit net: {formatCurrency(product.profit)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductHunter;
