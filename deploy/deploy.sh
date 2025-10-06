#!/bin/bash

# Скрипт для деплоя приложения на сервер с docker-compose
# Использование: ./deploy.sh [environment]
# Пример: ./deploy.sh production

set -e

# Конфигурация
APP_NAME="lms-tg-app"
COMPOSE_FILE="docker-compose.prod.yml"
ENV_FILE=".env"

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Функция для логирования
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}"
    exit 1
}

warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

# Параметры
ENVIRONMENT=${1:-production}

# Загружаем конфигурацию для окружения
if [ -f "env.$ENVIRONMENT" ]; then
    log "Загружаем конфигурацию для окружения: $ENVIRONMENT"
    source env.$ENVIRONMENT
else
    error "Конфигурация для окружения '$ENVIRONMENT' не найдена. Доступные: production, staging"
fi

# Устанавливаем compose файл на основе окружения
COMPOSE_FILE="docker-compose.$ENVIRONMENT.yml"

# Проверяем, что Docker и Docker Compose запущены
if ! docker info > /dev/null 2>&1; then
    error "Docker не запущен или недоступен"
fi

if ! docker compose version > /dev/null 2>&1; then
    error "Docker Compose не установлен или недоступен"
fi

# Проверяем наличие файлов
if [ ! -f "$COMPOSE_FILE" ]; then
    error "Файл $COMPOSE_FILE не найден"
fi

# Создаем .env файл из конфигурации окружения
log "Создаем .env файл для окружения $ENVIRONMENT"
cp env.$ENVIRONMENT .env

log "Начинаем деплой приложения $APP_NAME в режиме $ENVIRONMENT"

# Останавливаем и удаляем старые контейнеры
log "Останавливаем старые контейнеры..."
docker compose -f $COMPOSE_FILE down --remove-orphans || true

# Собираем новые образы
log "Собираем новые Docker образы..."
docker compose -f $COMPOSE_FILE build --no-cache

# Запускаем сервисы
log "Запускаем сервисы..."
docker compose -f $COMPOSE_FILE up -d

# Ждем запуска сервисов
log "Ждем запуска сервисов..."
sleep 10

# Проверяем статус сервисов
log "Проверяем статус сервисов..."
docker compose -f $COMPOSE_FILE ps

# Проверяем health check основного сервиса
log "Проверяем health check..."
if curl -f $HEALTH_CHECK_URL > /dev/null 2>&1; then
    log "Health check прошел успешно!"
else
    warning "Health check не прошел, но сервисы запущены"
fi

# Показываем логи основного сервиса
log "Последние логи основного сервиса:"
docker compose -f $COMPOSE_FILE logs --tail 20 $APP_NAME

# Очищаем неиспользуемые образы
log "Очищаем неиспользуемые Docker образы..."
docker image prune -f

log "Деплой завершен успешно!"
log "Приложение доступно на внутреннем порту $APP_PORT"
log "Настройте nginx на сервере для проксирования на localhost:$APP_PORT"
log "Окружение: $ENVIRONMENT"
log "Контейнер: $CONTAINER_NAME"
log "Сеть: $NETWORK_NAME"
