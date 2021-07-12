# vaccinations-docker-compose
Using docker compose to deploy webapp with nginx, postgraphile and postgresql database.

## Prerequisities
- Working docker environment on Linux system
- docker-compose
- Linux user with proper permissions to run Docker commands

## Build and run
To build the docker compose application run `docker-compose build` in this directory.
This builds the three required Docker images one for each
- Postgresql database
- Postgraphile
- Nginx

Run the application with `docker-compose up -d`.
This instantiates docker containers from the images built with the last command and starts them.
Stop the application with `docker-compose down`

# Containers

## db
Found in the `db` folder, this container is running the postgresql database that postgraphile uses.
During build the official postgresql 12 docker image is downloaded from docker repository and database initialization files are added to the image.
For more information, see `db/Dockerfile` and [Postgres Docker Hub](https://hub.docker.com/_/postgres).

## graphql
Graphql is an REST alternative api. I'm using [PostGraphile](https://www.graphile.org/postgraphile/) to automatically create read-only query api from the postgresql database running in its own container. The best benefit from Graphql over rest api is that the requester defines what data is needed to be returned and linking between tables can also be achieved without sending multiple requests. However downsides do exists, most notably client can do very intensive queries.