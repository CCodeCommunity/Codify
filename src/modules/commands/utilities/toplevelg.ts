import { Command } from "@enitoni/gears-discordjs";

import { matchPrefixesStrict } from "../../../common/matching/matchPrefixesStrict";

import knex from "../../../../db/knex";
import { Message } from "discord.js";
import { createMetadata } from "../help/createMetadata";
import {
    Cooldown,
    setCooldown
} from "../../../common/cooldown/middleware/comandCooldown";
import { alphanumericRegx } from "../../constants";

async function generateTop(message: Message) {
    const top = await knex("user")
        .orderBy("level", "desc")
        .orderBy("xp", "desc");
    let fill = "```less\n";

    for (let i = 0; i <= 9; i++) {
        let memberName;
        do {
            if (top[i] == undefined) {
                i = 99;
                break;
            }

            const member = message.client.users.cache.get(`${top[i].userid}`);

            if (member)
                memberName = member?.tag
                    .split("#")[0]
                    .replace(alphanumericRegx, "");

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

const getPlaceLocal = async (uid: string, message: Message) => {
    const top = await knex("user")
        .orderBy("level", "desc")
        .orderBy("xp", "desc");

    const localTop = top.filter((a) =>
        message.guild?.members.cache.get(`${a.userid}`)
    );

    return (
        localTop.findIndex((k) => {
            const { userid } = k;
            return userid == uid;
        }) + 1
    );
};
const getPlace = async (uid: string) => {
    const top = await knex("user")
        .orderBy("level", "desc")
        .orderBy("xp", "desc");

    return (
        top.findIndex((k) => {
            const { userid } = k;
            return userid == uid;
        }) + 1
    );
};

export default new Command()
    .match(matchPrefixesStrict("topg|toplevelglobal|toplg"))
    .setMetadata(
        createMetadata({
            name: "Top levels globally",
            usage: "cc!topg/toplevelglobal/toplg",
            description: "Shows a top with user levels globally."
        })
    )
    .use<Cooldown>(setCooldown(20000))
    .use(async (context) => {
        const { message } = context;
        const list = await generateTop(message);
        return message.channel.send(list);
    });
