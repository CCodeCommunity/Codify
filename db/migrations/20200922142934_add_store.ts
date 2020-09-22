import Knex from "knex";

export const up = async (knex: Knex) => {
    return knex.schema.createTable("store", table => {
        table.string("serverId");
        table.string("roleId");
        table.integer("price");
    });
};

export const down = async (knex: Knex) => {
    return knex.schema.dropTable("store");
};
