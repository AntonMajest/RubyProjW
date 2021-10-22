FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i && npm install react-router-dom
CMD ["npm", "run", "start"]

