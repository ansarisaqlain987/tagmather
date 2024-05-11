import type { Knex } from "knex";
import './envConfig';

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgres',
    connection: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) ?? 5432,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        ssl: process.env.DB_SSL
    }
  },

  staging: {
    client: 'postgres',
    connection: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) ?? 5432,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        ssl: process.env.DB_SSL
    }
  },

  production: {
    client: 'postgres',
    connection: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) ?? 5432,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        ssl: process.env.DB_SSL
    }
  }

};

module.exports = config;
