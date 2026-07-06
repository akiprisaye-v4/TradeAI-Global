const BASE_URL = "https://world.openfoodfacts.org/api/v2";

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

export async function searchProductByBarcode(barcode) {
  return fetchJson(
    `${BASE_URL}/product/${encodeURIComponent(barcode)}.json`,
    "Produit introuvable."
  );
}

export async function searchProducts(query) {
  return fetchJson(
    `${BASE_URL}/search?search_terms=${encodeURIComponent(query)}&page_size=10`,
    "Recherche Open Food Facts impossible."
  );
}
