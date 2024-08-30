const knex = require("../db/connection");

function read(email) {
  return knex("user")
    .select("*")
    .where({ email: email})
    .first();
}

module.exports = {
  read,
};
