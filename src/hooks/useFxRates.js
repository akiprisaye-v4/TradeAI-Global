import { useEffect } from "react";
import { fetchFrankfurterRates, getLocalFxFallback } from "../connectors/free/frankfurterApi";

export default function useFxRates(setFxRates) {
  useEffect(() => {
    let cancelled = false;

    fetchFrankfurterRates()
      .then((data) => {
        if (cancelled) return;
        setFxRates(data?.rates || getLocalFxFallback().rates);
      })
      .catch(() => {
        if (!cancelled) {
          setFxRates(getLocalFxFallback().rates);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [setFxRates]);
}
