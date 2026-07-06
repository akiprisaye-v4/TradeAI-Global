import React from "react";

export default function PortfolioPage({
  products,
  fxRates,
  calcProduct,
  fmt,
  StatCard,
  PortfolioExportButton,
  MultiProductCashFlow
}) {
  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:16 }}>
        <div style={{ fontSize:12, color:"#8B949E" }}>
          {products.length} produit(s)
        </div>
        <PortfolioExportButton />
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:14 }}>
        {products.map((prod, idx) => {
          const c = calcProduct(prod, fxRates);
          return (
            <div key={idx} style={{ background:"#161B22", border:"1px solid #21262D", borderRadius:11, padding:"16px" }}>
              <div style={{ fontSize:14, fontWeight:700, marginBottom:12 }}>
                {prod.name}
              </div>

              <StatCard
                label="Profit mensuel"
                value={fmt(c.monthlyProfit, c.sym)}
                color={c.monthlyProfit >= 0 ? "#00C853" : "#FF3D00"}
              />
            </div>
          );
        })}
      </div>

      <MultiProductCashFlow
        products={products}
        fxRates={fxRates}
      />
    </div>
  );
}
