#!/bin/bash

# Script de workflow Git pour la synchronisation des bases de données
# Usage: ./scripts/git-workflow.sh [dev-to-main|main-to-dev|status]

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

# Vérifier que Git est installé
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git n'est pas installé${NC}"
    exit 1
fi

# Vérifier que Supabase CLI est installé
if ! command -v supabase &> /dev/null; then
    echo -e "${RED}❌ Supabase CLI n'est pas installé${NC}"
    echo "Installez-le avec: npm install -g supabase"
    exit 1
fi

# Fonction pour afficher l'aide
show_help() {
    echo -e "${BLUE}Usage: $0 [COMMAND]${NC}"
    echo ""
    echo "Commandes disponibles:"
    echo "  dev-to-main  - Fusionner develop vers main et synchroniser la production"
    echo "  main-to-dev  - Synchroniser develop avec main"
    echo "  status       - Afficher le statut des branches"
    echo "  help         - Afficher cette aide"
}

# Fonction pour vérifier l'état du repository
check_repo_status() {
    cd "$PROJECT_DIR"
    
    # Vérifier qu'on n'a pas de modifications non commitées
    if [ -n "$(git status --porcelain)" ]; then
        echo -e "${RED}❌ Vous avez des modifications non commitées${NC}"
        git status --short
        echo -e "${YELLOW}Commitez ou stashez vos modifications avant de continuer${NC}"
        exit 1
    fi
    
    # Vérifier qu'on est sur la bonne branche
    current_branch=$(git branch --show-current)
    echo -e "${BLUE}📍 Branche actuelle: $current_branch${NC}"
}

# Fonction pour fusionner develop vers main
dev_to_main() {
    echo -e "${BLUE}🔄 Fusion de develop vers main...${NC}"
    
    check_repo_status
    
    # Vérifier qu'on est sur develop
    current_branch=$(git branch --show-current)
    if [ "$current_branch" != "develop" ]; then
        echo -e "${RED}❌ Vous devez être sur la branche 'develop'${NC}"
        echo "Basculez avec: git checkout develop"
        exit 1
    fi
    
    # Mettre à jour develop
    echo -e "${BLUE}📥 Mise à jour de develop...${NC}"
    git pull origin develop
    
    # Basculement vers main
    echo -e "${BLUE}🔄 Basculement vers main...${NC}"
    git checkout main
    git pull origin main
    
    # Fusion de develop dans main
    echo -e "${BLUE}🔀 Fusion de develop dans main...${NC}"
    git merge develop --no-ff -m "Merge develop into main - $(date)"
    
    # Push vers main
    echo -e "${BLUE}📤 Push vers main...${NC}"
    git push origin main
    
    # Synchronisation de la production
    echo -e "${YELLOW}⚠️  Synchronisation de la base de production...${NC}"
    echo -e "${BLUE}📦 Application des migrations à la production...${NC}"
    
    # Générer et appliquer les migrations
    cd "$PROJECT_DIR"
    supabase db push --db-url "$SUPABASE_DB_URL"
    
    echo -e "${GREEN}✅ Fusion et synchronisation terminées${NC}"
    echo -e "${YELLOW}🔄 Retour à develop...${NC}"
    git checkout develop
    
    echo -e "${GREEN}🎉 Workflow terminé avec succès !${NC}"
}

# Fonction pour synchroniser develop avec main
main_to_dev() {
    echo -e "${BLUE}🔄 Synchronisation de develop avec main...${NC}"
    
    check_repo_status
    
    # Vérifier qu'on est sur develop
    current_branch=$(git branch --show-current)
    if [ "$current_branch" != "develop" ]; then
        echo -e "${RED}❌ Vous devez être sur la branche 'develop'${NC}"
        echo "Basculez avec: git checkout develop"
        exit 1
    fi
    
    # Mettre à jour main
    echo -e "${BLUE}📥 Mise à jour de main...${NC}"
    git fetch origin main
    
    # Fusion de main dans develop
    echo -e "${BLUE}🔀 Fusion de main dans develop...${NC}"
    git merge origin/main --no-ff -m "Sync develop with main - $(date)"
    
    # Push vers develop
    echo -e "${BLUE}📤 Push vers develop...${NC}"
    git push origin develop
    
    echo -e "${GREEN}✅ Synchronisation terminée${NC}"
}

# Fonction pour afficher le statut
show_status() {
    echo -e "${BLUE}📊 Statut des branches...${NC}"
    
    cd "$PROJECT_DIR"
    
    echo -e "${YELLOW}Branche actuelle:${NC}"
    git branch --show-current
    
    echo -e "${YELLOW}Statut des branches:${NC}"
    git branch -vv
    
    echo -e "${YELLOW}Derniers commits:${NC}"
    git log --oneline -5 --graph
    
    echo -e "${YELLOW}Modifications non commitées:${NC}"
    if [ -n "$(git status --porcelain)" ]; then
        git status --short
    else
        echo "Aucune modification"
    fi
}

# Gestion des arguments
case "${1:-help}" in
    dev-to-main)
        dev_to_main
        ;;
    main-to-dev)
        main_to_dev
        ;;
    status)
        show_status
        ;;
    help|*)
        show_help
        ;;
esac
