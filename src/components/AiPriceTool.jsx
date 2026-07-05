import React, { useState } from "react";
import aiPriceData from "../data/aiPriceData.json";

export default function AiPriceTool() {
  const [activeTab, setActiveTab] = useState("image-search");
  const [searchImage, setSearchImage] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState("all");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setSearchImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const tabs = [
    { id: "image-search", name: "Recherche Image", icon: "📸" },
    { id: "price-history", name: "Historique Prix", icon: "📊" },
    { id: "product-pro", name: "Amazon Pro", icon: "💎" },
    { id: "reviews", name: "Avis", icon: "⭐" },
    { id: "converter", name: "Devises", icon: "💱" }
  ];

  const Notice = ({ title, children }) => (
    <div style={{
      background: "var(--bg-tertiary)",
      border: "1px solid var(--border-color)",
      borderLeft: "4px solid #FF9900",
      borderRadius: 10,
      padding: 16,
      color: "var(--text-secondary)",
      lineHeight: 1.6
    }}>
      <strong style={{ color: "#FF9900", display: "block", marginBottom: 8 }}>{title}</strong>
      {children}
    </div>
  );

  return (
    <div className="tradeai-aiprice-root" style={{ padding: 20, maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <h1 style={{ color: "var(--text-primary)", marginBottom: 10 }}>
          🎯 AiPrice - Sourcing Intelligence
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 16 }}>
          Module sécurisé : aucune donnée marketplace fictive n’est affichée.
        </p>
      </div>

      <div style={{
        display: "flex",
        gap: 10,
        marginBottom: 30,
        flexWrap: "wrap",
        justifyContent: "center",
        background: "var(--bg-card)",
        padding: 15,
        borderRadius: 12,
        border: "1px solid var(--border-color)"
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "12px 20px",
              background: activeTab === tab.id ? "var(--accent)" : "transparent",
              color: activeTab === tab.id ? "#0D1117" : "var(--text-primary)",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: 14
            }}
          >
            {tab.icon} {tab.name}
          </button>
        ))}
      </div>

      {activeTab === "image-search" && (
        <div className="tradeai-aiprice-image-search-panel" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 12, padding: 25 }}>
          <h2 style={{ color: "var(--text-primary)", marginBottom: 20 }}>📸 Recherche par Image</h2>

          <Notice title="Statut des données : analyse locale uniquement">
            L’image importée est conservée côté navigateur pour préparation d’analyse. Aucun résultat Amazon, Alibaba ou AliExpress n’est inventé. Pour obtenir des résultats vérifiables, la prochaine étape est de connecter un import CSV ou une API gratuite compatible.
          </Notice>

          <div style={{ marginTop: 20, marginBottom: 20 }}>
            <label style={{ color: "var(--text-secondary)", marginBottom: 10, display: "block" }}>
              Plateformes prévues :
            </label>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button
                onClick={() => setSelectedPlatform("all")}
                style={{
                  padding: "8px 16px",
                  background: selectedPlatform === "all" ? "var(--accent)" : "var(--bg-tertiary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 6,
                  color: "var(--text-primary)",
                  cursor: "pointer"
                }}
              >
                Toutes
              </button>
              {aiPriceData.platforms.map(platform => (
                <button
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform.id)}
                  style={{
                    padding: "8px 16px",
                    background: selectedPlatform === platform.id ? "var(--accent)" : "var(--bg-tertiary)",
                    border: "1px solid var(--border-color)",
                    borderRadius: 6,
                    color: "var(--text-primary)",
                    cursor: "pointer"
                  }}
                >
                  {platform.icon} {platform.name}
                </button>
              ))}
            </div>
          </div>

          <div style={{
            border: "2px dashed var(--border-color)",
            borderRadius: 8,
            padding: 40,
            textAlign: "center",
            marginBottom: 20,
            background: "var(--bg-tertiary)"
          }}>
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} id="image-upload" />
            <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
              <div style={{ fontSize: 48, marginBottom: 10 }}>📤</div>
              <div style={{ color: "var(--text-primary)", fontWeight: "bold", marginBottom: 5 }}>
                Cliquez pour uploader une image
              </div>
              <div style={{ color: "var(--text-secondary)", fontSize: 14 }}>
                Aucun résultat marketplace ne sera simulé.
              </div>
            </label>
          </div>

          {searchImage && (
            <div style={{ background: "var(--bg-tertiary)", padding: 15, borderRadius: 8 }}>
              <img src={searchImage} alt="Recherche locale" style={{ maxWidth: 300, borderRadius: 8 }} />
              <div style={{ marginTop: 12, color: "var(--text-secondary)", fontSize: 13 }}>
                Image chargée localement. Résultats externes non connectés.
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "price-history" && (
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 12, padding: 25 }}>
          <h2 style={{ color: "var(--text-primary)", marginBottom: 20 }}>📊 Historique des Prix</h2>
          <Notice title="Historique non connecté">
            Aucun historique de prix réel n’est récupéré actuellement. Prochaine étape : import CSV vérifiable ou connecteur gratuit compatible.
          </Notice>
        </div>
      )}

      {activeTab === "product-pro" && (
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 12, padding: 25 }}>
          <h2 style={{ color: "var(--text-primary)", marginBottom: 20 }}>💎 Amazon Product Pro</h2>
          <Notice title="Données Amazon non connectées">
            BSR, ASIN, vendeurs FBA, avis et ventes mensuelles ne sont pas affichés tant qu’aucune source vérifiable n’est connectée.
          </Notice>
        </div>
      )}

      {activeTab === "reviews" && (
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 12, padding: 25 }}>
          <h2 style={{ color: "var(--text-primary)", marginBottom: 20 }}>⭐ Analyse des Avis</h2>
          <Notice title="Avis non connectés">
            Aucune répartition d’avis n’est simulée. Utiliser un import CSV ou une source vérifiable avant affichage.
          </Notice>
        </div>
      )}

      {activeTab === "converter" && (
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 12, padding: 25 }}>
          <h2 style={{ color: "var(--text-primary)", marginBottom: 20 }}>💱 Convertisseur de Devises</h2>
          <Notice title="À connecter au Connect Hub">
            Le taux réel doit provenir du connecteur gratuit Frankfurter déjà disponible dans le Connect Hub.
          </Notice>
        </div>
      )}
    </div>
  );
}
