require("dotenv").config();

const path = require("path");
const { DATABASE_URL, DATABASE_APITABLE_URL } = process.env;

module.exports = {
  development: {
    client: "postgresql",
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
  },
  production: {
    client: "postgresql",
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
  },
  developmentApi: {
    client: "postgresql",
    connection: DATABASE_APITABLE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
  },
};