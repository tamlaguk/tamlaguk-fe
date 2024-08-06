# Build stage
FROM node:20.12.1
WORKDIR /usr/src/app
RUN mkdir build
COPY krampoline/build/ ./build/
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "build"]
