# 🤝 Guide de Contribution

Merci de votre intérêt pour contribuer au projet DevWeb31 ! Ce document vous guidera à travers le processus de contribution.

## 📋 Table des Matières

- [Code de Conduite](#code-de-conduite)
- [Comment Contribuer](#comment-contribuer)
- [Guide de Développement](#guide-de-développement)
- [Standards de Code](#standards-de-code)
- [Tests](#tests)
- [Pull Request](#pull-request)

## 📜 Code de Conduite

Ce projet et tous ses participants sont régis par notre Code de Conduite. En participant, vous acceptez de respecter ce code.

## 🚀 Comment Contribuer

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

### Contribuer au Code

1. Fork le repository
2. Créez une branche pour votre fonctionnalité
3. Développez votre contribution
4. Testez vos changements
5. Soumettez une Pull Request

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

### Avant de Soumettre

1. **Tests** : Tous les tests passent
2. **Linting** : Aucune erreur ESLint
3. **Build** : L'application se construit sans erreur
4. **Responsive** : Testé sur mobile et desktop
5. **Accessibilité** : Respect des standards WCAG

### Template de Pull Request

```markdown
## 📝 Description
Description claire des changements apportés

## 🔗 Issue liée
Closes #(numéro de l'issue)

## ✅ Checklist
- [ ] Tests ajoutés/mis à jour
- [ ] Documentation mise à jour
- [ ] Code linté et formaté
- [ ] Responsive design vérifié
- [ ] Accessibilité testée

## 📸 Captures d'écran
Si applicable, ajoutez des captures d'écran

## 🧪 Tests
Description des tests effectués

## 📱 Responsive
- [ ] Desktop
- [ ] Tablet
- [ ] Mobile

## ♿ Accessibilité
- [ ] Navigation clavier
- [ ] Lecteurs d'écran
- [ ] Contraste des couleurs
```

### Processus de Review

1. **Automatique** : Les checks CI/CD doivent passer
2. **Code Review** : Au moins un maintainer doit approuver
3. **Tests** : Validation des tests manuels
4. **Merge** : Une fois approuvé, merge dans `develop`

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

**Merci de contribuer à DevWeb31 ! 🎉**
