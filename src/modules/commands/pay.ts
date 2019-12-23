import { CommandBuilder } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";

import knex from "../../../knexfile";

async function checkBalance(amount: number, id: string) {
    if (amount <= 0 || amount >= 10000) {
        return false;
    }

    const balance = await knex("user")
        .where({ userid: id })
        .then(data => data[0].balance);

    return parseInt(balance) >= amount;
}
async function transferMoney(
    amount: number,
    senderID: string,
    receiverID: string
) {
    const senderBalance = await knex("user")
        .where({ userid: senderID })
        .then(data => data[0].balance);
    const senderNewBalance = senderBalance - amount;
    await knex("user")
        .where({ userid: senderID })
        .update({
            balance: senderNewBalance
        });

    await knex("user")
        .where({ userid: receiverID })
        .then(async rows => {
            if (rows.length === 0) {
                await knex("user").insert({
                    userid: receiverID,
                    description: "Nothing set yet.",
                    balance: 0,
                    lastdaily: "Never claimed."
                });
            }
        });
    const receiverBalance = await knex("user")
        .where({ userid: receiverID })
        .then(data => data[0].balance);
    const receiverNewBalance = parseInt(receiverBalance) + amount;
    await knex("user")
        .where({ userid: receiverID })
        .update({
            balance: receiverNewBalance
        });
}

export default new CommandBuilder()
    .match(matchPrefixesStrict("pay"))
    .use<ParseArgumentsState>(async context => {
        const { message } = context;
        const { args } = context.state;
        const amount = parseInt(args.join(" ").slice(23));
        try {
            if (message.author.id != message.mentions.users.first().id) {
                if (await checkBalance(amount, message.author.id)) {
                    await transferMoney(
                        amount,
                        message.author.id,
                        message.mentions.users.first().id
                    );
                    return message.channel.send(`**Done.**`);
                } else {
                    return message.channel.send(`**OOPS** You can't do that.`);
                }
            } else {
                return message.channel.send(
                    "**You can't give yourself money.**"
                );
            }
        } catch (e) {
            console.info(e);
        }
    })
    .done();
