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
    .match(matchPrefixesStrict("kick"))
    .setMetadata(
        createMetadata({
            name: "Kick a user",
            usage: "cc!kick [user] <reason>",
            description: "Kick a user, needs special permissions."
        })
    )
    .use<Cooldown>(setCooldown(3000))
    .use<ParseArgumentsState>(async (context) => {
        const { message } = context;
        const { args } = context.state;

        if (message.guild === null)
            return message.channel.send("You can't use this command in dms.");

        if (!message.guild.me!.permissions.has("KICK_MEMBERS")) {
            return message.channel.send(
                ":x: **Oops,** you aren't allowed to do that. Make sure the bot has the `Kick members` permission."
            );
        }
        if (!message.member!.permissions.has("KICK_MEMBERS")) {
            return message.channel.send(
                ":x: **Oops,** you aren't allowed to do that. Make sure you have the `Kick members` permission."
            );
        }
        if (message.mentions.users.first()?.id === message.guild.ownerId) {
            return message.channel.send(
                ":x: **Oops,** you can't kick the owner of the server."
            );
        }
        if (message.mentions.users.first() === message.author) {
            return message.channel.send(
                `**OOPS:** Looks like you can't kick yourself.`
            );
        }
        if (!message.mentions.users.first()) {
            return message.channel.send(
                `**OOPS:** Looks like you didn't mention anyone that you want to kick.`
            );
        }
        if (message.mentions.users.first()!.bot) {
            return message.channel.send(
                `**OOPS:** Looks like you can't kick bots.`
            );
        }

        if (!message.mentions.members?.first()?.kickable) {
            return message.channel.send(
                `**OOPS:** Looks like this member can't be kicked.`
            );
        }

        const reason = args.slice(1).join(" ");

        try {
            await message.mentions.members?.first()?.kick(reason);
        } catch (error) {
            return message.channel.send(`**OOPS:** Something went wrong.`);
        }
        logEvent(
            `<@${context.message.author.id}> has kicked <@${
                message.mentions.members?.first()?.id
            }>.`,
            context
        );
        return message.channel.send("This member has been kicked succesfully.");
    });
