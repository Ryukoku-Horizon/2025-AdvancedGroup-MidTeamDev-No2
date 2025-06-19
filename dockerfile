# Dockerfile
FROM node:18
WORKDIR /app
COPY app/package*.json ./
RUN npm install -g gatsby-cli && npm install
COPY app .
EXPOSE 8000
CMD ["npm", "start"]
