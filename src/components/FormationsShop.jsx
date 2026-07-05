import React, { useState } from 'react';

const FormationsShop = () => {
  const [selectedPack, setSelectedPack] = useState(null);

  const formations = [
    {
      id: 1,
      title: "Débuter en e-commerce rentable",
      subtitle: "Lancez votre business en 30 jours",
      duration: "4h30",
      level: "Débutant",
      price: 197,
      originalPrice: 297,
      icon: "🎓",
      color: "#3B82F6",
      students: 1247,
      rating: 4.8,
      modules: [
        "Choisir son premier produit rentable",
        "Trouver un fournisseur fiable sur Alibaba",
        "Créer son compte vendeur Amazon",
        "Optimiser sa fiche produit (SEO)",
        "Lancer sa première campagne PPC",
        "Gérer ses stocks et commandes"
      ],
      bonuses: [
        "✅ Checklist de lancement (PDF)",
        "✅ Template de calcul de marge",
        "✅ Liste de 50 fournisseurs vérifiés"
      ],
      testimonial: {
        text: "La formation m’a aidé à structurer le lancement de mon premier produit et à mieux suivre mes coûts.",
        author: "Marie L.",
        role: "Vendeuse FBA depuis 6 mois"
      }
    },
    {
      id: 2,
      title: "Optimisation SEO marketplace",
      subtitle: "Dominez les résultats de recherche",
      duration: "3h15",
      level: "Intermédiaire",
      price: 247,
      originalPrice: 397,
      icon: "🔍",
      color: "#8B5CF6",
      students: 892,
      rating: 4.9,
      modules: [
        "Maîtriser l'algorithme A9 d'Amazon",
        "Recherche de mots-clés avancée",
        "Optimisation du titre et des bullets",
        "Backend keywords et search terms",
        "Stratégie de images et A+ Content",
        "Analyse de la concurrence"
      ],
      bonuses: [
        "✅ Outil de recherche de keywords",
        "✅ 100 templates de titres optimisés",
        "✅ Guide A+ Content complet"
      ],
      testimonial: {
        text: "Les techniques SEO présentées m’ont aidé à mieux structurer mes fiches produit et mon suivi.",
        author: "Thomas D.",
        role: "Vendeur FBA depuis 2 ans"
      }
    },
    {
      id: 3,
      title: "Publicité marketplace avancée",
      subtitle: "Maximisez votre ROI publicitaire",
      duration: "5h00",
      level: "Avancé",
      price: 347,
      originalPrice: 597,
      icon: "📢",
      color: "#FF9900",
      students: 634,
      rating: 4.9,
      modules: [
        "Structure de campagnes avancée",
        "Sponsored Products, Brands, Display",
        "Optimisation automatique et manuelle",
        "Stratégies de bidding avancées",
        "Analyse et optimisation ACoS/TACoS",
        "Scaling et automation PPC"
      ],
      bonuses: [
        "✅ Templates de campagnes PPC",
        "✅ Spreadsheet de suivi ACoS",
        "✅ 20 stratégies de bidding testées"
      ],
      testimonial: {
        text: "ACoS réduit de 35% à 18% en 30 jours. Cette formation m'a fait économiser des milliers d'euros.",
        author: "Sophie M.",
        role: "Vendeuse FBA - 7 figures"
      }
    },
    {
      id: 4,
      title: "Scaling & Automatisation",
      subtitle: "Passez de 5k€ à 50k€/mois",
      duration: "4h00",
      level: "Expert",
      price: 497,
      originalPrice: 997,
      icon: "🚀",
      color: "#00C853",
      students: 421,
      rating: 5.0,
      modules: [
        "Systèmes d'automatisation complète",
        "Expansion multi-marketplace",
        "Création de marque privée (Private Label)",
        "Stratégies de diversification",
        "Gestion d'équipe et délégation",
        "Exit strategy et valorisation"
      ],
      bonuses: [
        "✅ SOPs (procédures opérationnelles)",
        "✅ Templates de contrats fournisseurs",
        "✅ Accès au mastermind privé"
      ],
      testimonial: {
        text: "Je suis passé de 8k€ à 67k€/mois en 8 mois. L'automatisation a tout changé.",
        author: "Jean-Pierre R.",
        role: "Entrepreneur FBA - 8 figures"
      }
    }
  ];

  const packs = [
    {
      id: 'complete',
      name: "Pack Complet",
      description: "Les 4 formations + tous les bonus",
      price: 997,
      originalPrice: 1288,
      saving: 291,
      color: "#FF9900",
      popular: true,
      features: [
        "✅ Accès à vie aux 4 formations",
        "✅ Tous les bonus inclus",
        "✅ Mises à jour gratuites",
        "✅ Support prioritaire",
        "✅ Accès communauté privée",
        "✅ Certificat de completion"
      ]
    },
    {
      id: 'subscription',
      name: "Abonnement Annuel",
      description: "Accès illimité + nouvelles formations",
      price: 47,
      period: "/mois",
      annualPrice: 564,
      color: "#00C853",
      popular: false,
      features: [
        "✅ Accès à toutes les formations",
        "✅ Nouvelles formations chaque mois",
        "✅ Webinaires exclusifs",
        "✅ Coaching de groupe mensuel",
        "✅ Ressources premium",
        "✅ Annulable à tout moment"
      ]
    }
  ];

  return (
    <div style={{ padding: '40px 20px', background: '#0D1117', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ fontSize: 60, marginBottom: 20 }}>🎓</div>
          <h1 style={{ 
            fontSize: 48, 
            fontWeight: 900,
            marginBottom: 20,
            background: 'linear-gradient(135deg, #FF9900 0%, #FFB800 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Formations e-commerce
          </h1>
          <p style={{ 
            color: '#8B949E', 
            fontSize: 20, 
            maxWidth: 700,
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Des formations pratiques et actionnables pour transformer votre business Amazon. 
            Rejoignez <strong style={{ color: '#FF9900' }}>3,194+ vendeurs</strong> qui ont déjà boosté leurs ventes.
          </p>
        </div>

        {/* Garantie */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(0,200,83,0.1) 0%, rgba(0,200,83,0.05) 100%)',
          border: '2px solid #00C853',
          borderRadius: 16,
          padding: 24,
          marginBottom: 50,
          textAlign: 'center'
        }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🛡️</div>
          <h3 style={{ color: '#00C853', fontSize: 20, marginBottom: 8 }}>
            Politique de remboursement selon conditions commerciales
          </h3>
          <p style={{ color: '#E6EDF3', fontSize: 14, margin: 0 }}>
            Les conditions d’accès, d’essai et de support seront précisées avant toute activation commerciale.
          </p>
        </div>

        {/* Formations individuelles */}
        <div style={{ marginBottom: 60 }}>
          <h2 style={{ 
            color: '#E6EDF3', 
            fontSize: 32, 
            fontWeight: 800, 
            marginBottom: 32,
            textAlign: 'center'
          }}>
            💎 Formations Individuelles
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: 24
          }}>
            {formations.map((formation) => (
              <div key={formation.id} style={{
                background: '#161B22',
                border: `2px solid ${formation.color}33`,
                borderRadius: 20,
                padding: 28,
                position: 'relative',
                transition: 'all 0.3s',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = `0 12px 40px ${formation.color}44`;
                e.currentTarget.style.borderColor = formation.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = `${formation.color}33`;
              }}
              >
                {/* Badge réduction */}
                <div style={{
                  position: 'absolute',
                  top: -12,
                  right: 20,
                  background: '#FF3D00',
                  color: '#fff',
                  padding: '4px 12px',
                  borderRadius: 12,
                  fontSize: 11,
                  fontWeight: 800
                }}>
                  -{Math.round((1 - formation.price / formation.originalPrice) * 100)}%
                </div>

                {/* Icon et titre */}
                <div style={{ fontSize: 50, marginBottom: 16 }}>{formation.icon}</div>
                <h3 style={{ 
                  color: formation.color, 
                  fontSize: 22, 
                  fontWeight: 800, 
                  marginBottom: 8
                }}>
                  {formation.title}
                </h3>
                <p style={{ 
                  color: '#8B949E', 
                  fontSize: 14, 
                  marginBottom: 20
                }}>
                  {formation.subtitle}
                </p>

                {/* Métriques */}
                <div style={{ 
                  display: 'flex', 
                  gap: 16, 
                  marginBottom: 20,
                  fontSize: 12,
                  color: '#8B949E'
                }}>
                  <span>⏱️ {formation.duration}</span>
                  <span>📊 {formation.level}</span>
                  <span>⭐ {formation.rating}/5</span>
                  <span>👥 {formation.students}</span>
                </div>

                {/* Modules */}
                <div style={{ marginBottom: 20, flex: 1 }}>
                  <div style={{ 
                    fontSize: 12, 
                    color: '#FF9900', 
                    fontWeight: 700, 
                    marginBottom: 12,
                    textTransform: 'uppercase'
                  }}>
                    📚 Programme ({formation.modules.length} modules)
                  </div>
                  <ul style={{ 
                    listStyle: 'none', 
                    padding: 0, 
                    margin: 0,
                    fontSize: 13
                  }}>
                    {formation.modules.slice(0, 4).map((module, i) => (
                      <li key={i} style={{ 
                        padding: '6px 0',
                        color: '#E6EDF3',
                        borderBottom: '1px solid #21262D'
                      }}>
                        ✓ {module}
                      </li>
                    ))}
                    {formation.modules.length > 4 && (
                      <li style={{ 
                        padding: '6px 0',
                        color: '#8B949E',
                        fontStyle: 'italic'
                      }}>
                        + {formation.modules.length - 4} autres modules...
                      </li>
                    )}
                  </ul>
                </div>

                {/* Bonus */}
                <div style={{ 
                  padding: 12,
                  background: `${formation.color}15`,
                  borderRadius: 8,
                  marginBottom: 20
                }}>
                  <div style={{ 
                    fontSize: 11, 
                    color: formation.color, 
                    fontWeight: 700,
                    marginBottom: 8
                  }}>
                    🎁 Bonus inclus
                  </div>
                  {formation.bonuses.map((bonus, i) => (
                    <div key={i} style={{ 
                      fontSize: 12, 
                      color: '#E6EDF3',
                      padding: '2px 0'
                    }}>
                      {bonus}
                    </div>
                  ))}
                </div>

                {/* Prix */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'baseline', 
                    gap: 8,
                    marginBottom: 4
                  }}>
                    <span style={{ 
                      fontSize: 36, 
                      fontWeight: 900, 
                      color: formation.color
                    }}>
                      {formation.price}€
                    </span>
                    <span style={{ 
                      fontSize: 18, 
                      color: '#8B949E',
                      textDecoration: 'line-through'
                    }}>
                      {formation.originalPrice}€
                    </span>
                  </div>
                  <div style={{ 
                    fontSize: 12, 
                    color: '#00C853',
                    fontWeight: 600
                  }}>
                    Économisez {formation.originalPrice - formation.price}€
                  </div>
                </div>

                {/* Bouton */}
                <button
                  type="button"
                                    onClick={() => window.dispatchEvent(new CustomEvent('tradeai:notify', {
                                      detail: {
                                        type: 'info',
                                        message: `Formation « ${formation.title || formation.name || 'sélectionnée'} » : accès en préparation.`
                                      }
                                    }))} style={{
                  width: '100%',
                  padding: '14px',
                  background: `linear-gradient(135deg, ${formation.color} 0%, ${formation.color}CC 100%)`,
                  border: 'none',
                  borderRadius: 12,
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: 15,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: `0 4px 16px ${formation.color}44`
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = `0 6px 20px ${formation.color}66`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = `0 4px 16px ${formation.color}44`;
                }}
                >
                  Accéder à la formation →
                </button>

                {/* Témoignage */}
                <div style={{ 
                  marginTop: 20,
                  padding: 12,
                  background: '#1C2128',
                  borderRadius: 8,
                  borderLeft: `3px solid ${formation.color}`
                }}>
                  <div style={{ 
                    fontSize: 12, 
                    color: '#E6EDF3',
                    fontStyle: 'italic',
                    marginBottom: 8,
                    lineHeight: 1.5
                  }}>
                    "{formation.testimonial.text}"
                  </div>
                  <div style={{ 
                    fontSize: 11, 
                    color: '#8B949E'
                  }}>
                    — {formation.testimonial.author}, {formation.testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Packs */}
        <div style={{ marginBottom: 60 }}>
          <h2 style={{ 
            color: '#E6EDF3', 
            fontSize: 32, 
            fontWeight: 800, 
            marginBottom: 32,
            textAlign: 'center'
          }}>
            💰 Offres Spéciales
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: 24
          }}>
            {packs.map((pack) => (
              <div key={pack.id} style={{
                background: pack.popular 
                  ? `linear-gradient(135deg, ${pack.color}15 0%, ${pack.color}05 100%)`
                  : '#161B22',
                border: `3px solid ${pack.color}`,
                borderRadius: 20,
                padding: 32,
                position: 'relative',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = `0 12px 40px ${pack.color}44`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                {pack.popular && (
                  <div style={{
                    position: 'absolute',
                    top: -14,
                    right: 20,
                    background: `linear-gradient(135deg, ${pack.color} 0%, ${pack.color}CC 100%)`,
                    color: '#fff',
                    padding: '6px 16px',
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 800,
                    boxShadow: `0 4px 12px ${pack.color}66`
                  }}>
                    ⭐ OFFRE MISE EN AVANT
                  </div>
                )}

                <h3 style={{ 
                  color: pack.color, 
                  fontSize: 28, 
                  fontWeight: 800, 
                  marginBottom: 8
                }}>
                  {pack.name}
                </h3>
                <p style={{ 
                  color: '#8B949E', 
                  fontSize: 14, 
                  marginBottom: 24
                }}>
                  {pack.description}
                </p>

                {/* Prix */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'baseline', 
                    gap: 8,
                    marginBottom: 4
                  }}>
                    <span style={{ 
                      fontSize: 48, 
                      fontWeight: 900, 
                      color: pack.color
                    }}>
                      {pack.price}€
                    </span>
                    <span style={{ 
                      fontSize: 18, 
                      color: '#8B949E'
                    }}>
                      {pack.period || ''}
                    </span>
                  </div>
                  {pack.originalPrice && (
                    <>
                      <div style={{ 
                        fontSize: 16, 
                        color: '#8B949E',
                        textDecoration: 'line-through',
                        marginBottom: 4
                      }}>
                        {pack.originalPrice}€
                      </div>
                      <div style={{ 
                        fontSize: 14, 
                        color: '#00C853',
                        fontWeight: 700
                      }}>
                        💰 Économisez {pack.saving}€
                      </div>
                    </>
                  )}
                  {pack.annualPrice && (
                    <div style={{ 
                      fontSize: 14, 
                      color: '#8B949E',
                      marginTop: 4
                    }}>
                      Soit {pack.annualPrice}€/an
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul style={{ 
                  listStyle: 'none', 
                  padding: 0, 
                  margin: 0,
                  marginBottom: 24
                }}>
                  {pack.features.map((feature, i) => (
                    <li key={i} style={{ 
                      padding: '10px 0',
                      color: '#E6EDF3',
                      fontSize: 14,
                      borderBottom: '1px solid #21262D'
                    }}>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Bouton */}
                <button
                  type="button"
                                    onClick={() => window.dispatchEvent(new CustomEvent('tradeai:notify', {
                                      detail: {
                                        type: 'info',
                                        message: `Offre « ${pack.name || pack.title || 'sélectionnée'} » : parcours de souscription en préparation.`
                                      }
                                    }))} style={{
                  width: '100%',
                  padding: '16px',
                  background: `linear-gradient(135deg, ${pack.color} 0%, ${pack.color}CC 100%)`,
                  border: 'none',
                  borderRadius: 12,
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: 16,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: `0 4px 16px ${pack.color}44`
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = `0 6px 20px ${pack.color}66`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = `0 4px 16px ${pack.color}44`;
                }}
                >
                  {pack.id === 'subscription' ? "S'abonner maintenant" : "Choisir ce pack"} →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{
          background: '#161B22',
          borderRadius: 20,
          padding: 40,
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
              { q: "Les formations sont-elles accessibles à vie ?", a: "Oui, pour les formations individuelles et le Pack Complet, vous avez un accès à vie. Pour l'abonnement annuel, l'accès est maintenu tant que l'abonnement est actif." },
              { q: "Y a-t-il un support en cas de question ?", a: "Oui, tous nos étudiants bénéficient d'un support par email. Le Pack Complet et l'Abonnement incluent un accès à notre communauté privée et un support prioritaire." },
              { q: "Les formations sont-elles mises à jour ?", a: "Absolument ! Amazon évolue constamment et nous mettons à jour nos formations régulièrement. Toutes les mises à jour sont gratuites pour les étudiants." },
              { q: "Puis-je suivre les formations à mon rythme ?", a: "Oui, toutes nos formations sont 100% en ligne et accessibles 24h/24. Vous pouvez les suivre à votre rythme, depuis n'importe quel appareil." },
              { q: "Comment fonctionne la politique de remboursement ?", a: "Les conditions, délais et modalités applicables seront précisés dans les conditions commerciales lors de l’activation du paiement sécurisé." }
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

export default FormationsShop;
