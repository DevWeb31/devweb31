# Mode Maintenance - Configuration et Utilisation

## Vue d'ensemble

Le mode maintenance de DevWeb31 permet de mettre le site en maintenance de manière contrôlée, tout en gardant l'accès administrateur actif.

## 🗄️ Configuration Supabase

### 1. Créer la table site_settings

Exécutez le script SQL suivant dans l'éditeur SQL de Supabase :

```sql
-- Configuration de la table site_settings pour le mode maintenance
CREATE TABLE IF NOT EXISTS public.site_settings (
    id SERIAL PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insérer la configuration de maintenance par défaut
INSERT INTO public.site_settings (key, value, description) 
VALUES ('maintenance_mode', 'false', 'Mode maintenance du site (true/false)')
ON CONFLICT (key) DO UPDATE SET 
    value = EXCLUDED.value,
    updated_at = NOW();

-- Créer un index sur la clé pour des performances optimales
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON public.site_settings(key);

-- Activer RLS (Row Level Security)
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Politiques de sécurité
CREATE POLICY "Allow public read access" ON public.site_settings
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to update" ON public.site_settings
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert" ON public.site_settings
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```

### 2. Vérifier la configuration

```sql
SELECT * FROM public.site_settings WHERE key = 'maintenance_mode';
```

## 🎛️ Utilisation dans l'Interface

### Activation/Désactivation

1. **Accéder au back office** : `/admin`
2. **Aller à la section Maintenance** dans la sidebar
3. **Utiliser le toggle** pour activer/désactiver le mode maintenance

### Comportement

#### Mode Normal (maintenance = false)
- ✅ Site accessible à tous les visiteurs
- ✅ Navigation normale
- ✅ Toutes les pages fonctionnelles

#### Mode Maintenance (maintenance = true)
- 🛠️ Page de maintenance affichée pour tous
- 🔒 Seuls les administrateurs peuvent accéder au site normal
- 🔑 Accès au back office maintenu via `/admin`
- 🔑 Accès à la page de login maintenu via `/login`

## 🔧 Fonctionnalités Techniques

### Hooks Utilisés

#### `useMaintenanceMode`
- Récupère le statut de maintenance depuis Supabase
- Écoute les changements en temps réel
- Gère le chargement et les erreurs

#### `useMaintenanceToggle`
- Gère le toggle du mode maintenance
- Met à jour la base de données
- Affiche les notifications de succès/erreur
- Gère l'état de chargement

### Composants

#### `MaintenanceMode`
- Page affichée en mode maintenance
- Design responsive et animé
- Lien vers la connexion administrateur

#### `AdminContent` - Section Maintenance
- Interface de contrôle du mode maintenance
- Toggle avec indicateur visuel
- Notifications de statut
- Informations contextuelles

## 🚀 Déploiement

### 1. Configuration de la base de données
```bash
# Dans l'éditeur SQL de Supabase
# Exécuter le script SUPABASE_MAINTENANCE_SETUP.sql
```

### 2. Vérification des permissions
- ✅ Lecture publique autorisée
- ✅ Modification authentifiée autorisée
- ✅ RLS activé et configuré

### 3. Test de la fonctionnalité
1. Activer le mode maintenance
2. Vérifier que la page de maintenance s'affiche
3. Se connecter en tant qu'administrateur
4. Accéder au back office
5. Désactiver le mode maintenance
6. Vérifier que le site redevient accessible

## 🔒 Sécurité

### Accès Contrôlé
- Seuls les utilisateurs authentifiés peuvent modifier le mode maintenance
- Lecture publique pour permettre l'affichage du statut
- Politiques RLS strictes

### Validation
- Vérification des permissions avant modification
- Gestion des erreurs et rollback en cas d'échec
- Logs des actions de maintenance

## 📱 Responsive Design

### Mobile
- Page de maintenance adaptée aux petits écrans
- Boutons et textes optimisés
- Navigation tactile

### Desktop
- Interface complète avec toutes les informations
- Contrôles détaillés
- Notifications visuelles

## 🎨 Personnalisation

### Thème
- Support du mode sombre/clair
- Couleurs cohérentes avec le design system
- Animations et transitions fluides

### Messages
- Textes personnalisables
- Support multilingue possible
- Notifications contextuelles

## 🧪 Tests

### Scénarios de Test
1. **Activation** : Vérifier le passage en mode maintenance
2. **Désactivation** : Vérifier le retour au mode normal
3. **Erreurs** : Tester la gestion des erreurs de base de données
4. **Responsive** : Vérifier l'affichage sur différents écrans
5. **Sécurité** : Tester l'accès non autorisé

### Outils de Test
- DevTools pour la responsivité
- Console pour les erreurs
- Base de données pour vérifier les changements
- Navigation entre les modes

---

*Dernière mise à jour : ${new Date().toLocaleDateString('fr-FR')}*
