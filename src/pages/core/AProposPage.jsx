import React, { useState } from "react";

const FEATURES = [
  ["📊", "Calcul rentabilité", "Marge nette, ROI, profit mensuel, cash-flow 12 mois et score interne."],
  ["📦", "Stock & réassort", "Couverture stock, alertes de rupture et simulation de délai fournisseur."],
  ["🌍", "Sourcing global", "Comparaison locale d’options fournisseurs sans prétendre à une donnée temps réel."],
  ["🧠", "Prédictif local", "Projection prudente basée sur vos paramètres produit, coûts, ventes et saisonnalité."],
  ["🔌", "APIs gratuites", "Open Food Facts, REST Countries, Open-Meteo, Nominatim et FX via proxy Vercel."],
  ["🤝", "Affiliation", "Génération de liens affiliés configurables, sans dépendance à une API Amazon payante."],
  ["🧾", "Exports & historique", "Sauvegarde locale, historique de calculs, export portfolio et suivi des scénarios."],
  ["📱", "PWA mobile", "Interface installable, responsive, optimisée pour smartphone et usage terrain."]
];

const BENCHMARK = [
  { name: "Helium 10", zone: "US / Global", strength: "Recherche produit, keywords, opérations Amazon", gap: "Très complet mais coûteux", tradeai: "Alternative gratuite orientée calcul, sourcing et transparence." },
  { name: "Jungle Scout", zone: "US / Global", strength: "Études marché Amazon, tracking produit", gap: "Dépendance forte aux données marketplace", tradeai: "Approche sans API payante, plus adaptée au prototypage et à l’analyse coût." },
  { name: "Keepa", zone: "Europe / Global", strength: "Historique prix Amazon", gap: "Nécessite accès API payant pour automatisation", tradeai: "Prépare l’import manuel vérifiable avant connexion premium." },
  { name: "SellerAmp", zone: "UK / Europe", strength: "Arbitrage Amazon et analyse rapide", gap: "Spécialisé Amazon", tradeai: "Plus large : FX, sourcing, stock, PWA et modules v7." },
  { name: "AMZScout", zone: "Global", strength: "Recherche niche et extension", gap: "Principalement Amazon", tradeai: "Positionnement plus modulaire et gratuit par défaut." },
  { name: "ZonGuru", zone: "Global", strength: "Listing, mots-clés, suivi vendeur", gap: "Suite SaaS payante", tradeai: "Structure évolutive avec modules gratuits et connecteurs ouverts." }
];

const ROADMAP = [
  "Import CSV concurrentiel : ASIN, prix, avis, vendeur, URL, date de collecte.",
  "Import CSV keywords : mot-clé, volume, CPC, difficulté, source, date.",
  "Connecteur Open Data produits quand une source gratuite exploitable est confirmée.",
  "Tableau de provenance global : local, live API, import, cache, simulation interdite.",
  "Mode assistant guidé : recommandations étape par étape selon le produit actif."
];

