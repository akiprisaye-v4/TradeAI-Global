import React from "react";
import { NAV_ITEMS } from "../config/navigation";

export default function AppLayout({ activeTab, setActiveTab, children }) {
  return (
    <div style={{ minHeight: "100vh", background: "#0D1117", color: "#E6EDF3" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "#161B22", borderBottom: "1px solid #21262D", padding: 12 }}>
        <div style={{ fontWeight: 800, marginBottom: 10 }}>
          TradeAI <span style={{ color: "#FF9900" }}>Global</span>
        </div>

        <nav style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4 }}>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                whiteSpace: "nowrap",
                padding: "8px 12px",
                borderRadius: 20,
                border: "none",
                background: activeTab === item.id ? "#FF9900" : "#21262D",
                color: activeTab === item.id ? "#0D1117" : "#E6EDF3",
                fontWeight: 700
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: 16 }}>
        {children}
      </main>
    </div>
  );
}
