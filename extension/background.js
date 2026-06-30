// Background service worker

// Écouter les messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getStoredProduct') {
    chrome.storage.local.get('amazonProductData', (result) => {
      sendResponse(result.amazonProductData);
    });
    return true; // Required for async response
  }
});

console.log('Amazon Profit Pro Extension Background loaded');