export default function AProposPage() {
  const [active, setActive] = useState("vision");

  const tabs = [
    ["vision", "🚀 Vision"],
    ["features", "🧩 Modules"],
    ["benchmark", "🏆 Benchmark"],
    ["roadmap", "🛣️ Suite"]
  ];

  return (
    <div style={{ display: "grid", gap: 22 }}>
      <section style={hero}>
        <div style={badge}>TradeAI Global v7 · API-first gratuite · PWA mobile</div>
        <h1 style={h1}>La plateforme gratuite pour analyser, sourcer et piloter un business e-commerce global.</h1>
        <p style={lead}>
          TradeAI Global aide à calculer la rentabilité réelle, préparer le sourcing, suivre les stocks,
          comparer les scénarios et structurer les décisions avant d’investir dans des APIs payantes.
        </p>
        <div style={kpiGrid}>
          <Kpi value="0 €" label="Coût API actuel" />
          <Kpi value="5" label="APIs gratuites branchées" />
          <Kpi value="v7" label="Architecture modulaire" />
          <Kpi value="PWA" label="Mobile-ready" />
        </div>
      </section>

      <nav style={tabsWrap}>
        {tabs.map(([id, label]) => (
          <button key={id} onClick={() => setActive(id)} style={active === id ? tabActive : tab}>
            {label}
          </button>
        ))}
      </nav>

      {active === "vision" && (
        <section style={card}>
          <h2 style={h2}>🎯 Ce que fait le logiciel</h2>
          <p style={p}>
            Le logiciel centralise les calculs clés d’un vendeur e-commerce : prix de vente, coût fournisseur,
            frais, transport, publicité, stock, cash-flow, ROI, marge nette et scoring interne.
          </p>
          <p style={p}>
            Les zones sensibles sont maintenant clarifiées : aucune donnée concurrente, marketplace, keyword
            ou prix externe n’est affichée comme réelle sans source vérifiable.
          </p>
          <div style={notice}>
            <strong>Principe de production :</strong> donnée locale clairement séparée des données live API,
            imports CSV, caches et futures APIs premium.
          </div>
        </section>
      )}

      {active === "features" && (
        <section style={grid}>
          {FEATURES.map(([icon, title, desc]) => (
            <article key={title} style={featureCard}>
              <div style={iconStyle}>{icon}</div>
              <h3 style={h3}>{title}</h3>
              <p style={small}>{desc}</p>
            </article>
          ))}
        </section>
      )}

      {active === "benchmark" && (
        <section style={card}>
          <h2 style={h2}>🏆 Benchmark concurrence mondiale</h2>
          <p style={small}>
            Benchmark indicatif non temps réel, basé sur le positionnement public connu des grandes suites Amazon/e-commerce.
            Objectif : situer TradeAI Global sans inventer de données live.
          </p>
          <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
            {BENCHMARK.map((b) => (
              <article key={b.name} style={benchCard}>
                <div>
                  <h3 style={h3}>{b.name}</h3>
                  <div style={muted}>{b.zone}</div>
                </div>
                <div style={benchText}><strong>Force :</strong> {b.strength}</div>
                <div style={benchText}><strong>Limite :</strong> {b.gap}</div>
                <div style={tradeaiBox}><strong>TradeAI Global :</strong> {b.tradeai}</div>
              </article>
            ))}
          </div>
        </section>
      )}

      {active === "roadmap" && (
        <section style={card}>
          <h2 style={h2}>🛣️ Prochaines étapes réalistes</h2>
          <div style={{ display: "grid", gap: 10 }}>
            {ROADMAP.map((item, i) => (
              <div key={item} style={roadItem}>
                <strong>Étape {i + 1}</strong>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Kpi({ value, label }) {
  return (
    <div style={kpi}>
      <div style={kpiValue}>{value}</div>
      <div style={muted}>{label}</div>
    </div>
  );
}

const hero = { padding: 24, borderRadius: 22, background: "linear-gradient(135deg, rgba(255,153,0,.18), rgba(13,17,23,.96))", border: "1px solid rgba(255,153,0,.45)" };
const badge = { display: "inline-block", padding: "8px 12px", borderRadius: 999, background: "rgba(255,153,0,.12)", color: "#FF9900", fontWeight: 800, marginBottom: 18 };
const h1 = { fontSize: "clamp(32px, 7vw, 68px)", lineHeight: 1.04, margin: "0 0 16px", color: "#E6EDF3" };
const lead = { fontSize: 18, lineHeight: 1.65, color: "#C9D1D9", maxWidth: 920 };
const kpiGrid = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 12, marginTop: 22 };
const kpi = { padding: 16, borderRadius: 16, background: "rgba(13,17,23,.72)", border: "1px solid #30363D" };
const kpiValue = { fontSize: 30, fontWeight: 900, color: "#FF9900" };
const tabsWrap = { display: "flex", gap: 10, flexWrap: "wrap" };
const tab = { padding: "12px 14px", borderRadius: 12, border: "1px solid #30363D", background: "#1C2128", color: "#E6EDF3", fontWeight: 800 };
const tabActive = { ...tab, background: "linear-gradient(135deg,#FF9900,#FFB800)", color: "#0D1117", border: "1px solid #FFB800" };
const card = { padding: 20, borderRadius: 18, background: "#161B22", border: "1px solid #30363D" };
const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 14 };
const featureCard = { padding: 18, borderRadius: 18, background: "#161B22", border: "1px solid #30363D" };
const iconStyle = { fontSize: 34, marginBottom: 10 };
const h2 = { color: "#FF9900", marginTop: 0 };
const h3 = { color: "#E6EDF3", margin: "0 0 8px" };
const p = { color: "#C9D1D9", lineHeight: 1.7 };
const small = { color: "#C9D1D9", lineHeight: 1.6 };
const muted = { color: "#8B949E", fontSize: 13 };
const notice = { padding: 14, borderLeft: "4px solid #FF9900", borderRadius: 12, background: "rgba(255,153,0,.10)", color: "#E6EDF3" };
const benchCard = { display: "grid", gap: 8, padding: 16, borderRadius: 14, background: "#0D1117", border: "1px solid #30363D" };
const benchText = { color: "#C9D1D9", lineHeight: 1.5 };
const tradeaiBox = { padding: 12, borderRadius: 10, background: "rgba(0,200,83,.10)", color: "#E6EDF3", border: "1px solid rgba(0,200,83,.35)" };
const roadItem = { display: "grid", gap: 4, padding: 14, borderRadius: 12, background: "#0D1117", border: "1px solid #30363D", color: "#C9D1D9" };
