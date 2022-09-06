## New Image

sudo docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
docker run --name redis -p 6379:6379 -d -t redis:alpine

## Existing Image

sudo docker container start postgres
