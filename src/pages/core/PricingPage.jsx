import React from "react";

export default function PricingPage({
  p,
  fxRates,
  PriceComparisonChart
}) {
  return (
    <PriceComparisonChart
      p={p}
      fxRates={fxRates}
    />
  );
}
