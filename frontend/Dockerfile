FROM node:16.13-alpine

WORKDIR /app

COPY package.json /app/
COPY package-lock.json /app/
RUN yarn 

COPY . /app/
CMD ["yarn", "start"]