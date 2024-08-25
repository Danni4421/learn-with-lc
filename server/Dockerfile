FROM php:8.2-fpm

# Set default work directory
WORKDIR /var/www

# Remove default server definition
RUN rm -rf /var/www/html

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    curl \
    unzip \
    git \
    libzip-dev \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    vim \
    default-mysql-client && \
    docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configure non-root user.
ARG PUID=1000
ENV PUID ${PUID}
ARG PGID=1000
ENV PGID ${PGID}

RUN groupmod -o -g ${PGID} www-data && \
    usermod -o -u ${PUID} -g www-data www-data

# Copy existing application directory contents
COPY . /var/www

# Ensure storage and cache directories exist
RUN mkdir -p /var/www/storage /var/www/bootstrap/cache

# Change ownership of application directory
RUN chown -R www-data:www-data /var/www \
    && chmod -R 775 /var/www/storage \
    && chmod -R 775 /var/www/bootstrap/cache

# Install dependencies
RUN composer install --no-interaction

# Expose default port
EXPOSE 9000

# Clear cached config
RUN php artisan config:clear

# Change current user to www-data
USER www-data

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=9000"]