FROM node:8.9.4-alpine as base-image
RUN mkdir -p /tmp/src
WORKDIR /tmp/src
COPY . /tmp/src
RUN yarn
# RUN yarn test
RUN yarn build

FROM node:8.9.4-alpine
RUN mkdir -p /usr/src
WORKDIR /usr/src
COPY --from=base-image /tmp/src/dist /usr/src/
RUN yarn --prod
EXPOSE 5000
CMD yarn serve