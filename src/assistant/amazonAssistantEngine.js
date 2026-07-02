export function runAmazonAssistant({
  question,
  product,
  calcProduct,
  fxRates,
  automationAlerts = [],
  predictions = [],
  sourcing = []
}) {
  if (!product) {
    return {
      role: "assistant",
      answer: "Aucun produit sélectionné."
    };
  }

  const calc = calcProduct(product, fxRates);
  const q = (question || "").toLowerCase();

  if (q.includes("marge") || q.includes("profit")) {
    return {
      role: "assistant",
      answer:
        `La marge nette actuelle est de ${calc.netMargin.toFixed(1)} % pour un profit estimé de ${calc.profit.toFixed(2)} par unité.`
    };
  }

  if (q.includes("stock")) {
    const p = predictions.find(x => x.productName === product.name);

    if (!p) {
      return {
        role: "assistant",
        answer: "Aucune prévision de stock disponible."
      };
    }

    return {
      role: "assistant",
      answer:
        `Le stock couvre environ ${p.daysOfStock} jours. Niveau de risque : ${p.stockRisk}.`
    };
  }

  if (q.includes("fournisseur") || q.includes("sourcing")) {
    if (!sourcing.length) {
      return {
        role: "assistant",
        answer: "Aucun fournisseur analysé."
      };
    }

    const best = sourcing[0];

    return {
      role: "assistant",
      answer:
        `Le meilleur fournisseur actuel est ${best.marketplace} (${best.country}) avec un score de ${best.score}/100 et un ROI estimé de ${best.roi.toFixed(1)} %.`
    };
  }

  if (q.includes("alerte")) {
    if (!automationAlerts.length) {
      return {
        role: "assistant",
        answer: "Aucune alerte active."
      };
    }

    return {
      role: "assistant",
      answer:
        automationAlerts.map(a => "• " + a.title).join("\n")
    };
  }

  return {
    role: "assistant",
    answer:
      "Je peux analyser votre marge, votre ROI, votre stock, vos fournisseurs, vos alertes IA et vos prévisions."
  };
}
