import { Command } from "@enitoni/gears-discordjs";

import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";

import knex from "../../../db/knex";
import { Message } from "discord.js";
import { createMetadata } from "./help/createMetadata";

async function generateTop(message: Message) {
    const top = await knex("user")
        .orderBy("level", "desc")
        .orderBy("xp", "desc");
    let fill = "```css\n";

    for (let i = 0; i <= 9; i++) {
        let memberName;
        do {
            if (top[i] == undefined) {
                i = 99;
                break;
            }
            if (message.guild?.member(`${top[i].userid}`))
                memberName = (
                    await message.guild!.members.fetch({
                        user: `${top[i].userid}`
                    })
                )?.displayName.replace(/[^\w\s]|\s+/gi, "");

            if (memberName == undefined) top.shift();
        } while (memberName == undefined);

        const k = i + 1 == 10 ? "10" : `0${i + 1}`;

        if (i != 99) {
            fill += `[${k}]  #${memberName} \n`;
            fill += `      Level ${top[i].level}  : ${top[i].xp} XP \n\n`;
        }
    }
    fill += "```";

    return fill;
}

export default new Command()
    .match(matchPrefixesStrict("top|toplevel|topl"))
    .setMetadata(
        createMetadata({
            name: "Top levels",
            usage: "cc!top/toplevel/topl",
            description: "Shows a top with user levels in the server"
        })
    )
    .use(async context => {
        const { message } = context;
        const list = await generateTop(message);
        return message.channel.send(list);
    });
