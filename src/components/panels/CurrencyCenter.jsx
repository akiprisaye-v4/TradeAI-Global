import React, { useEffect, useState } from "react";
import { getLatestRates } from "../../connectors/free/frankfurterApi";

export default function CurrencyCenter() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getLatestRates()
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) {
    return <div>Chargement des devises…</div>;
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <h2>💱 Devises en temps réel</h2>

      <div>Base : {data.base}</div>

      <div>Date : {data.date}</div>

      {Object.entries(data.rates).map(([code, value]) => (
        <div
          key={code}
          style={{
            background: "#1C2128",
            padding: 10,
            borderRadius: 8
          }}
        >
          <strong>{code}</strong> : {value}
        </div>
      ))}
    </div>
  );
}
