import React, { useState } from "react";

const FEATURES = [
  ["📊", "Calcul rentabilité", "Marge nette, ROI, profit mensuel, cash-flow 12 mois et score interne."],
  ["📦", "Stock & réassort", "Couverture stock, alertes de rupture et simulation de délai fournisseur."],
  ["🌍", "Sourcing global", "Comparaison locale d’options fournisseurs sans prétendre à une donnée temps réel."],
  ["🧠", "Prédictif local", "Projection prudente basée sur vos paramètres produit, coûts, ventes et saisonnalité."],
  ["🔌", "APIs gratuites", "Open Food Facts, REST Countries, Open-Meteo, Nominatim et FX via proxy Vercel."],
  ["🤝", "Affiliation", "Génération de liens affiliés configurables, sans dépendance à une API marketplace payante."],
  ["🧾", "Exports & historique", "Sauvegarde locale, historique de calculs, export portfolio et suivi des scénarios."],
  ["📱", "PWA mobile", "Interface installable, responsive, optimisée pour smartphone et usage terrain."]
];

const BENCHMARK = [
  { name: "Helium 10", zone: "US / Global", strength: "Recherche produit, keywords, opérations Amazon", gap: "Très complet mais coûteux", tradeai: "Alternative gratuite orientée calcul, sourcing et transparence." },
  { name: "Jungle Scout", zone: "US / Global", strength: "Études marché Amazon, tracking produit", gap: "Dépendance forte aux données marketplace", tradeai: "Approche sans API payante, plus adaptée au prototypage et à l’analyse coût." },
  { name: "Keepa", zone: "Europe / Global", strength: "Historique prix Amazon", gap: "Nécessite accès API payant pour automatisation", tradeai: "Prépare l’import manuel vérifiable avant connexion premium." },
  { name: "SellerAmp", zone: "UK / Europe", strength: "Arbitrage Amazon et analyse rapide", gap: "Spécialisé Amazon", tradeai: "Plus large : FX, sourcing, stock, PWA et modules v7." },
  { name: "AMZScout", zone: "Global", strength: "Recherche niche et extension", gap: "Principalement Amazon", tradeai: "Positionnement plus modulaire et gratuit par défaut." },
  { name: "ZonGuru", zone: "Global", strength: "Listing, mots-clés, suivi vendeur", gap: "Suite SaaS payante", tradeai: "Structure évolutive avec modules gratuits et connecteurs ouverts." },
  { name: "DataHawk", zone: "Global", strength: "Analytics marketplace et reporting", gap: "Orienté pilotage data avancé", tradeai: "Priorité aux calculs locaux, provenance et préparation opérationnelle." },
  { name: "RepricerExpress", zone: "Global", strength: "Repricing automatisé", gap: "Spécialisé prix et marketplace", tradeai: "Approche plus large : coût, marge, stock, sourcing et décision." },
  { name: "Sellerboard", zone: "Europe / Global", strength: "Profit dashboard Amazon", gap: "Dépendance à la connexion seller", tradeai: "Lecture gratuite et locale avant branchements payants." },
  { name: "Algopix", zone: "Global", strength: "Études produits multi-marketplaces", gap: "Service orienté données externes", tradeai: "Socle gratuit, transparent et modulaire avant données premium." },
  { name: "InventoryLab", zone: "US", strength: "Comptabilité, stock et listing", gap: "Principalement opérations Amazon", tradeai: "Combine calcul, sourcing, PWA et roadmap d’imports vérifiables." }
];

const QUICK_START = [
  ["1", "Créer le scénario", "Choisissez un produit et posez vos hypothèses de départ."],
  ["2", "Saisir les coûts", "Prix fournisseur, transport, frais, publicité et fiscalité."],
  ["3", "Lire marge & ROI", "Contrôlez la rentabilité avant d’engager du capital."],
  ["4", "Vérifier le stock", "Testez couverture, rotation et risque de rupture."],
  ["5", "Comparer & exporter", "Conservez un scénario traçable pour décider."]
];

