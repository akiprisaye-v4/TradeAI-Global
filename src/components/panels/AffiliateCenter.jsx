import React, { useState } from "react";
import { buildAmazonAffiliateLink, getAmazonAffiliateTag, setAmazonAffiliateTag } from "../../affiliate/amazonAffiliate";
import { DashboardCard, Button, PanelLayout } from "../ui";

export default function AffiliateCenter() {
  const [tag, setTag] = useState(getAmazonAffiliateTag());
  const [keyword, setKeyword] = useState("coque iphone 17");
  const [marketplace, setMarketplace] = useState("FR");

  const link = buildAmazonAffiliateLink({ marketplace, keyword });

  function save() {
    setAmazonAffiliateTag(tag);
    window.dispatchEvent(new CustomEvent('tradeai:notify', { detail: { type: 'success', message: 'ID affilié Amazon sauvegardé.' } }));
  }

  return (
    <PanelLayout>
      <DashboardCard
        title="🤝 Centre Affiliation Amazon"
        subtitle="Générez des liens affiliés Amazon gratuits avec votre Tracking ID partenaire."
      >
        <div style={{ display: "grid", gap: 12 }}>
          <label>ID Partenaire Amazon</label>
          <input value={tag} onChange={e => setTag(e.target.value)} placeholder="ex: monsite-21" />

          <label>Marketplace</label>
          <select value={marketplace} onChange={e => setMarketplace(e.target.value)}>
            <option value="FR">Amazon.fr</option>
            <option value="DE">Amazon.de</option>
            <option value="IT">Amazon.it</option>
            <option value="ES">Amazon.es</option>
            <option value="UK">Amazon.co.uk</option>
            <option value="US">Amazon.com</option>
            <option value="CA">Amazon.ca</option>
            <option value="JP">Amazon.co.jp</option>
          </select>

          <label>Mot-clé produit</label>
          <input value={keyword} onChange={e => setKeyword(e.target.value)} />

          <Button onClick={save}>Sauvegarder mon ID affilié</Button>

          <a href={link} target="_blank" rel="noopener noreferrer">
            Ouvrir le lien affilié Amazon
          </a>
        </div>
      </DashboardCard>
    </PanelLayout>
  );
}
