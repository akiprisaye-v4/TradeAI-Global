#!/data/data/com.termux/files/usr/bin/bash
set -e

REPORT="reports/AUDIT_COMPLET_V7_$(date +%Y%m%d_%H%M%S).txt"

{
echo "===== AUDIT TRADEAI GLOBAL V7 ====="
date
echo ""
echo "BRANCHE:"
git branch --show-current
echo ""
echo "DERNIER COMMIT:"
git log -1 --oneline
echo ""
echo "STATUS GIT:"
git status --short
echo ""
echo "FICHIERS CLÉS:"
for f in src/App.jsx src/config/navigation.js src/config/tradeai.config.js src/modules/registry.js src/layouts/AppLayout.jsx src/components/TradeAIEcosystem.jsx ARCHITECTURE_V7.md; do
  [ -f "$f" ] && echo "✅ $f" || echo "❌ $f"
done
echo ""
echo "COMPOSANTS RÉCENTS:"
for f in ListingBuilder KeywordResearch ExtensionData TradeAIEcosystem; do
  [ -f "src/components/$f.jsx" ] && echo "✅ $f.jsx" || echo "❌ $f.jsx"
done
echo ""
echo "ONGLETS DANS App.jsx:"
grep -o "activeTab === \"[^\"]*\"" src/App.jsx | sort | uniq
echo ""
echo "BUILD:"
npm run build
echo ""
echo "AUDIT-V7:"
[ -f scripts/audit-v7.mjs ] && node scripts/audit-v7.mjs || echo "audit-v7.mjs absent"
echo ""
echo "===== FIN AUDIT ====="
} | tee "$REPORT"

echo "Rapport créé : $REPORT"
