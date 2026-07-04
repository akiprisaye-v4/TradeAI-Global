import React from "react";

export default function IdeasPage({
  TRENDING_PRODUCTS,
  activeProduct,
  setProducts,
  setTab,
  setToast,
  fmt
}) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
      {TRENDING_PRODUCTS.map((item, i) => (
        <div key={i} style={{ background: "#161B22", border: "1px solid #21262D", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
          <div style={{ width: "100%", height: 200, overflow: "hidden", position: "relative", background: "#1C2128" }}>
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }}
              onError={(e) => {
                e.target.style.display = "none";
                const fallback = document.createElement("div");
        fallback.style.display = "flex";
        fallback.style.alignItems = "center";
        fallback.style.justifyContent = "center";
        fallback.style.height = "100%";
        fallback.style.fontSize = "60px";
        fallback.textContent = item.icon;
        e.target.parentElement.replaceChildren(fallback);
              }}
            />
          </div>

          <div style={{ padding: "16px" }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: "#E6EDF3" }}>{item.icon} {item.name}</div>
            <div style={{ fontSize: 11, color: "#8B949E", marginBottom: 12 }}>{item.category}</div>

            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <div style={{ flex: 1, padding: "8px", background: "#1C2128", borderRadius: 6 }}>
                <div style={{ fontSize: 9, color: "#8B949E" }}>Prix Amazon</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#FF9900" }}>{fmt(item.amazonPriceRange[0])}-{fmt(item.amazonPriceRange[1])}</div>
              </div>
              <div style={{ flex: 1, padding: "8px", background: "#1C2128", borderRadius: 6 }}>
                <div style={{ fontSize: 9, color: "#8B949E" }}>Prix Alibaba</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#00C853" }}>{fmt(item.alibabaPriceRange[0])}-{fmt(item.alibabaPriceRange[1])}</div>
              </div>
            </div>

            <div style={{ padding: "8px", background: `${item.color}15`, borderRadius: 6, marginBottom: 12 }}>
              <div style={{ fontSize: 10, color: item.color, fontWeight: 700 }}>Croissance: {item.estimatedGrowthSignal}</div>
              <div style={{ fontSize: 10, color: "#8B949E", marginTop: 2 }}>{item.note}</div>
            </div>

            <button
              onClick={() => {
                setProducts(prev => prev.map((prod, idx) => idx === activeProduct ? {
                  ...prod,
                  name: item.name,
                  sellingPrice: (item.amazonPriceRange[0] + item.amazonPriceRange[1]) / 2,
                  costPrice: (item.alibabaPriceRange[0] + item.alibabaPriceRange[1]) / 2,
                  categoryIdx: item.categoryIdx
                } : prod));
                setTab("calculateur");
                setToast({ message:`✅ ${item.name} chargé`, type: "success"});
              }}
              style={{ width: "100%", background: "linear-gradient(135deg, #FF9900 0%, #FFB800 100%)", border: "none", borderRadius: 8, padding: "12px", color: "#0D1117", fontWeight: 700, fontSize: 13, cursor: "pointer", boxShadow: "0 2px 8px rgba(255,153,0,0.3)" }}
            >
              Utiliser ce produit →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
