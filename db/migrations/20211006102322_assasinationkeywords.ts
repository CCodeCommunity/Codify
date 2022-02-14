import Knex from "knex";

export const up = async (knex: Knex) => {
    return knex.schema.createTable("keywords", (table) => {
        table.specificType("keyword", "varchar(25)").notNullable();
        table.specificType("username", "varchar(50)").notNullable();
    });
};

export const down = async (knex: Knex) => {
    return knex.schema.dropTable("keywords");
};
