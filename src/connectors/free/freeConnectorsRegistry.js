export const FREE_CONNECTORS = [
  {
    id: "frankfurter",
    name: "Frankfurter",
    type: "currency",
    status: "active",
    free: true,
    description: "Taux de change gratuits basés sur l'euro.",
    endpoint: "https://api.frankfurter.app/latest"
  },
  {
    id: "rest-countries",
    name: "REST Countries",
    type: "countries",
    status: "active",
    free: true,
    description: "Pays, devises, langues et régions.",
    endpoint: "https://restcountries.com/v3.1/all"
  },
  {
    id: "open-food-facts",
    name: "Open Food Facts",
    type: "barcode",
    status: "active",
    free: true,
    description: "Recherche produit par EAN/GTIN avec images, ingrédients et Nutri-Score.",
    endpoint: "https://world.openfoodfacts.org/api/v2/product"
  },
  {
    id: "open-meteo",
    name: "Open-Meteo",
    type: "weather",
    status: "active",
    free: true,
    description: "Météo gratuite utile pour scénarios logistiques.",
    endpoint: "https://api.open-meteo.com/v1/forecast"
  },
  {
    id: "nominatim",
    name: "OpenStreetMap Nominatim",
    type: "geo",
    status: "active",
    free: true,
    description: "Géocodage et recherche de lieux.",
    endpoint: "https://nominatim.openstreetmap.org/search"
  }
];

export function getFreeConnectorsSummary() {
  return {
    total: FREE_CONNECTORS.length,
    active: FREE_CONNECTORS.filter(c => c.status === "active").length,
    free: FREE_CONNECTORS.filter(c => c.free).length,
    byType: FREE_CONNECTORS.reduce((acc, c) => {
      acc[c.type] = (acc[c.type] || 0) + 1;
      return acc;
    }, {})
  };
}
