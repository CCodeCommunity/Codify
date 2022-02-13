import { Command } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../../common/matching/matchPrefixesStrict";
import knex from "../../../../db/knex";
import Store from "../../../common/types/Store";
import Subscription from "../../../common/types/Subscription";
import User from "../../../common/types/User";
import { createMetadata } from "../help/createMetadata";
import {
    Cooldown,
    setCooldown
} from "../../../common/cooldown/middleware/comandCooldown";
import { logEvent } from "../../reactions/auditlogs";

const checkBalance = async (amount: number, id: string) => {
    const balance = (await knex("user").where({ userid: id }))[0].balance;

    return parseInt(balance) >= amount;
};

export default new Command()
    .match(matchPrefixesStrict("buy"))
    .setMetadata(
        createMetadata({
            name: "Buy an item",
            usage: "cc!buy [itemid]",
            description:
                "Buy an item from the store of the server. You have to use the id listed in cc!store"
        })
    )
    .use<Cooldown>(setCooldown(5000))
    .use<ParseArgumentsState>(async context => {
        const { message } = context;
        const { args } = context.state;

        if (!args[0]) {
            return message.channel.send(
                ":x: **Oops,** you need to provide arguments!"
            );
        }

        if (parseInt(args[0]).toString() !== args[0]) {
            return message.channel.send(
                ":x: **Oops,** looks like your buy ID isn't a number."
            );
        }
        const id = parseInt(args[0]);

        const matchingStoreItem: Store = (
            await knex("store").where({ serverId: message.guild!.id })
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

        const matchingRole = (await message.guild!.roles.fetch()).cache.find(
            role => role.id === matchingStoreItem.roleId
        );

        if (!matchingRole) {
            return message.channel.send(
                ":x: **Oops,** seems like the role you're buying doesn't exist. Maybe try contacting a server admin about this."
            );
        }

        const dbUser: User = await knex("user")
            .where({ userid: message.author.id })
            .first();

        await knex("user")
            .update({
                balance: dbUser.balance - matchingStoreItem.price
            })
            .where({ userid: message.author.id });

        message.member!.roles.add(matchingRole);

        await knex<Subscription>("subscriptions").insert({
            userId: message.author.id,
            storeId: matchingStoreItem.id.toString(),
            expiration: (
                Math.floor(Date.now() / 1000) +
                86400 * (matchingStoreItem.subscriptionInterval || 999999)
            ).toString()
        });

        logEvent(
            `<@${message.author.id}> has bought the <@&${matchingRole.id}> role.`,
            context
        );

        return message.channel.send(
            `:white_check_mark: **Successfully purchased store item.**`
        );
    });
