# FROM node:16-alpine

# WORKDIR /app

# RUN chown node:node /app

# USER node

# COPY --chown=node:node . .

# RUN yarn

# EXPOSE 3000

# CMD [ "yarn", "start:dev"]


FROM node:16-alpine AS build

WORKDIR /app

COPY . ./

RUN yarn 

RUN yarn build

FROM node:16-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/dist /app/dist

COPY --from=build /app/node_modules /app/node_modules

EXPOSE 3000

ENTRYPOINT [ "node" ]

CMD [ "dist/main.js" ]