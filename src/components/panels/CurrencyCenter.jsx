import React, { useEffect, useState } from "react";
import { fetchFrankfurterRates, getLocalFxFallback } from "../../connectors/free/frankfurterApi";

export default function CurrencyCenter() {
  const [data, setData] = useState(getLocalFxFallback());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetchFrankfurterRates()
      .then(result => {
        if (mounted) setData(result);
      })
      .catch(() => {
        if (mounted) setData(getLocalFxFallback());
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const isLive = data.mode === "live";

  return (
    <section style={styles.card}>
      <div style={styles.header}>
        <h2 style={{ margin: 0 }}>💱 Devises</h2>
        <span style={{ ...styles.badge, ...(isLive ? styles.live : styles.fallback) }}>
          {isLive ? "LIVE API" : "FALLBACK LOCAL"}
        </span>
      </div>

      <div style={styles.muted}>
        Source : {data.source || (isLive ? "frankfurter" : "local-fallback")}
      </div>
      <div style={styles.muted}>Mode : {isLive ? "Temps réel" : "Fallback local"}</div>
      <div style={styles.muted}>Base : {data.base}</div>
      {data.date && <div style={styles.muted}>Date : {data.date}</div>}
      {loading && <div style={styles.muted}>Chargement des taux…</div>}

      <div style={styles.rates}>
        {Object.entries(data.rates || {}).slice(0, 20).map(([code, value]) => (
          <div key={code} style={styles.rate}>
            <strong>{code}</strong> : {value}
          </div>
        ))}
      </div>
    </section>
  );
}

const styles = {
  card: {
    display: "grid",
    gap: 10,
    background: "#1C2128",
    border: "1px solid #30363D",
    borderRadius: 10,
    padding: 14
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "center"
  },
  muted: {
    color: "#8B949E",
    fontSize: 13
  },
  badge: {
    border: "1px solid",
    borderRadius: 999,
    padding: "4px 8px",
    fontSize: 11,
    fontWeight: 800
  },
  live: {
    color: "#00C853",
    borderColor: "#00C85355",
    background: "#00C85312"
  },
  fallback: {
    color: "#FFB020",
    borderColor: "#FFB02055",
    background: "#FFB02012"
  },
  rates: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: 8,
    marginTop: 8
  },
  rate: {
    background: "#0D1117",
    padding: 10,
    borderRadius: 8,
    border: "1px solid #30363D"
  }
};
