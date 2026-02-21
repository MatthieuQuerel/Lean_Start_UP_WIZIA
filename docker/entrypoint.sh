#!/bin/bash
set -e
# ──────────────────────────────────────────────
# 0. Git safe directory (bind mount ownership differs)
# ──────────────────────────────────────────────
git config --global --add safe.directory /var/www 2>/dev/null || true
# ──────────────────────────────────────────────
# 1. Créer les sous-dossiers dans le volume storage
#    (au premier démarrage le volume est vide)
# ──────────────────────────────────────────────
echo "📁 Création des dossiers storage..."
mkdir -p /var/www/storage/logs \
         /var/www/storage/framework/cache/data \
         /var/www/storage/framework/sessions \
         /var/www/storage/framework/views \
         /var/www/storage/app/public/NetworkPicture \
         /var/www/storage/app/public/posts \
         /var/www/storage/app/public/logo \
         /var/www/storage/app/public/mailings \
         /var/www/bootstrap/cache

# ──────────────────────────────────────────────
# 2. Fixer les permissions (entrypoint tourne en root)
# ──────────────────────────────────────────────
echo "🔧 Correction des permissions..."
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache 2>/dev/null || echo "⚠️  chown ignoré (bind mount Windows)"
chmod -R 775 /var/www/storage /var/www/bootstrap/cache 2>/dev/null || echo "⚠️  chmod ignoré (bind mount Windows)"
# chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
# chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# ──────────────────────────────────────────────
# 3. Installer les dépendances Composer
# ──────────────────────────────────────────────
if [ ! -f /var/www/vendor/autoload.php ]; then
  echo "📦 Installation des dépendances Composer..."
  composer install --no-interaction --optimize-autoloader
fi

# ──────────────────────────────────────────────
# 3. Lien symbolique public/storage -> storage/app/public
# ──────────────────────────────────────────────
php artisan storage:link --force 2>/dev/null || true

# ──────────────────────────────────────────────
# 4. Migrations
# ──────────────────────────────────────────────
echo "🚀 Exécution des migrations..."
php artisan migrate --force || echo "⚠️  Migrations échouées, poursuite du démarrage..."

# ──────────────────────────────────────────────
# 5. Lancer php-fpm
# ──────────────────────────────────────────────
echo "🚀 Démarrage de l'application..."
exec "$@"
