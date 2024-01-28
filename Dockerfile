FROM node:18-alpine as base

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN npm install -g yarn --force

RUN yarn install --ignore-scripts

COPY . .

RUN yarn build

EXPOSE ${SERVER_PORT}

CMD yarn dev