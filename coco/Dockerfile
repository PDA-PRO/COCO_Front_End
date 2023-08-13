FROM node:16.14.2
WORKDIR /COCO_Front_End/coco
COPY package.json package-lock.json ./
RUN npm install 
COPY . ./
EXPOSE 3000