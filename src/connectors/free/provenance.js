export function makeLiveApiResult({ source, endpoint, data, meta = {} }) {
  return {
    ok: true,
    provenance: "LIVE_API",
    source,
    endpoint,
    checkedAt: new Date().toISOString(),
    meta,
    data
  };
}

export function makeConnectorError({ source, endpoint, error }) {
  return {
    ok: false,
    provenance: "ERROR",
    source,
    endpoint,
    checkedAt: new Date().toISOString(),
    error: error?.message || "Erreur inconnue"
  };
}

export function summarizePayload(data) {
  if (Array.isArray(data)) {
    return { type: "array", count: data.length };
  }

  if (data && typeof data === "object") {
    return { type: "object", keys: Object.keys(data).slice(0, 8) };
  }

  return { type: typeof data };
}
