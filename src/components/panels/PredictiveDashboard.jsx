import React from "react";

export default function PredictiveDashboard({ predictions = [], fmt }) {
  const signalColor = {
    growth: "#00C853",
    watch: "#FF9800",
    danger: "#FF3D00"
  };

  const riskLabel = {
    safe: "✅ Stock sécurisé",
    warning: "⚠️ Risque modéré",
    critical: "🚨 Risque critique"
  };

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={{ background: "#1C2128", padding: 16, borderRadius: 10, border: "1px solid #30363D" }}>
        <h2 style={{ margin: 0 }}>🧠 IA prédictive</h2>
        <div style={{ marginTop: 8, color: "#8B949E" }}>
          Prévisions locales basées sur les ventes, marges, stock, saisonnalité et rentabilité.
        </div>
      </div>

      {predictions.map((p, i) => (
        <div key={i} style={{ background: "#1C2128", padding: 16, borderRadius: 10, border: "1px solid #30363D" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800 }}>{p.productName}</div>
              <div style={{ fontSize: 11, color: "#8B949E" }}>Marketplace : {p.marketplace}</div>
            </div>

            <div style={{ color: signalColor[p.signal], fontWeight: 800 }}>
              {p.signal === "growth" ? "📈 Growth" : p.signal === "danger" ? "🚨 Danger" : "👁️ Watch"}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, marginTop: 14 }}>
            <Metric label="Ventes 30j" value={`${p.projectedUnits30d} u`} />
            <Metric label="Ventes 90j" value={`${p.projectedUnits90d} u`} />
            <Metric label="Profit 30j" value={fmt(p.projectedProfit30d)} />
            <Metric label="Profit 90j" value={fmt(p.projectedProfit90d)} />
            <Metric label="Marge actuelle" value={`${p.currentMargin.toFixed(1)}%`} />
            <Metric label="ROI actuel" value={`${p.currentROI.toFixed(1)}%`} />
            <Metric label="Prix recommandé" value={fmt(p.recommendedPrice)} />
            <Metric label="Confiance IA" value={`${p.confidence}%`} />
          </div>

          <div style={{ marginTop: 12, padding: 10, background: "#0D1117", borderRadius: 8, color: signalColor[p.signal] }}>
            {riskLabel[p.stockRisk]} · Couverture estimée : {p.daysOfStock} jours
          </div>
        </div>
      ))}
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div style={{ background: "#0D1117", padding: 10, borderRadius: 8 }}>
      <div style={{ fontSize: 10, color: "#8B949E", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 800 }}>{value}</div>
    </div>
  );
}
