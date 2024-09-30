const env = process.env.NODE_ENV || "development";
const config = require("../../knexfile")[env];
const apiTableConfig = require("../../knexfile").developmentApi;
const knex = require("knex")(config);
const knexApiTable = require("knex")(apiTableConfig);

module.exports = { knex, knexApiTable };
