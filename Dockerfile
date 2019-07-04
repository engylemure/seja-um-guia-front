FROM jwilder/dockerize AS dockerize

FROM node:10.13.0-alpine

COPY --from=dockerize /usr/local/bin/dockerize /usr/local/bin

ADD app /app
COPY docker/  /files
RUN cp -rf /files/* /
RUN rm -rf /files

WORKDIR /app

RUN npm install -g serve

RUN npm install

VOLUME ["/app"]

ENTRYPOINT ["dockerize", "-template", "/env.tmpl:/app/.env"]

CMD ["sh", "/start.sh"]
