FROM smebberson/alpine-nginx-nodejs

WORKDIR /app

COPY nginx.conf /etc/nginx/conf.d/default.conf
ADD frontend-catalog-1.0.0.tgz /app

WORKDIR /app/package

ENV NODE_ENV=production NODE_PORT=3000

RUN npm install -g pm2  
RUN npm install --production
RUN npm run build

EXPOSE 80

CMD ["pm2", "--no-daemon", "start", "npm", "--name", "next", "--", "start"]
