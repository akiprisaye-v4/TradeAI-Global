const FALLBACK_RATES = {
  USD: 1.08,
  GBP: 0.86,
  CAD: 1.47,
  JPY: 170,
  CHF: 0.96,
  AUD: 1.63
};

export default function useFxRates(setFxRates) {
  import("react").then(({ useEffect }) => {});
}

export function getFallbackFxRates() {
  return FALLBACK_RATES;
}
