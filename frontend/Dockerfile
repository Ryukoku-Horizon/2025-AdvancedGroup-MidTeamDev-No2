FROM node:20

WORKDIR /frontend

COPY /frontend/package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]