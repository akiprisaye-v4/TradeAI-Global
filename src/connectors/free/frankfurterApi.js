const BASE_URL = "/api/fx";

export const FX_FALLBACK_RATES = Object.freeze({
  EUR: 1,
  USD: 1.08,
  GBP: 0.86,
  CAD: 1.47,
  JPY: 170,
  CHF: 0.96,
  AUD: 1.63
});

function normalizeBase(base) {
  const value = String(base || "EUR").trim().toUpperCase();
  return /^[A-Z]{3}$/.test(value) ? value : "EUR";
}

export async function fetchFrankfurterRates({
  base = "EUR",
  timeoutMs = 5000
} = {}) {
  const safeBase = normalizeBase(base);
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(
      `${BASE_URL}?from=${encodeURIComponent(safeBase)}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json"
        },
        signal: controller.signal
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!data || typeof data.rates !== "object") {
      throw new Error("Invalid FX payload");
    }

    return {
      ok: true,
      source: "frankfurter",
      mode: "live",
      base: safeBase,
      date: data.date || null,
      rates: {
        ...data.rates,
        [safeBase]: 1
      }
    };
  } catch (error) {
    return {
      ok: false,
      source: "local-fallback",
      mode: "fallback",
      base: "EUR",
      date: null,
      rates: { ...FX_FALLBACK_RATES },
      error:
        error?.name === "AbortError"
          ? "timeout"
          : "network-unavailable"
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

export function getLocalFxFallback() {
  return {
    ok: true,
    source: "local-fallback",
    mode: "fallback",
    base: "EUR",
    date: null,
    rates: { ...FX_FALLBACK_RATES }
  };
}
