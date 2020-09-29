import { Command } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";
import knex from "../../../db/knex";
import Store from "../../common/types/Store";
import Subscription from "../../common/types/Subscription";

export default new Command()
    .match(matchPrefixesStrict("removeStoreItem"))
    .use<ParseArgumentsState>(async context => {
        const { message } = context;
        const { args } = context.state;

        if (!args[0]) {
            return message.channel.send(
                ":x: **Oops,** you need to provide arguments!"
            );
        }

        if (Number(args[0]).toString() !== args[0]) {
            return message.channel.send(
                ":x: **Oops,** looks like your removal ID isn't a number."
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

        const subs: Subscription[] = await knex("subscriptions").where({
            storeId: matchingStoreItem.id
        });

        subs.map(l => {
            message.guild?.members
                .get(l.userId)
                ?.removeRole(matchingStoreItem.roleId);
        });

        await knex("subscriptions")
            .delete()
            .where({ storeId: matchingStoreItem.id });

        await knex("store")
            .delete()
            .where({ id: matchingStoreItem.id });

        return message.channel.send(
            `:white_check_mark: **Successfully removed store item.**`
        );
    });
