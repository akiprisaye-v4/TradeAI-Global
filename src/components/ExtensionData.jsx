import React from 'react';
export default function ExtensionData() {
  return (
    <div style={{ padding: 20, maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🚀</div>
      <h1 style={{ fontSize: 28, marginBottom: 12 }}>Chrome Extension</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
        Installez l'extension pour analyser les produits Amazon en temps réel
      </p>
      <div style={{ background: 'var(--bg-secondary)', borderRadius: 12, padding: 24, textAlign: 'left' }}>
        <h3 style={{ marginBottom: 12 }}>📥 Installation</h3>
        <ol style={{ paddingLeft: 20, lineHeight: 2 }}>
          <li>Téléchargez chrome-extension.zip</li>
          <li>Décompressez le fichier</li>
          <li>Allez sur chrome://extensions/</li>
          <li>Activez le Mode développeur</li>
          <li>Cliquez "Charger l'extension non empaquetée"</li>
          <li>Sélectionnez le dossier</li>
        </ol>
      </div>
    </div>
  );
}
