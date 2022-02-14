import { Command } from "@enitoni/gears-discordjs";
import { createMetadata } from "./createMetadata";
import { mapTreeToMetadata } from "./mapTreeToMetadata";
import { CommandMetadata } from "./CommandMetadata";
import {
    Cooldown,
    setCooldown
} from "../../../common/cooldown/middleware/comandCooldown";
import knex from "../../../../db/knex";
import { matchPrefixesStrict } from "../../../common/matching/matchPrefixesStrict";

const splitToChunks = (array: Array<CommandMetadata>, parts: number) => {
    const result: CommandMetadata[][] = [];
    for (let i = parts; i > 0; i--) {
        result.push(array.splice(0, Math.ceil(array.length / i)));
    }
    return result;
};

export const helpCommand = new Command()
    .match(matchPrefixesStrict("help"))
    .setMetadata(
        createMetadata({
            name: "help",
            usage: "cc!help",
            description: "Shows this output"
        })
    )
    .use<Cooldown>(setCooldown(15000))
    .use(async (context) => {
        const { bot, message } = context;
        const metadata = mapTreeToMetadata(bot.group);

        const help = splitToChunks(metadata, 6);

        const prefix: string =
            (
                await knex("servers").where({
                    serverid: message.guildId
                })
            )[0].prefix || "cc!";

        return help.map((_, i) => {
            return message.channel.send(
                (
                    "```makefile\n" +
                    help[i].map((item, index) => {
                        return `\n[${i * help[0].length + index + 1}]: ${
                            item.name
                        } - ${item.usage}\n- ${item.description}`;
                    }) +
                    "```"
                ).replaceAll("cc!", prefix)
            );
        });
    });
