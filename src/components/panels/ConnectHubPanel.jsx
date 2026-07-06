import React from "react";
import FreeApiLab from "./FreeApiLab";
import CurrencyCenter from "./CurrencyCenter";
import { FREE_CONNECTORS, getFreeConnectorsSummary } from "../../connectors/free/freeConnectorsRegistry";
import { IMPORT_CONNECTORS, getImportConnectorsSummary } from "../../connectors/imports/importConnectorsRegistry";

export default function ConnectHubPanel() {
  const freeSummary = getFreeConnectorsSummary();
  const importSummary = getImportConnectorsSummary();

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={styles.hero}>
        <h2 style={{ margin: 0 }}>TradeAI Connect Hub</h2>
        <div style={styles.muted}>
          Centre des connecteurs gratuits, des données vérifiables et des imports manuels.
        </div>
        <div style={styles.badgeRow}>
          <Badge tone="live">LIVE API quand disponible</Badge>
          <Badge tone="fallback">Fallback local signalé</Badge>
          <Badge tone="planned">Aucune API payante</Badge>
        </div>
      </div>

      <div style={styles.metricsGrid}>
        <Metric label="APIs gratuites" value={freeSummary.total} />
        <Metric label="Actives" value={freeSummary.active} />
        <Metric label="Imports prévus" value={importSummary.total} />
        <Metric label="Coût actuel" value="0 €" />
      </div>

      <Section title="APIs gratuites disponibles">
        {FREE_CONNECTORS.map(connector => (
          <ConnectorCard key={connector.id} connector={connector} sourceType="LIVE_API" />
        ))}
      </Section>

      <Section title="Imports manuels prévus">
        {IMPORT_CONNECTORS.map(connector => (
          <ConnectorCard key={connector.id} connector={connector} sourceType="PLANNED_IMPORT" />
        ))}
      </Section>

      <CurrencyCenter />
      <FreeApiLab />
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div style={styles.metric}>
      <div style={styles.metricLabel}>{label}</div>
      <div style={styles.metricValue}>{value}</div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section style={styles.section}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <div style={styles.cardGrid}>{children}</div>
    </section>
  );
}

function ConnectorCard({ connector, sourceType }) {
  const active = connector.status === "active";
  const blocked = connector.status === "blocked_requires_api_key";
  const resolvedSourceType = sourceType || (active ? "LIVE_API" : blocked ? "BLOCKED_API_KEY" : "PLANNED_IMPORT");
  const statusLabel = active ? "Actif" : blocked ? "Clé API requise" : "Prévu";
  const statusTone = active ? "live" : blocked ? "blocked" : "planned";

  return (
    <div style={styles.connectorCard}>
      <div style={styles.connectorTop}>
        <strong>{connector.name}</strong>
        <Badge tone={statusTone}>{statusLabel}</Badge>
      </div>

      <p style={styles.muted}>{connector.description}</p>

      <div style={styles.metaGrid}>
        <span>Type</span><strong>{connector.type}</strong>
        <span>Coût</span><strong>{connector.free ? "0 €" : blocked ? "Clé requise" : "À vérifier"}</strong>
        <span>Source</span><strong>{resolvedSourceType}</strong>
      </div>

      {connector.endpoint && (
        <div style={styles.endpoint}>
          Endpoint : <code>{connector.endpoint}</code>
        </div>
      )}
    </div>
  );
}

function Badge({ tone = "planned", children }) {
  const colors = {
    live: { color: "#00C853", border: "#00C85355", background: "#00C85312" },
    fallback: { color: "#FFB020", border: "#FFB02055", background: "#FFB02012" },
    blocked: { color: "#FFB020", border: "#FFB02055", background: "#FFB02012" },
    planned: { color: "#8B949E", border: "#8B949E55", background: "#8B949E12" }
  };

  return (
    <span style={{ ...styles.badge, ...colors[tone] }}>
      {children}
    </span>
  );
}

const styles = {
  hero: {
    background: "#1C2128",
    padding: 16,
    borderRadius: 10,
    border: "1px solid #30363D"
  },
  muted: {
    marginTop: 8,
    color: "#8B949E",
    lineHeight: 1.5
  },
  badgeRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    width: "fit-content",
    border: "1px solid",
    borderRadius: 999,
    padding: "4px 8px",
    fontSize: 11,
    fontWeight: 700
  },
  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: 10
  },
  metric: {
    background: "#1C2128",
    border: "1px solid #30363D",
    padding: 12,
    borderRadius: 10
  },
  metricLabel: {
    fontSize: 10,
    color: "#8B949E",
    marginBottom: 4
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 800,
    color: "#FF9900"
  },
  section: {
    background: "#1C2128",
    border: "1px solid #30363D",
    padding: 14,
    borderRadius: 10
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 10
  },
  connectorCard: {
    background: "#0D1117",
    border: "1px solid #30363D",
    borderRadius: 10,
    padding: 12
  },
  connectorTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "center"
  },
  metaGrid: {
    display: "grid",
    gridTemplateColumns: "90px 1fr",
    gap: "6px 10px",
    marginTop: 10,
    fontSize: 13,
    color: "#C9D1D9"
  },
  endpoint: {
    marginTop: 10,
    color: "#8B949E",
    fontSize: 11,
    wordBreak: "break-word"
  }
};
