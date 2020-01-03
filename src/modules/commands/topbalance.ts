import { CommandBuilder } from "@enitoni/gears-discordjs";

import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";

import knex from "../../../knexfile";

async function fillFields() {
    const top = await knex("user").orderBy("balance", "desc");
    let fill = new Array(9);

    for (let i = 0; i <= 9; i++) {
        fill[i] = {
            name: `\`TOP ${i + 1}\``,
            value: `<@${top[i].userid}>\n with **$${top[i].balance}**`,
            inline: true
        };
    }

    return fill;
}

export default new CommandBuilder()
    .match(matchPrefixesStrict("topb|topbalance|balancetop"))
    .use(async context => {
        const { message } = context;
        const fields = await fillFields();
        return message.channel.send({
            embed: {
                description: "***TOP USERS BY BALANCE***",
                color: 3447003,
                fields
            }
        });
    })
    .done();
