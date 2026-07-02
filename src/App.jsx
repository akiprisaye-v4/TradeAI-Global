import React, { useState, useMemo, useCallback, useEffect, createContext, useContext, useRef } from"react";

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

const MARKETPLACES = {
 FR: { label:"🇫🇷 Amazon.fr", currency:"EUR", symbol:"€", vatDefault: 20, fxRate: 1 },
 DE: { label:"🇩🇪 Amazon.de", currency:"EUR", symbol:"€", vatDefault: 19, fxRate: 1 },
 UK: { label:"🇬🇧 Amazon.co.uk", currency:"GBP", symbol:"£", vatDefault: 20, fxRate: 0.86 },
 US: { label:"🇺🇸 Amazon.com", currency:"USD", symbol:"$", vatDefault: 0, fxRate: 1.08 },
 IT: { label:"🇮🇹 Amazon.it", currency:"EUR", symbol:"€", vatDefault: 22, fxRate: 1 },
 ES: { label:"🇪🇸 Amazon.es", currency:"EUR", symbol:"€", vatDefault: 21, fxRate: 1 },
 // 🌍 Europe additionnelle
 NL: { label: "🇳🇱 Amazon.nl", currency: "EUR", symbol: "€", vatDefault: 21, fxRate: 1 },
 PL: { label: "🇵🇱 Amazon.pl", currency: "PLN", symbol: "zł", vatDefault: 23, fxRate: 4.3 },
 SE: { label: "🇸🇪 Amazon.se", currency: "SEK", symbol: "kr", vatDefault: 25, fxRate: 11.2 },
 BE: { label: "🇧🇪 Amazon.com.be", currency: "EUR", symbol: "€", vatDefault: 21, fxRate: 1 },
 // 🌎 Amérique
 CA: { label: "🇨🇦 Amazon.ca", currency: "CAD", symbol: "C$", vatDefault: 5, fxRate: 1.45 },
 MX: { label: "🇲🇽 Amazon.com.mx", currency: "MXN", symbol: "MX$", vatDefault: 16, fxRate: 18.5 },
 BR: { label: "🇧🇷 Amazon.com.br", currency: "BRL", symbol: "R$", vatDefault: 17, fxRate: 5.4 },
 // 🌏 Asie-Pacifique
 JP: { label: "🇯🇵 Amazon.co.jp", currency: "JPY", symbol: "¥", vatDefault: 10, fxRate: 157 },
 AU: { label: "🇦🇺 Amazon.com.au", currency: "AUD", symbol: "A$", vatDefault: 10, fxRate: 1.52 },
 SG: { label: "🇸🇬 Amazon.sg", currency: "SGD", symbol: "S$", vatDefault: 8, fxRate: 1.44 },
 IN: { label: "🇮🇳 Amazon.in", currency: "INR", symbol: "₹", vatDefault: 18, fxRate: 89.5 },
 // 🌍 Moyen-Orient
 AE: { label: "🇦🇪 Amazon.ae", currency: "AED", symbol: "د.إ", vatDefault: 5, fxRate: 3.97 },
 SA: { label: "🇸🇦 Amazon.sa", currency: "SAR", symbol: "﷼", vatDefault: 15, fxRate: 4.05 },
 TR: { label: "🇹🇷 Amazon.com.tr", currency: "TRY", symbol: "₺", vatDefault: 18, fxRate: 34.5 },
 EG: { label: "🇪🇬 Amazon.eg", currency: "EGP", symbol: "E£", vatDefault: 14, fxRate: 51.2 },
};

const AMAZON_DOMAINS = { FR:"amazon.fr", DE:"amazon.de", UK:"amazon.co.uk", US:"amazon.com", IT:"amazon.it", ES:"amazon.es", NL: "amazon.nl", PL: "amazon.pl", SE: "amazon.se", BE: "amazon.com.be", CA: "amazon.ca", MX: "amazon.com.mx", BR: "amazon.com.br", JP: "amazon.co.jp", AU: "amazon.com.au", SG: "amazon.sg", IN: "amazon.in", AE: "amazon.ae", SA: "amazon.sa", TR: "amazon.com.tr", EG: "amazon.eg"};
const TRENDS_GEO = { FR:"FR", DE:"DE", UK:"GB", US:"US", IT:"IT", ES:"ES", NL: "NL", PL: "PL", SE: "SE", BE: "BE", CA: "CA", MX: "MX", BR: "BR", JP: "JP", AU: "AU", SG: "SG", IN: "IN", AE: "AE", SA: "SA", TR: "TR", EG: "EG"};

const CATEGORIES = [
 { label:"Vêtements & Mode", rate: 0.17 },
 { label:"Électronique", rate: 0.08 },
 { label:"Maison & Cuisine", rate: 0.15 },
 { label:"Livres", rate: 0.15 },
 { label:"Jouets & Jeux", rate: 0.15 },
 { label:"Beauté & Santé", rate: 0.15 },
 { label:"Sport & Plein Air", rate: 0.15 },
 { label:"Auto & Moto", rate: 0.12 },
 { label:"Outils & Bricolage", rate: 0.15 },
 { label:"Bijoux", rate: 0.20 },
 { label:"Autre", rate: 0.15 },
];

const CATEGORY_RETURN_RATES = [0.15, 0.08, 0.07, 0.03, 0.08, 0.06, 0.09, 0.06, 0.05, 0.10, 0.07];

const SEASONALITY = {
 default: [0.7, 0.65, 0.75, 0.85, 0.9, 0.85, 0.8, 0.85, 0.95, 1.1, 1.5, 1.8],
 jouets: [0.5, 0.45, 0.55, 0.65, 0.7, 0.65, 0.7, 0.75, 0.9, 1.2, 1.8, 2.5],
 mode: [0.8, 0.7, 0.9, 1.1, 1.2, 1.1, 0.9, 1.0, 1.1, 1.0, 1.2, 1.6],
};

const MONTH_LABELS = ["Jan","Fév","Mar","Avr","Mai","Jun","Juil","Aoû","Sep","Oct","Nov","Déc"];

const FBA_SIZES = [
 { label:"Petit standard (< 300g)", pick: 2.7, storage: 0.9, longStorage: 1.5, maxL: 35, maxW: 25, maxH: 3.0, maxWeight: 0.3 },
 { label:"Standard (300g–1kg)", pick: 3.5, storage: 1.2, longStorage: 2.0, maxL: 45, maxW: 34, maxH: 26, maxWeight: 1.0 },
 { label:"Moyen (1–3kg)", pick: 5.0, storage: 1.8, longStorage: 3.0, maxL: 61, maxW: 46, maxH: 46, maxWeight: 3.0 },
 { label:"Grand (3–12kg)", pick: 7.5, storage: 2.8, longStorage: 4.5, maxL: 120, maxW: 60, maxH: 60, maxWeight: 12.0 },
 { label:"Très grand (> 12kg)", pick: 12.0, storage: 4.5, longStorage: 7.0, maxL: 999, maxW: 999, maxH: 999, maxWeight: 999 },
];

