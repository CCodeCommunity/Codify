import { Command } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../../common/matching/matchPrefixesStrict";
import { createMetadata } from "../help/createMetadata";

import knex from "../../../../db/knex";
import {
    Cooldown,
    setCooldown
} from "../../../common/cooldown/middleware/comandCooldown";
import { logEvent } from "../../reactions/auditlogs";

const toggleQuotes = async (serverid: string | undefined): Promise<boolean> => {
    try {
        const serverRow = await knex("servers").where({ serverid });
        if (serverRow.length === 0) {
            await knex("servers").insert({ serverid, levelupmsgs: false });
        } else {
            const currentValue = (await knex("servers").where({ serverid }))[0]
                .levelupmsgs;
            await knex("servers").where({ serverid }).update({
                serverid,
                levelupmsgs: !currentValue
            });
        }
        return true;
    } catch (error) {
        return false;
    }
};

export default new Command()
    .match(matchPrefixesStrict("toggleServerLevelUps|toggleLevels"))
    .setMetadata(
        createMetadata({
            name: "Toggle the leveling messages in the server.",
            usage: "cc!toggleServerLevelUps | cc!toggleLevels",
            description:
                "Toggle the leveling up in the server, users will still level up, just without the message that shows the level."
        })
    )
    .use<Cooldown>(setCooldown(15000))
    .use<ParseArgumentsState>(async (context) => {
        const { message } = context;

        if (message.guild !== null) message.delete();

        if (!message.member!.permissions.has("ADMINISTRATOR")) {
            return message.channel.send(
                ":x: **Oops,** you aren't allowed to do that. Make sure you have the `Administrator` permission."
            );
        }

        if (await toggleQuotes(message.guild?.id)) {
            const quotes = (
                await knex("servers").where({ serverid: message.guild?.id })
            )[0].levelupmsgs;
            if (quotes) {
                message.channel.send(
                    ":white_check_mark:**Successfully turned on the level up messages.**"
                );
            } else {
                message.channel.send(
                    ":white_check_mark:**Successfully turned off the level up messages.**"
                );
            }

            logEvent(
                `<@${context.message.author.id}> has toggled the level up messages.`,
                context
            );
            return;
        } else
            return message.channel.send(":x:**Oops,** something went wrong.");
    });
