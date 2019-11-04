FROM node:lts-alpine
MAINTAINER Dave Samojlenko <dave.samojlenko@cds-snc.ca>

ADD ./ /web

WORKDIR /web

EXPOSE 3004

RUN npm install --production
RUN npm build

USER node

ENTRYPOINT ["npm", "start"]
