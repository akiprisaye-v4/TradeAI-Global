import { Product, Territory, Marketplace, UserData, CalculatedCost } from '../types';

// Calcul pour les DOM-TOM
export const calculateLandedCostTerritory = (
  product: Product,
  territory: Territory,
  userData?: Partial<UserData>
): CalculatedCost => {
  const factoryPrice = userData?.factoryPrice ?? product.alibabaPrice;
  const shippingPrice = userData?.shippingPrice ?? product.shippingPrice;
  const quantity = userData?.quantity ?? 1;
  const cif = (factoryPrice + shippingPrice) * quantity;
  const octroiDeMer = cif * (territory.octroiDeMer / 100);
  const taxeRegionale = cif * (territory.taxeRegionale / 100);
  const baseTVA = cif + octroiDeMer + taxeRegionale;
  const tva = baseTVA * (territory.tva / 100);
  const totalTaxes = octroiDeMer + taxeRegionale + tva;
  const landedCost = cif + totalTaxes;
  const sellingPrice = userData?.sellingPrice ?? product.amazonPrice;
  const profit = (sellingPrice * quantity) - landedCost;
  const margin = (profit / landedCost) * 100;
  const breakEven = landedCost / quantity;
  return {
    territory, cif, octroiDeMer, taxeRegionale, tva, totalTaxes, landedCost,
    profit, margin, breakEven, sellingPrice,
  };
};

// Calcul pour les marketplaces mondiales
export const calculateLandedCostMarketplace = (
  product: Product,
  marketplace: Marketplace,
  userData?: Partial<UserData>
): CalculatedCost => {
  const factoryPrice = userData?.factoryPrice ?? product.alibabaPrice;
  const shippingPrice = (userData?.shippingPrice ?? product.shippingPrice) * marketplace.shippingMultiplier;
  const quantity = userData?.quantity ?? 1;
  const cif = (factoryPrice + shippingPrice) * quantity;
  const sellingPrice = userData?.sellingPrice ?? product.amazonPrice;
  const referralFee = sellingPrice * quantity * (marketplace.referralFee / 100);
  const vat = marketplace.vatRate > 0 ? (sellingPrice * quantity) * (marketplace.vatRate / 100) : 0;
  const totalTaxes = referralFee + vat;
  const landedCost = cif + totalTaxes;
  const profit = (sellingPrice * quantity) - landedCost;
  const margin = (profit / landedCost) * 100;
  const breakEven = landedCost / quantity;
  return {
    marketplace, cif, referralFee, vat, totalTaxes, landedCost,
    profit, margin, breakEven, sellingPrice,
  };
};

// Fonction unifiée (compatibilité)
export const calculateLandedCost = calculateLandedCostTerritory;

export const compareTerritories = (product: Product, userData?: Partial<UserData>): CalculatedCost[] => {
  const { territories } = require('../data/territories');
  return territories.map((t: Territory) => calculateLandedCostTerritory(product, t, userData)).sort((a: CalculatedCost, b: CalculatedCost) => b.profit - a.profit);
};

export const compareMarketplaces = (product: Product, userData?: Partial<UserData>): CalculatedCost[] => {
  const { marketplaces } = require('../data/marketplaces');
  return marketplaces.map((m: Marketplace) => calculateLandedCostMarketplace(product, m, userData)).sort((a: CalculatedCost, b: CalculatedCost) => b.profit - a.profit);
};

export const getBestProducts = (products: Product[], minMargin = 50, limit = 10): Product[] => {
  return products.filter(p => p.margin >= minMargin).sort((a, b) => b.margin - a.margin).slice(0, limit);
};

export const getTrendingByCategory = (products: Product[], category: string): Product[] => {
  return products.filter(p => p.category === category).sort((a, b) => b.growth - a.growth);
};

export const formatCurrency = (value: number, currency = 'EUR'): string => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency }).format(value);
};

export const formatPercent = (value: number): string => {
  return `${value.toFixed(1)}%`;
};
