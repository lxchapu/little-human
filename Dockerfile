FROM node:18-alpine as builder

WORKDIR /app

COPY . .

RUN corepack enable pnpm

RUN pnpm i \
  && pnpm build \
  && rm -fr node_modules

FROM nginx:1.25.4-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80