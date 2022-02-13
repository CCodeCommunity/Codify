import { Command } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../../common/matching/matchPrefixesStrict";
import knex from "../../../../db/knex";
import Store from "../../../common/types/Store";
import Subscription from "../../../common/types/Subscription";
import { createMetadata } from "../help/createMetadata";
import {
    Cooldown,
    setCooldown
} from "../../../common/cooldown/middleware/comandCooldown";
import { MessageEmbed } from "discord.js";

export default new Command()
    .match(matchPrefixesStrict("purchases"))
    .setMetadata(
        createMetadata({
            name: "Purchases",
            usage: "cc!purchases",
            description: "Shows what purchases you have in the server"
        })
    )
    .use<Cooldown>(setCooldown(10000))
    .use<ParseArgumentsState>(async (context) => {
        const { message } = context;

        const purchases: Subscription[] = await knex("subscriptions").where({
            userId: message.author.id
        });

        if (!purchases.length) {
            const embed = new MessageEmbed()
                .setTitle(`**Purchases on ${message.guild!.name}**`)
                .setDescription(
                    "You don't have any purchases! Buy something on a server for it to show up here."
                )
                .setColor(3447003);
            return message.channel.send({ embeds: [embed] });
        }

        const fields = await Promise.all(
            purchases.map(async (l, idx) => {
                const store: Store = await knex("store")
                    .where({ id: l.storeId })
                    .first();
                const role = (await message.guild!.roles.fetch(store.roleId)!)!;
                return {
                    name: `**${role.name}** - ID: ${idx + 1}`,
                    value: `Color - #${role.color.toString(16)} | Price - ${
                        store.price
                    } ${
                        store.subscription
                            ? `every ${store.subscriptionInterval} days`
                            : ""
                    }`
                };
            })
        );
        const embed = new MessageEmbed()
            .setTitle(`**Purchases on ${message.guild!.name}!**`)
            .setColor(3447003)
            .setFields(fields);

        return message.channel.send({ embeds: [embed] });
    });
