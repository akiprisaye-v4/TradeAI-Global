import React, { useMemo } from "react";

export default function DashboardPage({
  products,
  fxRates,
  calcProduct,
  MARKETPLACES,
  Section,
  StatCard,
  fmt,
  fmtPct
}) {
  const productMetrics = useMemo(
    () => products.map(product => ({ product, calc: calcProduct(product, fxRates) })),
    [products, fxRates, calcProduct]
  );

  const totalMonthlyProfit = productMetrics.reduce((sum, { calc }) => sum + calc.monthlyProfit, 0);

  const avgMargin = productMetrics.length > 0
    ? productMetrics.reduce((sum, { calc }) => sum + calc.netMargin, 0) / productMetrics.length
    : 0;

  const bestMetric = productMetrics.reduce((best, current) => {
    if (!best) return current;
    return current.calc.monthlyProfit > best.calc.monthlyProfit ? current : best;
  }, null);

  const bestProduct = bestMetric?.product;
  const bestCalc = bestMetric?.calc || null;

  const topProducts = useMemo(
    () => productMetrics
      .slice()
      .sort((a, b) => b.calc.monthlyProfit - a.calc.monthlyProfit)
      .slice(0, 3),
    [productMetrics]
  );

  const marketplaceStats = useMemo(() => {
    return Object.keys(MARKETPLACES).slice(0, 6).map(mk => {
      const matchingMetrics = productMetrics.filter(({ product }) => product.marketplace === mk);
      return {
        mk,
        count: matchingMetrics.length,
        profit: matchingMetrics.reduce((sum, { calc }) => sum + calc.monthlyProfit, 0)
      };
    });
  }, [MARKETPLACES, productMetrics]);

  return (
    <div>
      <Section title="📊 Vue d'ensemble">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 16 }}>
          <StatCard label="Produits actifs" value={products.length} color="#FF9900" />
          <StatCard label="Profit mensuel total" value={fmt(totalMonthlyProfit)} color={totalMonthlyProfit >= 0 ? "#00C853" : "#FF3D00"} />
          <StatCard label="Marge moyenne" value={fmtPct(avgMargin)} color={avgMargin >= 15 ? "#00C853" : "#FF9900"} />
          <StatCard label="Meilleur produit" value={bestProduct?.name || "-"} color="#FFD600" sub={bestCalc ? fmt(bestCalc.monthlyProfit) + "/mois" : ""} />
        </div>
      </Section>

      <Section title="🏆 Top 3 Produits">
        {topProducts.map(({ product: prod, calc: c }, i) => {
              return (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 12px", background: "#1C2128", borderRadius: 8, marginBottom: 8, border: "1px solid #30363D" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{i + 1}. {prod.name}</div>
                  <div style={{ fontSize: 10, color: "#8B949E" }}>{MARKETPLACES[prod.marketplace]?.label} · Marge {c.netMargin.toFixed(1)}%</div>
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: c.monthlyProfit >= 0 ? "#00C853" : "#FF3D00" }}>
                  {fmt(c.monthlyProfit, c.sym)}
                </div>
              </div>
            );
          })}
      </Section>

      <Section title="📈 Répartition par marketplace">
        {marketplaceStats.map(({ mk, count, profit }) => {
          return (
            <div key={mk} style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", background: "#1C2128", borderRadius: 6, marginBottom: 6, fontSize: 12 }}>
              <span>{MARKETPLACES[mk].label}</span>
              <span style={{ color: "#8B949E" }}>
                {count} produit{count > 1 ? "s" : ""} · <strong style={{ color: profit >= 0 ? "#00C853" : "#FF3D00" }}>{fmt(profit)}</strong>
              </span>
            </div>
          );
        })}
      </Section>
    </div>
  );
}
