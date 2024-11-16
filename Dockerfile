FROM node:22.10.0 AS build

WORKDIR /app 
COPY package*.json ./ 
RUN npm config set strict-ssl false 
RUN npm install 
COPY . . 
RUN npm run build 


FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
