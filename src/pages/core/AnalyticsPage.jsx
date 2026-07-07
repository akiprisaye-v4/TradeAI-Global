import React, { useMemo } from "react";

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
  const productMetrics = useMemo(
    () => products.map(product => ({ product, calc: calcProduct(product, fxRates) })),
    [products, fxRates, calcProduct]
  );

  const categoryStats = useMemo(() => {
    return productMetrics.reduce((stats, { product, calc }) => {
      const cat = CATEGORIES[product.categoryIdx]?.label || "Autre";
      if (!stats[cat]) stats[cat] = { count: 0, profit: 0 };
      stats[cat].count++;
      stats[cat].profit += calc.monthlyProfit;
      return stats;
    }, {});
  }, [productMetrics, CATEGORIES]);

  const totalProfit = productMetrics.reduce((sum, { calc }) => sum + calc.monthlyProfit, 0);

  const totalROI = productMetrics.length > 0
    ? productMetrics.reduce((sum, { calc }) => sum + calc.roi, 0) / productMetrics.length
    : 0;

  const avgScore = productMetrics.length > 0
    ? (productMetrics.reduce((s, { calc }) => s + calc.score, 0) / productMetrics.length).toFixed(1) + "/10"
    : "0/10";

  const profitableProductsCount = productMetrics.filter(({ calc }) => calc.profit > 0).length;

  const scoreDistribution = useMemo(() => {
    const distribution = Array.from({ length: 11 }, () => 0);
    productMetrics.forEach(({ calc }) => {
      if (Number.isInteger(calc.score) && calc.score >= 0 && calc.score <= 10) {
        distribution[calc.score]++;
      }
    });
    return distribution;
  }, [productMetrics]);

  const maxScoreCount = Math.max(...scoreDistribution, 1);

  return (
    <div>
      <Section title="📈 Analytics Globales">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
          <StatCard label="Profit total" value={fmt(totalProfit)} color={totalProfit >= 0 ? "#00C853" : "#FF3D00"} />
          <StatCard label="ROI moyen" value={fmtPct(totalROI)} color={totalROI >= 50 ? "#00C853" : "#FF9900"} />
          <StatCard label="Produits rentables" value={profitableProductsCount + "/" + products.length} color="#00C853" />
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
          {scoreDistribution.map((count, i) => {
            return (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <div style={{
                  width: "100%",
                  height: (count / maxScoreCount * 70) + "px",
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
