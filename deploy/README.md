# Deploy Configuration

Эта папка содержит все файлы, необходимые для деплоя приложения на сервер.

## Файлы

- **`Dockerfile`** - Конфигурация для сборки Docker образа
- **`docker-compose.prod.yml`** - Конфигурация для production (порт 3000)
- **`docker-compose.staging.yml`** - Конфигурация для staging (порт 3001)
- **`nginx.conf`** - Конфигурация nginx внутри контейнера
- **`deploy.sh`** - Скрипт для ручного деплоя с поддержкой окружений
- **`env.production`** - Конфигурация для production окружения
- **`env.staging`** - Конфигурация для staging окружения
- **`DEPLOYMENT.md`** - Подробная документация по деплою

## Быстрый старт

### Локальное тестирование
```bash
# Production
docker compose -f deploy/docker-compose.prod.yml up --build

# Staging
docker compose -f deploy/docker-compose.staging.yml up --build
```

### Деплой на сервер
```bash
# Production
./deploy/deploy.sh production

# Staging
./deploy/deploy.sh staging
```

### GitHub Actions
- **Автоматический деплой**: push в master/main → production
- **Ручной деплой**: Actions → Run workflow → выбор окружения

## Структура проекта

```
project/
├── deploy/                    # Файлы для деплоя
│   ├── Dockerfile
│   ├── docker-compose.prod.yml
│   ├── nginx.conf
│   ├── deploy.sh
│   ├── env.template
│   ├── DEPLOYMENT.md
│   └── README.md
├── docker-compose.yml         # Для локальной разработки
├── .github/workflows/         # GitHub Actions
└── src/                       # Исходный код приложения
```

Подробная документация находится в файле `DEPLOYMENT.md`.
