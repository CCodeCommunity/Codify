import Knex from "knex";

export const up = async (knex: Knex) => {
    return knex.schema.createTable("servers", table => {
        table.string("serverid").notNullable();
        table.string("pinschannel").notNullable();
    });
};

export const down = async (knex: Knex) => {
    return knex.schema.dropTable("servers");
};
