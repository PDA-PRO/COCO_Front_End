# COCO_Front_End

[![Build Status](https://app.travis-ci.com/PDA-PRO/COCO_Front_End.svg?branch=develop)](https://app.travis-ci.com/PDA-PRO/COCO_Front_End)

## 개요

- 반응형 지원

## 빠른 시작

[Quick install](https://github.com/PDA-PRO/COCO-deploy)

## 개발 환경으로 시작

기본적으로 [백엔드](https://github.com/PDA-PRO/COCO_Back_End) 설치 없이 프론트엔드만 설치할 경우 예기치 못한 오류가 발생 할 수 있습니다.  
또한 개발에 따른 오류가 발생할 수 있습니다.

#### System: Ubuntu 20.04.6 LTS

1. 도커 설치

   ```bash
   sudo apt update
   sudo apt install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
   sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
   sudo apt-get update
   sudo apt-get install docker-ce docker-ce-cli containerd.io
   sudo usermod -aG docker
   sudo curl -L "https://github.com/docker/compose/releases/download/v2.5.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

2. 도커 컴포즈 설치

   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/download/v2.5.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

   Other installation methods: [https://docs.docker.com/install/](https://docs.docker.com/install/)

#### System: Windows 10

1. 도커 데스크탑 설치  
   [도커 데스크탑 설치](https://docs.docker.com/desktop/install/windows-install/)

### 설치하기

1. 공간이 충분한 위치를 선택하고 다음 명령을 실행하세요

   ```bash
   git clone https://github.com/PDA-PRO/COCO_Front_End.git
   cd COCO_Front_End
   ```

2. 도커 이미지 빌드

   ```bash
   docker compose up -d --build
   ```

   데스크탑의 성능에 따라 모든 설정이 끝날떄까지 5~10분이 소요됩니다.

### 실행하기

브라우저를 통해 http://localhost:80 포트로 접속하여 이용하실 수 있습니다.

## FAQ

## 라이선스
