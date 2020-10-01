import Knex from "knex";

export const up = async (knex: Knex) => {
    return knex.schema.createTable("subscriptions", table => {
        table.increments("id").primary();
        table.specificType("userId", "varchar(25)");
        table.string("storeId").notNullable();
        table.specificType("expiration", "varchar(20)");
    });
};

export const down = async (knex: Knex) => {
    return knex.schema.dropTable("subscriptions");
};
