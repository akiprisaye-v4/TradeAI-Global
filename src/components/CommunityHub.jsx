import React, { useState, useEffect } from "react";
import crowdsourcingData from "../data/crowdsourcing.json";
import gamificationData from "../data/gamification.json";

export default function CommunityHub() {
  const [userPoints, setUserPoints] = useState(0);
  const [userLevel, setUserLevel] = useState(0);
  const [userBadges, setUserBadges] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    asin: "",
    title: "",
    category: "Home & Kitchen",
    bsr: "",
    price: ""
  });

  // Calculer le niveau de l'utilisateur
  useEffect(() => {
    const currentLevel = crowdsourcingData.levels.findIndex(
      (level, idx) => {
        const nextLevel = crowdsourcingData.levels[idx + 1];
        return userPoints >= level.min_points && (!nextLevel || userPoints < nextLevel.min_points);
      }
    );
    setUserLevel(currentLevel >= 0 ? currentLevel : 0);
  }, [userPoints]);

  // Ajouter des points
  const addPoints = (action) => {
    const reward = crowdsourcingData.rewards[action];
    if (reward) {
      setUserPoints(prev => prev + reward.points);
      
      // Vérifier les badges
      const newBadges = [...userBadges];
      if (action === "add_product" && !userBadges.includes("first_contribution")) {
        newBadges.push("first_contribution");
      }
      setUserBadges(newBadges);
      
      alert(`+${reward.points} points ! Badge: ${reward.badge}`);
    }
  };

  // Soumettre un nouveau produit
  const handleSubmitProduct = (e) => {
    e.preventDefault();
    if (newProduct.asin && newProduct.title && newProduct.bsr && newProduct.price) {
      addPoints("add_product");
      setNewProduct({ asin: "", title: "", category: "Home & Kitchen", bsr: "", price: "" });
      setShowAddProduct(false);
    } else {
      alert("Veuillez remplir tous les champs");
    }
  };

  const tabs = [
    { id: "dashboard", name: "🏠 Dashboard", icon: "🏠" },
    { id: "challenges", name: "🎯 Défis", icon: "🎯" },
    { id: "badges", name: "🏆 Badges", icon: "🏆" },
    { id: "leaderboard", name: "📊 Classement", icon: "📊" }
  ];

  const currentLevel = crowdsourcingData.levels[userLevel];
  const nextLevel = crowdsourcingData.levels[userLevel + 1];
  const progressToNext = nextLevel 
    ? ((userPoints - currentLevel.min_points) / (nextLevel.min_points - currentLevel.min_points)) * 100
    : 100;

  return (
    <div style={{ padding: 20, maxWidth: 1200, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <h1 style={{ color: "var(--text-primary)", marginBottom: 10 }}>
          🌱 Community Hub - Gagnez des Points
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 16 }}>
          Contribuez à la communauté et débloquez des récompenses exclusives
        </p>
      </div>

      {/* Stats utilisateur */}
      <div style={{
        background: "linear-gradient(135deg, rgba(255, 153, 0, 0.1) 0%, rgba(255, 184, 0, 0.1) 100%)",
        border: "2px solid #FF9900",
        borderRadius: 16,
        padding: 25,
        marginBottom: 30
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 10 }}>{currentLevel.icon}</div>
            <div style={{ color: "var(--text-secondary)", fontSize: 12 }}>Niveau</div>
            <div style={{ color: "#FF9900", fontSize: 24, fontWeight: "bold" }}>{currentLevel.name}</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 10 }}>💎</div>
            <div style={{ color: "var(--text-secondary)", fontSize: 12 }}>Points</div>
            <div style={{ color: "#FF9900", fontSize: 24, fontWeight: "bold" }}>{userPoints}</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 10 }}>🏆</div>
            <div style={{ color: "var(--text-secondary)", fontSize: 12 }}>Badges</div>
            <div style={{ color: "#FF9900", fontSize: 24, fontWeight: "bold" }}>{userBadges.length}/{crowdsourcingData.badges.length}</div>
          </div>
        </div>

        {nextLevel && (
          <div style={{ marginTop: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: "var(--text-secondary)", fontSize: 12 }}>
                Progression vers {nextLevel.name}
              </span>
              <span style={{ color: "#FF9900", fontSize: 12, fontWeight: "bold" }}>
                {Math.round(progressToNext)}%
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
                width: `${progressToNext}%`,
                height: "100%",
                background: "linear-gradient(135deg, #FF9900 0%, #FFB800 100%)",
                transition: "width 0.3s"
              }} />
            </div>
          </div>
        )}
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

      {/* Dashboard */}
      {activeTab === "dashboard" && (
        <div>
          <div style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            borderRadius: 12,
            padding: 25,
            marginBottom: 20
          }}>
            <h2 style={{ color: "var(--text-primary)", marginBottom: 20 }}>
              🎯 Actions Disponibles
            </h2>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 15 }}>
              <button
                onClick={() => setShowAddProduct(true)}
                style={{
                  padding: 20,
                  background: "linear-gradient(135deg, rgba(0, 200, 83, 0.1) 0%, rgba(0, 200, 83, 0.05) 100%)",
                  border: "2px solid #00C853",
                  borderRadius: 12,
                  cursor: "pointer",
                  textAlign: "left"
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 10 }}>➕</div>
                <div style={{ color: "#00C853", fontSize: 18, fontWeight: "bold", marginBottom: 5 }}>
                  Ajouter un Produit
                </div>
                <div style={{ color: "var(--text-secondary)", fontSize: 14 }}>
                  +{crowdsourcingData.rewards.add_product.points} points
                </div>
              </button>

              <button
                onClick={() => addPoints("update_price")}
                style={{
                  padding: 20,
                  background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)",
                  border: "2px solid #3B82F6",
                  borderRadius: 12,
                  cursor: "pointer",
                  textAlign: "left"
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 10 }}>💰</div>
                <div style={{ color: "#3B82F6", fontSize: 18, fontWeight: "bold", marginBottom: 5 }}>
                  Mettre à jour un Prix
                </div>
                <div style={{ color: "var(--text-secondary)", fontSize: 14 }}>
                  +{crowdsourcingData.rewards.update_price.points} points
                </div>
              </button>

              <button
                onClick={() => addPoints("add_review")}
                style={{
                  padding: 20,
                  background: "linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%)",
                  border: "2px solid #A855F7",
                  borderRadius: 12,
                  cursor: "pointer",
                  textAlign: "left"
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 10 }}>⭐</div>
                <div style={{ color: "#A855F7", fontSize: 18, fontWeight: "bold", marginBottom: 5 }}>
                  Analyser un Avis
                </div>
                <div style={{ color: "var(--text-secondary)", fontSize: 14 }}>
                  +{crowdsourcingData.rewards.add_review.points} points
                </div>
              </button>

              <button
                onClick={() => addPoints("verify_data")}
                style={{
                  padding: 20,
                  background: "linear-gradient(135deg, rgba(255, 184, 0, 0.1) 0%, rgba(255, 184, 0, 0.05) 100%)",
                  border: "2px solid #FFB800",
                  borderRadius: 12,
                  cursor: "pointer",
                  textAlign: "left"
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 10 }}>✅</div>
                <div style={{ color: "#FFB800", fontSize: 18, fontWeight: "bold", marginBottom: 5 }}>
                  Vérifier des Données
                </div>
                <div style={{ color: "var(--text-secondary)", fontSize: 14 }}>
                  +{crowdsourcingData.rewards.verify_data.points} points
                </div>
              </button>
            </div>
          </div>

          {/* Modal Ajouter Produit */}
          {showAddProduct && (
            <div style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000
            }}>
              <div style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                borderRadius: 16,
                padding: 30,
                maxWidth: 500,
                width: "90%"
              }}>
                <h2 style={{ color: "var(--text-primary)", marginBottom: 20 }}>
                  ➕ Ajouter un Produit
                </h2>
                
                <form onSubmit={handleSubmitProduct}>
                  <div style={{ marginBottom: 15 }}>
                    <label style={{ color: "var(--text-secondary)", fontSize: 12, display: "block", marginBottom: 5 }}>
                      ASIN
                    </label>
                    <input
                      type="text"
                      value={newProduct.asin}
                      onChange={e => setNewProduct({...newProduct, asin: e.target.value})}
                      placeholder="B08XYZ123"
                      style={{
                        width: "100%",
                        padding: 12,
                        background: "var(--bg-tertiary)",
                        border: "1px solid var(--border-color)",
                        borderRadius: 6,
                        color: "var(--text-primary)"
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: 15 }}>
                    <label style={{ color: "var(--text-secondary)", fontSize: 12, display: "block", marginBottom: 5 }}>
                      Titre du Produit
                    </label>
                    <input
                      type="text"
                      value={newProduct.title}
                      onChange={e => setNewProduct({...newProduct, title: e.target.value})}
                      placeholder="Organisateur de tiroirs bambou"
                      style={{
                        width: "100%",
                        padding: 12,
                        background: "var(--bg-tertiary)",
                        border: "1px solid var(--border-color)",
                        borderRadius: 6,
                        color: "var(--text-primary)"
                      }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15, marginBottom: 15 }}>
                    <div>
                      <label style={{ color: "var(--text-secondary)", fontSize: 12, display: "block", marginBottom: 5 }}>
                        Catégorie
                      </label>
                      <select
                        value={newProduct.category}
                        onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                        style={{
                          width: "100%",
                          padding: 12,
                          background: "var(--bg-tertiary)",
                          border: "1px solid var(--border-color)",
                          borderRadius: 6,
                          color: "var(--text-primary)"
                        }}
                      >
                        <option value="Home & Kitchen">Home & Kitchen</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Sports">Sports</option>
                        <option value="Beauty">Beauty</option>
                        <option value="Toys">Toys</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ color: "var(--text-secondary)", fontSize: 12, display: "block", marginBottom: 5 }}>
                        BSR
                      </label>
                      <input
                        type="number"
                        value={newProduct.bsr}
                        onChange={e => setNewProduct({...newProduct, bsr: e.target.value})}
                        placeholder="2500"
                        style={{
                          width: "100%",
                          padding: 12,
                          background: "var(--bg-tertiary)",
                          border: "1px solid var(--border-color)",
                          borderRadius: 6,
                          color: "var(--text-primary)"
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={{ color: "var(--text-secondary)", fontSize: 12, display: "block", marginBottom: 5 }}>
                      Prix (€)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                      placeholder="24.99"
                      style={{
                        width: "100%",
                        padding: 12,
                        background: "var(--bg-tertiary)",
                        border: "1px solid var(--border-color)",
                        borderRadius: 6,
                        color: "var(--text-primary)"
                      }}
                    />
                  </div>

                  <div style={{ display: "flex", gap: 10 }}>
                    <button
                      type="submit"
                      style={{
                        flex: 1,
                        padding: 15,
                        background: "linear-gradient(135deg, #00C853 0%, #00E676 100%)",
                        border: "none",
                        borderRadius: 8,
                        color: "#fff",
                        fontWeight: "bold",
                        cursor: "pointer"
                      }}
                    >
                      ✅ Soumettre (+{crowdsourcingData.rewards.add_product.points} points)
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddProduct(false)}
                      style={{
                        padding: 15,
                        background: "var(--bg-tertiary)",
                        border: "1px solid var(--border-color)",
                        borderRadius: 8,
                        color: "var(--text-primary)",
                        cursor: "pointer"
                      }}
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Défis */}
      {activeTab === "challenges" && (
        <div>
          <h2 style={{ color: "var(--text-primary)", marginBottom: 20 }}>
            🎯 Défis Quotidiens
          </h2>
          
          <div style={{ display: "grid", gap: 15 }}>
            {crowdsourcingData.daily_challenges.map((challenge, idx) => (
              <div
                key={idx}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 12,
                  padding: 20,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <div>
                  <div style={{ color: "var(--text-primary)", fontSize: 18, fontWeight: "bold", marginBottom: 5 }}>
                    {challenge.task}
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: challenge.difficulty === "easy" ? "#00C853" :
                           challenge.difficulty === "medium" ? "#FFB800" :
                           challenge.difficulty === "hard" ? "#FF9900" : "#FF3D00",
                    fontWeight: "bold"
                  }}>
                    Difficulté: {challenge.difficulty}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: "#FF9900", fontSize: 24, fontWeight: "bold" }}>
                    +{challenge.reward}
                  </div>
                  <div style={{ color: "var(--text-secondary)", fontSize: 12 }}>
                    points
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Badges */}
      {activeTab === "badges" && (
        <div>
          <h2 style={{ color: "var(--text-primary)", marginBottom: 20 }}>
            🏆 Badges à Débloquer
          </h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 15 }}>
            {crowdsourcingData.badges.map((badge, idx) => {
              const unlocked = userBadges.includes(badge.id);
              
              return (
                <div
                  key={idx}
                  style={{
                    background: unlocked ? "linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 215, 0, 0.1) 100%)" : "var(--bg-card)",
                    border: unlocked ? "2px solid #FFD700" : "1px solid var(--border-color)",
                    borderRadius: 12,
                    padding: 20,
                    textAlign: "center",
                    opacity: unlocked ? 1 : 0.6
                  }}
                >
                  <div style={{ fontSize: 48, marginBottom: 10 }}>{badge.icon}</div>
                  <div style={{ color: "var(--text-primary)", fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
                    {badge.name}
                  </div>
                  <div style={{ color: "var(--text-secondary)", fontSize: 12 }}>
                    {badge.condition}
                  </div>
                  {unlocked && (
                    <div style={{
                      marginTop: 10,
                      padding: "4px 12px",
                      background: "#FFD700",
                      color: "#0D1117",
                      borderRadius: 12,
                      fontSize: 12,
                      fontWeight: "bold",
                      display: "inline-block"
                    }}>
                      ✅ Débloqué
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Leaderboard */}
      {activeTab === "leaderboard" && (
        <div>
          <h2 style={{ color: "var(--text-primary)", marginBottom: 20 }}>
            📊 Classement des Contributeurs
          </h2>
          
          <div style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            borderRadius: 12,
            padding: 20
          }}>
            <div style={{ textAlign: "center", padding: 40 }}>
              <div style={{ fontSize: 48, marginBottom: 10 }}>🏆</div>
              <p style={{ color: "var(--text-secondary)" }}>
                Le classement sera disponible prochainement !
              </p>
              <p style={{ color: "var(--text-secondary)", fontSize: 14, marginTop: 10 }}>
                Continuez à contribuer pour apparaître dans le top 10
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
