# CRM Cold Calling - Coachs Sportifs

Application CRM de cold calling 100% responsive (mobile-first) pour gérer une liste de coachs sportifs et effectuer de la prospection directement depuis un téléphone.

## 🎯 Fonctionnalités

- **Dashboard** : Statistiques en temps réel (total leads, appels effectués, taux de décroché, intéressés, rappels)
- **Filtres avancés** : Recherche par nom/ville, filtrage par ville, statut, note minimum
- **Tri** : Par nombre d'avis, note, ville ou statut
- **Gestion des leads** : 
  - Appel direct depuis l'application (lien `tel:`)
  - Mise à jour du statut (Pas décroché, Rappel, Refus, Intéressé, RDV fixé)
  - Notes personnalisées après chaque appel
  - Planification de rappels avec sélection rapide (+1, +3, +7 jours)
- **Persistance** : Toutes les données sont sauvegardées automatiquement dans le localStorage du navigateur
- **Responsive** : Interface optimisée pour mobile et desktop

## 🚀 Installation et lancement

### Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn

### Installation

```bash
npm install
```

### Lancement en développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Build de production

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `dist/`.

### Prévisualisation de la build

```bash
npm run preview
```

## 📱 Utilisation

1. **Dashboard** : Consultez les statistiques en haut de la page
2. **Filtres** : Utilisez les filtres pour trouver rapidement les leads qui vous intéressent
3. **Appeler** : Cliquez sur le bouton "Appeler" pour lancer l'appel depuis votre téléphone
4. **Mettre à jour le statut** : Après l'appel, cliquez sur le statut approprié
5. **Ajouter des notes** : Saisissez vos notes dans le champ prévu à cet effet
6. **Planifier un rappel** : Si le statut est "Rappel", sélectionnez une date de rappel

## 💾 Stockage des données

Toutes les données sont stockées localement dans le navigateur via `localStorage` avec la clé `crm_coachs_nantes_v1`. Aucune donnée n'est envoyée à un serveur externe.

**Important** : Les données sont stockées uniquement dans le navigateur. Si vous supprimez les données du navigateur ou changez de navigateur/appareil, vous perdrez vos données.

## 🛠️ Technologies utilisées

- **React 18** : Bibliothèque UI
- **TypeScript** : Typage statique
- **Vite** : Build tool et serveur de développement
- **TailwindCSS** : Framework CSS utilitaire
- **localStorage** : Persistance des données côté client

## 📝 Structure du projet

```
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx      # Composant du tableau de bord
│   │   ├── Filters.tsx        # Composant des filtres
│   │   └── LeadCard.tsx       # Composant de carte de lead
│   ├── utils/
│   │   ├── storage.ts         # Utilitaires pour localStorage
│   │   └── transform.ts       # Transformation des données
│   ├── types.ts               # Types TypeScript
│   ├── data.ts                # Données initiales (rawLeads)
│   ├── App.tsx                # Composant principal
│   ├── main.tsx               # Point d'entrée
│   └── index.css              # Styles globaux
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

## 🎨 Statuts et couleurs

- **Pas décroché** : Gris
- **Rappel** : Orange
- **Refus** : Rouge
- **Intéressé** : Bleu
- **RDV fixé** : Vert

## 📄 Licence

Ce projet est fourni tel quel pour un usage personnel ou professionnel.

