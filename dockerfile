# Etapa 1: Construir a aplicação
FROM node:16 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia o package.json e o package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Cria a aplicação Angular
RUN npm run build --prod

# Etapa 2: Servir a aplicação
FROM nginx:alpine

# Copia os arquivos construídos para o Nginx
COPY --from=build /app/dist/meu-projeto-angular /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
