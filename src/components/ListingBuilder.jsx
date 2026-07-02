import React, { useState, useEffect } from 'react';

const ListingBuilder = () => {
  const [listing, setListing] = useState({
    title: '',
    bullets: ['', '', '', '', ''],
    description: '',
    keywords: '',
    category: '',
    brand: '',
    features: []
  });

  const [analysis, setAnalysis] = useState({
    score: 0,
    titleScore: 0,
    bulletsScore: 0,
    keywordsScore: 0,
    suggestions: [],
    warnings: [],
    strengths: []
  });

  const [activeTab, setActiveTab] = useState('builder');

  // Amazon guidelines
  const guidelines = {
    title: {
      maxLength: 200,
      optimalLength: 80,
      required: ['brand', 'keyFeature', 'productType'],
      forbidden: ['!!!', '***', 'FREE', 'BEST']
    },
    bullets: {
      maxLength: 500,
      optimalLength: 150,
      count: 5
    },
    keywords: {
      maxBytes: 250,
      separator: ' '
    }
  };

  // Analyze listing quality
  useEffect(() => {
    analyzeListing();
  }, [listing]);

  const analyzeListing = () => {
    const newAnalysis = {
      score: 0,
      titleScore: 0,
      bulletsScore: 0,
      keywordsScore: 0,
      suggestions: [],
      warnings: [],
      strengths: []
    };

    // Title analysis
    const titleLength = listing.title.length;
    if (titleLength === 0) {
      newAnalysis.warnings.push("Titre vide - Ajoutez un titre descriptif");
    } else {
      if (titleLength >= guidelines.title.optimalLength && titleLength <= guidelines.title.maxLength) {
        newAnalysis.titleScore = 100;
        newAnalysis.strengths.push("Longueur de titre optimale");
      } else if (titleLength < guidelines.title.optimalLength) {
        newAnalysis.titleScore = 60;
        newAnalysis.suggestions.push(`Ajoutez ${guidelines.title.optimalLength - titleLength} caractères pour optimiser le titre`);
      } else {
        newAnalysis.titleScore = 70;
        newAnalysis.warnings.push(`Titre trop long (${titleLength}/${guidelines.title.maxLength})`);
      }

      // Check for keywords in title
      if (listing.title.toLowerCase().includes(listing.brand?.toLowerCase())) {
        newAnalysis.strengths.push("Marque présente dans le titre");
        newAnalysis.titleScore += 10;
      }
    }

    // Bullets analysis
    const filledBullets = listing.bullets.filter(b => b.trim().length > 0);
    const bulletsCount = filledBullets.length;
    
    if (bulletsCount === 0) {
      newAnalysis.warnings.push("Aucun bullet point - Ajoutez au moins 5 points clés");
    } else {
      newAnalysis.bulletsScore = Math.min(100, (bulletsCount / 5) * 100);
      
      if (bulletsCount < 5) {
        newAnalysis.suggestions.push(`Ajoutez ${5 - bulletsCount} bullet point(s) supplémentaire(s)`);
      } else {
        newAnalysis.strengths.push("5 bullet points complets");
      }

      // Check bullet length
      filledBullets.forEach((bullet, idx) => {
        if (bullet.length > guidelines.bullets.maxLength) {
          newAnalysis.warnings.push(`Bullet ${idx + 1} trop long (${bullet.length} caractères)`);
        } else if (bullet.length < 50) {
          newAnalysis.suggestions.push(`Bullet ${idx + 1} trop court - développez le contenu`);
        }
      });
    }

    // Keywords analysis
    const keywordsBytes = new Blob([listing.keywords]).size;
    if (keywordsBytes === 0) {
      newAnalysis.warnings.push("Mots-clés backend vides");
    } else {
      newAnalysis.keywordsScore = Math.min(100, (keywordsBytes / guidelines.keywords.maxBytes) * 100);
      
      if (keywordsBytes > guidelines.keywords.maxBytes) {
        newAnalysis.warnings.push(`Mots-clés backend trop longs (${keywordsBytes}/${guidelines.keywords.maxBytes} bytes)`);
      } else {
        newAnalysis.strengths.push("Mots-clés backend optimisés");
      }

      // Check for duplicates
      const keywordsList = listing.keywords.toLowerCase().split(/\s+/);
      const uniqueKeywords = new Set(keywordsList);
      if (keywordsList.length !== uniqueKeywords.size) {
        newAnalysis.suggestions.push("Évitez les doublons dans les mots-clés");
      }
    }

    // Calculate overall score
    newAnalysis.score = Math.round(
      (newAnalysis.titleScore * 0.3) +
      (newAnalysis.bulletsScore * 0.4) +
      (newAnalysis.keywordsScore * 0.3)
    );

    setAnalysis(newAnalysis);
  };

  const updateListing = (field, value) => {
    setListing(prev => ({ ...prev, [field]: value }));
  };

  const updateBullet = (index, value) => {
    const newBullets = [...listing.bullets];
    newBullets[index] = value;
    setListing(prev => ({ ...prev, bullets: newBullets }));
  };

  const generateOptimizedTitle = () => {
    const template = `${listing.brand || '[Marque]'} - ${listing.title || '[Produit]'} | Caractéristiques Principales | Couleur/Taille`;
    updateListing('title', template);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#00C853';
    if (score >= 60) return '#FF9900';
    return '#FF3D00';
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Très bien';
    if (score >= 60) return 'Bien';
    if (score >= 40) return 'Moyen';
    return 'À améliorer';
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>📝 Listing Builder</h1>
        <p style={styles.subtitle}>Créez des listings Amazon optimisés pour le ranking</p>
      </div>

      {/* Score Overview */}
      <div style={styles.scoreCard}>
        <div style={styles.scoreCircle}>
          <div style={{
            ...styles.scoreValue,
            color: getScoreColor(analysis.score)
          }}>
            {analysis.score}
          </div>
          <div style={styles.scoreLabel}>{getScoreLabel(analysis.score)}/100</div>
        </div>
        <div style={styles.scoreDetails}>
          <div style={styles.scoreItem}>
            <span>Titre</span>
            <span style={{ color: getScoreColor(analysis.titleScore) }}>{analysis.titleScore}/100</span>
          </div>
          <div style={styles.scoreItem}>
            <span>Bullets</span>
            <span style={{ color: getScoreColor(analysis.bulletsScore) }}>{analysis.bulletsScore}/100</span>
          </div>
          <div style={styles.scoreItem}>
            <span>Mots-clés</span>
            <span style={{ color: getScoreColor(analysis.keywordsScore) }}>{analysis.keywordsScore}/100</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        <button
          onClick={() => setActiveTab('builder')}
          style={{
            ...styles.tab,
            background: activeTab === 'builder' ? 'var(--accent)' : 'transparent',
            color: activeTab === 'builder' ? '#0D1117' : 'var(--text-primary)'
          }}
        >
          ✏️ Éditeur
        </button>
        <button
          onClick={() => setActiveTab('analysis')}
          style={{
            ...styles.tab,
            background: activeTab === 'analysis' ? 'var(--accent)' : 'transparent',
            color: activeTab === 'analysis' ? '#0D1117' : 'var(--text-primary)'
          }}
        >
          📊 Analyse
        </button>
        <button
          onClick={() => setActiveTab('guidelines')}
          style={{
            ...styles.tab,
            background: activeTab === 'guidelines' ? 'var(--accent)' : 'transparent',
            color: activeTab === 'guidelines' ? '#0D1117' : 'var(--text-primary)'
          }}
        >
          📋 Guidelines
        </button>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {activeTab === 'builder' && (
          <div style={styles.builder}>
            {/* Title */}
            <div style={styles.section}>
              <div style={styles.sectionHeader}>
                <label style={styles.label}>Titre du produit *</label>
                <button onClick={generateOptimizedTitle} style={styles.generateBtn}>
                  ✨ Générer template
                </button>
              </div>
              <input
                type="text"
                value={listing.title}
                onChange={(e) => updateListing('title', e.target.value)}
                placeholder="Ex: Nike Air Max 270 - Chaussures de Sport Homme - Respirantes et Confortables - Noir/Blanc"
                style={styles.input}
                maxLength={200}
              />
              <div style={styles.charCount}>
                {listing.title.length} / 200 caractères
              </div>
            </div>

            {/* Brand & Category */}
            <div style={styles.row}>
              <div style={styles.half}>
                <label style={styles.label}>Marque</label>
                <input
                  type="text"
                  value={listing.brand}
                  onChange={(e) => updateListing('brand', e.target.value)}
                  placeholder="Votre marque"
                  style={styles.input}
                />
              </div>
              <div style={styles.half}>
                <label style={styles.label}>Catégorie</label>
                <select
                  value={listing.category}
                  onChange={(e) => updateListing('category', e.target.value)}
                  style={styles.input}
                >
                  <option value="">Sélectionner...</option>
                  <option value="sports">Sports et Plein Air</option>
                  <option value="maison">Maison et Cuisine</option>
                  <option value="high-tech">High-Tech</option>
                  <option value="beaute">Beauté et Parfum</option>
                  <option value="jouets">Jouets et Jeux</option>
                  <option value="vetements">Vêtements</option>
                </select>
              </div>
            </div>

            {/* Bullet Points */}
            <div style={styles.section}>
              <label style={styles.label}>Bullet Points (5 recommandés) *</label>
              {listing.bullets.map((bullet, idx) => (
                <div key={idx} style={styles.bulletItem}>
                  <textarea
                    value={bullet}
                    onChange={(e) => updateBullet(idx, e.target.value)}
                    placeholder={`Point clé ${idx + 1} (max 500 caractères)`}
                    style={styles.textarea}
                    rows={2}
                    maxLength={500}
                  />
                  <div style={styles.charCount}>
                    {bullet.length} / 500
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div style={styles.section}>
              <label style={styles.label}>Description du produit</label>
              <textarea
                value={listing.description}
                onChange={(e) => updateListing('description', e.target.value)}
                placeholder="Décrivez votre produit en détail..."
                style={styles.textarea}
                rows={6}
              />
            </div>

            {/* Backend Keywords */}
            <div style={styles.section}>
              <label style={styles.label}>Mots-clés backend (Search Terms)</label>
              <textarea
                value={listing.keywords}
                onChange={(e) => updateListing('keywords', e.target.value)}
                placeholder="mots-clés séparés par des espaces (pas de virgules)"
                style={styles.textarea}
                rows={3}
              />
              <div style={styles.charCount}>
                {new Blob([listing.keywords]).size} / 250 bytes
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div style={styles.analysis}>
            {analysis.strengths.length > 0 && (
              <div style={styles.analysisSection}>
                <h3 style={styles.analysisTitle}>✅ Points forts</h3>
                <ul style={styles.list}>
                  {analysis.strengths.map((strength, idx) => (
                    <li key={idx} style={styles.listItem}>{strength}</li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.suggestions.length > 0 && (
              <div style={styles.analysisSection}>
                <h3 style={styles.analysisTitle}>💡 Suggestions</h3>
                <ul style={styles.list}>
                  {analysis.suggestions.map((suggestion, idx) => (
                    <li key={idx} style={{...styles.listItem, color: '#FF9900'}}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.warnings.length > 0 && (
              <div style={styles.analysisSection}>
                <h3 style={styles.analysisTitle}>⚠️ Points à améliorer</h3>
                <ul style={styles.list}>
                  {analysis.warnings.map((warning, idx) => (
                    <li key={idx} style={{...styles.listItem, color: '#FF3D00'}}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.score === 0 && (
              <div style={styles.emptyState}>
                <p>Commencez à remplir votre listing pour voir l'analyse</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'guidelines' && (
          <div style={styles.guidelines}>
            <h3 style={styles.guidelinesTitle}>📋 Guidelines Amazon</h3>
            
            <div style={styles.guidelineSection}>
              <h4>Titre</h4>
              <ul style={styles.guidelineList}>
                <li>Maximum 200 caractères</li>
                <li>Optimal: 80-120 caractères</li>
                <li>Inclure: Marque + Produit + Caractéristiques</li>
                <li>Éviter: !!!, ***, FREE, BEST</li>
                <li>Premiers mots les plus importants</li>
              </ul>
            </div>

            <div style={styles.guidelineSection}>
              <h4>Bullet Points</h4>
              <ul style={styles.guidelineList}>
                <li>5 bullet points recommandés</li>
                <li>Maximum 500 caractères chacun</li>
                <li>Optimal: 150-200 caractères</li>
                <li>Commencer par un mot-clé important</li>
                <li>Mettre en avant les bénéfices</li>
              </ul>
            </div>

            <div style={styles.guidelineSection}>
              <h4>Mots-clés Backend</h4>
              <ul style={styles.guidelineList}>
                <li>Maximum 250 bytes</li>
                <li>Séparés par des espaces (pas de virgules)</li>
                <li>Pas de répétition des mots du titre/bullets</li>
                <li>Inclure synonymes et variations</li>
                <li>Pas de marques concurrentes</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '900px',
    margin: '0 auto'
  },
  header: {
    marginBottom: '30px'
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '8px',
    background: 'linear-gradient(135deg, #FF9900 0%, #FFB800 100%)',
    WebkitBackgroundClip: 'text',
    WebkitColor: 'transparent'
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--text-secondary)'
  },
  scoreCard: {
    background: 'var(--bg-secondary)',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '30px'
  },
  scoreCircle: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    background: 'var(--bg-tertiary)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '4px solid var(--accent)'
  },
  scoreValue: {
    fontSize: '36px',
    fontWeight: 'bold'
  },
  scoreLabel: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    marginTop: '4px'
  },
  scoreDetails: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  scoreItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 12px',
    background: 'var(--bg-tertiary)',
    borderRadius: '8px',
    fontSize: '14px'
  },
  tabs: {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '12px'
  },
  tab: {
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'all 0.2s'
  },
  content: {
    background: 'var(--bg-secondary)',
    borderRadius: '12px',
    padding: '24px'
  },
  builder: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--text-primary)'
  },
  input: {
    padding: '12px',
    background: 'var(--bg-tertiary)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    color: 'var(--text-primary)',
    fontSize: '14px'
  },
  textarea: {
    padding: '12px',
    background: 'var(--bg-tertiary)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    color: 'var(--text-primary)',
    fontSize: '14px',
    resize: 'vertical',
    fontFamily: 'inherit'
  },
  charCount: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    textAlign: 'right'
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px'
  },
  half: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  bulletItem: {
    marginBottom: '12px'
  },
  generateBtn: {
    padding: '6px 12px',
    background: 'linear-gradient(135deg, #FF9900 0%, #FFB800 100%)',
    border: 'none',
    borderRadius: '6px',
    color: '#0D1117',
    fontWeight: '600',
    fontSize: '12px',
    cursor: 'pointer'
  },
  analysis: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  analysisSection: {
    padding: '16px',
    background: 'var(--bg-tertiary)',
    borderRadius: '8px'
  },
  analysisTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '12px'
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  listItem: {
    padding: '8px 12px',
    background: 'var(--bg-secondary)',
    borderRadius: '6px',
    fontSize: '14px'
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px',
    color: 'var(--text-secondary)'
  },
  guidelines: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  guidelinesTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '16px'
  },
  guidelineSection: {
    padding: '16px',
    background: 'var(--bg-tertiary)',
    borderRadius: '8px'
  },
  guidelineList: {
    listStyle: 'disc',
    paddingLeft: '20px',
    marginTop: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  }
};

export default ListingBuilder;
