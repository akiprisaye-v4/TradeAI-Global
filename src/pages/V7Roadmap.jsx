import React from "react";
import { PLUGINS } from "../plugins/pluginRegistry";

export default function V7Roadmap() {
  return (
    <div style={{ padding: 20 }}>
      <h1>🚀 TradeAI Global v7</h1>
      <p style={{ color: "var(--text-secondary)" }}>
        Architecture modulaire prête pour évolution sans API Amazon obligatoire.
      </p>

      <h2>Plugins actifs</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14 }}>
        {PLUGINS.map(p => (
          <div key={p.id} style={{ padding: 16, borderRadius: 14, background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}>
            <strong>{p.name}</strong>
            <p>{p.enabled ? "✅ Activé" : "⏸️ Désactivé"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