const TRENDING_PRODUCTS = [
{ name: "Patchs anti-imperfections", category: "Beauté & Santé", categoryIdx: 5, growth: "+85%", amazonPriceRange: [8.99, 14.99], alibabaPriceRange: [0.30, 0.80], fbaSizeIdx: 0, note: "Viral TikTok. Marge 85-90%.", icon: "✨", color: "#FFD54F", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop" },
{ name: "Bandes LED RGB", category: "Maison & Cuisine", categoryIdx: 2, growth: "+65%", amazonPriceRange: [15.99, 29.99], alibabaPriceRange: [0.40, 5.00], fbaSizeIdx: 1, note: "Déco gaming. Marge 70-85%.", icon: "💡", color: "#FFA726", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop" },
{ name: "Powerbank magnétique", category: "Électronique", categoryIdx: 1, growth: "+55%", amazonPriceRange: [24.99, 39.99], alibabaPriceRange: [5.70, 10.00], fbaSizeIdx: 1, note: "Tech gadget. Marge 60-75%.", icon: "🔋", color: "#5C6BC0", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=300&fit=crop" },
{ name: "Masque soie naturelle", category: "Beauté & Santé", categoryIdx: 5, growth: "+65%", amazonPriceRange: [15.99, 29.99], alibabaPriceRange: [0.41, 2.00], fbaSizeIdx: 0, note: "Beauty sleep. Marge 85-95%.", icon: "😴", color: "#7E57C2", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop" },
{ name: "Harnais chien", category: "Autre", categoryIdx: 10, growth: "+60%", amazonPriceRange: [16.99, 34.99], alibabaPriceRange: [1.80, 4.50], fbaSizeIdx: 1, note: "Pet market. Marge 70-85%.", icon: "🦮", color: "#FF5722", image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop" },
];

// Noms de produits réalistes par catégorie
const REALISTIC_PRODUCT_NAMES = {
  0: ["T-shirt Coton Bio Homme", "Robe Été Florale", "Jean Slim Stretch", "Pull Col Roulé Laine", "Veste Imperméable Légère", "Short Sport Respirant", "Chemise Lin Élégante", "Pantalon Chino Classique"],
  1: ["Écouteurs Bluetooth Sans Fil", "Coque iPhone 17 Transparente", "Chargeur USB-C Rapide 65W", "Batterie Externe 20000mAh", "Câble HDMI 4K 2m", "Support Téléphone Voiture", "Enceinte Portable Waterproof", "Lampe LED Bureau RGB"],
  2: ["Set 3 Poêles Antiadhésives", "Bougie Parfumée Soja 200g", "Organisateur Cuisine Bambou", "Tapis de Bain Antidérapant", "Miroir LED Salle de Bain", "Boîte à Thé 12 Compartiments", "Presse-Agrumes Manuel Inox", "Set 6 Verres à Vin"],
  3: ["Guide Marketing Digital 2026", "Roman Thriller Best-Seller", "Livre Cuisine Méditerranéenne", "Atlas Géographique Illustré", "Manuel Développement Web", "Biographie Steve Jobs", "Guide Investissement Bourse", "Livre Enfants 3-6 ans"],
  4: ["Lego City Pompiers 500pcs", "Puzzle 1000 Pièces Paysage", "Jeu Société Stratégie", "Poupée Fashion 30cm", "Voiture Télécommandée 4x4", "Kit Science Enfants 8+", "Jeu Cartes Famille", "Figurine Collection Marvel"],
  5: ["Crème Hydratante Visage 50ml", "Sérum Vitamine C Anti-Âge", "Masque Cheveux Kératine", "Rouge à Lèvres Mat Longue Tenue", "Parfum Femme Floral 100ml", "Gel Douche Homme 400ml", "Palette Maquillage 12 Couleurs", "Huile Essentielle Lavande"],
  6: ["Tapis Yoga Antidérapant 6mm", "Haltères Réglables 20kg", "Corde à Sauter Speed", "Gourde Sport Isotherme 750ml", "Sac à Dos Randonnée 40L", "Montre Connectée Sport GPS", "Vélo Appartement Pliable", "Kit Musculation Complet"],
  7: ["Kit Nettoyage Auto 5pcs", "Support Téléphone GPS", "Housse Siège Voiture Universelle", "Aspirateur Portable 12V", "Caméra Recul Sans Fil", "Chargeur Allume-Cigare USB", "Tapis Sol Voiture Caoutchouc", "Organisateur Coffre Pliable"],
  8: ["Perceuse Visseuse Sans Fil 18V", "Set 50 Embouts Visseuse", "Niveau Laser Auto 15m", "Caisse à Outils 150pcs", "Scie Sauteuse 700W", "Mètre Laser Digital 40m", "Lampe Atelier LED Rechargeable", "Clé Dynamométrique 5-25Nm"],
  9: ["Collier Or 18K Chaîne Fine", "Boucles d'Oreilles Perles", "Bracelet Argent 925 Ajustable", "Montre Femme Acier Rose", "Bague Diamant Solitaire", "Pendentif Cœur Zirconium", "Parure Bijoux Mariage", "Bracelet Jonc Plaqué Or"],
  10: ["Harnais Chien Réglable", "Jouet Interactif Chat", "Lit Chien Orthopédique L", "Gamelle Automatique 4L", "Sac Transport Chat Airline", "Collier GPS Chien Étanche", "Arbre à Chat 150cm", "Tapis Litière Chat Imperméable"],
};

const getRandomProductName = (categoryIdx) => {
  const names = REALISTIC_PRODUCT_NAMES[categoryIdx] || REALISTIC_PRODUCT_NAMES[2];
  const randomName = names[Math.floor(Math.random() * names.length)];
  const suffix = Math.floor(Math.random() * 900) + 100;
  return `${randomName} ${suffix}`;
};


// Noms de produits réalistes par catégorie





const fmt = (n, sym ="€") =>`${sym}${Math.abs(n).toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
const fmtPct = (n) =>`${n >= 0 ?"+":""}${n.toFixed(1)}%`;
const profitColor = (v) => v >= 20 ?"#00C853": v >= 8 ?"#FFD600": v >= 0 ?"#FF9900":"#FF3D00";
const scoreColor = (s) => s >= 7 ?"#00C853": s >= 5 ?"#FF9900":"#FF3D00";

const memStore = {};
const safeStorageGet = async (key) => {
 try { if (window.storage?.get) { const r = await window.storage.get(key); if (r?.value) return r.value; } } catch (e) {}
 try { const v = localStorage.getItem(`amzpro:${key}`); if (v) return v; } catch (e) {}
 return memStore[key] ?? null;
};
const safeStorageSet = async (key, val) => {
 try { if (window.storage?.set) { await window.storage.set(key, val); return true; } } catch (e) {}
 try { localStorage.setItem(`amzpro:${key}`, val); return true; } catch (e) {}
 memStore[key] = val;
 return true;
};

function calcProduct(p, fxRates) {
 const mk = MARKETPLACES[p.marketplace];
 const sym = mk.symbol;
 const rate = mk.currency ==="EUR"? 1 : (fxRates?.[mk.currency] ?? mk.fxRate);
 const fx = (eur) => eur * rate;
 const price = p.sellingPrice;
 const effectiveVatRate = (p.vatRegistered && !p.b2bSales) ? p.vatRate : 0;
 const priceHT = price / (1 + effectiveVatRate / 100);
 const cat = CATEGORIES[p.categoryIdx];
 const referralFee = priceHT * cat.rate;
 const fbaSize = FBA_SIZES[p.fbaSizeIdx];
 const volWeight = (p.length * p.width * p.height) / 5000;
 const chargeableWeight = Math.max(p.weight, volWeight);

 let arbitrageFBA = null;
 if (p.fulfillment ==="fba"&& p.fbaSizeIdx > 0) {
 const lowerTier = FBA_SIZES[p.fbaSizeIdx - 1];
 if (p.length <= lowerTier.maxL && p.width <= lowerTier.maxW && p.height <= lowerTier.maxH && chargeableWeight <= lowerTier.maxWeight) {
 const saving = (fbaSize.pick + fbaSize.storage) - (lowerTier.pick + lowerTier.storage);
 arbitrageFBA = { label: lowerTier.label, saving: +saving.toFixed(2) };
 }
 }

 const storageMultiplier = p.isQ4 ? 3 : 1;
 let fulfillmentFee = p.fulfillment ==="fba"
 ? fx(fbaSize.pick + (fbaSize.storage * storageMultiplier) + (p.longStorage ? fbaSize.longStorage : 0))
 : p.fbmShipping + p.fbmPacking;

 const totalCosts = p.costPrice + p.shippingToAmazon + referralFee + fulfillmentFee + p.ads + p.otherCosts + (p.includeReturns ? price * 0.03 : 0);
 const profit = priceHT - totalCosts;
 const netMargin = priceHT > 0 ? (profit / priceHT) * 100 : 0;
 const roi = p.costPrice > 0 ? (profit / p.costPrice) * 100 : 0;
 const breakeven = totalCosts > 0 ? totalCosts / (1 - cat.rate) : 0;
 const monthlyProfit = profit * p.units;

 let score = 0;
 if (netMargin >= 25) score += 2; else if (netMargin >= 15) score += 1;
 if (roi >= 100) score += 2; else if (roi >= 50) score += 1;
 if (monthlyProfit >= 2000) score += 1;
 if (profit > 0) score += 1;
 score = Math.min(10, score);

 return { priceHT, referralFee, fulfillmentFee, totalCosts, profit, netMargin, roi, breakeven, monthlyProfit, score, sym, volWeight, chargeableWeight, arbitrageFBA };
}

function buildCashFlow(p, calc) {
 const months = 12;
 const initialOutlay = p.initialOrderUnits * (p.costPrice + p.shippingToAmazon);
 const rampMonths = Math.max(1, p.rampMonths);
 const catKey = p.categoryIdx === 4 ?"jouets": p.categoryIdx === 0 ?"mode":"default";
 const seasonIdx = SEASONALITY[catKey];

 const unitsSoldByMonth = Array.from({ length: months }, (_, i) => {
 const ramp = i + 1 <= rampMonths ? (p.units * (i + 1)) / rampMonths : p.units;
 return Math.round(ramp * seasonIdx[i]);
 });

 const revenueByMonth = unitsSoldByMonth.map(u => u * calc.profit);
 let cumulative = -initialOutlay;
 const rows = [];

 for (let i = 0; i < months; i++) {
 cumulative += revenueByMonth[i];
 rows.push({ month: i + 1, cumulative });
 }

 const breakevenMonth = rows.find(r => r.cumulative >= 0)?.month || null;
 return { initialOutlay, rows, breakevenMonth };
}

function Toast({ message, type, onClose }) {
 useEffect(() => {
 const t = setTimeout(onClose, 3500);
 return () => clearTimeout(t);
 }, [onClose]);

 const colors = {
 success: { bg:"#00C85315", border:"#00C853", text:"#00C853"},
 error: { bg:"#FF3D0015", border:"#FF3D00", text:"#FF3D00"},
 };
 const c = colors[type] || colors.success;

 return (
 <div style={{
 position:"fixed", bottom: 24, right: 24, background: c.bg,
 border:`1px solid ${c.border}`, borderLeft:`4px solid ${c.border}`,
 borderRadius: 9, padding:"12px 16px", color: c.text,
 fontSize: 12, fontWeight: 600, zIndex: 1000, maxWidth: 320
 }}>
 {message}
 </div>
 );
}

function ProfitMeter({ margin }) {
 const c = Math.max(-100, Math.min(100, margin));
 const col = profitColor(c);
 const pct = Math.abs(c);
 const pos = c >= 0;
 return (
 <div style={{ marginBottom: 10 }}>
 <div style={{ display:"flex", justifyContent:"space-between", marginBottom: 5 }}>
 <span style={{ fontSize: 11, color:"#8B949E", fontWeight: 700, textTransform:"uppercase"}}>Marge nette</span>
 <span style={{ fontSize: 24, fontWeight: 900, color: col }}>{fmtPct(c)}</span>
 </div>
 <div style={{ background:"#1C2128", borderRadius: 8, height: 10, overflow:"hidden", position:"relative"}}>
 <div style={{ position:"absolute", left:"50%", top: 0, width: 2, height:"100%", background:"#30363D", zIndex: 2 }} />
 <div style={{ position:"absolute", left: pos ?"50%":`${50 - pct / 2}%`, width:`${pct / 2}%`, height:"100%", background: col, borderRadius: 8, transition:"all 0.4s"}} />
 </div>
 </div>
 );
}

function ScoreGauge({ score }) {
 const col = scoreColor(score);
 return (
 <div style={{ textAlign:"center"}}>
 <div style={{ width: 70, height: 70, borderRadius:"50%", margin:"0 auto 6px", border:`4px solid ${col}`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:`${col}15`}}>
 <span style={{ fontSize: 22, fontWeight: 900, color: col }}>{score}</span>
 <span style={{ fontSize: 9, color:"#8B949E"}}>/10</span>
 </div>
 <div style={{ fontSize: 11, color: col, fontWeight: 700 }}>
 {score >= 8 ?"🚀 Excellent": score >= 6 ?"✅ Bon": score >= 4 ?"⚠️ Moyen":"❌ Risqué"}
 </div>
 </div>
 );
}

function StatCard({ label, value, sub, color ="#E6EDF3"}) {
 return (
 <div style={{ background:"#1C2128", border:"1px solid #30363D", borderRadius: 9, padding:"12px 14px"}}>
 <div style={{ fontSize: 10, color:"#8B949E", fontWeight: 700, textTransform:"uppercase", marginBottom: 3 }}>{label}</div>
 <div style={{ fontSize: 18, fontWeight: 800, color }}>{value}</div>
 {sub && <div style={{ fontSize: 10, color:"#484F58", marginTop: 2 }}>{sub}</div>}
 </div>
 );
}

function Section({ title, children }) {
 return (
 <div style={{ background:"#161B22", border:"1px solid #21262D", borderRadius: 11, padding:"16px 16px 6px", marginBottom: 12 }}>
 <div style={{ fontSize: 10, color:"#FF9900", fontWeight: 700, textTransform:"uppercase", marginBottom: 12 }}>{title}</div>
 {children}
 </div>
 );
}

function InputField({ label, value, onChange, prefix ="", min = -Infinity, max = Infinity, step = 0.01, hint, id }) {
 const handleChange = (e) => {
 const raw = e.target.value;
 if (raw ===""|| raw ==="-") return onChange(0);
 const v = parseFloat(raw);
 if (isNaN(v)) return;
 const clamped = Math.max(min, Math.min(max ?? Infinity, v));
 onChange(clamped);
 };

 const inputId = id ||`input-${label.replace(/\s+/g,"-").toLowerCase()}`;
 return (
 <div style={{ marginBottom: 12 }}>
 <label htmlFor={inputId} style={{ display:"block", fontSize: 11, color:"#8B949E", marginBottom: 4, fontWeight: 700 }}>
 {label}{hint && <span style={{ fontWeight: 400, marginLeft: 5, color:"#484F58"}}>{hint}</span>}
 </label>
 <div style={{ position:"relative"}}>
 {prefix && <span style={{ position:"absolute", left: 10, top:"50%", transform:"translateY(-50%)", color:"#FF9900", fontSize: 13, fontWeight: 700, pointerEvents:"none"}}>{prefix}</span>}
 <input
 id={inputId}
 type="number"
 value={value}
 min={min}
 max={max}
 step={step}
 onChange={handleChange}
 style={{ width:"100%", boxSizing:"border-box", background:"#1C2128", border:"1px solid #30363D", borderRadius: 7, padding: prefix ?"9px 10px 9px 26px":"9px 10px", color:"#E6EDF3", fontSize: 14, fontWeight: 600, outline:"none"}}
 onFocus={e => e.target.style.borderColor ="#FF9900"}
 onBlur={e => e.target.style.borderColor ="#30363D"}
 />
 </div>
 </div>
 );
}

function SelectField({ label, value, onChange, options, parseAs = "index" }) {
 const id =`sf-${label.replace(/\s+/g,"-").toLowerCase()}`;
 const handleChange = (e) => {
 const index = parseInt(e.target.value);
 if (parseAs === "string" && options[index]) {
 // Pour Marketplace, utiliser la propriété 'value' de l'option
 const selectedValue = options[index].value;
 onChange(selectedValue || e.target.value);
 } else {
 // Pour les autres (Catégorie), utiliser l'index
 onChange(index);
 }
 };
 
 // Trouver l'index actuel basé sur la valeur
 const currentIndex = parseAs === "string" 
 ? options.findIndex(o => o.value === value)
 : value;
 
 return (
 <div style={{ marginBottom: 12 }}>
 <label htmlFor={id} style={{ display:"block", fontSize: 11, color:"#8B949E", marginBottom: 4, fontWeight: 700 }}>{label}</label>
 <select id={id} value={currentIndex >= 0 ? currentIndex : 0} onChange={handleChange} style={{ width:"100%", background:"#1C2128", border:"1px solid #30363D", borderRadius: 7, padding:"9px 10px", color:"#E6EDF3", fontSize: 13, outline:"none", cursor:"pointer"}}>
 {options.map((o, i) => <option key={i} value={i}>{o.label}</option>)}
 </select>
 </div>
 );
}

function Toggle({ label, value, onChange, hint }) {
 const id =`toggle-${label.replace(/\s+/g,"-").toLowerCase()}`;
 const handleKey = (e) => { if (e.key ==="Enter"|| e.code ==="Space") { e.preventDefault(); onChange(!value); } };
 return (
 <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom: 12 }}>
 <div>
 <label htmlFor={id} style={{ fontSize: 12, color:"#8B949E", fontWeight: 600, cursor:"pointer"}}>{label}</label>
 {hint && <div style={{ fontSize: 10, color:"#484F58"}}>{hint}</div>}
 </div>
 <div
 id={id} role="switch"aria-checked={value} tabIndex={0}
 onClick={() => onChange(!value)} onKeyDown={handleKey}
 style={{ width: 40, height: 22, borderRadius: 11, cursor:"pointer", background: value ?"#FF9900":"#30363D", position:"relative", transition:"background 0.25s", flexShrink: 0, outline:"none"}}
 onFocus={e => e.currentTarget.style.boxShadow ="0 0 0 2px #FF990066"}
 onBlur={e => e.currentTarget.style.boxShadow ="none"}
 >
 <div style={{ position:"absolute", top: 3, left: value ? 21 : 3, width: 16, height: 16, borderRadius:"50%", background:"#fff", transition:"left 0.25s", boxShadow:"0 1px 3px #0004"}} />
 </div>
 </div>
 );
}

function CashFlowChart({ rows, sym, breakevenMonth }) {
 const maxAbs = Math.max(...rows.map(r => Math.abs(r.cumulative)), 1);
 return (
 <div>
 <div style={{ display:"flex", alignItems:"flex-end", gap: 3, height: 100, marginBottom: 4 }}>
 {rows.map((r, i) => {
 const h = Math.max(4, (Math.abs(r.cumulative) / maxAbs) * 90);
 const col = r.cumulative >= 0 ?"#00C853":"#FF3D00";
 const isBE = r.month === breakevenMonth;
 return (
 <div key={i} style={{ flex: 1, display:"flex", flexDirection:"column", alignItems:"center", gap: 2 }}>
 {isBE && <span style={{ fontSize: 7, color:"#FFD600", fontWeight: 700 }}>BE</span>}
 <div style={{ height: h, width:"100%", background: col, borderRadius:"2px 2px 0 0", opacity: isBE ? 1 : 0.75, border: isBE ?`1px solid #FFD600`:"none"}} />
 <span style={{ fontSize: 7, color:"#484F58"}}>{MONTH_LABELS[i]}</span>
 </div>
 );
 })}
 </div>
 <div style={{ display:"flex", justifyContent:"space-between", fontSize: 10, color:"#8B949E"}}>
 <span>M1: {fmt(rows[0]?.cumulative, sym)}</span>
 <span>M12: {fmt(rows[11]?.cumulative, sym)}</span>
 </div>
 </div>
 );
}

