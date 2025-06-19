FROM node:18

WORKDIR /app

COPY app/package*.json ./
RUN npm install -g gatsby-cli && npm install

COPY app/ .

EXPOSE 8000

CMD ["gatsby", "develop", "-H", "0.0.0.0"]
