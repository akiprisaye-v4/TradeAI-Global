import React, { useState, useEffect } from "react";
import predictiveData from "../data/predictiveAlgo.json";
import trendsData from "../data/trendsData.json";
import localDB from "../data/localDatabase.json";

export default function SmartInsights() {
  const [activeTab, setActiveTab] = useState("predictive");
  const [bsrInput, setBsrInput] = useState(5000);
  const [categoryInput, setCategoryInput] = useState("Home & Kitchen");
  const [prediction, setPrediction] = useState(null);
  const [nicheResults, setNicheResults] = useState([]);

  // Calcul prédictif des ventes
  const calculateSales = () => {
    const categoryData = predictiveData.bsr_to_sales.categories[categoryInput];
    if (!categoryData) return;

    const { a, b } = categoryData;
    const estimatedSales = Math.round(a * Math.pow(bsrInput, b));
    
    // Appliquer le multiplicateur saisonnier
    const currentMonth = new Date().getMonth() + 1;
    const seasonalMultiplier = predictiveData.seasonal_trends[`Q${Math.ceil(currentMonth / 3)}`].multiplier;
    const adjustedSales = Math.round(estimatedSales * seasonalMultiplier);

    setPrediction({
      bsr: bsrInput,
      category: categoryInput,
      estimatedSales: adjustedSales,
      seasonalNote: predictiveData.seasonal_trends[`Q${Math.ceil(currentMonth / 3)}`].note,
      avgPrice: categoryData.avg_price,
      estimatedRevenue: (adjustedSales * categoryData.avg_price).toFixed(2)
    });
  };

  // Recherche de niches opportunes
  const findOpportunities = () => {
    const opportunities = predictiveData.niche_opportunities.filter(niche => {
      const bsrInRange = bsrInput >= niche.bsr_range[0] && bsrInput <= niche.bsr_range[1];
      return bsrInRange || niche.score >= 80;
    });
    setNicheResults(opportunities);
  };

  // Calcul du score de rentabilité
  const calculateProfitability = (product) => {
    const { bsr, reviews, price, competition } = product;
    
    const bsrScore = bsr < 5000 ? 25 : bsr < 10000 ? 15 : 5;
    const competitionScore = competition === "low" ? 25 : competition === "medium" ? 15 : 5;
    const priceScore = price >= 20 && price <= 70 ? 25 : 10;
    const reviewScore = reviews < 300 ? 15 : reviews < 1000 ? 10 : 5;
    const trendScore = 10;

    const totalScore = bsrScore + competitionScore + priceScore + reviewScore + trendScore;
    
    return {
      score: totalScore,
      recommendation: totalScore >= 70 ? "GO" : totalScore >= 50 ? "MAYBE" : "NO-GO",
      color: totalScore >= 70 ? "#00C853" : totalScore >= 50 ? "#FFB800" : "#FF3D00"
    };
  };

  const tabs = [
    { id: "predictive", name: " Prédictions", icon: "📊" },
    { id: "trends", name: "🔥 Tendances", icon: "🔥" },
    { id: "niches", name: "🎯 Niches", icon: "" },
    { id: "database", name: "💾 Base Locale", icon: "💾" }
  ];

  return (
    <div style={{ padding: 20, maxWidth: 1200, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <h1 style={{ color: "var(--text-primary)", marginBottom: 10 }}>
          🧠 Smart Insights - 100% Gratuit
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 16 }}>
          Algorithmes prédictifs, tendances et opportunités sans API payante
        </p>
      </div>

      {/* Navigation */}
      <div style={{
        display: "flex",
        gap: 10,
        marginBottom: 30,
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "12px 24px",
              background: activeTab === tab.id ? "var(--accent)" : "var(--bg-card)",
              color: activeTab === tab.id ? "#0D1117" : "var(--text-primary)",
              border: "1px solid var(--border-color)",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Prédictions BSR */}
      {activeTab === "predictive" && (
        <div>
          <div style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            borderRadius: 12,
            padding: 25,
            marginBottom: 20
          }}>
            <h2 style={{ color: "var(--text-primary)", marginBottom: 20 }}>
              📊 Calculateur de Ventes par BSR
            </h2>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 15, marginBottom: 20 }}>
              <div>
                <label style={{ color: "var(--text-secondary)", fontSize: 12, display: "block", marginBottom: 5 }}>
                  BSR (Best Seller Rank)
                </label>
                <input
                  type="number"
                  value={bsrInput}
                  onChange={e => setBsrInput(parseInt(e.target.value) || 0)}
                  style={{
                    width: "100%",
                    padding: 12,
                    background: "var(--bg-tertiary)",
                    border: "1px solid var(--border-color)",
                    borderRadius: 6,
                    color: "var(--text-primary)",
                    fontSize: 16
                  }}
                />
              </div>

              <div>
                <label style={{ color: "var(--text-secondary)", fontSize: 12, display: "block", marginBottom: 5 }}>
                  Catégorie
                </label>
                <select
                  value={categoryInput}
                  onChange={e => setCategoryInput(e.target.value)}
                  style={{
                    width: "100%",
                    padding: 12,
                    background: "var(--bg-tertiary)",
                    border: "1px solid var(--border-color)",
                    borderRadius: 6,
                    color: "var(--text-primary)",
                    fontSize: 16
                  }}
                >
                  {Object.keys(predictiveData.bsr_to_sales.categories).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={calculateSales}
              style={{
                width: "100%",
                padding: 15,
                background: "linear-gradient(135deg, #FF9900 0%, #FFB800 100%)",
                border: "none",
                borderRadius: 8,
                color: "#0D1117",
                fontWeight: "bold",
                fontSize: 16,
                cursor: "pointer"
              }}
            >
               Calculer les Ventes Estimées
            </button>

            {prediction && (
              <div style={{
                marginTop: 20,
                background: "linear-gradient(135deg, rgba(255, 153, 0, 0.1) 0%, rgba(255, 184, 0, 0.1) 100%)",
                border: "2px solid #FF9900",
                borderRadius: 12,
                padding: 20
              }}>
                <h3 style={{ color: "#FF9900", marginBottom: 15 }}> Résultats de la Prédiction</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 15 }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ color: "var(--text-secondary)", fontSize: 12 }}>Ventes Mensuelles</div>
                    <div style={{ color: "#FF9900", fontSize: 32, fontWeight: "bold" }}>
                      {prediction.estimatedSales.toLocaleString()}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>unités/mois</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ color: "var(--text-secondary)", fontSize: 12 }}>Revenu Estimé</div>
                    <div style={{ color: "#00C853", fontSize: 32, fontWeight: "bold" }}>
                      {prediction.estimatedRevenue}€
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>par mois</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ color: "var(--text-secondary)", fontSize: 12 }}>Prix Moyen</div>
                    <div style={{ color: "var(--text-primary)", fontSize: 32, fontWeight: "bold" }}>
                      {prediction.avgPrice}€
                    </div>
                  </div>
                </div>
                <div style={{
                  marginTop: 15,
                  padding: 10,
                  background: "rgba(59, 130, 246, 0.1)",
                  borderRadius: 6,
                  textAlign: "center",
                  color: "#3B82F6"
                }}>
                  💡 {prediction.seasonalNote} (multiplicateur appliqué)
                </div>
              </div>
            )}
          </div>

          {/* Formule utilisée */}
          <div style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            borderRadius: 12,
            padding: 20
          }}>
            <h3 style={{ color: "var(--text-primary)", marginBottom: 10 }}>🔬 Formule Utilisée</h3>
            <code style={{
              display: "block",
              background: "var(--bg-tertiary)",
              padding: 15,
              borderRadius: 6,
              color: "var(--text-secondary)",
              fontSize: 14
            }}>
              ventes_mensuelles = {predictiveData.bsr_to_sales.categories[categoryInput]?.a || 0} × BSR^{predictiveData.bsr_to_sales.categories[categoryInput]?.b || 0}
            </code>
            <p style={{ color: "var(--text-secondary)", fontSize: 14, marginTop: 10 }}>
              Précision estimée : ±20% | Basé sur des données historiques open source
            </p>
          </div>
        </div>
      )}

      {/* Tendances */}
      {activeTab === "trends" && (
        <div>
          <h2 style={{ color: "var(--text-primary)", marginBottom: 20 }}>
            🔥 Tendances du Marché 2026
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20, marginBottom: 30 }}>
            {trendsData.trending_categories_2026.map((trend, idx) => (
              <div
                key={idx}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 12,
                  padding: 20
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
                  <h3 style={{ color: "var(--text-primary)", margin: 0 }}>{trend.category}</h3>
                  <span style={{
                    background: trend.estimatedGrowthSignal.startsWith("+") ? "rgba(0, 200, 83, 0.2)" : "rgba(255, 61, 0, 0.2)",
                    color: trend.estimatedGrowthSignal.startsWith("+") ? "#00C853" : "#FF3D00",
                    padding: "4px 12px",
                    borderRadius: 20,
                    fontSize: 14,
                    fontWeight: "bold"
                  }}>
                    Signal estimé Signal estimé {trend.estimatedGrowthSignal}
                  </span>
                </div>

                <div style={{ marginBottom: 15 }}>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 5 }}>Opportunité BSR</div>
                  <div style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: trend.bsr_opportunity === "very_high" ? "#00C853" : 
                           trend.bsr_opportunity === "high" ? "#FFB800" : "#FF9900"
                  }}>
                    {trend.bsr_opportunity === "very_high" ? "🔥 Très élevée" :
                     trend.bsr_opportunity === "high" ? "⬆️ Élevée" : "➡️ Moyenne"}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 5 }}>Mots-clés populaires</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {trend.keywords.map((keyword, i) => (
                      <span key={i} style={{
                        background: "var(--bg-tertiary)",
                        padding: "4px 10px",
                        borderRadius: 12,
                        fontSize: 12,
                        color: "var(--text-primary)"
                      }}>
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Calendrier saisonnier */}
          <div style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            borderRadius: 12,
            padding: 20
          }}>
            <h3 style={{ color: "var(--text-primary)", marginBottom: 15 }}>📅 Calendrier Saisonnier</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10 }}>
              {trendsData.seasonal_calendar.map((month, idx) => (
                <div key={idx} style={{
                  background: "var(--bg-tertiary)",
                  padding: 10,
                  borderRadius: 8,
                  textAlign: "center"
                }}>
                  <div style={{ fontWeight: "bold", color: "var(--text-primary)", marginBottom: 5 }}>
                    {month.month}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 5 }}>
                    {month.events.join(", ")}
                  </div>
                  <div style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: month.multiplier >= 1.5 ? "#00C853" : 
                           month.multiplier >= 1.2 ? "#FFB800" : "var(--text-muted)"
                  }}>
                    ×{month.multiplier}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Niches Opportunes */}
      {activeTab === "niches" && (
        <div>
          <h2 style={{ color: "var(--text-primary)", marginBottom: 20 }}>
            🎯 Niches Rentables Identifiées
          </h2>

          <button
            onClick={findOpportunities}
            style={{
              padding: "12px 24px",
              background: "var(--accent)",
              border: "none",
              borderRadius: 8,
              color: "#0D1117",
              fontWeight: "bold",
              cursor: "pointer",
              marginBottom: 20
            }}
          >
            🔍 Analyser les Opportunités
          </button>

          {nicheResults.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: 20 }}>
              {nicheResults.map((niche, idx) => {
                const profitability = calculateProfitability({
                  bsr: niche.bsr_range[0],
                  reviews: 200,
                  price: (niche.price_range[0] + niche.price_range[1]) / 2,
                  competition: niche.competition
                });

                return (
                  <div
                    key={idx}
                    style={{
                      background: "var(--bg-card)",
                      border: `2px solid ${profitability.color}`,
                      borderRadius: 12,
                      padding: 20
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
                      <h3 style={{ color: "var(--text-primary)", margin: 0 }}>{niche.niche}</h3>
                      <span style={{
                        background: profitability.color,
                        color: "#fff",
                        padding: "4px 12px",
                        borderRadius: 20,
                        fontSize: 14,
                        fontWeight: "bold"
                      }}>
                        {profitability.recommendation}
                      </span>
                    </div>

                    <div style={{ marginBottom: 15 }}>
                      <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 5 }}>Score de Rentabilité</div>
                      <div style={{ fontSize: 32, fontWeight: "bold", color: profitability.color }}>
                        {profitability.score}/100
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 15 }}>
                      <div>
                        <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>BSR Range</div>
                        <div style={{ fontSize: 14, color: "var(--text-primary)", fontWeight: "bold" }}>
                          {niche.bsr_range[0]} - {niche.bsr_range[1]}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>Prix</div>
                        <div style={{ fontSize: 14, color: "var(--text-primary)", fontWeight: "bold" }}>
                          {niche.price_range[0]}€ - {niche.price_range[1]}€
                        </div>
                      </div>
                    </div>

                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: 15,
                      borderTop: "1px solid var(--border-color)"
                    }}>
                      <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                        Concurrence: {niche.competition}
                      </span>
                      <span style={{
                        fontSize: 12,
                        color: niche.trend === "growing" ? "#00C853" : "#FFB800",
                        fontWeight: "bold"
                      }}>
                        {niche.trend === "growing" ? "📈 En croissance" : "➡️ Stable"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {nicheResults.length === 0 && (
            <div style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              borderRadius: 12,
              padding: 40,
              textAlign: "center"
            }}>
              <div style={{ fontSize: 48, marginBottom: 10 }}>🎯</div>
              <p style={{ color: "var(--text-secondary)" }}>
                Cliquez sur "Analyser les Opportunités" pour découvrir les niches rentables
              </p>
            </div>
          )}
        </div>
      )}

      {/* Base de Données Locale */}
      {activeTab === "database" && (
        <div>
          <h2 style={{ color: "var(--text-primary)", marginBottom: 20 }}>
            💾 Base de Données Locale
          </h2>

          <div style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            borderRadius: 12,
            padding: 20,
            marginBottom: 20
          }}>
            <h3 style={{ color: "var(--text-primary)", marginBottom: 15 }}> Produits en Cache</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 15 }}>
              {Object.values(localDB.products).map(product => {
                const profitability = calculateProfitability(product);
                
                return (
                  <div
                    key={product.asin}
                    style={{
                      background: "var(--bg-tertiary)",
                      padding: 15,
                      borderRadius: 8,
                      border: `1px solid ${profitability.color}`
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                      <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{product.asin}</span>
                      <span style={{
                        fontSize: 12,
                        fontWeight: "bold",
                        color: profitability.color
                      }}>
                        {profitability.score}/100
                      </span>
                    </div>
                    <h4 style={{ color: "var(--text-primary)", margin: "0 0 10px 0", fontSize: 14 }}>
                      {product.title}
                    </h4>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: 12 }}>
                      <div>
                        <span style={{ color: "var(--text-secondary)" }}>BSR: </span>
                        <span style={{ color: "var(--text-primary)", fontWeight: "bold" }}>{product.bsr}</span>
                      </div>
                      <div>
                        <span style={{ color: "var(--text-secondary)" }}>Prix: </span>
                        <span style={{ color: "var(--text-primary)", fontWeight: "bold" }}>{product.avg_price}€</span>
                      </div>
                      <div>
                        <span style={{ color: "var(--text-secondary)" }}>Ventes/mois: </span>
                        <span style={{ color: "var(--text-primary)", fontWeight: "bold" }}>{product.estimated_sales_monthly.toLocaleString()}</span>
                      </div>
                      <div>
                        <span style={{ color: "var(--text-secondary)" }}>Concurrence: </span>
                        <span style={{ color: "var(--text-primary)", fontWeight: "bold" }}>{product.competition_level}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{
            background: "linear-gradient(135deg, rgba(0, 200, 83, 0.1) 0%, rgba(0, 200, 83, 0.05) 100%)",
            border: "2px solid #00C853",
            borderRadius: 12,
            padding: 20,
            textAlign: "center"
          }}>
            <h3 style={{ color: "#00C853", marginBottom: 10 }}> Contribuez à la Base</h3>
            <p style={{ color: "var(--text-secondary)", marginBottom: 15 }}>
              Ajoutez vos propres produits pour enrichir la base de données communautaire
            </p>
            <button
              style={{
                padding: "12px 24px",
                background: "#00C853",
                border: "none",
                borderRadius: 8,
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              ➕ Ajouter un Produit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
