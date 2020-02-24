import { CommandBuilder } from "@enitoni/gears-discordjs";

import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";
import { GuildMember } from "discord.js";

export default new CommandBuilder()
    .match(matchPrefixesStrict("webhook|createwebhook"))
    .use(async context => {
        const { message } = context as any;
        message.delete();
        try {
            const webhook = await message.channel.createWebhook(message.author.username, message.author.displayAvatarURL)
            if (message.member.roles.some((role: any) => role.name === "githubHooker"))
                message.author.send(`Here is your webhook: \`https://canary.discordapp.com/api/webhooks/${webhook.id}/${webhook.token}/gihub\`, you can use it in github in any repository. \`Do not abuse!\``)
            else
                return message.channel.send("You do not have the right permissions for using this command!")
        } catch (e) {
            console.log(e);
            return message.channel.send("500: Internal server error.")
        }
    })
    .done();
