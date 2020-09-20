import { CommandBuilder } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";

import knex from "../../../db/knex";

async function checkBalance(amount: number, id: string) {
    if (amount <= 0 || amount >= 1001) {
        return false;
    }

    const balance = (await knex("user").where({ userid: id }))[0].balance;

    return parseInt(balance) >= amount;
}

async function gamble(amount: number) {
    const dice = Math.floor(Math.random() * 100) + 1;
    const win = dice === 100 ? amount * 2 : dice >= 50 ? amount : -amount;

    return { win, dice };
}

async function updateBalance(amount: number, id: string) {
    const { win, dice } = await gamble(amount);

    const balance = (await knex("user").where({ userid: id }))[0].balance;

    await knex("user")
        .where({ userid: id })
        .update({
            balance: win + parseInt(balance)
        });

    const newBalance = win + parseInt(balance);

    return { dice, newBalance };
}

export default new CommandBuilder()
    .match(matchPrefixesStrict("gamble|dice|slots"))
    .use<ParseArgumentsState>(async context => {
        const { message } = context;
        const { args } = context.state;
        const amount = parseInt(args.join(" "));

        try {
            if (await checkBalance(amount, message.author.id)) {
                const { dice, newBalance } = await updateBalance(
                    amount,
                    message.author.id
                );
                return message.channel.send(
                    dice !== 69
                        ? `🎲 You rolled **${dice}** and **${
                              dice === 100
                                  ? "won " + amount * 3
                                  : dice >= 50
                                  ? "won " + amount * 2
                                  : "lost everything"
                          }** and now you have **$${newBalance}**, <@${
                              message.author.id
                          }>`
                        : `🎲 You rolled **69** (Nice :sunglasses:) and **${"won " +
                              amount *
                                  2}** and now you have **$${newBalance}**, <@${
                              message.author.id
                          }>`
                );
            } else {
                return message.channel.send("**Wait that's illegal.**");
            }
        } catch (e) {
            console.info(e);
        }
    })
    .done();
