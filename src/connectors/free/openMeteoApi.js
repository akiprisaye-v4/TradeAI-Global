const BASE_URL = "https://api.open-meteo.com/v1/forecast";

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

export async function getWeatherForecast(latitude, longitude) {
  const url = `${BASE_URL}?latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}&current=temperature_2m,wind_speed_10m,rain&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;
  return fetchJson(url, "Météo indisponible.");
}
