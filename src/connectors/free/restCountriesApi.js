const BASE_URL = "https://restcountries.com/v3.1";

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

export async function getAllCountries() {
  return fetchJson(
    `${BASE_URL}/all?fields=name,cca2,flags,currencies,languages,region,capital,population`,
    "Impossible de récupérer les pays."
  );
}

export async function searchCountry(name) {
  return fetchJson(
    `${BASE_URL}/name/${encodeURIComponent(name)}`,
    "Pays introuvable."
  );
}
