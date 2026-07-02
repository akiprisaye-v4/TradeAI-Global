import React from "react";
import { TRADEAI_MODULES } from "../modules/registry";
import { TRADEAI_CONFIG } from "../config/tradeai.config";

export default function TradeAIEcosystem() {
  return (
    <div style={{ padding: 20 }}>
      <h1>🌐 TradeAI Global Ecosystem</h1>
      <p style={{ color: "var(--text-secondary)" }}>
        Mode actuel : <b>{TRADEAI_CONFIG.mode}</b> — aucune API Amazon requise.
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
        gap: 16,
        marginTop: 20
      }}>
        {TRADEAI_MODULES.map(m => (
          <div key={m.id} style={{
            background: "var(--bg-secondary)",
            borderRadius: 14,
            padding: 18,
            border: "1px solid var(--border-color)"
          }}>
            <div style={{ fontSize: 30 }}>{m.icon}</div>
            <h3>{m.label}</h3>
            <p style={{ color: "var(--text-secondary)" }}>
              Statut : {m.status === "active" ? "Actif" : m.status === "demo" ? "Démo" : "Prévu"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
