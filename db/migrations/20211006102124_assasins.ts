import Knex from "knex";

export const up = async (knex: Knex) => {
    return knex.schema.createTable("assasins", table => {
        table.specificType("assasin", "varchar(25)").notNullable();
        table.specificType("target", "varchar(25)").notNullable();
        table.specificType("serverid", "varchar(25)").notNullable();
        table.specificType("keywordid", "varchar(25)").notNullable();
    });
};

export const down = async (knex: Knex) => {
    return knex.schema.dropTable("assasins");
};
