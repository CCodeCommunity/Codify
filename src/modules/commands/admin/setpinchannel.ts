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

const setPinsChannel = async (
    serverid: string | undefined,
    pinschannel: string | null
): Promise<boolean> => {
    try {
        const serverRow = await knex("servers").where({ serverid });
        if (serverRow.length === 0) {
            await knex("servers").insert({ serverid, pinschannel });
        } else {
            await knex("servers").where({ serverid }).update({
                serverid,
                pinschannel
            });
        }
        return true;
    } catch (error) {
        return false;
    }
};

export default new Command()
    .match(matchPrefixesStrict("setpinschannel"))
    .setMetadata(
        createMetadata({
            name: "Set the pins channel for your server.",
            usage: "cc!setpinschannel <channelid>",
            description:
                "It sets the channel for were the cc!pin messages will go. Use no arguments to reset it."
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
            if (await setPinsChannel(message.guild?.id, null)) {
                logEvent(
                    `<@${context.message.author.id}> has reset the pins channel.`,
                    context
                );
                return message.channel.send(
                    ":white_check_mark:**Successfully reset the pins channel.**"
                );
            } else
                return message.channel.send(
                    ":x:**Oops,** something went wrong."
                );
        }

        if (await setPinsChannel(message.guild?.id, args[0])) {
            logEvent(
                `<@${context.message.author.id}> has set the pins channel to be <#${args[0]}>.`,
                context
            );
            return message.channel.send(
                ":white_check_mark:**Successfully set the pins channel.**"
            );
        } else
            return message.channel.send(":x:**Oops,** something went wrong.");
    });
