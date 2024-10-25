FROM node:lts-alpine
RUN npm install -g webpack
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g
COPY . .
RUN npm run build
EXPOSE 8080 3333 9090
CMD [ "npm", "run", "dev:hot" ]