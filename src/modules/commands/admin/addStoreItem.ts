import { Command } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../../common/matching/matchPrefixesStrict";
import knex from "../../../../db/knex";
import Store from "../../../common/types/Store";
import { createMetadata } from "../help/createMetadata";
import {
    Cooldown,
    setCooldown
} from "../../../common/cooldown/middleware/comandCooldown";

export default new Command()
    .match(matchPrefixesStrict("addStoreItem"))
    .setMetadata(
        createMetadata({
            name: "Add item to the store",
            usage: "cc!addstoreitem [roleid] [price] [interval in days]",
            description:
                "People with `Manage roles` permission can use this command to add an item to the store, aka a role that can be bought by other users"
        })
    )
    .use<Cooldown>(setCooldown(5000))
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

        if (!(await message.guild!.roles.fetch(args[0]))) {
            return message.channel.send(
                ":x: **Oops,** looks like that role doesn't exist."
            );
        }
        const roleId = args[0];
        if (parseInt(args[1]).toString() !== args[1]) {
            return message.channel.send(
                ":x: **Oops,** looks like your price isn't a number."
            );
        }
        const price = parseInt(args[1]);
        if (price < 0) {
            return message.channel.send(
                ":x: **Oops,** your price can't be below 0!"
            );
        }

        if (!args[2]) {
            return message.channel.send(
                `:x: **Oops,** looks like you didn't set an interval.`
            );
        }

        if (args[2] && Number(args[2]).toString() !== args[2]) {
            return message.channel.send(
                ":x: **Oops,** looks like your subscription interval isn't a number."
            );
        }
        const subscriptionInterval = args[2] && Number(args[2]);

        await knex<Store>("store").insert({
            serverId: message.guild!.id,
            roleId,
            price,
            subscription: !!subscriptionInterval,
            subscriptionInterval: subscriptionInterval || 0
        });

        if (message.guild !== null) message.delete();

        return message.channel.send(
            `:white_check_mark: **Successfully added store item.**`
        );
    });
