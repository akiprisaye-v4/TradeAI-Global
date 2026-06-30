import { useEffect } from 'react';

const GoogleAnalytics = ({ trackingId }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', trackingId);
    return () => { document.head.removeChild(script); };
  }, [trackingId]);

  return null;
};

export default React.memo(GoogleAnalytics);
