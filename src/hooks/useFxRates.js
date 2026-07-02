import { useEffect } from "react";

export default function useFxRates(setFxRates) {
  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/EUR")
      .then(res => res.json())
      .then(data => setFxRates(data.rates))
      .catch(err => console.log("FX API unavailable", err));
  }, [setFxRates]);
}
