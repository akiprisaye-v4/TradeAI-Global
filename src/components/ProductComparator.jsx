import React, { useState } from 'react';

const ProductComparator = ({ savedSearches }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const toggleProduct = (search) => {
    if (selectedProducts.find(p => p.id === search.id)) {
      setSelectedProducts(selectedProducts.filter(p => p.id !== search.id));
    } else if (selectedProducts.length < 5) {
      setSelectedProducts([...selectedProducts, search]);
    }
  };

  if (savedSearches.length === 0) {
    return (
      <div style={{
        padding: 20,
        background: "#161B22",
        border: "1px solid #21262D",
        borderRadius: 11,
        textAlign: "center",
        color: "#8B949E"
      }}>
        <div style={{ fontSize: 24, marginBottom: 8 }}>📊</div>
        <div style={{ fontSize: 13, fontWeight: 600 }}>
          Aucune recherche sauvegardée
        </div>
        <div style={{ fontSize: 11, marginTop: 4 }}>
          Sauvegarde des analyses pour les comparer ici
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: "#161B22",
      border: "1px solid #21262D",
      borderRadius: 11,
      padding: 16,
      marginTop: 16
    }}>
      <h3 style={{
        fontSize: 14,
        fontWeight: 700,
        color: "#FF9900",
        marginBottom: 12
      }}>
        📊 Comparateur Multi-Produits (max 5)
      </h3>

      {/* Sélection des produits */}
      <div style={{ marginBottom: 16 }}>
        {savedSearches.map(search => (
          <div
            key={search.id}
            onClick={() => toggleProduct(search)}
            style={{
              padding: 10,
              background: selectedProducts.find(p => p.id === search.id) 
                ? "rgba(255,153,0,0.1)" 
                : "#1C2128",
              border: `1px solid ${
                selectedProducts.find(p => p.id === search.id) 
                  ? "#FF9900" 
                  : "#30363D"
              }`,
              borderRadius: 6,
              marginBottom: 6,
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 600, color: "#E6EDF3" }}>
              {search.title.substring(0, 50)}...
            </div>
            <div style={{ fontSize: 10, color: "#8B949E", marginTop: 2 }}>
              Marge: {search.margin?.margin || 'N/A'}%
            </div>
          </div>
        ))}
      </div>

      {/* Comparaison */}
      {selectedProducts.length > 0 && (
        <div style={{
          padding: 16,
          background: "#0D1117",
          borderRadius: 8
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: `repeat(${selectedProducts.length}, 1fr)`,
            gap: 12,
            fontSize: 11
          }}>
            {selectedProducts.map(product => (
              <div key={product.id} style={{ textAlign: "center" }}>
                <div style={{ fontWeight: 700, color: "#FF9900", marginBottom: 8 }}>
                  {product.title.substring(0, 20)}...
                </div>
                <div style={{ color: "#8B949E", marginBottom: 4 }}>
                  Amazon: €{product.amazonPrice}
                </div>
                <div style={{ color: "#8B949E", marginBottom: 4 }}>
                  Alibaba: €{product.alibabaPrice || 'N/A'}
                </div>
                <div style={{
                  color: parseFloat(product.margin?.margin) >= 30 ? "#00C853" : "#FF9900",
                  fontWeight: 700,
                  fontSize: 14
                }}>
                  {product.margin?.margin || 'N/A'}%
                </div>
              </div>
            ))}
          </div>

          {/* Meilleur produit */}
          {selectedProducts.length > 1 && (
            <div style={{
              marginTop: 12,
              padding: 10,
              background: "rgba(0,200,83,0.1)",
              border: "1px solid #00C85333",
              borderRadius: 6,
              textAlign: "center"
            }}>
              <div style={{ fontSize: 11, color: "#00C853", fontWeight: 700 }}>
                🏆 Meilleur produit: {
                  selectedProducts.reduce((best, current) => 
                    parseFloat(current.margin?.margin || 0) > parseFloat(best.margin?.margin || 0) 
                      ? current 
                      : best
                  ).title.substring(0, 30)
                }...
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(ProductComparator);
