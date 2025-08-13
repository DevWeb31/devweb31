-- Données de test pour l'environnement de développement
-- Ce fichier sera exécuté automatiquement lors du reset de la base

-- Insertion des paramètres du site
INSERT INTO site_settings (key, value, updated_at) VALUES 
('site_title', 'DevWeb31 - Développement', NOW()),
('site_description', 'Site en cours de développement', NOW()),
('maintenance_mode', 'false', NOW()),
('debug_mode', 'true', NOW()),
('environment', 'development', NOW()),
('version', '1.0.0-dev', NOW()),
('last_updated', NOW()::text, NOW());

-- Vous pouvez ajouter d'autres données de test ici
-- Par exemple, des utilisateurs de test, des articles, etc.

-- Exemple d'insertion d'utilisateurs de test (si la table existe)
-- INSERT INTO auth.users (email, encrypted_password, email_confirmed_at) VALUES 
-- ('dev@devweb31.fr', crypt('password123', gen_salt('bf')), NOW()),
-- ('test@devweb31.fr', crypt('test123', gen_salt('bf')), NOW());

-- Exemple d'insertion d'articles de test (si la table existe)
-- INSERT INTO articles (title, content, published_at) VALUES 
-- ('Article de test 1', 'Contenu de test pour le développement', NOW()),
-- ('Article de test 2', 'Autre contenu de test', NOW());
