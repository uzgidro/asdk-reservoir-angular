# Используем официальный Node.js образ для сборки приложения
FROM node:22.13.1-alpine AS build

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем остальные файлы проекта
COPY . .

# Собираем приложение Angular для production
RUN npm run build -- --configuration production && npm cache clean --force && rm -rf node_modules

# Используем Nginx для обслуживания статических файлов
FROM nginx:alpine

# Копируем собранные файлы из предыдущего этапа в папку Nginx
COPY --from=build /app/dist/uasdk-angular/browser /usr/share/nginx/html

# Копируем конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Порт, который будет использоваться для доступа к приложению
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
