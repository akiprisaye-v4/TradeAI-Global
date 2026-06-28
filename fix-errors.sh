#!/bin/bash

echo "🔧 CORRECTION AUTOMATIQUE DES ERREURS"
echo "======================================"
echo ""

# 1. Corriger App.css
echo "1. Nettoyage de App.css..."
if [ -f "src/App.css" ]; then
    # Supprimer les lignes de commandes shell
    sed -i '/^cd ~/d' src/App.css
    sed -i "/^cat > App.css/d" src/App.css
    sed -i '/^ENDOFFILE$/d' src/App.css
    # Ajouter * si manquant au début
    if ! head -1 src/App.css | grep -q "^\* {"; then
        sed -i '1s/^/* {\n/' src/App.css
    fi
    echo "   ✅ App.css corrigé"
fi

# 2. Corriger TradeCopilot.tsx
echo "2. Correction de TradeCopilot.tsx..."
if [ -f "src/components/TradeCopilot.tsx" ]; then
    python3 << 'PYEOF'
import re

with open('src/components/TradeCopilot.tsx', 'r') as f:
    content = f.read()

# Remplacer les vrais sauts de ligne par \n dans les strings
content = re.sub(r"content: 'Bonjour ! Je suis Trade Copilot\. Je peux :\n(.*?)Que souhaites-tu explorer \?'", 
                 r"content: 'Bonjour ! Je suis Trade Copilot. Je peux :\\n\1Que souhaites-tu explorer ?'", 
                 content, flags=re.DOTALL)

content = content.replace("replace(/\n/g", "replace(/\\n/g")

with open('src/components/TradeCopilot.tsx', 'w') as f:
    f.write(content)

print("   ✅ TradeCopilot.tsx corrigé")
PYEOF
fi

# 3. Corriger ProductHunter.tsx
echo "3. Correction de ProductHunter.tsx..."
if [ -f "src/components/ProductHunter.tsx" ]; then
    sed -i "s/].join('/].join('\\\\n');/g" src/components/ProductHunter.tsx
    echo "   ✅ ProductHunter.tsx corrigé"
fi

# 4. Corriger les espaces &&
echo "4. Correction des opérateurs &&..."
find src/components -name "*.tsx" -exec sed -i 's/ & & / \&\& /g' {} \;
echo "   ✅ Opérateurs && corrigés"

# 5. Tester la compilation
echo ""
echo "5. Test de compilation..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ TOUT EST CORRIGÉ ! Le projet compile."
    echo ""
    echo "Pour déployer :"
    echo "git add ."
    echo "git commit -m 'fix: corrections bugs'"
    echo "git push origin main"
else
    echo ""
    echo "⚠️  Des erreurs persistent. Vérifie le log ci-dessus."
fi
