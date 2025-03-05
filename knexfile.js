require("dotenv").config();

const path = require("path");
const {
  DATABASE_URL,
  USER_NAME,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  DEBUG,
  DATABASE_APITABLE_URL,
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: {
      host: DATABASE_URL,
      port: 5432,
      user: USER_NAME,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
      ssl: {
        rejectUnauthorized: false, // Skip certificate validation
      },
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: false,
  },
  production: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: {
      host: DATABASE_URL,
      port: 5432,
      user: USER_NAME,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
      ssl: {
        rejectUnauthorized: false, // Skip certificate validation
      },
    },

    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: false,
  },
  developmentApi: {
    client: "postgresql",
    connection: {
      host: DATABASE_APITABLE_URL,
      port: 5432,
      user: USER_NAME,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
      ssl: {
        rejectUnauthorized: false, // Skip certificate validation
      },
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    debug: false,
  },
};