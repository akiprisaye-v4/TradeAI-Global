import React from "react";

export default function TradeAIPanel({ products, p, calcP, Section, fmt }) {
  const suggestions = [];

  if (calcP.netMargin < 15) {
    suggestions.push({
      icon: "💰",
      title: "Augmentez votre prix",
      desc: `Votre marge nette est de ${calcP.netMargin.toFixed(1)}%. Visez au moins 15% pour être rentable.`,
      color: "#FF9900"
    });
  }

  if (p.ads < 1 && p.units > 50) {
    suggestions.push({
      icon: "📢",
      title: "Activez la publicité PPC",
      desc: `Avec ${p.units} ventes/mois, un budget pub de 1-2€/unité boosterait votre visibilité.`,
      color: "#3B82F6"
    });
  }

  if (calcP.arbitrageFBA) {
    suggestions.push({
      icon: "📦",
      title: "Optimisez votre taille FBA",
      desc: `Passez à "${calcP.arbitrageFBA.label}" pour économiser ${fmt(calcP.arbitrageFBA.saving)}/unité.`,
      color: "#00C853"
    });
  }

  if (!p.isQ4) {
    suggestions.push({
      icon: "🎄",
      title: "Préparez Q4",
      desc: "Activez le mode Q4 pour anticiper les frais de stockage multipliés par 3 en fin d'année.",
      color: "#8B5CF6"
    });
  }

  const uniqueMk = new Set(products.map(p => p.marketplace)).size;
  if (uniqueMk < 3) {
    suggestions.push({
      icon: "🌍",
      title: "Étendez-vous à d'autres marketplaces",
      desc: `Vous n'êtes que sur ${uniqueMk} marketplace(s). DE, UK et IT offrent de belles opportunités.`,
      color: "#06B6D4"
    });
  }

  return (
    <div>
      <Section title="🤖 Assistant IA - Recommandations">
        <div style={{ padding: 16, background: "rgba(255,153,0,0.1)", border: "1px solid #FF990033", borderRadius: 9, marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#FF9900", marginBottom: 6 }}>
            💡 {suggestions.length} suggestion{suggestions.length > 1 ? "s" : ""} pour {p.name}
          </div>
          <div style={{ fontSize: 11, color: "#8B949E" }}>
            Analyse basée sur vos données actuelles et les meilleures pratiques e-commerce.
          </div>
        </div>

        {suggestions.map((s, i) => (
          <div key={i} style={{ padding: 16, background: "#1C2128", border: `1px solid ${s.color}33`, borderLeft: `4px solid ${s.color}`, borderRadius: 9, marginBottom: 10 }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, color: s.color }}>{s.title}</div>
            <div style={{ fontSize: 12, color: "#E6EDF3", lineHeight: 1.5 }}>{s.desc}</div>
          </div>
        ))}
      </Section>

      <Section title="📊 Benchmark du marché">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div style={{ padding: 12, background: "#1C2128", borderRadius: 8 }}>
            <div style={{ fontSize: 10, color: "#8B949E", marginBottom: 4 }}>Marge moyenne FBA</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#FF9900" }}>18.5%</div>
            <div style={{ fontSize: 10, color: calcP.netMargin >= 18.5 ? "#00C853" : "#FF3D00", marginTop: 4 }}>
              {calcP.netMargin >= 18.5 ? "✓ Au-dessus" : "⚠ En-dessous"}
            </div>
          </div>

          <div style={{ padding: 12, background: "#1C2128", borderRadius: 8 }}>
            <div style={{ fontSize: 10, color: "#8B949E", marginBottom: 4 }}>ROI moyen FBA</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#FF9900" }}>75%</div>
            <div style={{ fontSize: 10, color: calcP.roi >= 75 ? "#00C853" : "#FF3D00", marginTop: 4 }}>
              {calcP.roi >= 75 ? "✓ Au-dessus" : "⚠ En-dessous"}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
