// Amazon Profit Pro - Content Script
// Analyse les pages produits Amazon et extrait les données

(function() {
  'use strict';

  // Attendre que la page soit complètement chargée
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    console.log('🚀 Amazon Profit Pro Analyzer activé');
    
    // Extraire les données du produit
    const productData = extractProductData();
    
    if (productData) {
      // Afficher le badge d'analyse
      showAnalysisBadge(productData);
      
      // Envoyer les données au background script
      chrome.runtime.sendMessage({
        type: 'PRODUCT_ANALYZED',
        data: productData
      });
    }
  }

  function extractProductData() {
    try {
      const data = {
        url: window.location.href,
        timestamp: new Date().toISOString(),
        marketplace: getMarketplace(),
        asin: getASIN(),
        title: getTitle(),
        price: getPrice(),
        rating: getRating(),
        reviews: getReviewsCount(),
        bsr: getBSR(),
        category: getCategory(),
        seller: getSeller(),
        images: getImages(),
        bullets: getBullets(),
        description: getDescription(),
        availability: getAvailability()
      };

      // Vérifier que les données essentielles sont présentes
      if (!data.asin || !data.title) {
        console.warn('⚠️ Données incomplètes');
        return null;
      }

      return data;
    } catch (error) {
      console.error('❌ Erreur extraction données:', error);
      return null;
    }
  }

  function getMarketplace() {
    const hostname = window.location.hostname;
    const marketplaces = {
      'amazon.com': 'US',
      'amazon.fr': 'FR',
      'amazon.de': 'DE',
      'amazon.co.uk': 'UK',
      'amazon.it': 'IT',
      'amazon.es': 'ES'
    };
    return marketplaces[hostname] || 'UNKNOWN';
  }

  function getASIN() {
    // Essayer plusieurs méthodes pour trouver l'ASIN
    const urlMatch = window.location.pathname.match(/\/(?:dp|gp\/product)\/([A-Z0-9]{10})/);
    if (urlMatch) return urlMatch[1];

    const asinElement = document.querySelector('[data-asin]');
    if (asinElement) return asinElement.getAttribute('data-asin');

    return null;
  }

  function getTitle() {
    const titleElement = document.querySelector('#productTitle');
    return titleElement ? titleElement.textContent.trim() : null;
  }

  function getPrice() {
    // Essayer plusieurs sélecteurs pour le prix
    const priceSelectors = [
      '.a-price .a-offscreen',
      '#priceblock_ourprice',
      '#priceblock_dealprice',
      '.a-price-whole'
    ];

    for (const selector of priceSelectors) {
      const priceElement = document.querySelector(selector);
      if (priceElement) {
        const priceText = priceElement.textContent.trim();
        const priceMatch = priceText.match(/[\d.,]+/);
        if (priceMatch) {
          return parseFloat(priceMatch[0].replace(',', '.'));
        }
      }
    }

    return null;
  }

  function getRating() {
    const ratingElement = document.querySelector('#acrPopover .a-icon-alt');
    if (ratingElement) {
      const ratingMatch = ratingElement.textContent.match(/([\d.]+)/);
      return ratingMatch ? parseFloat(ratingMatch[1]) : null;
    }
    return null;
  }

  function getReviewsCount() {
    const reviewsElement = document.querySelector('#acrCustomerReviewText');
    if (reviewsElement) {
     
cd ~/TradeAI-Global

# Créer le dossier de l'extension
mkdir -p chrome-extension

# 1. Créer manifest.json
cat > chrome-extension/manifest.json << 'MANIFEST'
{
  "manifest_version": 3,
  "name": "Amazon Profit Pro Analyzer",
  "version": "1.0.0",
  "description": "Analysez les produits Amazon en temps réel avec Amazon Profit Pro",
  "permissions": [
    "activeTab",
    "storage",
    "tabs"
  ],
  "host_permissions": [
    "*://*.amazon.com/*",
    "*://*.amazon.fr/*",
    "*://*.amazon.de/*",
    "*://*.amazon.co.uk/*",
    "*://*.amazon.it/*",
    "*://*.amazon.es/*"
  ],
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  "content_scripts": [
    {
      "matches": [
        "*://*.amazon.com/dp/*",
        "*://*.amazon.fr/dp/*",
        "*://*.amazon.de/dp/*",
        "*://*.amazon.co.uk/dp/*",
        "*://*.amazon.it/dp/*",
        "*://*.amazon.es/dp/*",
        "*://*.amazon.com/gp/product/*",
        "*://*.amazon.fr/gp/product/*"
      ],
      "js": ["content.js"],
      "css": ["content-styles.css"],
      "run_at": "document_end"
    }
  ],
  "background": {
    "service_worker": "background.js"
  },
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  }
}
MANIFEST

echo "✅ manifest.json créé"

# 2. Créer content.js (script injecté sur Amazon)
cat > chrome-extension/content.js << 'CONTENT_JS'
// Amazon Profit Pro - Content Script
// Analyse les pages produits Amazon et extrait les données

(function() {
  'use strict';

  // Attendre que la page soit complètement chargée
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    console.log('🚀 Amazon Profit Pro Analyzer activé');
    
    // Extraire les données du produit
    const productData = extractProductData();
    
    if (productData) {
      // Afficher le badge d'analyse
      showAnalysisBadge(productData);
      
      // Envoyer les données au background script
      chrome.runtime.sendMessage({
        type: 'PRODUCT_ANALYZED',
        data: productData
      });
    }
  }

  function extractProductData() {
    try {
      const data = {
        url: window.location.href,
        timestamp: new Date().toISOString(),
        marketplace: getMarketplace(),
        asin: getASIN(),
        title: getTitle(),
        price: getPrice(),
        rating: getRating(),
        reviews: getReviewsCount(),
        bsr: getBSR(),
        category: getCategory(),
        seller: getSeller(),
        images: getImages(),
        bullets: getBullets(),
        description: getDescription(),
        availability: getAvailability()
      };

      // Vérifier que les données essentielles sont présentes
      if (!data.asin || !data.title) {
        console.warn('⚠️ Données incomplètes');
        return null;
      }

      return data;
    } catch (error) {
      console.error('❌ Erreur extraction données:', error);
      return null;
    }
  }

  function getMarketplace() {
    const hostname = window.location.hostname;
    const marketplaces = {
      'amazon.com': 'US',
      'amazon.fr': 'FR',
      'amazon.de': 'DE',
      'amazon.co.uk': 'UK',
      'amazon.it': 'IT',
      'amazon.es': 'ES'
    };
    return marketplaces[hostname] || 'UNKNOWN';
  }

  function getASIN() {
    // Essayer plusieurs méthodes pour trouver l'ASIN
    const urlMatch = window.location.pathname.match(/\/(?:dp|gp\/product)\/([A-Z0-9]{10})/);
    if (urlMatch) return urlMatch[1];

    const asinElement = document.querySelector('[data-asin]');
    if (asinElement) return asinElement.getAttribute('data-asin');

    return null;
  }

  function getTitle() {
    const titleElement = document.querySelector('#productTitle');
    return titleElement ? titleElement.textContent.trim() : null;
  }

  function getPrice() {
    // Essayer plusieurs sélecteurs pour le prix
    const priceSelectors = [
      '.a-price .a-offscreen',
      '#priceblock_ourprice',
      '#priceblock_dealprice',
      '.a-price-whole'
    ];

    for (const selector of priceSelectors) {
      const priceElement = document.querySelector(selector);
      if (priceElement) {
        const priceText = priceElement.textContent.trim();
        const priceMatch = priceText.match(/[\d.,]+/);
        if (priceMatch) {
          return parseFloat(priceMatch[0].replace(',', '.'));
        }
      }
    }

    return null;
  }

  function getRating() {
    const ratingElement = document.querySelector('#acrPopover .a-icon-alt');
    if (ratingElement) {
      const ratingMatch = ratingElement.textContent.match(/([\d.]+)/);
      return ratingMatch ? parseFloat(ratingMatch[1]) : null;
    }
    return null;
  }

  function getReviewsCount() {
    const reviewsElement = document.querySelector('#acrCustomerReviewText');
    if (reviewsElement) {
      const reviewsText = reviewsElement.textContent.trim();
      const reviewsMatch = reviewsText.match(/([\d,]+)/);
      return reviewsMatch ? parseInt(reviewsMatch[1].replace(',', '')) : null;
    }
    return null;
  }

  function getBSR() {
    // Chercher le Best Sellers Rank
    const bsrElement = document.querySelector('#SalesRank .value, #productDetails_detailBullets_sections1 tr:nth-child(1) td');
    if (bsrElement) {
      const bsrText = bsrElement.textContent;
      const bsrMatch = bsrText.match(/#?([\d,]+)/);
      return bsrMatch ? parseInt(bsrMatch[1].replace(',', '')) : null;
    }
    return null;
  }

  function getCategory() {
    const categoryElement = document.querySelector('#productDetails_detailBullets_sections1 tr:nth-child(1) td a');
    return categoryElement ? categoryElement.textContent.trim() : null;
  }

  function getSeller() {
    const sellerElement = document.querySelector('#sellerProfileTriggerId, #merchant-info');
    return sellerElement ? sellerElement.textContent.trim() : null;
  }

  function getImages() {
    const images = [];
    const imageElements = document.querySelectorAll('#altImages img.a-dynamic-image');
    imageElements.forEach(img => {
      const src = img.getAttribute('src');
      if (src && !src.includes('grey-pixel')) {
        images.push(src);
      }
    });
    return images.slice(0, 7); // Maximum 7 images
  }

  function getBullets() {
    const bullets = [];
    const bulletElements = document.querySelectorAll('#feature-bullets li span.a-list-item');
    bulletElements.forEach(bullet => {
      const text = bullet.textContent.trim();
      if (text && text.length > 10) {
        bullets.push(text);
      }
    });
    return bullets.slice(0, 5);
  }

  function getDescription() {
    const descElement = document.querySelector('#productDescription');
    return descElement ? descElement.textContent.trim() : null;
  }

  function getAvailability() {
    const availabilityElement = document.querySelector('#availability');
    return availabilityElement ? availabilityElement.textContent.trim() : null;
  }

  function showAnalysisBadge(productData) {
    // Créer le badge d'analyse
    const badge = document.createElement('div');
    badge.id = 'amazon-profit-pro-badge';
    badge.innerHTML = `
      <div style="
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #FF9900 0%, #FFB800 100%);
        color: #0D1117;
        padding: 12px 16px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 999999;
        font-family: system-ui, sans-serif;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
      ">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 20px;">🚀</span>
          <span>Amazon Profit Pro</span>
        </div>
        <div style="font-size: 11px; margin-top: 4px; opacity: 0.9;">
          Analyse complète disponible
        </div>
      </div>
    `;

    badge.addEventListener('click', () => {
      // Ouvrir le popup avec les détails
      chrome.runtime.sendMessage({
        type: 'SHOW_ANALYSIS',
        data: productData
      });
    });

    document.body.appendChild(badge);

    // Animation d'apparition
    setTimeout(() => {
      badge.style.transform = 'scale(1.05)';
      setTimeout(() => {
        badge.style.transform = 'scale(1)';
      }, 200);
    }, 100);
  }
})();
