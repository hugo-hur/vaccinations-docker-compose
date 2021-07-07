FROM ubuntu:20.04

# Disable Prompt During Packages Installation
ARG DEBIAN_FRONTEND=noninteractive
RUN apt update
RUN apt upgrade -y
RUN apt -y install postgresql-12 postgresql-client-12 curl

#Install node 14
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt update && apt install -y nodejs sudo

ADD /postgraphile/ /home/ubuntu/postgraphile

WORKDIR /home/ubuntu/postgraphile/

RUN cp pg_hba.conf /etc/postgresql/12/main/pg_hba.conf
RUN systemctl restart postgresql.service

RUN sudo -u postgres psql -c 'create database vaccin;'
RUN sudo -u postgres psql -c "create user vaccin_impl with encrypted password 'vaccin_impl';"
RUN sudo -u postgres psql -c  'alter role vaccin_impl with createrole;'
RUN sudo -u postgres psql -c  "grant all privileges on database vaccin to vaccin_impl;"

WORKDIR /home/ubuntu/postgraphile/db/

RUN psql -h 127.0.0.1 -d vaccin -U vaccin_impl --single-transaction -f 00-create-tables.sql
RUN psql -h 127.0.0.1 -d vaccin -U vaccin_impl --single-transaction -f 01-import-json-datafiles.psql
RUN psql -h 127.0.0.1 -d vaccin -U vaccin_impl --single-transaction -f 02-import-data.sql
RUN psql -h 127.0.0.1 -d vaccin -U vaccin_impl --single-transaction -f 03-create-user.sql


WORKDIR /home/ubuntu/postgraphile/


#Install postgraphile
RUN npm install -g postgraphile

RUN npm install --save @graphile-contrib/pg-simplify-inflector
RUN npm install --save graphile-utils

CMD /home/ubuntu/postgraphile/postgraphile-dev.sh