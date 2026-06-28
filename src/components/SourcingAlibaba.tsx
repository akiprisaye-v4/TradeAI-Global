import React, { useState } from 'react';
import { products } from '../data/products';
import { motion } from 'framer-motion';
const SourcingAlibaba: React.FC = () => {
  const [p, setP] = useState(products[0].name);
  const [img, setImg] = useState('');
  const [load, setLoad] = useState(false);
  const link = `https://www.alibaba.com/trade/search?SearchText=${encodeURIComponent(p)}&assessmentCompany=ATC`;
  const scan = () => { if (!img) return alert("Colle l'URL d'une image Amazon"); setLoad(true); setTimeout(() => { setLoad(false); alert("En production : recherche visuelle Alibaba"); }, 1200); };
  return (
    <div className="sourcing-alibaba">
      <h2>🏭 Sourcing Intelligent</h2>
      <p className="subtitle">Alibaba Trade Assurance + recherche image</p>
      <div className="dashboard-form">
        <label>Produit à sourcer</label>
        <input value={p} onChange={e => setP(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(15,23,42,0.6)', color: '#f1f5f9' }} />
        <motion.a href={link} target="_blank" rel="noopener noreferrer" className="btn-expand" whileTap={{ scale: 0.98 }} style={{ display: 'block', textAlign: 'center', marginTop: 12, textDecoration: 'none' }}>🔍 Recherche texte Alibaba</motion.a>
        <div style={{ marginTop: 16, padding: 16, background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)' }}>
          <label>Recherche par image (URL Amazon)</label>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <input placeholder="https://m.media-amazon.com/..." value={img} onChange={e => setImg(e.target.value)} style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(15,23,42,0.6)', color: '#f1f5f9' }} />
            <button onClick={scan} disabled={load} style={{ padding: '10px 16px', background: 'linear-gradient(135deg,#FF9900,#FFB800)', border: 'none', borderRadius: 8, color: '#0f172a', fontWeight: 700, cursor: 'pointer' }}>{load ? '...' : 'Scanner'}</button>
          </div>
        </div>
        <div className="notice gn" style={{ marginTop: 16 }}>
          <b>💡 Astuce sourcing</b><br/>
          Vérifie toujours : Trade Assurance, MOQ, délai d'échantillon, et demande un certificat de conformité pour l'Europe.
        </div>
      </div>
    </div>
  );
};
export default SourcingAlibaba;