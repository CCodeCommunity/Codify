import Knex from "knex";

export const up = async (knex: Knex) => {
    return knex.schema.alterTable("servers", (table) => {
        table.boolean("onlyquotes").defaultTo(false);
        table.string("prefix").defaultTo("cc!");
    });
};

export const down = async (knex: Knex) => {
    return knex.schema.table("servers", (table) => {
        table.dropColumn("onlyquotes");
        table.dropColumn("prefix");
    });
};
