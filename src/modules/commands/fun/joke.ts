import { Command } from "@enitoni/gears-discordjs";

import fetch from "node-fetch";
import { matchPrefixesStrict } from "../../../common/matching/matchPrefixesStrict";
import {
    Cooldown,
    setCooldown
} from "../../../common/cooldown/middleware/comandCooldown";
import { createMetadata } from "../help/createMetadata";
import { logEvent } from "../../reactions/auditlogs";
import { MessageEmbed } from "discord.js";

let loopIt = 0;

const loop = (type: "content" | "title" | "score") => {
    if (type === "title") {
        loopIt++ % 20;
    }
    return loopIt;
};

export default new Command()
    .match(matchPrefixesStrict("joke"))
    .setMetadata(
        createMetadata({
            name: "Make a joke",
            usage: "cc!joke",
            description: "Sends a random joke from r/jokes"
        })
    )
    .use<Cooldown>(setCooldown(5000))
    .use(async (context) => {
        try {
            const response = await fetch(
                `https://www.reddit.com/r/Jokes/hot/.json`
            );
            const data = await response.json();

            logEvent(
                `<@${context.message.author.id}> has used this command.`,
                context
            );

            const embed = new MessageEmbed()
                .setColor(3447003)
                .setTitle(`${data.data.children[loop("title")].data.title}`)
                .setDescription(
                    `${data.data.children[
                        loop("content")
                    ].data.selftext.substring(0, 2000)}`
                )
                .setFooter({
                    text: `👍 ${
                        data.data.children[loop("score")].data.score
                    } | 💬 ${
                        data.data.children[loop("score")].data.num_comments
                    }`
                });
            return context.message.channel.send({ embeds: [embed] });
        } catch (e) {
            return context.message.channel.send(
                "**Error:** Internal server error."
            );
        }
    });
