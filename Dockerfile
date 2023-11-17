FROM node:18-alpine

RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN apk --no-cache add curl

WORKDIR /src

COPY environments ./environments
COPY . .

COPY package.json ./
COPY yarn.lock ./yarn.lock
RUN yarn install 

RUN echo $(ls -1 ./)

EXPOSE 4002

HEALTHCHECK --interval=5s --timeout=3s CMD curl --fail --retry 3 --retry-delay 5  http://localhost:4002/health || exit 1


CMD [ "node", "./app.js" ]
