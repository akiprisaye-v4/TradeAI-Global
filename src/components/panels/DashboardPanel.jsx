import React from "react";

export default function DashboardPanel({
  products,
  fxRates,
  calcProduct,
  MARKETPLACES,
  Section,
  StatCard,
  fmt,
  fmtPct
}) {
  const totalMonthlyProfit = products.reduce((sum, prod) => {
    const c = calcProduct(prod, fxRates);
    return sum + c.monthlyProfit;
  }, 0);

  const avgMargin = products.length > 0
    ? products.reduce((sum, prod) => sum + calcProduct(prod, fxRates).netMargin, 0) / products.length
    : 0;

  const bestProduct = products.reduce((best, prod) => {
    const c = calcProduct(prod, fxRates);
    const bestC = calcProduct(best, fxRates);
    return c.monthlyProfit > bestC.monthlyProfit ? prod : best;
  }, products[0]);

  const bestCalc = bestProduct ? calcProduct(bestProduct, fxRates) : null;

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
        {products
          .slice()
          .sort((a, b) => calcProduct(b, fxRates).monthlyProfit - calcProduct(a, fxRates).monthlyProfit)
          .slice(0, 3)
          .map((prod, i) => {
            const c = calcProduct(prod, fxRates);
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
        {Object.keys(MARKETPLACES).slice(0, 6).map(mk => {
          const count = products.filter(p => p.marketplace === mk).length;
          const profit = products
            .filter(p => p.marketplace === mk)
            .reduce((sum, p) => sum + calcProduct(p, fxRates).monthlyProfit, 0);

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
