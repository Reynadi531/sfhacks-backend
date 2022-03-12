FROM node:16-alpine

WORKDIR /app

RUN apk update && \
  apk add alpine-sdk --no-cache

CMD ["yarn", "dev"]