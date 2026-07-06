export function runOpportunityAgent({ products, fxRates, calcProduct }) {
  return products.flatMap((p) => {
    const c = calcProduct(p, fxRates);

    if (c.roi >= 80 && c.netMargin >= 20) {
      return [{
        type: "opportunity",
        severity: "success",
        title: "Opportunité forte détectée",
        message: `${p.name} combine ROI ${c.roi.toFixed(1)}% et marge ${c.netMargin.toFixed(1)}%.`,
        action: "Augmenter le stock ou lancer une campagne"
      }];
    }

    return [];
  });
}
