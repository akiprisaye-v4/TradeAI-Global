import React, { useState, useEffect } from 'react';

const Tutorial = ({ onClose }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "👋 Bienvenue sur TradeAI Global",
      content: "Calculez vos marges e-commerce en quelques clics. Cet outil vous aide à trouver des produits rentables et à optimiser vos profits.",
      icon: "🎯",
      color: "#FF9900"
    },
    {
      title: "📊 Calculateur de Marge",
      content: "Entrez le prix de vente Amazon, le coût produit, et les frais. L'outil calcule automatiquement votre profit, marge nette, ROI et cash-flow sur 12 mois.",
      icon: "🧮",
      color: "#00C853"
    },
    {
      title: "💡 Produits Tendance",
      content: "Explorez 5 scénarios produit indicatifs. Cliquez sur 'Utiliser ce produit' pour pré-remplir le calculateur avec des hypothèses locales modifiables.",
      icon: "✨",
      color: "#FFD54F"
    },
    {
      title: "🤖 Assistant IA",
      content: "Recevez des recommandations personnalisées basées sur vos données. L'IA analyse votre marge, ROI, et vous suggère des optimisations concrètes.",
      icon: "💡",
      color: "#3B82F6"
    },
    {
      title: "📈 Dashboard & Analytics",
      content: "Visualisez vos performances globales, comparez vos produits, et identifiez les opportunités d'amélioration avec des graphiques interactifs.",
      icon: "📊",
      color: "#8B5CF6"
    },
    {
      title: "📦 Gestion des Stocks",
      content: "Suivez vos niveaux de stock, recevez des alertes de réapprovisionnement, et évitez les ruptures qui coûtent cher.",
      icon: "📦",
      color: "#06B6D4"
    },
    {
      title: "🎯 Analyse Concurrentielle",
      content: "Comparez votre positionnement face à la concurrence. Analysez les prix, avis, et stratégies des autres vendeurs.",
      icon: "🎯",
      color: "#FF5722"
    },
    {
      title: "📥 Export & Sauvegarde",
      content: "Exportez votre portfolio en Excel, sauvegardez vos calculs dans l'historique, et récupérez-les à tout moment.",
      icon: "💾",
      color: "#00C853"
    },
    {
      title: "🚀 Prêt à commencer ?",
      content: "Vous êtes maintenant prêt à utiliser TradeAI Global comme un pro ! Commencez par calculer votre premier produit ou explorez les produits tendance.",
      icon: "🚀",
      color: "#FF9900"
    }
  ];

  const currentStep = steps[step];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.85)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
      backdropFilter: 'blur(8px)'
    }}>
      <div style={{
        background: '#161B22',
        borderRadius: 20,
        padding: 28,
        maxWidth: 560,
        width: '100%',
        border: `2px solid ${currentStep.color}`,
        boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${currentStep.color}33`
      }}>
        {/* Icône */}
        <div style={{ 
          fontSize: 58, 
          textAlign: 'center', 
          marginBottom: 18,
          filter: `drop-shadow(0 4px 12px ${currentStep.color}66)`
        }}>
          {currentStep.icon}
        </div>

        {/* Titre */}
        <h2 style={{ 
          color: currentStep.color, 
          marginBottom: 16, 
          textAlign: 'center',
          fontSize: 24,
          fontWeight: 800
        }}>
          {currentStep.title}
        </h2>

        {/* Contenu */}
        <p style={{ 
          color: '#E6EDF3', 
          lineHeight: 1.55, 
          marginBottom: 24, 
          textAlign: 'center',
          fontSize: 16
        }}>
          {currentStep.content}
        </p>
        
        {/* Boutons */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              style={{
                padding: '12px 24px',
                background: '#21262D',
                border: '1px solid #30363D',
                borderRadius: 10,
                color: '#E6EDF3',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: 14,
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = '#30363D'}
              onMouseLeave={(e) => e.target.style.background = '#21262D'}
            >
              ← Précédent
            </button>
          )}
          {step < steps.length - 1 ? (
            <button
              onClick={() => setStep(step + 1)}
              style={{
                padding: '12px 32px',
                background: `linear-gradient(135deg, ${currentStep.color} 0%, ${currentStep.color}CC 100%)`,
                border: 'none',
                borderRadius: 10,
                color: '#0D1117',
                cursor: 'pointer',
                fontWeight: 800,
                fontSize: 14,
                boxShadow: `0 4px 16px ${currentStep.color}66`,
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Suivant →
            </button>
          ) : (
            <button
              onClick={onClose}
              style={{
                padding: '12px 32px',
                background: 'linear-gradient(135deg, #00C853 0%, #00C853CC 100%)',
                border: 'none',
                borderRadius: 10,
                color: '#fff',
                cursor: 'pointer',
                fontWeight: 800,
                fontSize: 14,
                boxShadow: '0 4px 16px rgba(0,200,83,0.4)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Commencer ! 🚀
            </button>
          )}
        </div>
        
        {/* Indicateurs de progression */}
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 22 }}>
          {steps.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === step ? 32 : 8,
                height: 8,
                borderRadius: 4,
                background: i === step ? currentStep.color : '#30363D',
                transition: 'all 0.3s'
              }}
            />
          ))}
        </div>

        {/* Numéro d'étape */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: 16,
          fontSize: 12,
          color: '#8B949E'
        }}>
          Étape {step + 1} sur {steps.length}
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
