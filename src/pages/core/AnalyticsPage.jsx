import React from "react";

export default function AnalyticsPage({
  products,
  fxRates,
  CATEGORIES,
  calcProduct,
  Section,
  StatCard,
  fmt,
  fmtPct,
  scoreColor
}) {
  const categoryStats = {};

  products.forEach(p => {
    const cat = CATEGORIES[p.categoryIdx]?.label || "Autre";
    if (!categoryStats[cat]) categoryStats[cat] = { count: 0, profit: 0 };
    categoryStats[cat].count++;
    categoryStats[cat].profit += calcProduct(p, fxRates).monthlyProfit;
  });

  const totalProfit = products.reduce((sum, p) => sum + calcProduct(p, fxRates).monthlyProfit, 0);

  const totalROI = products.length > 0
    ? products.reduce((sum, p) => sum + calcProduct(p, fxRates).roi, 0) / products.length
    : 0;

  const avgScore = products.length > 0
    ? (products.reduce((s, p) => s + calcProduct(p, fxRates).score, 0) / products.length).toFixed(1) + "/10"
    : "0/10";

  return (
    <div>
      <Section title="📈 Analytics Globales">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
          <StatCard label="Profit total" value={fmt(totalProfit)} color={totalProfit >= 0 ? "#00C853" : "#FF3D00"} />
          <StatCard label="ROI moyen" value={fmtPct(totalROI)} color={totalROI >= 50 ? "#00C853" : "#FF9900"} />
          <StatCard label="Produits rentables" value={products.filter(p => calcProduct(p, fxRates).profit > 0).length + "/" + products.length} color="#00C853" />
          <StatCard label="Score moyen" value={avgScore} color="#FFD600" />
        </div>
      </Section>

      <Section title="🏷️ Par catégorie">
        {Object.entries(categoryStats).map(([cat, data]) => (
          <div key={cat} style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 12 }}>
              <span style={{ fontWeight: 700 }}>{cat}</span>
              <span style={{ color: data.profit >= 0 ? "#00C853" : "#FF3D00" }}>{fmt(data.profit)} · {data.count} prod.</span>
            </div>
            <div style={{ background: "#1C2128", height: 6, borderRadius: 3, overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: Math.min(100, Math.abs(data.profit / Math.max(Math.abs(totalProfit), 1)) * 100) + "%",
                background: data.profit >= 0 ? "#00C853" : "#FF3D00"
              }} />
            </div>
          </div>
        ))}
      </Section>

      <Section title="📊 Distribution des scores">
        <div style={{ display: "flex", gap: 8, height: 80, alignItems: "flex-end" }}>
          {[...Array(11)].map((_, i) => {
            const count = products.filter(p => calcProduct(p, fxRates).score === i).length;
            const maxCount = Math.max(
              ...[...Array(11)].map((_, j) => products.filter(p => calcProduct(p, fxRates).score === j).length),
              1
            );

            return (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <div style={{
                  width: "100%",
                  height: (count / maxCount * 70) + "px",
                  background: scoreColor(i),
                  borderRadius: "2px 2px 0 0",
                  minHeight: count > 0 ? 4 : 0
                }} />
                <span style={{ fontSize: 9, color: "#8B949E" }}>{i}</span>
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
