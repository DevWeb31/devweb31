-- Configuration de la table site_settings pour le mode maintenance
-- À exécuter dans l'éditeur SQL de Supabase

-- Créer la table site_settings si elle n'existe pas
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

-- Activer RLS (Row Level Security) si nécessaire
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Créer une politique pour permettre la lecture publique
CREATE POLICY "Allow public read access" ON public.site_settings
    FOR SELECT USING (true);

-- Créer une politique pour permettre la modification aux utilisateurs authentifiés
CREATE POLICY "Allow authenticated users to update" ON public.site_settings
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Créer une politique pour permettre l'insertion aux utilisateurs authentifiés
CREATE POLICY "Allow authenticated users to insert" ON public.site_settings
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Vérifier la configuration
SELECT * FROM public.site_settings WHERE key = 'maintenance_mode';
