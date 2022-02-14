import Knex from "knex";

export const up = async (knex: Knex) => {
    return knex.schema.alterTable("servers", (table) => {
        table.boolean("levelupmsgs").defaultTo(true);
        table.string("levelupmsgschannel");
    });
};

export const down = async (knex: Knex) => {
    return knex.schema.table("servers", (table) => {
        table.dropColumn("levelupmsgs");
        table.dropColumn("levelupmsgschannel");
    });
};
