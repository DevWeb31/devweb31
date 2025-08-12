# Guide de Configuration des Environnements

Ce guide vous explique comment configurer et utiliser les différents environnements pour le développement et la production de votre site DevWeb31.

## 🎯 Objectif

Séparer complètement vos environnements de développement et de production pour :
- Développer localement sans affecter la base de données de production
- Éviter les déploiements automatiques lors du développement
- Avoir des configurations et fonctionnalités différentes selon l'environnement

## 🏗️ Architecture

### Environnements disponibles
- **Développement** : Pour le développement local
- **Production** : Pour le site déployé sur Vercel

### Séparation des bases de données
- **Base de développement** : Pour vos tests et modifications
- **Base de production** : Pour votre site en ligne

## 📁 Fichiers de configuration

### 1. Variables d'environnement

#### `.env.development` (à créer localement)
```bash
# Base de données de développement
VITE_SUPABASE_URL_DEV=https://votre-projet-dev.supabase.co
VITE_SUPABASE_ANON_KEY_DEV=votre_cle_anon_dev
VITE_ENV=development
```

#### `.env.production` (pour Vercel)
```bash
# Base de données de production
VITE_SUPABASE_URL=https://votre-projet-prod.supabase.co
VITE_SUPABASE_ANON_KEY=votre_cle_anon_prod
VITE_ENV=production
```

### 2. Fichiers d'exemple
- `env.development.example` : Modèle pour l'environnement de développement
- `env.production.example` : Modèle pour l'environnement de production

## 🚀 Utilisation

### Développement local
```bash
# Démarrer en mode développement (utilise .env.development)
npm run dev:local

# Ou avec la variable d'environnement
VITE_ENV=development npm run dev
```

### Production
```bash
# Démarrer en mode production (utilise .env.production)
npm run dev:prod

# Build pour la production
npm run build:prod
```

### Développement standard
```bash
# Utilise les variables par défaut
npm run dev
```

## 🔧 Configuration Supabase

### 1. Créer un projet de développement
1. Allez sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet pour le développement
3. Notez l'URL et la clé anonyme

### 2. Configurer les variables locales
```bash
# Copier le fichier d'exemple
cp env.development.example .env.development

# Éditer avec vos vraies valeurs
nano .env.development
```

### 3. Vérifier la configuration
L'indicateur d'environnement (coin inférieur droit) doit afficher "Développement"

## 📊 Différences entre environnements

| Fonctionnalité | Développement | Production |
|----------------|---------------|------------|
| Base de données | Base de dev | Base de prod |
| Mode debug | ✅ Activé | ❌ Désactivé |
| Analytics | ❌ Désactivé | ✅ Activé |
| Logs détaillés | ✅ Activé | ❌ Désactivé |
| Timeout API | 10s | 15s |

## 🚨 Sécurité

### Fichiers à ne JAMAIS commiter
- `.env.development`
- `.env.production`
- `.env.local`
- Tous les fichiers `.env*`

### Fichiers autorisés
- `env.development.example`
- `env.production.example`

## 🔍 Vérification

### 1. Vérifier l'environnement actuel
```typescript
import { getCurrentEnvironment, isDevelopment } from './config/environments';

console.log('Environnement:', getCurrentEnvironment());
console.log('Est en développement:', isDevelopment());
```

### 2. Vérifier la configuration Supabase
```typescript
import { getCurrentConfig } from './config/environments';

const config = getCurrentConfig();
console.log('URL Supabase:', config.supabase.url);
```

## 🐛 Dépannage

### Problème : Mauvais environnement détecté
**Solution :** Vérifiez que `VITE_ENV` est correctement défini dans votre fichier `.env`

### Problème : Erreur de connexion Supabase
**Solution :** Vérifiez que les variables `VITE_SUPABASE_URL_DEV` et `VITE_SUPABASE_ANON_KEY_DEV` sont correctes

### Problème : Variables d'environnement non chargées
**Solution :** Redémarrez votre serveur de développement après modification des fichiers `.env`

## 📝 Workflow recommandé

### 1. Développement quotidien
```bash
# Toujours commencer en mode développement
npm run dev:local
```

### 2. Test en production locale
```bash
# Tester la configuration de production
npm run dev:prod
```

### 3. Déploiement
```bash
# Build pour la production
npm run build:prod

# Commit et push (déclenche le déploiement Vercel)
git add .
git commit -m "feat: nouvelle fonctionnalité"
git push origin main
```

## 🔄 Migration des données

### De la production vers le développement
1. Exporter les données de production depuis Supabase
2. Importer dans votre base de développement
3. Nettoyer les données sensibles si nécessaire

### Du développement vers la production
1. Tester toutes les fonctionnalités en développement
2. Vérifier que la migration des données fonctionne
3. Déployer en production

## 📚 Ressources supplémentaires

- [Documentation Vite - Variables d'environnement](https://vitejs.dev/guide/env-and-mode.html)
- [Documentation Supabase - Configuration](https://supabase.com/docs/guides/getting-started/environment-variables)
- [Documentation Vercel - Variables d'environnement](https://vercel.com/docs/projects/environment-variables)

---

**Note importante :** Gardez toujours vos bases de données de développement et de production séparées pour éviter tout conflit ou perte de données.
