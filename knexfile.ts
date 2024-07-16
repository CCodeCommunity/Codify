import { Config } from "knex";
import { config } from "dotenv";

config();

const options: Config = {
    client: process.env.DB_CLIENT,
    connection: process.env.CONNECTION || {
        filename: "db/db.sqlite3",
        ssl: { rejectUnauthorized: false }
    },
    migrations: {
        directory: "db/migrations",
        tableName: "migrations"
    },
    debug: process.env.NODE_ENV === "development",
    useNullAsDefault: process.env.DB_CLIENT === "sqlite3",
    pool: process.env.DB_CLIENT !== "sqlite3" ? { min: 2, max: 10 } : undefined
};

const configs: Record<string, Config> = {
    development: {
        ...options,
        connection: {
            connectionString: process.env.DATABASE_URL + "?sslmode=disable",
            ssl: false
        }
    },

    production: {
        ...options,
        connection: {
            connectionString: process.env.DATABASE_URL + "?sslmode=disable",
            ssl: false
        }
    }
};

export const { development, production } = configs;
