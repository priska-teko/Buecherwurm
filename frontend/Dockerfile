# --- Build-Stage ---
FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
# Vite Build (legt Ergebnis in /app/dist ab)
RUN npm run build

# --- Serve-Stage (Nginx) ---
FROM nginx:alpine
# Nginx-Konfig ersetzen durch unsere SPA-Config
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Gebautes Frontend kopieren
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
