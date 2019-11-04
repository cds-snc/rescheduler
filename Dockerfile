FROM node:lts-alpine
MAINTAINER Dave Samojlenko <dave.samojlenko@cds-snc.ca>

ADD ./ /web

WORKDIR /web

EXPOSE 3000

RUN npm install --production
RUN npm build

USER node

ENTRYPOINT ["npm", "start"]
