import React from "react";

export default function StockPanel({
  products,
  fxRates,
  calcProduct,
  Section,
  StatCard,
  fmt
}) {
  return (
    <div>
      <Section title="📦 Gestion des Stocks">
        <div style={{ display: "grid", gap: 10 }}>
          {products.map((prod, i) => {
            const c = calcProduct(prod, fxRates);
            const daysOfStock = prod.units > 0 ? (prod.initialOrderUnits / prod.units) * 30 : 0;
            const leadDays = prod.supplierLeadDays || 30;
            const status = daysOfStock <= leadDays * 0.5 ? "critical" : daysOfStock <= leadDays ? "warning" : "ok";
            const color = status === "critical" ? "#FF3D00" : status === "warning" ? "#FF9900" : "#00C853";

            return (
              <div key={i} style={{ padding: 14, background: "#1C2128", border: `1px solid ${color}33`, borderLeft: `4px solid ${color}`, borderRadius: 9 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{prod.name}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color }}>
                    {status === "critical" ? "🚨 Critique" : status === "warning" ? "⚠️ Attention" : "✅ OK"}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, fontSize: 11 }}>
                  <div>
                    <div style={{ color: "#8B949E" }}>Stock</div>
                    <div style={{ fontWeight: 700 }}>{prod.initialOrderUnits} u</div>
                  </div>
                  <div>
                    <div style={{ color: "#8B949E" }}>Ventes/mois</div>
                    <div style={{ fontWeight: 700 }}>{prod.units}</div>
                  </div>
                  <div>
                    <div style={{ color: "#8B949E" }}>Couverture</div>
                    <div style={{ fontWeight: 700, color }}>{daysOfStock.toFixed(0)} j</div>
                  </div>
                  <div>
                    <div style={{ color: "#8B949E" }}>Délai</div>
                    <div style={{ fontWeight: 700 }}>{leadDays} j</div>
                  </div>
                </div>

                {status !== "ok" && (
                  <div style={{ marginTop: 10, padding: 8, background: `${color}15`, borderRadius: 6, fontSize: 11, color }}>
                    💰 Perte estimée si rupture: <strong>{fmt((c.profit * prod.units / 30) * Math.max(0, leadDays - daysOfStock), c.sym)}</strong>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      <Section title="📊 Métriques globales">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10 }}>
          <StatCard
            label="Stock total"
            value={products.reduce((s, p) => s + p.initialOrderUnits, 0) + " u"}
            color="#FF9900"
          />
          <StatCard
            label="Valeur stock"
            value={fmt(products.reduce((s, p) => s + (p.initialOrderUnits * p.costPrice), 0))}
            color="#FFD600"
          />
          <StatCard
            label="Rotation/mois"
            value={(products.reduce((s, p) => s + p.units, 0) / Math.max(1, products.reduce((s, p) => s + p.initialOrderUnits, 0)) * 100).toFixed(1) + "%"}
            color="#00C853"
          />
        </div>
      </Section>
    </div>
  );
}
