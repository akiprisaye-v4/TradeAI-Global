const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export async function getWeatherForecast(latitude, longitude) {
  const url = `${BASE_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,rain&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Météo indisponible.");
  return await res.json();
}
