import { Command } from "@enitoni/gears-discordjs";
import { Role, TextChannel } from "discord.js";

import { matchPrefixesStrict } from "../../../common/matching/matchPrefixesStrict";
import {
    Cooldown,
    setCooldown
} from "../../../common/cooldown/middleware/comandCooldown";
import { createMetadata } from "../help/createMetadata";
import { logEvent } from "../../reactions/auditlogs";

export default new Command()
    .match(matchPrefixesStrict("webhook|createwebhook"))
    .setMetadata(
        createMetadata({
            name: "Create a webhook",
            usage: "cc!webhook/createwebhook",
            description:
                "Creates a webhook in that channel if the user has the manage webhooks permission or if the user has a role named `webhooks`. Then it sends a dm with the webhook link to the user"
        })
    )
    .use<Cooldown>(setCooldown(20000))
    .use(async context => {
        const { message } = context;
        const channel = message.channel as TextChannel;
        if (message.guild !== null) message.delete();
        try {
            if (
                message.member!.hasPermission("MANAGE_WEBHOOKS") ||
                message.member!.roles.cache.some(
                    (role: Role) => role.name === "webhooks"
                )
            ) {
                const webhook = await channel.createWebhook(
                    message.author.username,
                    { avatar: message.author.displayAvatarURL() }
                );

                logEvent(
                    `<@${context.message.author.id}> has created a new webhook.`,
                    context
                );

                message.author.send(
                    `Here is your webhook: \`https://canary.discordapp.com/api/webhooks/${webhook.id}/${webhook.token}\`, you can use it on github in any repository if you add \`/github\` at the end of the link, or just as it is anywhere else.`
                );
            } else
                return message.channel.send(
                    "You do not have the right permissions for using this command!"
                );
        } catch (e) {
            console.log(e);
            return message.channel.send("500: Internal server error.");
        }
    });
