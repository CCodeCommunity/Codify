import { CommandBuilder } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";

import Knex from "knex";
import { production } from "../../../knexfile";
const knex = Knex(production);

async function checkBalance(amount: number, id: string) {
    if (amount <= 0 || amount >= 10000) {
        return false;
    }

    const balance = await knex("user")
        .where({ userid: id })
        .then(data => data[0].balance);

    return parseInt(balance) >= amount;
}

async function updateBalance(amount: number, id: string) {
    const { win, dice } = await gamble(amount);
    const balance = await knex("user")
        .where({ userid: id })
        .then(data => parseInt(data[0].balance));
    await knex("user")
        .where({ userid: id })
        .update({
            balance: win + balance
        });
    const newBalance = win + balance;
    return { dice, newBalance };
}

async function gamble(amount: number) {
    const dice = Math.floor(Math.random() * 100) + 1;

    const win = dice === 100 ? amount * 2 : dice >= 50 ? amount : -amount;

    return { win, dice };
}

export default new CommandBuilder()
    .match(matchPrefixesStrict("gamble|dice|slots"))
    .use<ParseArgumentsState>(async context => {
        const { message } = context;
        const { args } = context.state;
        const amount = parseInt(args.join(" "));

        if (await checkBalance(amount, message.author.id)) {
            const { dice, newBalance } = await updateBalance(
                amount,
                message.author.id
            );
            return message.channel.send(
                `🎲 You rolled **${dice}** and **${
                    dice === 100
                        ? "won " + amount * 3
                        : dice >= 50
                        ? "won " + amount * 2
                        : "lost everything"
                }** and now you have **$${newBalance}**`
            );
        } else {
            return message.channel.send("**Wait that's illegal.**");
        }
    })
    .done();
