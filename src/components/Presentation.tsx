import React from 'react';
import { motion } from 'framer-motion';
const Presentation: React.FC = () => (
  <div className="presentation">
    <motion.section className="pres-hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <span className="pres-badge">SaaS Intelligence Suite</span>
      <h1>Pilotez vos produits <span className="a">comme un pro</span></h1>
      <p className="muted">Un seul outil pour calculer la rentabilité, comparer les fournisseurs Alibaba, détecter les tendances, estimer le fret DOM-TOM et obtenir un score IA.</p>
      <div className="pres-cta">
        <span className="pill">Helium10-like</span>
        <span className="pill">JungleScout-like</span>
        <span className="pill">Alibaba Sourcing</span>
        <span className="pill">PWA-ready</span>
      </div>
    </motion.section>
    <section className="pres-section">
      <h2>Pour qui</h2>
      <div className="pres-grid">
        <div className="pres-card"><span style={{ fontSize: 28 }}>🌱</span><h3>Vous démarrez</h3><p className="muted">Trouvez votre premier produit avec le Product Hunter et le calcul de rentabilité instantané.</p></div>
        <div className="pres-card"><span style={{ fontSize: 28 }}>📈</span><h3>Vous gérez un catalogue</h3><p className="muted">Comparez vos références, suivez l'historique et optimisez vos prix.</p></div>
        <div className="pres-card"><span style={{ fontSize: 28 }}>🌍</span><h3>Vous visez l'international</h3><p className="muted">FR, DE, UK, US, IT, ES : chaque marketplace avec sa TVA et sa commission.</p></div>
      </div>
    </section>
    <section className="pres-section">
      <h2>Pourquoi TradeAI ?</h2>
      <div className="pres-why">
        <div className="pres-why-item"><div><strong>Le problème</strong><p className="muted">Une marge qui paraît bonne fond une fois tous les frais réels appliqués.</p></div><div className="pres-sol">Chaque calcul décompose commission, frais FBA, retours, douane et publicité.</div></div>
        <div className="pres-why-item"><div><strong>Le problème</strong><p className="muted">La trésorerie immobilisée n'apparaît jamais dans un calcul classique.</p></div><div className="pres-sol">Le cash-flow simule 12 mois et indique le mois du remboursement.</div></div>
        <div className="pres-why-item"><div><strong>Le problème</strong><p className="muted">Choisir un prix à l'instinct sans savoir ce qui reste après pub.</p></div><div className="pres-sol">Le module PPC calcule le CPC maximum sans perdre d'argent.</div></div>
      </div>
    </section>
    <section className="pres-section">
      <h2>Comment ça marche</h2>
      <div className="pres-flow">
        <div className="pres-step"><div className="pres-num">01</div><div><h4>Repérer un produit</h4><p className="muted">Product Hunter + Idées IA par marketplace.</p></div></div>
        <div className="pres-step"><div className="pres-num">02</div><div><h4>Chiffrer la marge</h4><p className="muted">Dashboard avec coût rendu DOM-TOM, taxes, fret.</p></div></div>
        <div className="pres-step"><div className="pres-num">03</div><div><h4>Vérifier le prix</h4><p className="muted">Pricing stratégique avec analyse concurrentielle.</p></div></div>
        <div className="pres-step"><div className="pres-num">04</div><div><h4>Lancer la pub</h4><p className="muted">PPC Calculator pour ne jamais dépasser l'ACoS break-even.</p></div></div>
      </div>
    </section>
  </div>
);
export default Presentation;