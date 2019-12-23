import { CommandBuilder } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";

import knex from "../../../knexfile";

async function insertData(id: string, message: string) {
    knex("user")
        .where({ userid: id })
        .then(async rows => {
            if (rows.length === 0) {
                await knex("user").insert({
                    userid: id,
                    description: message,
                    balance: 0,
                    lastdaily: "Never claimed."
                });
            } else {
                await knex("user")
                    .where({ userid: id })
                    .update({ description: message });
            }
        });
}

export default new CommandBuilder()
    .match(matchPrefixesStrict("description|desc|about"))
    .use<ParseArgumentsState>(async context => {
        const { message } = context;
        const { args } = context.state;

        try {
            if (args.length) {
                if (args.join(" ").length < 1000) {
                    await insertData(message.author.id, args.join(" "));
                    return message.channel.send(`Done.`);
                } else {
                    return message.channel.send(
                        `**ERROR:** Description is too big.`
                    );
                }
            } else {
                return message.channel.send(
                    `**ERROR:** Please add some text. Try \`cc!help\` for more info.`
                );
            }
        } catch (e) {
            console.info(e);
            return message.channel.send(`**ERROR:** Something went wrong.`);
        }
    })
    .done();
