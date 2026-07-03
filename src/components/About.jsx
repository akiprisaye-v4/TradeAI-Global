import React from 'react';

const About = () => {
  return (
    <div style={{
      padding: "40px 20px",
      background: "#0D1117",
      minHeight: "100vh"
    }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{
          fontSize: "36px",
          textAlign: "center",
          marginBottom: "20px",
          background: "linear-gradient(135deg, #FF9900 0%, #FFB800 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          🚀 À propos d'TradeAI Global
        </h1>

        <div style={{
          padding: "30px",
          background: "#161B22",
          border: "1px solid #21262D",
          borderRadius: "12px",
          marginBottom: "20px"
        }}>
          <h2 style={{ color: "#FF9900", marginBottom: "16px", fontSize: "24px" }}>
            🎯 Notre Mission
          </h2>
          <p style={{ color: "#E6EDF3", lineHeight: 1.8, marginBottom: "16px" }}>
            TradeAI Global est un outil gratuit conçu pour aider les vendeurs Amazon FBA
            et les dropshippers à trouver des produits rentables en comparant les prix entre
            Amazon et Alibaba.
          </p>
          <p style={{ color: "#E6EDF3", lineHeight: 1.8 }}>
            Notre objectif est de démocratiser l'accès à l'analyse de rentabilité pour
            tous les entrepreneurs e-commerce, sans frais ni abonnement.
          </p>
        </div>

        <div style={{
          padding: "30px",
          background: "#161B22",
          border: "1px solid #21262D",
          borderRadius: "12px",
          marginBottom: "20px"
        }}>
          <h2 style={{ color: "#FF9900", marginBottom: "16px", fontSize: "24px" }}>
            ⭐ Fonctionnalités Principales
          </h2>
          <ul style={{ color: "#E6EDF3", lineHeight: 2, paddingLeft: "20px" }}>
            <li>✅ Comparaison Amazon → Alibaba en 2 clics</li>
            <li>✅ Calcul automatique des marges avec frais Amazon</li>
            <li>✅ 10 visualisations exclusives (projections, risques, etc.)</li>
            <li>✅ Export PDF professionnel des analyses</li>
            <li>✅ Comparateur multi-produits (jusqu'à 5 produits)</li>
            <li>✅ Installation mobile (PWA) et mode hors ligne</li>
            <li>✅ Dashboard Analytics avec statistiques avancées</li>
            <li>✅ Export CSV pour analyse externe</li>
          </ul>
        </div>

        <div style={{
          padding: "30px",
          background: "#161B22",
          border: "1px solid #21262D",
          borderRadius: "12px",
          marginBottom: "20px"
        }}>
          <h2 style={{ color: "#FF9900", marginBottom: "16px", fontSize: "24px" }}>
            🔧 Technologies Utilisées
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "12px" }}>
            {[
              { name: "React 18", icon: "⚛️" },
              { name: "Vite 5", icon: "⚡" },
              { name: "Recharts", icon: "📊" },
              { name: "jsPDF", icon: "📄" },
              { name: "html2canvas", icon: "🖼️" },
              { name: "PWA", icon: "📱" }
            ].map((tech, idx) => (
              <div key={idx} style={{
                padding: "16px",
                background: "#1C2128",
                border: "1px solid #30363D",
                borderRadius: "8px",
                textAlign: "center"
              }}>
                <div style={{ fontSize: "24px", marginBottom: "8px" }}>{tech.icon}</div>
                <div style={{ color: "#E6EDF3", fontSize: "13px", fontWeight: 600 }}>{tech.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          padding: "30px",
          background: "linear-gradient(135deg, rgba(255,153,0,0.1) 0%, rgba(255,153,0,0.05) 100%)",
          border: "2px solid #FF990033",
          borderRadius: "12px",
          textAlign: "center"
        }}>
          <h2 style={{ color: "#FF9900", marginBottom: "16px", fontSize: "24px" }}>
            💡 Freemium & Transparent
          </h2>
          <p style={{ color: "#E6EDF3", lineHeight: 1.8, marginBottom: "16px" }}>
            TradeAI Global offre une version de base gratuite avec des fonctionnalités essentielles. Les plans Pro et Elite débloquent des fonctionnalités avancées.
            Vos données restent sur votre appareil (localStorage).
          </p>
          <p style={{ color: "#8B949E", fontSize: "14px" }}>
            Version 5.2.0 • Déployé sur Vercel • Dernière mise à jour : 30 juin 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(About);
