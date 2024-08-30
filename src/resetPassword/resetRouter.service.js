const knex = require("../db/connection");

function read(email) {
  return knex("user").select("*").where({ email: email }).first();
}
function update(id, password) {
  return knex("user").where({ user_id: id }).update({ password: password });
}

module.exports = {
    read,
    update
};
