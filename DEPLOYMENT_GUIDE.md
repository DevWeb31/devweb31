# Guide de Déploiement sur Vercel

## 🚀 Déploiement de l'application sur Vercel

### Prérequis
- Compte Vercel (gratuit sur [vercel.com](https://vercel.com))
- Nom de domaine "devweb31.fr" configuré chez OVH
- Projet Supabase configuré

### Étape 1 : Préparation du projet

1. **Installer Vercel CLI** (optionnel mais recommandé) :
```bash
npm i -g vercel
```

2. **Vérifier la configuration** :
- Le fichier `vercel.json` est déjà configuré
- Le script de build `npm run build` est configuré dans `package.json`

### Étape 2 : Déploiement sur Vercel

#### Option A : Déploiement via l'interface web (Recommandé)

1. **Connectez-vous sur [vercel.com](https://vercel.com)**
2. **Cliquez sur "New Project"**
3. **Importez votre repository GitHub/GitLab** :
   - Connectez votre compte Git
   - Sélectionnez le repository `devweb31`
   - Cliquez sur "Import"

4. **Configuration du projet** :
   - **Framework Preset** : Vite
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
   - **Install Command** : `npm install`

5. **Variables d'environnement** :
   - Ajoutez vos variables Supabase :
     - `VITE_SUPABASE_URL` = votre URL Supabase
     - `VITE_SUPABASE_ANON_KEY` = votre clé anonyme Supabase

6. **Cliquez sur "Deploy"**

#### Option B : Déploiement via CLI

```bash
# Dans le répertoire du projet
vercel

# Suivez les instructions pour :
# - Connexion à votre compte Vercel
# - Configuration du projet
# - Variables d'environnement
```

### Étape 3 : Configuration du nom de domaine

1. **Dans votre dashboard Vercel** :
   - Allez dans votre projet déployé
   - Cliquez sur "Settings" → "Domains"

2. **Ajoutez votre domaine** :
   - Cliquez sur "Add Domain"
   - Entrez : `devweb31.fr`
   - Cliquez sur "Add"

3. **Configuration DNS chez OVH** :
   - Connectez-vous à votre espace client OVH
   - Allez dans la gestion de votre domaine `devweb31.fr`
   - Modifiez la zone DNS avec les valeurs fournies par Vercel :

#### Configuration DNS recommandée :
```
Type    Nom                    Valeur
A       @                     76.76.19.36
CNAME   www                   cname.vercel-dns.com
```

4. **Vérification** :
   - Vercel vérifiera automatiquement la configuration
   - Le statut passera à "Valid" une fois la propagation DNS terminée

### Étape 4 : Configuration HTTPS et sécurité

1. **HTTPS automatique** :
   - Vercel génère automatiquement un certificat SSL
   - Redirection automatique HTTP → HTTPS

2. **Headers de sécurité** :
   - Configurés dans `vercel.json`
   - Protection contre le clickjacking, MIME sniffing, etc.

### Étape 5 : Déploiements automatiques

1. **GitHub Integration** :
   - Chaque push sur la branche `main` déclenche un déploiement
   - Déploiements preview sur les pull requests

2. **Branches de développement** :
   - Créez des branches pour les nouvelles fonctionnalités
   - Déploiements automatiques avec URLs uniques

### Étape 6 : Monitoring et analytics

1. **Vercel Analytics** (optionnel) :
   - Activez dans les paramètres du projet
   - Métriques de performance et d'utilisation

2. **Logs et debugging** :
   - Accès aux logs de build et runtime
   - Debugging en temps réel

### 🔧 Configuration avancée

#### Variables d'environnement par environnement :
```bash
# Production
vercel env add VITE_SUPABASE_URL production

# Preview/Development
vercel env add VITE_SUPABASE_URL preview
```

#### Redirection des anciennes URLs :
```json
{
  "redirects": [
    {
      "source": "/ancienne-page",
      "destination": "/nouvelle-page",
      "permanent": true
    }
  ]
}
```

### 🚨 Résolution des problèmes courants

1. **Erreur de build** :
   - Vérifiez les variables d'environnement
   - Consultez les logs de build dans Vercel

2. **Problème de domaine** :
   - Vérifiez la configuration DNS
   - Attendez la propagation (peut prendre jusqu'à 48h)

3. **Erreur 404 sur les routes** :
   - Vérifiez la configuration des rewrites dans `vercel.json`
   - Assurez-vous que le SPA routing est correctement configuré

### 📱 Vérification finale

1. **Testez votre site** : `https://devweb31.fr`
2. **Vérifiez la responsivité** sur différents appareils
3. **Testez toutes les fonctionnalités** (connexion, admin, etc.)
4. **Vérifiez les performances** avec Lighthouse

### 🔄 Mise à jour et maintenance

- **Déploiements automatiques** à chaque push
- **Rollback facile** vers les versions précédentes
- **Monitoring continu** des performances

---

**🎉 Félicitations ! Votre application est maintenant déployée sur Vercel avec votre nom de domaine personnalisé !**
