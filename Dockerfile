FROM node:18
WORKDIR /app
COPY package.json .
RUN npm install
RUN npx update-browserslist-db@latest
RUN npm install lodash
RUN npm install react-router-dom
RUN npm install js-cookie
RUN npm install react-slick --save
RUN npm install slick-carousel --save
RUN npm install react-modal
RUN npm update

COPY . .
EXPOSE 3000
CMD ["npm", "start"]
