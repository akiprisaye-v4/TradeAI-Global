import React, { useState, useMemo } from 'react';

const AdvancedAnalyticsDashboard = ({ savedSearches }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Statistiques globales
  const stats = useMemo(() => {
    if (!savedSearches || savedSearches.length === 0) {
      return { total: 0, avgMargin: 0, bestProduct: null, totalProfit: 0 };
    }

    const margins = savedSearches
      .filter(s => s.margin)
      .map(s => parseFloat(s.margin.margin));
    
    const profits = savedSearches
      .filter(s => s.margin)
      .map(s => parseFloat(s.margin.profit));

    const bestProduct = savedSearches.reduce((best, current) => {
      const bestMargin = best.margin ? parseFloat(best.margin.margin) : 0;
      const currentMargin = current.margin ? parseFloat(current.margin.margin) : 0;
      return currentMargin > bestMargin ? current : best;
    }, savedSearches[0]);

    return {
      total: savedSearches.length,
      avgMargin: margins.length > 0 ? (margins.reduce((a, b) => a + b, 0) / margins.length).toFixed(1) : 0,
      bestProduct: bestProduct,
      totalProfit: profits.reduce((a, b) => a + b, 0).toFixed(2),
      highMarginCount: margins.filter(m => m >= 40).length,
      lowMarginCount: margins.filter(m => m < 20).length
    };
  }, [savedSearches]);

  // Filtrage et tri
  const filteredSearches = useMemo(() => {
    let filtered = [...savedSearches];
    
    // Filtre par marge
    if (filter === 'high') {
      filtered = filtered.filter(s => s.margin && parseFloat(s.margin.margin) >= 40);
    } else if (filter === 'medium') {
      filtered = filtered.filter(s => s.margin && parseFloat(s.margin.margin) >= 20 && parseFloat(s.margin.margin) < 40);
    } else if (filter === 'low') {
      filtered = filtered.filter(s => s.margin && parseFloat(s.margin.margin) < 20);
    }

    // Tri
    if (sortBy === 'margin') {
      filtered.sort((a, b) => {
        const marginA = a.margin ? parseFloat(a.margin.margin) : 0;
        const marginB = b.margin ? parseFloat(b.margin.margin) : 0;
        return marginB - marginA;
      });
    } else if (sortBy === 'profit') {
      filtered.sort((a, b) => {
        const profitA = a.margin ? parseFloat(a.margin.profit) : 0;
        const profitB = b.margin ? parseFloat(b.margin.profit) : 0;
        return profitB - profitA;
      });
    }

    return filtered;
  }, [savedSearches, filter, sortBy]);

  // Export CSV
  const exportCSV = () => {
    const headers = ['Titre', 'Prix Amazon', 'Prix Alibaba', 'Marge %', 'Profit €', 'Date'];
    const rows = filteredSearches.map(s => [
      s.title,
      s.amazonPrice,
      s.alibabaPrice || 'N/A',
      s.margin?.margin || 'N/A',
      s.margin?.profit || 'N/A',
      s.date
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `analyses-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  if (savedSearches.length === 0) {
    return (
      <div style={{
        padding: 40,
        background: "#161B22",
        border: "1px solid #21262D",
        borderRadius: 12,
        textAlign: "center"
      }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📊</div>
        <h3 style={{ color: "#FF9900", marginBottom: 8 }}>Aucune donnée disponible</h3>
        <p style={{ color: "#8B949E", fontSize: 13 }}>
          Sauvegarde des analyses dans l'onglet Amazon→Alibaba pour voir les statistiques
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Statistiques globales */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: 12,
        marginBottom: 20
      }}>
        <div style={{
          padding: 16,
          background: "linear-gradient(135deg, rgba(0,200,83,0.1) 0%, rgba(0,200,83,0.05) 100%)",
          border: "1px solid #00C85333",
          borderRadius: 8,
          textAlign: "center"
        }}>
          <div style={{ fontSize: 10, color: "#8B949E", marginBottom: 4 }}>Total analyses</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#00C853" }}>{stats.total}</div>
        </div>

        <div style={{
          padding: 16,
          background: "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(59,130,246,0.05) 100%)",
          border: "1px solid #3B82F633",
          borderRadius: 8,
          textAlign: "center"
        }}>
          <div style={{ fontSize: 10, color: "#8B949E", marginBottom: 4 }}>Marge moyenne</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#3B82F6" }}>{stats.avgMargin}%</div>
        </div>

        <div style={{
          padding: 16,
          background: "linear-gradient(135deg, rgba(255,153,0,0.1) 0%, rgba(255,153,0,0.05) 100%)",
          border: "1px solid #FF990033",
          borderRadius: 8,
          textAlign: "center"
        }}>
          <div style={{ fontSize: 10, color: "#8B949E", marginBottom: 4 }}>Profit total</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#FF9900" }}>€{stats.totalProfit}</div>
        </div>

        <div style={{
          padding: 16,
          background: "linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(139,92,246,0.05) 100%)",
          border: "1px solid #8B5CF633",
          borderRadius: 8,
          textAlign: "center"
        }}>
          <div style={{ fontSize: 10, color: "#8B949E", marginBottom: 4 }}>Marge &gt; 40%</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#8B5CF6" }}>{stats.highMarginCount}</div>
        </div>
      </div>

      {/* Meilleur produit */}
      {stats.bestProduct && stats.bestProduct.margin && (
        <div style={{
          padding: 16,
          background: "rgba(0,200,83,0.1)",
          border: "1px solid #00C85333",
          borderRadius: 8,
          marginBottom: 20
        }}>
          <div style={{ fontSize: 12, color: "#00C853", fontWeight: 700, marginBottom: 8 }}>
            🏆 Meilleur produit analysé
          </div>
          <div style={{ fontSize: 13, color: "#E6EDF3", marginBottom: 4 }}>
            {stats.bestProduct.title.substring(0, 60)}...
          </div>
          <div style={{ display: "flex", gap: 16, fontSize: 11, color: "#8B949E" }}>
            <span>Marge: <strong style={{ color: "#00C853" }}>{stats.bestProduct.margin.margin}%</strong></span>
            <span>Profit: <strong style={{ color: "#00C853" }}>€{stats.bestProduct.margin.profit}</strong></span>
          </div>
        </div>
      )}

      {/* Filtres et tri */}
      <div style={{
        display: "flex",
        gap: 8,
        marginBottom: 16,
        flexWrap: "wrap"
      }}>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: "8px 12px",
            background: "#1C2128",
            border: "1px solid #30363D",
            borderRadius: 6,
            color: "#E6EDF3",
            fontSize: 12,
            cursor: "pointer"
          }}
        >
          <option value="all">Toutes les marges</option>
          <option value="high">Marge élevée (≥40%)</option>
          <option value="medium">Marge moyenne (20-40%)</option>
          <option value="low">Marge faible (&lt;20%)</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: "8px 12px",
            background: "#1C2128",
            border: "1px solid #30363D",
            borderRadius: 6,
            color: "#E6EDF3",
            fontSize: 12,
            cursor: "pointer"
          }}
        >
          <option value="date">Trier par date</option>
          <option value="margin">Trier par marge</option>
          <option value="profit">Trier par profit</option>
        </select>

        <button
          onClick={exportCSV}
          style={{
            padding: "8px 16px",
            background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
            border: "none",
            borderRadius: 6,
            color: "#fff",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          📥 Export CSV
        </button>
      </div>

      {/* Graphique de distribution des marges */}
      <div style={{
        padding: 16,
        background: "#161B22",
        border: "1px solid #21262D",
        borderRadius: 8,
        marginBottom: 16
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#FF9900", marginBottom: 12 }}>
          📊 Distribution des marges
        </div>
        <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 120 }}>
          {[
            { range: "0-10%", min: 0, max: 10, color: "#FF3D00" },
            { range: "10-20%", min: 10, max: 20, color: "#FF9900" },
            { range: "20-30%", min: 20, max: 30, color: "#FBBF24" },
            { range: "30-40%", min: 30, max: 40, color: "#84CC16" },
            { range: "40-50%", min: 40, max: 50, color: "#10B981" },
            { range: "50%+", min: 50, max: 100, color: "#00C853" }
          ].map((bucket, idx) => {
            const count = savedSearches.filter(s => {
              if (!s.margin) return false;
              const m = parseFloat(s.margin.margin);
              return m >= bucket.min && m < bucket.max;
            }).length;
            
            const maxCount = Math.max(...savedSearches.map(s => s.margin ? 1 : 0), 1);
            const height = (count / Math.max(savedSearches.length, 1)) * 100;

            return (
              <div key={idx} style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4
              }}>
                <div style={{ fontSize: 10, color: "#E6EDF3", fontWeight: 700 }}>
                  {count}
                </div>
                <div style={{
                  width: "100%",
                  height: `${Math.max(height, 5)}%`,
                  background: bucket.color,
                  borderRadius: "4px 4px 0 0",
                  transition: "all 0.3s"
                }} />
                <div style={{ fontSize: 9, color: "#8B949E", textAlign: "center" }}>
                  {bucket.range}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Liste des analyses */}
      <div style={{
        background: "#161B22",
        border: "1px solid #21262D",
        borderRadius: 8,
        padding: 16
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#FF9900", marginBottom: 12 }}>
          📋 Détails ({filteredSearches.length} analyses)
        </div>
        <div style={{ maxHeight: 400, overflowY: "auto" }}>
          {filteredSearches.map((search, idx) => (
            <div key={search.id} style={{
              padding: 12,
              background: idx % 2 === 0 ? "#1C2128" : "#0D1117",
              borderRadius: 6,
              marginBottom: 8
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#E6EDF3", marginBottom: 6 }}>
                {search.title ? search.title.substring(0, 50) : "Produit sans titre"}...
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#8B949E", flexWrap: "wrap", gap: 8 }}>
                <span>Amazon: €{search.amazonPrice}</span>
                <span>Alibaba: €{search.alibabaPrice || 'N/A'}</span>
                {search.margin && (
                  <>
                    <span style={{ 
                      color: parseFloat(search.margin.margin) >= 30 ? "#00C853" : "#FF9900",
                      fontWeight: 700
                    }}>
                      Marge: {search.margin.margin}%
                    </span>
                    <span style={{ color: "#00C853", fontWeight: 700 }}>
                      Profit: €{search.margin.profit}
                    </span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(AdvancedAnalyticsDashboard);
