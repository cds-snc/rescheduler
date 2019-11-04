FROM node:lts-alpine
MAINTAINER Dave Samojlenko <dave.samojlenko@cds-snc.ca>

ADD ./ /web

WORKDIR /web

EXPOSE 8080

RUN npm install --production
RUN npm build

ENTRYPOINT ["npm", "start"]