function MultiProductCashFlow({ products, fxRates }) {
 const aggregated = useMemo(() => {
 if (products.length < 2) return null;
 const rows = Array.from({ length: 12 }, (_, i) => ({ month: i + 1, cumulative: 0 }));
 let totalOutlay = 0;
 products.forEach(p => {
 const calc = calcProduct(p, fxRates);
 const cf = buildCashFlow(p, calc);
 totalOutlay += cf.initialOutlay;
 cf.rows.forEach((r, i) => { rows[i].cumulative += r.cumulative + cf.initialOutlay; });
 });
 return { initialOutlay: totalOutlay, rows, breakevenMonth: rows.find(r => r.cumulative >= 0)?.month || null };
 }, [products, fxRates]);

 if (!aggregated) return null;

 return (
 <Section title="💸 Cash-flow consolidé (Portfolio)">
 <div style={{ fontSize: 11, color:"#8B949E", marginBottom: 10 }}>
 Mise de fonds totale: <strong style={{ color:"#FF9900"}}>{fmt(aggregated.initialOutlay)}</strong>
 {aggregated.breakevenMonth && <> · Break-even: <strong style={{ color:"#00C853"}}>mois {aggregated.breakevenMonth}</strong></>}
 </div>
 <CashFlowChart rows={aggregated.rows} sym="€"breakevenMonth={aggregated.breakevenMonth} />
 </Section>
 );
}

function RestockAlert({ p, calcP }) {
 const currentStock = p.initialOrderUnits;
 const monthlyVelocity = p.units;
 const leadDays = p.supplierLeadDays || 30;
 if (monthlyVelocity <= 0 || currentStock <= 0) return null;

 const daysOfStock = (currentStock / monthlyVelocity) * 30;
 const needsRestock = daysOfStock <= leadDays;
 const urgency = daysOfStock <= leadDays * 0.5 ?"critical": needsRestock ?"warning":"ok";
 const dailyLostProfit = (calcP.profit * monthlyVelocity) / 30;
 const lostProfit = dailyLostProfit * Math.max(0, leadDays - daysOfStock);
 const col = urgency ==="critical"?"#FF3D00": urgency ==="warning"?"#FF9900":"#00C853";

 return (
 <Section title="📦 Alerte Réapprovisionnement">
 <div style={{ padding:"12px", background:`${col}10`, border:`1px solid ${col}33`, borderLeft:`3px solid ${col}`, borderRadius: 8 }}>
 <div style={{ fontSize: 13, fontWeight: 700, color: col, marginBottom: 6 }}>
 {urgency ==="critical"?"🚨 Rupture imminente !": urgency ==="warning"?"⚠️ Commander maintenant":"✅ Stock suffisant"}
 </div>
 <div style={{ fontSize: 11, color:"#E6EDF3", lineHeight: 1.6, marginBottom: 8 }}>
 Stock: <strong>{currentStock} u</strong> · Ventes: <strong>{monthlyVelocity}/mois</strong> · Couverture: <strong>{daysOfStock.toFixed(0)} jours</strong> · Délai: <strong>{leadDays} j</strong>
 </div>
 {needsRestock && lostProfit > 0 && (
 <div style={{ fontSize: 11, color:"#FF9900", marginTop: 8, fontWeight: 600 }}>
 💰 Perte estimée si rupture: <strong>{fmt(lostProfit, calcP.sym)}</strong>
 </div>
 )}
 </div>
 </Section>
 );
}

