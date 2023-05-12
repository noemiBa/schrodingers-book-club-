FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

ENV QUOTES_SERVICE_URL=http://localhost:3001

CMD ["npm", "run", "serve"]
