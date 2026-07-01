import React from "react";
import { useState, useMemo } from "react";

function AIInsights({ products, fxRates, calcProduct, setToast }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Analyse prédictive simple
  const predictions = useMemo(() => {
    if (!products || products.length === 0) return null;

    const insights = {
      totalPredictedRevenue: 0,
      totalPredictedProfit: 0,
      bestOpportunities: [],
      warnings: [],
      priceOptimizations: [],
    };

    products.forEach(p => {
      const c = calcProduct(p, fxRates);
      
      // Prédiction revenue (basée sur vélocité actuelle + saisonnalité)
      const seasonalityFactor = 1.15; // Croissance estimée
      const predictedUnits = Math.round(p.units * seasonalityFactor);
      const predictedRevenue = predictedUnits * p.sellingPrice;
      const predictedProfit = predictedUnits * c.profit;
      
      insights.totalPredictedRevenue += predictedRevenue;
      insights.totalPredictedProfit += predictedProfit;

      // Opportunités
      if (c.netMargin > 30 && c.roi > 100) {
        insights.bestOpportunities.push({
          product: p.name,
          action: "Augmenter stock",
          reason: `Marge excellente (${c.netMargin.toFixed(1)}%) et ROI élevé (${c.roi.toFixed(0)}%)`,
          impact: "+€" + (predictedProfit * 0.3).toFixed(0) + " potentiels",
        });
      }

      // Optimisations de prix
      const optimalPrice = p.sellingPrice * 1.05; // +5% test
      const testCalc = calcProduct({ ...p, sellingPrice: optimalPrice }, fxRates);
      if (testCalc.monthlyProfit > c.monthlyProfit && testCalc.netMargin > c.netMargin) {
        insights.priceOptimizations.push({
          product: p.name,
          currentPrice: p.sellingPrice,
          suggestedPrice: optimalPrice,
          currentProfit: c.monthlyProfit,
          predictedProfit: testCalc.monthlyProfit,
          gain: testCalc.monthlyProfit - c.monthlyProfit,
        });
      }

      // Alertes
      if (c.profit < 0) {
        insights.warnings.push({
          product: p.name,
          type: "danger",
          message: "Produit en perte",
          suggestion: "Augmenter prix ou réduire coûts",
        });
      } else if (c.netMargin < 15) {
        insights.warnings.push({
          product: p.name,
          type: "warning",
          message: "Marge faible",
          suggestion: `Marge actuelle: ${c.netMargin.toFixed(1)}%. Objectif: 25%+`,
        });
      }
    });

    return insights;
  }, [products, fxRates]);

  if (!predictions || products.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: 40, background: "#161B22", borderRadius: 12 }}>
        <div style={{ fontSize: 40, marginBottom: 10 }}>🤖</div>
        <p style={{ color: "#8B949E" }}>Ajoutez des produits pour voir les insights IA</p>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      {/* Prédictions globales */}
      <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", borderRadius: 12, padding: 20, color: "white" }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, opacity: 0.9 }}>🤖 Prédictions IA (Mois prochain)</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, opacity: 0.8, marginBottom: 4 }}>Chiffre d'affaires prévu</div>
            <div style={{ fontSize: 28, fontWeight: 900 }}>€{predictions.totalPredictedRevenue.toLocaleString("fr-FR", { maximumFractionDigits: 0 })}</div>
            <div style={{ fontSize: 11, opacity: 0.7, marginTop: 4 }}>+15% vs mois actuel</div>
          </div>
          <div>
            <div style={{ fontSize: 11, opacity: 0.8, marginBottom: 4 }}>Profit prévu</div>
            <div style={{ fontSize: 28, fontWeight: 900 }}>€{predictions.totalPredictedProfit.toLocaleString("fr-FR", { maximumFractionDigits: 0 })}</div>
            <div style={{ fontSize: 11, opacity: 0.7, marginTop: 4 }}>Estimation basée sur la vélocité</div>
          </div>
        </div>
      </div>

      {/* Optimisations de prix */}
      {predictions.priceOptimizations.length > 0 && (
        <div style={{ background: "#161B22", border: "1px solid #21262D", borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#FFD600", marginBottom: 12 }}>💡 Optimisations de prix suggérées</div>
          <div style={{ display: "grid", gap: 10 }}>
            {predictions.priceOptimizations.slice(0, 5).map((opt, i) => (
              <div key={i} style={{ padding: "12px 14px", background: "#1C2128", borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#E6EDF3", marginBottom: 4 }}>{opt.product}</div>
                  <div style={{ fontSize: 11, color: "#8B949E" }}>
                    Prix actuel: €{opt.currentPrice} → Prix suggéré: <strong style={{ color: "#00C853" }}>€{opt.suggestedPrice.toFixed(2)}</strong>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#00C853" }}>+€{opt.gain.toFixed(0)}/mois</div>
                  <div style={{ fontSize: 10, color: "#8B949E" }}>Profit: €{opt.predictedProfit.toFixed(0)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Meilleures opportunités */}
      {predictions.bestOpportunities.length > 0 && (
        <div style={{ background: "#161B22", border: "1px solid #21262D", borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#00C853", marginBottom: 12 }}>🚀 Meilleures opportunités</div>
          <div style={{ display: "grid", gap: 10 }}>
            {predictions.bestOpportunities.slice(0, 5).map((opp, i) => (
              <div key={i} style={{ padding: "12px 14px", background: "#00C85310", border: "1px solid #00C85333", borderLeft: "3px solid #00C853", borderRadius: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#E6EDF3", marginBottom: 4 }}>{opp.product}</div>
                <div style={{ fontSize: 11, color: "#8B949E", marginBottom: 4 }}>{opp.reason}</div>
                <div style={{ fontSize: 11, color: "#00C853", fontWeight: 700 }}>{opp.impact}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Alertes */}
      {predictions.warnings.length > 0 && (
        <div style={{ background: "#161B22", border: "1px solid #21262D", borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#FF9900", marginBottom: 12 }}>⚠️ Alertes et recommandations</div>
          <div style={{ display: "grid", gap: 10 }}>
            {predictions.warnings.slice(0, 5).map((warn, i) => (
              <div key={i} style={{ padding: "12px 14px", background: warn.type === "danger" ? "#FF3D0010" : "#FF990010", border: `1px solid ${warn.type === "danger" ? "#FF3D0040" : "#FF990040"}`, borderLeft: `3px solid ${warn.type === "danger" ? "#FF3D00" : "#FF9900"}`, borderRadius: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#E6EDF3", marginBottom: 4 }}>{warn.product}</div>
                <div style={{ fontSize: 11, color: warn.type === "danger" ? "#FF3D00" : "#FF9900", marginBottom: 4 }}>{warn.message}</div>
                <div style={{ fontSize: 11, color: "#8B949E" }}>{warn.suggestion}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(AIInsights);
