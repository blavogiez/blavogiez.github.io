FROM node:22-alpine as builder

WORKDIR /tobuild

COPY . .

RUN rm -rf .gitignore

RUN npm ci 

RUN npm run build

FROM jbeveridge/nginx-distroless

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /tobuild/dist /usr/share/nginx/html

EXPOSE 8080
