const BLOCKED_REASON =
  "REST Countries est bloqué : l’API publique v3 est dépréciée et la v5 nécessite une clé API.";

function createBlockedError() {
  const error = new Error(BLOCKED_REASON);
  error.code = "REST_COUNTRIES_REQUIRES_API_KEY";
  return error;
}

export async function getAllCountries() {
  throw createBlockedError();
}

export async function searchCountry() {
  throw createBlockedError();
}
