# Documentation technique Wizia back-end 

## introduction du back-end de wizia

Ce readme servira au lancement de back-end de wizia 

## prérequis pour le lancement du projet 

- Docker 
- docker compose 

## Lancement du projet

```
git clone https://github.com/MatthieuQuerel/Lean_Start_UP_WIZIA
mkdir docker_build
cd ./Lean_Start_UP_WIZIA
cp ./.env.example ../docker_build/.env
cp ./docker-compose.prod.yml ../docker_build/docker-compose.prod.yml
cd ../docker_build
docker compose up -d
```



