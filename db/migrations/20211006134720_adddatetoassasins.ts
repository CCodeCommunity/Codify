import Knex from "knex";

export const up = async (knex: Knex) => {
    return knex.schema.table("assasins", table => {
        table.string("date").notNullable();
    });
};

export const down = async (knex: Knex) => {
    return knex.schema.table("assasins", table => {
        return table.dropColumn("date");
    });
};
