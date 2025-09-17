# Tests unitaires avec Jest

Ce dossier contient les tests unitaires pour les Azure Functions de l'API Bayrou.

## Structure des tests

- `__tests__/user.test.js` - Tests pour la fonction de création d'utilisateur
- `__tests__/vote.test.js` - Tests pour la fonction de création de vote
- `__tests__/votes.test.js` - Tests pour la fonction de récupération des votes
- `__tests__/setup.js` - Configuration et helpers pour les tests

## Exécution des tests

```bash
# Installer les dépendances de test
npm install --save-dev jest jest-environment-node

# Exécuter tous les tests
npm test

# Exécuter les tests en mode watch
npm run test:watch

# Exécuter les tests avec couverture de code
npm run test:coverage
```

## Couverture des tests

Les tests couvrent :

### Fonction User (`src/functions/user/index.js`)

- ✅ Création d'utilisateur avec pseudo et email valides
- ✅ Génération d'ID unique pour chaque utilisateur
- ✅ Validation des paramètres requis (pseudo, email)
- ✅ Gestion des erreurs de base de données
- ✅ Gestion des erreurs de création

### Fonction Vote (`src/functions/vote/index.js`)

- ✅ Création de vote avec userId et choice valides
- ✅ Génération d'ID unique pour chaque vote
- ✅ Support de différents choix (oui, non, abstention)
- ✅ Validation des paramètres requis (userId, choice)
- ✅ Gestion des erreurs de base de données
- ✅ Gestion des erreurs de création

### Fonction Votes (`src/functions/votes/index.js`)

- ✅ Récupération des votes avec noms d'utilisateur
- ✅ Gestion des votes avec utilisateurs manquants
- ✅ Gestion des cas avec aucun vote
- ✅ Gestion des cas avec aucun utilisateur
- ✅ Requêtes correctes aux conteneurs CosmosDB
- ✅ Gestion des erreurs de base de données

## Mocking

Les tests utilisent des mocks pour :

- `@azure/cosmos` - Client CosmosDB mocké
- Variables d'environnement - Valeurs de test
- Contexte Azure Functions - Mock du contexte de réponse

## Configuration Jest

La configuration Jest dans `package.json` inclut :

- Environnement Node.js
- Setup automatique des mocks
- Couverture de code avec seuils minimums (80%)
- Exclusion des fichiers de configuration
