import React, { useEffect, useState } from "react";
import { fetchFrankfurterRates, getLocalFxFallback } from "../../connectors/free/frankfurterApi";

export default function CurrencyCenter() {
  const [data, setData] = useState(getLocalFxFallback());

  useEffect(() => {
    let mounted = true;

    fetchFrankfurterRates()
      .then(result => {
        if (mounted) setData(result);
      })
      .catch(() => {
        if (mounted) setData(getLocalFxFallback());
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <h2>💱 Devises</h2>

      <div>Mode : {data.mode === "live" ? "Temps réel" : "Fallback local"}</div>
      <div>Base : {data.base}</div>
      {data.date && <div>Date : {data.date}</div>}

      {Object.entries(data.rates).slice(0, 20).map(([code, value]) => (
        <div key={code} style={{ background: "#1C2128", padding: 10, borderRadius: 8 }}>
          <strong>{code}</strong> : {value}
        </div>
      ))}
    </div>
  );
}
