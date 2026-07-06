import React, { useState } from 'react';

// 1. Projection sur volume
export const VolumeProjections = ({ margin }) => {
  if (!margin) return null;

  const volumes = [50, 100, 200, 500, 1000];

  return (
    <div style={{
      marginTop: 16,
      padding: 16,
      background: "rgba(59,130,246,0.1)",
      border: "1px solid #3B82F633",
      borderRadius: 8
    }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#3B82F6", marginBottom: 12, textAlign: "center" }}>
        📈 Projection sur volume
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 12 }}>
        {volumes.map(volume => {
          const totalProfit = (parseFloat(margin.profit) * volume).toFixed(2);
          const revenue = (parseFloat(margin.sellingPrice) * volume).toFixed(2);
          const investment = ((parseFloat(margin.costPrice) + 1.5) * volume).toFixed(2);
          const roi = ((parseFloat(margin.profit) / (parseFloat(margin.costPrice) + 1.5)) * 100).toFixed(1);

          return (
            <div key={volume} style={{
              padding: 12,
              background: "#1C2128",
              borderRadius: 8,
              textAlign: "center",
              transition: "all 0.2s",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(59,130,246,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
            >
              <div style={{ fontSize: 10, color: "#8B949E", marginBottom: 6 }}>
                {volume} unités/mois
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#00C853", marginBottom: 4 }}>
                €{totalProfit}
              </div>
              <div style={{ fontSize: 9, color: "#484F58" }}>
                ROI: {roi}%
              </div>
              <div style={{ fontSize: 9, color: "#484F58", marginTop: 2 }}>
                CA: €{revenue}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        marginTop: 12,
        padding: 12,
        background: "rgba(255,153,0,0.1)",
        border: "1px solid #FF990033",
        borderRadius: 6,
        textAlign: "center"
      }}>
        <div style={{ fontSize: 11, color: "#FF9900", fontWeight: 700, marginBottom: 4 }}>
          🎯 Point de rentabilité
        </div>
        <div style={{ fontSize: 13, color: "#E6EDF3" }}>
          Investissement initial récupéré après la vente de{' '}
          <strong style={{ color: "#00C853" }}>
            {Math.ceil(100 / parseFloat(margin.profit))} unités
          </strong>
        </div>
        <div style={{ fontSize: 10, color: "#8B949E", marginTop: 4 }}>
          (Basé sur un investissement initial de €100)
        </div>
      </div>
    </div>
  );
};

// 2. Simulateur de scénarios
export const ScenarioSimulator = ({ margin }) => {
  const [scenario, setScenario] = useState('realistic');

  if (!margin) return null;

  const baseProfit = parseFloat(margin.profit);
  const baseMargin = parseFloat(margin.margin);

  const scenarios = {
    optimistic: {
      label: "😊 Optimiste",
      volume: 200,
      priceMultiplier: 1.1,
      color: "#00C853",
      profit: (baseProfit * 1.2 * 200).toFixed(2),
      margin: (baseMargin * 1.1).toFixed(1)
    },
    realistic: {
      label: "😐 Réaliste",
      volume: 100,
      priceMultiplier: 1.0,
      color: "#FF9900",
      profit: (baseProfit * 100).toFixed(2),
      margin: baseMargin.toFixed(1)
    },
    pessimistic: {
      label: "😟 Pessimiste",
      volume: 50,
      priceMultiplier: 0.9,
      color: "#FF3D00",
      profit: (baseProfit * 0.8 * 50).toFixed(2),
      margin: (baseMargin * 0.9).toFixed(1)
    }
  };

  return (
    <div style={{
      marginTop: 16,
      padding: 16,
      background: "rgba(139,92,246,0.1)",
      border: "1px solid #8B5CF633",
      borderRadius: 8
    }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#8B5CF6", marginBottom: 12, textAlign: "center" }}>
        🎲 Simulateur de scénarios (hypothèses locales)
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {Object.entries(scenarios).map(([key, data]) => (
          <button
            key={key}
            onClick={() => setScenario(key)}
            style={{
              flex: 1,
              padding: "8px 12px",
              background: scenario === key ? data.color : "#21262D",
              border: "none",
              borderRadius: 6,
              color: scenario === key ? "#0D1117" : "#E6EDF3",
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            {data.label}
          </button>
        ))}
      </div>

      <div style={{
        padding: 16,
        background: "#1C2128",
        borderRadius: 8,
        textAlign: "center"
      }}>
        <div style={{ fontSize: 11, color: "#8B949E", marginBottom: 6 }}>
          Profit mensuel estimé ({scenarios[scenario].volume} unités)
        </div>
        <div style={{ fontSize: 32, fontWeight: 900, color: scenarios[scenario].color, marginBottom: 8 }}>
          €{scenarios[scenario].profit}
        </div>
        <div style={{ fontSize: 12, color: "#8B949E" }}>
          Marge: {scenarios[scenario].margin}%
        </div>
      </div>
    </div>
  );
};

// 3. Analyse de sensibilité (CORRIGÉ : var → variation)
export const SensitivityAnalysis = ({ margin }) => {
  if (!margin) return null;

  const variations = [-20, -10, 0, 10, 20];
  const baseProfit = parseFloat(margin.profit);

  return (
    <div style={{
      marginTop: 16,
      padding: 16,
      background: "rgba(6,182,212,0.1)",
      border: "1px solid #06B6D433",
      borderRadius: 8
    }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#06B6D4", marginBottom: 12, textAlign: "center" }}>
        📊 Analyse de sensibilité
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
        {variations.map(variation => {
          const multiplier = 1 + (variation / 100);
          const newProfit = (baseProfit * multiplier).toFixed(2);
          const isPositive = parseFloat(newProfit) > 0;

          return (
            <div key={variation} style={{
              padding: 10,
              background: "#1C2128",
              borderRadius: 6,
              textAlign: "center"
            }}>
              <div style={{ fontSize: 10, color: variation === 0 ? "#FF9900" : "#8B949E", marginBottom: 4 }}>
                {variation > 0 ? '+' : ''}{variation}%
              </div>
              <div style={{
                fontSize: 13,
                fontWeight: 700,
                color: isPositive ? "#00C853" : "#FF3D00"
              }}>
                €{newProfit}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ fontSize: 9, color: "#8B949E", marginTop: 8, textAlign: "center" }}>
        Impact d'une variation du prix de vente sur le profit unitaire
      </div>
    </div>
  );
};

// 4. Analyse de risque
export const RiskAssessment = ({ margin }) => {
  if (!margin) return null;

  const marginPercent = parseFloat(margin.margin);
  const profit = parseFloat(margin.profit);

  let riskLevel = "high";
  let riskColor = "#FF3D00";
  let riskText = "Risque élevé";
  let riskScore = 2;

  if (marginPercent >= 50 && profit >= 3) {
    riskLevel = "low";
    riskColor = "#00C853";
    riskText = "Faible risque";
    riskScore = 5;
  } else if (marginPercent >= 30 && profit >= 2) {
    riskLevel = "medium";
    riskColor = "#FF9900";
    riskText = "Risque moyen";
    riskScore = 3;
  }

  const factors = [
    { label: "Marge", value: marginPercent >= 40 ? "✅" : marginPercent >= 25 ? "⚠️" : "❌" },
    { label: "Profit/unité", value: profit >= 3 ? "✅" : profit >= 1.5 ? "⚠️" : "❌" },
    { label: "Produit léger", value: "✅" },
    { label: "Forte demande", value: "⚠️" }
  ];

  return (
    <div style={{
      marginTop: 16,
      padding: 16,
      background: "rgba(239,68,68,0.1)",
      border: "1px solid #EF444433",
      borderRadius: 8
    }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#EF4444", marginBottom: 12, textAlign: "center" }}>
        ⚠️ Analyse de risque
      </div>

      <div style={{
        padding: 12,
        background: "#1C2128",
        borderRadius: 8,
        textAlign: "center",
        marginBottom: 12
      }}>
        <div style={{ fontSize: 28, fontWeight: 900, color: riskColor, marginBottom: 4 }}>
          {riskScore}/5
        </div>
        <div style={{ fontSize: 12, color: "#8B949E" }}>
          {riskText}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {factors.map((factor, idx) => (
          <div key={idx} style={{
            padding: 8,
            background: "#0D1117",
            borderRadius: 6,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 11
          }}>
            <span style={{ color: "#8B949E" }}>{factor.label}</span>
            <span>{factor.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// 5. Projection temporelle
export const TimeProjection = ({ margin }) => {
  if (!margin) return null;

  const months = [3, 6, 12];
  const profitPerMonth = parseFloat(margin.profit) * 100;

  return (
    <div style={{
      marginTop: 16,
      padding: 16,
      background: "rgba(16,185,129,0.1)",
      border: "1px solid #10B98133",
      borderRadius: 8
    }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#10B981", marginBottom: 12, textAlign: "center" }}>
        📅 Projection temporelle
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 120, marginBottom: 12 }}>
        {months.map(month => {
          const totalProfit = (profitPerMonth * month).toFixed(2);
          const height = Math.min(100, (month / 12) * 100);

          return (
            <div key={month} style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4
            }}>
              <div style={{
                width: "100%",
                height: `${height}%`,
                background: "linear-gradient(180deg, #10B981 0%, #059669 100%)",
                borderRadius: "4px 4px 0 0",
                transition: "all 0.3s"
              }} />
              <div style={{ fontSize: 10, color: "#8B949E" }}>{month} mois</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#10B981" }}>€{totalProfit}</div>
            </div>
          );
        })}
      </div>

      <div style={{
        padding: 10,
        background: "rgba(0,200,83,0.1)",
        border: "1px solid #00C85333",
        borderRadius: 6,
        textAlign: "center"
      }}>
        <div style={{ fontSize: 11, color: "#00C853", fontWeight: 700 }}>
          🎯 Objectif: €{(profitPerMonth * 12).toFixed(2)} en 12 mois
        </div>
      </div>
    </div>
  );
};

// 6. Heatmap par marketplace
export const MarketplaceHeatmap = ({ margin }) => {
  if (!margin) return null;

  const marketplaces = [
    { code: "FR", label: "🇫🇷 France", multiplier: 1.0, fees: 0.15 },
    { code: "DE", label: "🇩🇪 Allemagne", multiplier: 1.1, fees: 0.15 },
    { code: "UK", label: "🇬🇧 Royaume-Uni", multiplier: 1.2, fees: 0.15 },
    { code: "IT", label: "🇮🇹 Italie", multiplier: 0.9, fees: 0.15 },
    { code: "ES", label: "🇪🇸 Espagne", multiplier: 0.95, fees: 0.15 },
    { code: "US", label: "🇺🇸 USA", multiplier: 1.3, fees: 0.15 }
  ];

  return (
    <div style={{
      marginTop: 16,
      padding: 16,
      background: "rgba(251,146,60,0.1)",
      border: "1px solid #FB923C33",
      borderRadius: 8
    }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#FB923C", marginBottom: 12, textAlign: "center" }}>
        🗺️ Rentabilité par marketplace
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 8 }}>
        {marketplaces.map(mk => {
          const adjustedProfit = (parseFloat(margin.profit) * mk.multiplier).toFixed(2);
          const isProfitable = parseFloat(adjustedProfit) > 0;
          const bgColor = isProfitable ? "rgba(0,200,83,0.15)" : "rgba(255,61,0,0.15)";
          const borderColor = isProfitable ? "#00C853" : "#FF3D00";

          return (
            <div key={mk.code} style={{
              padding: 12,
              background: bgColor,
              border: `1px solid ${borderColor}33`,
              borderRadius: 8,
              textAlign: "center"
            }}>
              <div style={{ fontSize: 12, marginBottom: 4 }}>{mk.label}</div>
              <div style={{
                fontSize: 16,
                fontWeight: 800,
                color: isProfitable ? "#00C853" : "#FF3D00"
              }}>
                €{adjustedProfit}
              </div>
              <div style={{ fontSize: 9, color: "#8B949E" }}>
                Frais: {(mk.fees * 100).toFixed(0)}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 7. Parcours produit (timeline)
export const ProductJourney = ({ margin }) => {
  if (!margin) return null;

  const steps = [
    { label: "Achat", value: `€${margin.costPrice}`, color: "#3B82F6", icon: "🛒" },
    { label: "Shipping", value: `€${margin.shippingCost}`, color: "#8B5CF6", icon: "🚚" },
    { label: "Frais Amazon", value: `€${margin.fees}`, color: "#FF9900", icon: "📦" },
    { label: "Vente", value: `€${margin.sellingPrice}`, color: "#00C853", icon: "💰" },
    { label: "Profit", value: `€${margin.profit}`, color: "#10B981", icon: "🎯" }
  ];

  return (
    <div style={{
      marginTop: 16,
      padding: 16,
      background: "rgba(139,92,246,0.1)",
      border: "1px solid #8B5CF633",
      borderRadius: 8
    }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#8B5CF6", marginBottom: 12, textAlign: "center" }}>
        💰 Parcours du produit
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 4, flexWrap: "wrap" }}>
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <div style={{
              flex: 1,
              minWidth: 80,
              padding: 10,
              background: "#1C2128",
              borderRadius: 8,
              textAlign: "center",
              border: `2px solid ${step.color}33`
            }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{step.icon}</div>
              <div style={{ fontSize: 10, color: "#8B949E", marginBottom: 2 }}>{step.label}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: step.color }}>{step.value}</div>
            </div>
            {idx < steps.length - 1 && (
              <div style={{ fontSize: 16, color: "#8B949E" }}>→</div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// 8. Analyse de saisonnalité
export const SeasonalityAnalysis = ({ margin }) => {
  if (!margin) return null;

  const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"];
  const seasonalityFactors = [0.7, 0.65, 0.75, 0.85, 0.9, 0.85, 0.8, 0.85, 0.95, 1.1, 1.5, 1.8];
  const baseProfit = parseFloat(margin.profit) * 100;

  return (
    <div style={{
      marginTop: 16,
      padding: 16,
      background: "rgba(236,72,153,0.1)",
      border: "1px solid #EC489933",
      borderRadius: 8
    }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#EC4899", marginBottom: 12, textAlign: "center" }}>
        📅 Analyse de saisonnalité
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 6 }}>
        {months.map((month, idx) => {
          const profit = (baseProfit * seasonalityFactors[idx]).toFixed(0);
          const isPeak = seasonalityFactors[idx] >= 1.5;

          return (
            <div key={month} style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4
            }}>
              <div style={{
                width: "100%",
                height: 60,
                background: isPeak
                  ? "linear-gradient(180deg, #EC4899 0%, #BE185D 100%)"
                  : "linear-gradient(180deg, #3B82F6 0%, #1E40AF 100%)",
                borderRadius: "4px 4px 0 0",
                opacity: 0.3 + (seasonalityFactors[idx] / 1.8) * 0.7,
                transition: "all 0.3s"
              }} />
              <div style={{ fontSize: 9, color: "#8B949E" }}>{month}</div>
              <div style={{ fontSize: 8, color: isPeak ? "#EC4899" : "#3B82F6", fontWeight: 700 }}>
                €{profit}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        marginTop: 12,
        padding: 10,
        background: "rgba(236,72,153,0.1)",
        borderRadius: 6,
        textAlign: "center"
      }}>
        <div style={{ fontSize: 11, color: "#EC4899", fontWeight: 700 }}>
          🎄 Pic de ventes: Novembre-Décembre (x1.5 à x1.8)
        </div>
      </div>
    </div>
  );
};

// 9. Comparateur multi-produits (template)
export const MultiProductComparator = ({ margin }) => {
  if (!margin) return null;

  const metrics = [
    { label: "Marge", value: parseFloat(margin.margin), max: 100, unit: "%" },
    { label: "ROI", value: ((parseFloat(margin.profit) / (parseFloat(margin.costPrice) + 1.5)) * 100), max: 500, unit: "%" },
    { label: "Profit", value: parseFloat(margin.profit), max: 10, unit: "€" },
    { label: "Risque", value: 10 - (parseFloat(margin.margin) / 10), max: 10, unit: "/10" }
  ];

  return (
    <div style={{
      marginTop: 16,
      padding: 16,
      background: "rgba(59,130,246,0.1)",
      border: "1px solid #3B82F633",
      borderRadius: 8
    }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#3B82F6", marginBottom: 12, textAlign: "center" }}>
        📊 Score du produit
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        {metrics.map((metric, idx) => {
          const percentage = Math.min(100, (metric.value / metric.max) * 100);
          const color = percentage >= 70 ? "#00C853" : percentage >= 40 ? "#FF9900" : "#FF3D00";

          return (
            <div key={idx}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 4,
                fontSize: 11
              }}>
                <span style={{ color: "#8B949E" }}>{metric.label}</span>
                <span style={{ color: color, fontWeight: 700 }}>
                  {metric.value.toFixed(1)}{metric.unit}
                </span>
              </div>
              <div style={{
                height: 8,
                background: "#1C2128",
                borderRadius: 4,
                overflow: "hidden"
              }}>
                <div style={{
                  width: `${percentage}%`,
                  height: "100%",
                  background: `linear-gradient(90deg, ${color}, ${color}CC)`,
                  borderRadius: 4,
                  transition: "width 0.5s ease"
                }} />
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        marginTop: 12,
        padding: 10,
        background: "rgba(0,200,83,0.1)",
        borderRadius: 6,
        textAlign: "center"
      }}>
        <div style={{ fontSize: 11, color: "#00C853", fontWeight: 700 }}>
          ⭐ Score global: {(metrics.reduce((sum, m) => sum + (m.value / m.max) * 100, 0) / metrics.length).toFixed(0)}/100
        </div>
      </div>
    </div>
  );
};

// 10. Alertes intelligentes
export const SmartAlerts = ({ margin }) => {
  if (!margin) return null;

  const alerts = [];
  const marginPercent = parseFloat(margin.margin);
  const profit = parseFloat(margin.profit);
  const roi = ((profit / (parseFloat(margin.costPrice) + 1.5)) * 100);

  if (marginPercent >= 50) {
    alerts.push({ type: "success", icon: "🎉", message: `Marge exceptionnelle: ${marginPercent.toFixed(1)}%` });
  } else if (marginPercent >= 30) {
    alerts.push({ type: "info", icon: "✅", message: `Bonne marge: ${marginPercent.toFixed(1)}%` });
  } else if (marginPercent < 15) {
    alerts.push({ type: "warning", icon: "⚠️", message: `Marge faible: ${marginPercent.toFixed(1)}%` });
  }

  if (roi >= 100) {
    alerts.push({ type: "success", icon: "🚀", message: `ROI excellent: ${roi.toFixed(0)}%` });
  }

  if (profit >= 3) {
    alerts.push({ type: "success", icon: "💰", message: `Profit unitaire solide: €${profit.toFixed(2)}` });
  }

  if (alerts.length === 0) {
    alerts.push({ type: "info", icon: "ℹ️", message: "Analyse en cours..." });
  }

  return (
    <div style={{
      marginTop: 16,
      padding: 16,
      background: "rgba(251,191,36,0.1)",
      border: "1px solid #FBBF2433",
      borderRadius: 8
    }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#FBBF24", marginBottom: 12, textAlign: "center" }}>
        🚨 Alertes intelligentes
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        {alerts.map((alert, idx) => {
          const bgColor = alert.type === "success" ? "rgba(0,200,83,0.1)" :
                         alert.type === "warning" ? "rgba(255,153,0,0.1)" : "rgba(59,130,246,0.1)";
          const borderColor = alert.type === "success" ? "#00C853" :
                             alert.type === "warning" ? "#FF9900" : "#3B82F6";

          return (
            <div key={idx} style={{
              padding: 10,
              background: bgColor,
              border: `1px solid ${borderColor}33`,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 12
            }}>
              <span style={{ fontSize: 16 }}>{alert.icon}</span>
              <span style={{ color: "#E6EDF3", fontWeight: 600 }}>{alert.message}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default {
  VolumeProjections,
  ScenarioSimulator,
  SensitivityAnalysis,
  RiskAssessment,
  TimeProjection,
  MarketplaceHeatmap,
  ProductJourney,
  SeasonalityAnalysis,
  MultiProductComparator,
  SmartAlerts
};
