import { runStockAlertAgent } from "./agents/stockAlertAgent";
import { runPriceMonitorAgent } from "./agents/priceMonitorAgent";
import { runOpportunityAgent } from "./agents/opportunityAgent";
import { runDailyBriefAgent } from "./agents/dailyBriefAgent";

export function runAutomationEngine({ products, fxRates, calcProduct }) {
  const alerts = [];

  alerts.push(...runStockAlertAgent({ products }));
  alerts.push(...runPriceMonitorAgent({ products, fxRates, calcProduct }));
  alerts.push(...runOpportunityAgent({ products, fxRates, calcProduct }));
  alerts.push(...runDailyBriefAgent({ products, fxRates, calcProduct }));

  return alerts.filter(Boolean);
}
