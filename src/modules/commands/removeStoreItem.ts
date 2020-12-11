import { Command } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";
import knex from "../../../db/knex";
import Store from "../../common/types/Store";
import Subscription from "../../common/types/Subscription";
import { createMetadata } from "./help/createMetadata";

export default new Command()
    .match(matchPrefixesStrict("removeStoreItem"))
    .setMetadata(
        createMetadata({
            name: "Remove store item",
            usage: "cc!removestoreitem [itemid]",
            description:
                "Remove an item from the store, you need MANAGE_ROLES permission for this."
        })
    )
    .use<ParseArgumentsState>(async context => {
        const { message } = context;
        const { args } = context.state;

        if (!message.member!.hasPermission("MANAGE_ROLES")) {
            return message.channel.send(
                ":x: **Oops,** you aren't allowed to do that. Make sure you have the `Manage roles` permission."
            );
        }

        if (!args[0]) {
            return message.channel.send(
                ":x: **Oops,** you need to provide arguments!"
            );
        }

        if (parseInt(args[0]).toString() !== args[0]) {
            return message.channel.send(
                ":x: **Oops,** looks like your removal ID isn't a number."
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

        const subs: Subscription[] = await knex("subscriptions").where({
            storeId: matchingStoreItem.id
        });

        await Promise.all(
            subs.map(async l => {
                (await message.guild?.members.fetch(l.userId))?.roles.remove(
                    matchingStoreItem.roleId
                );
            })
        );

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
