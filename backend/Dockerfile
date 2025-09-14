# --- Laufzeitbild für Node (Production) ---
FROM node:18-alpine

# Arbeitsverzeichnis
WORKDIR /app

# Nur package-Dateien kopieren und installieren (schlanker Build-Cache)
COPY package*.json ./

# Prod-Dependencies installieren
RUN npm ci --omit=dev

# Restlicher Code
COPY . .

# Port und Env
ENV NODE_ENV=production
EXPOSE 4000

# Startkommando (setzt voraus, dass "start" in package.json existiert)
CMD ["npm", "start"]
