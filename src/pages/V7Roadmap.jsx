import React from "react";
import { PLUGINS } from "../plugins/pluginRegistry";

const ROADMAP = [
  {
    phase: "Phase 1 — Stabilisation production",
    status: "En cours",
    items: [
      "Nettoyage final du branding hérité",
      "Contrôle mobile S24+",
      "SEO unique et cohérent",
      "PWA installable avec cache propre"
    ]
  },
  {
    phase: "Phase 2 — Données vérifiables",
    status: "Prioritaire",
    items: [
      "Connecteurs gratuits : Frankfurter, Open Food Facts, REST Countries, Open-Meteo, Nominatim",
      "Imports manuels CSV/XLSX/PDF",
      "Suppression des résultats simulés",
      "Traçabilité claire : live API, import utilisateur ou fallback local"
    ]
  },
  {
    phase: "Phase 3 — Modules métier",
    status: "À faire",
    items: [
      "Sourcing global multi-pays",
      "Analyse prédictive basée sur données internes",
      "Centre d’automatisation",
      "Affiliation configurable",
      "Tableau de bord opportunités"
    ]
  },
  {
    phase: "Phase 4 — Monétisation",
    status: "À cadrer",
    items: [
      "Offres Gratuit / Pro / Elite",
      "Paiement sécurisé",
      "Conditions commerciales claires",
      "Limites par plan et accès premium"
    ]
  }
];

export default function V7Roadmap() {
  return (
    <div className="v7-roadmap-page" style={{ padding: 20, display: "grid", gap: 18 }}>
      <section className="v7-roadmap-section" style={card}>
        <h1>🚀 TradeAI Global v7</h1>
        <p style={muted}>
          Feuille de route production : architecture modulaire, données vérifiables,
          connecteurs gratuits et évolutions sans dépendance obligatoire à une API payante.
        </p>
      </section>

      <section className="v7-roadmap-section" style={card}>
        <h2>Plugins actifs</h2>
        <div style={grid}>
          {PLUGINS.map(plugin => (
            <div key={plugin.id} style={pluginCard}>
              <strong>{plugin.name}</strong>
              <p>{plugin.enabled ? "✅ Activé" : "⏸️ Désactivé"}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="v7-roadmap-section" style={card}>
        <h2>Feuille de route</h2>
        <div style={grid}>
          {ROADMAP.map(block => (
            <article key={block.phase} className="v7-roadmap-phase" style={pluginCard}>
              <h3>{block.phase}</h3>
              <p style={badge}>{block.status}</p>
              <ul>
                {block.items.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

const card = {
  background: "var(--bg-card)",
  border: "1px solid var(--border-color)",
  borderRadius: 16,
  padding: 20
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: 14
};

const pluginCard = {
  padding: 16,
  borderRadius: 14,
  background: "var(--bg-secondary)",
  border: "1px solid var(--border-color)"
};

const muted = { color: "var(--text-secondary)", lineHeight: 1.6 };

const badge = {
  display: "inline-block",
  color: "#0D1117",
  background: "#FF9900",
  borderRadius: 999,
  padding: "4px 10px",
  fontWeight: 800
};
