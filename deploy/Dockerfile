# Multi-stage build для оптимизации размера образа
FROM node:20-alpine AS typespec-builder

WORKDIR /app/spec
COPY spec/ ./

RUN ls -la && npm ci

RUN npx tsp compile . --output-dir tsp-output && cd tsp-output/clients/js && npm i && npm run build

FROM node:20-alpine AS main-builder
# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./
COPY --from=typespec-builder /app/spec/tsp-output/clients/js/ ./tsp-output/clients/js/

WORKDIR /app

# Устанавливаем основные зависимости
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Production stage
FROM nginx:alpine as main

# Копируем собранное приложение
COPY --from=main-builder /app/dist /usr/share/nginx/html

# Копируем конфигурацию nginx
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
