import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.table("servers", (table) => {
        table.increments("id").notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.table("servers", (table) => {
        return table.dropColumn("id");
    });
}
