import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.table("assasins", (table) => {
        table.increments("id").notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.table("assasins", (table) => {
        return table.dropColumn("id");
    });
}
