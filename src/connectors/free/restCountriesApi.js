const BASE_URL = "https://restcountries.com/v3.1";

export async function getAllCountries() {
  const res = await fetch(`${BASE_URL}/all?fields=name,cca2,flags,currencies,languages,region,capital,population`);
  if (!res.ok) throw new Error("Impossible de récupérer les pays.");
  return await res.json();
}

export async function searchCountry(name) {
  const res = await fetch(`${BASE_URL}/name/${encodeURIComponent(name)}`);
  if (!res.ok) throw new Error("Pays introuvable.");
  return await res.json();
}