const USE_CASES = [
  ["🛒", "Débutant marketplace", "Structurer un premier scénario sans confondre estimation locale et donnée live."],
  ["🏝️", "Vendeur DOM-TOM", "Intégrer transport, change et contraintes de coûts dans une lecture globale."],
  ["🏭", "Sourcing fournisseur", "Comparer plusieurs hypothèses d’achat et mesurer leur impact sur la marge."],
  ["⚖️", "Arbitrage prix", "Tester différents prix de vente et seuils de rentabilité avant décision."]
];

const PROVENANCE = [
  ["Local", "Vos saisies et calculs", "Disponible", "#00C853"],
  ["Live API", "Connecteurs gratuits identifiés", "Selon module", "#42A5F5"],
  ["Import", "CSV avec source et date", "Roadmap", "#FFB800"],
  ["Cache", "Réponse technique temporaire", "Contrôlé", "#AB47BC"],
  ["Premium", "Futures sources payantes", "Non activé", "#8B949E"]
];

const ROADMAP = [
  ["v7", "Maintenant", "PWA, calculs, sourcing, stock, APIs gratuites et provenance renforcée."],
  ["v7.1", "Prochaine étape", "Imports CSV concurrentiels et keywords avec source et date."],
  ["v7.2", "Extension", "Connecteurs additionnels uniquement quand leur provenance est vérifiable."],
  ["v8", "Vision", "Assistant guidé selon le produit actif, sans masquer l’origine des données."]
];

const FAQ = [
  ["Les données Amazon sont-elles toutes réelles et live ?", "Non. TradeAI Global distingue explicitement données locales, APIs live, imports et estimations. Une donnée externe n’est pas présentée comme réelle sans source vérifiable."],
  ["Puis-je déjà importer mes CSV ?", "Le parcours d’import concurrentiel et keywords fait partie de la roadmap v7.1. L’objectif est de conserver source, URL et date de collecte."],
  ["Le logiciel fonctionne-t-il sur mobile ?", "Oui. L’interface est conçue comme PWA responsive avec priorité aux usages smartphone."],
  ["Pourquoi commencer avec des APIs gratuites ?", "Pour réduire la dépendance, valider les workflows et préserver une architecture évolutive avant tout coût premium."],
  ["Le benchmark est-il temps réel ?", "Non. Il est indicatif et sert à comparer les positionnements fonctionnels sans inventer de métriques live."]
];

