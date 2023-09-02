import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.table("quotes", (table) => {
        table.increments("id").notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.table("quotes", (table) => {
        return table.dropColumn("id");
    });
}
