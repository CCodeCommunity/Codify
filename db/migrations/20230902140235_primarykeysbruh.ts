import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.table("user", (table) => {
        table.dropPrimary();
        table.increments("id").notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.table("user", (table) => {
        return table.dropColumn("id");
    });
}
