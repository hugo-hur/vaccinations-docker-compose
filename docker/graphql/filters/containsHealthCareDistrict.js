const { makeAddPgTableConditionPlugin } = require('graphile-utils');

module.exports = makeAddPgTableConditionPlugin(
    "vaccin_impl",
    "orders",
    "containsHealthCareDistrict",
    build => ({ description: "Orders of a health care district.", type: build.graphql.GraphQLString }),
    (value, helpers, build) => {
        const { sql } = helpers;
        return sql.fragment`health_care_district = ${sql.value(value)}`
    }
);
