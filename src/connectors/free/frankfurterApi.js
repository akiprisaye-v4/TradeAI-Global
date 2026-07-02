const BASE_URL = "https://api.frankfurter.app";

export async function getLatestRates(base = "EUR") {
  const res = await fetch(`${BASE_URL}/latest?from=${base}`);

  if (!res.ok) {
    throw new Error("Impossible de récupérer les taux de change.");
  }

  return await res.json();
}

export async function convertCurrency(from, to, amount) {
  const res = await fetch(
    `${BASE_URL}/latest?amount=${amount}&from=${from}&to=${to}`
  );

  if (!res.ok) {
    throw new Error("Conversion impossible.");
  }

  return await res.json();
}
