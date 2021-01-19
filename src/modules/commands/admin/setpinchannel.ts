import { Command } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../../common/matching/matchPrefixesStrict";
import { createMetadata } from "../help/createMetadata";

import knex from "../../../../db/knex";

const setPinsChannel = async (
    serverid: string | undefined,
    pinschannel: string
): Promise<boolean> => {
    try {
        const serverRow = await knex("servers").where({ serverid });
        if (serverRow.length === 0) {
            await knex("servers").insert({ serverid, pinschannel });
        } else {
            await knex("servers")
                .where({ serverid })
                .update({
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
            usage: "cc!setpinschannel [channelid]",
            description:
                "It sets the channel for were the cc!pin messages will go"
        })
    )
    .use<ParseArgumentsState>(async context => {
        const { message } = context;
        const { args } = context.state;

        if (message.guild !== null) message.delete();

        if (!message.member!.hasPermission("ADMINISTRATOR")) {
            return message.channel.send(
                ":x: **Oops,** you aren't allowed to do that. Make sure you have the `Administrator` permission."
            );
        }
        if (!args.length) {
            return message.channel.send(`:x:**ERROR:** No argument provided.`);
        }

        if (await setPinsChannel(message.guild?.id, args[0]))
            return message.channel.send(
                ":white_check_mark:**Successfully set the pins channel.**"
            );
        else return message.channel.send(":x:**Oops,** something went wrong.");
    });
