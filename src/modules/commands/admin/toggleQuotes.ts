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
            await knex("servers").insert({ serverid, usersquotes: false });
        } else {
            const currentValue = (await knex("servers").where({ serverid }))[0]
                .usersquotes;
            await knex("servers").where({ serverid }).update({
                serverid,
                usersquotes: !currentValue
            });
        }
        return true;
    } catch (error) {
        return false;
    }
};

export default new Command()
    .match(matchPrefixesStrict("toggleServerQuotes|toggleQuotes"))
    .setMetadata(
        createMetadata({
            name: "Toggle the leveling up quotes in the server.",
            usage: "cc!toggleServerQuotes | cc!toggleQuotes",
            description:
                "Toggle the leveling up quotes in the server, the level up messages will still appear, just without quotes."
        })
    )
    .use<Cooldown>(setCooldown(15000))
    .use<ParseArgumentsState>(async (context) => {
        const { message } = context;

        if (!message.member!.permissions.has("ADMINISTRATOR")) {
            return message.channel.send(
                ":x: **Oops,** you aren't allowed to do that. Make sure you have the `Administrator` permission."
            );
        }

        if (await toggleQuotes(message.guild?.id)) {
            const quotes = (
                await knex("servers").where({ serverid: message.guild?.id })
            )[0].usersquotes;
            if (quotes) {
                message.channel.send(
                    ":white_check_mark:**Successfully turned on the quotes.**"
                );
            } else {
                message.channel.send(
                    ":white_check_mark:**Successfully turned off the quotes.**"
                );
            }

            logEvent(
                `<@${context.message.author.id}> has toggled the quotes.`,
                context
            );
            return;
        } else
            return message.channel.send(":x:**Oops,** something went wrong.");
    });
