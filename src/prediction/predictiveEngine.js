export function runPredictiveEngine({ products, fxRates, calcProduct }) {
  return products.map((p) => {
    const c = calcProduct(p, fxRates);

    const monthlyUnits = Number(p.units || 0);
    const stockUnits = Number(p.initialOrderUnits || 0);
    const leadDays = Number(p.supplierLeadDays || 30);

    const daysOfStock = monthlyUnits > 0
      ? (stockUnits / monthlyUnits) * 30
      : 999;

    const seasonalMultiplier = p.isQ4 ? 1.35 : 1.08;
    const projectedUnits30d = Math.round(monthlyUnits * seasonalMultiplier);
    const projectedUnits90d = Math.round(projectedUnits30d * 3);

    const projectedProfit30d = projectedUnits30d * c.profit;
    const projectedProfit90d = projectedUnits90d * c.profit;

    const stockRisk =
      daysOfStock <= leadDays * 0.5 ? "critical" :
      daysOfStock <= leadDays ? "warning" :
      "safe";

    const recommendedPrice =
      c.netMargin < 15
        ? p.sellingPrice * 1.08
        : c.netMargin > 30
          ? p.sellingPrice * 0.98
          : p.sellingPrice;

    const confidence =
      monthlyUnits >= 100 ? 86 :
      monthlyUnits >= 50 ? 74 :
      monthlyUnits >= 20 ? 62 :
      48;

    return {
      productName: p.name,
      marketplace: p.marketplace,
      projectedUnits30d,
      projectedUnits90d,
      projectedProfit30d,
      projectedProfit90d,
      currentMargin: c.netMargin,
      currentROI: c.roi,
      stockRisk,
      daysOfStock: Math.round(daysOfStock),
      recommendedPrice,
      confidence,
      signal:
        projectedProfit90d > 0 && c.netMargin >= 20
          ? "growth"
          : c.netMargin < 10
            ? "danger"
            : "watch"
    };
  });
}
