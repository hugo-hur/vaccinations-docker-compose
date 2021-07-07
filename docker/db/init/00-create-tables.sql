create database vaccin;
create user vaccin_impl with encrypted password 'vaccin_impl';
alter role vaccin_impl with createrole;
grant all privileges on database vaccin to vaccin_impl;

--
-- vaccin_impl schema is the private implementation schema
--

create schema vaccin_impl;

-- json tables used to import json files to the database
create table orders_j ("json" jsonb);
create table vaccinations_j ("json" jsonb);

-- actual data tables that will be populated from json tables with a stored
-- procedure
create table orders (
 id                   uuid primary key
,order_number         int not null
,responsible_person   text not null
,health_care_district text not null
,vaccine              text not null
,injections           int not null
,arrived              timestamp with time zone not null
,expires              timestamp with time zone not null
);

create index orders_index1 on orders (health_care_district);

create table vaccinations (
 id               uuid primary key
,orders_id        uuid not null references orders(id)
,gender           text not null
,vaccination_date timestamp with time zone not null
);

create index vaccinations_index1 on vaccinations (orders_id);
