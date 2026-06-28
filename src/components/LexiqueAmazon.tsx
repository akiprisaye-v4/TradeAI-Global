import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const terms = [
  { group: 'Logistique', items: [{ term: 'FBA', def: 'Fulfillment by Amazon. Amazon stocke, emballe et expédie.' }, { term: 'FBM', def: 'Fulfillment by Merchant. Vous gérez le stockage et expédition.' }, { term: 'EFN', def: 'European Fulfillment Network. Expédition Europe depuis un seul entrepôt.' }, { term: 'Poids volumétrique', def: 'L×l×h ÷ 5000. Si > poids réel, il sert au calcul des frais.' }, { term: 'Stockage longue durée', def: 'Frais si produit > 6 mois en entrepôt Amazon.' }] },
  { group: 'Financier', items: [{ term: 'Marge nette', def: "Ce qui reste du prix HT une fois tous les coûts déduits." }, { term: 'ROI', def: 'Return on Investment. Profit rapporté au coût achat.' }, { term: 'Seuil de rentabilité', def: 'Prix minimum en dessous duquel le produit est déficitaire.' }, { term: 'COGS', def: 'Cost of Goods Sold. Coût de revient complet avant marge.' }, { term: 'Cash-flow', def: 'Flux réel de trésorerie dans le temps.' }] },
  { group: 'Publicité', items: [{ term: 'PPC', def: 'Pay-Per-Click. Publicité facturée au clic.' }, { term: 'ACoS', def: 'Advertising Cost of Sales. Dépense pub / CA pub.' }, { term: 'TACoS', def: 'Total ACoS. Dépense pub / CA total.' }, { term: 'ROAS', def: 'Return on Ad Spend. CA pub / dépense pub.' }, { term: 'CPC', def: 'Cost Per Click. Prix payé par clic.' }] },
  { group: 'Sourcing', items: [{ term: 'MOQ', def: 'Minimum Order Quantity. Quantité minimale fournisseur.' }, { term: 'QC', def: 'Quality Control. Inspection échantillon avant expédition.' }, { term: 'Buy Box', def: "Emplacement principal d'achat sur la fiche produit." }, { term: 'BSR', def: 'Best Seller Rank. Classement des ventes par catégorie.' }] },
];
const LexiqueAmazon: React.FC = () => {
  const [q, setQ] = useState('');
  const filtered = terms.map(g => ({ ...g, items: g.items.filter(i => i.term.toLowerCase().includes(q.toLowerCase()) || i.def.toLowerCase().includes(q.toLowerCase())) })).filter(g => g.items.length > 0);
  return (
    <div className="lexique-amazon">
      <h2>📚 Lexique Amazon FBA</h2>
      <p className="subtitle">Le jargon du vendeur Amazon expliqué</p>
      <input className="filter-search" placeholder="🔍 Rechercher un terme..." value={q} onChange={e => setQ(e.target.value)} style={{ marginBottom: 24, maxWidth: 400 }} />
      <AnimatePresence>
        {filtered.map(g => (
          <motion.div key={g.group} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 13, color: '#FF9900', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 8 }}>{g.group}</h3>
            {g.items.map(item => (
              <div key={item.term} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 16, padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', alignItems: 'baseline' }}>
                <dt style={{ fontWeight: 700, fontSize: 14, color: '#f1f5f9' }}>{item.term}</dt>
                <dd style={{ fontSize: 13, color: '#94a3b8', margin: 0 }}>{item.def}</dd>
              </div>
            ))}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
export default LexiqueAmazon;