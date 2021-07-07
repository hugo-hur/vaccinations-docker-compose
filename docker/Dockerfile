FROM ubuntu:20.04

# Disable Prompt During Packages Installation
ARG DEBIAN_FRONTEND=noninteractive
RUN apt update
RUN apt upgrade -y
RUN apt -y install postgresql-12 postgresql-client-12 curl

#Install node 14
RUN curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
RUN apt update && apt install -y nodejs

ADD ../postgraphile/ /home/ubuntu/postgraphile
