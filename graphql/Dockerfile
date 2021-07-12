FROM node:alpine
LABEL description="Instant high-performance GraphQL API for your PostgreSQL database https://github.com/graphile/postgraphile"

# Install PostGraphile and PostGraphile plugins
WORKDIR /usr/postgraphile

#Install postgraphile
RUN npm install -g postgraphile

#Install pg-simplify-inflector plugin
RUN npm install --save @graphile-contrib/pg-simplify-inflector

#Install graphile-utils package for custom filters
RUN npm install --save graphile-utils

#Copy custom filter files to the poostgraphile directory
COPY ./filters/ /usr/postgraphile/filters

EXPOSE 5000
ENTRYPOINT ["postgraphile", "-n", "0.0.0.0"]