import React, { useState } from 'react';
import { products } from '../data/products';
import { formatCurrency } from '../utils/calculations';

// ===== 1. CASH-FLOW MULTI-PRODUITS =====
export const MultiProductCashFlow: React.FC = () => {
  const totalInvestment = products.reduce((sum, p) => 
    sum + (p.alibabaPrice + p.shippingPrice) * 10, 0
  );
  const totalMonthlyProfit = products.reduce((sum, p) => sum + p.profit, 0);
  const breakEvenMonth = totalInvestment > 0 && totalMonthlyProfit > 0 
    ? Math.ceil(totalInvestment / totalMonthlyProfit) : 0;

  return (
    <div style={{ 
      marginTop: '32px', padding: '24px', 
      background: 'rgba(255,255,255,0.05)', 
      borderRadius: '16px', 
      border: '1px solid rgba(255,255,255,0.1)' 
    }}>
      <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: 700 }}>
        💰 Cash-Flow Consolidé ({products.length} produits)
      </h3>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '16px', marginBottom: '24px' 
      }}>
        <div style={{ 
          padding: '16px', 
          background: 'rgba(59,130,246,0.15)', 
          borderRadius: '12px', 
          border: '1px solid rgba(59,130,246,0.3)' 
        }}>
          <div style={{ fontSize: '12px', color: '#93c5fd', marginBottom: '8px' }}>
            Mise de fonds totale
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#3b82f6' }}>
            {formatCurrency(totalInvestment)}
          </div>
        </div>
        <div style={{ 
          padding: '16px', 
          background: 'rgba(34,197,94,0.15)', 
          borderRadius: '12px', 
          border: '1px solid rgba(34,197,94,0.3)' 
        }}>
          <div style={{ fontSize: '12px', color: '#86efac', marginBottom: '8px' }}>
            Profit mensuel total
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#22c55e' }}>
            {formatCurrency(totalMonthlyProfit)}
          </div>
        </div>
        <div style={{ 
          padding: '16px', 
          background: 'rgba(245,158,11,0.15)', 
          borderRadius: '12px', 
          border: '1px solid rgba(245,158,11,0.3)' 
        }}>
          <div style={{ fontSize: '12px', color: '#fcd34d', marginBottom: '8px' }}>
            Break-even
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#f59e0b' }}>
            {breakEvenMonth} mois
          </div>
        </div>
      </div>
    </div>
  );
};

// ===== 2. EXPORT EXCEL PORTFOLIO =====
export const ExportExcelButton: React.FC = () => {
  const exportToExcel = () => {
    const BOM = '\uFEFF';
    const headers = ['Nom', 'Catégorie', 'Prix Amazon', 'Prix Alibaba', 'Marge %', 'Profit'];
    const rows = products.map(p => [
      `"${p.name}"`, p.category, p.amazonPrice.toFixed(2), 
      p.alibabaPrice.toFixed(2), p.margin.toString(), p.profit.toFixed(2)
    ]);
    const csv = BOM + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-${new Date().toISOString().split('T')[0]}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button 
      onClick={exportToExcel}
      style={{ 
        padding: '12px 24px', 
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
        color: 'white', 
        border: 'none', 
        borderRadius: '12px', 
        fontWeight: 700, 
        cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)'
      }}
    >
      📊 Export Excel ({products.length} produits)
    </button>
  );
};

// ===== 3. ALERTE RÉAPPROVISIONNEMENT =====
export const RestockAlert: React.FC<{ stock: number; velocity: number; leadDays: number }> = ({ 
  stock, velocity, leadDays 
}) => {
  const daysOfStock = velocity > 0 ? (stock / velocity) * 30 : 999;
  const reorderPoint = leadDays;
  const criticalPoint = leadDays * 0.5;
  
  let alertLevel = 'ok';
  let alertMessage = '';
  let alertColor = '#22c55e';
  
  if (daysOfStock <= criticalPoint) {
    alertLevel = 'critical';
    alertMessage = `🚨 Rupture imminente ! Stock restant: ${Math.round(daysOfStock)} jours`;
    alertColor = '#ef4444';
  } else if (daysOfStock <= reorderPoint) {
    alertLevel = 'warning';
    alertMessage = `⚠️ Commander maintenant ! Stock: ${Math.round(daysOfStock)} jours`;
    alertColor = '#f59e0b';
  } else {
    return null;
  }
  
  return (
    <div style={{ 
      marginTop: '16px', padding: '16px', 
      background: `linear-gradient(135deg, ${alertColor}25 0%, ${alertColor}15 100%)`, 
      border: `2px solid ${alertColor}`, 
      borderRadius: '12px' 
    }}>
      <div style={{ fontSize: '15px', fontWeight: 700, color: alertColor, marginBottom: '8px' }}>
        {alertMessage}
      </div>
    </div>
  );
};

// ===== 4. GRAPHIQUE A/B PRIX =====
export const PriceComparisonChart: React.FC = () => {
  const basePrice = products[0].amazonPrice;
  const prices = Array.from({ length: 50 }, (_, i) => basePrice * (0.5 + i * 0.02));
  const maxProfit = Math.max(...prices.map(p => p * 0.3));
  
  return (
    <div style={{ 
      marginTop: '20px', padding: '20px', 
      background: 'rgba(255,255,255,0.05)', 
      borderRadius: '12px' 
    }}>
      <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>
        📈 Comparaison A/B des prix (50 points)
      </div>
      <div style={{ 
        display: 'flex', alignItems: 'flex-end', 
        gap: '2px', height: '150px', marginBottom: '12px' 
      }}>
        {prices.map((price, i) => {
          const profit = price * 0.3;
          const height = (profit / maxProfit) * 100;
          const isCurrent = Math.abs(price - basePrice) < basePrice * 0.02;
          
          return (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div 
                style={{ 
                  width: '100%', height: `${height}%`, 
                  background: isCurrent 
                    ? 'linear-gradient(180deg, #f59e0b, #d97706)' 
                    : profit >= 0 
                      ? 'linear-gradient(180deg, #3b82f6, #2563eb)' 
                      : 'linear-gradient(180deg, #ef4444, #dc2626)',
                  border: isCurrent ? '2px solid #fbbf24' : 'none',
                  borderRadius: '2px 2px 0 0'
                }}
              />
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8' }}>
        <span>Prix min: {formatCurrency(prices[0])}</span>
        <span style={{ color: '#f59e0b', fontWeight: 700 }}>
          Prix actuel: {formatCurrency(basePrice)}
        </span>
        <span>Prix max: {formatCurrency(prices[49])}</span>
      </div>
    </div>
  );
};

// ===== 5. VALIDATION INPUT =====
export const ValidatedInput: React.FC<{
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}> = ({ label, value, onChange, min = 0, max = 999999 }) => {
  const [error, setError] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value) || 0;
    if (val < min) {
      setError(`Minimum: ${min}`);
      onChange(min);
    } else if (val > max) {
      setError(`Maximum: ${max}`);
      onChange(max);
    } else {
      setError('');
      onChange(val);
    }
  };
  
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ 
        display: 'block', fontSize: '12px', 
        fontWeight: 600, color: '#94a3b8', 
        marginBottom: '6px', textTransform: 'uppercase' 
      }}>
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        style={{ 
          width: '100%', padding: '12px', 
          background: 'rgba(15,23,42,0.6)', 
          border: error ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px', color: '#f8fafc', fontSize: '14px'
        }}
      />
      {error && <div style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px' }}>{error}</div>}
    </div>
  );
};
