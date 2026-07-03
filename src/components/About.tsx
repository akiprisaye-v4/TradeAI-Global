import React from 'react';

const About: React.FC = () => {
  return (
    <div style={{
      maxWidth: '900px',
      margin: '0 auto',
      padding: '40px 20px',
      color: '#fff'
    }}>
      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: '60px',
        padding: '40px 20px',
        background: 'linear-gradient(135deg, rgba(255,153,0,0.15) 0%, rgba(255,184,0,0.05) 100%)',
        borderRadius: '20px',
        border: '1px solid rgba(255,153,0,0.2)'
      }}>
        <h1 style={{
          fontSize: '42px',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #FF9900 0%, #FFD700 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '16px'
        }}>
          TradeAI Global Élite
        </h1>
        <p style={{
          fontSize: '20px',
          color: '#94a3b8',
          maxWidth: '700px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          La plateforme d'intelligence commerciale pour piloter rentabilité, sourcing et décisions e-commerce
        </p>
      </div>

      {/* Pour Qui */}
      <div style={{ marginBottom: '50px' }}>
        <h2 style={{
          fontSize: '32px',
          fontWeight: '700',
          marginBottom: '30px',
          color: '#FF9900'
        }}>
          🎯 Pour Qui ?
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {[
            {
              title: 'Vendeurs e-commerce',
              desc: 'Débutants ou confirmés voulant maximiser leurs profits',
              icon: '📦'
            },
            {
              title: 'Arbitragistes',
              desc: 'Professionnels du retail/online arbitrage cherchant les meilleures opportunités',
              icon: '🎯'
            },
            {
              title: 'Marques Privées',
              desc: 'Créateurs de marques voulant optimiser leur rentabilité',
              icon: '🏷️'
            },
            {
              title: 'Agences E-commerce',
              desc: 'Gestionnaires de comptes Amazon multiples',
              icon: '💼'
            }
          ].map((item, idx) => (
            <div key={idx} style={{
              padding: '24px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '16px',
              transition: 'all 0.3s'
            }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>{item.icon}</div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: '#fff' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.5' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Pourquoi */}
      <div style={{ marginBottom: '50px' }}>
        <h2 style={{
          fontSize: '32px',
          fontWeight: '700',
          marginBottom: '30px',
          color: '#FF9900'
        }}>
          💡 Pourquoi Utiliser TradeAI Global ?
        </h2>
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
          padding: '32px'
        }}>
          {[
            'Calculs précis de rentabilité incluant TOUS les frais Amazon (FBA, FBM, TVA, commissions)',
            'Analyse en temps réel de la concurrence et du marché',
            'Gestion intelligente des stocks avec alertes de réapprovisionnement',
            'Prévisions de cash-flow sur 12 mois',
            'Optimisation automatique des prix pour maximiser les profits',
            'Suivi des performances et analytics avancés',
            'Support multi-marketplaces (FR, DE, UK, IT, ES, US, etc.)',
            'Export de données pour vos présentations et reporting'
          ].map((point, idx) => (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: '16px',
              paddingBottom: idx < 7 ? '16px' : '0',
              borderBottom: idx < 7 ? '1px solid rgba(255,255,255,0.05)' : 'none'
            }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '28px',
                height: '28px',
                background: 'linear-gradient(135deg, #FF9900, #FFD700)',
                borderRadius: '50%',
                marginRight: '16px',
                fontSize: '14px',
                fontWeight: '700',
                flexShrink: 0
              }}>
                ✓
              </span>
              <span style={{ fontSize: '16px', color: '#e2e8f0', lineHeight: '1.6' }}>
                {point}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Fonctionnalités */}
      <div style={{ marginBottom: '50px' }}>
        <h2 style={{
          fontSize: '32px',
          fontWeight: '700',
          marginBottom: '30px',
          color: '#FF9900'
        }}>
          🚀 Fonctionnalités Clés
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {[
            {
              title: 'Calculateur de Profit',
              desc: 'Calculez vos marges, ROI et cash-flow en quelques clics',
              icon: '🧮',
              color: '#3b82f6'
            },
            {
              title: 'Product Hunter',
              desc: 'Découvrez 55+ produits tendance avec données de marché',
              icon: '🎯',
              color: '#10b981'
            },
            {
              title: 'TradeAI Copilot',
              desc: 'Assistant IA pour optimiser vos décisions',
              icon: '🤖',
              color: '#8b5cf6'
            },
            {
              title: 'Analytics Avancés',
              desc: 'Tableaux de bord et rapports détaillés',
              icon: '📊',
              color: '#f59e0b'
            },
            {
              title: 'Gestion des Stocks',
              desc: 'Suivi en temps réel et alertes intelligentes',
              icon: '📦',
              color: '#ef4444'
            },
            {
              title: 'Analyse Concurrentielle',
              desc: 'Surveillez vos concurrents et adaptez votre stratégie',
              icon: '🏆',
              color: '#06b6d4'
            }
          ].map((feature, idx) => (
            <div key={idx} style={{
              padding: '28px',
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${feature.color}40`,
              borderRadius: '16px',
              transition: 'all 0.3s'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>{feature.icon}</div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#fff' }}>
                {feature.title}
              </h3>
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.6' }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{
        padding: '40px',
        background: 'linear-gradient(135deg, rgba(255,153,0,0.1) 0%, rgba(255,184,0,0.05) 100%)',
        borderRadius: '20px',
        border: '1px solid rgba(255,153,0,0.2)',
        marginBottom: '50px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '30px',
          textAlign: 'center'
        }}>
          {[
            { value: '55+', label: 'Produits analysés' },
            { value: '12', label: 'Marketplaces' },
            { value: '40+', label: 'Fonctionnalités' },
            { value: '24/7', label: 'Disponibilité' }
          ].map((stat, idx) => (
            <div key={idx}>
              <div style={{
                fontSize: '42px',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #FF9900, #FFD700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '8px'
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '14px', color: '#94a3b8' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{
        textAlign: 'center',
        padding: '40px 20px'
      }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: '700',
          marginBottom: '16px',
          color: '#fff'
        }}>
          Prêt à maximiser vos profits Amazon ?
        </h2>
        <p style={{
          fontSize: '16px',
          color: '#94a3b8',
          marginBottom: '32px'
        }}>
          Rejoignez des centaines de vendeurs qui font confiance à TradeAI Global
        </p>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        padding: '30px 20px',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        color: '#64748b',
        fontSize: '14px'
      }}>
        <p>© 2024 TradeAI Global Élite - Tous droits réservés</p>
        <p style={{ marginTop: '8px' }}>
          Développé avec ❤️ pour les vendeurs e-commerce
        </p>
      </div>
    </div>
  );
};

export default About;
