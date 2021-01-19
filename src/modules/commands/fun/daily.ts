import { Command } from "@enitoni/gears-discordjs";

import { matchPrefixesStrict } from "../../../common/matching/matchPrefixesStrict";

import knex from "../../../../db/knex";
import { checkAndInitProfile } from "../../../common/knexCommon";
import { createMetadata } from "../help/createMetadata";

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
    .use(async context => {
        const { message } = context;

        try {
            if (await checkClaimed(message.author.id)) {
                const amount = Math.floor(Math.random() * 100) + 1;

                await daily(message.author.id, amount);

                return message.channel.send(
                    `**Oh look** you just found a wallet on the ground, and it has **$${amount}** in it, it's all yours.`
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
