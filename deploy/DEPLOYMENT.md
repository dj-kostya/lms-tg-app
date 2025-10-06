# Инструкция по настройке автоматического деплоя

## Обзор

Система автоматического деплоя настроена для развертывания React приложения на сервер с Docker через GitHub Actions.

## Компоненты системы

Все файлы для деплоя находятся в папке `deploy/`:

1. **deploy/Dockerfile** - многоэтапная сборка приложения с nginx
2. **docker-compose.yml** - для локальной разработки (в корне проекта)
3. **deploy/docker-compose.prod.yml** - для продакшена (порт 3000)
4. **deploy/docker-compose.staging.yml** - для staging (порт 3001)
5. **deploy/nginx.conf** - конфигурация веб-сервера в контейнере
6. **deploy/deploy.sh** - скрипт для ручного деплоя с поддержкой окружений
7. **deploy/env.production** - конфигурация для production
8. **deploy/env.staging** - конфигурация для staging
9. **.github/workflows/deploy-to-server.yml** - автоматический деплой с выбором окружения

## Настройка сервера

### 1. Установка Docker

```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
sudo usermod -aG docker $USER

# CentOS/RHEL
sudo yum install -y docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
```

### 2. Создание пользователя для деплоя

```bash
# Создаем пользователя deploy
sudo useradd -m -s /bin/bash deploy
sudo usermod -aG docker deploy

# Создаем SSH ключ для пользователя deploy
sudo -u deploy ssh-keygen -t rsa -b 4096 -f /home/deploy/.ssh/id_rsa -N ""
```

### 3. Настройка директорий

```bash
sudo mkdir -p /opt/lms-tg-app
sudo chown deploy:deploy /opt/lms-tg-app
```

## Настройка GitHub Secrets

В настройках репозитория GitHub добавьте следующие secrets:

1. **SERVER_HOST** - IP адрес или домен вашего сервера
2. **SERVER_USER** - пользователь для SSH подключения (например, `deploy`)
3. **SERVER_SSH_KEY** - приватный SSH ключ для подключения к серверу
4. **SERVER_PORT** - порт SSH (по умолчанию 22)

### Получение SSH ключа

```bash
# На сервере
sudo cat /home/deploy/.ssh/id_rsa
```

Скопируйте содержимое файла и добавьте в GitHub Secrets как `SERVER_SSH_KEY`.

## Настройка SSH на сервере

### 1. Добавление публичного ключа GitHub

```bash
# Создаем authorized_keys
sudo -u deploy mkdir -p /home/deploy/.ssh
sudo -u deploy chmod 700 /home/deploy/.ssh

# Добавляем публичный ключ GitHub Actions
echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQC..." | sudo -u deploy tee -a /home/deploy/.ssh/authorized_keys
sudo -u deploy chmod 600 /home/deploy/.ssh/authorized_keys
```

### 2. Настройка SSH сервера

```bash
# Редактируем /etc/ssh/sshd_config
sudo nano /etc/ssh/sshd_config

# Добавляем/изменяем:
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
PasswordAuthentication no
PermitRootLogin no

# Перезапускаем SSH
sudo systemctl restart sshd
```

## Настройка Nginx на сервере

Поскольку на сервере уже настроен nginx и SSL, создайте конфигурацию для проксирования на Docker контейнер:

```nginx
# /etc/nginx/sites-available/lms-tg-app
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    # SSL конфигурация (уже настроена на сервере)
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;

    # Проксирование на Docker контейнер
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;
        
        # WebSocket поддержка (если нужна)
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        
        # Таймауты
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Health check endpoint
    location /health {
        proxy_pass http://localhost:3000/health;
        access_log off;
    }
}
```

```bash
# Активируем конфигурацию
sudo ln -s /etc/nginx/sites-available/lms-tg-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Тестирование деплоя

### 1. Локальное тестирование

```bash
# Production окружение
docker compose -f deploy/docker-compose.prod.yml up --build
curl http://localhost:3000/health

