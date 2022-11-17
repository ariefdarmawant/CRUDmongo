FROM node

WORKDIR /CRUDmongo
COPY package.json .
RUN npm install
COPY . .
CMD npm start
