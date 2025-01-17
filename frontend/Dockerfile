# Imagen base
FROM node:18

# Directorio de trabajo
WORKDIR /app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Compilar el proyecto
RUN npm run build

# Exponer puerto 3000
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "run", "start"]
