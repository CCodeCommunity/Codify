import { Command } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";
import knex from "../../../db/knex";
import Store from "../../common/types/Store";

export default new Command()
    .match(matchPrefixesStrict("store"))
    .use<ParseArgumentsState>(async context => {
        const { message } = context;

        const serverId = message.guild.id;

        const store: Store[] = await knex("store")
            .where({ serverId })
            .select();

        if (!store.length) {
            return message.channel.send({
                embed: {
                    title: `**Store for ${message.guild.name}!**`,
                    description:
                        "This store has no items! Ask an admin to add some.",
                    color: 3447003
                }
            });
        } else {
            const storeEmbedFields = store.map((l, idx) => {
                const role = message.guild.roles.get(l.roleId)!;
                return {
                    name: `**${role.name}** - ID: ${idx + 1}`,
                    value: `Color - ${role.color} | Price - ${l.price} ${l.subscription
                            ? `every ${l.subscriptionInterval} days`
                            : ""
                        }`
                };
            });
            return message.channel.send({
                embed: {
                    title: `**Store for ${message.guild.name}!**`,
                    color: 3447003,
                    fields: storeEmbedFields
                }
            });
        }
    });
