document.addEventListener('DOMContentLoaded', () => {
  const extractBtn = document.getElementById('extractBtn');
  const statusDiv = document.getElementById('status');
  const productInfoDiv = document.getElementById('productInfo');
  const openAppLink = document.getElementById('openApp');

  // Ouvrir l'app web
  openAppLink.addEventListener('click', (e) => {
    e.preventDefault();
    chrome.tabs.create({ url: 'https://trade-ai-global.vercel.app' });
  });

  // Extraire le produit
  extractBtn.addEventListener('click', async () => {
    extractBtn.disabled = true;
    extractBtn.textContent = '⏳ Extraction en cours...';
    statusDiv.style.display = 'none';
    productInfoDiv.style.display = 'none';

    try {
      // Obtenir l'onglet actif
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      // Vérifier si on est sur Amazon
      if (!tab.url.includes('amazon.')) {
        showStatus('error', '❌ Veuillez ouvrir une page produit Amazon');
        extractBtn.disabled = false;
        extractBtn.textContent = '🔍 Extraire le produit Amazon';
        return;
      }

      // Envoyer un message au content script
      chrome.tabs.sendMessage(tab.id, { action: 'extractProduct' }, (response) => {
        if (chrome.runtime.lastError) {
          showStatus('error', '❌ Erreur de communication. Rechargez la page Amazon.');
          extractBtn.disabled = false;
          extractBtn.textContent = '🔍 Extraire le produit Amazon';
          return;
        }

        if (response) {
          // Sauvegarder dans le storage
          chrome.storage.local.set({ amazonProductData: response }, () => {
            showStatus('success', '✅ Produit extrait avec succès !');
            displayProductInfo(response);
            
            // Envoyer à l'app web si ouverte
            chrome.tabs.query({ url: 'https://trade-ai-global.vercel.app/*' }, (tabs) => {
              tabs.forEach(tab => {
                chrome.tabs.sendMessage(tab.id, {
                  action: 'newAmazonProduct',
                  data: response
                });
              });
            });
          });
        } else {
          showStatus('error', '❌ Impossible d\'extraire le produit');
        }

        extractBtn.disabled = false;
        extractBtn.textContent = '🔍 Extraire le produit Amazon';
      });

    } catch (error) {
      console.error('Error:', error);
      showStatus('error', '❌ Erreur: ' + error.message);
      extractBtn.disabled = false;
      extractBtn.textContent = '🔍 Extraire le produit Amazon';
    }
  });

  function showStatus(type, message) {
    statusDiv.textContent = message;
    statusDiv.className = 'status ' + type;
    statusDiv.style.display = 'block';
  }

  function displayProductInfo(product) {
    productInfoDiv.innerHTML = `
      <div><strong>Titre:</strong> <span>${product.title.substring(0, 50)}...</span></div>
      <div><strong>Prix:</strong> <span>${product.priceSymbol || '€'}${product.price}</span></div>
      <div><strong>Note:</strong> <span>⭐ ${product.rating}/5 (${product.reviewsCount} avis)</span></div>
      <div><strong>ASIN:</strong> <span>${product.asin || 'N/A'}</span></div>
    `;
    productInfoDiv.style.display = 'block';
  }
});
