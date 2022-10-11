FROM node:16

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY next.config.js ./next.config.js
COPY tsconfig.json ./tsconfig.json

COPY pages ./pages
COPY src ./src
COPY public ./public
COPY styles ./styles

CMD ["yarn", "dev"]