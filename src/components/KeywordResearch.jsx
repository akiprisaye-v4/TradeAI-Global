import React, { useState } from "react";

export default function KeywordResearch() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);

  const search = () => {
    if (!query.trim()) return;
    setSearched(true);
  };

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>🔍 Keyword Research</h1>

      <div style={{
        background: "var(--bg-secondary)",
        border: "1px solid var(--border-color)",
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        color: "var(--text-secondary)",
        lineHeight: 1.6
      }}>
        <strong style={{ color: "#FF9900" }}>Statut des données : aucune API mots-clés connectée.</strong>
        <div>
          Ce module n’affiche plus de volumes, CPC ou difficultés inventés. La recherche prépare le mot-clé pour un futur import CSV ou une source gratuite vérifiable.
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === "Enter" && search()}
          placeholder="Entrez un mot-clé..."
          style={{
            flex: 1,
            minWidth: 220,
            padding: 14,
            background: "var(--bg-tertiary)",
            border: "1px solid var(--border-color)",
            borderRadius: 8,
            color: "var(--text-primary)"
          }}
        />
        <button
          onClick={search}
          style={{
            padding: "14px 28px",
            background: "linear-gradient(135deg, #FF9900, #FFB800)",
            border: "none",
            borderRadius: 8,
            color: "#0D1117",
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          Préparer
        </button>
      </div>

      {searched && (
        <div style={{ background: "var(--bg-secondary)", borderRadius: 12, padding: 20 }}>
          <h2 style={{ marginBottom: 16 }}>📊 Mot-clé préparé</h2>
          <div style={{
            padding: 14,
            background: "var(--bg-tertiary)",
            borderRadius: 8,
            border: "1px solid var(--border-color)"
          }}>
            <div style={{ color: "var(--text-primary)", fontWeight: 700, marginBottom: 8 }}>
              {query.trim()}
            </div>
            <div style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Aucun volume, CPC ou score de difficulté n’est affiché sans source vérifiable.
              Prochaine étape : connecter un import CSV ou un connecteur open data compatible.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
