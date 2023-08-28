# Use the official Node.js image as the base image
FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN apt update && \
    apt install -y wget netcat-traditional && \
    wget -q -O /usr/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for && \
    chmod +x /usr/bin/wait-for

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
