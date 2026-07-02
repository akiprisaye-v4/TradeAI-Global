const BASE_URL = "https://nominatim.openstreetmap.org/search";

export async function geocodePlace(query) {
  const url = `${BASE_URL}?q=${encodeURIComponent(query)}&format=json&limit=5`;
  const res = await fetch(url, {
    headers: {
      "Accept": "application/json"
    }
  });
  if (!res.ok) throw new Error("Géocodage indisponible.");
  return await res.json();
}
