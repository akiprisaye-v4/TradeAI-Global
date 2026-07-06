# TradeAI Global v7 Architecture

Objectif : transformer App.jsx en application modulaire.

## Dossiers

- src/pages : écrans principaux
- src/layouts : layout global et navigation
- src/components : composants réutilisables
- src/services : accès données/API futures
- src/hooks : hooks React
- src/store : état global
- src/modules : registre modulaire
- src/config : configuration globale

## Modes de données

- demo : données simulées
- local : données saisies/importées
- api : futures API externes

## Priorité

1. Stabiliser v6.1-integration
2. Découper App.jsx progressivement
3. Migrer les panneaux vers src/pages
4. Ajouter services et store global
5. Préparer v7.0
