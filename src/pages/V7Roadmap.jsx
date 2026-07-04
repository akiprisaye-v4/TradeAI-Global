import React from "react";
import { PLUGINS } from "../plugins/pluginRegistry";

const PHASES = [
  {
    phase: "Phase 1 — Stabilisation production",
    status: "Validée",
    tone: "success",
    items: [
      "Build Vite de production validé",
      "Branche v7-dev synchronisée avec le dépôt distant",
      "Nettoyage du branding historique critique",
      "Interface mobile et présentation B2B renforcées",
      "PWA et contrôles de production maintenus"
    ]
  },
  {
    phase: "Phase 2 — Données vérifiables",
    status: "En cours",
    tone: "progress",
    items: [
      "Connecteur de taux de change Frankfurter",
      "Open Food Facts pour les données produit disponibles",
      "REST Countries pour les données pays",
      "Open-Meteo pour les données météorologiques",
      "Nominatim pour la recherche géographique",
      "Suppression des résultats non vérifiables en recherche image",
      "Traçabilité à consolider entre API, imports et données locales"
    ]
  },
  {
    phase: "Phase 3 — Modules métier",
    status: "À finaliser",
    tone: "pending",
    items: [
      "Sourcing global multi-pays avec provenance STATIC_REFERENCE",
      "Analyse prédictive fondée sur LOCAL_ESTIMATE + données vérifiables",
      "Centre d’automatisation",
      "Connect Hub et état réel des intégrations",
      "Affiliation configurable",
      "Opportunités et alertes métier"
    ]
  },
  {
    phase: "Phase 4 — Monétisation",
    status: "Préparée",
    tone: "progress",
    items: [
      "Offre gratuite disponible",
      "Offre Pro à 19,99 € par mois",
      "Offre Elite à 49,99 € par mois",
      "Configuration PayPal manuelle préparée mais inactive",
      "Activation du paiement uniquement avant ouverture publique",
      "Authentification et droits d’accès à finaliser avant facturation"
    ]
  },
  {
    phase: "Phase 5 — Ouverture publique",
    status: "Bloquée jusqu’aux validations finales",
    tone: "blocked",
    items: [
      "Finaliser l’authentification utilisateur",
      "Brancher le paiement réel et sécurisé",
      "Tester les parcours Gratuit, Pro et Elite",
      "Valider les modules annoncés comme opérationnels",
      "Effectuer les tests mobile, desktop et PWA",
      "Réaliser l’audit sécurité et le contrôle préproduction final"
    ]
  }
];

const STATUS_STYLES = {
  success: {
    color: "#9FE3B0",
    background: "rgba(46, 160, 67, 0.14)",
    border: "1px solid rgba(46, 160, 67, 0.35)"
  },
  progress: {
    color: "#F0C36A",
    background: "rgba(210, 153, 34, 0.12)",
    border: "1px solid rgba(210, 153, 34, 0.32)"
  },
  pending: {
    color: "var(--text-secondary)",
    background: "rgba(139, 148, 158, 0.10)",
    border: "1px solid var(--border-color)"
  },
  blocked: {
    color: "#FFB4A8",
    background: "rgba(248, 81, 73, 0.10)",
    border: "1px solid rgba(248, 81, 73, 0.28)"
  }
};

export default function V7Roadmap() {
  const activePlugins = PLUGINS.filter(plugin => plugin.enabled).length;

  return (
    <main className="v7-roadmap-page">
      <section className="v7-roadmap-hero">
        <p className="v7-roadmap-kicker">PRODUCT ROADMAP</p>
        <h1>TradeAI Global v7</h1>
        <p className="v7-roadmap-lead">
          État d’avancement consolidé vers une plateforme SaaS B2B exploitable,
          fondée sur des données traçables et des modules progressivement validés.
        </p>

        <div className="v7-roadmap-summary">
          <div>
            <span>Build production</span>
            <strong>Validé</strong>
          </div>
          <div>
            <span>Plugins actifs</span>
            <strong>{activePlugins}/{PLUGINS.length}</strong>
          </div>
          <div>
            <span>Offre Pro</span>
            <strong>19,99 €/mois</strong>
          </div>
          <div>
            <span>Offre Elite</span>
            <strong>49,99 €/mois</strong>
          </div>
        </div>
      </section>

      <section className="v7-roadmap-section">
        <div className="v7-roadmap-heading">
          <div>
            <p className="v7-roadmap-kicker">ARCHITECTURE</p>
            <h2>Plugins enregistrés</h2>
          </div>
          <p>
            Le statut ci-dessous reflète le registre applicatif. Un plugin actif
            ne signifie pas automatiquement qu’un service externe payant est configuré.
          </p>
        </div>

        <div className="v7-plugin-grid">
          {PLUGINS.map(plugin => (
            <article className="v7-plugin-card" key={plugin.id}>
              <strong>{plugin.name}</strong>
              <span className={plugin.enabled ? "is-active" : "is-inactive"}>
                {plugin.enabled ? "Actif" : "Inactif"}
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="v7-roadmap-section">
        <div className="v7-roadmap-heading">
          <div>
            <p className="v7-roadmap-kicker">EXECUTION</p>
            <h2>Feuille de route consolidée</h2>
          </div>
          <p>
            Les statuts distinguent ce qui est validé, en cours, préparé ou encore
            bloquant avant l’ouverture publique.
          </p>
        </div>

        <div className="v7-phase-grid">
          {PHASES.map(block => (
            <article className="v7-phase-card" key={block.phase}>
              <div className="v7-phase-header">
                <h3>{block.phase}</h3>
                <span style={STATUS_STYLES[block.tone]}>
                  {block.status}
                </span>
              </div>

              <ul>
                {block.items.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="v7-roadmap-note">
        <strong>Principe de mise en production</strong>
        <p>
          Aucun paiement automatique ne doit être activé avant validation de
          l’authentification, des droits d’accès, des parcours d’abonnement,
          des conditions commerciales et des contrôles de sécurité.
        </p>
      </section>
    </main>
  );
}
