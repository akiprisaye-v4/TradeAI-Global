// Amazon Profit Pro - Background Script
// Gère la communication entre content script et popup

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'PRODUCT_ANALYZED') {
    // Sauvegarder les données dans le storage
    chrome.storage.local.set({
      lastAnalyzedProduct: request.data,
      lastAnalyzedAt: new Date().toISOString()
    });
    
    console.log('✅ Produit analysé et sauvegardé', request.data);
  }
  
  if (request.type === 'SHOW_ANALYSIS') {
    // Ouvrir le popup avec les données
    chrome.storage.local.set({
      showAnalysis: true,
      productData: request.data
    });
  }
  
  return true;
});

// Écouter les changements d'onglet
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    // Vérifier si c'est une page produit Amazon
    if (tab.url.match(/amazon\.(com|fr|de|co\.uk|it|es)\/(dp|gp\/product)\/[A-Z0-9]{10}/)) {
      console.log('🎯 Page produit Amazon détectée');
    }
  }
});
