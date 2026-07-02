import React, { useState } from "react";
import aiPriceData from "../data/aiPriceData.json";

export default function AiPriceTool() {
  const [activeTab, setActiveTab] = useState("image-search");
  const [searchImage, setSearchImage] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [priceHistory, setPriceHistory] = useState([]);
  const [productData, setProductData] = useState(null);

  // Gestion de l'upload d'image
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSearchImage(reader.result);
        // Simulation de recherche
        simulateImageSearch(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Simulation de recherche par image
  const simulateImageSearch = (imageUrl) => {
    // Simuler des résultats de recherche
    const mockResults = [
      {
        id: 1,
        platform: "Amazon",
        title: "Produit similaire Amazon 1",
        price: 29.99,
        image: imageUrl,
        rating: 4.5,
        reviews: 234,
        bsr: 1250,
        asin: "B08XYZ123"
      },
      {
        id: 2,
        platform: "Alibaba",
        title: "Produit similaire Alibaba 1",
        price: 5.50,
        image: imageUrl,
        moq: 100,
        supplier: "Guangzhou Manufacturer"
      },
      {
        id: 3,
        platform: "AliExpress",
        title: "Produit similaire AliExpress",
        price: 12.99,
        image: imageUrl,
        rating: 4.3,
        orders: 1523
      }
    ];
    setSearchResults(mockResults);
  };

  // Historique des prix simulé
  const simulatePriceHistory = () => {
    const history = [
      { date: "2024-01", price: 34.99 },
      { date: "2024-02", price: 32.99 },
      { date: "2024-03", price: 29.99 },
      { date: "2024-04", price: 27.99 },
      { date: "2024-05", price: 29.99 },
      { date: "2024-06", price: 24.99 }
    ];
    setPriceHistory(history);
  };

  const tabs = [
    { id: "image-search", name: "Recherche Image", icon: "📸" },
    { id: "price-history", name: "Historique Prix", icon: "📊" },
    { id: "product-pro", name: "Amazon Pro", icon: "💎" },
    { id: "reviews", name: "Avis", icon: "⭐" },
    { id: "converter", name: "Devises", icon: "💱" }
  ];

  return (
    <div style={{ padding: 20, maxWidth: 1200, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <h1 style={{ color: "var(--text-primary)", marginBottom: 10 }}>
          🎯 AiPrice - Outil de Sourcing Intelligent
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 16 }}>
          Recherchez par image, suivez les prix, analysez la concurrence
        </p>
      </div>

      {/* Navigation */}
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
              fontSize: 14,
              transition: "all 0.3s"
            }}
          >
            {tab.icon} {tab.name}
          </button>
        ))}
      </div>

      {/* Recherche par Image */}
      {activeTab === "image-search" && (
        <div>
          <div style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            borderRadius: 12,
            padding: 25,
            marginBottom: 20
          }}>
            <h2 style={{ color: "var(--text-primary)", marginBottom: 20 }}>
              📸 Recherche par Image
            </h2>
            
            {/* Upload */}
            <div style={{
              border: "2px dashed var(--border-color)",
              borderRadius: 8,
              padding: 40,
              textAlign: "center",
              marginBottom: 20,
              background: "var(--bg-tertiary)"
            }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
                id="image-upload"
              />
              <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
                <div style={{ fontSize: 48, marginBottom: 10 }}>📤</div>
                <div style={{ color: "var(--text-primary)", fontWeight: "bold", marginBottom: 5 }}>
                  Cliquez pour uploader une image
                </div>
                <div style={{ color: "var(--text-secondary)", fontSize: 14 }}>
                  ou glissez-déposez ici
                </div>
              </label>
            </div>

            {/* Plateformes */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ color: "var(--text-secondary)", marginBottom: 10, display: "block" }}>
                Plateformes de recherche :
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

            {/* Image uploadée */}
            {searchImage && (
              <div style={{
                background: "var(--bg-tertiary)",
                padding: 15,
                borderRadius: 8,
                marginBottom: 20
              }}>
                <img
                  src={searchImage}
                  alt="Recherche"
                  style={{ maxWidth: 300, borderRadius: 8 }}
                />
              </div>
            )}
          </div>

          {/* Résultats */}
          {searchResults.length > 0 && (
            <div>
              <h3 style={{ color: "var(--text-primary)", marginBottom: 15 }}>
                🔍 Résultats de la recherche ({searchResults.length})
              </h3>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 15
              }}>
                {searchResults.map(result => (
                  <div
                    key={result.id}
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-color)",
                      borderRadius: 8,
                      padding: 15
                    }}
                  >
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 10
                    }}>
                      <span style={{ fontSize: 24 }}>
                        {result.platform === "Amazon" ? "🛒" : 
                         result.platform === "Alibaba" ? "🏭" : "🌐"}
                      </span>
                      <span style={{ color: "var(--text-primary)", fontWeight: "bold" }}>
                        {result.platform}
                      </span>
                    </div>
                    
                    <div style={{ color: "var(--text-secondary)", fontSize: 14, marginBottom: 10 }}>
                      {result.title}
                    </div>
                    
                    <div style={{ color: "#FF9900", fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
                      {result.price}€
                    </div>
                    
                    {result.bsr && (
                      <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                        BSR: #{result.bsr} • ASIN: {result.asin}
                      </div>
                    )}
                    
                    {result.rating && (
                      <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 5 }}>
                        ⭐ {result.rating} ({result.reviews} avis)
                      </div>
                    )}
                    
                    {result.moq && (
                      <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 5 }}>
                        MOQ: {result.moq} unités
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Historique des Prix */}
      {activeTab === "price-history" && (
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          borderRadius: 12,
          padding: 25
        }}>
          <h2 style={{ color: "var(--text-primary)", marginBottom: 20 }}>
            📊 Historique des Prix
          </h2>
          
          <button
            onClick={simulatePriceHistory}
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
            Charger l'historique des prix
          </button>
          
          {priceHistory.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {priceHistory.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: 12,
                      background: "var(--bg-tertiary)",
                      borderRadius: 6
                    }}
                  >
                    <span style={{ color: "var(--text-secondary)" }}>{item.date}</span>
                    <span style={{ color: item.price < 30 ? "#00C853" : "#FF9900", fontWeight: "bold" }}>
                      {item.price}€
                    </span>
                  </div>
                ))}
              </div>
              <div style={{
                marginTop: 15,
                padding: 10,
                background: "rgba(0, 200, 83, 0.1)",
                borderRadius: 6,
                textAlign: "center",
                color: "#00C853"
              }}>
                💡 Prix le plus bas : {Math.min(...priceHistory.map(h => h.price))}€ 
                {" "}en {priceHistory.reduce((min, item) => item.price < min.price ? item : min, priceHistory[0]).date}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Amazon Product Pro */}
      {activeTab === "product-pro" && (
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          borderRadius: 12,
          padding: 25
        }}>
          <h2 style={{ color: "var(--text-primary)", marginBottom: 20 }}>
            💎 Amazon Product Pro
          </h2>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 15
          }}>
            <div style={{
              background: "var(--bg-tertiary)",
              padding: 15,
              borderRadius: 8
            }}>
              <div style={{ color: "var(--text-secondary)", fontSize: 12 }}>BSR (Best Seller Rank)</div>
              <div style={{ color: "#FF9900", fontSize: 24, fontWeight: "bold" }}>#1,250</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Catégorie: Maison & Cuisine</div>
            </div>
            
            <div style={{
              background: "var(--bg-tertiary)",
              padding: 15,
              borderRadius: 8
            }}>
              <div style={{ color: "var(--text-secondary)", fontSize: 12 }}>ASIN</div>
              <div style={{ color: "var(--text-primary)", fontSize: 24, fontWeight: "bold" }}>B08XYZ123</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Produit Amazon</div>
            </div>
            
            <div style={{
              background: "var(--bg-tertiary)",
              padding: 15,
              borderRadius: 8
            }}>
              <div style={{ color: "var(--text-secondary)", fontSize: 12 }}>Vendeurs FBA</div>
              <div style={{ color: "#00C853", fontSize: 24, fontWeight: "bold" }}>23</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Concurrents actifs</div>
            </div>
            
            <div style={{
              background: "var(--bg-tertiary)",
              padding: 15,
              borderRadius: 8
            }}>
              <div style={{ color: "var(--text-secondary)", fontSize: 12 }}>Estimation Ventes/Mois</div>
              <div style={{ color: "#3B82F6", fontSize: 24, fontWeight: "bold" }}>~450</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Basé sur le BSR</div>
            </div>
          </div>
          
          <div style={{
            marginTop: 20,
            padding: 15,
            background: "rgba(255, 153, 0, 0.1)",
            borderRadius: 8,
            border: "1px solid #FF9900"
          }}>
            <h4 style={{ color: "#FF9900", marginBottom: 10 }}>📈 Analyse Concurrentielle</h4>
            <ul style={{ margin: 0, paddingLeft: 20, color: "var(--text-secondary)" }}>
              <li>Concurrence: <strong style={{ color: "#00C853" }}>Faible</strong> (23 vendeurs)</li>
              <li>Opportunité: <strong style={{ color: "#FF9900" }}>Élevée</strong> (BSR < 5000)</li>
              <li>Recommandation: <strong style={{ color: "#00C853" }}>Produit prometteur</strong></li>
            </ul>
          </div>
        </div>
      )}

      {/* Analyse des Avis */}
      {activeTab === "reviews" && (
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          borderRadius: 12,
          padding: 25
        }}>
          <h2 style={{ color: "var(--text-primary)", marginBottom: 20 }}>
            ⭐ Analyse des Avis
          </h2>
          
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ color: "var(--text-primary)", marginBottom: 15 }}>Répartition par étoiles</h3>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{ width: 60 }}>5 ⭐</span>
              <div style={{ flex: 1, background: "var(--bg-tertiary)", borderRadius: 4, height: 20 }}>
                <div style={{ width: "65%", background: "#00C853", height: "100%", borderRadius: 4 }} />
              </div>
              <span style={{ width: 50, textAlign: "right" }}>65%</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{ width: 60 }}>4 ⭐</span>
              <div style={{ flex: 1, background: "var(--bg-tertiary)", borderRadius: 4, height: 20 }}>
                <div style={{ width: "20%", background: "#84CC16", height: "100%", borderRadius: 4 }} />
              </div>
              <span style={{ width: 50, textAlign: "right" }}>20%</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{ width: 60 }}>3 ⭐</span>
              <div style={{ flex: 1, background: "var(--bg-tertiary)", borderRadius: 4, height: 20 }}>
                <div style={{ width: "8%", background: "#FFB800", height: "100%", borderRadius: 4 }} />
              </div>
              <span style={{ width: 50, textAlign: "right" }}>8%</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{ width: 60 }}>2 ⭐</span>
              <div style={{ flex: 1, background: "var(--bg-tertiary)", borderRadius: 4, height: 20 }}>
                <div style={{ width: "4%", background: "#FF9900", height: "100%", borderRadius: 4 }} />
              </div>
              <span style={{ width: 50, textAlign: "right" }}>4%</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 60 }}>1 ⭐</span>
              <div style={{ flex: 1, background: "var(--bg-tertiary)", borderRadius: 4, height: 20 }}>
                <div style={{ width: "3%", background: "#FF3D00", height: "100%", borderRadius: 4 }} />
              </div>
              <span style={{ width: 50, textAlign: "right" }}>3%</span>
            </div>
          </div>
          
          <button
            style={{
              padding: "12px 24px",
              background: "var(--accent)",
              border: "none",
              borderRadius: 8,
              color: "#0D1117",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            📥 Télécharger les avis (Excel)
          </button>
        </div>
      )}

      {/* Convertisseur de Devises */}
      {activeTab === "converter" && (
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          borderRadius: 12,
          padding: 25
        }}>
          <h2 style={{ color: "var(--text-primary)", marginBottom: 20 }}>
            💱 Convertisseur de Devises
          </h2>
          
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: "var(--text-secondary)", marginBottom: 10, display: "block" }}>
              Montant en EUR :
            </label>
            <input
              type="number"
              defaultValue={29.99}
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
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 15 }}>
            <div style={{
              background: "var(--bg-tertiary)",
              padding: 15,
              borderRadius: 8
            }}>
              <div style={{ color: "var(--text-secondary)", fontSize: 12 }}>USD (Dollar US)</div>
              <div style={{ color: "#00C853", fontSize: 24, fontWeight: "bold" }}>$32.99</div>
            </div>
            <div style={{
              background: "var(--bg-tertiary)",
              padding: 15,
              borderRadius: 8
            }}>
              <div style={{ color: "var(--text-secondary)", fontSize: 12 }}>GBP (Livre Sterling)</div>
              <div style={{ color: "#00C853", fontSize: 24, fontWeight: "bold" }}>£25.49</div>
            </div>
            <div style={{
              background: "var(--bg-tertiary)",
              padding: 15,
              borderRadius: 8
            }}>
              <div style={{ color: "var(--text-secondary)", fontSize: 12 }}>CNY (Yuan Chinois)</div>
              <div style={{ color: "#00C853", fontSize: 24, fontWeight: "bold" }}>¥234.50</div>
            </div>
            <div style={{
              background: "var(--bg-tertiary)",
              padding: 15,
              borderRadius: 8
            }}>
              <div style={{ color: "var(--text-secondary)", fontSize: 12 }}>KRW (Won Coréen)</div>
              <div style={{ color: "#00C853", fontSize: 24, fontWeight: "bold" }}>₩43,250</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
