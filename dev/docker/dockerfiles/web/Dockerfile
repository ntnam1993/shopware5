FROM webdevops/php-apache-dev:7.4

RUN wget -O "/usr/local/bin/go-replace" "https://github.com/webdevops/goreplace/releases/download/1.1.2/gr-arm64-linux"

RUN chmod +x "/usr/local/bin/go-replace"

RUN "/usr/local/bin/go-replace" --version

# Install common packages
RUN apt-get update && apt-get install --no-install-recommends -y \
        apt-transport-https \
        bzip2 \
        iputils-ping \
        locate \
        openssh-client \
        vim \
        wget \
        unzip \
        zip \
        rsync \
        git \
        gnupg \
        libjpeg-progs \
        optipng

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- \
        --install-dir=/usr/local/bin --filename=composer

# Install further packages and PHP extensions
RUN apt-get update && apt-get install --no-install-recommends -y \
        libfreetype6-dev \
        libicu-dev \
        libjpeg-dev \
        libmcrypt-dev \
        libpng-dev \
        libxml2-dev \
        libzip-dev \
        locales \
        locales-all \
        mariadb-client \
    && apt-get clean -y \
    && docker-php-ext-install \
        bcmath \
        ctype \
        dom \
        gd \
        gettext \
        iconv \
        intl \
        json \
        mysqli \
        pdo_mysql \
        session \
        simplexml \
        xml \
        zip \
        opcache

# RUN pecl install apcu
RUN docker-php-ext-enable apcu

RUN curl -sL https://deb.nodesource.com/setup_11.x | bash

# https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=863199
RUN mkdir -p /usr/share/man/man1

RUN apt-get update && apt-get install -y ant nodejs

RUN docker-php-ext-install soap

COPY php-config.ini /opt/docker/etc/php/php.ini

COPY wait-for-it.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/wait-for-it.sh

ENV COMPOSER_CACHE_DIR=/.composer/cache
ENV WEB_DOCUMENT_ROOT=/var/www/html

WORKDIR /var/www/html
