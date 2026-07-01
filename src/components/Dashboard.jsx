import React from "react";
import { useMemo, useState } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#00C853", "#FF9900", "#FF3D00", "#5C6BC0", "#AB47BC", "#26A69A"];

function Dashboard({ products, fxRates, calcProduct, buildCashFlow, fmt, fmtPct, profitColor, scoreColor, MARKETPLACES, setTab, setActiveProduct }) {
  const [timeRange, setTimeRange] = useState("12m");
  const [sortBy, setSortBy] = useState("profit");

  // Calculs globaux
  const globalStats = useMemo(() => {
    if (!products || products.length === 0) {
      return { totalRevenue: 0, totalProfit: 0, totalUnits: 0, avgMargin: 0, bestProduct: null, worstProduct: null };
    }

    let totalRevenue = 0;
    let totalProfit = 0;
    let totalUnits = 0;
    let totalMargin = 0;
    let bestProduct = null;
    let worstProduct = null;
    let bestScore = -Infinity;
    let worstScore = Infinity;

    products.forEach(p => {
      const c = calcProduct(p, fxRates);
      const revenue = p.sellingPrice * p.units;
      const profit = c.monthlyProfit;
      totalRevenue += revenue;
      totalProfit += profit;
      totalUnits += p.units;
      totalMargin += c.netMargin;

      if (c.score > bestScore) {
        bestScore = c.score;
        bestProduct = { ...p, calc: c };
      }
      if (c.score < worstScore) {
        worstScore = c.score;
        worstProduct = { ...p, calc: c };
      }
    });

    return {
      totalRevenue,
      totalProfit,
      totalUnits,
      avgMargin: totalMargin / products.length,
      bestProduct,
      worstProduct,
    };
  }, [products, fxRates]);

  // Données par marketplace
  const marketplaceData = useMemo(() => {
    const data = {};
    products.forEach(p => {
      const mk = p.marketplace || "FR";
      const c = calcProduct(p, fxRates);
      if (!data[mk]) {
        data[mk] = { marketplace: mk, profit: 0, revenue: 0, units: 0, count: 0 };
      }
      data[mk].profit += c.monthlyProfit;
      data[mk].revenue += p.sellingPrice * p.units;
      data[mk].units += p.units;
      data[mk].count += 1;
    });
    return Object.values(data).map(d => ({
      name: MARKETPLACES[d.marketplace]?.label || d.marketplace,
      profit: +d.profit.toFixed(2),
      revenue: +d.revenue.toFixed(2),
      units: d.units,
    }));
  }, [products, fxRates]);

  // Cash-flow consolidé
  const consolidatedCashFlow = useMemo(() => {
    if (products.length === 0) return [];
    const months = Array.from({ length: 12 }, (_, i) => ({
      month: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"][i],
      profit: 0,
      revenue: 0,
    }));

    products.forEach(p => {
      const c = calcProduct(p, fxRates);
      const cf = buildCashFlow(p, c);
      cf.rows.forEach((row, i) => {
        months[i].profit += row.cumulative > 0 ? c.profit * p.units : 0;
        months[i].revenue += p.sellingPrice * p.units;
      });
    });

    return months.map(m => ({
      ...m,
      profit: +m.profit.toFixed(2),
      revenue: +m.revenue.toFixed(2),
    }));
  }, [products, fxRates]);

  // Produits triés
  const sortedProducts = useMemo(() => {
    const withCalc = products.map(p => ({ ...p, calc: calcProduct(p, fxRates) }));
    return withCalc.sort((a, b) => {
      if (sortBy === "profit") return b.calc.monthlyProfit - a.calc.monthlyProfit;
      if (sortBy === "margin") return b.calc.netMargin - a.calc.netMargin;
      if (sortBy === "roi") return b.calc.roi - a.calc.roi;
      if (sortBy === "score") return b.calc.score - a.calc.score;
      if (sortBy === "units") return b.units - a.units;
      return 0;
    });
  }, [products, fxRates, sortBy]);

  // Alertes
  const alerts = useMemo(() => {
    const list = [];
    products.forEach(p => {
      const c = calcProduct(p, fxRates);
      const daysOfStock = p.units > 0 ? (p.initialOrderUnits / p.units) * 30 : 0;
      
      if (c.profit < 0) {
        list.push({ type: "danger", product: p.name, message: "Produit en perte", icon: "💸" });
      }
      if (c.netMargin < 10) {
        list.push({ type: "warning", product: p.name, message: `Marge faible (${c.netMargin.toFixed(1)}%)`, icon: "⚠️" });
      }
      if (daysOfStock < (p.supplierLeadDays || 30) && daysOfStock > 0) {
        list.push({ type: "warning", product: p.name, message: `Stock bas (${daysOfStock.toFixed(0)} jours)`, icon: "📦" });
      }
      if (c.score >= 8) {
        list.push({ type: "success", product: p.name, message: `Excellent produit (score ${c.score}/10)`, icon: "🚀" });
      }
    });
    return list;
  }, [products, fxRates]);

  if (products.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px", background: "#161B22", borderRadius: 12, border: "1px solid #21262D" }}>
        <div style={{ fontSize: 60, marginBottom: 20 }}>📊</div>
        <h2 style={{ color: "#FF9900", marginBottom: 10 }}>Dashboard Vide</h2>
        <p style={{ color: "#8B949E", marginBottom: 20 }}>Ajoutez des produits pour voir vos statistiques</p>
        <button onClick={() => setTab("calculateur")} style={{ background: "#FF9900", border: "none", borderRadius: 7, padding: "10px 20px", color: "#0D1117", fontWeight: 700, cursor: "pointer" }}>
          Ajouter un produit →
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      {/* KPIs globaux */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
        <div style={{ background: "#161B22", border: "1px solid #21262D", borderRadius: 11, padding: 16 }}>
          <div style={{ fontSize: 10, color: "#8B949E", fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>💰 Chiffre d'affaires</div>
          <div style={{ fontSize: 24, fontWeight: 900, color: "#00C853" }}>€{globalStats.totalRevenue.toLocaleString("fr-FR", { maximumFractionDigits: 0 })}</div>
          <div style={{ fontSize: 11, color: "#8B949E", marginTop: 4 }}>par mois</div>
        </div>
        <div style={{ background: "#161B22", border: "1px solid #21262D", borderRadius: 11, padding: 16 }}>
          <div style={{ fontSize: 10, color: "#8B949E", fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>📈 Profit net</div>
          <div style={{ fontSize: 24, fontWeight: 900, color: globalStats.totalProfit >= 0 ? "#00C853" : "#FF3D00" }}>
            {globalStats.totalProfit >= 0 ? "+" : ""}€{globalStats.totalProfit.toLocaleString("fr-FR", { maximumFractionDigits: 0 })}
          </div>
          <div style={{ fontSize: 11, color: "#8B949E", marginTop: 4 }}>par mois</div>
        </div>
        <div style={{ background: "#161B22", border: "1px solid #21262D", borderRadius: 11, padding: 16 }}>
          <div style={{ fontSize: 10, color: "#8B949E", fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>📦 Unités vendues</div>
          <div style={{ fontSize: 24, fontWeight: 900, color: "#FF9900" }}>{globalStats.totalUnits.toLocaleString("fr-FR")}</div>
          <div style={{ fontSize: 11, color: "#8B949E", marginTop: 4 }}>par mois</div>
        </div>
        <div style={{ background: "#161B22", border: "1px solid #21262D", borderRadius: 11, padding: 16 }}>
          <div style={{ fontSize: 10, color: "#8B949E", fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>🎯 Marge moyenne</div>
          <div style={{ fontSize: 24, fontWeight: 900, color: profitColor(globalStats.avgMargin) }}>{globalStats.avgMargin.toFixed(1)}%</div>
          <div style={{ fontSize: 11, color: "#8B949E", marginTop: 4 }}>sur {products.length} produits</div>
        </div>
      </div>

      {/* Graphique Cash-flow */}
      <div style={{ background: "#161B22", border: "1px solid #21262D", borderRadius: 11, padding: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#FF9900", marginBottom: 12 }}>📊 Évolution mensuelle (12 mois)</div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={consolidatedCashFlow}>
            <CartesianGrid strokeDasharray="3 3" stroke="#21262D" />
            <XAxis dataKey="month" stroke="#8B949E" style={{ fontSize: 11 }} />
            <YAxis stroke="#8B949E" style={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ background: "#0D1117", border: "1px solid #30363D", borderRadius: 8 }} />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#FF9900" strokeWidth={2} name="Chiffre d'affaires" />
            <Line type="monotone" dataKey="profit" stroke="#00C853" strokeWidth={2} name="Profit cumulé" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Marketplace + Top produits */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
        <div style={{ background: "#161B22", border: "1px solid #21262D", borderRadius: 11, padding: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#FF9900", marginBottom: 12 }}>🌍 Profit par Marketplace</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={marketplaceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#21262D" />
              <XAxis dataKey="name" stroke="#8B949E" style={{ fontSize: 10 }} />
              <YAxis stroke="#8B949E" style={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "#0D1117", border: "1px solid #30363D", borderRadius: 8 }} />
              <Bar dataKey="profit" name="Profit (€)">
                {marketplaceData.map((entry, index) => (
                  <Cell key={index} fill={entry.profit >= 0 ? "#00C853" : "#FF3D00"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: "#161B22", border: "1px solid #21262D", borderRadius: 11, padding: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#FF9900", marginBottom: 12 }}>🏆 Top 5 Produits</div>
          <div style={{ display: "grid", gap: 8 }}>
            {sortedProducts.slice(0, 5).map((p, i) => {
              const col = profitColor(p.calc.netMargin);
              return (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "#1C2128", borderRadius: 7, cursor: "pointer" }} onClick={() => { setActiveProduct(products.indexOf(p)); setTab("calculateur"); }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: i === 0 ? "#FFD700" : i === 1 ? "#C0C0C0" : i === 2 ? "#CD7F32" : "#8B949E" }}>#{i + 1}</span>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#E6EDF3" }}>{p.name}</div>
                      <div style={{ fontSize: 10, color: "#8B949E" }}>{MARKETPLACES[p.marketplace]?.label || p.marketplace}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: col }}>{fmt(p.calc.monthlyProfit, "€")}/mois</div>
                    <div style={{ fontSize: 10, color: "#8B949E" }}>{p.calc.netMargin.toFixed(1)}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Alertes */}
      {alerts.length > 0 && (
        <div style={{ background: "#161B22", border: "1px solid #21262D", borderRadius: 11, padding: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#FF9900", marginBottom: 12 }}>🔔 Alertes ({alerts.length})</div>
          <div style={{ display: "grid", gap: 8 }}>
            {alerts.slice(0, 6).map((alert, i) => {
              const bgColor = alert.type === "danger" ? "#FF3D0010" : alert.type === "warning" ? "#FF990010" : "#00C85310";
              const borderColor = alert.type === "danger" ? "#FF3D00" : alert.type === "warning" ? "#FF9900" : "#00C853";
              return (
                <div key={i} style={{ padding: "10px 14px", background: bgColor, border: `1px solid ${borderColor}33`, borderLeft: `3px solid ${borderColor}`, borderRadius: 7, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 20 }}>{alert.icon}</span>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#E6EDF3" }}>{alert.product}</div>
                      <div style={{ fontSize: 11, color: borderColor }}>{alert.message}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(Dashboard);
