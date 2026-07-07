const BASE_URL = "/api/fx";
const FX_CACHE_KEY = "tradeai:fx-rates:v1";
const FX_CACHE_TTL_MS = 1000 * 60 * 60 * 6;
const inFlightRequests = new Map();

export const FX_FALLBACK_RATES = Object.freeze({
  EUR: 1,
  USD: 1.08,
  GBP: 0.86,
  CAD: 1.45,
  JPY: 157,
  CHF: 0.96,
  AUD: 1.52,
  PLN: 4.3,
  SEK: 11.2,
  MXN: 18.5,
  BRL: 5.4,
  SGD: 1.44,
  INR: 89.5,
  AED: 3.97,
  SAR: 4.05,
  TRY: 34.5,
  EGP: 51.2
});

function normalizeBase(base) {
  const value = String(base || "EUR").trim().toUpperCase();
  return /^[A-Z]{3}$/.test(value) ? value : "EUR";
}

function readFxCache(base) {
  try {
    const raw = localStorage.getItem(FX_CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw);
    if (!cached || cached.base !== base || !cached.rates) return null;
    if (Date.now() - Number(cached.savedAt || 0) > FX_CACHE_TTL_MS) return null;
    return cached;
  } catch {
    return null;
  }
}

function writeFxCache(payload) {
  try {
    localStorage.setItem(FX_CACHE_KEY, JSON.stringify({
      ...payload,
      savedAt: Date.now()
    }));
  } catch {}
}

export async function fetchFrankfurterRates({
  base = "EUR",
  timeoutMs = 2500,
  preferCache = true
} = {}) {
  const safeBase = normalizeBase(base);
  const cached = preferCache ? readFxCache(safeBase) : null;

  if (cached) {
    return {
      ok: true,
      source: "frankfurter-cache",
      mode: "cache",
      base: safeBase,
      date: cached.date || null,
      rates: {
        ...cached.rates,
        [safeBase]: 1
      }
    };
  }

  const existingRequest = inFlightRequests.get(safeBase);
  if (existingRequest) {
    return existingRequest;
  }

  const request = (async () => {
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

    const payload = {
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

    writeFxCache(payload);
    return payload;
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
  })();

  inFlightRequests.set(safeBase, request);

  try {
    return await request;
  } finally {
    if (inFlightRequests.get(safeBase) === request) {
      inFlightRequests.delete(safeBase);
    }
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
