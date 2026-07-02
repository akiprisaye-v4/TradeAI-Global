import fs from "fs";
import { execSync } from "child_process";

const comps = [
"FBAAcademy","FBACalculators","AiPriceTool",
"CompetitiveAnalysis","SmartInsights","CommunityHub",
"ListingBuilder","KeywordResearch","ExtensionData"
];

const app = "src/App.jsx";
let fail = false;
const ok = (v,m)=>{console.log((v?"✅ ":"❌ ")+m); if(!v) fail=true};

ok(fs.existsSync(app), "src/App.jsx");
const txt = fs.existsSync(app) ? fs.readFileSync(app,"utf8") : "";

for (const c of comps) {
  ok(fs.existsSync(`src/components/${c}.jsx`), c+".jsx");
  ok(txt.includes(c), c+" dans App.jsx");
}

ok(txt.includes("activeTab"), "activeTab");
ok((txt.match(/{/g)||[]).length === (txt.match(/}/g)||[]).length, "accolades");
ok((txt.match(/\(/g)||[]).length === (txt.match(/\)/g)||[]).length, "parenthèses");

try {
  execSync("npm run build", {stdio:"inherit"});
  ok(true, "build");
} catch {
  ok(false, "build");
}

process.exit(fail ? 1 : 0);
