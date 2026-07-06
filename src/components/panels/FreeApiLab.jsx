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

  async function run(label, source, fn) {
    try {
      setLoading(true);
      const data = await fn();
      setResult({ label, provenance: "LIVE_API", source, data });
    } catch (error) {
      setResult({
        label,
        provenance: "ERROR",
        source,
        error: error?.message || "Erreur inconnue"
      });
    } finally {
      setLoading(false);
    }
  }

  async function runHealthCheck() {
    const checks = [
      ["Open Food Facts", "world.openfoodfacts.org", () => searchProductByBarcode(barcode)],
      ["Nominatim", "nominatim.openstreetmap.org", () => geocodePlace(place)],
      ["REST Countries", "restcountries.com", () => getAllCountries()],
      ["Open-Meteo", "api.open-meteo.com", () => getWeatherForecast(48.8566, 2.3522)]
    ];

    setLoading(true);

    try {
      const results = await Promise.all(
        checks.map(async ([label, source, fn]) => {
          try {
            const data = await fn();
            return {
              label,
              source,
              provenance: "LIVE_API",
              ok: true,
              checkedAt: new Date().toISOString(),
              sample:
                Array.isArray(data) ? { type: "array", count: data.length } :
                data && typeof data === "object" ? { type: "object", keys: Object.keys(data).slice(0, 8) } :
                { type: typeof data }
            };
          } catch (error) {
            return {
              label,
              source,
              provenance: "ERROR",
              ok: false,
              checkedAt: new Date().toISOString(),
              error: error?.message || "Erreur inconnue"
            };
          }
        })
      );

      setResult({
        label: "Health check APIs gratuites",
        provenance: results.every(item => item.ok) ? "LIVE_API" : "ERROR",
        source: "multi-connectors",
        summary: {
          total: results.length,
          ok: results.filter(item => item.ok).length,
          failed: results.filter(item => !item.ok).length
        },
        results
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section style={styles.card}>
      <div style={styles.header}>
        <h2 style={{ margin: 0 }}>Laboratoire APIs gratuites</h2>
        <Badge tone="live">Tests directs LIVE API</Badge>
      </div>

      <div style={styles.muted}>
        Ces boutons appellent des APIs gratuites réelles. Les erreurs réseau sont affichées explicitement.
      </div>

      <div style={styles.form}>
        <input style={styles.input} value={barcode} onChange={e => setBarcode(e.target.value)} placeholder="Code EAN" />
        <button style={styles.button} onClick={() => run("Open Food Facts", "world.openfoodfacts.org", () => searchProductByBarcode(barcode))}>
          Tester EAN
        </button>

        <input style={styles.input} value={place} onChange={e => setPlace(e.target.value)} placeholder="Ville / pays / port" />
        <button style={styles.button} onClick={() => run("Nominatim", "nominatim.openstreetmap.org", () => geocodePlace(place))}>
          🗺️ Géocoder
        </button>

        <button style={styles.button} onClick={() => run("REST Countries", "restcountries.com", () => getAllCountries())}>
          🌍 Charger pays
        </button>

        <button style={styles.button} onClick={() => run("Open-Meteo Paris", "api.open-meteo.com", () => getWeatherForecast(48.8566, 2.3522))}>
          Tester météo Paris
        </button>

        <button style={{ ...styles.button, ...styles.primaryButton }} onClick={runHealthCheck}>
          Vérifier toutes les APIs gratuites
        </button>
      </div>

      {loading && <div style={styles.muted}>Chargement…</div>}

      {result && (
        <div style={styles.resultWrap}>
          <div style={styles.resultHeader}>
            <strong>{result.label}</strong>
            <Badge tone={result.provenance === "LIVE_API" ? "live" : "error"}>
              {result.provenance}
            </Badge>
          </div>
          <div style={styles.muted}>Source : {result.source}</div>
          <pre style={styles.pre}>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </section>
  );
}

function Badge({ tone = "live", children }) {
  const style = tone === "error" ? styles.errorBadge : styles.liveBadge;
  return <span style={{ ...styles.badge, ...style }}>{children}</span>;
}

const styles = {
  card: {
    display: "grid",
    gap: 14,
    background: "#1C2128",
    border: "1px solid #30363D",
    borderRadius: 10,
    padding: 14
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
    flexWrap: "wrap"
  },
  muted: {
    color: "#8B949E",
    fontSize: 13,
    lineHeight: 1.5
  },
  form: {
    display: "grid",
    gap: 10
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: 10,
    borderRadius: 8,
    border: "1px solid #30363D"
  },
  button: {
    width: "100%",
    padding: 10,
    borderRadius: 8,
    border: "1px solid #30363D",
    cursor: "pointer"
  },
  primaryButton: {
    background: "#FF9900",
    color: "#0D1117",
    borderColor: "#FF9900",
    fontWeight: 800
  },
  resultWrap: {
    background: "#0D1117",
    border: "1px solid #30363D",
    borderRadius: 10,
    padding: 12
  },
  resultHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "center"
  },
  pre: {
    background: "#0D1117",
    padding: 12,
    borderRadius: 10,
    overflow: "auto",
    maxHeight: 420,
    border: "1px solid #30363D"
  },
  badge: {
    border: "1px solid",
    borderRadius: 999,
    padding: "4px 8px",
    fontSize: 11,
    fontWeight: 800
  },
  liveBadge: {
    color: "#00C853",
    borderColor: "#00C85355",
    background: "#00C85312"
  },
  errorBadge: {
    color: "#FF3D00",
    borderColor: "#FF3D0055",
    background: "#FF3D0012"
  }
};
