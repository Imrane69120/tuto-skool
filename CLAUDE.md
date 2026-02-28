# Productivity App — Instructions Claude

## Description du projet
Application de productivité personnelle permettant de suivre :
- Les tâches (To-Do List)
- Les nuits de sommeil
- Les données de productivité générale (focus, énergie, humeur, objectifs)

## Design System

### Palette de couleurs
- **Fond principal** : `#000000` (noir)
- **Fond secondaire** : `#111111` / `#1a1a1a` (noir doux)
- **Texte principal** : `#FFFFFF` (blanc)
- **Texte secondaire** : `#AAAAAA` (gris clair)
- **Bordures / séparateurs** : `#333333`
- **Bouton primaire (action principale)** : `#2563EB` (bleu)
- **Bouton danger / suppression** : `#DC2626` (rouge)
- **Hover bouton bleu** : `#1D4ED8`
- **Hover bouton rouge** : `#B91C1C`

### Règles de design
- Thème strictement noir et blanc, aucune autre couleur de fond
- Seuls les boutons utilisent le bleu et le rouge
- Interface épurée, minimaliste
- Typographie claire, lisible sur fond sombre
- Pas d'images décoratives, pas de gradients colorés

## Fonctionnalités

### 1. To-Do List
- Ajouter / modifier / supprimer des tâches
- Marquer une tâche comme complétée
- Priorité : haute, moyenne, basse
- Date d'échéance optionnelle
- Catégories (travail, perso, santé, etc.)

### 2. Suivi du Sommeil
- Heure de coucher et de lever
- Calcul automatique de la durée de sommeil
- Qualité du sommeil (1 à 5)
- Notes optionnelles (rêves, perturbations)
- Historique et moyennes hebdomadaires

### 3. Dashboard Productivité
- Score de productivité journalier (1 à 10)
- Niveau d'énergie (1 à 10)
- Niveau de focus (1 à 10)
- Humeur (1 à 5)
- Objectif du jour (texte libre)
- Bilan du jour (texte libre)

### 4. Statistiques & Visualisations
- Graphiques simples en noir/blanc
- Tendances sur 7 jours, 30 jours
- Corrélation sommeil / productivité

## Stack technique (à valider)
- **Framework** : Next.js (App Router)
- **Styling** : Tailwind CSS
- **Base de données** : localStorage (MVP) puis Supabase
- **Langage** : TypeScript
- **Graphiques** : Recharts ou Chart.js

## Conventions de code
- Composants React en PascalCase (`SleepCard.tsx`)
- Fichiers utilitaires en camelCase (`formatDate.ts`)
- Dossiers en kebab-case (`sleep-tracker/`)
- Types TypeScript explicites, pas de `any`
- Pas de commentaires évidents, seulement si la logique est complexe

## Structure des dossiers
```
src/
  app/           → pages Next.js (App Router)
  components/    → composants réutilisables
    ui/          → boutons, inputs, cards génériques
    todo/        → composants spécifiques todo
    sleep/       → composants spécifiques sommeil
    dashboard/   → composants productivité
  lib/           → utilitaires, helpers
  types/         → interfaces TypeScript
  hooks/         → custom React hooks
```

## Règles importantes
- Ne jamais committer automatiquement sans confirmation explicite
- Toujours garder le design en noir/blanc strict
- Le bleu (`#2563EB`) est réservé aux actions positives (valider, ajouter, sauvegarder)
- Le rouge (`#DC2626`) est réservé aux actions destructives (supprimer, annuler)
- Responsive en priorité : mobile d'abord
- Accessibilité : contrastes suffisants sur fond noir
