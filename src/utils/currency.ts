export type CurrencyCode = 'EUR' | 'USD' | 'GBP' | 'CAD' | 'AUD' | 'JPY' | 'INR' | 'MXN' | 'BRL';

export const formatCurrency = (value: number, currency: CurrencyCode = 'EUR'): string => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency }).format(value);
};
