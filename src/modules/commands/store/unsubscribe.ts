import { Command } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../../common/matching/matchPrefixesStrict";
import knex from "../../../../db/knex";
import Subscription from "../../../common/types/Subscription";
import Store from "../../../common/types/Store";
import { createMetadata } from "../help/createMetadata";
import {
    Cooldown,
    setCooldown
} from "../../../common/cooldown/middleware/comandCooldown";
import { logEvent } from "../../reactions/auditlogs";

export default new Command()
    .match(matchPrefixesStrict("unsubscribe"))
    .setMetadata(
        createMetadata({
            name: "Unsubscribe",
            usage: "cc!unsubscribe [itemid]",
            description: "Unsubscribe from a role that you bought"
        })
    )
    .use<Cooldown>(setCooldown(5000))
    .use<ParseArgumentsState>(async (context) => {
        const { message } = context;
        const { args } = context.state;

        if (!args[0]) {
            return message.channel.send(
                ":x: **Oops,** you need to provide an ID to unsubscribe from."
            );
        }

        if (parseInt(args[0]).toString() !== args[0]) {
            return message.channel.send(
                ":x: **Oops,** looks like that ID isn't a number."
            );
        }

        const id = parseInt(args[0]) - 1;

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

        // const matchingRole = (await message.guild!.roles.fetch()).cache.find(
        //     role => role.id === matchingStore.roleId
        // )!;

        const matchingRole = await message.guild?.roles.fetch(
            matchingStore.roleId
        );
        if (!matchingRole) return;

        message.member!.roles.remove(matchingRole);

        await knex("subscriptions")
            .delete()
            .where({ id: matchingSubscription.id });

        logEvent(
            `<@${message.author.id}> has removed his <@&${
                (await matchingRole)?.id
            }> role.`,
            context
        );
        return message.channel.send(
            `:white_check_mark: **Successfully unsubscribed.**`
        );
    });
