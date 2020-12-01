FROM node:12.19-alpine3.9

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g @angular/cli

COPY . .

RUN ng build --prod

EXPOSE 8080

CMD [ "node", "server.js" ]
