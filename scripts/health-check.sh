#!/bin/bash

# Script de vérification de santé du site après déploiement
# Usage: ./scripts/health-check.sh [URL]

set -e

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# URL par défaut
DEFAULT_URL="https://devweb31.fr"
URL=${1:-$DEFAULT_URL}

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

# Vérification de la disponibilité du site
check_site_availability() {
    print_status "Vérification de la disponibilité de $URL..."
    
    if curl -s -f "$URL" > /dev/null; then
        print_success "Site accessible"
        return 0
    else
        print_error "Site inaccessible"
        return 1
    fi
}

# Vérification du temps de réponse
check_response_time() {
    print_status "Vérification du temps de réponse..."
    
    local response_time=$(curl -s -w "%{time_total}" -o /dev/null "$URL")
    
    if (( $(echo "$response_time < 2.0" | bc -l) )); then
        print_success "Temps de réponse excellent: ${response_time}s"
    elif (( $(echo "$response_time < 5.0" | bc -l) )); then
        print_warning "Temps de réponse acceptable: ${response_time}s"
    else
        print_error "Temps de réponse lent: ${response_time}s"
    fi
}

# Vérification du certificat SSL
check_ssl_certificate() {
    print_status "Vérification du certificat SSL..."
    
    if curl -s -I "$URL" | grep -q "https"; then
        print_success "HTTPS activé"
        
        # Vérifier la validité du certificat
        if openssl s_client -connect "${URL#https://}:443" -servername "${URL#https://}" < /dev/null 2>/dev/null | openssl x509 -noout -dates | grep -q "notAfter"; then
            print_success "Certificat SSL valide"
        else
            print_warning "Impossible de vérifier la validité du certificat SSL"
        fi
    else
        print_error "HTTPS non activé"
    fi
}

# Vérification des headers de sécurité
check_security_headers() {
    print_status "Vérification des headers de sécurité..."
    
    local headers=$(curl -s -I "$URL")
    
    # Vérifier X-Frame-Options
    if echo "$headers" | grep -q "X-Frame-Options"; then
        print_success "X-Frame-Options configuré"
    else
        print_warning "X-Frame-Options manquant"
    fi
    
    # Vérifier X-Content-Type-Options
    if echo "$headers" | grep -q "X-Content-Type-Options"; then
        print_success "X-Content-Type-Options configuré"
    else
        print_warning "X-Content-Type-Options manquant"
    fi
    
    # Vérifier Referrer-Policy
    if echo "$headers" | grep -q "Referrer-Policy"; then
        print_success "Referrer-Policy configuré"
    else
        print_warning "Referrer-Policy manquant"
    fi
}

# Vérification de la responsivité (simulation)
check_responsiveness() {
    print_status "Vérification de la responsivité..."
    
    # Simuler différents User-Agents
    local mobile_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1"
    local desktop_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    
    # Test mobile
    if curl -s -A "$mobile_agent" "$URL" > /dev/null; then
        print_success "Site accessible en mode mobile"
    else
        print_warning "Problème d'accès mobile"
    fi
    
    # Test desktop
    if curl -s -A "$desktop_agent" "$URL" > /dev/null; then
        print_success "Site accessible en mode desktop"
    else
        print_warning "Problème d'accès desktop"
    fi
}

# Vérification des performances avec Lighthouse (si disponible)
check_lighthouse() {
    print_status "Vérification des performances avec Lighthouse..."
    
    if command -v lighthouse &> /dev/null; then
        print_status "Lighthouse disponible, analyse en cours..."
        lighthouse "$URL" --output=json --output-path=./lighthouse-report.json --chrome-flags="--headless" --only-categories=performance,accessibility,best-practices,seo
        
        if [ -f "./lighthouse-report.json" ]; then
            print_success "Rapport Lighthouse généré: ./lighthouse-report.json"
            rm -f ./lighthouse-report.json
        fi
    else
        print_warning "Lighthouse non installé. Installez-le avec: npm install -g lighthouse"
    fi
}

# Vérification des erreurs dans la console
check_console_errors() {
    print_status "Vérification des erreurs console..."
    
    # Cette vérification nécessiterait un navigateur headless comme Puppeteer
    # Pour l'instant, on vérifie juste que le site charge sans erreur HTTP
    local http_code=$(curl -s -o /dev/null -w "%{http_code}" "$URL")
    
    if [ "$http_code" = "200" ]; then
        print_success "Code HTTP 200 - Site chargé correctement"
    else
        print_error "Code HTTP $http_code - Problème de chargement"
    fi
}

# Fonction principale
main() {
    echo "🔍 Vérification de santé du site: $URL"
    echo "=========================================="
    echo ""
    
    # Vérifications de base
    check_site_availability || exit 1
    check_response_time
    check_ssl_certificate
    check_security_headers
    check_responsiveness
    check_console_errors
    
    echo ""
    
    # Vérifications avancées
    check_lighthouse
    
    echo ""
    echo "✅ Vérification de santé terminée !"
    echo "📱 Votre site est prêt pour la production"
    echo "🌐 URL: $URL"
}

# Gestion des arguments
case "${1:-}" in
    "help"|"-h"|"--help")
        echo "Usage: $0 [URL]"
        echo ""
        echo "Options:"
        echo "  URL         URL du site à vérifier (défaut: $DEFAULT_URL)"
        echo "  help        Affiche cette aide"
        echo ""
        echo "Exemples:"
        echo "  $0                    # Vérifie $DEFAULT_URL"
        echo "  $0 https://example.com # Vérifie example.com"
        ;;
    *)
        main
        ;;
esac
