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
    auditchannel: string
): Promise<boolean> => {
    try {
        const serverRow = await knex("servers").where({ serverid });
        if (serverRow.length === 0) {
            await knex("servers").insert({ serverid, auditchannel });
        } else {
            await knex("servers")
                .where({ serverid })
                .update({
                    serverid,
                    auditchannel
                });
        }
        return true;
    } catch (error) {
        return false;
    }
};

export default new Command()
    .match(matchPrefixesStrict("setauditchannel"))
    .setMetadata(
        createMetadata({
            name: "Set the audit log channel for your server.",
            usage: "cc!setauditchannel [channelid]",
            description:
                "It sets the channel for were all of the log messages will be sent by the bot."
        })
    )
    .use<Cooldown>(setCooldown(15000))
    .use<ParseArgumentsState>(async context => {
        const { message } = context;
        const { args } = context.state;

        if (message.guild !== null) message.delete();

        if (!message.member!.permissions.has("ADMINISTRATOR")) {
            return message.channel.send(
                ":x: **Oops,** you aren't allowed to do that. Make sure you have the `Administrator` permission."
            );
        }
        if (!args.length) {
            return message.channel.send(`:x:**ERROR:** No argument provided.`);
        }

        if (await setChannelId(message.guild?.id, args[0])) {
            logEvent(
                `<@${context.message.author.id}> has set the audit channel to be <#${args[0]}>.`,
                context
            );
            return message.channel.send(
                ":white_check_mark:**Successfully set the audit channel.**"
            );
        } else
            return message.channel.send(":x:**Oops,** something went wrong.");
    });
