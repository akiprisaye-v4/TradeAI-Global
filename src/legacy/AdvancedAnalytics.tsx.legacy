import React from 'react';
import { useAppContext } from '../App';
import { fmt, fmtPct } from '../utils/calculations';

export const AdvancedAnalytics: React.FC = () => {
  const { products, fxRates } = useAppContext();
  
  // Calculs avancés
  const totalRevenue = products.reduce((sum, p) => {
    const calc = calcProduct(p, fxRates);
    return sum + (calc.profit * p.units);
  }, 0);
  
  const totalCosts = products.reduce((sum, p) => {
    return sum + (p.costPrice + p.shippingToAmazon) * p.units;
  }, 0);
  
  const avgOrderValue = totalRevenue / (products.reduce((sum, p) => sum + p.units, 0) || 1);
  
  const profitByMarketplace = {};
  products.forEach(p => {
    const calc = calcProduct(p, fxRates);
    if (!profitByMarketplace[p.marketplace]) {
      profitByMarketplace[p.marketplace] = 0;
    }
    profitByMarketplace[p.marketplace] += calc.monthlyProfit;
  });
  
  const topPerformingProduct = products.reduce((best, p) => {
    const calc = calcProduct(p, fxRates);
    const bestCalc = calcProduct(best, fxRates);
    return calc.monthlyProfit > bestCalc.monthlyProfit ? p : best;
  }, products[0]);
  
  return (
    <div>
      <Section title="📊 Analytics Avancées">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 20 }}>
          <StatCard 
            label="Chiffre d'affaires mensuel" 
            value={fmt(totalRevenue)} 
            color="#00C853" 
          />
          <StatCard 
            label="Coûts totaux" 
            value={fmt(totalCosts)} 
            color="#FF3D00" 
          />
          <StatCard 
            label="Panier moyen" 
            value={fmt(avgOrderValue)} 
            color="#FFD600" 
          />
          <StatCard 
            label="Meilleur produit" 
            value={topPerformingProduct?.name || "-"} 
            color="#FF9900"
            sub={fmt(calcProduct(topPerformingProduct, fxRates).monthlyProfit) + "/mois"}
          />
        </div>
      </Section>
      
      <Section title="📈 Performance par Marketplace">
        {Object.entries(profitByMarketplace).map(([mk, profit]) => {
          const maxProfit = Math.max(...Object.values(profitByMarketplace));
          const percentage = (profit / maxProfit) * 100;
          
          return (
            <div key={mk} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 12 }}>
                <span style={{ fontWeight: 700 }}>{MARKETPLACES[mk]?.label || mk}</span>
                <span style={{ color: profit >= 0 ? "#00C853" : "#FF3D00" }}>
                  {fmt(profit)} ({percentage.toFixed(1)}%)
                </span>
              </div>
              <div style={{ 
                height: 8, 
                background: "#1C2128", 
                borderRadius: 4, 
                overflow: "hidden" 
              }}>
                <div style={{ 
                  width: percentage + "%",
                  height: "100%",
                  background: profit >= 0 
                    ? "linear-gradient(90deg, #00C853, #00E676)" 
                    : "linear-gradient(90deg, #FF3D00, #FF5252)",
                  borderRadius: 4,
                  transition: "width 0.5s ease"
                }} />
              </div>
            </div>
          );
        })}
      </Section>
      
      <Section title="🎯 KPIs Avancés">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
          <div style={{ 
            padding: 16, 
            background: "rgba(0,200,83,0.1)", 
            border: "1px solid #00C85333",
            borderRadius: 12 
          }}>
            <div style={{ fontSize: 11, color: "#8B949E", marginBottom: 8 }}>Taux de conversion estimé</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#00C853" }}>
              {(products.reduce((sum, p) => sum + (p.ppcConvRate || 10), 0) / products.length).toFixed(1)}%
            </div>
            <div style={{ fontSize: 11, color: "#00C853", marginTop: 4 }}>Moyenne secteur: 8-12%</div>
          </div>
          
          <div style={{ 
            padding: 16, 
            background: "rgba(255,153,0,0.1)", 
            border: "1px solid #FF990033",
            borderRadius: 12 
          }}>
            <div style={{ fontSize: 11, color: "#8B949E", marginBottom: 8 }}>Rotation des stocks</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#FF9900" }}>
              {(products.reduce((sum, p) => sum + (p.units / Math.max(p.initialOrderUnits, 1)), 0) / products.length * 100).toFixed(1)}%
            </div>
            <div style={{ fontSize: 11, color: "#FF9900", marginTop: 4 }}>Par mois</div>
          </div>
          
          <div style={{ 
            padding: 16, 
            background: "rgba(59,130,246,0.1)", 
            border: "1px solid #3B82F633",
            borderRadius: 12 
          }}>
            <div style={{ fontSize: 11, color: "#8B949E", marginBottom: 8 }}>ACoS moyen</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#3B82F6" }}>
              {(products.reduce((sum, p) => sum + ((p.ads * p.units) / (p.sellingPrice * p.units) * 100), 0) / products.length).toFixed(1)}%
            </div>
            <div style={{ fontSize: 11, color: "#3B82F6", marginTop: 4 }}>Cible: <15%</div>
          </div>
        </div>
      </Section>
    </div>
  );
};
