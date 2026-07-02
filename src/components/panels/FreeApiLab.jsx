import React, { useState } from "react";
import { searchProductByBarcode } from "../../connectors/free/openFoodFactsApi";
import { getAllCountries } from "../../connectors/free/restCountriesApi";
import { geocodePlace } from "../../connectors/free/nominatimApi";
import { getWeatherForecast } from "../../connectors/free/openMeteoApi";

export default function FreeApiLab() {
  const [barcode, setBarcode] = useState("3256222234564");
  const [place, setPlace] = useState("Paris");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function run(label, fn) {
    try {
      setLoading(true);
      const data = await fn();
      setResult({ label, data });
    } catch (e) {
      setResult({ label: "Erreur", data: e.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <h2>🧪 Laboratoire APIs gratuites</h2>

      <div style={{ display: "grid", gap: 10, background: "#1C2128", padding: 14, borderRadius: 10 }}>
        <input value={barcode} onChange={e => setBarcode(e.target.value)} placeholder="Code EAN" />
        <button onClick={() => run("Open Food Facts", () => searchProductByBarcode(barcode))}>
          🍎 Tester EAN
        </button>

        <input value={place} onChange={e => setPlace(e.target.value)} placeholder="Ville / pays / port" />
        <button onClick={() => run("Nominatim", () => geocodePlace(place))}>
          🗺️ Géocoder
        </button>

        <button onClick={() => run("REST Countries", () => getAllCountries())}>
          🌍 Charger pays
        </button>

        <button onClick={() => run("Open-Meteo Paris", () => getWeatherForecast(48.8566, 2.3522))}>
          🌤️ Météo Paris
        </button>
      </div>

      {loading && <div>Chargement…</div>}

      {result && (
        <pre style={{ background: "#0D1117", padding: 12, borderRadius: 10, overflow: "auto", maxHeight: 420 }}>
{JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
