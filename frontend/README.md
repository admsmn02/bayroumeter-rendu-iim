# 🗳️ BayrouMeter

**Le baromètre de la nostalgie politique française**

BayrouMeter est une application web interactive permettant de sonder l'opinion publique sur François Bayrou et de visualiser les résultats en temps réel avec des graphiques dynamiques.

![BayrouMeter Preview](https://img.shields.io/badge/Status-Active-brightgreen)
![React](https://img.shields.io/badge/React-19.1.1-blue)
![Chart.js](https://img.shields.io/badge/Chart.js-4.5.0-orange)

## ✨ Fonctionnalités

- 👤 **Système d'authentification** : Connexion simple avec pseudo et email
- 🗳️ **Vote interactif** : Interface intuitive pour exprimer son opinion (Oui/Non)
- 📊 **Visualisation en temps réel** : Graphiques animés (camembert et barres) avec Chart.js
- 🎉 **Animations** : Effets de confettis lors du vote et animations arc-en-ciel
- 📱 **Design responsive** : Interface adaptée mobile et desktop
- 🔄 **Actualisation automatique** : Résultats mis à jour toutes les 5 secondes
- 🎨 **Interface moderne** : Design épuré avec des micro-interactions

## 🛠️ Technologies utilisées

### Frontend

- **React 19.1.1** - Framework JavaScript
- **Chart.js 4.5.0** - Bibliothèque de graphiques
- **react-chartjs-2** - Intégration React pour Chart.js
- **Axios** - Client HTTP pour les appels API
- **CSS3** - Animations et styles personnalisés

### Tests

- **@testing-library/react** - Tests unitaires et d'intégration
- **Jest** - Framework de tests

## 🚀 Installation et démarrage

### Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn
- API Backend fonctionnelle

### Installation

1. **Cloner le repository**

   ```bash
   git clone https://github.com/admsmn02/bayroumeter-rendu-iim.git
   cd bayroumeter-rendu-iim/frontend
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   ```

3. **Configurer l'API**

   L'application attend une API backend accessible à `/api` avec les endpoints suivants :

   - `POST /api/user` - Création d'utilisateur
   - `POST /api/vote` - Envoi d'un vote
   - `GET /api/votes` - Récupération des votes

4. **Démarrer l'application**

   ```bash
   npm start
   ```

   L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📱 Utilisation

### Interface utilisateur

1. **Page de connexion**

   - Saisir un pseudo et un email
   - Validation côté client pour les champs obligatoires

2. **Page de vote**

   - Interface claire avec deux options : "Oui" ou "Non"
   - Animation de confirmation après vote
   - Possibilité de voter à nouveau après 3 secondes

3. **Visualisation des résultats**
   - Graphiques en camembert et en barres
   - Pourcentages en temps réel
   - Actualisation automatique toutes les 5 secondes
   - Statistiques détaillées

### Fonctionnalités spéciales

- **Easter Egg** : Cliquer sur l'avatar ou le titre pour déclencher l'effet arc-en-ciel 🌈
- **Confettis** : Animation automatique lors de la validation d'un vote
- **Responsive Design** : Adapté aux écrans mobiles et tablettes

## 🧪 Tests

Lancer les tests unitaires :

```bash
npm test
```

Lancer les tests en mode coverage :

```bash
npm test -- --coverage
```

## 🏗️ Build de production

Créer une version optimisée pour la production :

```bash
npm run build
```

Les fichiers seront générés dans le dossier `build/` et prêts pour le déploiement.

## 🎨 Structure du projet

```
src/
├── components/
│   ├── Login.js          # Composant de connexion
│   ├── Vote.js           # Interface de vote
│   ├── Results.js        # Affichage des résultats
│   ├── VoteChart.js      # Graphiques Chart.js
│   └── Confetti.js       # Animation de confettis
├── api.js                # Configuration Axios et endpoints
├── App.js                # Composant principal
├── App.css               # Styles globaux
└── index.js              # Point d'entrée React
```

## 🎯 API Endpoints

L'application communique avec une API REST :

### POST /api/user

Création d'un nouvel utilisateur

```json
{
  "pseudo": "string",
  "email": "string"
}
```

### POST /api/vote

Envoi d'un vote

```json
{
  "userId": "string",
  "choice": "Oui" | "Non"
}
```

### GET /api/votes

Récupération de tous les votes

```json
[
  {
    "id": "string",
    "userId": "string",
    "choice": "Oui" | "Non",
    "timestamp": "date"
  }
]
```

## 🎨 Personnalisation

### Thème et couleurs

Les variables CSS principales se trouvent dans `App.css` :

- Couleur primaire : `#4299e1`
- Couleur de succès : `#48bb78`
- Couleurs du graphique : personnalisables dans `VoteChart.js`

### Animations

- **Durée des confettis** : Modifiable dans `Vote.js` (ligne `setTimeout`)
- **Fréquence d'actualisation** : Configurable dans `Results.js` (5000ms par défaut)
- **Animations CSS** : Définies dans `App.css`

## 🔧 Configuration avancée

### Variables d'environnement

Créer un fichier `.env` à la racine :

```
REACT_APP_API_BASE_URL=http://localhost:7071
REACT_APP_REFRESH_INTERVAL=5000
```

### Proxy de développement

Le proxy vers l'API est configuré dans `package.json` ou via un fichier `setupProxy.js`.

## 🚀 Déploiement

### Build statique

```bash
npm run build
npm install -g serve
serve -s build -l 3000
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📝 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

**Adam Simon** - Projet IIM - 2025

---

_BayrouMeter - Parce que même en politique, l'opinion compte ! 🗳️_

```

```