function PortfolioExportButton() {
 const { products, fxRates, setToast } = useAppContext();

 const exportPortfolioExcel = () => {
 const headers = ["Nom","Marketplace","Prix Vente","Cout Achat","Profit/Unite","Marge %","ROI %","Ventes/mois","Profit Mensuel","Score"];
 const rows = products.map(prod => {
 const c = calcProduct(prod, fxRates);
 const mk = MARKETPLACES[prod.marketplace] || MARKETPLACES.FR;
 return [`${prod.name}`,`${mk.label}`, prod.sellingPrice, prod.costPrice, c.profit.toFixed(2), c.netMargin.toFixed(1), c.roi.toFixed(1), prod.units, c.monthlyProfit.toFixed(2), c.score];
 });
 const csvContent ="\uFEFF"+ [headers.join(";"), ...rows.map(r => r.join(";"))].join("\n");
 const blob = new Blob([csvContent], { type:"application/vnd.ms-excel;charset=utf-8;"});
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a");
 a.href = url;
 a.download =`portfolio-amazon-${new Date().toISOString().split('T')[0]}.xls`;
 a.click();
 URL.revokeObjectURL(url);
 setToast({ message:"📥 Portfolio exporté en Excel", type:"success"});
 };

 return (
 <button onClick={exportPortfolioExcel} tabIndex={0} aria-label="Exporter en Excel"style={{ background:"#00C853", border:"none", borderRadius: 7, padding:"8px 14px", color:"#0D1117", fontWeight: 700, fontSize: 11, cursor:"pointer"}}>
 📊 Export Excel
 </button>
 );
}

function PriceComparisonChart({ p, fxRates }) {
 const points = useMemo(() => {
 const arr = [];
 for (let i = 0; i <= 50; i++) {
 const testPrice = p.sellingPrice * (0.5 + (i / 50) * 1.5);
 const testCalc = calcProduct({ ...p, sellingPrice: testPrice }, fxRates);
 arr.push({ price: testPrice, profit: testCalc.monthlyProfit });
 }
 return arr;
 }, [p, fxRates]);

 const maxProfit = Math.max(...points.map(pt => pt.profit), 1);
 const minProfit = Math.min(...points.map(pt => pt.profit), 0);
 const range = maxProfit - minProfit || 1;
 const currentIdx = points.findIndex(pt => Math.abs(pt.price - p.sellingPrice) < (p.sellingPrice * 0.02));

 return (
 <Section title="📊 Courbe de profit vs Prix (50 scénarios)">
 <div style={{ display:"flex", alignItems:"flex-end", gap: 1, height: 120, marginBottom: 8 }}>
 {points.map((pt, i) => {
 const h = Math.max(2, ((pt.profit - minProfit) / range) * 100);
 const isCurrent = i === currentIdx;
 const col = pt.profit >= 0 ? (isCurrent ?"#FF9900":"#00C853") :"#FF3D00";
 return <div key={i} title={`${fmt(pt.price)} → ${fmt(pt.profit)}`} style={{ flex: 1, height:`${h}%`, background: col, borderRadius:"2px 2px 0 0", opacity: isCurrent ? 1 : 0.6, border: isCurrent ?"1px solid #FFD600":"none"}} />;
 })}
 </div>
 <div style={{ display:"flex", justifyContent:"space-between", fontSize: 10, color:"#8B949E"}}>
 <span>Prix min: {fmt(points[0].price)}</span>
 <span style={{ color:"#FF9900", fontWeight: 700 }}>Actuel: {fmt(p.sellingPrice)}</span>
 <span>Prix max: {fmt(points[50].price)}</span>
 </div>
 </Section>
 );
}

function CalculateurPanel() {
 const { p, u, calcP, sym, mk, cashFlow, pCol, products, fxRates } = useAppContext();
 return (
 <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(320px, 1fr))", gap: 14 }}>
 <div>
 <Section title="🏪 Produit & Marché">
 <div style={{ marginBottom: 12 }}>
 <label style={{ display: "block", fontSize: 11, color: "#8B949E", marginBottom: 4, fontWeight: 700 }}>Nom du produit</label>
 <input
 type="text"
 value={p.name}
 onChange={(e) => u("name", e.target.value)}
 style={{ width: "100%", boxSizing: "border-box", background: "#1C2128", border: "1px solid #30363D", borderRadius: 7, padding: "9px 10px", color: "#E6EDF3", fontSize: 14, fontWeight: 600, outline: "none" }}
 onFocus={(e) => e.target.style.borderColor = "#FF9900"}
 onBlur={(e) => e.target.style.borderColor = "#30363D"}
 />
</div>
 <SelectField label="Marketplace" value={p.marketplace} onChange={v => u("marketplace", v)} options={Object.entries(MARKETPLACES).map(([k, v]) => ({ label: v.label, value: k }))} parseAs="string" />
 <InputField label="Prix de vente TTC"value={p.sellingPrice} onChange={v => u("sellingPrice", v)} prefix={sym} min={0.01} max={9999} />
 <InputField label="Unités vendues / mois"value={p.units} onChange={v => u("units", v)} prefix=""min={1} step={1} />
 <SelectField label="Catégorie"value={p.categoryIdx} onChange={v => u("categoryIdx", v)} options={CATEGORIES} />
 </Section>

 <Section title="🚚 Logistique & Poids">
 <InputField label="Long. (cm)"value={p.length} onChange={v => u("length", v)} prefix=""min={0} />
 <InputField label="Larg. (cm)"value={p.width} onChange={v => u("width", v)} prefix=""min={0} />
 <InputField label="Haut. (cm)"value={p.height} onChange={v => u("height", v)} prefix=""min={0} />
 <InputField label="Poids réel (kg)"value={p.weight} onChange={v => u("weight", v)} prefix=""step={0.1} min={0} />
 </Section>

 <Section title="💰 Coûts & Taxes">
 <InputField label="Coût d'achat produit"value={p.costPrice} onChange={v => u("costPrice", v)} prefix={sym} min={0} />
 <InputField label="Transport vers Amazon"value={p.shippingToAmazon} onChange={v => u("shippingToAmazon", v)} prefix={sym} min={0} />
 <InputField label="Publicité PPC / unité"value={p.ads} onChange={v => u("ads", v)} prefix={sym} min={0} />
 </Section>
 </div>

 <div>
 <div style={{ background:"#161B22", border:`2px solid ${pCol}33`, borderRadius: 11, padding:"18px 16px", marginBottom: 12 }}>
 <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom: 14 }}>
 <div>
 <div style={{ fontSize: 10, color:"#8B949E", fontWeight: 700, textTransform:"uppercase", marginBottom: 4 }}>Résultat · {mk.label}</div>
 <div style={{ fontSize: 28, fontWeight: 900, color: pCol }}>
 {calcP.profit >= 0 ?"+":"−"}{fmt(calcP.profit, sym)}
 </div>
 </div>
 <ScoreGauge score={calcP.score} />
 </div>
 <ProfitMeter margin={calcP.netMargin} />
 <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap: 8, marginTop: 12 }}>
 <StatCard label="ROI"value={fmtPct(calcP.roi)} color={calcP.roi >= 50 ?"#00C853":"#FF9900"} />
 <StatCard label="Profit mensuel"value={fmt(calcP.monthlyProfit, sym)} color={calcP.monthlyProfit >= 0 ?"#00C853":"#FF3D00"} />
 </div>
 </div>

 <div style={{ background:"#161B22", border:"1px solid #21262D", borderRadius: 11, padding:"16px 16px 12px", marginBottom: 12 }}>
 <div style={{ fontSize: 10, color:"#FF9900", fontWeight: 700, textTransform:"uppercase", marginBottom: 12 }}>💸 Cash flow 12 mois</div>
 <CashFlowChart rows={cashFlow.rows} sym={sym} breakevenMonth={cashFlow.breakevenMonth} />
 </div>

 {products.length > 1 && <MultiProductCashFlow products={products} fxRates={fxRates} />}
 </div>
 </div>
 );
}

function COGSPanel({ p, u, sym }) {
 const { calcP } = useAppContext();
 return (
 <div>
 <Section title="📦 COGS — Coût de revient">
 <InputField label="Prix unitaire fournisseur"value={p.costPrice} onChange={v => u("costPrice", v)} prefix={sym} min={0} />
 <InputField label="Transport vers Amazon"value={p.shippingToAmazon} onChange={v => u("shippingToAmazon", v)} prefix={sym} min={0} />
 </Section>
 <RestockAlert p={p} calcP={calcP} />
 </div>
 );
}

function IdeesPanel() {
const { setTab, products, activeProduct, setProducts, setToast } = useAppContext();
return (
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
{TRENDING_PRODUCTS.map((item, i) => (
<div key={i} style={{ background: "#161B22", border: "1px solid #21262D", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
  {/* Image du produit */}
  <div style={{ width: "100%", height: 200, overflow: "hidden", position: "relative", background: "#1C2128" }}>
    <img 
      src={item.image} 
      alt={item.name}
      loading="lazy"
      style={{ 
        width: "100%", 
        height: "100%", 
        objectFit: "cover",
        transition: "transform 0.3s"
      }}
      onError={(e) => {
        e.target.style.display = "none";
        e.target.parentElement.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:60px;">' + item.icon + '</div>';
      }}
    />
  </div>
  
  <div style={{ padding: "16px" }}>
    <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: "#E6EDF3" }}>{item.icon} {item.name}</div>
    <div style={{ fontSize: 11, color: "#8B949E", marginBottom: 12 }}>{item.category}</div>
    
    <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
      <div style={{ flex: 1, padding: "8px", background: "#1C2128", borderRadius: 6 }}>
        <div style={{ fontSize: 9, color: "#8B949E" }}>Prix Amazon</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#FF9900" }}>{fmt(item.amazonPriceRange[0])}-{fmt(item.amazonPriceRange[1])}</div>
      </div>
      <div style={{ flex: 1, padding: "8px", background: "#1C2128", borderRadius: 6 }}>
        <div style={{ fontSize: 9, color: "#8B949E" }}>Prix Alibaba</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#00C853" }}>{fmt(item.alibabaPriceRange[0])}-{fmt(item.alibabaPriceRange[1])}</div>
      </div>
    </div>
    
    <div style={{ padding: "8px", background: `${item.color}15`, borderRadius: 6, marginBottom: 12 }}>
      <div style={{ fontSize: 10, color: item.color, fontWeight: 700 }}>
         Croissance: {item.growth}
      </div>
      <div style={{ fontSize: 10, color: "#8B949E", marginTop: 2 }}>
        {item.note}
      </div>
    </div>
    
    <button onClick={() => {
setProducts(prev => prev.map((prod, idx) => idx === activeProduct ? { ...prod, name: item.name, sellingPrice: (item.amazonPriceRange[0] + item.amazonPriceRange[1]) / 2, costPrice: (item.alibabaPriceRange[0] + item.alibabaPriceRange[1]) / 2, categoryIdx: item.categoryIdx } : prod));
setTab("calculateur");
setToast({ message:`✅ ${item.name} chargé`, type: "success"});
}} style={{ width: "100%", background: "linear-gradient(135deg, #FF9900 0%, #FFB800 100%)", border: "none", borderRadius: 8, padding: "12px", color: "#0D1117", fontWeight: 700, fontSize: 13, cursor: "pointer", boxShadow: "0 2px 8px rgba(255,153,0,0.3)" }}>
      Utiliser ce produit →
    </button>
  </div>
</div>
))}
</div>
);
}

