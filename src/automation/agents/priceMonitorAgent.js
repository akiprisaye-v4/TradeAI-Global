export function runPriceMonitorAgent({ products, fxRates, calcProduct }) {
  return products.flatMap((p) => {
    const c = calcProduct(p, fxRates);

    if (c.netMargin < 10) {
      return [{
        type: "price",
        severity: "critical",
        title: "Marge trop faible",
        message: `${p.name} a une marge nette de ${c.netMargin.toFixed(1)}%.`,
        action: "Augmenter le prix ou réduire le coût produit"
      }];
    }

    if (c.netMargin < 15) {
      return [{
        type: "price",
        severity: "warning",
        title: "Marge sous objectif",
        message: `${p.name} est sous le seuil recommandé de 15%.`,
        action: "Tester un prix supérieur"
      }];
    }

    return [];
  });
}
