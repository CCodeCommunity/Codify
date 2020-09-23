import { Command } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";
import knex from "../../../db/knex";
import Store from "../../common/types/Store";
import Subscription from "../../common/types/Subscription";

export default new Command()
    .match(matchPrefixesStrict("purchases"))
    .use<ParseArgumentsState>(async context => {
        const { message } = context;

        const purchases: Subscription[] = await knex("subscriptions").where({
            userId: message.author.id
        });

        if (!purchases.length) {
            return message.channel.send({
                embed: {
                    title: `**Purchases on ${message.guild.name}**`,
                    description:
                        "You don't have any purchases! Buy something on a server for it to show up here.",
                    color: 3447003
                }
            });
        }

        const fields = await Promise.all(
            purchases.map(async (l, idx) => {
                const store: Store = await knex("store")
                    .where({ id: l.storeId })
                    .first();
                const role = message.guild.roles.get(store.roleId)!;
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
        return message.channel.send({
            embed: {
                title: `**Purchases on ${message.guild.name}!**`,
                color: 3447003,
                fields
            }
        });
    });
