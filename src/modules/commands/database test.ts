import { CommandBuilder } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";

import Knex from "knex";
import { production } from "../../../knexfile";
const knex = Knex(production);

async function insertMessage(id: string, message: string) {
    knex("testtable")
        .where({ userid: id })
        .then(async rows => {
            if (rows.length === 0) {
                await knex("testtable").insert({
                    userid: id,
                    usermessage: message
                });
            } else {
                await knex("testtable")
                    .where({ userid: id })
                    .update({ usermessage: message });
            }
        });
}
function pullMessage(id: string) {
    return knex("testtable")
        .where("userid", id)
        .then(data => data[0].usermessage);
}

export default new CommandBuilder()
    .match(matchPrefixesStrict("dbtest"))
    .use<ParseArgumentsState>(async context => {
        const { message } = context;
        const { args } = context.state;

        if (args.length) {
            await insertMessage(message.author.id, args.join(" "));

            if (args.join(" ").length > 1800) {
                return message.channel.send(`Error: Your message is too long.`);
            } else {
                return message.channel.send(
                    `Your message was registered in the database.`
                );
            }
        } else {
            try {
                return message.channel.send(
                    `Your message was: ${await pullMessage(message.author.id)}`
                );
            } catch (e) {
                return message.channel.send(
                    `Error: Cannot retrieve message from database.`
                );
            }
        }
    })
    .done();
