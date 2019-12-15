"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const options = {
    client: 'pg',
    connection: process.env.DATABASE_URL + "?ssl=true",
    migrations: {
        directory: "db",
        tableName: "migrations"
    },
    debug: false,
    useNullAsDefault: true
};
const configs = {
    development: {
        ...options,
        connection: {
            database: 'postgres',
            user: 'postgres',
            password: 'password'
        }
    },
    production: {
        ...options
    }
};
exports.development = configs.development, exports.production = configs.production;
