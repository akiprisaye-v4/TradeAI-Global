import React from "react";
import { useState, useMemo } from "react";

function StockManagement({ products, setProducts, setToast }) {
  const [stockHistory, setStockHistory] = useState({});
  const [supplierOrders, setSupplierOrders] = useState([]);

  // Calcul du stock restant
  const stockStatus = useMemo(() => {
    return products.map(p => {
      const dailySales = p.units / 30;
      const daysRemaining = p.initialOrderUnits > 0 ? Math.round(p.initialOrderUnits / dailySales) : 0;
      const needsReorder = daysRemaining <= (p.supplierLeadDays || 30);
      const urgency = daysRemaining <= (p.supplierLeadDays || 30) * 0.5 ? "critical" : needsReorder ? "warning" : "ok";
      
      return {
        ...p,
        daysRemaining,
        needsReorder,
        urgency,
        dailySales: dailySales.toFixed(1),
      };
    }).sort((a, b) => a.daysRemaining - b.daysRemaining);
  }, [products]);

  // Créer une commande fournisseur
  const createOrder = (product, quantity) => {
    const order = {
      id: Date.now(),
      productId: product.name,
      productName: product.name,
      quantity: parseInt(quantity),
      unitCost: product.costPrice,
      totalCost: quantity * product.costPrice,
      status: "pending",
      orderDate: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + (product.supplierLeadDays || 30) * 24 * 60 * 60 * 1000).toISOString(),
    };
    
    setSupplierOrders(prev => [order, ...prev]);
    setToast({ message: `✅ Commande créée pour ${product.name}`, type: "success" });
  };

  // Historique des stocks (simulation)
  const updateStockHistory = (product, quantity) => {
    const key = product.name;
    const entry = {
      date: new Date().toISOString(),
      quantity: parseInt(quantity),
      type: quantity > 0 ? "restock" : "sale",
    };
    
    setStockHistory(prev => ({
      ...prev,
      [key]: [...(prev[key] || []), entry].slice(-50), // Garder les 50 derniers
    }));
  };

  return (
    <div style={{ display: "grid", gap: 16 }}>
      {/* Tableau des stocks */}
      <div style={{ background: "#161B22", border: "1px solid #21262D", borderRadius: 12, padding: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#FF9900", marginBottom: 12 }}>📦 État des stocks ({products.length} produits)</div>
        
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #30363D" }}>
                <th style={{ textAlign: "left", padding: "10px 8px", color: "#8B949E", fontWeight: 700 }}>Produit</th>
                <th style={{ textAlign: "right", padding: "10px 8px", color: "#8B949E", fontWeight: 700 }}>Stock actuel</th>
                <th style={{ textAlign: "right", padding: "10px 8px", color: "#8B949E", fontWeight: 700 }}>Ventes/jour</th>
                <th style={{ textAlign: "right", padding: "10px 8px", color: "#8B949E", fontWeight: 700 }}>Jours restants</th>
                <th style={{ textAlign: "center", padding: "10px 8px", color: "#8B949E", fontWeight: 700 }}>Statut</th>
                <th style={{ textAlign: "center", padding: "10px 8px", color: "#8B949E", fontWeight: 700 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {stockStatus.map((p, i) => {
                const statusColor = p.urgency === "critical" ? "#FF3D00" : p.urgency === "warning" ? "#FF9900" : "#00C853";
                const statusText = p.urgency === "critical" ? "🚨 Urgent" : p.urgency === "warning" ? "⚠️ Bientôt" : "✅ OK";
                
                return (
                  <tr key={i} style={{ borderBottom: "1px solid #21262D" }}>
                    <td style={{ padding: "10px 8px", color: "#E6EDF3", fontWeight: 600 }}>{p.name}</td>
                    <td style={{ padding: "10px 8px", textAlign: "right", color: "#E6EDF3" }}>{p.initialOrderUnits} u</td>
                    <td style={{ padding: "10px 8px", textAlign: "right", color: "#8B949E" }}>{p.dailySales}</td>
                    <td style={{ padding: "10px 8px", textAlign: "right", color: statusColor, fontWeight: 700 }}>{p.daysRemaining} j</td>
                    <td style={{ padding: "10px 8px", textAlign: "center" }}>
                      <span style={{ padding: "4px 8px", background: `${statusColor}20`, color: statusColor, borderRadius: 12, fontSize: 10, fontWeight: 700 }}>
                        {statusText}
                      </span>
                    </td>
                    <td style={{ padding: "10px 8px", textAlign: "center" }}>
                      {p.needsReorder && (
                        <button
                          onClick={() => createOrder(p, p.initialOrderUnits)}
                          style={{ background: "#FF9900", border: "none", borderRadius: 6, padding: "6px 12px", color: "#0D1117", fontWeight: 700, fontSize: 10, cursor: "pointer" }}
                        >
                          Commander
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Commandes fournisseurs */}
      {supplierOrders.length > 0 && (
        <div style={{ background: "#161B22", border: "1px solid #21262D", borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#FF9900", marginBottom: 12 }}>📋 Commandes fournisseurs</div>
          <div style={{ display: "grid", gap: 10 }}>
            {supplierOrders.map((order, i) => (
              <div key={i} style={{ padding: "12px 14px", background: "#1C2128", borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#E6EDF3", marginBottom: 4 }}>{order.productName}</div>
                  <div style={{ fontSize: 11, color: "#8B949E" }}>
                    {order.quantity} u × €{order.unitCost} = <strong style={{ color: "#FF9900" }}>€{order.totalCost.toFixed(2)}</strong>
                  </div>
                  <div style={{ fontSize: 10, color: "#8B949E", marginTop: 4 }}>
                    Livraison estimée: {new Date(order.estimatedDelivery).toLocaleDateString("fr-FR")}
                  </div>
                </div>
                <div style={{ padding: "6px 12px", background: "#FF990020", color: "#FF9900", borderRadius: 12, fontSize: 10, fontWeight: 700 }}>
                  En attente
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Prévisions de rupture */}
      <div style={{ background: "#161B22", border: "1px solid #21262D", borderRadius: 12, padding: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#FF3D00", marginBottom: 12 }}>⚠️ Prévisions de rupture</div>
        {stockStatus.filter(p => p.urgency === "critical").length === 0 ? (
          <div style={{ textAlign: "center", padding: 30, color: "#8B949E" }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>✅</div>
            <div>Aucune rupture prévue dans les 30 prochains jours</div>
          </div>
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {stockStatus.filter(p => p.urgency === "critical").map((p, i) => (
              <div key={i} style={{ padding: "12px 14px", background: "#FF3D0010", border: "1px solid #FF3D0040", borderLeft: "3px solid #FF3D00", borderRadius: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#E6EDF3", marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: "#FF3D00", marginBottom: 4 }}>
                  Rupture prévue dans {p.daysRemaining} jours
                </div>
                <div style={{ fontSize: 11, color: "#8B949E" }}>
                  Ventes: {p.dailySales} unités/jour · Stock: {p.initialOrderUnits} unités
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(StockManagement);
