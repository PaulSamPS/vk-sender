FROM node:20.15
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
CMD ["node", "dist/main"]
EXPOSE 5555