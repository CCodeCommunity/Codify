import { CommandBuilder } from "@enitoni/gears-discordjs";

import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";

import Knex from "knex";
import { production } from "../../../knexfile";
const knex = Knex(production);

async function checkClaimed(id: string) {
    try {
        const lastdaily = await knex("user")
            .where({ userid: id })
            .then(data => data[0].lastdaily);
        return lastdaily != new Date().getDate();
    } catch (e) {
        console.info(e);
        return false;
    }
}

async function daily(id: string, amount: number) {
    try {
        let balance = await knex("user")
            .where({ userid: id })
            .then(data => data[0].balance);
        await knex("user")
            .where({ userid: id })
            .update({
                balance: parseInt(balance) + amount,
                lastdaily: `${new Date().getDate()}`
            });
    } catch (e) {
        console.info(e);
    }
}

export default new CommandBuilder()
    .match(matchPrefixesStrict("daily|claim|dailyclaim|free"))
    .use(async context => {
        const { message } = context;

        try {
            if (await checkClaimed(message.author.id)) {
                const amount = Math.floor(Math.random() * 100) + 1;
                await daily(message.author.id, amount);
                return message.channel.send(
                    `Oh look you just found a wallet on the ground, and it has $${amount} in it, I bet you're gonna keep that.`
                );
            } else {
                return message.channel.send(
                    `**OOPS,** it seems like you can't claim your daily reward right now.`
                );
            }
        } catch (e) {
            console.info(e);
        }
    })
    .done();
