import { Command } from "@enitoni/gears-discordjs";

import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";

import knex from "../../../db/knex";
import { Message } from "discord.js";
import { createMetadata } from "./help/createMetadata";

async function fillFields(message: Message) {
    const top = await knex("user").orderBy("balance", "desc");

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
                    await message.guild!.members.fetch(`${top[i].userid}`)
                )?.displayName.replace(/[^\w\s]|\s+/gi, "");

            if (memberName == undefined) top.shift();
        } while (memberName == undefined);

        const k = i + 1 == 10 ? "10" : `0${i + 1}`;
        if (i != 99) {
            fill += `[${k}]  #${memberName} \n`;
            fill += `      Balance: $${top[i].balance}\n\n`;
        }
    }
    fill += "```";

    return fill;
}

export default new Command()
    .match(matchPrefixesStrict("topb|topbalance|balancetop"))
    .setMetadata(
        createMetadata({
            name: "Top balance",
            usage: "cc!topb/topbalance/balancetop",
            description: "Shows a top with user balances of the server."
        })
    )
    .use(async context => {
        const { message } = context;
        const fields = await fillFields(message);
        return message.channel.send(fields);
    });
