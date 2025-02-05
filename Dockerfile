FROM node:20-bullseye

WORKDIR /app

# Instalar netcat para wait-for-it.sh
RUN apt-get update && apt-get install -y netcat

COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Copiar package.json y package-lock.json antes de ejecutar npm install
COPY package*.json ./

# Instalar dependencias después de importar la base de datos
RUN npm install

# Ejecutar el script db:importar antes de instalar dependencias
RUN npm run db:importar || echo "db:importar falló, continuando..."

# Copiar el resto de los archivos después de instalar dependencias
COPY . .

EXPOSE 3000

CMD ["/wait-for-it.sh", "postgres", "sh", "-c", "npm run db:importar && npm start"]