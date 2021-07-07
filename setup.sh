#!/bin/bash

sudo apt update
sudo apt -y install postgresql-12 postgresql-client-12 curl

curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -

sudo apt update
sudo apt install -y nodejs
node  -v


sudo cp pg_hba.conf /etc/postgresql/12/main/pg_hba.conf
sudo systemctl restart postgresql.service

sudo -u postgres psql -c 'create database vaccin;'
sudo -u postgres psql -c "create user vaccin_impl with encrypted password 'vaccin_impl';"
sudo -u postgres psql -c  'alter role vaccin_impl with createrole;'
sudo -u postgres psql -c  "grant all privileges on database vaccin to vaccin_impl;"

cd db
psql -h 127.0.0.1 -d vaccin -U vaccin_impl --single-transaction -f 00-create-tables.sql
psql -h 127.0.0.1 -d vaccin -U vaccin_impl --single-transaction -f 01-import-json-datafiles.psql
psql -h 127.0.0.1 -d vaccin -U vaccin_impl --single-transaction -f 02-import-data.sql
psql -h 127.0.0.1 -d vaccin -U vaccin_impl --single-transaction -f 03-create-user.sql
cd ..




#Install postgrahile
sudo npm install -g postgraphile

npm install --save @graphile-contrib/pg-simplify-inflector
npm install --save graphile-utils