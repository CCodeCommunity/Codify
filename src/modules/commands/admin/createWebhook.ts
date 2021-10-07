import { Command } from "@enitoni/gears-discordjs";
import { Role, TextChannel } from "discord.js";

import { matchPrefixesStrict } from "../../../common/matching/matchPrefixesStrict";
import {
    Cooldown,
    setCooldown
} from "../../../common/parsing/middleware/comandCooldown";
import { createMetadata } from "../help/createMetadata";

export default new Command()
    .match(matchPrefixesStrict("webhook|createwebhook"))
    .setMetadata(
        createMetadata({
            name: "Create a webhook",
            usage: "cc!webhook/createwebhook",
            description:
                'Creates a webhook in that channel if the user has a role named "webhooks". Then it sends a dm with the webhook link to the user'
        })
    )
    .use<Cooldown>((context, next) => {
        setCooldown(context, next, 25000);
    })
    .use(async context => {
        const { message } = context;
        const channel = message.channel as TextChannel;
        if (message.guild !== null) message.delete();
        try {
            const webhook = await channel.createWebhook(
                message.author.username,
                { avatar: message.author.displayAvatarURL() }
            );
            if (
                message.member!.roles.cache.some(
                    (role: Role) => role.name === "webhooks"
                )
            )
                message.author.send(
                    `Here is your webhook: \`https://canary.discordapp.com/api/webhooks/${webhook.id}/${webhook.token}/github\`, you can use it in github in any repository. \`Do not abuse!\``
                );
            else
                return message.channel.send(
                    "You do not have the right permissions for using this command!"
                );
        } catch (e) {
            console.log(e);
            return message.channel.send("500: Internal server error.");
        }
    });
