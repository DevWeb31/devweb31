#!/bin/bash

# Script de configuration de l'environnement de développement
# Usage: ./scripts/setup-dev-env.sh

set -e

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

echo -e "${BLUE}🚀 Configuration de l'environnement de développement...${NC}"

# 1. Vérifier les prérequis
echo -e "${BLUE}📋 Vérification des prérequis...${NC}"

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js n'est pas installé${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js: $(node --version)${NC}"

# Vérifier npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm n'est pas installé${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm: $(npm --version)${NC}"

# Vérifier Git
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git n'est pas installé${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Git: $(git --version)${NC}"

# 2. Installation des dépendances
echo -e "${BLUE}📦 Installation des dépendances...${NC}"
cd "$PROJECT_DIR"
npm install

# 3. Vérifier Supabase CLI
echo -e "${BLUE}🔧 Vérification de Supabase CLI...${NC}"
if ! command -v supabase &> /dev/null; then
    echo -e "${YELLOW}⚠️  Supabase CLI n'est pas installé${NC}"
    echo -e "${BLUE}📥 Installation de Supabase CLI...${NC}"
    npm install -g supabase
else
    echo -e "${GREEN}✅ Supabase CLI: $(supabase --version)${NC}"
fi

# 4. Configuration des fichiers d'environnement
echo -e "${BLUE}⚙️  Configuration des fichiers d'environnement...${NC}"

# Créer .env.development s'il n'existe pas
if [ ! -f "$PROJECT_DIR/.env.development" ]; then
    echo -e "${YELLOW}📝 Création du fichier .env.development...${NC}"
    cp "$PROJECT_DIR/env.development" "$PROJECT_DIR/.env.development"
    echo -e "${GREEN}✅ Fichier .env.development créé${NC}"
    echo -e "${YELLOW}⚠️  N'oubliez pas de configurer vos vraies valeurs dans .env.development${NC}"
else
    echo -e "${GREEN}✅ Fichier .env.development existe déjà${NC}"
fi

# 5. Configuration Supabase
echo -e "${BLUE}🗄️  Configuration de Supabase...${NC}"

# Vérifier que le projet Supabase est initialisé
if [ ! -f "$PROJECT_DIR/supabase/config.toml" ]; then
    echo -e "${YELLOW}⚠️  Projet Supabase non initialisé${NC}"
    echo -e "${BLUE}🔧 Initialisation du projet Supabase...${NC}"
    cd "$PROJECT_DIR"
    supabase init
else
    echo -e "${GREEN}✅ Projet Supabase déjà initialisé${NC}"
fi

# 6. Vérification de la branche Git
echo -e "${BLUE}🌿 Vérification de la branche Git...${NC}"
cd "$PROJECT_DIR"
current_branch=$(git branch --show-current)

if [ "$current_branch" = "develop" ]; then
    echo -e "${GREEN}✅ Vous êtes sur la branche 'develop'${NC}"
elif [ "$current_branch" = "main" ]; then
    echo -e "${YELLOW}⚠️  Vous êtes sur 'main', basculement vers 'develop'...${NC}"
    git checkout develop
    echo -e "${GREEN}✅ Basculement vers 'develop' effectué${NC}"
else
    echo -e "${YELLOW}⚠️  Branche actuelle: $current_branch${NC}"
    echo -e "${BLUE}🔄 Basculement vers 'develop'...${NC}"
    git checkout develop
    echo -e "${GREEN}✅ Basculement vers 'develop' effectué${NC}"
fi

# 7. Rendre les scripts exécutables
echo -e "${BLUE}🔧 Configuration des permissions des scripts...${NC}"
chmod +x "$PROJECT_DIR/scripts/"*.sh
echo -e "${GREEN}✅ Scripts rendus exécutables${NC}"

# 8. Création des dossiers nécessaires
echo -e "${BLUE}📁 Création des dossiers nécessaires...${NC}"
mkdir -p "$PROJECT_DIR/backups"
mkdir -p "$PROJECT_DIR/supabase/.branches"
mkdir -p "$PROJECT_DIR/supabase/.temp"
echo -e "${GREEN}✅ Dossiers créés${NC}"

# 9. Configuration finale
echo -e "${BLUE}🎯 Configuration finale...${NC}"

echo -e "${GREEN}🎉 Configuration terminée avec succès !${NC}"
echo ""
echo -e "${BLUE}📋 Prochaines étapes :${NC}"
echo "1. Configurer vos vraies valeurs dans .env.development"
echo "2. Définir SUPABASE_ACCESS_TOKEN: export SUPABASE_ACCESS_TOKEN='votre-token'"
echo "3. Démarrer l'environnement: npm run db:dev"
echo "4. Ouvrir Supabase Studio: ./scripts/supabase-dev.sh studio"
echo ""
echo -e "${BLUE}📚 Documentation :${NC}"
echo "Consultez WORKFLOW_DEVELOPMENT.md pour plus d'informations"
echo ""
echo -e "${YELLOW}⚠️  N'oubliez pas de configurer vos variables d'environnement !${NC}"
