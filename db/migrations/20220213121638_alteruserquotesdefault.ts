import Knex from "knex";

export const up = async (knex: Knex) => {
    return knex.schema.alterTable("servers", table => {
        table
            .boolean("usersquotes")
            .defaultTo(true)
            .alter();
    });
};

export const down = async (knex: Knex) => {
    return knex.schema.table("servers", table => {
        return table.dropColumn("usersquotes");
    });
};
