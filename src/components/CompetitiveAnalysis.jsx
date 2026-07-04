import React, { useState } from "react";
import competitiveData from "../data/competitiveAnalysis.json";

export default function CompetitiveAnalysis() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [viewMode, setViewMode] = useState("podium"); // podium, table, details

  const ourTool = competitiveData.tools.find(t => t.our_tool);
  const top3 = competitiveData.tools.sort((a, b) => b.scores.global - a.scores.global).slice(0, 3);

  const renderStars = (score) => {
    const stars = Math.round(score / 20);
    return "⭐".repeat(stars) + "☆".repeat(5 - stars);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "#00C853";
    if (score >= 75) return "#FFB800";
    if (score >= 60) return "#FF9900";
    return "#FF3D00";
  };

  return (
    <div style={{ padding: 20, maxWidth: 1400, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <h1 style={{ color: "var(--text-primary)", marginBottom: 10 }}>
          🏆 Podium Comparatif Mondial
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 16 }}>
          Comparatif indicatif d’outils Amazon FBA en {competitiveData.last_update}
        </p>
      </div>

      {/* Navigation */}
      <div style={{
        display: "flex",
        gap: 10,
        marginBottom: 30,
        justifyContent: "center",
        flexWrap: "wrap"
      }}>
        {[
          { id: "podium", name: "🏆 Podium", icon: "🏆" },
          { id: "table", name: "📊 Tableau", icon: "📊" },
          { id: "details", name: "📝 Détails", icon: "📝" }
        ].map(mode => (
          <button
            key={mode.id}
            onClick={() => setViewMode(mode.id)}
            style={{
              padding: "12px 24px",
              background: viewMode === mode.id ? "var(--accent)" : "var(--bg-card)",
              color: viewMode === mode.id ? "#0D1117" : "var(--text-primary)",
              border: "1px solid var(--border-color)",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            {mode.name}
          </button>
        ))}
      </div>

      {/* Vue Podium */}
      {viewMode === "podium" && (
        <div>
          {/* Podium Top 3 */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            gap: 20,
            marginBottom: 50,
            flexWrap: "wrap"
          }}>
            {/* 2ème place */}
            <div style={{
              background: "linear-gradient(135deg, rgba(192, 192, 192, 0.2) 0%, rgba(192, 192, 192, 0.1) 100%)",
              border: "3px solid #C0C0C0",
              borderRadius: 16,
              padding: 20,
              width: 280,
              textAlign: "center",
              transform: "translateY(40px)"
            }}>
              <div style={{ fontSize: 48, marginBottom: 10 }}>{top3[1].logo}</div>
              <h3 style={{ color: "#C0C0C0", marginBottom: 10 }}>2ème Place</h3>
              <h2 style={{ color: "var(--text-primary)", marginBottom: 10 }}>{top3[1].name}</h2>
              <div style={{ fontSize: 32, fontWeight: "bold", color: getScoreColor(top3[1].scores.global), marginBottom: 10 }}>
                {top3[1].scores.global}/100
              </div>
              <div style={{ marginBottom: 15 }}>{renderStars(top3[1].scores.global)}</div>
              <div style={{ fontSize: 14, color: "var(--text-secondary)" }}>
                {top3[1].pricing.pro}
              </div>
            </div>

            {/* 1ère place - Notre outil */}
            <div style={{
              background: "linear-gradient(135deg, rgba(255, 215, 0, 0.3) 0%, rgba(255, 215, 0, 0.1) 100%)",
              border: "4px solid #FFD700",
              borderRadius: 20,
              padding: 30,
              width: 320,
              textAlign: "center",
              boxShadow: "0 10px 40px rgba(255, 215, 0, 0.3)"
            }}>
              <div style={{
                position: "absolute",
                top: -15,
                left: "50%",
                transform: "translateX(-50%)",
                background: "#FFD700",
                color: "#0D1117",
                padding: "5px 20px",
                borderRadius: 20,
                fontWeight: "bold",
                fontSize: 14
              }}>
                🥇 RAPPORT FONCTIONNALITÉS/PRIX INDICATIF
              </div>
              <div style={{ fontSize: 64, marginBottom: 10 }}>{top3[2].logo}</div>
              <h3 style={{ color: "#FFD700", marginBottom: 10 }}>1ère Place</h3>
              <h2 style={{ color: "var(--text-primary)", marginBottom: 10 }}>{top3[2].name}</h2>
              <div style={{ fontSize: 48, fontWeight: "bold", color: getScoreColor(top3[2].scores.global), marginBottom: 10 }}>
                {top3[2].scores.global}/100
              </div>
              <div style={{ marginBottom: 15 }}>{renderStars(top3[2].scores.global)}</div>
              <div style={{ fontSize: 16, color: "#00C853", fontWeight: "bold", marginBottom: 10 }}>
                {top3[2].pricing.starter}
              </div>
              <div style={{ fontSize: 14, color: "var(--text-secondary)" }}>
                jusqu'à {top3[2].pricing.pro}
              </div>
            </div>

            {/* 3ème place */}
            <div style={{
              background: "linear-gradient(135deg, rgba(205, 127, 50, 0.2) 0%, rgba(205, 127, 50, 0.1) 100%)",
              border: "3px solid #CD7F32",
              borderRadius: 16,
              padding: 20,
              width: 280,
              textAlign: "center",
              transform: "translateY(80px)"
            }}>
              <div style={{ fontSize: 48, marginBottom: 10 }}>{top3[0].logo}</div>
              <h3 style={{ color: "#CD7F32", marginBottom: 10 }}>3ème Place</h3>
              <h2 style={{ color: "var(--text-primary)", marginBottom: 10 }}>{top3[0].name}</h2>
              <div style={{ fontSize: 32, fontWeight: "bold", color: getScoreColor(top3[0].scores.global), marginBottom: 10 }}>
                {top3[0].scores.global}/100
              </div>
              <div style={{ marginBottom: 15 }}>{renderStars(top3[0].scores.global)}</div>
              <div style={{ fontSize: 14, color: "var(--text-secondary)" }}>
                {top3[0].pricing.pro}
              </div>
            </div>
          </div>

          {/* Avantages clés de notre outil */}
          {ourTool && (
            <div style={{
              background: "linear-gradient(135deg, rgba(255, 153, 0, 0.1) 0%, rgba(255, 153, 0, 0.05) 100%)",
              border: "2px solid #FF9900",
              borderRadius: 16,
              padding: 30,
              marginBottom: 30
            }}>
              <h2 style={{ color: "#FF9900", marginBottom: 20, textAlign: "center" }}>
                🌟 Positionnement de {ourTool.name}
              </h2>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: 15
              }}>
                {ourTool.strengths.map((strength, idx) => (
                  <div key={idx} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: 12,
                    background: "var(--bg-card)",
                    borderRadius: 8
                  }}>
                    <span style={{ fontSize: 24 }}>✅</span>
                    <span style={{ color: "var(--text-primary)" }}>{strength}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Vue Tableau Comparatif */}
      {viewMode === "table" && (
        <div style={{ overflowX: "auto" }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "var(--bg-card)",
            borderRadius: 12,
            overflow: "hidden"
          }}>
            <thead style={{ background: "var(--accent)" }}>
              <tr>
                <th style={{ padding: 15, textAlign: "left", color: "#0D1117" }}>Outil</th>
                <th style={{ padding: 15, textAlign: "center", color: "#0D1117" }}>Score</th>
                <th style={{ padding: 15, textAlign: "center", color: "#0D1117" }}>Prix</th>
                <th style={{ padding: 15, textAlign: "center", color: "#0D1117" }}>Marketplaces</th>
                <th style={{ padding: 15, textAlign: "center", color: "#0D1117" }}>IA</th>
                <th style={{ padding: 15, textAlign: "center", color: "#0D1117" }}>Version Gratuite</th>
              </tr>
            </thead>
            <tbody>
              {competitiveData.tools.sort((a, b) => b.scores.global - a.scores.global).map((tool, idx) => (
                <tr key={idx} style={{
                  background: tool.our_tool ? "rgba(255, 153, 0, 0.1)" : "transparent",
                  borderBottom: "1px solid var(--border-color)"
                }}>
                  <td style={{ padding: 15 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 24 }}>{tool.logo}</span>
                      <div>
                        <div style={{ fontWeight: "bold", color: tool.our_tool ? "#FF9900" : "var(--text-primary)" }}>
                          {tool.name}
                        </div>
                        {tool.our_tool && (
                          <div style={{ fontSize: 12, color: "#00C853" }}>⭐ Notre outil</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: 15, textAlign: "center" }}>
                    <span style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: getScoreColor(tool.scores.global)
                    }}>
                      {tool.scores.global}/100
                    </span>
                  </td>
                  <td style={{ padding: 15, textAlign: "center", color: "var(--text-secondary)" }}>
                    {tool.pricing.starter === "Gratuit" ? (
                      <span style={{ color: "#00C853", fontWeight: "bold" }}>Gratuit</span>
                    ) : (
                      tool.pricing.starter
                    )}
                  </td>
                  <td style={{ padding: 15, textAlign: "center", color: "var(--text-secondary)" }}>
                    {tool.features.multi_marketplaces}
                  </td>
                  <td style={{ padding: 15, textAlign: "center" }}>
                    {tool.features.ia_integration ? "✅" : "❌"}
                  </td>
                  <td style={{ padding: 15, textAlign: "center" }}>
                    {tool.pricing.free ? "✅" : "❌"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Vue Détails */}
      {viewMode === "details" && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: 20
        }}>
          {competitiveData.tools.map((tool, idx) => (
            <div key={idx} style={{
              background: tool.our_tool ? "linear-gradient(135deg, rgba(255, 153, 0, 0.1) 0%, rgba(255, 153, 0, 0.05) 100%)" : "var(--bg-card)",
              border: tool.our_tool ? "2px solid #FF9900" : "1px solid var(--border-color)",
              borderRadius: 12,
              padding: 20
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 15 }}>
                <span style={{ fontSize: 40 }}>{tool.logo}</span>
                <div>
                  <h3 style={{ color: tool.our_tool ? "#FF9900" : "var(--text-primary)", margin: 0 }}>
                    {tool.name}
                  </h3>
                  {tool.our_tool && (
                    <span style={{ fontSize: 12, color: "#00C853", fontWeight: "bold" }}>
                      ⭐ Notre choix
                    </span>
                  )}
                </div>
              </div>

              {/* Scores */}
              <div style={{ marginBottom: 15 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ color: "var(--text-secondary)" }}>Score Global</span>
                  <span style={{ fontWeight: "bold", color: getScoreColor(tool.scores.global) }}>
                    {tool.scores.global}/100
                  </span>
                </div>
                <div style={{
                  width: "100%",
                  height: 8,
                  background: "var(--bg-tertiary)",
                  borderRadius: 4,
                  overflow: "hidden"
                }}>
                  <div style={{
                    width: `${tool.scores.global}%`,
                    height: "100%",
                    background: getScoreColor(tool.scores.global),
                    transition: "width 0.3s"
                  }} />
                </div>
              </div>

              {/* Prix */}
              <div style={{
                background: "var(--bg-tertiary)",
                padding: 10,
                borderRadius: 8,
                marginBottom: 15
              }}>
                <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 5 }}>Tarifs</div>
                <div style={{ fontSize: 14, color: "var(--text-primary)" }}>
                  {tool.pricing.starter === "Gratuit" ? (
                    <span style={{ color: "#00C853", fontWeight: "bold" }}>Version gratuite disponible</span>
                  ) : (
                    `À partir de ${tool.pricing.starter}`
                  )}
                </div>
              </div>

              {/* Points forts */}
              <div style={{ marginBottom: 15 }}>
                <h4 style={{ color: "var(--text-primary)", marginBottom: 10 }}>Points Forts</h4>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {tool.strengths.slice(0, 3).map((strength, i) => (
                    <li key={i} style={{ color: "var(--text-secondary)", marginBottom: 5, fontSize: 14 }}>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Points faibles */}
              <div>
                <h4 style={{ color: "var(--text-primary)", marginBottom: 10 }}>Points Faibles</h4>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {tool.weaknesses.slice(0, 3).map((weakness, i) => (
                    <li key={i} style={{ color: "var(--text-secondary)", marginBottom: 5, fontSize: 14 }}>
                      {weakness}
                    </li>
                  ))}
                </ul>
              </div>

              {tool.our_tool && (
                <button
                  style={{
                    width: "100%",
                    padding: 15,
                    background: "linear-gradient(135deg, #FF9900 0%, #FFB800 100%)",
                    border: "none",
                    borderRadius: 8,
                    color: "#0D1117",
                    fontWeight: "bold",
                    fontSize: 16,
                    cursor: "pointer",
                    marginTop: 15
                  }}
                >
                  🚀 Essayer Gratuitement
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
