import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const connection = knex({
    client: 'pg',
    connection: {
        host: process.env.PGHOST,
        port: Number(process.env.PGPORT),
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
    },
    pool: {
        min: 2,
        max: 10
    }
});

export default connection;