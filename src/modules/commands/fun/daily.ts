import { Command } from "@enitoni/gears-discordjs";

import { matchPrefixesStrict } from "../../../common/matching/matchPrefixesStrict";

import knex from "../../../../db/knex";
import { checkAndInitProfile } from "../../../common/knexCommon";
import { createMetadata } from "../help/createMetadata";
import {
    Cooldown,
    setCooldown
} from "../../../common/cooldown/middleware/comandCooldown";

async function checkClaimed(userid: string) {
    await checkAndInitProfile(userid);

    try {
        const lastdaily = (await knex("user").where({ userid }))[0].lastdaily;
        return lastdaily != new Date().getDate();
    } catch (e) {
        return false;
    }
}

async function daily(userid: string, amount: number) {
    try {
        const balance = (await knex("user").where({ userid }))[0].balance;

        await knex("user")
            .where({ userid })
            .update({
                balance: parseInt(balance) + amount,
                lastdaily: `${new Date().getDate()}`
            });
    } catch (e) {
        console.info(e);
    }
}

const calculateAmount = async (userid: string): Promise<number> => {
    const level = (await knex("user").where({ userid }))[0].level;
    return Number(level) + Math.floor(Math.random() * 100) + 1;
};

export default new Command()
    .match(matchPrefixesStrict("daily|claim|dailyclaim|free"))
    .setMetadata(
        createMetadata({
            name: "Daily money",
            usage: "cc!daily/claim/dailyclaim/free",
            description:
                "You get a random amount of coins from 1 to 100, can be used once a day"
        })
    )
    .use<Cooldown>(setCooldown(60000))
    .use(async context => {
        const { message } = context;

        try {
            if (await checkClaimed(message.author.id)) {
                const amount = await calculateAmount(message.author.id);

                await daily(message.author.id, amount);

                return message.channel.send(
                    `You just claimed your daily reward, you got **$${amount}** today. Come back tomorrow for more!`
                );
            } else {
                return message.channel.send(
                    `**OOPS,** you already claimed your daily reward.`
                );
            }
        } catch (e) {
            console.info(e);
        }
    });
