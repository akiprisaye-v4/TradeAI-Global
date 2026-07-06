export const IMPORT_CONNECTORS = [
  {
    id: "amazon-csv",
    name: "Rapport marketplace CSV",
    type: "csv",
    status: "planned",
    description: "Import manuel des rapports marketplace et ventes."
  },
  {
    id: "supplier-csv",
    name: "Catalogue fournisseur CSV",
    type: "csv",
    status: "planned",
    description: "Import de catalogues fournisseurs, prix, MOQ et délais."
  },
  {
    id: "invoice-xlsx",
    name: "Factures Excel",
    type: "xlsx",
    status: "planned",
    description: "Analyse de factures et coûts fournisseurs."
  },
  {
    id: "freight-quote",
    name: "Devis transport",
    type: "pdf/csv",
    status: "planned",
    description: "Import de devis logistiques pour calcul du coût rendu."
  }
];

export function getImportConnectorsSummary() {
  return {
    total: IMPORT_CONNECTORS.length,
    planned: IMPORT_CONNECTORS.filter(c => c.status === "planned").length
  };
}
