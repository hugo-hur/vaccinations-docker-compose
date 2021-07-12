FROM node:alpine
LABEL description="Instant high-performance GraphQL API for your PostgreSQL database https://github.com/graphile/postgraphile"

# Install PostGraphile and PostGraphile plugins
WORKDIR /usr/postgraphile

RUN npm install -g postgraphile
#RUN npm install -g postgraphile-plugin-connection-filter
#RUN npm install -g @graphile-contrib/pg-simplify-inflector
RUN npm install --save @graphile-contrib/pg-simplify-inflector
#RUN npm install -g graphile-utils
RUN npm install --save graphile-utils

ADD ./filters/ /usr/postgraphile/filters

EXPOSE 5000
ENTRYPOINT ["postgraphile", "-n", "0.0.0.0"]