# Staging окружение
docker compose -f deploy/docker-compose.staging.yml up --build
curl http://localhost:3001/health
```

### 2. Ручной деплой на сервер

```bash
# Копируем файлы на сервер
scp -r . deploy@your-server:/opt/lms-tg-app/

# Подключаемся к серверу
ssh deploy@your-server

# Запускаем деплой
cd /opt/lms-tg-app
chmod +x deploy/deploy.sh

# Production деплой
./deploy/deploy.sh production

# Staging деплой
./deploy/deploy.sh staging
```

### 3. Автоматический деплой

После настройки всех secrets, автоматический деплой будет происходить при:
- Push в ветку `master` или `main` (автоматически в production)
- Создании тега `v*` (автоматически в production)
- Ручном запуске workflow с выбором окружения (production или staging)

## Мониторинг

### Проверка статуса сервисов

```bash
# Статус всех сервисов
docker compose -f deploy/docker-compose.prod.yml ps

# Логи основного сервиса
docker compose -f deploy/docker-compose.prod.yml logs lms-tg-app

# Логи всех сервисов
docker compose -f deploy/docker-compose.prod.yml logs

# Health check
curl http://localhost:3000/health
```

### Управление сервисами

```bash
# Остановка всех сервисов
docker compose -f deploy/docker-compose.prod.yml down

# Перезапуск сервисов
docker compose -f deploy/docker-compose.prod.yml restart

# Обновление сервисов
docker compose -f deploy/docker-compose.prod.yml up -d --build

# Просмотр ресурсов
docker compose -f deploy/docker-compose.prod.yml top
```

### Автоматический перезапуск

Все сервисы настроены на автоматический перезапуск при сбоях:

```bash
# Проверка политики перезапуска
docker compose -f deploy/docker-compose.prod.yml config
```

## Обновление приложения

### Автоматическое обновление

При каждом push в master/main ветку происходит автоматический деплой.

### Ручное обновление

```bash
# На сервере
cd /opt/lms-tg-app
git pull origin master
./deploy/deploy.sh production
```

## Откат к предыдущей версии

```bash
# Список образов
docker images | grep lms-tg-app

# Остановка текущих сервисов
docker compose -f deploy/docker-compose.prod.yml down

# Запуск предыдущей версии
docker run -d --name lms-tg-app --network lms-network --restart unless-stopped -p 3000:80 lms-tg-app:previous-tag

# Или через docker-compose с конкретным тегом
# Отредактируйте deploy/docker-compose.prod.yml, указав нужный тег образа
docker compose -f deploy/docker-compose.prod.yml up -d
```

## Архитектура деплоя

Приложение развертывается в Docker контейнерах на разных внутренних портах в зависимости от окружения:
- **Production**: порт 3000
- **Staging**: порт 3001

Внешний nginx на сервере проксирует запросы на соответствующий порт.

```
Internet → nginx (сервер) → Docker контейнер (порт 3000/3001)
```

### Преимущества такой архитектуры:
- Используется существующий nginx и SSL на сервере
- Поддержка нескольких окружений на одном сервере
- Простое управление через docker-compose
- Легкое обновление приложения
- Изоляция приложения в контейнере
- Возможность параллельного запуска production и staging

## Безопасность

1. **SSH ключи** - используйте только ключи, не пароли
2. **Firewall** - настройте правила для портов 22 (SSH) и 80 (HTTP)
3. **SSL** - настройте HTTPS с помощью Let's Encrypt
4. **Обновления** - регулярно обновляйте систему и Docker

## Troubleshooting

### Проблемы с SSH

```bash
# Проверка SSH подключения
ssh -v deploy@your-server

# Проверка логов SSH
sudo tail -f /var/log/auth.log
```

### Проблемы с Docker

```bash
# Проверка статуса Docker
sudo systemctl status docker

# Очистка Docker
docker system prune -a
```

### Проблемы с приложением

```bash
# Логи контейнера
docker logs lms-tg-app

# Вход в контейнер
docker exec -it lms-tg-app sh

# Проверка сетевых подключений
docker network ls
docker network inspect lms-tg-app-network
```
