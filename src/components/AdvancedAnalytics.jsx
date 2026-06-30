import React from 'react';
import { useAppContext } from '../App';

const fmt = (n, sym = "€") => `${sym}${Math.abs(n).toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

const Originalfunction AdvancedAnalytics() {
  const { products, fxRates } = useAppContext();
  
  const totalRevenue = products.reduce((sum, p) => {
    const price = p.sellingPrice;
    return sum + (price * p.units);
  }, 0);
  
  const totalCosts = products.reduce((sum, p) => {
    return sum + (p.costPrice + p.shippingToAmazon) * p.units;
  }, 0);
  
  const totalProfit = products.reduce((sum, p) => {
    const profit = (p.sellingPrice - p.costPrice - p.shippingToAmazon - p.ads) * p.units;
    return sum + profit;
  }, 0);
  
  const avgOrderValue = totalRevenue / (products.reduce((sum, p) => sum + p.units, 0) || 1);
  
  const profitByMarketplace = {};
  products.forEach(p => {
    const profit = (p.sellingPrice - p.costPrice - p.shippingToAmazon - p.ads) * p.units;
    if (!profitByMarketplace[p.marketplace]) {
      profitByMarketplace[p.marketplace] = 0;
    }
    profitByMarketplace[p.marketplace] += profit;
  });
  
  const topProduct = products.reduce((best, p) => {
    const profit = (p.sellingPrice - p.costPrice - p.shippingToAmazon - p.ads) * p.units;
    const bestProfit = (best.sellingPrice - best.costPrice - best.shippingToAmazon - best.ads) * best.units;
    return profit > bestProfit ? p : best;
  }, products[0]);
  
  return (
    <div>
      <div style={{ background: "#161B22", border: "1px solid #21262D", borderRadius: 11, padding: "16px", marginBottom: 12 }}>
        <div style={{ fontSize: 10, color: "#FF9900", fontWeight: 700, textTransform: "uppercase", marginBottom: 12 }}>📊 Analytics Avancées</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          <div style={{ background: "#1C2128", border: "1px solid #30363D", borderRadius: 9, padding: "12px 14px" }}>
            <div style={{ fontSize: 10, color: "#8B949E", fontWeight: 700, textTransform: "uppercase", marginBottom: 3 }}>Chiffre d'affaires</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#00C853" }}>{fmt(totalRevenue)}</div>
          </div>
          <div style={{ background: "#1C2128", border: "1px solid #30363D", borderRadius: 9, padding: "12px 14px" }}>
            <div style={{ fontSize: 10, color: "#8B949E", fontWeight: 700, textTransform: "uppercase", marginBottom: 3 }}>Profit total</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: totalProfit >= 0 ? "#00C853" : "#FF3D00" }}>{fmt(totalProfit)}</div>
          </div>
          <div style={{ background: "#1C2128", border: "1px solid #30363D", borderRadius: 9, padding: "12px 14px" }}>
            <div style={{ fontSize: 10, color: "#8B949E", fontWeight: 700, textTransform: "uppercase", marginBottom: 3 }}>Panier moyen</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#FFD600" }}>{fmt(avgOrderValue)}</div>
          </div>
          <div style={{ background: "#1C2128", border: "1px solid #30363D", borderRadius: 9, padding: "12px 14px" }}>
            <div style={{ fontSize: 10, color: "#8B949E", fontWeight: 700, textTransform: "uppercase", marginBottom: 3 }}>Meilleur produit</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#FF9900" }}>{topProduct?.name || "-"}</div>
          </div>
        </div>
      </div>
      
      <div style={{ background: "#161B22", border: "1px solid #21262D", borderRadius: 11, padding: "16px" }}>
        <div style={{ fontSize: 10, color: "#FF9900", fontWeight: 700, textTransform: "uppercase", marginBottom: 12 }}>📈 Performance par Marketplace</div>
        {Object.entries(profitByMarketplace).map(([mk, profit]) => {
          const maxProfit = Math.max(...Object.values(profitByMarketplace), 1);
          const percentage = (profit / maxProfit) * 100;
          
          return (
            <div key={mk} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 12 }}>
                <span style={{ fontWeight: 700 }}>{mk}</span>
                <span style={{ color: profit >= 0 ? "#00C853" : "#FF3D00" }}>
                  {fmt(profit)} ({percentage.toFixed(1)}%)
                </span>
              </div>
              <div style={{ height: 8, background: "#1C2128", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ 
                  width: percentage + "%",
                  height: "100%",
                  background: profit >= 0 ? "linear-gradient(90deg, #00C853, #00E676)" : "linear-gradient(90deg, #FF3D00, #FF5252)",
                  borderRadius: 4,
                  transition: "width 0.5s ease"
                }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


export default React.memo(Original);
