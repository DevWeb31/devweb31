#!/bin/bash

# Script de déploiement automatisé pour Vercel
# Usage: ./scripts/deploy.sh [production|preview]

set -e

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction d'affichage
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérification des prérequis
check_prerequisites() {
    print_status "Vérification des prérequis..."
    
    # Vérifier si Node.js est installé
    if ! command -v node &> /dev/null; then
        print_error "Node.js n'est pas installé"
        exit 1
    fi
    
    # Vérifier si npm est installé
    if ! command -v npm &> /dev/null; then
        print_error "npm n'est pas installé"
        exit 1
    fi
    
    # Vérifier si Vercel CLI est installé
    if ! command -v vercel &> /dev/null; then
        print_warning "Vercel CLI n'est pas installé. Installation..."
        npm install -g vercel
    fi
    
    print_success "Tous les prérequis sont satisfaits"
}

# Installation des dépendances
install_dependencies() {
    print_status "Installation des dépendances..."
    
    if [ -f "package-lock.json" ]; then
        npm ci
    else
        npm install
    fi
    
    print_success "Dépendances installées"
}

# Build du projet
build_project() {
    print_status "Build du projet..."
    
    npm run build
    
    if [ $? -eq 0 ]; then
        print_success "Build réussi"
    else
        print_error "Échec du build"
        exit 1
    fi
}

# Tests de linting
run_lint() {
    print_status "Vérification du code..."
    
    npm run lint
    
    if [ $? -eq 0 ]; then
        print_success "Linting réussi"
    else
        print_warning "Problèmes de linting détectés"
    fi
}

# Déploiement sur Vercel
deploy_to_vercel() {
    local environment=${1:-production}
    
    print_status "Déploiement sur Vercel (environnement: $environment)..."
    
    if [ "$environment" = "production" ]; then
        vercel --prod
    else
        vercel
    fi
    
    if [ $? -eq 0 ]; then
        print_success "Déploiement réussi sur Vercel"
    else
        print_error "Échec du déploiement"
        exit 1
    fi
}

# Vérification post-déploiement
post_deployment_check() {
    print_status "Vérification post-déploiement..."
    
    # Attendre un peu pour que le déploiement soit stable
    sleep 10
    
    print_success "Déploiement terminé avec succès !"
    print_status "Vérifiez votre site sur Vercel"
}

# Fonction principale
main() {
    local environment=${1:-production}
    
    echo "🚀 Déploiement de devweb31 sur Vercel"
    echo "======================================"
    echo ""
    
    check_prerequisites
    install_dependencies
    run_lint
    build_project
    deploy_to_vercel "$environment"
    post_deployment_check
    
    echo ""
    echo "🎉 Déploiement terminé !"
    echo "📱 Vérifiez votre application sur Vercel"
    echo "🌐 Configurez votre domaine devweb31.fr dans le dashboard Vercel"
}

# Gestion des arguments
case "${1:-production}" in
    "production"|"prod")
        main "production"
        ;;
    "preview"|"dev")
        main "preview"
        ;;
    "help"|"-h"|"--help")
        echo "Usage: $0 [production|preview|help]"
        echo ""
        echo "Options:"
        echo "  production  Déploiement en production (défaut)"
        echo "  preview     Déploiement en preview"
        echo "  help        Affiche cette aide"
        ;;
    *)
        print_error "Option invalide: $1"
        echo "Usage: $0 [production|preview|help]"
        exit 1
        ;;
esac
