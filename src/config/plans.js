export const PLANS = [
  {
    id: "free",
    name: "Gratuit",
    price: "0€",
    cadence: "pour toujours",
    status: "active",
    cta: "Déjà actif",
    features: [
      "Calcul de marge illimité",
      "10 visualisations",
      "Export PDF limité",
      "Historique local",
      "PWA mobile"
    ]
  },
  {
    id: "pro",
    name: "Pro",
    price: "14.99€",
    cadence: "/mois",
    status: "coming_soon",
    cta: "Bientôt disponible",
    features: [
      "Tout du gratuit",
      "Export PDF illimité",
      "Import CSV avancé",
      "Analyses IA avancées",
      "Comparateur multi-produits",
      "Support prioritaire"
    ]
  },
  {
    id: "elite",
    name: "Elite",
    price: "49.99€",
    cadence: "/mois",
    status: "coming_soon",
    cta: "Bientôt disponible",
    features: [
      "Tout du Pro",
      "Connecteurs marketplace avancés",
      "Alertes automatiques",
      "Formation e-commerce exclusive",
      "Accès communauté privée",
      "Fonctionnalités beta"
    ]
  }
];

export const BILLING_NOTICE =
  "Le paiement sécurisé et l’espace client seront activés dans une prochaine étape. Aucun prélèvement n’est effectué actuellement.";
