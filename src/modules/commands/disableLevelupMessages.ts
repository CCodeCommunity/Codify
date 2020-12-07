import { Command } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";

import knex from "../../../db/knex";
import { createMetadata } from "./help/createMetadata";

async function insertData(userid: string) {
    const levelupmessages = (await knex("user").where({ userid }))[0]
        .levelupmessages;
    await knex("user")
        .where({ userid })
        .update({ levelupmessages: !levelupmessages });
    return levelupmessages;
}

export default new Command()
    .match(matchPrefixesStrict("disablelevelupmessages|dlum"))
    .setMetadata(
        createMetadata({
            name: "Disable the level up messages",
            usage: "cc!disablelevelupmessages/dlum",
            description:
                "If you are annoyed by the level up messages you can use this command and if you level up you will no longer get pinged by codify when you level up. You will still level up though."
        })
    )
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
    });
