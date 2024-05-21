import type { Knex } from "knex";
import './envConfig';
import path from "path";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    dialect: 'postgres',
    client: 'postgres',
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) ?? 5432,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      ssl: false
    },
    migrations: { directory: path.join(__dirname, '/src/migrations') }
  },

  staging: {
    dialect: 'postgres',
    client: 'postgres',
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) ?? 5432,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      ssl: process.env.DB_SSL
    },
    migrations: { directory: path.join(__dirname, '/src/migrations') }
  },

  production: {
    dialect: 'postgres',
    client: 'postgres',
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) ?? 5432,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      ssl: process.env.DB_SSL
    },
    migrations: { directory: path.join(__dirname, '/src/migrations') }
  }

};

module.exports = config;
