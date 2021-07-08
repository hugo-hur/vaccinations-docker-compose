FROM postgres:12.0-alpine
COPY ./init/ /docker-entrypoint-initdb.d/
ADD ./datafiles/ /usr/postgraphile/datafiles
#COPY ./pg_hba.conf /etc/postgresql/12/main/pg_hba.conf