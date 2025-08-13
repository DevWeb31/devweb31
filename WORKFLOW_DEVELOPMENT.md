# Workflow de Développement avec Git et Supabase

Ce document décrit le workflow de développement qui permet de travailler sur la branche `develop` avec une base de données de développement, tout en synchronisant automatiquement la production lors de la fusion avec `main`.

## 🏗️ Architecture

- **Branche `develop`** : Base de données de développement (locale ou Supabase dev)
- **Branche `main`** : Base de données de production (Supabase production)
- **Synchronisation automatique** : Les migrations sont appliquées à la production lors de la fusion

## 🚀 Installation et Configuration

### 1. Prérequis

```bash
# Installation de Supabase CLI
npm install -g supabase

# Vérification de l'installation
supabase --version
```

### 2. Configuration des environnements

1. **Copier le fichier d'environnement de développement :**
   ```bash
   cp env.development .env.development
   ```

2. **Modifier `.env.development` avec vos vraies valeurs :**
   - `VITE_SUPABASE_URL_DEV` : URL de votre projet Supabase de développement
   - `VITE_SUPABASE_ANON_KEY_DEV` : Clé anonyme de votre projet Supabase de développement
   - `SUPABASE_ACCESS_TOKEN` : Votre token d'accès Supabase

3. **Configurer les variables d'environnement :**
   ```bash
   export SUPABASE_ACCESS_TOKEN="votre-token"
   export SUPABASE_DB_URL="postgresql://postgres:postgres@localhost:54322/postgres"
   ```

## 🔄 Workflow de Développement

### 1. Démarrer l'environnement de développement

```bash
# Démarrer Supabase en local
npm run db:dev

# Ou utiliser le script directement
./scripts/supabase-dev.sh start
```

### 2. Travailler sur la branche develop

```bash
# Vérifier que vous êtes sur develop
git checkout develop

# Créer une nouvelle table ou modifier le schéma
# (via Supabase Studio ou migrations SQL)

# Commiter vos changements
git add .
git commit -m "feat: ajout de la table users"
git push origin develop
```

### 3. Tester en développement

- Votre application utilise automatiquement la base de développement
- Vous pouvez tester toutes vos modifications sans impacter la production
- Utilisez Supabase Studio local pour gérer vos données

### 4. Fusionner vers la production

```bash
# Utiliser le script de workflow
npm run git:workflow dev-to-main

# Ou manuellement
./scripts/git-workflow.sh dev-to-main
```

Ce script :
1. Vérifie que vous êtes sur `develop`
2. Met à jour `develop` et `main`
3. Fusionne `develop` dans `main`
4. Applique automatiquement les migrations à la production
5. Retourne sur `develop`

## 🛠️ Commandes Utiles

### Gestion de l'environnement de développement

```bash
# Démarrer l'environnement
npm run db:dev

# Arrêter l'environnement
./scripts/supabase-dev.sh stop

# Réinitialiser la base
./scripts/supabase-dev.sh reset

# Ouvrir Supabase Studio
./scripts/supabase-dev.sh studio

# Vérifier le statut
./scripts/supabase-dev.sh status
```

### Gestion de la production

```bash
# Vérifier le statut de la production
./scripts/supabase-prod.sh status

# Créer une sauvegarde
./scripts/supabase-prod.sh backup

# Générer un diff entre dev et prod
./scripts/supabase-prod.sh diff
```

### Workflow Git

```bash
# Vérifier le statut des branches
./scripts/git-workflow.sh status

# Synchroniser develop avec main
./scripts/git-workflow.sh main-to-dev

# Fusionner develop vers main (et synchroniser la production)
./scripts/git-workflow.sh dev-to-main
```

## 📁 Structure des Fichiers

```
devweb31/
├── scripts/
│   ├── supabase-dev.sh      # Gestion de l'environnement de développement
│   ├── supabase-prod.sh     # Gestion de la production
│   └── git-workflow.sh      # Workflow Git automatisé
├── supabase/
│   ├── config.toml          # Configuration Supabase (remplacée selon l'environnement)
│   ├── config.development.toml # Configuration spécifique au développement
│   └── migrations/          # Migrations de base de données
├── env.development          # Variables d'environnement de développement
└── WORKFLOW_DEVELOPMENT.md  # Cette documentation
```

## 🔒 Sécurité

- **Jamais de données de production en développement**
- **Toujours une confirmation avant modification de la production**
- **Sauvegardes automatiques avant chaque déploiement**
- **Variables d'environnement séparées**

## 🚨 Bonnes Pratiques

1. **Toujours travailler sur `develop`** pour les nouvelles fonctionnalités
2. **Tester complètement en développement** avant de fusionner
3. **Utiliser des migrations** pour tous les changements de schéma
4. **Vérifier les diffs** avant de déployer en production
5. **Créer des sauvegardes** avant chaque déploiement

## 🐛 Dépannage

### Problème : Supabase CLI non trouvé
```bash
npm install -g supabase
```

### Problème : Variables d'environnement manquantes
```bash
# Vérifier que les variables sont définies
echo $SUPABASE_ACCESS_TOKEN
echo $SUPABASE_DB_URL
```

### Problème : Conflit de ports
```bash
# Arrêter tous les services Supabase
./scripts/supabase-dev.sh stop

# Redémarrer
./scripts/supabase-dev.sh start
```

### Problème : Migration échouée en production
```bash
# Vérifier le diff
./scripts/supabase-prod.sh diff

# Créer une sauvegarde
./scripts/supabase-prod.sh backup

# Corriger et relancer
./scripts/git-workflow.sh dev-to-main
```

## 📞 Support

En cas de problème :
1. Vérifiez les logs : `./scripts/supabase-dev.sh logs`
2. Vérifiez le statut : `./scripts/supabase-dev.sh status`
3. Consultez la documentation Supabase : https://supabase.com/docs
4. Vérifiez que tous les prérequis sont installés
