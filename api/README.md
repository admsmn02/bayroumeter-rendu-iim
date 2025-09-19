# API Bayroumètre

API backend pour l'application de vote Bayroumètre, développée avec Azure Functions et Azure Cosmos DB.

## 📋 Description

Cette API permet de gérer un système de vote en ligne avec les fonctionnalités suivantes :

- Création d'utilisateurs
- Enregistrement de votes
- Récupération des résultats de vote

## 🏗️ Architecture

L'API est construite avec :

- **Azure Functions** (Node.js) - Serverless compute
- **Azure Cosmos DB** - Base de données NoSQL
- **Jest** - Framework de tests

## 🚀 Endpoints

### POST `/api/user`

Crée un nouvel utilisateur.

**Body :**

```json
{
  "pseudo": "string",
  "email": "string"
}
```

**Réponse :**

```json
{
  "id": "user_1234567890_abcdefghi",
  "pseudo": "pseudo_utilisateur",
  "email": "user@example.com",
  "createdAt": "2025-09-19T10:30:00.000Z"
}
```

### POST `/api/vote`

Enregistre un vote pour un utilisateur.

**Body :**

```json
{
  "userId": "user_1234567890_abcdefghi",
  "choice": "oui|non"
}
```

**Réponse :**

```json
{
  "id": "vote_1234567890_abcdefghi",
  "userId": "user_1234567890_abcdefghi",
  "choice": "oui",
  "createdAt": "2025-09-19T10:35:00.000Z"
}
```

### GET `/api/votes`

Récupère tous les votes avec les noms d'utilisateur.

**Réponse :**

```json
[
  {
    "id": "vote_1234567890_abcdefghi",
    "username": "pseudo_utilisateur",
    "choice": "oui",
    "createdAt": "2025-09-19T10:35:00.000Z"
  }
]
```

## 🛠️ Installation et Configuration

### Prérequis

- Node.js (v18+)
- Azure Functions Core Tools
- Un compte Azure avec Cosmos DB

### Installation

```bash
npm install
```

### Configuration

Créez un fichier `local.settings.json` à la racine du projet :

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "COSMOS_DB_ENDPOINT": "https://your-cosmosdb.documents.azure.com:443/",
    "COSMOS_DB_KEY": "your-cosmos-db-key",
    "COSMOS_DB_DATABASE": "BayrouDB"
  }
}
```

### Variables d'environnement requises

- `COSMOS_DB_ENDPOINT` : URL de votre instance Cosmos DB
- `COSMOS_DB_KEY` : Clé d'accès Cosmos DB
- `COSMOS_DB_DATABASE` : Nom de la base de données

## 🏃‍♂️ Démarrage

### Développement local

```bash
npm start
```

L'API sera disponible sur `http://localhost:7071`

### Tests

```bash
# Lancer tous les tests
npm test

# Tests en mode watch
npm run test:watch

# Tests avec couverture
npm run test:coverage
```

## 🗄️ Base de données

L'API utilise deux conteneurs Cosmos DB :

### Conteneur `Users`

```json
{
  "id": "user_timestamp_random",
  "pseudo": "string",
  "email": "string",
  "createdAt": "ISO date string"
}
```

### Conteneur `Votes`

```json
{
  "id": "vote_timestamp_random",
  "userId": "string",
  "choice": "oui|non",
  "createdAt": "ISO date string"
}
```

## 🧪 Tests

Les tests sont configurés avec Jest et couvrent :

- Tests unitaires des fonctions Azure
- Validation des données d'entrée
- Gestion des erreurs
- Interactions avec Cosmos DB

Seuil de couverture minimum : 80%

## 📁 Structure du projet

```
api/
├── src/functions/           # Fonctions Azure
│   ├── user/               # Création d'utilisateur
│   ├── vote/               # Enregistrement de vote
│   └── votes/              # Récupération des votes
├── __tests__/              # Tests unitaires
├── host.json               # Configuration Azure Functions
├── package.json            # Dépendances et scripts
└── local.settings.json     # Configuration locale (non versionné)
```

## 📝 Licence

Ce projet est développé dans le cadre d'un projet scolaire à l'IIM.

---
