FROM node:lts-alpine
MAINTAINER Dave Samojlenko <dave.samojlenko@cds-snc.ca>

ADD ./ /web

WORKDIR /web

EXPOSE 3004

RUN yarn install --production
RUN yarn build

USER node

ENTRYPOINT ["/entrypoint.sh"]
