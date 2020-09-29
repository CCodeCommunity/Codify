import { Command } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";
import knex from "../../../db/knex";
import Subscription from "../../common/types/Subscription";
import Store from "../../common/types/Store";

export default new Command()
    .match(matchPrefixesStrict("unsubscribe"))
    .use<ParseArgumentsState>(async context => {
        const { message } = context;
        const { args } = context.state;

        if (!args[0]) {
            return message.channel.send(
                ":x: **Oops,** you need to provide an ID to unsubscribe from."
            );
        }

        if (Number(args[0]).toString() !== args[0]) {
            return message.channel.send(
                ":x: **Oops,** looks like that ID isn't a number."
            );
        }

        const id = Number(args[0]) - 1;

        const subscriptions = await knex("subscriptions").where({
            userId: message.author.id
        });

        const matchingSubscription: Subscription = subscriptions[id];

        if (!matchingSubscription) {
            return message.channel.send(
                ":x: **Oops,** looks like that ID doesn't match up with any purchases. Run `cc!purchases` to see your purchases."
            );
        }

        const matchingStore: Store = await knex("store")
            .where({
                id: matchingSubscription.storeId
            })
            .first();

        const matchingRole = message.guild.roles.find(
            role => role.id === matchingStore.roleId
        );

        message.member.removeRole(matchingRole);

        await knex("subscriptions")
            .delete()
            .where({ id: matchingSubscription.id });

        return message.channel.send(
            `:white_check_mark: **Successfully unsubscribed.**`
        );
    });
