import { useEffect } from "react";

const FALLBACK_RATES = {
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
    let cancelled = false;

    async function loadRates() {
      try {
        const res = await fetch("https://api.frankfurter.app/latest?from=EUR");
        if (!res.ok) throw new Error("Frankfurter unavailable");

        const data = await res.json();

        if (!cancelled) {
          setFxRates({
            ...FALLBACK_RATES,
            ...data.rates,
            EUR: 1
          });
        }
      } catch {
        if (!cancelled) {
          setFxRates(FALLBACK_RATES);
        }
      }
    }

    loadRates();

    return () => {
      cancelled = true;
    };
  }, [setFxRates]);
}