function PortfolioPanel() {
 const { products, activeProduct, setActiveProduct, addProduct, fxRates } = useAppContext();
 return (
 <div>
 <div style={{ display:"flex", justifyContent:"space-between", marginBottom: 16 }}>
 <div style={{ fontSize: 12, color:"#8B949E"}}>{products.length} produit(s)</div>
 <PortfolioExportButton />
 </div>
 <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
 {products.map((prod, idx) => {
 const c = calcProduct(prod, fxRates);
 return (
 <div key={idx} style={{ background:"#161B22", border:"1px solid #21262D", borderRadius: 11, padding:"16px"}}>
 <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>{prod.name}</div>
 <StatCard label="Profit mensuel"value={fmt(c.monthlyProfit, c.sym)} color={c.monthlyProfit >= 0 ?"#00C853":"#FF3D00"} />
 </div>
 );
 })}
 </div>
 <MultiProductCashFlow products={products} fxRates={fxRates} />
 </div>
 );
}

function PricingPanel() {
 const { p, fxRates } = useAppContext();
 return <PriceComparisonChart p={p} fxRates={fxRates} />;
}

function HistoriquePanel() {
 const { saveCurrentToHistory } = useAppContext();
 const [history, setHistory] = useState([]);
 const [loaded, setLoaded] = useState(false);

 useEffect(() => {
 (async () => {
 try {
 const raw = await safeStorageGet("history");
 if (raw) { const parsed = JSON.parse(raw); if (Array.isArray(parsed)) setHistory(parsed); }
 } catch (e) {}
 finally { setLoaded(true); }
 })();
 }, []);

 const handleSave = async () => {
 const newHistory = await saveCurrentToHistory();
 if (newHistory) setHistory(newHistory);
 };

 if (!loaded) return <div style={{ textAlign:"center", padding:"40px 0", color:"#484F58"}}>Chargement…</div>;

 return (
 <div>
 <div style={{ display:"flex", justifyContent:"space-between", marginBottom: 14 }}>
 <div style={{ fontSize: 10, color:"#8B949E"}}>{history.length} calcul(s)</div>
 <button onClick={handleSave} style={{ background:"#FF9900", border:"none", borderRadius: 7, padding:"7px 12px", color:"#0D1117", fontWeight: 700, fontSize: 11, cursor:"pointer"}}>
 💾 Sauvegarder
 </button>
 </div>
 {history.length === 0 ? (
 <div style={{ textAlign:"center", padding:"60px 0", color:"#484F58"}}>
 <div style={{ fontSize: 40, marginBottom: 12 }}>🕐</div>
 <div style={{ fontSize: 14, marginBottom: 6 }}>Aucun calcul sauvegardé</div>
 </div>
 ) : history.map((h, i) => {
 const col = profitColor(h.margin);
 return (
 <div key={i} style={{ background:"#161B22", border:"1px solid #21262D", borderRadius: 10, padding:"14px 16px", marginBottom: 8 }}>
 <div style={{ display:"flex", justifyContent:"space-between", marginBottom: 8 }}>
 <div>
 <div style={{ fontSize: 13, fontWeight: 700 }}>{h.name}</div>
 <div style={{ fontSize: 10, color:"#484F58"}}>{h.date} · {MARKETPLACES[h.marketplace]?.label || h.marketplace}</div>
 </div>
 <div style={{ fontSize: 18, fontWeight: 800, color: col }}>{h.profit >= 0 ?"+":""}{fmt(h.profit, h.sym)}/u</div>
 </div>
 <div style={{ display:"flex", gap: 14, flexWrap:"wrap"}}>
 <span style={{ fontSize: 11, color: col, fontWeight: 700 }}>Marge {h.margin}%</span>
 <span style={{ fontSize: 11, color:"#8B949E"}}>ROI {h.roi}%</span>
 </div>
 </div>
 );
 })}
 </div>
 );
}

function AProposPanel() {
 return (
 <div style={{ background:"#161B22", border:"1px solid #21262D", borderRadius: 11, padding:"20px"}}>
 <h2 style={{ color:"#FF9900", marginBottom: 10 }}>Amazon Profit Pro Élite</h2>

  {/* Recherche par Image */}
  <div style={{ background: 'var(--bg-card)', borderRadius: 12, padding: 20, marginBottom: 20 }}>
    <h3 style={{ color: 'var(--text-primary)', marginBottom: 15 }}>📸 Recherche par Image</h3>
    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ width: '100%', padding: 12, background: 'var(--bg-tertiary)', border: '2px dashed var(--border-color)', borderRadius: 8, color: 'var(--text-primary)', marginBottom: 15 }} />
    <button onClick={searchOnAmazonAlibaba} style={{ width: '100%', padding: 12, background: 'linear-gradient(135deg, #FF9900 0%, #FFB800 100%)', border: 'none', borderRadius: 8, color: '#0D1117', fontWeight: 'bold', cursor: 'pointer' }}>🔍 Rechercher sur Amazon & Alibaba</button>
    {imageResults && (
      <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
        <div style={{ background: 'var(--bg-tertiary)', padding: 15, borderRadius: 8 }}>
          <h5 style={{ color: '#FF9900' }}>🛒 Amazon</h5>
          {amazonResults.map((p, i) => <div key={i} style={{ background: 'var(--bg-card)', padding: 10, marginBottom: 10, borderRadius: 6 }}><img src={p.image} alt={p.name} style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 4, marginBottom: 8 }} /><div style={{ fontSize: 14, fontWeight: 'bold', color: 'var(--text-primary)' }}>{p.name}</div><div style={{ fontSize: 16, color: '#FF9900', fontWeight: 'bold' }}>{p.price}</div></div>)}
        </div>
        <div style={{ background: 'var(--bg-tertiary)', padding: 15, borderRadius: 8 }}>
          <h5 style={{ color: '#00C853' }}>🏭 Alibaba</h5>
          {alibabaResults.map((p, i) => <div key={i} style={{ background: 'var(--bg-card)', padding: 10, marginBottom: 10, borderRadius: 6 }}><img src={p.image} alt={p.name} style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 4, marginBottom: 8 }} /><div style={{ fontSize: 14, fontWeight: 'bold', color: 'var(--text-primary)' }}>{p.name}</div><div style={{ fontSize: 16, color: '#00C853', fontWeight: 'bold' }}>{p.price}</div></div>)}
        </div>
      </div>
    )}
  </div>

 <p style={{ color:"#8B949E", lineHeight: 1.6, marginBottom: 16 }}>Calculateur de profit expert pour vendeurs Amazon FBA/FBM avec 40+ fonctionnalités.</p>
 </div>
 );
}

const defaultProduct = (name = "Produit 1") => ({
 name, marketplace: "FR", sellingPrice: 29.99, costPrice: 8.00,
 shippingToAmazon: 1.50, categoryIdx: 2, fulfillment: "fba", fbaSizeIdx: 1,
 length: 20, width: 15, height: 5, weight: 0.3,
 fbmShipping: 4.50, fbmPacking: 0.80, vatRate: 20, vatRegistered: false,
 b2bSales: false, useEFN: false, isQ4: false,
 inboundPlacementFee: false, lowInventoryPenalty: false,
 ads: 1.50, ppcConvRate: 10, otherCosts: 0, units: 100,
 longStorage: false, includeReturns: true,
 customsDuty: 0, insurance: 0,
 qcInspection: false, qcCost: 300,
 useAirFreight: false, airFreightExtra: 2,
 supplierLeadDays: 30, amazonPayoutDays: 14,
 initialOrderUnits: 500, rampMonths: 3,
 supplierFinancing: false, capitalCostRate: 0,
});

const TABS = ["dashboard","analytics","tradeai","stock","competitive","apropos","idees","calculateur","cogs","pricing","comparateur","historique","abonnements","formations"];
const TAB_LABELS = {
 dashboard: "📊 Dashboard",
 analytics: "📈 Analytics",
 tradeai: "🤖 TradeAI",
 stock: "📦 Stocks",
 competitive: "🎯 Concurrents",
 apropos:"ℹ️ À propos",
 idees:"💡 Idées",
 calculateur:"📊 Calcul",
 cogs:"📦 COGS",
 pricing:"💲 Pricing",
 comparateur:"⚖️ Portfolio",
 historique:"🕐 Historique",
  abonnements:"💎 Abonnements",
  formations:"🎓 Formations",
};

import InstallPWA from "./components/InstallPWA.jsx";
import About from "./components/About";
import ChatAssistant from "./components/ChatAssistant";
import ThemeToggle from "./components/ThemeToggle";
import { useTheme } from "./context/ThemeContext";
import { ThemeProvider } from "./context/ThemeContext";
import Tutorial from "./components/Tutorial";
import Pricing from "./components/Pricing";
import FBAAcademy from "./components/FBAAcademy";
import FormationsShop from "./components/FormationsShop";


