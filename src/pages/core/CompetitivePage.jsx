import React from "react";

function buildSignals(p, calcP, fmt) {
  return [
    { label: "Produit analysé", value: p?.name || "Produit actif", detail: "Donnée locale issue de votre fiche produit." },
    { label: "Prix actuel", value: fmt(Number(p?.sellingPrice || 0), calcP.sym), detail: "Prix saisi localement, non récupéré depuis Amazon." },
    { label: "Marge nette", value: `${Number(calcP?.netMargin || 0).toFixed(1)}%`, detail: "Calcul local basé sur vos coûts, frais et paramètres." },
    { label: "Score interne", value: `${calcP?.score ?? 0}/10`, detail: "Score calculé par TradeAI Global, pas un score marketplace externe." }
  ];
}

export default function CompetitivePage({ p, calcP, Section, fmt }) {
  const signals = buildSignals(p, calcP, fmt);

  return (
    <div>
      <Section title="🎯 Analyse Concurrentielle">
        <div style={{ padding: 14, background: "#1C2128", borderRadius: 9, marginBottom: 12, border: "1px solid #30363D" }}>
          <div style={{ fontSize: 12, color: "#8B949E", marginBottom: 8 }}>Statut des données</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#FF9900", marginBottom: 8 }}>
            Analyse locale — aucune donnée concurrente temps réel connectée
          </div>
          <div style={{ fontSize: 12, color: "#E6EDF3", lineHeight: 1.6 }}>
            Cette section n’affiche plus de concurrents simulés. Les indicateurs ci-dessous viennent uniquement de vos données produit et des calculs locaux.
          </div>
        </div>
      </Section>

      <Section title="📊 Positionnement local">
        {signals.map((item, i) => (
          <div key={i} style={{ padding: 14, background: "#1C2128", borderRadius: 9, marginBottom: 8, border: "1px solid #30363D" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 6 }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{item.label}</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#FF9900", textAlign: "right" }}>{item.value}</div>
            </div>
            <div style={{ fontSize: 11, color: "#8B949E", lineHeight: 1.5 }}>{item.detail}</div>
          </div>
        ))}
      </Section>

      <Section title="🔌 Sources concurrentielles à connecter">
        <div style={{ padding: 12, background: "#1C2128", borderLeft: "3px solid #FF9900", borderRadius: 6 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#FF9900", marginBottom: 4 }}>Import manuel CSV</div>
          <div style={{ fontSize: 11, color: "#E6EDF3", lineHeight: 1.5 }}>
            Prochaine étape réaliste : importer prix, notes, avis, ASIN, URL et vendeur depuis un fichier vérifiable.
          </div>
        </div>
      </Section>
    </div>
  );
}
