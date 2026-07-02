import React from "react";

export default function AProposPage({
  handleImageUpload,
  searchOnAmazonAlibaba,
  imageResults,
  amazonResults,
  alibabaResults
}) {
  return (
    <div style={{ background:"#161B22", border:"1px solid #21262D", borderRadius: 11, padding:"20px" }}>
      <h2 style={{ color:"#FF9900", marginBottom: 10 }}>Amazon Profit Pro Élite</h2>

      <div style={{ background: "var(--bg-card)", borderRadius: 12, padding: 20, marginBottom: 20 }}>
        <h3 style={{ color: "var(--text-primary)", marginBottom: 15 }}>📸 Recherche par Image</h3>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{
            width: "100%",
            padding: 12,
            background: "var(--bg-tertiary)",
            border: "2px dashed var(--border-color)",
            borderRadius: 8,
            color: "var(--text-primary)",
            marginBottom: 15
          }}
        />

        <button
          onClick={searchOnAmazonAlibaba}
          style={{
            width: "100%",
            padding: 12,
            background: "linear-gradient(135deg, #FF9900 0%, #FFB800 100%)",
            border: "none",
            borderRadius: 8,
            color: "#0D1117",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          🔍 Rechercher sur Amazon & Alibaba
        </button>

        {imageResults && (
          <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>
            <div style={{ background: "var(--bg-tertiary)", padding: 15, borderRadius: 8 }}>
              <h5 style={{ color: "#FF9900" }}>🛒 Amazon</h5>
              {amazonResults.map((p, i) => (
                <div key={i} style={{ background: "var(--bg-card)", padding: 10, marginBottom: 10, borderRadius: 6 }}>
                  <img src={p.image} alt={p.name} style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 4, marginBottom: 8 }} />
                  <div style={{ fontSize: 14, fontWeight: "bold", color: "var(--text-primary)" }}>{p.name}</div>
                  <div style={{ fontSize: 16, color: "#FF9900", fontWeight: "bold" }}>{p.price}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "var(--bg-tertiary)", padding: 15, borderRadius: 8 }}>
              <h5 style={{ color: "#00C853" }}>🏭 Alibaba</h5>
              {alibabaResults.map((p, i) => (
                <div key={i} style={{ background: "var(--bg-card)", padding: 10, marginBottom: 10, borderRadius: 6 }}>
                  <img src={p.image} alt={p.name} style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 4, marginBottom: 8 }} />
                  <div style={{ fontSize: 14, fontWeight: "bold", color: "var(--text-primary)" }}>{p.name}</div>
                  <div style={{ fontSize: 16, color: "#00C853", fontWeight: "bold" }}>{p.price}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <p style={{ color:"#8B949E", lineHeight: 1.6, marginBottom: 16 }}>
        Calculateur de profit expert pour vendeurs Amazon FBA/FBM avec 40+ fonctionnalités.
      </p>
    </div>
  );
}
