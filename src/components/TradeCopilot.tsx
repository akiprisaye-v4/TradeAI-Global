import React, { useState, useCallback } from 'react';
import { products } from '../data/products';
import { territories } from '../data/territories';
import { calculateLandedCost, compareTerritories, getBestProducts, formatCurrency } from '../utils/calculations';
import { CalculatedCost } from '../types';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const TradeCopilot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Bonjour ! Je suis Trade Copilot. Je peux :\n• Recommander les meilleurs produits par marge\n• Calculer le coût rendu exact pour un territoire\n• Comparer la rentabilité entre territoires\n• Analyser les tendances par catégorie\n\nQue souhaites-tu explorer ?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const analyzeQuery = useCallback((query: string): Message => {
    const lower = query.toLowerCase();

    if (lower.includes('meilleur') || lower.includes('marge') || lower.includes('recommand')) {
      const best = getBestProducts(products, 60, 5);
      const list = best.map((p, i) => `${i + 1}. **${p.name}** (${p.category}) — Marge: ${p.margin}%, Profit: ${formatCurrency(p.profit)}`).join('\n');
      return { role: 'assistant', content: `🎯 Top 5 produits par marge :\n${list}` };
    }

    if (lower.includes('compar') || lower.includes('territoire') || lower.includes('guadeloupe') || lower.includes('martinique')) {
      const target = products.find(p => lower.includes(p.name.toLowerCase())) || products[0];
      const comparison = compareTerritories(target);
      const table = comparison.map((c: CalculatedCost) => `• ${c.territory?.name || 'N/A'} : Profit ${formatCurrency(c.profit)} | Marge ${c.margin.toFixed(1)}%`).join('\n');
      return { role: 'assistant', content: `📍 Comparaison pour "${target.name}"\n${table}\n🏆 Meilleure opportunité : ${comparison[0]?.territory?.name || 'N/A'}` };
    }

    if (lower.includes('coût') || lower.includes('rendu') || lower.includes('calcul')) {
      const territory = territories.find(t => lower.includes(t.name.toLowerCase())) || territories[0];
      const product = products.find(p => lower.includes(p.name.toLowerCase())) || products[0];
      const calc = calculateLandedCost(product, territory);
      return { role: 'assistant', content: `🧮 ${product.name} → ${territory.name}\n• Coût rendu total : ${formatCurrency(calc.landedCost)}\n• Profit estimé : ${formatCurrency(calc.profit)} (${calc.margin.toFixed(1)}% marge)` };
    }

    if (lower.includes('tendance') || lower.includes('catégorie')) {
      const cats = [...new Set(products.map(p => p.category))];
      const analysis = cats.map(cat => {
        const catProducts = products.filter(p => p.category === cat);
        const avgGrowth = (catProducts.reduce((s, p) => s + p.growth, 0) / catProducts.length).toFixed(1);
        return { cat, avgGrowth };
      }).sort((a, b) => parseFloat(b.avgGrowth) - parseFloat(a.avgGrowth));
      const list = analysis.map((a, i) => `${i + 1}. ${a.cat} — Croissance moyenne: +${a.avgGrowth}%`).join('\n');
      return { role: 'assistant', content: `📈 Tendances par catégorie\n${list}` };
    }

    const foundProduct = products.find(p => lower.includes(p.name.toLowerCase()));
    if (foundProduct) {
      const bestT = compareTerritories(foundProduct)[0];
      return { role: 'assistant', content: `🔍 ${foundProduct.name}\nMarge: ${foundProduct.margin}% | Croissance: +${foundProduct.growth}%\n🌍 Meilleur territoire : ${bestT?.territory?.name || 'N/A'} | Profit: ${formatCurrency(bestT.profit)}` };
    }

    return { role: 'assistant', content: 'Essaye : "Meilleurs produits", "Coût rendu en Guadeloupe", "Tendances par catégorie"' };
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setLoading(true);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, analyzeQuery(input)]);
      setLoading(false);
    }, 800);
  }, [input, loading, analyzeQuery]);

  return (
    <div className="trade-copilot">
      <div className="copilot-header">
        <h2>🤖 Trade Copilot</h2>
        <span className="badge">IA temps réel</span>
      </div>
      <div className="messages-container">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            <div className="message-bubble" dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }} />
          </div>
        ))}
        {loading && (
          <div className="message assistant">
            <div className="message-bubble loading">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="copilot-input">
        <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Ex: Meilleurs produits..." disabled={loading} />
        <button type="submit" disabled={loading || !input.trim()}>
          {loading ? '⏳' : '➤'}
        </button>
      </form>
    </div>
  );
};

export default TradeCopilot;
