FROM node:20-alpine

ENV NPM_VERSION=10.2.4
ENV NEST_VERSION=10

WORKDIR /db-backend

RUN npm install -g "npm@^${NPM_VERSION}"

COPY ./package*.json /db-backend/
COPY . .

RUN npm i --include=optional

COPY . .

CMD ["npm", "run", "start:dev"]
