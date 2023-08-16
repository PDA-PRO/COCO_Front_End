FROM node:16.14.2
WORKDIR /COCO_Front_End/coco
COPY package.json package-lock.json ./
RUN npm install 
COPY . ./
EXPOSE 3000

# 1.리액트 앱 root 디렉토리에서 IDE 터미널 커맨드라인에서 아래 명령어를 실행한다.
# docker build .
# 2. -t 옵션으로 이름(태그)를 만들어 다시 빌드
# docker build -t react-image .
# 3. 만들어진 이미지로 도커 컨테이너를 띄우려면 아래의 명령어를 실행한다.
# docker run -d --name <container-name> <image-name>