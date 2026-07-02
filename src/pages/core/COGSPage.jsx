import React from "react";

export default function COGSPage({
  p,
  u,
  sym,
  calcP,
  Section,
  InputField,
  RestockAlert,
}) {
  return (
    <div>
      <Section title="📦 COGS – Coût de revient">
        <InputField
          label="Prix unitaire fournisseur"
          value={p.costPrice}
          onChange={v => u("costPrice", v)}
          prefix={sym}
          min={0}
        />

        <InputField
          label="Transport vers Amazon"
          value={p.shippingToAmazon}
          onChange={v => u("shippingToAmazon", v)}
          prefix={sym}
          min={0}
        />
      </Section>

      <RestockAlert
        p={p}
        calcP={calcP}
      />
    </div>
  );
}
