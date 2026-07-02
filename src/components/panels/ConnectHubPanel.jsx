import FreeApiLab from "./FreeApiLab";
import CurrencyCenter from "./CurrencyCenter";
import React from "react";
import { FREE_CONNECTORS, getFreeConnectorsSummary } from "../../connectors/free/freeConnectorsRegistry";
import { IMPORT_CONNECTORS, getImportConnectorsSummary } from "../../connectors/imports/importConnectorsRegistry";

export default function ConnectHubPanel() {
  const freeSummary = getFreeConnectorsSummary();
  const importSummary = getImportConnectorsSummary();

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={{ background: "#1C2128", padding: 16, borderRadius: 10, border: "1px solid #30363D" }}>
        <h2 style={{ margin: 0 }}>🔌 TradeAI Connect Hub</h2>
        <div style={{ marginTop: 8, color: "#8B949E" }}>
          Centre des connecteurs gratuits, imports manuels et futures API premium.
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10 }}>
        <Metric label="APIs gratuites" value={freeSummary.total} />
        <Metric label="Actives" value={freeSummary.active} />
        <Metric label="Imports prévus" value={importSummary.total} />
        <Metric label="Coût actuel" value="0 €" />
      </div>

      <Section title="🌍 APIs gratuites disponibles">
        {FREE_CONNECTORS.map(c => (
          <ConnectorCard key={c.id} connector={c} />
        ))}
      </Section>

      <Section title="📥 Imports manuels prévus">
        {IMPORT_CONNECTORS.map(c => (
          <ConnectorCard key={c.id} connector={c} />
        ))}
      </Section>
    
      <CurrencyCenter />

      <FreeApiLab />

</div>
  );

}

function Metric({ label, value }) {
  return (
    <div style={{ background: "#1C2128", border: "1px solid #30363D", padding: 12, borderRadius: 10 }}>
      <div style={{ fontSize: 10, color: "#8B949E", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 800, color: "#FF9900" }}>{value}</div>
    
      <CurrencyCenter />

      <FreeApiLab />

</div>
  );

}

function Section({ title, children }) {
  return (
    <div style={{ background: "#161B22", border: "1px solid #21262D", borderRadius: 10, padding: 14 }}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <div style={{ display: "grid", gap: 10 }}>{children}</div>
    
      <CurrencyCenter />

      <FreeApiLab />

</div>
  );

}

function ConnectorCard({ connector }) {
  const active = connector.status === "active";

  return (
    <div style={{ background: "#1C2128", border: "1px solid #30363D", borderRadius: 8, padding: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
        <div style={{ fontWeight: 800 }}>{connector.name}</div>
        <div style={{ color: active ? "#00C853" : "#FF9800", fontWeight: 700 }}>
          {active ? "Actif" : "Prévu"}
        </div>
      </div>
      <div style={{ marginTop: 6, fontSize: 12, color: "#8B949E" }}>
        {connector.description}
      </div>
      <div style={{ marginTop: 6, fontSize: 11, color: "#6E7681" }}>
        Type : {connector.type}
      </div>
    
      <CurrencyCenter />

      <FreeApiLab />

</div>
  );

}
