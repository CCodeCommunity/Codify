import { CommandBuilder } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";

import knex from "../../../db/knex";
import { checkAndInitProfile } from "../../common/knexCommon";

async function checkBalance(amount: number, id: string) {
    if (amount <= 0 || amount >= 1000001) {
        return false;
    }

    const balance = (await knex("user").where({ userid: id }))[0].balance;

    return parseInt(balance) >= amount;
}
async function transferMoney(
    amount: number,
    senderID: string,
    receiverID: string
) {
    const senderBalance = (await knex("user").where({ userid: senderID }))[0]
        .balance;

    const senderNewBalance = senderBalance - amount;
    await knex("user")
        .where({ userid: senderID })
        .update({
            balance: senderNewBalance
        });

    await checkAndInitProfile(receiverID);

    const receiverBalance = (
        await knex("user").where({ userid: receiverID })
    )[0].balance;

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
            if (message.mentions.users.first().bot) {
                return message.channel.send(
                    `**OOPS:** Looks like you can't give money to bots.`
                );
            }

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
