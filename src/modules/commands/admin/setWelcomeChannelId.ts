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

const setChannelId = async (
    serverid: string | undefined,
    welcomechannel: string | null
): Promise<boolean> => {
    try {
        const serverRow = await knex("servers").where({ serverid });
        if (serverRow.length === 0) {
            await knex("servers").insert({ serverid, welcomechannel });
        } else {
            await knex("servers").where({ serverid }).update({
                serverid,
                welcomechannel
            });
        }
        return true;
    } catch (error) {
        return false;
    }
};

export default new Command()
    .match(matchPrefixesStrict("setwelcomechannel"))
    .setMetadata(
        createMetadata({
            name: "Set the welcome channel for your server.",
            usage: "cc!setwelcomechannel <channelid>",
            description:
                "It sets the channel for were all of the welcome and leave messages will be sent by the bot. Use no arguments to reset it."
        })
    )
    .use<Cooldown>(setCooldown(15000))
    .use<ParseArgumentsState>(async (context) => {
        const { message } = context;
        const { args } = context.state;

        if (message.guild !== null) message.delete();

        if (!message.member!.permissions.has("ADMINISTRATOR")) {
            return message.channel.send(
                ":x: **Oops,** you aren't allowed to do that. Make sure you have the `Administrator` permission."
            );
        }
        if (!args.length) {
            if (await setChannelId(message.guild?.id, null)) {
                logEvent(
                    `<@${context.message.author.id}> has reset the welcome messages channel.`,
                    context
                );
                return message.channel.send(
                    ":white_check_mark:**Successfully reset the welcome messaegs channel.**"
                );
            } else
                return message.channel.send(
                    ":x:**Oops,** something went wrong."
                );
        }
        if (await setChannelId(message.guild?.id, args[0])) {
            logEvent(
                `<@${context.message.author.id}> has set the welcome channel to be <#${args[0]}>.`,
                context
            );
            return message.channel.send(
                ":white_check_mark:**Successfully set the welcome channel.**"
            );
        } else
            return message.channel.send(":x:**Oops,** something went wrong.");
    });
