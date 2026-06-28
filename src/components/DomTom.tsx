import React from 'react';
import { territories } from '../data/territories';
import { formatPercent } from '../utils/calculations';

const flags: Record<string, string> = {
  gp: '🇬🇵', mq: '🇲🇶', gf: '🇬🇫', re: '🇷🇪', yt: '🇾🇹',
  bl: '🇧🇱', mf: '🇲🇫', pm: '🇵🇲', nc: '🇳🇨', pf: '🇵🇫', wf: '🇼🇫',
};

const DomTom: React.FC = () => {
  return (
    <div className="domtom">
      <h2>🌴 Taxes DOM-TOM</h2>
      <p className="subtitle">Calculs précis avec Octroi de Mer, Taxe Régionale et TVA pour chaque territoire.</p>
      <div className="territories-grid">
        {territories.map(t => {
          const totalTaxRate = t.octroiDeMer + t.taxeRegionale + t.tva;
          return (
            <div key={t.id} className="territory-card">
              <div className="territory-header">
                <span className="flag">{flags[t.id] || '🏝️'}</span>
                <div>
                  <h3>{t.name}</h3>
                  <span className="code">{t.code} — {t.currency}</span>
                </div>
              </div>
              <div className="taxes-list">
                <div className="tax-row">
                  <span>Octroi de Mer</span>
                  <strong>{t.octroiDeMer > 0 ? formatPercent(t.octroiDeMer) : 'Exempt'}</strong>
                </div>
                <div className="tax-row">
                  <span>Taxe Régionale</span>
                  <strong>{t.taxeRegionale > 0 ? formatPercent(t.taxeRegionale) : 'Exempt'}</strong>
                </div>
                <div className="tax-row">
                  <span>TVA</span>
                  <strong>{t.tva > 0 ? formatPercent(t.tva) : 'Exempt'}</strong>
                </div>
                <div className="tax-row total">
                  <span>Total taxes</span>
                  <strong>{totalTaxRate > 0 ? formatPercent(totalTaxRate) : '0%'}</strong>
                </div>
                <div className="tax-row">
                  <span>Multiplicateur shipping</span>
                  <strong>×{t.shippingMultiplier}</strong>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DomTom;
