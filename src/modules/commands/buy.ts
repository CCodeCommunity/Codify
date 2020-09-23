import { Command } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";
import knex from "../../../db/knex";
import Store from "../../common/types/Store";
import Subscription from "../../common/types/Subscription";

const checkBalance = async (amount: number, id: string) => {
    if (amount <= 0 || amount >= 1001) {
        return false;
    }

    const balance = (await knex("user").where({ userid: id }))[0].balance;

    return parseInt(balance) >= amount;
};

const updateBalance = async (amount: number, id: string) => {
    const balance = (await knex("user").where({ userid: id }))[0].balance;

    await knex("user")
        .where({ userid: id })
        .update({
            balance: parseInt(balance) + amount
        });

    const newBalance = amount + parseInt(balance);

    return { newBalance };
};

export default new Command()
    .match(matchPrefixesStrict("buy"))
    .use<ParseArgumentsState>(async context => {
        const { message } = context;
        const { args } = context.state;

        if (Number(args[0]).toString() !== args[0]) {
            return message.channel.send(
                ":x: **Oops,** looks like your buy ID isn't a number."
            );
        }
        const id = Number(args[0]);

        const matchingStoreItem: Store = (
            await knex("store").where({ serverId: message.guild.id })
        )[id - 1];

        if (!matchingStoreItem) {
            return message.channel.send(
                ":x: **Oops,** looks like that item ID does not exist."
            );
        }

        if (!(await checkBalance(matchingStoreItem.price, message.author.id))) {
            return message.channel.send(
                ":x: **Oops,** looks like you cannot afford this item."
            );
        }

        if (
            await knex("subscriptions")
                .where({
                    userId: message.author.id,
                    storeId: matchingStoreItem.id
                })
                .first()
        ) {
            return message.channel.send(
                ":x: **Oops,** looks like you already own this item."
            );
        }

        const matchingRole = message.guild.roles.find(
            role => role.id === matchingStoreItem.roleId
        );

        if (!matchingRole) {
            return message.channel.send(
                ":x: **Oops,** seems like the role you're buying doesn't exist. Maybe try contacting a server admin about this."
            );
        }

        message.member.addRole(matchingRole);

        await knex<Subscription>("subscriptions").insert({
            userId: message.author.id,
            storeId: matchingStoreItem.id.toString(),
            expiration: (
                Math.floor(Date.now() / 1000) +
                86400 * (matchingStoreItem.subscriptionInterval || 999999)
            ).toString()
        });

        return message.channel.send(
            `:white_check_mark: **Successfully purchased store item.**`
        );
    });
