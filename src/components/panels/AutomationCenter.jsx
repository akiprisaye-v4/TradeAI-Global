import React from "react";

export default function AutomationCenter({ alerts = [] }) {
  const colors = {
    critical: "#FF3D00",
    warning: "#FF9800",
    success: "#00C853"
  };

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div
        style={{
          background: "#1C2128",
          padding: 16,
          borderRadius: 10,
          border: "1px solid #30363D"
        }}
      >
        <h2 style={{ margin: 0 }}>🤖 Centre d'automatisation IA</h2>

        <div style={{ marginTop: 10, color: "#8B949E" }}>
          Agents actifs : 4
        </div>

        <div style={{ marginTop: 5, color: "#8B949E" }}>
          Alertes : {alerts.length}
        </div>
      </div>

      {alerts.map((a, i) => (
        <div
          key={i}
          style={{
            padding: 14,
            borderLeft: `5px solid ${colors[a.severity]}`,
            background: "#1C2128",
            borderRadius: 8
          }}
        >
          <div style={{ fontWeight: 700 }}>{a.title}</div>

          <div style={{ marginTop: 6 }}>
            {a.message}
          </div>

          <div
            style={{
              marginTop: 8,
              color: colors[a.severity],
              fontWeight: 700
            }}
          >
            ➜ {a.action}
          </div>
        </div>
      ))}
    </div>
  );
}
