FROM node:0.12.7
MAINTAINER Inaki Anduaga <inaki@inakianduaga.com>

# Update npm to the latest version
RUN npm install npm -g

# Add compiled folder
ADD ./dist /app/dist

WORKDIR /app
VOLUME /app

EXPOSE 3000

ENTRYPOINT ["node", "./dist/github.js"]