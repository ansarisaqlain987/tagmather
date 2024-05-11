import Knex from 'knex';

const {DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS, DB_SSL} = process.env;

export const db = Knex({
    client: 'postgres',
    connection: {
        host: DB_HOST,
        port: Number(DB_PORT) ?? 5432,
        user: DB_USER,
        password: DB_PASS,
        database: DB_NAME,
        ssl: DB_SSL
    }
})