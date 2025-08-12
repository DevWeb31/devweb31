# 🤝 Guide de Contribution

**⚠️ Note importante** : Ce projet est la propriété exclusive de **Damien Oriente (Damiodev)**. Les contributions externes ne sont pas acceptées actuellement.

Ce document est fourni à titre informatif pour comprendre l'architecture et les standards de code utilisés dans ce projet privé.

## 📋 Table des Matières

- [Code de Conduite](#code-de-conduite)
- [Comment Contribuer](#comment-contribuer)
- [Guide de Développement](#guide-de-développement)
- [Standards de Code](#standards-de-code)
- [Tests](#tests)
- [Pull Request](#pull-request)

## 📜 Code de Conduite

Ce projet et tous ses participants sont régis par notre Code de Conduite. En participant, vous acceptez de respecter ce code.

## 🚀 Comment Signaler des Problèmes

### Signaler un Bug

1. Vérifiez que le bug n'a pas déjà été signalé dans les [Issues](https://github.com/Damiodev/devweb31/issues)
2. Créez une nouvelle issue avec le label `bug`
3. Utilisez le template de bug et fournissez :
   - Description claire du problème
   - Étapes pour reproduire
   - Comportement attendu vs observé
   - Version du navigateur/OS
   - Captures d'écran si applicable

### Proposer une Fonctionnalité

1. Créez une issue avec le label `enhancement`
2. Décrivez clairement la fonctionnalité souhaitée
3. Expliquez pourquoi cette fonctionnalité serait utile
4. Proposez une approche technique si possible

### ⚠️ Contributions Externes

**Actuellement, ce projet n'accepte pas de contributions externes de code.**  
Cependant, vos suggestions et signalements de bugs sont les bienvenus et contribuent à améliorer la qualité du projet.

## 💻 Guide de Développement

### Configuration de l'Environnement

```bash
# Cloner votre fork
git clone https://github.com/votre-username/devweb31.git
cd devweb31

# Installer les dépendances
npm install

# Configurer l'environnement
cp .env.example .env.local
# Éditer .env.local avec vos clés

# Lancer en mode développement
npm run dev
```

### Structure des Branches

- `main` - Code de production stable
- `develop` - Branche de développement
- `feature/*` - Nouvelles fonctionnalités
- `bugfix/*` - Corrections de bugs
- `hotfix/*` - Corrections urgentes

### Convention de Nommage des Branches

```
feature/nom-de-la-fonctionnalite
bugfix/description-du-bug
hotfix/urgence-description
```

## 📝 Standards de Code

### TypeScript

- Utilisez le typage strict
- Évitez `any` - utilisez des types spécifiques
- Documentez les interfaces complexes
- Utilisez les types utilitaires quand approprié

### React

- Utilisez les hooks fonctionnels
- Évitez les composants de classe
- Utilisez `React.FC` pour typer les composants
- Implémentez `React.memo` pour l'optimisation

### CSS/Tailwind

- Privilégiez les classes Tailwind
- Utilisez des composants pour la réutilisabilité
- Respectez la hiérarchie des couleurs
- Maintenez la cohérence du design

### ESLint

- Respectez les règles ESLint configurées
- Corrigez tous les warnings avant de soumettre
- Utilisez `npm run lint` pour vérifier

## 🧪 Tests

### Tests Unitaires

```bash
# Lancer les tests
npm test

# Tests en mode watch
npm run test:watch

# Couverture de code
npm run test:coverage
```

### Tests d'Intégration

- Testez les interactions utilisateur
- Vérifiez la responsivité
- Testez les différents navigateurs
- Validez l'accessibilité

## 🔄 Pull Request

**⚠️ Note** : Ce projet étant privé, les Pull Requests externes ne sont pas acceptées actuellement.

### Processus de Développement Interne

1. **Tests** : Tous les tests passent
2. **Linting** : Aucune erreur ESLint
3. **Build** : L'application se construit sans erreur
4. **Responsive** : Testé sur mobile et desktop
5. **Accessibilité** : Respect des standards WCAG

### Standards de Qualité

- **Code Review** : Auto-review obligatoire
- **Tests** : Validation des tests manuels
- **Documentation** : Mise à jour des docs si nécessaire
- **Performance** : Vérification des métriques

## 📚 Ressources

- [Documentation React](https://reactjs.org/docs/)
- [Guide TypeScript](https://www.typescriptlang.org/docs/)
- [Documentation Tailwind](https://tailwindcss.com/docs)
- [Standards d'Accessibilité](https://www.w3.org/WAI/WCAG21/quickref/)

## 🆘 Besoin d'Aide ?

- Consultez les [Issues](https://github.com/Damiodev/devweb31/issues)
- Lisez la [documentation](README.md)
- Contactez-nous via [email](mailto:contact@devweb31.fr)

---

**Merci de votre intérêt pour DevWeb31 ! 🎉**

> **Note** : Ce projet est privé et appartient à Damien Oriente (Damiodev).  
> Pour toute question ou suggestion, n'hésitez pas à créer une issue ou à nous contacter.
