import { Command } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../../common/matching/matchPrefixesStrict";
import { TextChannel } from "discord.js";
import { createMetadata } from "../help/createMetadata";

import knex from "../../../../db/knex";
import {
    Cooldown,
    setCooldown
} from "../../../common/cooldown/middleware/comandCooldown";
import { logEvent } from "../../reactions/auditlogs";

const getPinsChannel = async (serverid: string): Promise<string | boolean> => {
    try {
        const channelid = (await knex("servers").where({ serverid }))[0]
            .pinschannel;
        return channelid;
    } catch (e) {
        return false;
    }
};

export default new Command()
    .match(matchPrefixesStrict("pin"))
    .setMetadata(
        createMetadata({
            name: "Create a pin",
            usage: "cc!pin [messagelink] <description>",
            description:
                "Creates a pin in a special channel created by the server administrator, you need the Manage messages permission to use this command"
        })
    )
    .use<Cooldown>(setCooldown(3000))
    .use<ParseArgumentsState>(async context => {
        const { message } = context;
        const { args } = context.state;

        if (message.guild !== null) message.delete();

        if (!message.member!.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send(
                ":x: **Oops,** you aren't allowed to do that. Make sure you have the `Manage messages` permission."
            );
        }

        if (!args.length) {
            return message.channel.send(
                `:x: **ERROR**: no arguments provided.`
            );
        }

        const getPollMessage = async () => {
            const options: string[] = args.join(" ").split(" ");

            if (
                !(
                    options[0].startsWith("https://discordapp.com/channels/") ||
                    options[0].startsWith("https://discord.com/channels/")
                )
            ) {
                return message.channel.send(
                    ":x:**ERROR**: this doesnt look like a valid message link."
                );
            }

            const [link, ...descriptionSplit] = options;
            const messageId = link.split("/")[link.split("/").length - 1];

            try {
                const description = descriptionSplit.join(" ");
                const pinnedMessage = await message.channel.messages.fetch(
                    messageId
                );
                const pinschannel = await getPinsChannel(
                    message.guild?.id || ""
                );

                if (!pinschannel)
                    return message.channel.send(
                        ":x: **ERROR:** this server doesn't have a pins channel yet."
                    );

                const sentBy = `**Sent By:** <@${pinnedMessage.author.id}>`;
                const inChannel = `**In:** <#${pinnedMessage.channel.id}>`;
                const sentAt = `**At:** ${pinnedMessage.createdAt.toDateString()}`;
                const pinnedBy = `**Pinned by:** <@${message.author.id}>`;
                const contextProvided = `**Context provided:** ${
                    description ? description : "-"
                }`;
                const content = `**Content:** ${
                    pinnedMessage.content ? pinnedMessage.content : "nonText"
                }`;
                if (typeof pinschannel === "string") {
                    const channel = message.client.channels.cache.get(
                        pinschannel
                    ) as TextChannel;
                    logEvent(
                        `<@${context.message.author.id}> has pinned a message.`,
                        context
                    );
                    channel?.send(
                        `📌 ${link}\n${content}\n${sentBy}\n${inChannel}\n${sentAt}\n${pinnedBy}\n${contextProvided}`
                    );
                }
            } catch (error) {
                return message.channel.send(
                    `:x:**ERROR:** Something went wrong, make sure that the message exists in this server and that you are in the same channel as the message.\nIf that's not the problem contact the server administrator to see if the pins channel is set correctly.`
                );
            }
        };

        return getPollMessage();
    });
