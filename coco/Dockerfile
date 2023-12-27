FROM node:18.16.1 AS build
WORKDIR /COCO_Front_End
COPY package.json package-lock.json ./
RUN npm install
COPY . .

ENV NODE_OPTIONS=--max-old-space-size=4096
RUN npm run build

FROM nginx

RUN rm -rf /etc/nginx/conf.d
COPY conf/nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /COCO_Front_End/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]