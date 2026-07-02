import fs from "fs";
import { execSync } from "child_process";

const requiredTabs = [
  "dashboard","analytics","tradeai","stocks","concurrents",
  "portfolio","historique","abonnements","formations",
  "academy","calculators","aiprice","insights","community",
  "listing","keywords","extension","pricing","about"
];

const requiredComponents = [
  "FBAAcademy","FBACalculators","AiPriceTool","CompetitiveAnalysis",
  "SmartInsights","CommunityHub","ListingBuilder","KeywordResearch",
  "ExtensionData"
];

const app = "src/App.jsx";
let errors = 0;

function check(ok, msg) {
  console.log((ok ? "✅ " : "❌ ") + msg);
  if (!ok) errors++;
}

const txt = fs.existsSync(app) ? fs.readFileSync(app,"utf8") : "";
check(!!txt, "App.jsx existe");

console.log("\n--- COMPOSANTS ---");
for (const c of requiredComponents) {
  check(fs.existsSync(`src/components/${c}.jsx`), `${c}.jsx`);
  check(txt.includes(c), `${c} relié dans App.jsx`);
}

console.log("\n--- ONGLETS / ROUTES ---");
for (const tab of requiredTabs) {
  check(txt.includes(`'${tab}'`) || txt.includes(`"${tab}"`), `activeTab ${tab}`);
}

console.log("\n--- MENU MOBILE ---");
check(txt.includes("mobileMenuOpen"), "mobileMenuOpen présent");
check(txt.includes("setMobileMenuOpen"), "setMobileMenuOpen présent");
check(txt.includes("☰") || txt.toLowerCase().includes("burger"), "bouton burger détecté");

console.log("\n--- SYNTAXE ---");
check((txt.match(/{/g)||[]).length === (txt.match(/}/g)||[]).length, "accolades équilibrées");
check((txt.match(/\(/g)||[]).length === (txt.match(/\)/g)||[]).length, "parenthèses équilibrées");

console.log("\n--- BUILD ---");
try {
  execSync("npm run build", {stdio:"inherit"});
  check(true, "build OK");
} catch {
  check(false, "build KO");
}

console.log("\nErreurs:", errors);
process.exit(errors ? 1 : 0);
