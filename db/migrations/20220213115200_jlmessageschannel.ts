import Knex from "knex";

export const up = async (knex: Knex) => {
    return knex.schema.alterTable("servers", table => {
        table.string("pinschannel").alter();
        table.string("welcomechannel");
        table.string("auditchannel");
        table.boolean("usersquotes");
    });
};

export const down = async (knex: Knex) => {
    return knex.schema.table("servers", table => {
        table.dropColumn("pinschannel");
        table.dropColumn("welcomechannel");
        table.dropColumn("auditchannel");
        table.dropColumn("usersquotes");
    });
};

// export const up = async (knex: Knex) => {
//     return knex.schema.table("user", table => {
//         table
//             .integer("dayxp")
//             .notNullable()
//             .defaultTo(0);
//     });
// };

// export const down = async (knex: Knex) => {
//     return knex.schema.table("user", table => {
//         return table.dropColumn("dayxp");
//     });
// };
