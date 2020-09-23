import { Command } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";
import knex from "../../../db/knex";
import Store from "../../common/types/Store";

export default new Command()
    .match(matchPrefixesStrict("addStoreItem"))
    .use<ParseArgumentsState>(async context => {
        const { message } = context;
        const { args } = context.state;

        if (!message.member.hasPermission("MANAGE_ROLES")) {
            return message.channel.send(
                ":x: **Oops,** you aren't allowed to do that. Make sure you have the `Manage roles` permission."
            );
        }
        if (!message.guild.roles.get(args[0])) {
            return message.channel.send(
                ":x: **Oops,** looks like that role doesn't exist."
            );
        }
        const roleId = args[0];
        if (Number(args[1]).toString() !== args[1]) {
            return message.channel.send(
                ":x: **Oops,** looks like your price isn't a number."
            );
        }
        const price = Number(args[1]);
        if (args[2] && Number(args[2]).toString() !== args[2]) {
            return message.channel.send(
                ":x: **Oops,** looks like your subscription interval isn't a number."
            );
        }
        const subscriptionInterval = args[2] && Number(args[2]);

        await knex<Store>("store").insert({
            serverId: message.guild.id,
            roleId,
            price,
            subscription: !!subscriptionInterval,
            subscriptionInterval: subscriptionInterval || 0
        });

        message.delete();
        return message.channel.send(
            `:white_check_mark: **Successfully added store item.**`
        );
    });
