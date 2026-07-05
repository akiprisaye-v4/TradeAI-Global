const BASE_URL = "https://nominatim.openstreetmap.org/search";

async function fetchJson(url, errorMessage, timeoutMs = 7000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      headers: {
        Accept: "application/json"
      },
      signal: controller.signal
    });

    if (!res.ok) {
      throw new Error(`${errorMessage} HTTP ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    if (error?.name === "AbortError") {
      throw new Error(`${errorMessage} Délai dépassé.`);
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function geocodePlace(query) {
  const url = `${BASE_URL}?q=${encodeURIComponent(query)}&format=json&limit=5`;
  return fetchJson(url, "Géocodage indisponible.");
}
