import React, { useEffect, useState } from "react";

export default function HistoriquePage({
  saveCurrentToHistory,
  safeStorageGet,
  MARKETPLACES,
  profitColor,
  fmt
}) {
  const [history, setHistory] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await safeStorageGet("history");
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) setHistory(parsed);
        }
      } catch (e) {
      } finally {
        setLoaded(true);
      }
    })();
  }, [safeStorageGet]);

  const handleSave = async () => {
    const newHistory = await saveCurrentToHistory();
    if (newHistory) setHistory(newHistory);
  };

  if (!loaded) {
    return <div style={{ textAlign:"center", padding:"40px 0", color:"#484F58" }}>Chargement…</div>;
  }

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom: 14 }}>
        <div style={{ fontSize: 10, color:"#8B949E" }}>{history.length} calcul(s)</div>
        <button onClick={handleSave} style={{ background:"#FF9900", border:"none", borderRadius: 7, padding:"7px 12px", color:"#0D1117", fontWeight: 700, fontSize: 11, cursor:"pointer" }}>
          💾 Sauvegarder
        </button>
      </div>

      {history.length === 0 ? (
        <div style={{ textAlign:"center", padding:"60px 0", color:"#484F58" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🕐</div>
          <div style={{ fontSize: 14, marginBottom: 6 }}>Aucun calcul sauvegardé</div>
        </div>
      ) : history.map((h, i) => {
        const col = profitColor(h.margin);
        return (
          <div key={i} style={{ background:"#161B22", border:"1px solid #21262D", borderRadius: 10, padding:"14px 16px", marginBottom: 8 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{h.name}</div>
                <div style={{ fontSize: 10, color:"#484F58" }}>{h.date} · {MARKETPLACES[h.marketplace]?.label || h.marketplace}</div>
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: col }}>{h.profit >= 0 ? "+" : ""}{fmt(h.profit, h.sym)}/u</div>
            </div>

            <div style={{ display:"flex", gap: 14, flexWrap:"wrap" }}>
              <span style={{ fontSize: 11, color: col, fontWeight: 700 }}>Marge {h.margin}%</span>
              <span style={{ fontSize: 11, color:"#8B949E" }}>ROI {h.roi}%</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
