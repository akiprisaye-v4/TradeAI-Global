import React from "react";

export default function CalculateurPage({
  p,
  u,
  calcP,
  sym,
  mk,
  cashFlow,
  pCol,
  products,
  fxRates,
  MARKETPLACES,
  CATEGORIES,
  Section,
  SelectField,
  InputField,
  StatCard,
  ScoreGauge,
  ProfitMeter,
  CashFlowChart,
  MultiProductCashFlow,
  fmt,
  fmtPct
}) {
  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(320px, 1fr))", gap: 14 }}>
      <div>
        <Section title="🏪 Produit & Marché">
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "block", fontSize: 11, color: "#8B949E", marginBottom: 4, fontWeight: 700 }}>Nom du produit</label>
            <input
              type="text"
              value={p.name}
              onChange={(e) => u("name", e.target.value)}
              style={{ width: "100%", boxSizing: "border-box", background: "#1C2128", border: "1px solid #30363D", borderRadius: 7, padding: "9px 10px", color: "#E6EDF3", fontSize: 14, fontWeight: 600, outline: "none" }}
              onFocus={(e) => e.target.style.borderColor = "#FF9900"}
              onBlur={(e) => e.target.style.borderColor = "#30363D"}
            />
          </div>

          <SelectField label="Marketplace" value={p.marketplace} onChange={v => u("marketplace", v)} options={Object.entries(MARKETPLACES).map(([k, v]) => ({ label: v.label, value: k }))} parseAs="string" />
          <InputField label="Prix de vente TTC" value={p.sellingPrice} onChange={v => u("sellingPrice", v)} prefix={sym} min={0.01} max={9999} />
          <InputField label="Unités vendues / mois" value={p.units} onChange={v => u("units", v)} prefix="" min={1} step={1} />
          <SelectField label="Catégorie" value={p.categoryIdx} onChange={v => u("categoryIdx", v)} options={CATEGORIES} />
        </Section>

        <Section title="🚚 Logistique & Poids">
          <InputField label="Long. (cm)" value={p.length} onChange={v => u("length", v)} prefix="" min={0} />
          <InputField label="Larg. (cm)" value={p.width} onChange={v => u("width", v)} prefix="" min={0} />
          <InputField label="Haut. (cm)" value={p.height} onChange={v => u("height", v)} prefix="" min={0} />
          <InputField label="Poids réel (kg)" value={p.weight} onChange={v => u("weight", v)} prefix="" step={0.1} min={0} />
        </Section>

        <Section title="💰 Coûts & Taxes">
          <InputField label="Coût d'achat produit" value={p.costPrice} onChange={v => u("costPrice", v)} prefix={sym} min={0} />
          <InputField label="Transport vers Amazon" value={p.shippingToAmazon} onChange={v => u("shippingToAmazon", v)} prefix={sym} min={0} />
          <InputField label="Publicité PPC / unité" value={p.ads} onChange={v => u("ads", v)} prefix={sym} min={0} />
        </Section>
      </div>

      <div>
        <div style={{ background:"#161B22", border:`2px solid ${pCol}33`, borderRadius: 11, padding:"18px 16px", marginBottom: 12 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 10, color:"#8B949E", fontWeight: 700, textTransform:"uppercase", marginBottom: 4 }}>Résultat · {mk.label}</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: pCol }}>
                {calcP.profit >= 0 ? "+" : "−"}{fmt(calcP.profit, sym)}
              </div>
            </div>
            <ScoreGauge score={calcP.score} />
          </div>

          <ProfitMeter margin={calcP.netMargin} />

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap: 8, marginTop: 12 }}>
            <StatCard label="ROI" value={fmtPct(calcP.roi)} color={calcP.roi >= 50 ? "#00C853" : "#FF9900"} />
            <StatCard label="Profit mensuel" value={fmt(calcP.monthlyProfit, sym)} color={calcP.monthlyProfit >= 0 ? "#00C853" : "#FF3D00"} />
          </div>
        </div>

        <div style={{ background:"#161B22", border:"1px solid #21262D", borderRadius: 11, padding:"16px 16px 12px", marginBottom: 12 }}>
          <div style={{ fontSize: 10, color:"#FF9900", fontWeight: 700, textTransform:"uppercase", marginBottom: 12 }}>💸 Cash flow 12 mois</div>
          <CashFlowChart rows={cashFlow.rows} sym={sym} breakevenMonth={cashFlow.breakevenMonth} />
        </div>

        {products.length > 1 && <MultiProductCashFlow products={products} fxRates={fxRates} />}
      </div>
    </div>
  );
}
