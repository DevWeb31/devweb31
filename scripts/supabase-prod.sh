#!/bin/bash

# Script pour gérer l'environnement de production Supabase
# Usage: ./scripts/supabase-prod.sh [migrate|status|logs|diff]

set -e

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SUPABASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Vérifier que Supabase CLI est installé
if ! command -v supabase &> /dev/null; then
    echo -e "${RED}❌ Supabase CLI n'est pas installé${NC}"
    echo "Installez-le avec: npm install -g supabase"
    exit 1
fi

# Vérifier que les variables d'environnement sont définies
if [ -z "$SUPABASE_ACCESS_TOKEN" ]; then
    echo -e "${RED}❌ Variable SUPABASE_ACCESS_TOKEN non définie${NC}"
    echo "Définissez-la avec: export SUPABASE_ACCESS_TOKEN='votre_token'"
    exit 1
fi

# Fonction pour afficher l'aide
show_help() {
    echo -e "${BLUE}Usage: $0 [COMMAND]${NC}"
    echo ""
    echo "Commandes disponibles:"
    echo "  migrate   - Appliquer les migrations à la production"
    echo "  status    - Afficher le statut de la production"
    echo "  logs      - Afficher les logs de production"
    echo "  diff      - Générer un diff entre dev et prod"
    echo "  backup    - Créer une sauvegarde de la production"
    echo "  help      - Afficher cette aide"
    echo ""
    echo -e "${YELLOW}⚠️  ATTENTION: Ces commandes affectent la base de PRODUCTION${NC}"
}

# Fonction pour appliquer les migrations
migrate_prod() {
    echo -e "${RED}⚠️  ATTENTION: Vous êtes sur le point de modifier la base de PRODUCTION${NC}"
    read -p "Êtes-vous sûr ? (oui/non): " confirm
    
    if [ "$confirm" != "oui" ]; then
        echo -e "${YELLOW}❌ Opération annulée${NC}"
        exit 0
    fi
    
    echo -e "${BLUE}📦 Application des migrations à la production...${NC}"
    
    cd "$SUPABASE_DIR"
    supabase db push --db-url "$SUPABASE_DB_URL"
    
    echo -e "${GREEN}✅ Migrations appliquées à la production${NC}"
}

# Fonction pour afficher le statut
status_prod() {
    echo -e "${BLUE}📊 Statut de la production...${NC}"
    
    cd "$SUPABASE_DIR"
    supabase status --db-url "$SUPABASE_DB_URL"
}

# Fonction pour afficher les logs
logs_prod() {
    echo -e "${BLUE}📝 Logs de production...${NC}"
    
    cd "$SUPABASE_DIR"
    supabase logs --db-url "$SUPABASE_DB_URL"
}

# Fonction pour générer un diff
diff_prod() {
    echo -e "${BLUE}🔍 Génération du diff entre dev et prod...${NC}"
    
    cd "$SUPABASE_DIR"
    supabase db diff --db-url "$SUPABASE_DB_URL" --schema public
}

# Fonction pour créer une sauvegarde
backup_prod() {
    echo -e "${BLUE}💾 Création d'une sauvegarde de la production...${NC}"
    
    cd "$SUPABASE_DIR"
    timestamp=$(date +%Y%m%d_%H%M%S)
    backup_file="backup_prod_${timestamp}.sql"
    
    supabase db dump --db-url "$SUPABASE_DB_URL" --schema public > "backups/${backup_file}"
    
    echo -e "${GREEN}✅ Sauvegarde créée: backups/${backup_file}${NC}"
}

# Gestion des arguments
case "${1:-help}" in
    migrate)
        migrate_prod
        ;;
    status)
        status_prod
        ;;
    logs)
        logs_prod
        ;;
    diff)
        diff_prod
        ;;
    backup)
        backup_prod
        ;;
    help|*)
        show_help
        ;;
esac
