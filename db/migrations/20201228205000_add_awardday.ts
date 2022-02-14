import Knex from "knex";

export const up = async (knex: Knex) => {
    return knex.schema.createTable("awarddays", (table) => {
        table.integer("mostxpinaday").notNullable().defaultTo(0);
    });
};

export const down = async (knex: Knex) => {
    return knex.schema.dropTable("awarddays");
};
