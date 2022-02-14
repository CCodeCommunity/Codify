import Knex from "knex";

export const up = async (knex: Knex) => {
    return knex.schema.table("quotes", (table) => {
        table.string("serverid").notNullable().defaultTo("485715306229268507");
    });
};

export const down = async (knex: Knex) => {
    return knex.schema.table("quotes", (table) => {
        return table.dropColumn("serverid");
    });
};
