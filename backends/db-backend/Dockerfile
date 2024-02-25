FROM node:20-alpine as development

WORKDIR /db-backend
COPY ./package*.json /db-backend/

RUN npm install
COPY . .

CMD ["npm", "run", "start:dev"]


FROM node:20-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /db-backend
COPY ./package*.json /db-backend/

RUN npm install --only=production
COPY . .

CMD ["npm", "run", "start:prod"]
