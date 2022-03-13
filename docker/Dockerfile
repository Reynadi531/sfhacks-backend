FROM node:16-alpine

RUN apk update && \
    apk add alpine-sdk --no-cache

WORKDIR /app
COPY package*.json yarn.lock ./

RUN yarn install

COPY . .
RUN yarn build

CMD ["node", "dist/app.js"]
