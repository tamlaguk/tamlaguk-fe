# Build stage
FROM node:20.12.1
WORKDIR /usr/src/app
COPY . .
RUN npm install

RUN npm run build

RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "build"]
