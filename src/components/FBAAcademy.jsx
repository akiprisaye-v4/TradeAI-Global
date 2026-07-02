import React, { useState } from "react";
import fbaGuides from "../data/fbaGuides.json";

export default function FBAAcademy() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [completedSteps, setCompletedSteps] = useState({});

  const toggleStep = (categoryId, stepIndex) => {
    const key = `${categoryId}-${stepIndex}`;
    setCompletedSteps(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getProgress = (categoryId, steps) => {
    const completed = steps.filter((_, idx) => 
      completedSteps[`${categoryId}-${idx}`]
    ).length;
    return Math.round((completed / steps.length) * 100);
  };

  if (selectedCategory) {
    const progress = getProgress(selectedCategory.id, selectedCategory.steps);
    
    return (
      <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
        <button
          onClick={() => setSelectedCategory(null)}
          style={{
            background: "var(--bg-tertiary)",
            border: "1px solid var(--border-color)",
            padding: "8px 16px",
            borderRadius: 8,
            color: "var(--text-primary)",
            cursor: "pointer",
            marginBottom: 20
          }}
        >
          ← Retour aux guides
        </button>

        <div style={{ marginBottom: 30 }}>
          <h1 style={{ color: "var(--text-primary)", marginBottom: 10 }}>
            {selectedCategory.icon} {selectedCategory.title}
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 16 }}>
            {selectedCategory.description}
          </p>
          
          <div style={{
            background: "var(--bg-card)",
            padding: 15,
            borderRadius: 12,
            marginTop: 20,
            border: "1px solid var(--border-color)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: "var(--text-primary)", fontWeight: "bold" }}>
                Progression
              </span>
              <span style={{ color: "var(--accent)", fontWeight: "bold" }}>
                {progress}%
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
                width: `${progress}%`,
                height: "100%",
                background: "linear-gradient(135deg, #FF9900 0%, #FFB800 100%)",
                transition: "width 0.3s ease"
              }} />
            </div>
          </div>
        </div>

        {selectedCategory.steps.map((step, idx) => {
          const isCompleted = completedSteps[`${selectedCategory.id}-${idx}`];
          
          return (
            <div
              key={idx}
              style={{
                background: isCompleted ? "rgba(0, 200, 83, 0.1)" : "var(--bg-card)",
                border: isCompleted ? "2px solid #00C853" : "1px solid var(--border-color)",
                borderRadius: 12,
                padding: 20,
                marginBottom: 20
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 15, marginBottom: 15 }}>
                <input
                  type="checkbox"
                  checked={isCompleted}
                  onChange={() => toggleStep(selectedCategory.id, idx)}
                  style={{
                    width: 24,
                    height: 24,
                    cursor: "pointer",
                    marginTop: 4
                  }}
                />
                <h3 style={{
                  color: isCompleted ? "#00C853" : "var(--text-primary)",
                  margin: 0,
                  fontSize: 18
                }}>
                  {step.title}
                </h3>
              </div>
              
              <p style={{
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                marginBottom: 15
              }}>
                {step.content}
              </p>

              {step.checklist && (
                <div style={{
                  background: "var(--bg-tertiary)",
                  padding: 15,
                  borderRadius: 8
                }}>
                  <h4 style={{ color: "var(--text-primary)", marginBottom: 10 }}>
                    Checklist :
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {step.checklist.map((item, i) => (
                      <li key={i} style={{
                        color: "var(--text-secondary)",
                        marginBottom: 5
                      }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}

        {selectedCategory.example && (
          <div style={{
            background: "linear-gradient(135deg, rgba(255, 153, 0, 0.1) 0%, rgba(255, 184, 0, 0.1) 100%)",
            border: "2px solid #FF9900",
            borderRadius: 12,
            padding: 20,
            marginTop: 30
          }}>
            <h3 style={{ color: "#FF9900", marginBottom: 10 }}>
              💡 {selectedCategory.example.title}
            </h3>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
              {selectedCategory.example.content}
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: 20, maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h1 style={{ color: "var(--text-primary)", marginBottom: 10 }}>
          📚 Académie FBA
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 16 }}>
          Maîtrisez Amazon FBA étape par étape avec nos guides complets
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
        gap: 20
      }}>
        {fbaGuides.categories.map((category) => {
          const progress = getProgress(category.id, category.steps);
          
          return (
            <div
              key={category.id}
              onClick={() => setSelectedCategory(category)}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                borderRadius: 12,
                padding: 20,
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
                ":hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.3)"
                }
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 15 }}>
                {category.icon}
              </div>
              
              <h3 style={{
                color: "var(--text-primary)",
                marginBottom: 10,
                fontSize: 18
              }}>
                {category.title}
              </h3>
              
              <p style={{
                color: "var(--text-secondary)",
                marginBottom: 15,
                fontSize: 14
              }}>
                {category.description}
              </p>

              <div style={{ marginBottom: 10 }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 5,
                  fontSize: 12
                }}>
                  <span style={{ color: "var(--text-secondary)" }}>
                    Progression
                  </span>
                  <span style={{ color: "var(--accent)", fontWeight: "bold" }}>
                    {progress}%
                  </span>
                </div>
                <div style={{
                  width: "100%",
                  height: 6,
                  background: "var(--bg-tertiary)",
                  borderRadius: 3,
                  overflow: "hidden"
                }}>
                  <div style={{
                    width: `${progress}%`,
                    height: "100%",
                    background: progress === 100 ? "#00C853" : "linear-gradient(135deg, #FF9900 0%, #FFB800 100%)",
                    transition: "width 0.3s ease"
                  }} />
                </div>
              </div>

              <div style={{
                color: "var(--text-muted)",
                fontSize: 12
              }}>
                {category.steps.length} étapes • {progress === 100 ? "✅ Complété" : `${category.steps.length - Object.keys(completedSteps).filter(k => k.startsWith(category.id)).length} étapes restantes`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
