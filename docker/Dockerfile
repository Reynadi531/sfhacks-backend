FROM node:16-alpine

RUN apk update && \
  apk add alpine-sdk --no-cache

WORKDIR /app
COPY package*.json yarn.lock ./

RUN yarn install

COPY . .
RUN npm i -g pm2
RUN yarn build

CMD ["pm2-runtime", "dist/app.js"]
