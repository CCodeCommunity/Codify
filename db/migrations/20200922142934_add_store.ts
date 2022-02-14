import Knex from "knex";

export const up = async (knex: Knex) => {
    return knex.schema.createTable("store", (table) => {
        table.increments("id").primary();
        table.string("serverId").notNullable();
        table.string("roleId").notNullable();
        table.integer("price").notNullable();
        table.boolean("subscription").defaultTo(false);
        table.integer("subscriptionInterval").defaultTo(0);
    });
};

export const down = async (knex: Knex) => {
    return knex.schema.dropTable("store");
};
