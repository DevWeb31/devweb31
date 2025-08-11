# Configuration Supabase pour DevWeb31

## Étapes de configuration

### 1. Créer un projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Notez votre URL de projet et votre clé anonyme

### 2. Configuration des variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec :

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Configuration de l'authentification

Dans votre projet Supabase :

1. **Authentication > Settings**
   - Activez l'authentification par email
   - Configurez les redirections si nécessaire

2. **Authentication > Users**
   - Créez votre premier utilisateur administrateur
   - Ou utilisez l'interface de signup

### 4. Configuration de la base de données

Exécutez ce SQL dans l'éditeur SQL de Supabase :

```sql
-- Table des paramètres du site
CREATE TABLE IF NOT EXISTS site_settings (
  id SERIAL PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertion des paramètres par défaut
INSERT INTO site_settings (key, value) VALUES 
  ('maintenance_mode', 'false')
ON CONFLICT (key) DO NOTHING;

-- Politique RLS pour site_settings
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Permettre la lecture à tous les utilisateurs authentifiés
CREATE POLICY "Users can read site settings" ON site_settings
  FOR SELECT USING (auth.role() = 'authenticated');

-- Permettre la modification aux utilisateurs authentifiés
CREATE POLICY "Users can update site settings" ON site_settings
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Permettre l'insertion aux utilisateurs authentifiés
CREATE POLICY "Users can insert site settings" ON site_settings
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```

### 5. Test de la connexion

1. Démarrez votre application
2. Allez sur `/login`
3. Connectez-vous avec vos identifiants
4. Vous devriez être redirigé vers `/admin`

## Structure de l'authentification

- **LoginPage** : Page de connexion publique
- **AdminPage** : Page d'administration protégée
- **ProtectedRoute** : Composant de protection des routes
- **AuthContext** : Gestion de l'état d'authentification

## Fonctionnalités disponibles

- ✅ Connexion/déconnexion
- ✅ Protection des routes
- ✅ Gestion du mode maintenance
- ✅ Support du thème sombre
- ✅ Redirection automatique après connexion

## Prochaines étapes

- [ ] Gestion des rôles utilisateurs
- [ ] Interface de gestion des contenus
- [ ] Analytics et statistiques
- [ ] Gestion des messages de contact
