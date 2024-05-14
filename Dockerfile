FROM nginx

COPY /var/www/loungespace.site /usr/share/nginx/html

# Экспонируйте порт 80 (по умолчанию для HTTP)
EXPOSE 80
EXPOSE 443