import Knex from "knex";

export const up = async (knex: Knex) => {
    return knex.schema.alterTable("servers", (table) => {
        table.dropColumn("onlyquotes");
    });
};

export const down = async (knex: Knex) => {
    return knex.schema.table("servers", (table) => {});
};
