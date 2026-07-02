// Amazon Profit Pro - Popup Script

document.addEventListener('DOMContentLoaded', async () => {
  // Récupérer les données du produit
  chrome.storage.local.get(['lastAnalyzedProduct', 'showAnalysis'], async (result) => {
    if (result.lastAnalyzedProduct) {
      displayProduct(result.lastAnalyzedProduct);
    } else {
      showError();
    }
  });

  // Bouton sauvegarder
  document.getElementById('btn-save').addEventListener('click', () => {
    chrome.storage.local.get(['lastAnalyzedProduct'], (result) => {
      if (result.lastAnalyzedProduct) {
        // Envoyer à l'application principale
        chrome.runtime.sendMessage({
          type: 'SAVE_TO_APP',
          data: result.lastAnalyzedProduct
        });
        
        // Feedback visuel
        const btn = document.getElementById('btn-save');
        btn.textContent = '✅ Sauvegardé !';
        btn.style.background = '#00C853';
        
        setTimeout(() => {
          btn.textContent = '💾 Sauvegarder dans l\'app';
          btn.style.background = '';
        }, 2000);
      }
    });
  });

  // Bouton comparer
  document.getElementById('btn-compare').addEventListener('click', () => {
    chrome.storage.local.get(['lastAnalyzedProduct'], (result) => {
      if (result.lastAnalyzedProduct) {
        // Ouvrir l'application principale avec les données
        chrome.tabs.create({
          url: `https://trade-ai-global.vercel.app?compare=${encodeURIComponent(JSON.stringify(result.lastAnalyzedProduct))}`
        });
      }
    });
  });
});

function displayProduct(product) {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('content').style.display = 'block';

  // Afficher les informations
  document.getElementById('product-title').textContent = product.title || 'Produit sans titre';
  document.getElementById('product-asin').textContent = `ASIN: ${product.asin || 'N/A'}`;
  document.getElementById('product-marketplace').textContent = product.marketplace || 'N/A';
  
  document.getElementById('product-price').textContent = product.price ? `${product.price.toFixed(2)}€` : '-';
  document.getElementById('product-rating').textContent = product.rating ? `${product.rating}/5` : '-';
  document.getElementById('product-reviews').textContent = product.reviews ? product.reviews.toLocaleString() : '-';
  document.getElementById('product-bsr').textContent = product.bsr ? `#${product.bsr.toLocaleString()}` : '-';

  // Analyse
  const analysis = analyzeProduct(product);
  document.getElementById('analysis-result').innerHTML = analysis;
}

function analyzeProduct(product) {
  let analysis = '<ul class="analysis-list">';
  
  // Analyse du prix
  if (product.price) {
    if (product.price < 20) {
      analysis += '<li class="warning">⚠️ Prix très bas - Marge potentielle limitée</li>';
    } else if (product.price > 100) {
      analysis += '<li class="info">ℹ️ Prix élevé - Vérifiez la demande</li>';
    } else {
      analysis += '<li class="success">✅ Prix dans la zone optimale (20-100€)</li>';
    }
  }

  // Analyse des avis
  if (product.reviews) {
    if (product.reviews < 50) {
      analysis += '<li class="success">✅ Peu de concurrence (moins de 50 avis)</li>';
    } else if (product.reviews > 1000) {
      analysis += '<li class="warning">⚠️ Forte concurrence (plus de 1000 avis)</li>';
    } else {
      analysis += '<li class="info">ℹ️ Concurrence modérée</li>';
    }
  }

  // Analyse du BSR
  if (product.bsr) {
    if (product.bsr < 1000) {
      analysis += '<li class="success">✅ Excellent BSR (top 1000)</li>';
    } else if (product.bsr < 10000) {
      analysis += '<li class="info">ℹ️ Bon BSR (top 10000)</li>';
    } else {
      analysis += '<li class="warning">⚠️ BSR faible - Demande limitée</li>';
    }
  }

  // Analyse de la note
  if (product.rating) {
    if (product.rating >= 4.5) {
      analysis += '<li class="success">✅ Excellente note client</li>';
    } else if (product.rating >= 4.0) {
      analysis += '<li class="info">ℹ️ Bonne note client</li>';
    } else {
      analysis += '<li class="warning">⚠️ Note moyenne - Opportunité d\'amélioration</li>';
    }
  }

  analysis += '</ul>';
  return analysis;
}

function showError() {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('error').style.display = 'block';
}
