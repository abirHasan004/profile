# Use an official Node.js runtime as the base image
FROM node:18

 
WORKDIR /app

 
COPY package.json package-lock.json ./
RUN npm install --production

 
COPY . .

 
EXPOSE 8080

 
CMD ["node", "index.js"]
