ARG APP_IMAGE=ghcr.io/matthieuquerel/lean_start_up_wizia/app:latest
FROM ${APP_IMAGE} AS app

FROM nginx:alpine
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy the public folder from the app image so nginx can serve static files & index.php
COPY --from=app /var/www/public /var/www/public
