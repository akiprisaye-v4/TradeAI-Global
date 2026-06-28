export interface Product {
  id: string;
  name: string;
  category: string;
  amazonPrice: number;
  alibabaPrice: number;
  shippingPrice: number;
  margin: number;
  growth: number;
  profit: number;
  demand: 'Faible' | 'Moyenne' | 'Élevée' | 'Très élevée';
  difficulty: 'Facile' | 'Moyen' | 'Difficile';
  image?: string;
  tags: string[];
}

export interface Marketplace {
  id: string;
  name: string;
  country: string;
  currency: string;
  flag: string;
  referralFee: number;
  fbaFeeMultiplier: number;
  vatRate: number;
  shippingMultiplier: number;
}

export interface Territory {
  id: string;
  name: string;
  code: string;
  octroiDeMer: number;
  taxeRegionale: number;
  tva: number;
  shippingMultiplier: number;
  currency: string;
}

export interface UserData {
  factoryPrice: number;
  shippingPrice: number;
  sellingPrice: number;
  destination: string;
  quantity: number;
}

export interface CalculatedCost {
  marketplace?: Marketplace;
  territory?: Territory;
  cif: number;
  referralFee?: number;
  octroiDeMer?: number;
  taxeRegionale?: number;
  tva?: number;
  vat?: number;
  totalTaxes: number;
  landedCost: number;
  profit: number;
  margin: number;
  breakEven: number;
  sellingPrice: number;
}

export interface FilterState {
  category: string;
  minMargin: number;
  minGrowth: number;
  demand: string;
  difficulty: string;
  search: string;
}
