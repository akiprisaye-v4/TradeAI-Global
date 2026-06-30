import { useState } from "react";

function CompetitiveAnalysis({ products, setToast }) {
  const [competitors, setCompetitors] = useState({});

  // Ajouter un concurrent
  const addCompetitor = (productName, competitorData) => {
    setCompetitors(prev => ({
      ...prev,
      [productName]: [...(prev[productName] || []), {
        id: Date.now(),
        name: competitorData.name,
        price: parseFloat(competitorData.price),
        bsr: parseInt(competitorData.bsr) || 0,
        reviews: parseInt(competitorData.reviews) || 0,
        rating: parseFloat(competitorData.rating) || 0,
        dateAdded: new Date().toISOString(),
      }],
    }));
    setToast({ message: `✅ Concurrent ajouté pour ${productName}`, type: "success" });
  };

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ background: "#161B22", border: "1px solid #21262D", borderRadius: 12, padding: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#FF9900", marginBottom: 12 }}>🎯 Analyse concurrentielle</div>
        
        {products.map((p, i) => (
          <div key={i} style={{ marginBottom: 16, padding: "12px 14px", background: "#1C2128", borderRadius: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#E6EDF3", marginBottom: 8 }}>{p.name}</div>
            <div style={{ fontSize: 11, color: "#8B949E", marginBottom: 12 }}>
              Votre prix: <strong style={{ color: "#FF9900" }}>€{p.sellingPrice}</strong>
            </div>
            
            {/* Formulaire ajout concurrent */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 8 }}>
              <input
                type="text"
                placeholder="Nom concurrent"
                id={`comp-name-${i}`}
                style={{ background: "#0D1117", border: "1px solid #30363D", borderRadius: 6, padding: "6px 8px", color: "#E6EDF3", fontSize: 11 }}
              />
              <input
                type="number"
                placeholder="Prix (€)"
                id={`comp-price-${i}`}
                step="0.01"
                style={{ background: "#0D1117", border: "1px solid #30363D", borderRadius: 6, padding: "6px 8px", color: "#E6EDF3", fontSize: 11 }}
              />
              <button
                onClick={() => {
                  const name = document.getElementById(`comp-name-${i}`).value;
                  const price = document.getElementById(`comp-price-${i}`).value;
                  if (name && price) {
                    addCompetitor(p.name, { name, price, bsr: 0, reviews: 0, rating: 0 });
                    document.getElementById(`comp-name-${i}`).value = "";
                    document.getElementById(`comp-price-${i}`).value = "";
                  }
                }}
                style={{ background: "#00C853", border: "none", borderRadius: 6, padding: "6px 12px", color: "#0D1117", fontWeight: 700, fontSize: 11, cursor: "pointer" }}
              >
                Ajouter
              </button>
            </div>

            {/* Liste des concurrents */}
            {competitors[p.name] && competitors[p.name].length > 0 && (
              <div style={{ marginTop: 12 }}>
                {competitors[p.name].map((comp, j) => {
                  const priceDiff = ((comp.price - p.sellingPrice) / p.sellingPrice * 100).toFixed(1);
                  const isCheaper = comp.price < p.sellingPrice;
                  
                  return (
                    <div key={j} style={{ padding: "8px 10px", background: "#0D1117", borderRadius: 6, marginBottom: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#E6EDF3" }}>{comp.name}</div>
                        <div style={{ fontSize: 10, color: "#8B949E" }}>
                          BSR: {comp.bsr > 0 ? comp.bsr : "N/A"} · Reviews: {comp.reviews}
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: isCheaper ? "#FF3D00" : "#00C853" }}>
                          €{comp.price} {isCheaper ? "(-" : "(+"}{Math.abs(priceDiff)}%)
                        </div>
                        <div style={{ fontSize: 10, color: "#8B949E" }}>
                          {isCheaper ? "Moins cher" : "Plus cher"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Conseils stratégiques */}
      <div style={{ background: "#161B22", border: "1px solid #21262D", borderRadius: 12, padding: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#00C853", marginBottom: 12 }}>💡 Conseils stratégiques</div>
        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ padding: "12px 14px", background: "#00C85310", border: "1px solid #00C85333", borderLeft: "3px solid #00C853", borderRadius: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#E6EDF3", marginBottom: 4 }}>📊 Positionnement prix</div>
            <div style={{ fontSize: 11, color: "#8B949E" }}>
              Analysez les prix de vos concurrents pour trouver le meilleur positionnement. Visez un prix 5-10% inférieur aux leaders pour gagner des parts de marché.
            </div>
          </div>
          <div style={{ padding: "12px 14px", background: "#00C85310", border: "1px solid #00C85333", borderLeft: "3px solid #00C853", borderRadius: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#E6EDF3", marginBottom: 4 }}>⭐ Reviews et notation</div>
            <div style={{ fontSize: 11, color: "#8B949E" }}>
              Les produits avec 4.5+ étoiles et 100+ reviews convertissent 3x mieux. Investissez dans la qualité et le service client.
            </div>
          </div>
          <div style={{ padding: "12px 14px", background: "#00C85310", border: "1px solid #00C85333", borderLeft: "3px solid #00C853", borderRadius: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#E6EDF3", marginBottom: 4 }}>📈 BSR (Best Seller Rank)</div>
            <div style={{ fontSize: 11, color: "#8B949E" }}>
              Un BSR < 5000 indique un produit qui se vend bien. Ciblez les niches avec BSR entre 1000-10000 pour un bon équilibre volume/concurrence.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(CompetitiveAnalysis);
