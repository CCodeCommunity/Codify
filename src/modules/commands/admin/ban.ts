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
    .match(matchPrefixesStrict("ban"))
    .setMetadata(
        createMetadata({
            name: "Ban a user",
            usage: "cc!ban [user] <reason>",
            description: "Bans a user, needs special permissions."
        })
    )
    .use<Cooldown>(setCooldown(3000))
    .use<ParseArgumentsState>(async context => {
        const { message } = context;
        const { args } = context.state;

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
        if (message.mentions.users.first() === message.author) {
            return message.channel.send(
                `**OOPS:** Looks like you can't ban yourself.`
            );
        }
        if (!message.mentions.users.first()) {
            return message.channel.send(
                `**OOPS:** Looks like you didn't mention anyone that you want to ban.`
            );
        }
        if (message.mentions.users.first()!.bot) {
            return message.channel.send(
                `**OOPS:** Looks like you can't ban bots.`
            );
        }

        if (!message.mentions.members?.first()?.bannable) {
            return message.channel.send(
                `**OOPS:** Looks like this member can't be banned.`
            );
        }

        const reason = args.slice(1).join(" ");

        try {
            await message.mentions.members?.first()?.ban({ reason });
        } catch (error) {
            return message.channel.send(`**OOPS:** Something went wrong.`);
        }
        logEvent(
            `<@${context.message.author.id}> has banned <@${
                message.mentions.members?.first()?.id
            }>.`,
            context
        );
        return message.channel.send("This member has been banned succesfully.");
    });
