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
import { MessageEmbed } from "discord.js";

export default new Command()
    .match(matchPrefixesStrict("store"))
    .setMetadata(
        createMetadata({
            name: "Store",
            usage: "cc!store",
            description: "Shows the items in the store"
        })
    )
    .use<Cooldown>(setCooldown(20000))
    .use<ParseArgumentsState>(async (context) => {
        const { message } = context;

        const serverId = message.guild!.id;

        const store: Store[] = await knex("store").where({ serverId }).select();

        if (!store.length) {
            const embed = new MessageEmbed()
                .setTitle(`**Store for ${message.guild!.name}!**`)
                .setColor(3447003)
                .setDescription(
                    "This store has no items! Ask an admin to add some."
                );
            return message.channel.send({
                embeds: [embed]
            });
        } else {
            const storeEmbedFields = await Promise.all(
                store.map(async (l, idx) => {
                    const role = (await message.guild!.roles.fetch(l.roleId)!)!;
                    return {
                        name: `**${role.name}** - ID: ${idx + 1}`,
                        value: `Color - #${role.color.toString(16)} | Price - ${
                            l.price
                        } ${
                            l.subscription
                                ? `every ${l.subscriptionInterval} days`
                                : ""
                        }`
                    };
                })
            );
            const embed = new MessageEmbed()
                .setTitle(`**Store for ${message.guild!.name}!**`)
                .setColor(3447003)
                .setFields(storeEmbedFields);
            return message.channel.send({ embeds: [embed] });
        }
    });
