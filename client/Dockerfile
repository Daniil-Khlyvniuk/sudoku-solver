FROM node:20-alpine as development

WORKDIR /client/

COPY ./package*.json .

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev" ]


FROM node:20-alpine as production

WORKDIR /client/
COPY ./package*.json .

RUN npm i

COPY . .

RUN npm run build

EXPOSE 80
CMD [ "npm", "run", "preview"]