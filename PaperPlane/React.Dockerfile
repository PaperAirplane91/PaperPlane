FROM node:18.13.0

WORKDIR /app/frontend

COPY src/main/webapp/ .

COPY package*.json ./

COPY webpack/ ./webpack/

COPY tsconfig.json ./

RUN npm install

EXPOSE 3000

#CMD ["npm", "start"]

ENTRYPOINT ["npm", "start"]
