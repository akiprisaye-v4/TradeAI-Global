// Gestionnaire d'erreurs global
export const handleError = (error, context = '') => {
  console.error(`[${context}]`, error);
  
  // Envoyer à un service de monitoring (optionnel)
  // if (window.Sentry) {
  //   Sentry.captureException(error);
  // }
};

// Intercepter les erreurs non gérées
window.addEventListener('error', (event) => {
  handleError(event.error, 'Global Error');
});

window.addEventListener('unhandledrejection', (event) => {
  handleError(event.reason, 'Unhandled Promise');
});
