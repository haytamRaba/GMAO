# GMAO Frontend - Gestion de Maintenance Assistée par Ordinateur

## 📋 Description

Application web frontend pour la gestion de maintenance hospitalière (GMAO). Cette application permet de gérer les équipements médicaux, les interventions de maintenance, et le stock de consommables et pièces de rechange.

## 🚀 Technologies Utilisées

- **React 18** - Bibliothèque UI
- **Vite** - Build tool et serveur de développement
- **React Router v6** - Gestion du routing
- **CSS3** - Styling avec design moderne et responsive

## 📁 Structure du Projet

```
Client/
├── src/
│   ├── pages/                      # Pages de l'application
│   │   ├── Login/
│   │   │   ├── Login.jsx
│   │   │   └── Login.css
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.jsx
│   │   │   └── Dashboard.css
│   │   ├── Equipments/
│   │   │   ├── Equipments.jsx
│   │   │   └── Equipments.css
│   │   ├── Interventions/
│   │   │   ├── Interventions.jsx
│   │   │   └── Interventions.css
│   │   └── Stock/
│   │       ├── Stock.jsx
│   │       └── Stock.css
│   ├── components/                 # Composants réutilisables
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.css
│   │   ├── Table/
│   │   │   ├── Table.jsx
│   │   │   └── Table.css
│   │   ├── Modal/
│   │   │   ├── Modal.jsx
│   │   │   └── Modal.css
│   │   └── Card/
│   │       ├── Card.jsx
│   │       └── Card.css
│   ├── services/                   # Services API
│   │   ├── authService.js
│   │   ├── equipmentService.js
│   │   ├── interventionService.js
│   │   └── stockService.js
│   ├── context/                    # Contextes React
│   │   └── AuthContext.jsx
│   ├── utils/                      # Utilitaires
│   │   └── mockData.js
│   ├── App.jsx                     # Composant principal
│   ├── App.css                     # Styles globaux
│   └── main.jsx                    # Point d'entrée
├── public/
├── index.html
├── package.json
└── vite.config.js
```

## 🎯 Fonctionnalités

### 1. Authentification
- Page de connexion avec validation de formulaire
- Gestion de session avec localStorage
- Contrôle d'accès basé sur les rôles

### 2. Tableau de Bord
- Statistiques en temps réel (équipements, interventions, alertes stock)
- Activités récentes
- Actions rapides pour les administrateurs

### 3. Gestion des Équipements
- Liste complète des équipements médicaux
- Recherche et filtrage par statut
- CRUD complet (Créer, Lire, Modifier, Supprimer)
- Contrôle d'accès par rôle

### 4. Gestion des Interventions
- Suivi des interventions de maintenance
- Types: Préventive, Corrective, Urgente
- Assignation de techniciens
- Suivi de statut (En attente, En cours, Terminée)
- Gestion des priorités

### 5. Gestion du Stock
- Inventaire des consommables et pièces de rechange
- Alertes de stock bas
- Suivi des fournisseurs et prix
- Calcul de la valeur totale du stock

## 👥 Rôles Utilisateurs

1. **Admin** - Accès complet à toutes les fonctionnalités
2. **Ingénieur Biomédical** - Gestion des équipements et interventions
3. **Technicien** - Consultation et exécution des interventions
4. **Chef de Service** - Consultation et création d'interventions

## 🔐 Comptes de Test

Utilisez ces identifiants pour tester l'application:

| Email | Mot de passe | Rôle |
|-------|--------------|------|
| admin@hopital.fr | admin123 | Admin |
| jean.dupont@hopital.fr | tech123 | Technicien |
| marie.martin@hopital.fr | ing123 | Ingénieur Biomédical |
| pierre.durand@hopital.fr | chef123 | Chef de Service |

## 🛠️ Installation et Démarrage

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn

### Étapes d'installation

1. **Naviguer vers le dossier Client**
   ```bash
   cd Client
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Démarrer le serveur de développement**
   ```bash
   npm run dev
   ```

4. **Ouvrir l'application**
   - L'application sera accessible sur `http://localhost:5173`
   - Utilisez les identifiants de test pour vous connecter

## 📦 Scripts Disponibles

- `npm run dev` - Démarre le serveur de développement
- `npm run build` - Compile l'application pour la production
- `npm run preview` - Prévisualise la version de production
- `npm run lint` - Vérifie le code avec ESLint

## 🎨 Composants Réutilisables

### Table
Composant de tableau réutilisable avec:
- Tri et filtrage
- Actions personnalisables par ligne
- Design responsive
- Rendu personnalisé des cellules

### Modal
Composant modal réutilisable avec:
- Fermeture sur Escape ou clic backdrop
- Animation fluide
- Support des formulaires
- Responsive

### Card
Composant carte pour statistiques avec:
- Icônes personnalisables
- Couleurs thématiques
- Animation au survol

## 🔌 Intégration Backend

L'application utilise actuellement des **données mockées** pour le développement. Pour intégrer un vrai backend:

1. Décommenter les imports axios dans les fichiers services
2. Configurer l'URL de l'API dans chaque service
3. Remplacer les fonctions mock par les appels API axios

Exemple dans `equipmentService.js`:
```javascript
// Décommenter:
import axios from "axios";
const API_URL = "http://localhost:5000/api";

// Remplacer:
export const getEquipments = async () => {
  const response = await axios.get(`${API_URL}/equipments`);
  return response.data;
};
```

## 📱 Responsive Design

L'application est entièrement responsive et optimisée pour:
- 💻 Desktop (1024px et plus)
- 📱 Tablettes (768px - 1023px)
- 📱 Mobile (320px - 767px)

## 🐛 Résolution de Problèmes

### L'application ne démarre pas
- Vérifiez que Node.js est installé: `node --version`
- Supprimez `node_modules` et réinstallez: `rm -rf node_modules && npm install`

### Erreurs de routing
- Assurez-vous que `react-router-dom` est installé
- Vérifiez la version dans package.json

### Les données ne s'affichent pas
- Ouvrez la console du navigateur (F12)
- Vérifiez les erreurs JavaScript
- Confirmez que vous êtes connecté avec un compte valide

---

**Version**: 1.0.0  
**Dernière mise à jour**: Janvier 2026

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