export default function AProposPage() {
  const [active, setActive] = useState("vision");
  const [openFaq, setOpenFaq] = useState(0);

  const tabs = [
    ["vision", "🚀 Vision"],
    ["features", "🧩 Modules"],
    ["guide", "⚡ 5 minutes"],
    ["trust", "🛡️ Confiance"],
    ["benchmark", "🏆 Benchmark"],
    ["roadmap", "🛣️ Suite"],
    ["faq", "❓ FAQ"]
  ];

  const go = (id) => {
    setActive(id);
    requestAnimationFrame(() => {
      document.getElementById("presentation-content")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  };

  return (
    <div className="apropos-presentation" style={{ display: "grid", gap: 18 }}>
      <section style={hero}>
        <div style={badge}>TradeAI Global v7 · API-first gratuite · PWA mobile</div>
        <h1 style={h1}>Analysez avant d’investir. Comparez avant de décider.</h1>
        <p style={lead}>
          TradeAI Global centralise rentabilité, sourcing, stock, scénarios et provenance
          pour transformer des hypothèses e-commerce en décisions plus structurées.
        </p>

        <div style={ctaRow}>
          <button style={primaryCta} onClick={() => go("guide")}>⚡ Démarrer en 5 minutes</button>
          <button style={secondaryCta} onClick={() => go("features")}>🧩 Explorer les modules</button>
          <button style={secondaryCta} onClick={() => go("benchmark")}>🏆 Voir le benchmark</button>
        </div>

        <div style={kpiGrid}>
          <Kpi value="0 €" label="Coût API actuel" />
          <Kpi value="5" label="APIs gratuites branchées" />
          <Kpi value="v7" label="Architecture modulaire" />
          <Kpi value="PWA" label="Mobile-ready" />
        </div>
      </section>

      <section style={beforeAfter}>
        <div style={beforeCard}>
          <div style={eyebrow}>SANS PILOTAGE CENTRALISÉ</div>
          <h3 style={h3}>Décisions fragmentées</h3>
          <p style={small}>Coûts dispersés, hypothèses difficiles à comparer, provenance ambiguë et décisions tardives.</p>
        </div>
        <div style={afterCard}>
          <div style={eyebrowGreen}>AVEC TRADEAI GLOBAL</div>
          <h3 style={h3}>Scénarios lisibles</h3>
          <p style={small}>Calculs regroupés, hypothèses comparables, origine des données visible et parcours orienté décision.</p>
        </div>
      </section>

      <nav style={tabsWrap} aria-label="Présentation TradeAI Global">
        {tabs.map(([id, label]) => (
          <button key={id} onClick={() => setActive(id)} style={active === id ? tabActive : tab}>
            {label}
          </button>
        ))}
      </nav>

      <div id="presentation-content">
        {active === "vision" && (
          <section style={card}>
            <h2 style={h2}>🎯 Ce que fait le logiciel</h2>
            <p style={p}>
              Le logiciel centralise prix de vente, coût fournisseur, frais, transport,
              publicité, stock, cash-flow, ROI, marge nette et scoring interne.
            </p>
            <div style={notice}>
              <strong>Principe de production :</strong> donnée locale clairement séparée
              des données live API, imports, caches et futures APIs premium.
            </div>

            <h2 style={{ ...h2, marginTop: 24 }}>👥 Cas d’usage concrets</h2>
            <div style={grid}>
              {USE_CASES.map(([icon, title, desc]) => (
                <article key={title} style={featureCard}>
                  <div style={iconStyle}>{icon}</div>
                  <h3 style={h3}>{title}</h3>
                  <p style={small}>{desc}</p>
                </article>
              ))}
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

        {active === "guide" && (
          <section style={card}>
            <h2 style={h2}>⚡ TradeAI Global en 5 minutes</h2>
            <p style={small}>Un parcours court pour passer d’une idée à un scénario exploitable.</p>
            <div style={stepGrid}>
              {QUICK_START.map(([n, title, desc]) => (
                <article key={n} style={stepCard}>
                  <div style={stepNumber}>{n}</div>
                  <div>
                    <h3 style={h3}>{title}</h3>
                    <p style={{ ...small, marginBottom: 0 }}>{desc}</p>
                  </div>
                </article>
              ))}
            </div>
            <div style={ctaPanel}>
              <strong>Objectif :</strong>
              <span>obtenir une première lecture rentabilité → risque → stock → décision, puis approfondir dans les modules.</span>
              <button style={primaryCta} onClick={() => go("features")}>Explorer les modules →</button>
            </div>
          </section>
        )}

        {active === "trust" && (
          <section style={card}>
            <h2 style={h2}>🛡️ Tableau de confiance des données</h2>
            <p style={small}>Chaque catégorie décrit une provenance différente. Elles ne doivent pas être confondues.</p>
            <div style={{ display: "grid", gap: 10, marginTop: 16 }}>
              {PROVENANCE.map(([type, source, status, color]) => (
                <div key={type} style={trustRow}>
                  <span style={{ ...statusDot, background: color }} />
                  <strong style={{ color: "#E6EDF3" }}>{type}</strong>
                  <span style={small}>{source}</span>
                  <span style={{ ...statusPill, borderColor: color, color }}>{status}</span>
                </div>
              ))}
            </div>
            <div style={{ ...notice, marginTop: 18 }}>
              <strong>Règle :</strong> aucune simulation ne doit être présentée comme une donnée marketplace réelle.
            </div>
          </section>
        )}

        {active === "benchmark" && (
          <section style={card}>
            <h2 style={h2}>🏆 Benchmark concurrence mondiale</h2>
            <p style={small}>
              Benchmark indicatif non temps réel, basé sur le positionnement public connu
              des grandes suites Amazon/e-commerce. Objectif : situer TradeAI Global sans inventer de données live.
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
            <h2 style={h2}>🛣️ Trajectoire produit</h2>
            <p style={small}>Une évolution progressive : consolider la fiabilité avant d’ajouter de nouvelles sources.</p>
            <div style={timeline}>
              {ROADMAP.map(([version, phase, text], i) => (
                <div key={version} style={timelineItem}>
                  <div style={timelineRail}>
                    <span style={timelineDot} />
                    {i < ROADMAP.length - 1 && <span style={timelineLine} />}
                  </div>
                  <div style={roadItem}>
                    <div style={roadHead}>
                      <strong style={{ color: "#FF9900" }}>{version}</strong>
                      <span style={muted}>{phase}</span>
                    </div>
                    <span>{text}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {active === "faq" && (
          <section style={card}>
            <h2 style={h2}>❓ FAQ production</h2>
            <div style={{ display: "grid", gap: 10 }}>
              {FAQ.map(([q, a], i) => (
                <article key={q} style={faqCard}>
                  <button
                    style={faqButton}
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span>{q}</span>
                    <span>{openFaq === i ? "−" : "+"}</span>
                  </button>
                  {openFaq === i && <p style={{ ...small, margin: "0 14px 14px" }}>{a}</p>}
                </article>
              ))}
            </div>
            <div style={{ ...notice, marginTop: 18 }}>
              <strong>Pourquoi gratuit d’abord ?</strong> Pour valider les workflows,
              limiter les dépendances et conserver une base transparente avant toute intégration premium.
            </div>
          </section>
        )}
      </div>
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

const hero = { padding: "clamp(16px,4vw,28px)", borderRadius: 22, background: "radial-gradient(circle at 85% 15%, rgba(255,184,0,.16), transparent 34%), linear-gradient(135deg, rgba(255,153,0,.18), rgba(13,17,23,.98))", border: "1px solid rgba(255,153,0,.45)", boxShadow: "0 20px 60px rgba(0,0,0,.22)" };
const badge = { display: "inline-block", padding: "8px 12px", borderRadius: 999, background: "rgba(255,153,0,.12)", color: "#FF9900", fontWeight: 800, marginBottom: 18 };
const h1 = { fontSize: "clamp(28px,7vw,58px)", lineHeight: 1.04, margin: "0 0 16px", color: "#E6EDF3" };
const lead = { fontSize: 18, lineHeight: 1.65, color: "#C9D1D9", maxWidth: 920 };
const ctaRow = { display: "flex", gap: 10, flexWrap: "wrap", marginTop: 20 };
const primaryCta = { padding: "12px 16px", borderRadius: 12, border: "1px solid #FFB800", background: "linear-gradient(135deg,#FF9900,#FFB800)", color: "#0D1117", fontWeight: 900, cursor: "pointer" };
const secondaryCta = { padding: "12px 16px", borderRadius: 12, border: "1px solid #484F58", background: "rgba(13,17,23,.72)", color: "#E6EDF3", fontWeight: 800, cursor: "pointer" };
const kpiGrid = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 12, marginTop: 22 };
const kpi = { padding: 16, borderRadius: 16, background: "rgba(13,17,23,.72)", border: "1px solid #30363D" };
const kpiValue = { fontSize: 30, fontWeight: 900, color: "#FF9900" };
const beforeAfter = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14 };
const beforeCard = { padding: 18, borderRadius: 18, background: "rgba(248,81,73,.07)", border: "1px solid rgba(248,81,73,.3)" };
const afterCard = { padding: 18, borderRadius: 18, background: "rgba(0,200,83,.07)", border: "1px solid rgba(0,200,83,.3)" };
const eyebrow = { color: "#F85149", fontSize: 11, fontWeight: 900, letterSpacing: 1, marginBottom: 8 };
const eyebrowGreen = { ...eyebrow, color: "#00C853" };
const tabsWrap = { display: "flex", gap: 10, flexWrap: "wrap" };
const tab = { padding: "12px 14px", borderRadius: 12, border: "1px solid #30363D", background: "#1C2128", color: "#E6EDF3", fontWeight: 800, cursor: "pointer" };
const tabActive = { ...tab, background: "linear-gradient(135deg,#FF9900,#FFB800)", color: "#0D1117", border: "1px solid #FFB800" };
const card = { padding: 16, borderRadius: 18, background: "#161B22", border: "1px solid #30363D" };
const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 14 };
const featureCard = { padding: 14, borderRadius: 18, background: "#161B22", border: "1px solid #30363D" };
const iconStyle = { fontSize: 34, marginBottom: 10 };
const h2 = { color: "#FF9900", marginTop: 0 };
const h3 = { color: "#E6EDF3", margin: "0 0 8px" };
const p = { color: "#C9D1D9", lineHeight: 1.7 };
const small = { color: "#C9D1D9", lineHeight: 1.6 };
const muted = { color: "#8B949E", fontSize: 13 };
const notice = { padding: 14, borderLeft: "4px solid #FF9900", borderRadius: 12, background: "rgba(255,153,0,.10)", color: "#E6EDF3" };
const stepGrid = { display: "grid", gap: 12, marginTop: 18 };
const stepCard = { display: "grid", gridTemplateColumns: "42px 1fr", gap: 14, alignItems: "start", padding: 16, borderRadius: 14, background: "#0D1117", border: "1px solid #30363D" };
const stepNumber = { width: 42, height: 42, borderRadius: 14, display: "grid", placeItems: "center", background: "linear-gradient(135deg,#FF9900,#FFB800)", color: "#0D1117", fontWeight: 900 };
const ctaPanel = { display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginTop: 18, padding: 16, borderRadius: 14, background: "rgba(255,153,0,.08)", border: "1px solid rgba(255,153,0,.25)", color: "#C9D1D9" };
const trustRow = { display: "grid", gridTemplateColumns: "10px minmax(64px,96px) 1fr", gap: 10, alignItems: "center", padding: 12, borderRadius: 12, background: "#0D1117", border: "1px solid #30363D" };
const statusDot = { width: 10, height: 10, borderRadius: 999 };
const statusPill = { padding: "4px 7px", borderRadius: 999, border: "1px solid", fontSize: 11, fontWeight: 800 };
const benchCard = { display: "grid", gap: 8, padding: 14, borderRadius: 14, background: "#0D1117", border: "1px solid #30363D" };
const benchText = { color: "#C9D1D9", lineHeight: 1.5 };
const tradeaiBox = { padding: 12, borderRadius: 10, background: "rgba(0,200,83,.10)", color: "#E6EDF3", border: "1px solid rgba(0,200,83,.35)" };
const timeline = { display: "grid", gap: 0, marginTop: 18 };
const timelineItem = { display: "grid", gridTemplateColumns: "26px 1fr", gap: 10, minHeight: 100 };
const timelineRail = { position: "relative", display: "flex", justifyContent: "center" };
const timelineDot = { width: 14, height: 14, marginTop: 16, borderRadius: 999, background: "#FF9900", boxShadow: "0 0 0 5px rgba(255,153,0,.12)", zIndex: 1 };
const timelineLine = { position: "absolute", top: 30, bottom: -16, width: 2, background: "#30363D" };
const roadItem = { display: "grid", gap: 7, padding: 14, marginBottom: 12, borderRadius: 12, background: "#0D1117", border: "1px solid #30363D", color: "#C9D1D9" };
const roadHead = { display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" };
const faqCard = { borderRadius: 12, background: "#0D1117", border: "1px solid #30363D", overflow: "hidden" };
const faqButton = { width: "100%", display: "flex", justifyContent: "space-between", gap: 16, padding: 14, border: 0, background: "transparent", color: "#E6EDF3", textAlign: "left", fontWeight: 800, cursor: "pointer" };