function DashboardPanel() {
 const { products, fxRates, calcP, p, mk } = useAppContext();
 
 const totalMonthlyProfit = products.reduce((sum, prod) => {
 const c = calcProduct(prod, fxRates);
 return sum + c.monthlyProfit;
 }, 0);
 
 const avgMargin = products.length > 0 
 ? products.reduce((sum, prod) => sum + calcProduct(prod, fxRates).netMargin, 0) / products.length 
 : 0;
 
 const bestProduct = products.reduce((best, prod) => {
 const c = calcProduct(prod, fxRates);
 const bestC = calcProduct(best, fxRates);
 return c.monthlyProfit > bestC.monthlyProfit ? prod : best;
 }, products[0]);
 
 const bestCalc = bestProduct ? calcProduct(bestProduct, fxRates) : null;

 return (
 <div>
 <Section title="📊 Vue d'ensemble">
 <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 16 }}>
 <StatCard label="Produits actifs" value={products.length} color="#FF9900" />
 <StatCard label="Profit mensuel total" value={fmt(totalMonthlyProfit)} color={totalMonthlyProfit >= 0 ? "#00C853" : "#FF3D00"} />
 <StatCard label="Marge moyenne" value={fmtPct(avgMargin)} color={avgMargin >= 15 ? "#00C853" : "#FF9900"} />
 <StatCard label="Meilleur produit" value={bestProduct?.name || "-"} color="#FFD600" sub={bestCalc ? fmt(bestCalc.monthlyProfit) + "/mois" : ""} />
 </div>
 </Section>
 
 <Section title="🏆 Top 3 Produits">
 {products.slice().sort((a, b) => calcProduct(b, fxRates).monthlyProfit - calcProduct(a, fxRates).monthlyProfit).slice(0, 3).map((prod, i) => {
 const c = calcProduct(prod, fxRates);
 return (
 <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 12px", background: "#1C2128", borderRadius: 8, marginBottom: 8, border: "1px solid #30363D" }}>
 <div>
 <div style={{ fontSize: 13, fontWeight: 700 }}>{i + 1}. {prod.name}</div>
 <div style={{ fontSize: 10, color: "#8B949E" }}>{MARKETPLACES[prod.marketplace]?.label} · Marge {c.netMargin.toFixed(1)}%</div>
 </div>
 <div style={{ fontSize: 16, fontWeight: 800, color: c.monthlyProfit >= 0 ? "#00C853" : "#FF3D00" }}>
 {fmt(c.monthlyProfit, c.sym)}
 </div>
 </div>
 );
 })}
 </Section>
 
 <Section title="📈 Répartition par marketplace">
 {Object.keys(MARKETPLACES).slice(0, 6).map(mk => {
 const count = products.filter(p => p.marketplace === mk).length;
 const profit = products.filter(p => p.marketplace === mk).reduce((sum, p) => sum + calcProduct(p, fxRates).monthlyProfit, 0);
 return (
 <div key={mk} style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", background: "#1C2128", borderRadius: 6, marginBottom: 6, fontSize: 12 }}>
 <span>{MARKETPLACES[mk].label}</span>
 <span style={{ color: "#8B949E" }}>{count} produit{count > 1 ? 's' : ''} · <strong style={{ color: profit >= 0 ? "#00C853" : "#FF3D00" }}>{fmt(profit)}</strong></span>
 </div>
 );
 })}
 </Section>
 </div>
 );
}

function AnalyticsPanel() {
 const { products, fxRates } = useAppContext();
 
 const categoryStats = {};
 products.forEach(p => {
 const cat = CATEGORIES[p.categoryIdx]?.label || "Autre";
 if (!categoryStats[cat]) categoryStats[cat] = { count: 0, profit: 0 };
 categoryStats[cat].count++;
 categoryStats[cat].profit += calcProduct(p, fxRates).monthlyProfit;
 });
 
 const totalProfit = products.reduce((sum, p) => sum + calcProduct(p, fxRates).monthlyProfit, 0);
 const totalROI = products.length > 0 
 ? products.reduce((sum, p) => sum + calcProduct(p, fxRates).roi, 0) / products.length 
 : 0;

 return (
 <div>
 <Section title="📈 Analytics Globales">
 <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
 <StatCard label="Profit total" value={fmt(totalProfit)} color={totalProfit >= 0 ? "#00C853" : "#FF3D00"} />
 <StatCard label="ROI moyen" value={fmtPct(totalROI)} color={totalROI >= 50 ? "#00C853" : "#FF9900"} />
 <StatCard label="Produits rentables" value={products.filter(p => calcProduct(p, fxRates).profit > 0).length + "/" + products.length} color="#00C853" />
 <StatCard label="Score moyen" value={(products.reduce((s, p) => s + calcProduct(p, fxRates).score, 0) / products.length).toFixed(1) + "/10"} color="#FFD600" />
 </div>
 </Section>
 
 <Section title="🏷️ Par catégorie">
 {Object.entries(categoryStats).map(([cat, data]) => (
 <div key={cat} style={{ marginBottom: 10 }}>
 <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 12 }}>
 <span style={{ fontWeight: 700 }}>{cat}</span>
 <span style={{ color: data.profit >= 0 ? "#00C853" : "#FF3D00" }}>{fmt(data.profit)} · {data.count} prod.</span>
 </div>
 <div style={{ background: "#1C2128", height: 6, borderRadius: 3, overflow: "hidden" }}>
 <div style={{ 
 height: "100%", 
 width: Math.min(100, Math.abs(data.profit / Math.max(Math.abs(totalProfit), 1)) * 100) + "%",
 background: data.profit >= 0 ? "#00C853" : "#FF3D00"
 }} />
 </div>
 </div>
 ))}
 </Section>
 
 <Section title="📊 Distribution des scores">
 <div style={{ display: "flex", gap: 8, height: 80, alignItems: "flex-end" }}>
 {[...Array(11)].map((_, i) => {
 const count = products.filter(p => calcProduct(p, fxRates).score === i).length;
 const maxCount = Math.max(...[...Array(11)].map((_, j) => products.filter(p => calcProduct(p, fxRates).score === j).length), 1);
 return (
 <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
 <div style={{ 
 width: "100%", 
 height: (count / maxCount * 70) + "px", 
 background: scoreColor(i),
 borderRadius: "2px 2px 0 0",
 minHeight: count > 0 ? 4 : 0
 }} />
 <span style={{ fontSize: 9, color: "#8B949E" }}>{i}</span>
 </div>
 );
 })}
 </div>
 </Section>
 </div>
 );
}

function TradeAIPanel() {
 const { products, fxRates, p, calcP } = useAppContext();
 
 const suggestions = [];
 
 // Suggestion 1 : Optimisation prix
 if (calcP.netMargin < 15) {
 suggestions.push({
 icon: "💰",
 title: "Augmentez votre prix",
 desc: `Votre marge nette est de ${calcP.netMargin.toFixed(1)}%. Visez au moins 15% pour être rentable.`,
 color: "#FF9900"
 });
 }
 
 // Suggestion 2 : Publicité
 if (p.ads < 1 && p.units > 50) {
 suggestions.push({
 icon: "📢",
 title: "Activez la publicité PPC",
 desc: `Avec ${p.units} ventes/mois, un budget pub de 1-2€/unité boosterait votre visibilité.`,
 color: "#3B82F6"
 });
 }
 
 // Suggestion 3 : Arbitrage FBA
 if (calcP.arbitrageFBA) {
 suggestions.push({
 icon: "📦",
 title: "Optimisez votre taille FBA",
 desc: `Passez à "${calcP.arbitrageFBA.label}" pour économiser ${fmt(calcP.arbitrageFBA.saving)}/unité.`,
 color: "#00C853"
 });
 }
 
 // Suggestion 4 : Q4
 if (!p.isQ4) {
 suggestions.push({
 icon: "🎄",
 title: "Préparez Q4",
 desc: "Activez le mode Q4 pour anticiper les frais de stockage multipliés par 3 en fin d'année.",
 color: "#8B5CF6"
 });
 }
 
 // Suggestion 5 : Multi-marketplace
 const uniqueMk = new Set(products.map(p => p.marketplace)).size;
 if (uniqueMk < 3) {
 suggestions.push({
 icon: "🌍",
 title: "Étendez-vous à d'autres marketplaces",
 desc: `Vous n'êtes que sur ${uniqueMk} marketplace(s). DE, UK et IT offrent de belles opportunités.`,
 color: "#06B6D4"
 });
 }

 return (
 <div>
 <Section title="🤖 Assistant IA - Recommandations">
 <div style={{ padding: 16, background: "rgba(255,153,0,0.1)", border: "1px solid #FF990033", borderRadius: 9, marginBottom: 16 }}>
 <div style={{ fontSize: 14, fontWeight: 700, color: "#FF9900", marginBottom: 6 }}>
 💡 {suggestions.length} suggestion{ suggestions.length > 1 ? 's' : '' } pour {p.name}
 </div>
 <div style={{ fontSize: 11, color: "#8B949E" }}>
 Analyse basée sur vos données actuelles et les meilleures pratiques Amazon FBA.
 </div>
 </div>
 
 {suggestions.map((s, i) => (
 <div key={i} style={{ 
 padding: 16, 
 background: "#1C2128", 
 border: `1px solid ${s.color}33`,
 borderLeft: `4px solid ${s.color}`,
 borderRadius: 9, 
 marginBottom: 10 
 }}>
 <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
 <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, color: s.color }}>{s.title}</div>
 <div style={{ fontSize: 12, color: "#E6EDF3", lineHeight: 1.5 }}>{s.desc}</div>
 </div>
 ))}
 </Section>
 
 <Section title="📊 Benchmark du marché">
 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
 <div style={{ padding: 12, background: "#1C2128", borderRadius: 8 }}>
 <div style={{ fontSize: 10, color: "#8B949E", marginBottom: 4 }}>Marge moyenne FBA</div>
 <div style={{ fontSize: 20, fontWeight: 800, color: "#FF9900" }}>18.5%</div>
 <div style={{ fontSize: 10, color: calcP.netMargin >= 18.5 ? "#00C853" : "#FF3D00", marginTop: 4 }}>
 {calcP.netMargin >= 18.5 ? "✓ Au-dessus" : "⚠ En-dessous"}
 </div>
 </div>
 <div style={{ padding: 12, background: "#1C2128", borderRadius: 8 }}>
 <div style={{ fontSize: 10, color: "#8B949E", marginBottom: 4 }}>ROI moyen FBA</div>
 <div style={{ fontSize: 20, fontWeight: 800, color: "#FF9900" }}>75%</div>
 <div style={{ fontSize: 10, color: calcP.roi >= 75 ? "#00C853" : "#FF3D00", marginTop: 4 }}>
 {calcP.roi >= 75 ? "✓ Au-dessus" : "⚠ En-dessous"}
 </div>
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
 <div style={{ display: "grid", gap: 10 }}>
 {products.map((prod, i) => {
 const c = calcProduct(prod, fxRates);
 const daysOfStock = prod.units > 0 ? (prod.initialOrderUnits / prod.units) * 30 : 0;
 const leadDays = prod.supplierLeadDays || 30;
 const status = daysOfStock <= leadDays * 0.5 ? "critical" : daysOfStock <= leadDays ? "warning" : "ok";
 const color = status === "critical" ? "#FF3D00" : status === "warning" ? "#FF9900" : "#00C853";
 
 return (
 <div key={i} style={{ 
 padding: 14, 
 background: "#1C2128", 
 border: `1px solid ${color}33`,
 borderLeft: `4px solid ${color}`,
 borderRadius: 9 
 }}>
 <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
 <div style={{ fontSize: 14, fontWeight: 700 }}>{prod.name}</div>
 <div style={{ fontSize: 11, fontWeight: 700, color }}>
 {status === "critical" ? "🚨 Critique" : status === "warning" ? "⚠️ Attention" : "✅ OK"}
 </div>
 </div>
 
 <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, fontSize: 11 }}>
 <div>
 <div style={{ color: "#8B949E" }}>Stock</div>
 <div style={{ fontWeight: 700 }}>{prod.initialOrderUnits} u</div>
 </div>
 <div>
 <div style={{ color: "#8B949E" }}>Ventes/mois</div>
 <div style={{ fontWeight: 700 }}>{prod.units}</div>
 </div>
 <div>
 <div style={{ color: "#8B949E" }}>Couverture</div>
 <div style={{ fontWeight: 700, color }}>{daysOfStock.toFixed(0)} j</div>
 </div>
 <div>
 <div style={{ color: "#8B949E" }}>Délai</div>
 <div style={{ fontWeight: 700 }}>{leadDays} j</div>
 </div>
 </div>
 
 {status !== "ok" && (
 <div style={{ marginTop: 10, padding: 8, background: `${color}15`, borderRadius: 6, fontSize: 11, color }}>
 💰 Perte estimée si rupture: <strong>{fmt((c.profit * prod.units / 30) * Math.max(0, leadDays - daysOfStock), c.sym)}</strong>
 </div>
 )}
 </div>
 );
 })}
 </div>
 </Section>
 
 <Section title="📊 Métriques globales">
 <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10 }}>
 <StatCard 
 label="Stock total" 
 value={products.reduce((s, p) => s + p.initialOrderUnits, 0) + " u"} 
 color="#FF9900" 
 />
 <StatCard 
 label="Valeur stock" 
 value={fmt(products.reduce((s, p) => s + (p.initialOrderUnits * p.costPrice), 0))} 
 color="#FFD600" 
 />
 <StatCard 
 label="Rotation/mois" 
 value={(products.reduce((s, p) => s + p.units, 0) / Math.max(1, products.reduce((s, p) => s + p.initialOrderUnits, 0)) * 100).toFixed(1) + "%"} 
 color="#00C853" 
 />
 </div>
 </Section>
 </div>
 );
}

