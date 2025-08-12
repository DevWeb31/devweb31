# 🚀 DevWeb31 - Site Web Professionnel

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC.svg)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-2.54.0-green.svg)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-Private-red.svg)](LICENSE)

> **Site web professionnel privé** développé avec les technologies les plus récentes pour présenter mes services de développement web et d'applications. Propriété exclusive de Damien Oriente (Damiodev).

## ✨ Fonctionnalités

- 🎨 **Design moderne et responsive** avec Tailwind CSS
- 🌙 **Mode sombre/clair** avec persistance des préférences
- 📱 **Interface adaptative** pour tous les appareils
- 🔐 **Système d'authentification** avec Supabase
- 🛡️ **Mode maintenance** pour les mises à jour
- ⚡ **Performance optimisée** avec Vite et React 18
- 🎭 **Animations fluides** avec Framer Motion
- 🔍 **SEO optimisé** avec métadonnées dynamiques

## 🛠️ Technologies Utilisées

### Frontend
- **React 18** - Bibliothèque UI moderne avec hooks
- **TypeScript** - Typage statique pour un code robuste
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS** - Framework CSS utilitaire
- **Framer Motion** - Animations et transitions
- **React Router** - Navigation côté client

### Backend & Services
- **Supabase** - Backend-as-a-Service avec PostgreSQL
- **Authentication** - Gestion des utilisateurs sécurisée
- **Database** - Base de données relationnelle performante

### Outils de Développement
- **ESLint** - Qualité et cohérence du code
- **PostCSS** - Post-processing CSS
- **Autoprefixer** - Compatibilité navigateurs

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation
```bash
# Cloner le repository
git clone https://github.com/Damiodev/devweb31.git
cd devweb31

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos clés Supabase

# Lancer en mode développement
npm run dev
```

### Scripts Disponibles
```bash
npm run dev          # Démarre le serveur de développement
npm run build        # Construit l'application pour la production
npm run preview      # Prévisualise la build de production
npm run lint         # Vérifie la qualité du code
```

## 📁 Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── Admin/          # Interface d'administration
│   ├── Layout/         # Composants de mise en page
│   └── UI/             # Composants d'interface
├── contexts/           # Contextes React (thème, auth)
├── hooks/              # Hooks personnalisés
├── lib/                # Configuration et utilitaires
├── pages/              # Pages de l'application
└── assets/             # Images et ressources statiques
```

## 🌐 Déploiement

Le site est configuré pour un déploiement facile sur Vercel :

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Damiodev/devweb31)

### Variables d'Environnement Requises
```env
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_clé_anon_supabase
```

## 📱 Captures d'Écran

<details>
<summary>🖥️ Voir les captures d'écran</summary>

### Page d'Accueil
![Page d'accueil](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Page+d%27Accueil)

### Mode Sombre
![Mode sombre](https://via.placeholder.com/800x400/1F2937/FFFFFF?text=Mode+Sombre)

### Interface Mobile
![Mobile](https://via.placeholder.com/400x600/10B981/FFFFFF?text=Mobile+Responsive)

</details>

## 🔧 Configuration

### Thème
Le site supporte automatiquement le mode sombre/clair avec persistance des préférences utilisateur.

### Maintenance
Activez le mode maintenance via l'interface d'administration pour effectuer des mises à jour en toute sécurité.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est la propriété exclusive de **Damien Oriente (Damiodev)**. Tous droits réservés.

**⚠️ Attention** : Ce code source est privé et ne peut être reproduit, distribué ou utilisé commercialement sans autorisation écrite préalable.

Pour toute demande d'utilisation, de licence ou de collaboration, contactez : [contact@devweb31.fr](mailto:contact@devweb31.fr)

Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Développeur

**Damien Oriente** (Damiodev)  
Développeur web professionnel spécialisé dans la création de sites modernes et performants.

## 📞 Contact

- **Site Web** : [devweb31.fr](https://devweb31.fr)
- **Email** : [contact@devweb31.fr](mailto:contact@devweb31.fr)
- **LinkedIn** : [Profil LinkedIn](https://linkedin.com/in/damiodev)
- **GitHub** : [@Damiodev](https://github.com/Damiodev)

## 🙏 Remerciements

- [React](https://reactjs.org/) pour la bibliothèque UI
- [Vite](https://vitejs.dev/) pour l'outil de build
- [Tailwind CSS](https://tailwindcss.com/) pour le framework CSS
- [Supabase](https://supabase.com/) pour le backend
- [Framer Motion](https://www.framer.com/motion/) pour les animations

---

⭐ **N'oubliez pas de mettre une étoile à ce projet si vous l'aimez !**
