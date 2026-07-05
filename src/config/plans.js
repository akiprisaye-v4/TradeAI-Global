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
    price: "19.99€",
    cadence: "/mois",
    status: "coming_soon",
    cta: "Accès en préparation",
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
    cta: "Accès en préparation",
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

export const PAYMENT_CONFIG = {
  mode: "paypal_manual",
  provider: "paypal",
  enabled: false,
  automaticSubscription: false,
  manualActivation: true,
  paymentUrl: "",
  status: "configuration_required"
};

export const PAYMENT_NOTICE =
  "Paiement PayPal prévu en mode manuel. Aucun paiement ni abonnement automatique n’est actif tant qu’un lien PayPal officiel n’est pas configuré.";

export const BILLING_NOTICE =
  "Le paiement sécurisé et l’espace client seront activés dans une prochaine étape. Aucun prélèvement n’est effectué actuellement.";
