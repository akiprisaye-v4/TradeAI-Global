import React from "react";

export default function GlobalSourcingPanel({ sources = [], fmt }) {
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={{ background: "#1C2128", padding: 16, borderRadius: 10, border: "1px solid #30363D" }}>
        <h2 style={{ margin: 0 }}>🌍 Sourcing mondial</h2>
        <div style={{ marginTop: 8, color: "#8B949E" }}>
          Comparaison locale des fournisseurs mondiaux selon coût rendu, marge, ROI, délai et fiabilité.
        </div>
      </div>

      {sources.map((s) => (
        <div key={s.id} style={{ background: "#1C2128", padding: 16, borderRadius: 10, border: "1px solid #30363D" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800 }}>{s.marketplace}</div>
              <div style={{ fontSize: 11, color: "#8B949E" }}>{s.country} · MOQ {s.moq} unités · {s.shippingDays} jours</div>
            </div>
            <div style={{ color: s.score >= 75 ? "#00C853" : s.score >= 55 ? "#FF9800" : "#FF3D00", fontWeight: 800 }}>
              Score {s.score}/100
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10, marginTop: 14 }}>
            <Metric label="Prix fournisseur" value={fmt(s.supplierPrice)} />
            <Metric label="Transport" value={fmt(s.shippingCost)} />
            <Metric label="Douane" value={fmt(s.customsCost)} />
            <Metric label="Coût rendu" value={fmt(s.landedCost)} />
            <Metric label="Profit estimé" value={fmt(s.estimatedProfit)} />
            <Metric label="Marge" value={`${s.margin.toFixed(1)}%`} />
            <Metric label="ROI" value={`${s.roi.toFixed(1)}%`} />
            <Metric label="Fiabilité" value={`${s.reliability}%`} />
          </div>

          <div style={{ marginTop: 12, padding: 10, background: "#0D1117", borderRadius: 8, color: "#FF9900", fontWeight: 700 }}>
            ➜ {s.recommendation}
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
