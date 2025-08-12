#!/bin/bash

# Script de configuration et démarrage de l'environnement de développement
# DevWeb31 - Configuration des environnements

echo "🚀 Configuration de l'environnement de développement DevWeb31"
echo "=========================================================="

# Vérifier si le fichier .env.development existe
if [ ! -f ".env.development" ]; then
    echo "📝 Création du fichier .env.development..."
    
    if [ -f "env.development.example" ]; then
        cp env.development.example .env.development
        echo "✅ Fichier .env.development créé à partir de env.development.example"
        echo "⚠️  N'oubliez pas de configurer vos vraies valeurs dans .env.development"
    else
        echo "❌ Fichier env.development.example non trouvé"
        echo "📝 Création d'un fichier .env.development basique..."
        cat > .env.development << EOF
# Variables d'environnement pour le développement local
# Remplacez ces valeurs par vos vraies données
VITE_SUPABASE_URL_DEV=https://votre-projet-dev.supabase.co
VITE_SUPABASE_ANON_KEY_DEV=votre_cle_anon_dev
VITE_ENV=development
EOF
        echo "✅ Fichier .env.development créé"
    fi
    
    echo ""
    echo "🔧 Éditez maintenant le fichier .env.development avec vos vraies valeurs :"
    echo "   nano .env.development"
    echo ""
    echo "📋 Variables à configurer :"
    echo "   - VITE_SUPABASE_URL_DEV : URL de votre projet Supabase de développement"
    echo "   - VITE_SUPABASE_ANON_KEY_DEV : Clé anonyme de votre projet Supabase de développement"
    echo ""
    read -p "Appuyez sur Entrée quand vous avez configuré les variables..."
else
    echo "✅ Fichier .env.development déjà présent"
fi

# Vérifier les variables d'environnement
echo ""
echo "🔍 Vérification des variables d'environnement..."

if grep -q "votre-projet-dev" .env.development; then
    echo "⚠️  ATTENTION : Les variables d'environnement n'ont pas été configurées !"
    echo "   Éditez .env.development avec vos vraies valeurs"
    exit 1
fi

echo "✅ Variables d'environnement configurées"

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo ""
    echo "📦 Installation des dépendances..."
    npm install
fi

# Démarrer l'environnement de développement
echo ""
echo "🚀 Démarrage de l'environnement de développement..."
echo "   L'indicateur d'environnement doit afficher 'Développement'"
echo ""

npm run dev:local
