export function runStockAlertAgent({ products }) {
  return products.flatMap((p) => {
    const monthlyUnits = Number(p.units || 0);
    const stockUnits = Number(p.initialOrderUnits || 0);
    const leadDays = Number(p.supplierLeadDays || 30);
    const daysOfStock = monthlyUnits > 0 ? (stockUnits / monthlyUnits) * 30 : 999;

    if (daysOfStock <= leadDays * 0.5) {
      return [{
        type: "stock",
        severity: "critical",
        title: "Risque de rupture critique",
        message: `${p.name} peut tomber en rupture sous ${Math.round(daysOfStock)} jours.`,
        action: "Commander immédiatement"
      }];
    }

    if (daysOfStock <= leadDays) {
      return [{
        type: "stock",
        severity: "warning",
        title: "Stock à surveiller",
        message: `${p.name} couvre environ ${Math.round(daysOfStock)} jours.`,
        action: "Préparer une commande fournisseur"
      }];
    }

    return [];
  });
}
