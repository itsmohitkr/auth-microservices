const knex = require("../db/connection");

function create(full_name, email, password) {
  return knex("user")
    .insert({full_name, email, password})
    .returning("*")
    .then((created) => created[0]);
}

function read(email) {
  return knex("user").select("*").where({ email: email }).first();
}

module.exports = {
  create,
  read,
};
