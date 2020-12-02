FROM node:10 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY ./ ./

RUN npm run build

FROM nginx
EXPOSE $PORT
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
