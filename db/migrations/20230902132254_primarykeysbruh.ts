import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.table("awarddays", (table) => {
        table.increments("id").notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.table("awarddays", (table) => {
        return table.dropColumn("id");
    });
}
