# Stadli-mini-projet

Application de gestion de files d'attentes pour des événement. L'application permet à des utilisateurs de consulter des événements et de s'inscrire à leurs listes d'attentes une fois qu'ils sont connectés. 

## Fonctionnalités

* Création de comptes utilisateurs
* Authentification avec JWT
* Consultation de tous les événements
* Consultation du détail d'un événement
* Affichage du nombre de personnes inscrites en temps réel
* Inscription à une liste d'attente
* Protection des routes nécessitant une authentification
* Déploiement sur Cloudflare Workers
* Base de données Cloudflare D1

## Technologies utilisées

### Frontend

* React
* TypeScript
* React Router
* Bootstrap
* Vite

### Backend

* Hono
* TypeScript
* Cloudflare Workers
* Cloudflare D1
* JWT
* bcryptjs

## Installation du backend

Se placer dans le dossier **api**

```bash
npm install
```

Installer les dépendances nécessaires

```bash
npm install hono
npm install hono/jwt
npm install bcryptjs
npm install dotenv
```

Installer les dépendances de développement

```bash
npm install -D wrangler
npm install -D tsx
npm install -D typescript
npm install -D @types/node
npm install -D vitest
```

## Installation du frontend

Se placer dans le dossier **client**

```bash
npm install
```

Installer les dépendances

```bash
npm install react-router-dom
npm install jwt-decode
npm install bootstrap
```

## Variables d'environnement

### Backend (.env)

```env
BASE_URL=http://127.0.0.1:8787
```

Pour utiliser l'application déployée :

```env
BASE_URL=https://api.frederick-mini-projet.workers.dev
```

### Frontend (.env)

```env
VITE_API_URL=http://127.0.0.1:8787
```

Pour utiliser l'application déployée :

```env
VITE_API_URL=https://api.frederick-mini-projet.workers.dev
```

## Lancement du projet

### Backend

Dans le dossier **api**

```bash
npm run dev
```

Le serveur sera accessible à l'adresse :

```
http://127.0.0.1:8787
```

### Frontend

Dans le dossier **client**

```bash
npm run dev
```

Le site sera accessible à l'adresse :

```
http://localhost:5173
```

## Création des tables

Dans le dossier **api**

```bash
npx wrangler d1 migrations apply stadli-mini-projet --local
```

Pour la base de données Cloudflare :

```bash
npx wrangler d1 migrations apply stadli-mini-projet --remote
```

## Données de test

Pour créer les utilisateurs, les événements et les inscriptions :

```bash
npm run seed
```

Le script supprime automatiquement les anciennes données avant de recréer les données de démonstration.

Les comptes de test utilisent tous le mot de passe :

```
Password123!
```

## Déploiement

Construire le frontend

```bash
cd client
npm run build
```

Déployer le projet

```bash
cd ../api
npx wrangler deploy
```

Application déployée :

```
https://api.frederick-mini-projet.workers.dev
```

## Tests

Les tests unitaires peuvent être exécutés avec :

```bash
npm test
```
