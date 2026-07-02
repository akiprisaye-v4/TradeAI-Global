import React from "react";

export default function CompetitivePage({
  p,
  calcP,
  Section,
  fmt
}) {
  const competitors = [
    { name: "Concurrent A", price: p.sellingPrice * 0.95, rating: 4.2, reviews: 1240, fba: true },
    { name: "Concurrent B", price: p.sellingPrice * 1.10, rating: 4.5, reviews: 890, fba: true },
    { name: "Concurrent C", price: p.sellingPrice * 0.85, rating: 3.8, reviews: 320, fba: false },
    { name: "Marque Amazon", price: p.sellingPrice * 0.80, rating: 4.6, reviews: 5400, fba: true },
  ];

  return (
    <div>
      <Section title="🎯 Analyse Concurrentielle">
        <div style={{ padding: 14, background: "#1C2128", borderRadius: 9, marginBottom: 12 }}>
          <div style={{ fontSize: 12, color: "#8B949E", marginBottom: 8 }}>Votre positionnement</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#FF9900", marginBottom: 4 }}>{p.name}</div>
          <div style={{ display: "flex", gap: 14, fontSize: 12 }}>
            <span>Prix: <strong>{fmt(p.sellingPrice, calcP.sym)}</strong></span>
            <span>Marge: <strong style={{ color: calcP.netMargin >= 15 ? "#00C853" : "#FF9900" }}>{calcP.netMargin.toFixed(1)}%</strong></span>
            <span>Score: <strong>{calcP.score}/10</strong></span>
          </div>
        </div>
      </Section>

      <Section title="👥 Concurrents Simulés">
        {competitors.map((c, i) => {
          const priceDiff = ((c.price - p.sellingPrice) / p.sellingPrice) * 100;
          return (
            <div key={i} style={{ padding: 14, background: "#1C2128", borderRadius: 9, marginBottom: 8, border: "1px solid #30363D" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>
                  {c.name} {c.fba && <span style={{ fontSize: 10, color: "#00C853" }}>FBA</span>}
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: priceDiff < 0 ? "#FF3D00" : "#00C853" }}>
                  {fmt(c.price, calcP.sym)} <span style={{ fontSize: 10, color: "#8B949E" }}>({priceDiff >= 0 ? "+" : ""}{priceDiff.toFixed(1)}%)</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 14, fontSize: 11, color: "#8B949E" }}>
                <span>⭐ {c.rating}</span>
                <span>💬 {c.reviews} avis</span>
              </div>
            </div>
          );
        })}
      </Section>

      <Section title="💡 Stratégies Recommandées">
        {[
          { title: "Prix d'appel", desc: "Positionnez-vous 5-10% sous le concurrent principal pour gagner en visibilité", color: "#00C853" },
          { title: "Différenciation", desc: "Mettez en avant vos avantages (livraison rapide, garantie, bundle)", color: "#3B82F6" },
          { title: "Avis clients", desc: `Avec ${competitors[0].reviews} avis chez le leader, visez 50-100 avis rapidement`, color: "#FF9900" },
          { title: "Publicité ciblée", desc: "Ciblez les mots-clés de vos concurrents avec un budget PPC agressif", color: "#8B5CF6" },
        ].map((s, i) => (
          <div key={i} style={{ padding: 12, background: "#1C2128", borderLeft: `3px solid ${s.color}`, borderRadius: 6, marginBottom: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: s.color, marginBottom: 4 }}>{s.title}</div>
            <div style={{ fontSize: 11, color: "#E6EDF3", lineHeight: 1.5 }}>{s.desc}</div>
          </div>
        ))}
      </Section>
    </div>
  );
}
