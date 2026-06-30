import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Ajouter l'import About si manquant
if 'import About from' not in content:
    content = content.replace(
        'import InstallPWA from "./components/InstallPWA.jsx";',
        'import InstallPWA from "./components/InstallPWA.jsx";\nimport About from "./components/About";'
    )

# 2. Vérifier si les composants existent déjà
if 'function DashboardPanel()' not in content:
    print("⚠️ Composants manquants - ajout en cours...")
    
    components_code = '''
function DashboardPanel() {
  const { products, fxRates } = useAppContext();
  const totalProfit = products.reduce((sum, p) => sum + calcProduct(p, fxRates).monthlyProfit, 0);
  const avgMargin = products.length > 0 ? products.reduce((sum, p) => sum + calcProduct(p, fxRates).netMargin, 0) / products.length : 0;
  
  return (
    <div>
      <Section title="📊 Vue d'ensemble">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 16 }}>
          <StatCard label="Produits actifs" value={products.length} color="#FF9900" />
          <StatCard label="Profit mensuel total" value={fmt(totalProfit)} color={totalProfit >= 0 ? "#00C853" : "#FF3D00"} />
          <StatCard label="Marge moyenne" value={fmtPct(avgMargin)} color={avgMargin >= 15 ? "#00C853" : "#FF9900"} />
        </div>
      </Section>
    </div>
  );
}

function AnalyticsPanel() {
  const { products, fxRates } = useAppContext();
  return (
    <div>
      <Section title="📈 Analytics">
        <div style={{ padding: 40, textAlign: "center", color: "#8B949E" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📊</div>
          <div>Analytics en cours de développement</div>
        </div>
      </Section>
    </div>
  );
}

function TradeAIPanel() {
  const { p, calcP } = useAppContext();
  return (
    <div>
      <Section title="🤖 TradeAI - Recommandations">
        <div style={{ padding: 40, textAlign: "center", color: "#8B949E" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🤖</div>
          <div>Assistant IA pour {p.name}</div>
          <div style={{ marginTop: 16, padding: 16, background: "rgba(255,153,0,0.1)", borderRadius: 8 }}>
            Marge actuelle: <strong style={{ color: calcP.netMargin >= 15 ? "#00C853" : "#FF9900" }}>{calcP.netMargin.toFixed(1)}%</strong>
          </div>
        </div>
      </Section>
    </div>
  );
}

function StockPanel() {
  const { products, fxRates } = useAppContext();
  return (
    <div>
      <Section title="📦 Gestion des Stocks">
        {products.map((prod, i) => {
          const daysOfStock = prod.units > 0 ? (prod.initialOrderUnits / prod.units) * 30 : 0;
          const status = daysOfStock <= 30 ? "🚨 Critique" : daysOfStock <= 60 ? "⚠️ Attention" : "✅ OK";
          const color = daysOfStock <= 30 ? "#FF3D00" : daysOfStock <= 60 ? "#FF9900" : "#00C853";
          
          return (
            <div key={i} style={{ padding: 14, background: "#1C2128", border: `1px solid ${color}`, borderRadius: 9, marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <strong>{prod.name}</strong>
                <span style={{ color }}>{status}</span>
              </div>
              <div style={{ fontSize: 12, color: "#8B949E" }}>
                Stock: {prod.initialOrderUnits}u · Ventes: {prod.units}/mois · Couverture: {daysOfStock.toFixed(0)} jours
              </div>
            </div>
          );
        })}
      </Section>
    </div>
  );
}

function CompetitivePanel() {
  const { p, calcP } = useAppContext();
  return (
    <div>
      <Section title="🎯 Analyse Concurrentielle">
        <div style={{ padding: 40, textAlign: "center", color: "#8B949E" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🎯</div>
          <div>Analyse de {p.name}</div>
          <div style={{ marginTop: 16 }}>Prix: <strong>{fmt(p.sellingPrice, calcP.sym)}</strong></div>
        </div>
      </Section>
    </div>
  );
}

'''
    
    # Insérer avant "export default function AmazonPro()"
    content = content.replace(
        'export default function AmazonPro() {',
        components_code + '\nexport default function AmazonPro() {'
    )
else:
    print("✅ Composants déjà présents")

# 3. Remplacer le rendu conditionnel avec regex plus flexible
# Chercher le bloc qui contient les onglets
pattern = r'\{tab ==="apropos"&& <AProposPanel />\}.*?\{tab ==="historique"&& <HistoriquePanel />\}'

new_render = '''{tab === "dashboard" && <DashboardPanel />}
        {tab === "analytics" && <AnalyticsPanel />}
        {tab === "tradeai" && <TradeAIPanel />}
        {tab === "stock" && <StockPanel />}
        {tab === "competitive" && <CompetitivePanel />}
        {tab === "apropos" && <About />}
        {tab === "idees" && <IdeesPanel />}
        {tab === "calculateur" && <CalculateurPanel />}
        {tab === "cogs" && <COGSPanel p={p} u={u} sym={sym} />}
        {tab === "pricing" && <PricingPanel />}
        {tab === "comparateur" && <PortfolioPanel />}
        {tab === "historique" && <HistoriquePanel />}'''

# Utiliser re.DOTALL pour matcher sur plusieurs lignes
content_new = re.sub(pattern, new_render, content, flags=re.DOTALL)

if content_new != content:
    content = content_new
    print("✅ Rendu conditionnel mis à jour")
else:
    print("⚠️ Pattern non trouvé - vérification manuelle nécessaire")

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Fichier sauvegardé")
