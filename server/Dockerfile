FROM node:16-alpine AS BUILD_IMAGE

RUN mkdir -p /usr/app/
WORKDIR /usr/app

COPY ./ ./

RUN yarn install
RUN yarn run build
RUN rm -rf node_modules
RUN yarn install --production




EXPOSE 3000

CMD ["yarn", "run"]