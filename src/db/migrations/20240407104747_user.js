exports.up = function (knex) {
  return knex.schema.createTable("user", (table) => {
    table.increments("user_id").primary(); // Sets supplier_id as the primary key
    table.string("full_name");
    table.string("email");
    table.string("password");
    table.timestamps(true, true); // Adds created_at and updated_at columns
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("user");
};  