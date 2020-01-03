import { CommandBuilder } from "@enitoni/gears-discordjs";

import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";

import knex from "../../../knexfile";

async function generateTop(message: any) {
    const top = await knex("user")
        .orderBy("level", "desc")
        .orderBy("xp", "desc");
    let fill = "```css\n";

    for (let i = 0; i <= 9; i++) {
        const memberName = await message.guild.members
            .get(`${top[i].userid}`)
            ?.displayName.replace(/[^\w\s]|\s+/gi, "");
        const k = i + 1 == 10 ? "10" : `0${i + 1}`;

        fill += `[${k}]  #${memberName} \n`;
        fill += `      Level ${top[i].level}  :${top[i].xp}XP \n\n`;
    }
    fill += "```";

    return fill;
}

export default new CommandBuilder()
    .match(matchPrefixesStrict("top|toplevel|topl"))
    .use(async context => {
        const { message } = context;
        const list = await generateTop(message);
        return message.channel.send(list);
    })
    .done();
