// Content script - S'exécute sur les pages Amazon

// Fonction pour extraire les données du produit
function extractAmazonProduct() {
  try {
    // Extraire l'ASIN
    const asinMatch = window.location.href.match(/(?:dp|gp\/product)\/([A-Z0-9]{10})/);
    const asin = asinMatch ? asinMatch[1] : null;

    // Titre du produit
    const title = document.querySelector('#productTitle')?.textContent?.trim() || '';

    // Prix
    const priceWhole = document.querySelector('.a-price-whole')?.textContent?.trim() || '0';
    const priceFraction = document.querySelector('.a-price-fraction')?.textContent?.trim() || '00';
    const priceSymbol = document.querySelector('.a-price-symbol')?.textContent?.trim() || '€';
    const price = parseFloat(priceWhole.replace(/[^\d]/g, '') + '.' + priceFraction);

    // Images
    const mainImage = document.querySelector('#imgTagWrapperId img')?.src || '';
    const images = Array.from(document.querySelectorAll('#altImages img'))
      .map(img => img.src)
      .filter(src => src);

    // Note et avis
    const rating = document.querySelector('[data-hook="average-star-rating"]')?.textContent?.trim() || '0';
    const reviewsCount = document.querySelector('[data-hook="total-review-count"]')?.textContent?.trim() || '0';

    // Caractéristiques
    const features = Array.from(document.querySelectorAll('#feature-bullets ul li span'))
      .map(li => li.textContent?.trim())
      .filter(text => text && text.length > 10);

    // Catégorie
    const category = document.querySelector('.a-breadcrumb li:last-child')?.textContent?.trim() || '';

    // Dimensions et poids (si disponibles)
    const dimensions = extractDimensions();

    return {
      asin,
      title,
      price,
      priceSymbol,
      mainImage,
      images,
      rating: parseFloat(rating),
      reviewsCount: parseInt(reviewsCount.replace(/[^\d]/g, '')) || 0,
      features,
      category,
      dimensions,
      url: window.location.href,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error extracting Amazon product:', error);
    return null;
  }
}

// Extraire dimensions et poids
function extractDimensions() {
  const table = document.querySelector('#productDetails_techSpec_section_1 tr, .prodDetTable tr');
  if (!table) return null;

  const rows = Array.from(table.querySelectorAll('tr'));
  const data = {};

  rows.forEach(row => {
    const key = row.querySelector('th')?.textContent?.trim();
    const value = row.querySelector('td')?.textContent?.trim();
    if (key && value) {
      data[key] = value;
    }
  });

  return data;
}

// Écouter les messages du popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'extractProduct') {
    const productData = extractAmazonProduct();
    sendResponse(productData);
  }
});

// Sauvegarder automatiquement dans localStorage pour l'app web
chrome.storage.local.onChanged.addListener((changes) => {
  if (changes.amazonProductData) {
    // Notifier l'app web
    window.postMessage({
      type: 'AMAZON_PRODUCT_DATA',
      data: changes.amazonProductData.newValue
    }, '*');
  }
});

console.log('Amazon Profit Pro Extension loaded');
