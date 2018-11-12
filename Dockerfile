FROM nginx
RUN sed -i "s/location \/ {/location \/ {\n        try_files \$uri \$uri\/ \/index.html =404;/g" /etc/nginx/conf.d/default.conf
COPY public_html /usr/share/nginx/html
EXPOSE 80