#!/bin/bash
set -e

# Exécuter les migrations (avec --force pour la production)
echo "🚀 Exécution des migrations..."
php artisan migrate --force

# Lancer la commande originale (php-fpm)
echo "🚀 Démarrage de l'application..."
exec "$@"
