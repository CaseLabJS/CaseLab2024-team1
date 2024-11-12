FROM node:22.10.0
WORKDIR /app
COPY package*.json ./
RUN npm config set strict-ssl false
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "dev"]
EXPOSE 5173
