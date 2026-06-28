FROM node:alpine as builder

COPY . /tobuild

WORKDIR /tobuild

# tailwind fait n'importe quoi quand y'a un gros gitignore, donc le mieux c'est de le supprimer pour le build
# la ci cd le fait deja dans tous les cas
RUN rm -rf .gitignore

RUN npm ci 

RUN npm run build

FROM nginx:alpine

COPY --from=builder tobuild/dist /usr/share/nginx/html

EXPOSE 80

# pour test ::
# docker build -t blavogiez.fr .
# docker run --rm -it -p 9090:80 blavogiez.fr