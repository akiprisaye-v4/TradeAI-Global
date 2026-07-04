const SOURCING_MARKETPLACES = [
  { name: "Alibaba", country: "Chine", localEstimateMultiplier: 0.22, estimatedShippingDays: 28, referenceReliability: 82 },
  { name: "1688", country: "Chine", localEstimateMultiplier: 0.18, estimatedShippingDays: 32, referenceReliability: 74 },
  { name: "AliExpress", country: "Chine", localEstimateMultiplier: 0.34, estimatedShippingDays: 18, referenceReliability: 70 },
  { name: "Made-in-China", country: "Chine", localEstimateMultiplier: 0.24, estimatedShippingDays: 30, referenceReliability: 78 },
  { name: "Global Sources", country: "Asie", localEstimateMultiplier: 0.27, estimatedShippingDays: 26, referenceReliability: 80 },
  { name: "IndiaMART", country: "Inde", localEstimateMultiplier: 0.30, estimatedShippingDays: 35, referenceReliability: 72 },
  { name: "DHgate", country: "Chine", localEstimateMultiplier: 0.38, estimatedShippingDays: 20, referenceReliability: 66 },
  { name: "Temu", country: "Chine", localEstimateMultiplier: 0.42, estimatedShippingDays: 15, referenceReliability: 62 }
];

export const SOURCING_DATA_PROVENANCE = 'STATIC_REFERENCE';

export function runGlobalSourcingEngine({ product, calcProduct, fxRates }) {
  if (!product) return [];

  const baseCalc = calcProduct(product, fxRates);
  const sellingPrice = Number(product.sellingPrice || 0);

  return SOURCING_MARKETPLACES.map((source, index) => {
    const supplierPrice = Math.max(0.2, sellingPrice * source.localEstimateMultiplier);
    const shippingCost = supplierPrice * (source.estimatedShippingDays > 28 ? 0.22 : 0.16);
    const customsRate = source.country === "Inde" ? 0.08 : 0.06;
    const customsCost = supplierPrice * customsRate;
    const landedCost = supplierPrice + shippingCost + customsCost;

    const estimatedProfit = sellingPrice - landedCost - Number(product.ads || 0) - Number(baseCalc.fbaFee || 0);
    const roi = landedCost > 0 ? (estimatedProfit / landedCost) * 100 : 0;
    const margin = sellingPrice > 0 ? (estimatedProfit / sellingPrice) * 100 : 0;

    const score = Math.max(
      0,
      Math.min(
        100,
        Math.round((roi * 0.35) + (margin * 0.35) + (source.referenceReliability * 0.30))
      )
    );

    return {
      id: `${source.name}-${index}`,
      marketplace: source.name,
      country: source.country,
      supplierPrice,
      shippingCost,
      customsCost,
      landedCost,
      estimatedProfit,
      roi,
      margin,
      estimatedShippingDays: source.estimatedShippingDays,
      referenceReliability: source.referenceReliability,
      moq: index < 2 ? 500 : index < 5 ? 300 : 100,
      score,
      recommendation:
        score >= 75 ? "Excellent fournisseur potentiel" :
        score >= 55 ? "À négocier" :
        "Risque ou rentabilité faible"
    };
  }).sort((a, b) => b.score - a.score);
}
