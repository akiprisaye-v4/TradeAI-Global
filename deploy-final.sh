#!/bin/bash

echo "🚀 Déploiement Final - Amazon Profit Pro"
echo "=========================================="
echo ""

# Nettoyer
echo "🧹 Nettoyage..."
rm -rf dist node_modules/.vite

# Build
echo "🔨 Build en cours..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build réussi!"
else
    echo "❌ Build échoué!"
    exit 1
fi

# Déployer
echo ""
echo "📦 Déploiement sur Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    echo "✅ Déploiement réussi!"
else
    echo "❌ Déploiement échoué!"
    exit 1
fi

echo ""
echo "=========================================="
echo "🎉 TOUT EST PRÊT !"
echo "=========================================="
echo ""
echo "📱 URLs importantes:"
echo "   - App: https://trade-ai-global.vercel.app"
echo "   - GitHub: https://github.com/akiprisaye-v4/TradeAI-Global"
echo ""
echo "📊 Fichiers créés:"
echo "   ✅ Google Analytics intégré"
echo "   ✅ Image OG HTML créée"
echo "   ✅ Meta tags SEO optimisés"
echo "   ✅ Guide Product Hunt complet"
echo ""
echo "🚀 Prochaines étapes:"
echo "   1. Remplacer G-XXXXXXXXXX par ton ID Google Analytics"
echo "   2. Créer un compte Product Hunt"
echo "   3. Préparer les screenshots"
echo "   4. Lancer sur Product Hunt"
echo "   5. Partager sur les réseaux sociaux"
echo ""
echo "Bonne chance ! 🍀"
