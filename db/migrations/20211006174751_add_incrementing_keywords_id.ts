import Knex from "knex";

export const up = async (knex: Knex) => {
    return knex.schema.table("keywords", table => {
        table.increments("id").notNullable();
    });
};

export const down = async (knex: Knex) => {
    return knex.schema.table("keywords", table => {
        return table.dropColumn("id");
    });
};
