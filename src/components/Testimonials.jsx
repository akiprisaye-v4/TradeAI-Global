import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Marie L.",
      role: "Vendeuse Amazon FBA",
      image: "https://i.pravatar.cc/150?img=1",
      text: "TradeAI Global a transformé ma façon de travailler. J'ai augmenté mes marges de 40% en seulement 2 mois !",
      rating: 5
    },
    {
      name: "Thomas D.",
      role: "Dropshipper",
      image: "https://i.pravatar.cc/150?img=3",
      text: "L'analyse Amazon → Alibaba est incroyable. Je trouve des produits rentables en quelques minutes.",
      rating: 5
    },
    {
      name: "Sophie M.",
      role: "Entrepreneuse E-commerce",
      image: "https://i.pravatar.cc/150?img=5",
      text: "Les 10 visualisations m'aident à prendre de meilleures décisions. L'export PDF est parfait pour mes présentations.",
      rating: 5
    },
    {
      name: "Karim B.",
      role: "Vendeur Amazon",
      image: "https://i.pravatar.cc/150?img=8",
      text: "Interface intuitive et fonctionnalités puissantes. Le mode PWA me permet de travailler partout.",
      rating: 5
    }
  ];

  return (
    <div style={{ padding: "40px 20px", background: "#0D1117", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ 
          fontSize: "36px", 
          textAlign: "center", 
          marginBottom: "20px",
          background: "linear-gradient(135deg, #FF9900 0%, #FFB800 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          💬 Ce que disent nos utilisateurs
        </h1>
        
        <p style={{ 
          textAlign: "center", 
          color: "#8B949E", 
          fontSize: "18px", 
          marginBottom: "60px",
          maxWidth: "600px",
          margin: "0 auto 60px"
        }}>
          Découvrez les témoignages de vendeurs Amazon qui utilisent TradeAI Global au quotidien
        </p>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: "30px" 
        }}>
          {testimonials.map((testimonial, idx) => (
            <div key={idx} style={{
              padding: "30px",
              background: "#161B22",
              border: "1px solid #21262D",
              borderRadius: "16px",
              transition: "all 0.3s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 12px 24px rgba(255,153,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
            >
              <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    marginRight: "16px",
                    border: "3px solid #FF9900"
                  }}
                />
                <div>
                  <div style={{ fontWeight: 700, color: "#E6EDF3", fontSize: "16px" }}>
                    {testimonial.name}
                  </div>
                  <div style={{ color: "#8B949E", fontSize: "13px" }}>
                    {testimonial.role}
                  </div>
                </div>
              </div>
              
              <div style={{ marginBottom: "12px" }}>
                {"⭐".repeat(testimonial.rating)}
              </div>
              
              <p style={{ color: "#E6EDF3", lineHeight: 1.6, fontSize: "14px" }}>
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>

        <div style={{ 
          marginTop: "60px",
          padding: "40px",
          background: "linear-gradient(135deg, rgba(255,153,0,0.1) 0%, rgba(255,153,0,0.05) 100%)",
          border: "2px solid #FF990033",
          borderRadius: "16px",
          textAlign: "center"
        }}>
          <h2 style={{ color: "#FF9900", marginBottom: "16px", fontSize: "24px" }}>
            🚀 Rejoignez plus de 1000+ vendeurs satisfaits
          </h2>
          <p style={{ color: "#8B949E", marginBottom: "24px", fontSize: "16px" }}>
            Commencez à utiliser TradeAI Global gratuitement dès maintenant
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            style={{
              padding: "16px 32px",
              background: "linear-gradient(135deg, #FF9900 0%, #FFB800 100%)",
              border: "none",
              borderRadius: "12px",
              color: "#0D1117",
              fontWeight: 700,
              fontSize: "16px",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(255,153,0,0.3)"
            }}
          >
            Essayer gratuitement →
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Testimonials);
