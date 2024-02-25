FROM node:20-alpine as development

WORKDIR /client/

COPY ./package.json ./package.json

#RUN #rm package-lock.json

RUN npm install
RUN npm install -g vite rollup

COPY client .

CMD ["npm", "run", "dev"]


FROM node:20-alpine as production

WORKDIR /client/
COPY ./package*.json .

RUN npm i


COPY client .

ARG API_URL
ENV VITE_REACT_APP_API_URL=$API_URL

RUN npm run build

EXPOSE 80
CMD [ "npm", "run", "preview"]