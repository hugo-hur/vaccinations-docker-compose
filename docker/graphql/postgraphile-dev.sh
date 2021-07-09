#!/bin/bash

# the recommended development options from:
# https://www.graphile.org/postgraphile/usage-cli/

declare -r DATABASE_URL="$1"
declare -r SCHEMA="$2"

declare -r ROOT_DIR=$(readlink --canonicalize "${BASH_SOURCE%/*}")
declare -r PLUGIN_DIR=${ROOT_DIR}/node_modules
declare -r FILTER_DIR=${ROOT_DIR}/filters

# TODO: these options don't work currently unless pg part has been changed
#  --watch \

postgraphile \
  --subscriptions \
  --dynamic-json \
  --no-setof-functions-contain-nulls \
  --no-ignore-rbac \
  --no-ignore-indexes \
  --show-error-stack=json \
  --extended-errors hint,detail,errcode \
  --append-plugins ${PLUGIN_DIR}/@graphile-contrib/pg-simplify-inflector,${FILTER_DIR}/arrivedEarlierThan.js,${FILTER_DIR}/arrivedLaterThan.js,${FILTER_DIR}/expiresEarlierThan.js,${FILTER_DIR}/expiresLaterThan.js \
  --export-schema-graphql schema.graphql \
  --graphiql "/" \
  --enhance-graphiql \
  --allow-explain \
  --enable-query-batching \
  --legacy-relations omit \
  --connection ${DATABASE_URL} \
  --schema ${SCHEMA}
