FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install -g gatsby-cli && npm install

COPY . .

CMD ["npm", "start"]
