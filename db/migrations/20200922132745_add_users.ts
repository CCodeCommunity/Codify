import Knex from "knex";

export const up = async (knex: Knex) => {
    return knex.schema.createTable("user", (table) => {
        table.specificType("userid", "varchar(25)");
        table.specificType("description", "varchar(1000)");
        table.integer("balance");
        table.specificType("lastdaily", "varchar(20)");
        table.integer("level").defaultTo(1);
        table.integer("xp").defaultTo(0);
        table.integer("lastxpclaim").defaultTo(0);
        table.specificType("token", "varchar(124)");
        table.boolean("levelupmessages").defaultTo(false);
    });
};

export const down = async (knex: Knex) => {
    return knex.schema.dropTable("user");
};
