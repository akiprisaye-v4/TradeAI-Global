import React from 'react';

const Pricing = () => {
  const plans = [
    {
      name: "Gratuit",
      price: "0€",
      period: "pour toujours",
      features: [
        "✅ Calcul de marge illimité",
        "✅ 10 visualisations",
        "✅ Export PDF (3/mois)",
        "✅ Historique local",
        "✅ PWA mobile",
        "❌ Import CSV",
        "❌ Analyses IA avancées",
        "❌ Support prioritaire"
      ],
      cta: "Déjà actif",
      color: "#30363D",
      popular: false
    },
    {
      name: "Pro",
      price: "19.99€",
      period: "/mois",
      features: [
        "✅ Tout du gratuit",
        "✅ Export PDF illimité",
        "✅ Import CSV (100 produits)",
        "✅ Analyses IA avancées",
        "✅ Comparateur 10 produits",
        "✅ Sauvegarde cloud",
        "✅ Support email prioritaire",
        "✅ Mises à jour prioritaires"
      ],
      cta: "Choisir Pro",
      color: "#FF9900",
      popular: true
    },
    {
      name: "Elite",
      price: "49.99€",
      period: "/mois",
      features: [
        "✅ Tout du Pro",
        "✅ Connecteurs marketplace avancés",
        "✅ Alertes automatiques",
        "✅ Formation e-commerce exclusive",
        "✅ Consultation mensuelle (30min)",
        "✅ Fonctionnalités beta",
        "✅ Support prioritaire",
        "✅ Accès communauté privée"
      ],
      cta: "Choisir Elite",
      color: "#00C853",
      popular: false
    }
  ];

  const formations = [
    { title: "Débuter en e-commerce rentable", duration: "4h30", level: "Débutant", icon: "🎓" },
    { title: "Optimisation SEO marketplace", duration: "3h15", level: "Intermédiaire", icon: "🔍" },
    { title: "Publicité marketplace avancée", duration: "5h00", level: "Avancé", icon: "📢" },
    { title: "Scaling & Automatisation", duration: "4h00", level: "Expert", icon: "🚀" }
  ];

  return (
    <div style={{ padding: '40px 20px', background: '#0D1117', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <h1 style={{ 
            fontSize: 42, 
            fontWeight: 900,
            marginBottom: 16,
            background: 'linear-gradient(135deg, #FF9900 0%, #FFB800 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            💎 Nos Formules
          </h1>
          <p style={{ 
            color: '#8B949E', 
            fontSize: 18, 
            maxWidth: 600,
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Choisissez la formule qui correspond à vos besoins. Passez à la vitesse supérieure avec nos plans Pro et Elite.
          </p>
        </div>

        {/* Plans */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: 24,
          marginBottom: 60
        }}>
          {plans.map((plan, i) => (
            <div key={i} style={{
              background: plan.popular ? 'linear-gradient(135deg, rgba(255,153,0,0.1) 0%, rgba(255,153,0,0.05) 100%)' : '#161B22',
              border: `2px solid ${plan.color}`,
              borderRadius: 20,
              padding: 32,
              position: 'relative',
              transition: 'transform 0.3s, box-shadow 0.3s',
              boxShadow: plan.popular ? '0 8px 32px rgba(255,153,0,0.3)' : '0 4px 16px rgba(0,0,0,0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = `0 12px 40px ${plan.color}44`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = plan.popular ? '0 8px 32px rgba(255,153,0,0.3)' : '0 4px 16px rgba(0,0,0,0.3)';
            }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: -14,
                  right: 20,
                  background: 'linear-gradient(135deg, #FF9900 0%, #FFB800 100%)',
                  color: '#0D1117',
                  padding: '6px 16px',
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 800,
                  boxShadow: '0 4px 12px rgba(255,153,0,0.4)'
                }}>
                  ⭐ POPULAIRE
                </div>
              )}
              
              <h3 style={{ 
                fontSize: 28, 
                fontWeight: 800, 
                color: '#E6EDF3', 
                marginBottom: 12 
              }}>
                {plan.name}
              </h3>
              
              <div style={{ marginBottom: 28 }}>
                <span style={{ 
                  fontSize: 48, 
                  fontWeight: 900, 
                  color: plan.color 
                }}>
                  {plan.price}
                </span>
                <span style={{ 
                  fontSize: 16, 
                  color: '#8B949E',
                  marginLeft: 4
                }}>
                  {plan.period}
                </span>
              </div>

              <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                marginBottom: 32,
                minHeight: 320
              }}>
                {plan.features.map((feature, j) => (
                  <li key={j} style={{
                    padding: '10px 0',
                    color: feature.startsWith('❌') ? '#484F58' : '#E6EDF3',
                    fontSize: 14,
                    borderBottom: '1px solid #21262D',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                                onClick={() => window.dispatchEvent(new CustomEvent('tradeai:notify', {
                                  detail: {
                                    type: 'info',
                                    message: `Offre « ${plan.name || plan.title || 'sélectionnée'} » : activation en préparation.`
                                  }
                                }))} style={{
                width: '100%',
                padding: '16px',
                background: plan.popular ? 'linear-gradient(135deg, #FF9900 0%, #FFB800 100%)' : '#21262D',
                border: 'none',
                borderRadius: 12,
                color: plan.popular ? '#0D1117' : '#E6EDF3',
                fontWeight: 800,
                fontSize: 16,
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: plan.popular ? '0 4px 16px rgba(255,153,0,0.4)' : 'none'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                if (plan.popular) e.target.style.boxShadow = '0 6px 20px rgba(255,153,0,0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                if (plan.popular) e.target.style.boxShadow = '0 4px 16px rgba(255,153,0,0.4)';
              }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Formations */}
        <div style={{
          background: '#161B22',
          borderRadius: 20,
          padding: 40,
          border: '1px solid #30363D'
        }}>
          <h2 style={{ 
            color: '#FF9900', 
            marginBottom: 12, 
            fontSize: 32,
            fontWeight: 800,
            textAlign: 'center'
          }}>
            🎓 Formations Incluses (Plans Pro & Elite)
          </h2>
          <p style={{
            color: '#8B949E',
            textAlign: 'center',
            marginBottom: 32,
            fontSize: 16
          }}>
            Accédez à des formations vidéo exclusives pour maîtriser le sourcing, la rentabilité et les opérations e-commerce
          </p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: 20 
          }}>
            {formations.map((formation, i) => (
              <div key={i} style={{
                padding: 24,
                background: '#1C2128',
                borderRadius: 16,
                border: '1px solid #30363D',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#FF9900';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#30363D';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                <div style={{ fontSize: 40, marginBottom: 12 }}>
                  {formation.icon}
                </div>
                <h4 style={{ 
                  color: '#E6EDF3', 
                  marginBottom: 12, 
                  fontSize: 18,
                  fontWeight: 700
                }}>
                  {formation.title}
                </h4>
                <div style={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 13,
                  color: '#8B949E'
                }}>
                  <span>⏱️ {formation.duration}</span>
                  <span style={{ 
                    color: '#FF9900',
                    fontWeight: 600
                  }}>
                    {formation.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{
          marginTop: 60,
          padding: 40,
          background: '#161B22',
          borderRadius: 20,
          border: '1px solid #30363D'
        }}>
          <h2 style={{ 
            color: '#FF9900', 
            marginBottom: 32, 
            fontSize: 32,
            fontWeight: 800,
            textAlign: 'center'
          }}>
            ❓ Questions Fréquentes
          </h2>
          
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              { q: "Puis-je changer de plan à tout moment ?", a: "Oui, vous pourrez faire évoluer votre formule selon les options disponibles dans votre espace client." },
              { q: "Y a-t-il une période d'engagement ?", a: "Les modalités d’abonnement seront affichées clairement avant toute souscription." },
              { q: "Comment fonctionne la garantie satisfait ou remboursé ?", a: "Les conditions commerciales seront précisées lors de l’activation du paiement sécurisé." },
              { q: "Les formations sont-elles incluses dans le plan Gratuit ?", a: "Non, les formations sont réservées aux plans Pro et Elite. Le plan Gratuit donne accès aux fonctionnalités de base." }
            ].map((faq, i) => (
              <div key={i} style={{
                padding: 20,
                background: '#1C2128',
                borderRadius: 12,
                border: '1px solid #30363D'
              }}>
                <div style={{ 
                  fontSize: 16, 
                  fontWeight: 700, 
                  color: '#FF9900',
                  marginBottom: 8
                }}>
                  {faq.q}
                </div>
                <div style={{ 
                  fontSize: 14, 
                  color: '#E6EDF3',
                  lineHeight: 1.6
                }}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
