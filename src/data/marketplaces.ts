export interface Marketplace {
  id: string;
  name: string;
  country: string;
  currency: string;
  flag: string;
  referralFee: number; // Commission Amazon (%)
  fbaFeeMultiplier: number; // Multiplicateur frais FBA
  vatRate: number; // TVA standard (%)
  shippingMultiplier: number; // Coût shipping relatif
}

export const marketplaces: Marketplace[] = [
  { id: 'fr', name: 'Amazon.fr', country: 'France', currency: 'EUR', flag: '🇫🇷', referralFee: 15.0, fbaFeeMultiplier: 1.0, vatRate: 20.0, shippingMultiplier: 1.0 },
  { id: 'de', name: 'Amazon.de', country: 'Allemagne', currency: 'EUR', flag: '🇩🇪', referralFee: 15.0, fbaFeeMultiplier: 1.0, vatRate: 19.0, shippingMultiplier: 1.0 },
  { id: 'uk', name: 'Amazon.co.uk', country: 'Royaume-Uni', currency: 'GBP', flag: '🇬🇧', referralFee: 15.0, fbaFeeMultiplier: 1.1, vatRate: 20.0, shippingMultiplier: 1.1 },
  { id: 'it', name: 'Amazon.it', country: 'Italie', currency: 'EUR', flag: '🇮🇹', referralFee: 15.0, fbaFeeMultiplier: 1.05, vatRate: 22.0, shippingMultiplier: 1.05 },
  { id: 'es', name: 'Amazon.es', country: 'Espagne', currency: 'EUR', flag: '🇪🇸', referralFee: 15.0, fbaFeeMultiplier: 1.05, vatRate: 21.0, shippingMultiplier: 1.05 },
  { id: 'us', name: 'Amazon.com', country: 'États-Unis', currency: 'USD', flag: '🇺🇸', referralFee: 15.0, fbaFeeMultiplier: 0.95, vatRate: 0.0, shippingMultiplier: 0.9 },
  { id: 'ca', name: 'Amazon.ca', country: 'Canada', currency: 'CAD', flag: '🇨🇦', referralFee: 15.0, fbaFeeMultiplier: 1.1, vatRate: 5.0, shippingMultiplier: 1.2 },
  { id: 'au', name: 'Amazon.com.au', country: 'Australie', currency: 'AUD', flag: '🇦🇺', referralFee: 15.0, fbaFeeMultiplier: 1.2, vatRate: 10.0, shippingMultiplier: 1.4 },
  { id: 'jp', name: 'Amazon.co.jp', country: 'Japon', currency: 'JPY', flag: '🇯🇵', referralFee: 15.0, fbaFeeMultiplier: 1.15, vatRate: 10.0, shippingMultiplier: 1.3 },
  { id: 'in', name: 'Amazon.in', country: 'Inde', currency: 'INR', flag: '🇮🇳', referralFee: 15.0, fbaFeeMultiplier: 0.8, vatRate: 18.0, shippingMultiplier: 0.7 },
  { id: 'mx', name: 'Amazon.com.mx', country: 'Mexique', currency: 'MXN', flag: '🇲🇽', referralFee: 15.0, fbaFeeMultiplier: 1.1, vatRate: 16.0, shippingMultiplier: 1.2 },
  { id: 'br', name: 'Amazon.com.br', country: 'Brésil', currency: 'BRL', flag: '🇧🇷', referralFee: 15.0, fbaFeeMultiplier: 1.3, vatRate: 17.0, shippingMultiplier: 1.5 },
];

export const getMarketplaceById = (id: string): Marketplace | undefined => {
  return marketplaces.find(m => m.id === id);
};

export const getMarketplacesByCurrency = (currency: string): Marketplace[] => {
  return marketplaces.filter(m => m.currency === currency);
};
