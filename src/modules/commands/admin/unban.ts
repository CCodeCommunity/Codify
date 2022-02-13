import { Command } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../../common/matching/matchPrefixesStrict";
import { createMetadata } from "../help/createMetadata";

import {
    Cooldown,
    setCooldown
} from "../../../common/cooldown/middleware/comandCooldown";
import { logEvent } from "../../reactions/auditlogs";

export default new Command()
    .match(matchPrefixesStrict("unban"))
    .setMetadata(
        createMetadata({
            name: "Unban a user",
            usage: "cc!unban [userid]",
            description: "Unbans a user, needs special permissions."
        })
    )
    .use<Cooldown>(setCooldown(3000))
    .use<ParseArgumentsState>(async context => {
        const { message } = context;
        const { args } = context.state;

        const id = args[0];

        if (message.guild === null)
            return message.channel.send("You can't use this command in dms.");

        if (!message.guild.me!.permissions.has("BAN_MEMBERS")) {
            return message.channel.send(
                ":x: **Oops,** you aren't allowed to do that. Make sure the bot has the `Ban members` permission."
            );
        }
        if (!message.member!.permissions.has("BAN_MEMBERS")) {
            return message.channel.send(
                ":x: **Oops,** you aren't allowed to do that. Make sure you have the `Ban members` permission."
            );
        }
        if (!id) {
            return message.channel.send(
                `**OOPS:** Looks like you didn't mention anyone that you want to unban.`
            );
        }

        try {
            await message.guild.members.unban(id);
        } catch (error) {
            return message.channel.send(
                `**OOPS:** Something went wrong. This user might not be banned.`
            );
        }
        logEvent(
            `<@${context.message.author.id}> has unbanned <@${id}>.`,
            context
        );
        return message.channel.send(
            "This member has been unbanned succesfully."
        );
    });
