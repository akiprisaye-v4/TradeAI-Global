export function runDailyBriefAgent({ products, fxRates, calcProduct }) {
  if (!products.length) return [];

  const totalProfit = products.reduce((sum, p) => {
    return sum + calcProduct(p, fxRates).monthlyProfit;
  }, 0);

  const avgMargin = products.reduce((sum, p) => {
    return sum + calcProduct(p, fxRates).netMargin;
  }, 0) / products.length;

  return [{
    type: "brief",
    severity: totalProfit >= 0 ? "success" : "warning",
    title: "Brief automatique",
    message: `${products.length} produit(s), profit mensuel estimé ${totalProfit.toFixed(2)}, marge moyenne ${avgMargin.toFixed(1)}%.`,
    action: "Consulter le tableau de bord"
  }];
}
