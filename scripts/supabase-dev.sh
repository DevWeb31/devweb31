#!/bin/bash

# Script pour gérer l'environnement de développement Supabase
# Usage: ./scripts/supabase-dev.sh [start|stop|reset|migrate|studio]

set -e

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SUPABASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CONFIG_FILE="$SUPABASE_DIR/supabase/config.development.toml"

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
    echo "  start     - Démarrer l'environnement de développement"
    echo "  stop      - Arrêter l'environnement de développement"
    echo "  reset     - Réinitialiser la base de données"
    echo "  migrate   - Appliquer les migrations"
    echo "  studio    - Ouvrir Supabase Studio"
    echo "  status    - Afficher le statut des services"
    echo "  logs      - Afficher les logs"
    echo "  help      - Afficher cette aide"
}

# Fonction pour démarrer l'environnement
start_dev() {
    echo -e "${BLUE}🚀 Démarrage de l'environnement de développement...${NC}"
    
    # Copier la config de développement
    cp "$CONFIG_FILE" "$SUPABASE_DIR/supabase/config.toml"
    
    # Démarrer Supabase
    cd "$SUPABASE_DIR"
    supabase start
    
    echo -e "${GREEN}✅ Environnement de développement démarré${NC}"
    echo -e "${YELLOW}📊 Supabase Studio: http://localhost:54323${NC}"
    echo -e "${YELLOW}🔌 API: http://localhost:54321${NC}"
    echo -e "${YELLOW}🗄️  Base de données: postgresql://postgres:postgres@localhost:54322/postgres${NC}"
}

# Fonction pour arrêter l'environnement
stop_dev() {
    echo -e "${BLUE}🛑 Arrêt de l'environnement de développement...${NC}"
    
    cd "$SUPABASE_DIR"
    supabase stop
    
    echo -e "${GREEN}✅ Environnement de développement arrêté${NC}"
}

# Fonction pour réinitialiser la base
reset_dev() {
    echo -e "${BLUE}🔄 Réinitialisation de la base de données...${NC}"
    
    cd "$SUPABASE_DIR"
    supabase db reset
    
    echo -e "${GREEN}✅ Base de données réinitialisée${NC}"
}

# Fonction pour appliquer les migrations
migrate_dev() {
    echo -e "${BLUE}📦 Application des migrations...${NC}"
    
    cd "$SUPABASE_DIR"
    supabase db push
    
    echo -e "${GREEN}✅ Migrations appliquées${NC}"
}

# Fonction pour ouvrir Studio
studio_dev() {
    echo -e "${BLUE}🎨 Ouverture de Supabase Studio...${NC}"
    
    cd "$SUPABASE_DIR"
    supabase studio
    
    echo -e "${GREEN}✅ Supabase Studio ouvert${NC}"
}

# Fonction pour afficher le statut
status_dev() {
    echo -e "${BLUE}📊 Statut des services...${NC}"
    
    cd "$SUPABASE_DIR"
    supabase status
}

# Fonction pour afficher les logs
logs_dev() {
    echo -e "${BLUE}📝 Logs des services...${NC}"
    
    cd "$SUPABASE_DIR"
    supabase logs
}

# Gestion des arguments
case "${1:-help}" in
    start)
        start_dev
        ;;
    stop)
        stop_dev
        ;;
    reset)
        reset_dev
        ;;
    migrate)
        migrate_dev
        ;;
    studio)
        studio_dev
        ;;
    status)
        status_dev
        ;;
    logs)
        logs_dev
        ;;
    help|*)
        show_help
        ;;
esac
