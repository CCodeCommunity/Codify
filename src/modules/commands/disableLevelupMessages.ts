import { CommandBuilder } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";

import knex from "../../../db/knex";

async function insertData(userid: string) {
    const levelupmessages = (await knex("user").where({ userid }))[0]
        .levelupmessages;
    await knex("user")
        .where({ userid })
        .update({ levelupmessages: !levelupmessages });
    return levelupmessages;
}

export default new CommandBuilder()
    .match(matchPrefixesStrict("disablelevelupmessages|dlum"))
    .use<ParseArgumentsState>(async context => {
        const { message } = context;

        try {
            const isDisabled = await insertData(message.author.id);
            return message.channel.send(
                `**Succesfully ${
                    isDisabled ? "enabled" : "disabled"
                } level up messages.**`
            );
        } catch (e) {
            console.info(e);
            return message.channel.send(`**ERROR:** Something went wrong.`);
        }
    })
    .done();
