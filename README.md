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

