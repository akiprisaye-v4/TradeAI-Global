import React, { useState, useEffect } from 'react';
import { useAppContext } from '../App';
import LazyVisualizations from './LazyVisualizations';
import ExportPDF from './ExportPDF';
import ProductComparator from './ProductComparator';

const AmazonToAlibaba = () => {
  const { setToast } = useAppContext();
  const [productTitle, setProductTitle] = useState('');
  const [amazonPrice, setAmazonPrice] = useState('');
  const [alibabaPrice, setAlibabaPrice] = useState('');
  const [alibabaUrl, setAlibabaUrl] = useState('');
  const [savedSearches, setSavedSearches] = useState([]);
  const [selectedSearch, setSelectedSearch] = useState(null);
  const [showCounter, setShowCounter] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('amazonAlibabaSearches');
    if (saved) {
      try {
        setSavedSearches(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading saved searches:', e);
      }
    }
  }, []);

  const generateAlibabaUrl = () => {
    if (!productTitle) return null;
    const searchQuery = encodeURIComponent(productTitle);
    return `https://www.alibaba.com/trade/search?SearchText=${searchQuery}`;
  };

  const calculateMargin = () => {
    if (!amazonPrice || !alibabaPrice) return null;
    
    const sellingPrice = parseFloat(amazonPrice);
    const costPrice = parseFloat(alibabaPrice);
    const shippingCost = 1.50;
    const fees = sellingPrice * 0.15;
    const profit = sellingPrice - costPrice - shippingCost - fees;
    const margin = (profit / sellingPrice) * 100;
    
    return {
      costPrice,
      sellingPrice,
      shippingCost,
      fees: fees.toFixed(2),
      profit: profit.toFixed(2),
      margin: margin.toFixed(1)
    };
  };

  const saveSearch = () => {
    if (!productTitle || !amazonPrice) {
      setToast({ message: "❌ Remplis au moins le titre et le prix Amazon", type: "error" });
      return;
    }
    
    const margin = calculateMargin();
    const search = {
      id: Date.now(),
      title: productTitle,
      amazonPrice: parseFloat(amazonPrice),
      alibabaPrice: alibabaPrice ? parseFloat(alibabaPrice) : null,
      alibabaUrl: alibabaUrl || null,
      margin: margin,
      date: new Date().toLocaleString('fr-FR')
    };
    
    const updated = [search, ...savedSearches].slice(0, 10);
    setSavedSearches(updated);
    localStorage.setItem('amazonAlibabaSearches', JSON.stringify(updated));
    
    setToast({ message: "✅ Recherche sauvegardée !", type: "success" });
  };

  const openAlibaba = () => {
    const url = generateAlibabaUrl();
    if (url) {
      window.open(url, '_blank');
      setAlibabaUrl(url);
      setToast({ message: "🔍 Recherche Alibaba ouverte !", type: "success" });
    }
  };

  const scrollToAnalyses = () => {
    const analysesSection = document.getElementById('analyses-section');
    if (analysesSection) {
      analysesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const margin = calculateMargin();

  useEffect(() => {
    if (margin) {
      setShowCounter(true);
    } else {
      setShowCounter(false);
    }
  }, [margin]);

  return (
    <div>
      <div style={{ 
        background: "#161B22", 
        border: "1px solid #21262D", 
        borderRadius: 11, 
        padding: "20px",
        marginBottom: 20 
      }}>
        <h2 style={{ 
          fontSize: 18, 
          fontWeight: 700, 
          marginBottom: 12,
          color: "#FF9900"
        }}>
          🔍 Amazon → Alibaba Sourcing
        </h2>
        
        <p style={{ 
          fontSize: 12, 
          color: "#8B949E", 
          marginBottom: 16,
          lineHeight: 1.5 
        }}>
          Copie le titre et le prix d'un produit Amazon, puis trouve le même sur Alibaba pour calculer ta marge.
        </p>

        <div style={{ marginBottom: 16 }}>
          <label style={{ 
            display: "block", 
            fontSize: 11, 
            color: "#8B949E", 
            marginBottom: 6,
            fontWeight: 700 
          }}>
            Titre du produit Amazon
          </label>
          <textarea
            value={productTitle}
            onChange={(e) => setProductTitle(e.target.value)}
            aria-label="Titre du produit Amazon" placeholder="Ex: Coque iPhone 17 Transparente Magnétique..."
            rows={3}
            style={{
              width: "100%",
              padding: "12px 14px",
              background: "#1C2128",
              border: "1px solid #30363D",
              borderRadius: 8,
              color: "#E6EDF3",
              fontSize: 13,
              fontWeight: 600,
              outline: "none",
              boxSizing: "border-box",
              resize: "vertical",
              fontFamily: "inherit"
            }}
            onFocus={(e) => e.target.style.borderColor = "#FF9900"}
            onBlur={(e) => e.target.style.borderColor = "#30363D"}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ 
            display: "block", 
            fontSize: 11, 
            color: "#8B949E", 
            marginBottom: 6,
            fontWeight: 700 
          }}>
            Prix Amazon (€)
          </label>
          <input
            type="number"
            value={amazonPrice}
            onChange={(e) => setAmazonPrice(e.target.value)}
            aria-label="Prix Amazon en euros" required min="0" step="0.01" placeholder="9.99"
            step="0.01"
            min="0"
            style={{
              width: "100%",
              padding: "12px 14px",
              background: "#1C2128",
              border: "1px solid #30363D",
              borderRadius: 8,
              color: "#E6EDF3",
              fontSize: 14,
              fontWeight: 600,
              outline: "none",
              boxSizing: "border-box"
            }}
            onFocus={(e) => e.target.style.borderColor = "#FF9900"}
            onBlur={(e) => e.target.style.borderColor = "#30363D"}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ 
            display: "block", 
            fontSize: 11, 
            color: "#8B949E", 
            marginBottom: 6,
            fontWeight: 700 
          }}>
            Prix Alibaba trouvé (€) - Optionnel
          </label>
          <input
            type="number"
            value={alibabaPrice}
            onChange={(e) => setAlibabaPrice(e.target.value)}
            aria-label="Prix Alibaba en euros" min="0" step="0.01" placeholder="2.50"
            step="0.01"
            min="0"
            style={{
              width: "100%",
              padding: "12px 14px",
              background: "#1C2128",
              border: "1px solid #30363D",
              borderRadius: 8,
              color: "#E6EDF3",
              fontSize: 14,
              fontWeight: 600,
              outline: "none",
              boxSizing: "border-box"
            }}
            onFocus={(e) => e.target.style.borderColor = "#FF9900"}
            onBlur={(e) => e.target.style.borderColor = "#30363D"}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ 
            display: "block", 
            fontSize: 11, 
            color: "#8B949E", 
            marginBottom: 6,
            fontWeight: 700 
          }}>
            🔗 URL du produit Alibaba - Optionnel
          </label>
          <input
            type="text"
            value={alibabaUrl}
            onChange={(e) => setAlibabaUrl(e.target.value)}
            aria-label="URL du produit Alibaba" placeholder="https://www.alibaba.com/product-detail/..."
            style={{
              width: "100%",
              padding: "12px 14px",
              background: "#1C2128",
              border: "1px solid #30363D",
              borderRadius: 8,
              color: "#E6EDF3",
              fontSize: 12,
              fontWeight: 600,
              outline: "none",
              boxSizing: "border-box"
            }}
            onFocus={(e) => e.target.style.borderColor = "#FF9900"}
            onBlur={(e) => e.target.style.borderColor = "#30363D"}
          />
          <div style={{ fontSize: 10, color: "#484F58", marginTop: 4 }}>
            Colle l'URL du produit trouvé sur Alibaba pour y accéder rapidement plus tard
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          <button
            onClick={openAlibaba}
            disabled={!productTitle}
            style={{
              flex: 1,
              padding: "14px 20px",
              background: !productTitle ? "#30363D" : "linear-gradient(135deg, #FF9900 0%, #FFB800 100%)",
              border: "none",
              borderRadius: 8,
              color: !productTitle ? "#8B949E" : "#0D1117",
              fontSize: 14,
              fontWeight: 700,
              cursor: !productTitle ? "not-allowed" : "pointer",
              transition: "all 0.2s"
            }}
          >
            🔍 Chercher sur Alibaba
          </button>
          
          <button
            onClick={saveSearch}
            disabled={!productTitle || !amazonPrice}
            style={{
              flex: 1,
              padding: "14px 20px",
              background: (!productTitle || !amazonPrice) ? "#30363D" : "linear-gradient(135deg, #00C853 0%, #00E676 100%)",
              border: "none",
              borderRadius: 8,
              color: (!productTitle || !amazonPrice) ? "#8B949E" : "#0D1117",
              fontSize: 14,
              fontWeight: 700,
              cursor: (!productTitle || !amazonPrice) ? "not-allowed" : "pointer",
              transition: "all 0.2s"
            }}
          >
            💾 Sauvegarder
          </button>
        </div>

        {amazonPrice && !alibabaPrice && (
          <div style={{
            marginTop: 16,
            padding: 16,
            background: "rgba(59,130,246,0.1)",
            border: "1px solid #3B82F633",
            borderRadius: 8,
            textAlign: "center"
          }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>💡</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#3B82F6", marginBottom: 8 }}>
              Entre le prix Alibaba pour débloquer les analyses avancées
            </div>
            <div style={{ fontSize: 12, color: "#8B949E", lineHeight: 1.6 }}>
              Une fois le prix Alibaba entré, tu verras apparaître :
              <div style={{ marginTop: 8, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, textAlign: "left" }}>
                <div>📈 Projection sur volume</div>
                <div>🎲 Simulateur de scénarios</div>
                <div>📊 Analyse de sensibilité</div>
                <div>⚠️ Analyse de risque</div>
                <div>📅 Projection temporelle</div>
                <div>🗺️ Rentabilité par marketplace</div>
                <div>💰 Parcours du produit</div>
                <div>📅 Analyse de saisonnalité</div>
                <div>📊 Score du produit</div>
                <div>🚨 Alertes intelligentes</div>
              </div>
            </div>
          </div>
        )}

        {showCounter && margin && (
          <div className="visualizations-counter" style={{ marginTop: 16 }}>
            <span>🎯</span>
            <span>10 analyses débloquées !</span>
            <button
              onClick={scrollToAnalyses}
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "none",
                borderRadius: 12,
                padding: "4px 12px",
                color: "#0D1117",
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
                marginLeft: 8
              }}
            >
              Voir ↓
            </button>
          </div>
        )}

        {margin && (
          <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
            <ExportPDF margin={margin} productTitle={productTitle} />
          </div>
        )}

        {margin && (
          <div style={{ 
            padding: 16,
            background: "rgba(0,200,83,0.1)",
            border: "1px solid #00C85333",
            borderRadius: 8,
            marginTop: 16
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#00C853", marginBottom: 12 }}>
              💰 Analyse de rentabilité
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 12 }}>
              <div>
                <div style={{ color: "#8B949E", marginBottom: 4 }}>Prix de vente</div>
                <div style={{ fontWeight: 700, color: "#E6EDF3" }}>€{margin.sellingPrice}</div>
              </div>
              <div>
                <div style={{ color: "#8B949E", marginBottom: 4 }}>Coût achat</div>
                <div style={{ fontWeight: 700, color: "#E6EDF3" }}>€{margin.costPrice}</div>
              </div>
              <div>
                <div style={{ color: "#8B949E", marginBottom: 4 }}>Frais Amazon (15%)</div>
                <div style={{ fontWeight: 700, color: "#FF9900" }}>€{margin.fees}</div>
              </div>
              <div>
                <div style={{ color: "#8B949E", marginBottom: 4 }}>Shipping</div>
                <div style={{ fontWeight: 700, color: "#E6EDF3" }}>€{margin.shippingCost}</div>
              </div>
              <div>
                <div style={{ color: "#8B949E", marginBottom: 4 }}>Profit net</div>
                <div style={{ fontWeight: 700, color: parseFloat(margin.profit) >= 0 ? "#00C853" : "#FF3D00" }}>
                  €{margin.profit}
                </div>
              </div>
              <div>
                <div style={{ color: "#8B949E", marginBottom: 4 }}>Marge</div>
                <div style={{ fontWeight: 700, color: parseFloat(margin.margin) >= 15 ? "#00C853" : "#FF9900" }}>
                  {margin.margin}%
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {savedSearches.length > 0 && (
        <div style={{ 
          background: "#161B22", 
          border: "1px solid #21262D", 
          borderRadius: 11, 
          padding: "16px" 
        }}>
          <h3 style={{ 
            fontSize: 14, 
            fontWeight: 700, 
            marginBottom: 12,
            color: "#FF9900"
          }}>
            🕐 Historique des recherches
          </h3>
          {savedSearches.map((search) => (
            <div 
              key={search.id} 
              onClick={() => setSelectedSearch(search)}
              style={{ 
                padding: 12,
                background: "#1C2128",
                border: "1px solid #30363D",
                borderRadius: 8,
                marginBottom: 8,
                cursor: "pointer",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#FF9900";
                e.currentTarget.style.transform = "translateX(4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#30363D";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 700, color: "#E6EDF3", marginBottom: 6 }}>
                {search.title.substring(0, 60)}{search.title.length > 60 ? '...' : ''}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#8B949E", flexWrap: "wrap", gap: 8 }}>
                <span>Amazon: €{search.amazonPrice}</span>
                {search.alibabaPrice && <span>Alibaba: €{search.alibabaPrice}</span>}
                {search.alibabaUrl && <span style={{ color: "#3B82F6" }}>🔗</span>}
                {search.margin && (
                  <span style={{ color: parseFloat(search.margin.margin) >= 15 ? "#00C853" : "#FF9900" }}>
                    Marge: {search.margin.margin}%
                  </span>
                )}
              </div>
              <div style={{ fontSize: 10, color: "#484F58", marginTop: 4 }}>
                {search.date}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedSearch && (
        <div 
          onClick={() => setSelectedSearch(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.8)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#161B22",
              border: "2px solid #FF9900",
              borderRadius: 16,
              padding: 24,
              maxWidth: 500,
              width: "100%",
              maxHeight: "80vh",
              overflowY: "auto"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#FF9900", margin: 0 }}>
                📊 Détails de l'analyse
              </h3>
              <button 
                onClick={() => setSelectedSearch(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#8B949E",
                  fontSize: 24,
                  cursor: "pointer",
                  padding: "0 8px"
                }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, color: "#8B949E", marginBottom: 6 }}>Titre du produit</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#E6EDF3", lineHeight: 1.5 }}>
                {selectedSearch.title}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              <div style={{ padding: 12, background: "#1C2128", borderRadius: 8 }}>
                <div style={{ fontSize: 10, color: "#8B949E", marginBottom: 4 }}>Prix Amazon</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#FF9900" }}>
                  €{selectedSearch.amazonPrice}
                </div>
              </div>
              <div style={{ padding: 12, background: "#1C2128", borderRadius: 8 }}>
                <div style={{ fontSize: 10, color: "#8B949E", marginBottom: 4 }}>Prix Alibaba</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#00C853" }}>
                  €{selectedSearch.alibabaPrice || "N/A"}
                </div>
              </div>
            </div>

            {selectedSearch.alibabaUrl && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, color: "#8B949E", marginBottom: 6 }}>🔗 Lien vers le produit Alibaba</div>
                <a 
                  href={selectedSearch.alibabaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    padding: 12,
                    background: "rgba(59,130,246,0.1)",
                    border: "1px solid #3B82F633",
                    borderRadius: 8,
                    color: "#3B82F6",
                    fontSize: 11,
                    fontWeight: 600,
                    textDecoration: "none",
                    wordBreak: "break-all"
                  }}
                >
                  {selectedSearch.alibabaUrl}
                </a>
              </div>
            )}

            {selectedSearch.margin && (
              <div style={{ 
                padding: 16,
                background: "rgba(0,200,83,0.1)",
                border: "1px solid #00C85333",
                borderRadius: 8,
                marginBottom: 20
              }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#00C853", marginBottom: 12, textAlign: "center" }}>
                  💰 Analyse de rentabilité
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 12 }}>
                  <div>
                    <div style={{ color: "#8B949E", marginBottom: 4 }}>Prix de vente</div>
                    <div style={{ fontWeight: 700, color: "#E6EDF3" }}>€{selectedSearch.margin.sellingPrice}</div>
                  </div>
                  <div>
                    <div style={{ color: "#8B949E", marginBottom: 4 }}>Coût achat</div>
                    <div style={{ fontWeight: 700, color: "#E6EDF3" }}>€{selectedSearch.margin.costPrice}</div>
                  </div>
                  <div>
                    <div style={{ color: "#8B949E", marginBottom: 4 }}>Frais Amazon</div>
                    <div style={{ fontWeight: 700, color: "#FF9900" }}>€{selectedSearch.margin.fees}</div>
                  </div>
                  <div>
                    <div style={{ color: "#8B949E", marginBottom: 4 }}>Shipping</div>
                    <div style={{ fontWeight: 700, color: "#E6EDF3" }}>€{selectedSearch.margin.shippingCost}</div>
                  </div>
                  <div>
                    <div style={{ color: "#8B949E", marginBottom: 4 }}>Profit net</div>
                    <div style={{ fontWeight: 700, color: parseFloat(selectedSearch.margin.profit) >= 0 ? "#00C853" : "#FF3D00" }}>
                      €{selectedSearch.margin.profit}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: "#8B949E", marginBottom: 4 }}>Marge</div>
                    <div style={{ fontWeight: 700, color: parseFloat(selectedSearch.margin.margin) >= 15 ? "#00C853" : "#FF9900", fontSize: 16 }}>
                      {selectedSearch.margin.margin}%
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div style={{ fontSize: 10, color: "#484F58", textAlign: "center", marginBottom: 20 }}>
              🕐 {selectedSearch.date}
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => {
                  setProductTitle(selectedSearch.title);
                  setAmazonPrice(selectedSearch.amazonPrice.toString());
                  setAlibabaPrice(selectedSearch.alibabaPrice ? selectedSearch.alibabaPrice.toString() : "");
                  setAlibabaUrl(selectedSearch.alibabaUrl || "");
                  setSelectedSearch(null);
                  setToast({ message: "✅ Données chargées dans le formulaire", type: "success" });
                }}
                style={{
                  flex: 1,
                  padding: "12px 20px",
                  background: "linear-gradient(135deg, #FF9900 0%, #FFB800 100%)",
                  border: "none",
                  borderRadius: 8,
                  color: "#0D1117",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                ✏️ Modifier
              </button>
              <button
                onClick={() => {
                  const updated = savedSearches.filter(s => s.id !=== selectedSearch.id);
                  setSavedSearches(updated);
                  localStorage.setItem('amazonAlibabaSearches', JSON.stringify(updated));
                  setSelectedSearch(null);
                  setToast({ message: "✅ Recherche supprimée", type: "success" });
                }}
                style={{
                  flex: 1,
                  padding: "12px 20px",
                  background: "#FF3D00",
                  border: "none",
                  borderRadius: 8,
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                🗑️ Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {margin && (
        <div id="analyses-section">
          <LazyVisualizations margin={margin} />
        </div>
      )}

      <ProductComparator savedSearches={savedSearches} />

      <div style={{ 
        background: "#161B22", 
        border: "1px solid #21262D", 
        borderRadius: 11, 
        padding: "16px",
        marginTop: 20
      }}>
        <h3 style={{ 
          fontSize: 14, 
          fontWeight: 700, 
          marginBottom: 12,
          color: "#FF9900"
        }}>
          📋 Comment ça marche ?
        </h3>
        <ol style={{ 
          fontSize: 12, 
          color: "#8B949E", 
          lineHeight: 1.8,
          paddingLeft: 20,
          margin: 0
        }}>
          <li>Ouvre Amazon sur ton mobile et trouve un produit intéressant</li>
          <li>Copie le <strong>titre du produit</strong></li>
          <li>Colle-le dans le champ ci-dessus</li>
          <li>Entre le <strong>prix Amazon</strong></li>
          <li>Clique sur "🔍 Chercher sur Alibaba"</li>
          <li>Sur Alibaba, trouve un produit similaire et note son prix</li>
          <li>Entre le <strong>prix Alibaba</strong> dans le formulaire</li>
          <li>La marge se calcule automatiquement !</li>
          <li>Clique sur "💾 Sauvegarder" pour garder une trace</li>
        </ol>
        
        <div style={{ 
          marginTop: 16,
          padding: 12,
          background: "rgba(255,153,0,0.1)",
          border: "1px solid #FF990033",
          borderRadius: 6
        }}>
          <div style={{ fontSize: 11, color: "#FF9900", fontWeight: 700, marginBottom: 4 }}>
            💡 Astuce Pro
          </div>
          <div style={{ fontSize: 11, color: "#E6EDF3" }}>
            Cherche des produits <strong>génériques</strong> (pas de marque) pour trouver des équivalents sur Alibaba. Évite les produits de marque comme Samsung, Apple, etc.
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AmazonToAlibaba);
