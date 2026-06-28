# 📖 Guide de Déploiement et Promotion

## 🚀 Déploiement de la Landing Page

### Option 1: Vercel (Recommandé)

```bash
cd ~/TradeAI-Global

# Créer une branche pour la landing page
git checkout -b landing-page

# Déplacer la landing page à la racine
cp marketing/landing-page.html index.html

# Commit et push
git add .
git commit -m "Add professional landing page"
git push origin landing-page

# Déployer
vercel --prod
cd ~/TradeAI-Global

# Activer GitHub Pages
# Settings > Pages > Source: main branch > Save

# La landing page sera disponible sur:
# https://akiprisaye-v4.github.io/TradeAI-Global

### 5️⃣ Script de Build Final

```bash
# Build final et déploiement
npm run build
vercel --prod

echo ""
echo "=========================================="
echo "✅ TOUT EST PRÊT !"
echo "=========================================="
echo ""
echo "📁 Fichiers créés:"
echo "   - marketing/landing-page.html"
echo "   - README.md"
echo "   - marketing/social-media-posts.md"
echo "   - marketing/DEPLOYMENT-GUIDE.md"
echo ""
echo "🚀 Prochaines étapes:"
echo "   1. Tester l'app: https://trade-ai-global.vercel.app"
echo "   2. Déployer la landing page"
echo "   3. Suivre le plan de promotion (7 jours)"
echo "   4. Lancer sur Product Hunt"
echo ""
echo "📊 URLs importantes:"
echo "   - App: https://trade-ai-global.vercel.app"
echo "   - GitHub: https://github.com/akiprisaye-v4/TradeAI-Global"
echo ""
echo "Bonne chance pour le lancement ! "
