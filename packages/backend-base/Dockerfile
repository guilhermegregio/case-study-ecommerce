FROM keymetrics/pm2:latest-alpine

RUN apk add --update python build-base

COPY src src/
COPY package.json .
COPY ecosystem.config.js .

RUN npm install --production

EXPOSE 3000

CMD [ "pm2-runtime", "start", "ecosystem.config.js", "--env", "production", "--json" ]
