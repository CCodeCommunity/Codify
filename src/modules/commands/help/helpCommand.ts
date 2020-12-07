import { Command } from "@enitoni/gears-discordjs";
import { createMetadata } from "./createMetadata";
import { matchPrefixes } from "@enitoni/gears";
import { mapTreeToMetadata } from "./mapTreeToMetadata";
import { MessageEmbed } from "discord.js";

export const helpCommand = new Command()
    .match(matchPrefixes("help"))
    .setMetadata(
        createMetadata({
            name: "help",
            usage: "cc!help",
            description: "Shows this output"
        })
    )
    .use(context => {
        const { bot, message } = context;
        const metadata = mapTreeToMetadata(bot.group);

        const embed = new MessageEmbed({
            title: "Available commands",
            color: 3447003,
            description: "Here's a list of commands.",
            fields: metadata.map(x => ({
                name: "**" + x.name + "** - `" + x.usage + "`",
                value: `${x.description}\n \n`
            }))
        });

        return message.channel.send(embed);
    });