function CompetitivePanel() {
 const { p, calcP, products, fxRates } = useAppContext();
 
 const competitors = [
 { name: "Concurrent A", price: p.sellingPrice * 0.95, rating: 4.2, reviews: 1240, fba: true },
 { name: "Concurrent B", price: p.sellingPrice * 1.10, rating: 4.5, reviews: 890, fba: true },
 { name: "Concurrent C", price: p.sellingPrice * 0.85, rating: 3.8, reviews: 320, fba: false },
 { name: "Marque Amazon", price: p.sellingPrice * 0.80, rating: 4.6, reviews: 5400, fba: true },
 ];

 return (
 <div>
 <Section title="🎯 Analyse Concurrentielle">
 <div style={{ padding: 14, background: "#1C2128", borderRadius: 9, marginBottom: 12 }}>
 <div style={{ fontSize: 12, color: "#8B949E", marginBottom: 8 }}>Votre positionnement</div>
 <div style={{ fontSize: 16, fontWeight: 800, color: "#FF9900", marginBottom: 4 }}>{p.name}</div>
 <div style={{ display: "flex", gap: 14, fontSize: 12 }}>
 <span>Prix: <strong>{fmt(p.sellingPrice, calcP.sym)}</strong></span>
 <span>Marge: <strong style={{ color: calcP.netMargin >= 15 ? "#00C853" : "#FF9900" }}>{calcP.netMargin.toFixed(1)}%</strong></span>
 <span>Score: <strong>{calcP.score}/10</strong></span>
 </div>
 </div>
 </Section>
 
 <Section title="👥 Concurrents Simulés">
 {competitors.map((c, i) => {
 const priceDiff = ((c.price - p.sellingPrice) / p.sellingPrice) * 100;
 return (
 <div key={i} style={{ 
 padding: 14, 
 background: "#1C2128", 
 borderRadius: 9, 
 marginBottom: 8,
 border: "1px solid #30363D"
 }}>
 <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
 <div style={{ fontSize: 13, fontWeight: 700 }}>{c.name} {c.fba && <span style={{ fontSize: 10, color: "#00C853" }}>FBA</span>}</div>
 <div style={{ fontSize: 14, fontWeight: 800, color: priceDiff < 0 ? "#FF3D00" : "#00C853" }}>
 {fmt(c.price, calcP.sym)} <span style={{ fontSize: 10, color: "#8B949E" }}>({priceDiff >= 0 ? "+" : ""}{priceDiff.toFixed(1)}%)</span>
 </div>
 </div>
 <div style={{ display: "flex", gap: 14, fontSize: 11, color: "#8B949E" }}>
 <span>⭐ {c.rating}</span>
 <span>💬 {c.reviews} avis</span>
 </div>
 </div>
 );
 })}
 </Section>
 
 <Section title="💡 Stratégies Recommandées">
 {[
 { title: "Prix d'appel", desc: "Positionnez-vous 5-10% sous le concurrent principal pour gagner en visibilité", color: "#00C853" },
 { title: "Différenciation", desc: "Mettez en avant vos avantages (livraison rapide, garantie, bundle)", color: "#3B82F6" },
 { title: "Avis clients", desc: `Avec ${competitors[0].reviews} avis chez le leader, visez 50-100 avis rapidement`, color: "#FF9900" },
 { title: "Publicité ciblée", desc: "Ciblez les mots-clés de vos concurrents avec un budget PPC agressif", color: "#8B5CF6" },
 ].map((s, i) => (
 <div key={i} style={{ 
 padding: 12, 
 background: "#1C2128", 
 borderLeft: `3px solid ${s.color}`,
 borderRadius: 6, 
 marginBottom: 8 
 }}>
 <div style={{ fontSize: 13, fontWeight: 700, color: s.color, marginBottom: 4 }}>{s.title}</div>
 <div style={{ fontSize: 11, color: "#E6EDF3", lineHeight: 1.5 }}>{s.desc}</div>
 </div>
 ))}
 </Section>
 </div>
 );
}



function FBAAcademyPanel() {
  return <FBAAcademy />;
}

