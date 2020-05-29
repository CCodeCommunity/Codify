import { Config } from "knex";
import { config } from "dotenv";
import Knex from "knex";

config();

const options: Config = {
    client: process.env.DB_CLIENT,
    connection: process.env.CONNECTION || {
        filename: "db/db.sqlite3"
    },
    debug: process.env.NODE_ENV === "development",
    useNullAsDefault: process.env.DB_CLIENT === "sqlite3"
};

const configs: Record<string, Config> = {
    development: options,

    production: {
        ...options,
        connection: process.env.DATABASE_URL + "?ssl=true"
    }
};

export const { development, production } = configs;
