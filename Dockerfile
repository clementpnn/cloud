FROM node:21-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["pnpx", "serve", "-s", "dist", "-l", "3000"]