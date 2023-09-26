FROM node:18
WORKDIR /app
COPY package.json .
RUN npm install
RUN npm install react-router-dom
RUN npm install axios
RUN npm install js-cookie
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
