const UPSTREAM = "https://api.frankfurter.dev/v1";

function isCurrency(value) {
  return typeof value === "string" && /^[A-Z]{3}$/.test(value);
}

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false, error: "METHOD_NOT_ALLOWED" });
  }

  const from = String(req.query?.from || "EUR").trim().toUpperCase();
  const toRaw = String(req.query?.to || "").trim().toUpperCase();

  if (!isCurrency(from)) {
    return res.status(400).json({ ok: false, error: "INVALID_FROM_CURRENCY" });
  }

  const params = new URLSearchParams({ from });

  if (toRaw) {
    const to = toRaw.split(",").map(x => x.trim()).filter(Boolean);
    if (!to.length || to.some(code => !isCurrency(code))) {
      return res.status(400).json({ ok: false, error: "INVALID_TO_CURRENCY" });
    }
    params.set("to", to.join(","));
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(`${UPSTREAM}/latest?${params.toString()}`, {
      headers: { Accept: "application/json" },
      signal: controller.signal
    });

    if (!response.ok) {
      return res.status(502).json({
        ok: false,
        error: "FX_UPSTREAM_ERROR",
        upstreamStatus: response.status
      });
    }

    const data = await response.json();

    if (!data?.base || !data?.rates || typeof data.rates !== "object") {
      return res.status(502).json({ ok: false, error: "FX_INVALID_UPSTREAM_PAYLOAD" });
    }

    return res.status(200).json({
      ok: true,
      source: "Frankfurter",
      date: data.date || null,
      base: data.base,
      rates: data.rates
    });
  } catch (error) {
    return res.status(error?.name === "AbortError" ? 504 : 502).json({
      ok: false,
      error: error?.name === "AbortError" ? "FX_UPSTREAM_TIMEOUT" : "FX_UPSTREAM_UNAVAILABLE"
    });
  } finally {
    clearTimeout(timeout);
  }
}
