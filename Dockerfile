FROM node:16-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3030

CMD ["pnpm", "dev"]