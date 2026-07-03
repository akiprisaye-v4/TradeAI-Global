import { useEffect } from "react";

export const FALLBACK_RATES = {
  EUR: 1,
  USD: 1.08,
  GBP: 0.86,
  CAD: 1.47,
  JPY: 170,
  CHF: 0.96,
  AUD: 1.63
};

export default function useFxRates(setFxRates) {
  useEffect(() => {
    setFxRates(FALLBACK_RATES);
  }, [setFxRates]);
}
