FROM node:14

RUN npm install -g http-server

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

ENV QUOTES_SERVICE_URL=http://localhost:3001

CMD ["http-server", "dist"]
