import Knex from "knex";

export const up = async (knex: Knex) => {
    return knex.schema.createTable("quotes", table => {
        table.specificType("quote", "varchar(1000)");
        table.specificType("username", "varchar(100)");
    });
};

export const down = async (knex: Knex) => {
    return knex.schema.dropTable("quotes");
};
