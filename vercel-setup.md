# Configuration Rapide Vercel

## 🚀 Déploiement en 5 minutes

### 1. Créer un compte Vercel
- Allez sur [vercel.com](https://vercel.com)
- Créez un compte gratuit
- Connectez votre compte GitHub/GitLab

### 2. Importer votre projet
- Cliquez sur "New Project"
- Sélectionnez votre repository `devweb31`
- Cliquez sur "Import"

### 3. Configuration automatique
Vercel détectera automatiquement :
- ✅ Framework : Vite
- ✅ Build Command : `npm run build`
- ✅ Output Directory : `dist`
- ✅ Install Command : `npm install`

### 4. Variables d'environnement
Ajoutez ces variables dans Vercel :
```
VITE_SUPABASE_URL = votre_url_supabase
VITE_SUPABASE_ANON_KEY = votre_clé_anon_supabase
```

### 5. Déployer
- Cliquez sur "Deploy"
- Attendez 2-3 minutes
- Votre site est en ligne ! 🎉

---

## 🌐 Configuration du domaine devweb31.fr

### Dans Vercel Dashboard :
1. Projet → Settings → Domains
2. Ajoutez : `devweb31.fr`
3. Copiez les valeurs DNS fournies

### Dans OVH :
1. Espace client → Domaines → devweb31.fr
2. Zone DNS → Ajoutez les enregistrements Vercel
3. Attendez la propagation (max 48h)

---

## 📱 URLs de votre projet
- **Production** : `https://devweb31.fr`
- **Preview** : `https://devweb31-git-main-votre-username.vercel.app`
- **Dashboard** : [vercel.com/dashboard](https://vercel.com/dashboard)

---

## 🔄 Déploiements automatiques
- Chaque push sur `main` → déploiement production
- Chaque pull request → déploiement preview
- Rollback facile en 1 clic

---

**💡 Conseil** : Utilisez le script `./scripts/deploy.sh` pour des déploiements automatisés !
