import React, { useState, useRef, useEffect } from 'react';

const ChatAssistant = ({ isOpen, onClose, products, activeProduct, calcP, p, mk }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "👋 Bonjour ! Je suis votre assistant TradeAI Global. Comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage) => {
    const lowerMsg = userMessage.toLowerCase();
    
    // Navigation
    if (lowerMsg.includes('onglet') || lowerMsg.includes('menu') || lowerMsg.includes('navigation')) {
      return {
        content: "📋 Voici les onglets disponibles :\n\n• 📊 **Dashboard** : Vue d'ensemble de votre portfolio\n• 📈 **Analytics** : Statistiques détaillées\n• 🤖 **TradeAI** : Recommandations IA\n• 📦 **Stocks** : Gestion des stocks\n• 🎯 **Concurrents** : Analyse concurrentielle\n• 📊 **Calcul** : Calculateur principal\n• 💡 **Idées** : Produits tendance\n• 💲 **Pricing** : Optimisation des prix\n• ⚖️ **Portfolio** : Comparateur multi-produits\n• 🕐 **Historique** : Vos calculs sauvegardés\n\nCliquez sur l'onglet souhaité pour y accéder !",
        suggestions: ['Comment calculer ma marge ?', 'Quels sont les frais Amazon ?', 'Comment exporter mes données ?']
      };
    }

    // Calcul de marge
    if (lowerMsg.includes('marge') || lowerMsg.includes('profit') || lowerMsg.includes('calculer')) {
      const currentMargin = calcP?.netMargin || 0;
      const currentProfit = calcP?.profit || 0;
      return {
        content: `💰 **Calcul de votre marge actuelle :**\n\n• Marge nette : **${currentMargin.toFixed(1)}%**\n• Profit par unité : **${currentProfit.toFixed(2)}€**\n• Profit mensuel : **${(currentProfit * (p?.units || 0)).toFixed(2)}€**\n\n💡 **Pour améliorer votre marge :**\n1. Réduisez vos coûts d'achat\n2. Optimisez votre prix de vente\n3. Diminuez les frais de publicité PPC\n4. Choisissez une catégorie avec moins de commissions\n\nVoulez-vous que je vous aide à optimiser votre marge ?`,
        suggestions: ['Comment réduire mes coûts ?', 'Optimiser mon prix', 'Voir les frais Amazon']
      };
    }

    // Frais Amazon
    if (lowerMsg.includes('frais') || lowerMsg.includes('commission') || lowerMsg.includes('amazon')) {
      return {
        content: "**Frais Amazon FBA principaux :**\n\n• **Commission** : 8-17% selon la catégorie\n• **Frais FBA** : 2.70€ - 12€ selon la taille/poids\n• **Stockage** : 0.90€ - 4.50€/m³/mois\n• **Stockage longue durée** : +6.90€/m³ (> 365 jours)\n• **Publicité PPC** : Variable (budget recommandé : 1-3€/unité)\n\n**Recommandation :** Utilisez l'onglet 📊 Calcul pour tester différents scénarios locaux et voir l'impact des frais sur votre marge.",
        suggestions: ['Comment réduire les frais ?', 'Quelle catégorie choisir ?', 'Optimiser le stockage']
      };
    }

    // Produits tendance
    if (lowerMsg.includes('idée') || lowerMsg.includes('produit') || lowerMsg.includes('tendance') || lowerMsg.includes('trouver')) {
      return {
        content: "**Méthode d’analyse des produits rentables :**\n\n1. **Allez dans l'onglet 💡 Idées** : Explorez 5 scénarios produit indicatifs, non temps réel, avec hypothèses locales de prix et de coûts\n2. **Utilisez Amazon→Alibaba** : Comparez les prix pour calculer votre marge d'arbitrage\n3. **Vérifiez la concurrence** : Onglet 🎯 Concurrents pour analyser le marché\n4. **Testez avec le calculateur** : Simulez différents scénarios\n\n**Critères de rentabilité :**\n• Marge nette > 20%\n• ROI > 50%\n• Score > 7/10\n• Peu de concurrence directe",
        suggestions: ['Voir les produits tendance', 'Comment analyser la concurrence ?', 'Calculer ma marge']
      };
    }

    // Export
    if (lowerMsg.includes('export') || lowerMsg.includes('pdf') || lowerMsg.includes('excel') || lowerMsg.includes('télécharger')) {
      return {
        content: "📥 **Options d'export disponibles :**\n\n• **📊 Export Excel** : Dans l'onglet ⚖️ Portfolio, cliquez sur \"Export Excel\"\n• **📄 Export PDF** : Utilisez le bouton \"Export PDF\" dans le calculateur\n• **💾 Sauvegarde locale** : Vos données sont automatiquement sauvegardées\n• **🕐 Historique** : Onglet Historique pour retrouver vos anciens calculs\n\n**Recommandation :** Exportez régulièrement votre portfolio pour suivre vos performances dans le temps !",
        suggestions: ['Comment exporter en PDF ?', 'Voir mon historique', 'Sauvegarder mes données']
      };
    }

    // Aide générale
    if (lowerMsg.includes('aide') || lowerMsg.includes('comment') || lowerMsg.includes('tutorial') || lowerMsg.includes('tutoriel')) {
      return {
        content: "🎓 **Guide de démarrage rapide :**\n\n**1️⃣ Premier calcul :**\n• Allez dans 📊 Calcul\n• Entrez le prix de vente Amazon\n• Entrez le coût d'achat\n• Le profit et la marge se calculent automatiquement\n\n**2️⃣ Ajouter plusieurs produits :**\n• Cliquez sur \"+ Ajouter\" en haut\n• Chaque produit a ses propres paramètres\n• Comparez-les dans ⚖️ Portfolio\n\n**3️⃣ Optimiser vos prix :**\n• Utilisez 💲 Pricing pour voir 50 scénarios\n• Comparez les scénarios de prix pour identifier le meilleur résultat selon vos hypothèses\n\n**4️⃣ Suivre vos performances :**\n• 📊 Dashboard : Vue d'ensemble\n• 📈 Analytics : Statistiques détaillées\n• 🕐 Historique : Retrouvez vos calculs",
        suggestions: ['Comment calculer ma marge ?', 'Voir les produits tendance', 'Exporter mes données']
      };
    }

    // Optimisation
    if (lowerMsg.includes('optimis') || lowerMsg.includes('améliorer') || lowerMsg.includes('augmenter')) {
      const currentMargin = calcP?.netMargin || 0;
      return {
        content: `**Stratégies d’optimisation pour ${p?.name || 'votre produit'} :**\n\n**Marge actuelle : ${currentMargin.toFixed(1)}%**\n\n${currentMargin < 15 ? '⚠️ Votre marge est faible. Voici comment l\'améliorer :\n' : 'La marge actuelle est satisfaisante. Axes d’optimisation :\n'}\n• **Prix** : Testez +5-10% si la concurrence le permet\n• **Coûts** : Négociez avec vos fournisseurs\n• **Publicité** : Optimisez votre ACoS (Advertising Cost of Sales)\n• **Catégorie** : Choisissez une catégorie avec commissions réduites\n• **Taille FBA** : Réduisez dimensions/poids pour baisser les frais\n\nUtilisez le module Pricing pour évaluer différents scénarios de prix.`,
        suggestions: ['Optimiser mon prix', 'Réduire mes coûts', 'Voir les frais Amazon']
      };
    }

    // Stock
    if (lowerMsg.includes('stock') || lowerMsg.includes('réapprovision') || lowerMsg.includes('rupture')) {
      return {
        content: "**Gestion des stocks :**\n\n• **Onglet 📦 Stocks** : Vue détaillée de tous vos produits\n• **Alertes automatiques** : Vous êtes notifié quand le stock est bas\n• **Calcul de réapprovisionnement** : Basé sur vos ventes et délais fournisseur\n\n**Bonnes pratiques :**\n• Repère indicatif : évaluez une couverture de 60-90 jours selon vos ventes, délais et saisonnalité\n• Scénario indicatif : anticipez le réassort selon votre délai fournisseur réel et votre vitesse de vente\n• Surveillez les pics saisonniers ; leur impact doit être estimé à partir de vos données historiques\n• Utilisez l'onglet 📊 Calcul pour estimer vos besoins localement\n\n**Recommandation :** Activez les alertes dans les paramètres pour ne jamais manquer de stock !",
        suggestions: ['Comment calculer mes besoins ?', 'Gérer les pics saisonniers', 'Voir mes alertes']
      };
    }

    // Concurrence
    if (lowerMsg.includes('concurrent') || lowerMsg.includes('concurrence') || lowerMsg.includes('marché')) {
      return {
        content: "🎯 **Analyse concurrentielle :**\n\n• **Onglet 🎯 Concurrents** : Comparez votre positionnement\n• **Prix** : Positionnez-vous stratégiquement\n• **Avis** : Définissez un objectif d’avis conforme aux règles de la marketplace et fondé sur vos données réelles\n• **Publicité** : Ciblez les mots-clés de vos concurrents\n\n💡 **Scénarios à évaluer :**\n1. **Prix d'appel** : testez un écart de prix comme scénario local, puis validez-le avec des données concurrentielles vérifiables\n2. **Différenciation** : Mettez en avant vos avantages\n3. **Qualité** : Une meilleure qualité peut contribuer à de meilleurs avis, sans garantie de résultat\n4. **Service** : Livraison rapide, garantie, support\n\n📊 Utilisez 📈 Analytics pour voir votre position vs le marché !",
        suggestions: ['Comment me positionner ?', 'Analyser mes concurrents', 'Optimiser ma publicité']
      };
    }

    // Par défaut
    return {
      content: "🤔 Je ne suis pas sûr de comprendre. Voici ce que je peux faire :\n\n• **Calculer votre marge** et profit\n• **Expliquer les frais Amazon**\n• **Analyser des opportunités produit**\n• 📥 **Exporter vos données** (PDF, Excel)\n• 🎓 **Vous guider dans l'application**\n• 🚀 **Optimiser vos performances**\n• **Gérer vos stocks**\n• **Analyser la concurrence**\n\nPosez-moi une question ou cliquez sur une suggestion ci-dessous !",
      suggestions: ['Comment calculer ma marge ?', 'Voir les produits tendance', 'Guide de démarrage', 'Optimiser mon profit']
    };
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Délai de réponse local
    setTimeout(() => {
      const response = generateResponse(input);
      const assistantMessage = {
        role: 'assistant',
        content: response.content,
        suggestions: response.suggestions,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 500);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setTimeout(() => handleSend(), 100);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      width: 380,
      height: 600,
      background: '#161B22',
      borderRadius: 16,
      border: '2px solid #FF9900',
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1001
    }}>
      {/* Header */}
      <div style={{
        padding: '16px',
        background: 'linear-gradient(135deg, #FF9900 0%, #FFB800 100%)',
        borderRadius: '14px 14px 0 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 24 }}>🤖</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0D1117' }}>Assistant IA</div>
            <div style={{ fontSize: 10, color: '#0D1117' }}>En ligne • Prêt à aider</div>
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'rgba(0,0,0,0.2)',
            border: 'none',
            borderRadius: 8,
            width: 32,
            height: 32,
            cursor: 'pointer',
            fontSize: 18,
            color: '#0D1117',
            fontWeight: 700
          }}
         aria-label="Fermer l’assistant">
          ✕
        </button>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }}>
        {messages.map((msg, i) => (
          <div key={i}>
            <div style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: 4
            }}>
              <div style={{
                maxWidth: '80%',
                padding: '10px 14px',
                borderRadius: 12,
                background: msg.role === 'user' ? '#FF9900' : '#21262D',
                color: msg.role === 'user' ? '#0D1117' : '#E6EDF3',
                fontSize: 13,
                lineHeight: 1.5,
                whiteSpace: 'pre-wrap'
              }}>
                {msg.content}
              </div>
            </div>
            {msg.suggestions && (
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginLeft: 8 }}>
                {msg.suggestions.map((suggestion, j) => (
                  <button
                    key={j}
                    onClick={() => handleSuggestionClick(suggestion)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 16,
                      border: '1px solid #FF9900',
                      background: 'transparent',
                      color: '#FF9900',
                      fontSize: 11,
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: 16,
        borderTop: '1px solid #21262D',
        display: 'flex',
        gap: 8
      }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Posez votre question..."
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: 8,
            border: '1px solid #30363D',
            background: '#0D1117',
            color: '#E6EDF3',
            fontSize: 13,
            outline: 'none'
          }}
        />
        <button
          onClick={handleSend}
          style={{
            padding: '10px 16px',
            borderRadius: 8,
            border: 'none',
            background: '#FF9900',
            color: '#0D1117',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: 13
          }}
        >
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default ChatAssistant;
