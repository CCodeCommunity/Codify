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

const setPrefix = async (
    serverid: string | undefined,
    prefix: string
): Promise<boolean> => {
    try {
        const serverRow = await knex("servers").where({ serverid });
        if (serverRow.length === 0) {
            await knex("servers").insert({ serverid, prefix });
        } else {
            await knex("servers").where({ serverid }).update({
                serverid,
                prefix
            });
        }
        return true;
    } catch (error) {
        return false;
    }
};

export default new Command()
    .match(matchPrefixesStrict("setprefix"))
    .setMetadata(
        createMetadata({
            name: "Set the prefix for the commands.",
            usage: "cc!setprefix [prefix]",
            description: "It sets the prefix for the commands in the server."
        })
    )
    .use<Cooldown>(setCooldown(15000))
    .use<ParseArgumentsState>(async (context) => {
        const { message } = context;
        const { args } = context.state;

        if (!message.member!.permissions.has("ADMINISTRATOR")) {
            return message.channel.send(
                ":x: **Oops,** you aren't allowed to do that. Make sure you have the `Administrator` permission."
            );
        }

        if (!args.length) {
            return message.channel.send(
                "**OOPS**: You need to provide a prefix."
            );
        }

        if (args[0].length > 5) {
            return message.channel.send(
                "**OOPS**: The prefix can't be longer than 5 characters."
            );
        }

        if (await setPrefix(message.guild?.id, args[0])) {
            logEvent(
                `<@${context.message.author.id}> has set the commands prefix to be **${args[0]}**.`,
                context
            );
            return message.channel.send(
                ":white_check_mark:**Successfully set the commands prefix.**"
            );
        } else
            return message.channel.send(":x:**Oops,** something went wrong.");
    });
