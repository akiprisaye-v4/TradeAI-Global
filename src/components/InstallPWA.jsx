import { useState, useEffect } from "react";

function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);
    
    // Vérifier si déjà installé
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    try {

        if (!deferredPrompt) return;
    
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
    
        if (outcome === 'accepted') {
          setIsInstalled(true);
        }
        setDeferredPrompt(null);
  
    } catch (error) {
      console.error('Erreur installation PWA:', error);
    }
  };

  if (isInstalled) return null;

  return (
    <button
      onClick={handleInstall}
      style={{
        background: "#FF9900",
        border: "none",
        borderRadius: 7,
        padding: "8px 16px",
        color: "#0D1117",
        fontWeight: 700,
        fontSize: 12,
        cursor: "pointer",
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 1000,
        boxShadow: "0 4px 12px rgba(255,153,0,0.4)"
      }}
    >
      📱 Installer l'app
    </button>
  );
}

export default React.memo(InstallPWA);
