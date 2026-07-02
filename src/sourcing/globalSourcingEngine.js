const SOURCING_MARKETPLACES = [
  { name: "Alibaba", country: "Chine", baseMultiplier: 0.22, shippingDays: 28, reliability: 82 },
  { name: "1688", country: "Chine", baseMultiplier: 0.18, shippingDays: 32, reliability: 74 },
  { name: "AliExpress", country: "Chine", baseMultiplier: 0.34, shippingDays: 18, reliability: 70 },
  { name: "Made-in-China", country: "Chine", baseMultiplier: 0.24, shippingDays: 30, reliability: 78 },
  { name: "Global Sources", country: "Asie", baseMultiplier: 0.27, shippingDays: 26, reliability: 80 },
  { name: "IndiaMART", country: "Inde", baseMultiplier: 0.30, shippingDays: 35, reliability: 72 },
  { name: "DHgate", country: "Chine", baseMultiplier: 0.38, shippingDays: 20, reliability: 66 },
  { name: "Temu", country: "Chine", baseMultiplier: 0.42, shippingDays: 15, reliability: 62 }
];

export function runGlobalSourcingEngine({ product, calcProduct, fxRates }) {
  if (!product) return [];

  const baseCalc = calcProduct(product, fxRates);
  const sellingPrice = Number(product.sellingPrice || 0);

  return SOURCING_MARKETPLACES.map((source, index) => {
    const supplierPrice = Math.max(0.2, sellingPrice * source.baseMultiplier);
    const shippingCost = supplierPrice * (source.shippingDays > 28 ? 0.22 : 0.16);
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
        Math.round((roi * 0.35) + (margin * 0.35) + (source.reliability * 0.30))
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
      shippingDays: source.shippingDays,
      reliability: source.reliability,
      moq: index < 2 ? 500 : index < 5 ? 300 : 100,
      score,
      recommendation:
        score >= 75 ? "Excellent fournisseur potentiel" :
        score >= 55 ? "À négocier" :
        "Risque ou rentabilité faible"
    };
  }).sort((a, b) => b.score - a.score);
}
