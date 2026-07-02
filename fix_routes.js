const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf-8');

console.log("🔧 Correction des routes et boutons...\n");

// 1. Ajouter ThemeProvider si manquant
if (!content.includes('import { ThemeProvider }')) {
    content = content.replace(
        'import { useTheme } from "./context/ThemeContext";',
        'import { useTheme, ThemeProvider } from "./context/ThemeContext";'
    );
    console.log("✅ Import ThemeProvider ajouté");
}

// 2. Ajouter les fonctions Panel manquantes
if (!content.includes('function TutorialPanel')) {
    const panels = `
function TutorialPanel() {
  return <Tutorial />;
}

function FormationsShopPanel() {
  return <FormationsShop />;
}
`;
    content = content.replace(
        'export default function AmazonPro()',
        panels + '\nexport default function AmazonPro()'
    );
    console.log("✅ TutorialPanel et FormationsShopPanel créées");
}

// 3. Ajouter les routes manquantes avant le default
const routes = [
    { id: 'academy', component: '<FBAAcademyPanel />' },
    { id: 'calculators', component: '<FBACalculatorsPanel />' },
    { id: 'aiprice', component: '<AiPriceToolPanel />' },
    { id: 'concurrents', component: '<CompetitiveAnalysisPanel />' },
    { id: 'insights', component: '<SmartInsightsPanel />' },
    { id: 'community', component: '<CommunityHubPanel />' },
    { id: 'tutorial', component: '<TutorialPanel />' },
    { id: 'pricing', component: '<PricingPanel />' },
    { id: 'formations', component: '<FormationsShopPanel />' }
];

let routesAdded = 0;
routes.forEach(route => {
    const caseStmt = `case "${route.id}":\n        return ${route.component}`;
    if (!content.includes(`case "${route.id}"`)) {
        content = content.replace(
            'default:\n          return',
            caseStmt + '\n      default:\n          return'
        );
        routesAdded++;
        console.log(`✅ Route ${route.id} ajoutée`);
    }
});

// 4. Ajouter les boutons de navigation
const buttons = [
    { name: 'Académie', id: 'academy', icon: '📚' },
    { name: 'Calculateurs', id: 'calculators', icon: '🧮' },
    { name: 'AiPrice', id: 'aiprice', icon: '🎯' },
    { name: 'Concurrents', id: 'concurrents', icon: '🏆' },
    { name: 'Smart Insights', id: 'insights', icon: '🧠' },
    { name: 'Communauté', id: 'community', icon: '🌱' }
];

let buttonsAdded = 0;
buttons.forEach(btn => {
    if (!content.includes(`setActiveTab("${btn.id}")`)) {
        const buttonCode = `<button onClick={() => setActiveTab("${btn.id}")} style={{...styles.navButton, background: activeTab === "${btn.id}" ? "var(--accent)" : "transparent", color: activeTab === "${btn.id}" ? "#0D1117" : "var(--text-primary)"}}>${btn.icon} ${btn.name}</button>`;
        
        // Insérer après le bouton dashboard
        content = content.replace(
            '</button>\n            <button onClick={() => setActiveTab("analytics")',
            `</button>\n            ${buttonCode}\n            <button onClick={() => setActiveTab("analytics")`
        );
        buttonsAdded++;
        console.log(`✅ Bouton ${btn.name} ajouté`);
    }
});

// Sauvegarder
fs.writeFileSync('src/App.jsx', content);

console.log(`\n📊 Résumé:`);
console.log(`   • Routes ajoutées: ${routesAdded}`);
console.log(`   • Boutons ajoutés: ${buttonsAdded}`);
console.log(`\n💾 Fichier sauvegardé`);
