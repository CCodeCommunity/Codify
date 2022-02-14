import Knex from "knex";

export const up = async (knex: Knex) => {
    return knex.schema.table("user", (table) => {
        table.integer("lastdayxp").notNullable().defaultTo(0);
    });
};

export const down = async (knex: Knex) => {
    return knex.schema.table("user", (table) => {
        return table.dropColumn("lastdayxp");
    });
};
