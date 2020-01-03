import { CommandBuilder } from "@enitoni/gears-discordjs";

import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";

import knex from "../../../knexfile";

async function fillFields() {
    const top = await knex("user")
        .orderBy("level", "desc")
        .orderBy("xp", "desc");
    let fill = new Array(9);

    for (let i = 0; i <= 9; i++) {
        fill[i] = {
            name: `\`TOP ${i + 1}\``,
            value: `<@${top[i].userid}>\n---> **Level: ${top[i].level}** and **${top[i].xp} xp**`,
            inline: true
        };
    }

    return fill;
}

export default new CommandBuilder()
    .match(matchPrefixesStrict("top|toplevel|topl"))
    .use(async context => {
        const { message } = context;
        const fields = await fillFields();
        return message.channel.send({
            embed: {
                description: "***TOP USERS BY LEVEL***",
                color: 3447003,
                fields
            }
        });
    })
    .done();
