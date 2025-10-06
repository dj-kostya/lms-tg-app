# Multi-stage build для оптимизации размера образа
FROM node:20-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./
COPY spec/ ./spec/

# Устанавливаем зависимости для spec
WORKDIR /app/spec
RUN npm ci

# Генерируем спецификацию
RUN npx tsp compile . --output-dir ../tsp-output

# Возвращаемся в корневую директорию
WORKDIR /app/tsp-output/clients/js

RUN npm ci && npm run build

WORKDIR /app

# Устанавливаем основные зависимости
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Production stage
FROM nginx:alpine

# Копируем собранное приложение
COPY --from=builder /app/dist /usr/share/nginx/html

# Копируем конфигурацию nginx
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
