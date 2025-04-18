FROM node:16-alpine

WORKDIR /app

COPY . .

RUN npm config set registry http://registry.npmjs.org/
RUN npm install

EXPOSE 8082

CMD ["node", "server.js"]