export default function AmazonPro() {
  
  // États pour la recherche par image
  const [uploadedImage, setUploadedImage] = React.useState(null);

  const [activeTab, setActiveTab] = React.useState('dashboard');

  const [imageResults, setImageResults] = React.useState(false);
  const [amazonResults, setAmazonResults] = React.useState([]);
  const [alibabaResults, setAlibabaResults] = React.useState([]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const searchOnAmazonAlibaba = () => {
    if (!uploadedImage) {
      alert('Veuillez importer une image');
      return;
    }
    setAmazonResults([
      { name: 'Produit Amazon 1', price: '€29.99', image: uploadedImage },
      { name: 'Produit Amazon 2', price: '€34.99', image: uploadedImage }
    ]);
    setAlibabaResults([
      { name: 'Produit Alibaba 1', price: '€5.50', image: uploadedImage },
      { name: 'Produit Alibaba 2', price: '€4.20', image: uploadedImage }
    ]);
    setImageResults(true);
  };

 const [tab, setTab] = useState("calculateur");
 const [products, setProducts] = useState([defaultProduct("Coque iPhone 17 Transparente 456")]);
 const [activeProduct, setActiveProduct] = useState(0);
 const [fxRates, setFxRates] = useState(null);
 const [loaded, setLoaded] = useState(false);
 const [saveStatus, setSaveStatus] = useState("");
 const [toast, setToast] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

 useEffect(() => {
 fetch("https://open.er-api.com/v6/latest/EUR")
 .then(res => res.json())
 .then(data => setFxRates(data.rates))
 .catch(e => console.log("FX API unavailable", e));
 }, []);

 useEffect(() => {
 (async () => {
 try {
 const saved = await safeStorageGet("products");
 if (saved) {
 const parsed = JSON.parse(saved);
 if (Array.isArray(parsed) && parsed.length > 0) setProducts(parsed);
 }
 } catch (e) {}
 finally { setLoaded(true); }
 })();
 }, []);

 useEffect(() => {
 if (!loaded) return;
 setSaveStatus("saving");
 const t = setTimeout(async () => {
 const ok = await safeStorageSet("products", JSON.stringify(products));
 setSaveStatus(ok ?"saved":"error");
 }, 600);
 return () => clearTimeout(t);
 }, [products, loaded]);

 useEffect(() => {
 if (saveStatus ==="saved") {
 const t = setTimeout(() => setSaveStatus(""), 1800);
 return () => clearTimeout(t);
 }
 }, [saveStatus]);

 const updateProduct = useCallback((idx, key, val) => {
 setProducts(prev => prev.map((p, i) => i === idx ? { ...p, [key]: val } : p));
 }, []);

 const addProduct = () => {
const randomCategory = Math.floor(Math.random() * 11);
const randomName = getRandomProductName(randomCategory);
setProducts(prev => [...prev, defaultProduct(randomName)]);
setActiveProduct(products.length);
};

 const removeProduct = (idx) => {
 if (products.length <= 1) return;
 setProducts(prev => prev.filter((_, i) => i !== idx));
 if (activeProduct >= idx) setActiveProduct(Math.max(0, activeProduct - 1));
 };

 const saveCurrentToHistory = async () => {
 const raw = await safeStorageGet("history");
 let history = [];
 try { if (raw) { const parsed = JSON.parse(raw); if (Array.isArray(parsed)) history = parsed; } } catch (e) {}
 const entries = products.map(p => {
 const c = calcProduct(p, fxRates);
 const mk = MARKETPLACES[p.marketplace] || MARKETPLACES.FR;
 return { date: new Date().toLocaleString("fr-FR"), name: p.name, marketplace: p.marketplace, price: p.sellingPrice, profit: +c.profit.toFixed(2), margin: +c.netMargin.toFixed(1), roi: +c.roi.toFixed(1), score: c.score, sym: mk.symbol };
 });
 const newHistory = [...entries, ...history].slice(0, 100);
 await safeStorageSet("history", JSON.stringify(newHistory));
 setToast({ message:"💾 Historique sauvegardé", type:"success"});
 return newHistory;
 };

 
  // Vérifier si c'est le premier lancement
  useEffect(() => {
    (async () => {
      try {
        const shown = await safeStorageGet("tutorialShown");
        if (!shown) {
          setShowTutorial(true);
        }
      } catch (e) {}
    })();
  }, []);

  const closeTutorial = async () => {
    setShowTutorial(false);
    await safeStorageSet("tutorialShown", "true");
  };

  const p = products[activeProduct] || defaultProduct();
 const mk = MARKETPLACES[p.marketplace] || MARKETPLACES.FR;
 const sym = mk.symbol;
 const calcP = useMemo(() => calcProduct(p, fxRates), [p, fxRates]);
 const cashFlow = useMemo(() => buildCashFlow(p, calcP), [p, calcP]);
 const pCol = profitColor(calcP.netMargin);
 const u = (key, val) => updateProduct(activeProduct, key, val);

 const contextValue = {
 p, calcP, sym, mk, u, cashFlow, pCol, products, activeProduct, setActiveProduct, addProduct, setProducts, setTab, fxRates,
 setToast,
 saveCurrentToHistory,
 };

 return (
 <ThemeProvider>
      <AppContext.Provider value={contextValue}>
 <div style={{ minHeight:"100vh", background:"#0D1117", color:"#E6EDF3", fontFamily:"'Inter', system-ui, sans-serif", paddingBottom: 60 }}>
 <div style={{ background:"#161B22", borderBottom:"1px solid #21262D", padding:"14px 16px", position:"sticky", top: 0, zIndex: 100 }}>
 <div style={{ maxWidth: 1100, margin:"0 auto"}}>
 <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom: 10 }}>
 <div style={{ display:"flex", alignItems:"center", gap: 10 }}>
 <img src="/images/logo.svg" alt="Amazon Profit Pro" style={{ width: 32, height: 32 }} />
<span style={{ fontSize: 12, color: "var(--text-secondary)", marginLeft: 10 }}>v6.0.0</span>
{/* Burger Menu Button */}
<button
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  style={{
    display: 'none',
    background: 'none',
    border: 'none',
    color: 'var(--text-primary)',
    fontSize: 28,
    cursor: 'pointer',
    padding: '4px 8px',
    marginLeft: 'auto'
  }}
  aria-label="Menu"
>
  {mobileMenuOpen ? '✕' : '☰'}
</button>

  {/* Menu Mobile Déroulant */}
  {mobileMenuOpen && (
    <div style={{
      display: 'none',
      position: 'fixed',
      top: 70,
      left: 10,
      right: 10,
      background: 'var(--bg-secondary)',
      borderRadius: 12,
      padding: 15,
      boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
      zIndex: 1000,
      maxHeight: '70vh',
      overflowY: 'auto'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }} style={{ padding: 12, background: 'var(--bg-tertiary)', border: 'none', borderRadius: 8, color: 'var(--text-primary)', textAlign: 'left', cursor: 'pointer' }}>📊 Dashboard</button>
        <button onClick={() => { setActiveTab('analytics'); setMobileMenuOpen(false); }} style={{ padding: 12, background: 'var(--bg-tertiary)', border: 'none', borderRadius: 8, color: 'var(--text-primary)', textAlign: 'left', cursor: 'pointer' }}>📈 Analytics</button>
        <button onClick={() => { setActiveTab('tradeai'); setMobileMenuOpen(false); }} style={{ padding: 12, background: 'var(--bg-tertiary)', border: 'none', borderRadius: 8, color: 'var(--text-primary)', textAlign: 'left', cursor: 'pointer' }}>🤖 TradeAI</button>
        <button onClick={() => { setActiveTab('stocks'); setMobileMenuOpen(false); }} style={{ padding: 12, background: 'var(--bg-tertiary)', border: 'none', borderRadius: 8, color: 'var(--text-primary)', textAlign: 'left', cursor: 'pointer' }}>📦 Stocks</button>
        <button onClick={() => { setActiveTab('concurrents'); setMobileMenuOpen(false); }} style={{ padding: 12, background: 'var(--bg-tertiary)', border: 'none', borderRadius: 8, color: 'var(--text-primary)', textAlign: 'left', cursor: 'pointer' }}>🎯 Concurrents</button>
        <button onClick={() => { setActiveTab('about'); setMobileMenuOpen(false); }} style={{ padding: 12, background: 'var(--bg-tertiary)', border: 'none', borderRadius: 8, color: 'var(--text-primary)', textAlign: 'left', cursor: 'pointer' }}>️ À propos</button>
        <button onClick={() => { setActiveTab('ideas'); setMobileMenuOpen(false); }} style={{ padding: 12, background: 'var(--bg-tertiary)', border: 'none', borderRadius: 8, color: 'var(--text-primary)', textAlign: 'left', cursor: 'pointer' }}>💡 Idées</button>
        <button onClick={() => { setActiveTab('calcul'); setMobileMenuOpen(false); }} style={{ padding: 12, background: 'var(--bg-tertiary)', border: 'none', borderRadius: 8, color: 'var(--text-primary)', textAlign: 'left', cursor: 'pointer' }}>🧮 Calcul</button>
        <button onClick={() => { setActiveTab('cogs'); setMobileMenuOpen(false); }} style={{ padding: 12, background: 'var(--bg-tertiary)', border: 'none', borderRadius: 8, color: 'var(--text-primary)', textAlign: 'left', cursor: 'pointer' }}> COGS</button>
        <button onClick={() => { setActiveTab('pricing'); setMobileMenuOpen(false); }} style={{ padding: 12, background: 'var(--bg-tertiary)', border: 'none', borderRadius: 8, color: 'var(--text-prim))ary)', textAlign: 'left', cursor: 'pointer' }}>💵 Pricing</button>
        <button onClick={() => { setActiveTab('portfolio'); setMobileMenuOpen(false); }} style={{ padding: 12, background: 'var(--bg-tertiary)', border: 'none', borderRadius: 8, color: 'var(--text-primary)', textAlign: 'left', cursor: 'pointer' }}>📊 Portfolio</button>
        <button onClick={() => { setActiveTab('historique'); setMobileMenuOpen(false); }} style={{ padding: 12, background: 'var(--bg-tertiary)', border: 'none', borderRadius: 8, color: 'var(--text-primary)', textAlign: 'left', cursor: 'pointer' }}>🕐 Historique</button>
        <button onClick={() => { setActiveTab('abonnements'); setMobileMenuOpen(false); }} style={{ padding: 12, background: 'var(--bg-tertiary)', border: 'none', borderRadius: 8, color: 'var(--text-primary)', textAlign: 'left', cursor: 'pointer' }}>💎 Abonnements</button>
        <button onClick={() => { setActiveTab('formations'); setMobileMenuOpen(false); }} style={{ padding: 12, background: 'var(--bg-tertiary)', border: 'none', borderRadius: 8, color: 'var(--text-primary)', textAlign: 'left', cursor: 'pointer' }}>🎓 Formations</button>
      </div>
    </div>
  )}


<ThemeToggle />

 <div>
 <div style={{ fontSize: 16, fontWeight: 800 }}>Amazon Profit <span style={{ color:"#FF9900"}}>Pro</span></div>
 <div style={{ fontSize: 10, color:"#00C853"}}>
 {saveStatus ==="saving"&&"· enregistrement…"}
 {saveStatus ==="saved"&&"· ✓ enregistré"}
 </div>
 </div>
 </div>
 </div>
 <div style={{ display:"flex", gap: 4, overflowX:"auto", paddingBottom: 2 }}>
 {TABS.map(t => (
 <button key={t} onClick={() => setTab(t)} tabIndex={0} aria-label={TAB_LABELS[t]} style={{
 padding:"6px 12px", borderRadius: 20, border:"none", cursor:"pointer", fontSize: 11, fontWeight: 600,
 background: tab === t ?"#FF9900":"#21262D", color: tab === t ?"#0D1117":"#8B949E", transition:"all 0.2s",
 }}>{TAB_LABELS[t]}</button>
 ))}
 </div>
 </div>
 </div>

 <div style={{ maxWidth: 1100, margin:"0 auto", padding:"20px 14px 0"}}>
 <div style={{ display:"flex", gap: 6, marginBottom: 16, flexWrap:"wrap"}}>
 {products.map((prod, idx) => (
 <button key={idx} onClick={() => setActiveProduct(idx)} tabIndex={0} aria-label={`Produit ${prod.name}`} style={{
 padding:"6px 12px", borderRadius: 20, border:`1px solid ${activeProduct === idx ?"#FF9900":"#30363D"}`,
 background: activeProduct === idx ?"#FF990020":"#161B22",
 color: activeProduct === idx ?"#FF9900":"#8B949E",
 fontSize: 11, cursor:"pointer", fontWeight: 600,
 }}>
 {prod.name}
 </button>
 ))}
 <button onClick={addProduct} tabIndex={0} aria-label="Ajouter un produit"style={{ padding:"6px 12px", borderRadius: 20, border:"1px dashed #30363D", background:"transparent", color:"#8B949E", fontSize: 11, cursor:"pointer"}}>
 + Ajouter
 </button>
 {products.length > 1 && <button onClick={() => removeProduct(activeProduct)} tabIndex={0} style={{ padding:"6px 10px", borderRadius: 20, border:"1px solid #FF3D0033", background:"#FF3D0010", color:"#FF3D00", fontSize: 11, cursor:"pointer"}}>✕</button>}
 </div>

 {tab === "dashboard" && <DashboardPanel />}
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
        {tab === "historique" && <HistoriquePanel />}
            {tab === "abonnements" && <Pricing />}
            {tab === "formations" && <FormationsShop />}
 </div>
 </div>
 
      {showTutorial && <Tutorial onClose={closeTutorial} />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
 
      {/* Bouton Assistant IA flottant */}
      <button
        onClick={() => setChatOpen(true)}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #FF9900 0%, #FFB800 100%)',
          border: 'none',
          boxShadow: '0 4px 16px rgba(255,153,0,0.4)',
          cursor: 'pointer',
          fontSize: 28,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        aria-label="Ouvrir l'assistant IA"
      >
        🤖
      </button>
      
      {chatOpen && <ChatAssistant 
        isOpen={chatOpen} 
        onClose={() => setChatOpen(false)}
        products={products}
        activeProduct={activeProduct}
        calcP={calcP}
        p={p}
        mk={mk}
      />}

    </AppContext.Provider>
      </ThemeProvider>
 );
}

// Test auto-deploy Wed Jul  1 08:34:12 AST 2026
