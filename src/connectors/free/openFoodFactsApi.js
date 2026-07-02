const BASE_URL = "https://world.openfoodfacts.org/api/v2";

export async function searchProductByBarcode(barcode) {
  const res = await fetch(`${BASE_URL}/product/${barcode}.json`);
  if (!res.ok) throw new Error("Produit introuvable.");
  return await res.json();
}

export async function searchProducts(query) {
  const res = await fetch(`${BASE_URL}/search?search_terms=${encodeURIComponent(query)}&page_size=10`);
  if (!res.ok) throw new Error("Recherche Open Food Facts impossible.");
  return await res.json();
}
