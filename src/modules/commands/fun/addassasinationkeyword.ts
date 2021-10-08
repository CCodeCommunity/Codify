import { Command } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../../common/matching/matchPrefixesStrict";

import { resolveArrayToOne } from "../../constants";

import knex from "../../../../db/knex";
import { Collection, Message, MessageReaction } from "discord.js";

import { createMetadata } from "../help/createMetadata";
import { setCooldown } from "../../../common/cooldown/middleware/comandCooldown";
import { initKeywords } from "../../reactions/assassinations";

const checkBalance = async (id: string) => {
    const balance = (await knex("user").where({ userid: id }))[0].balance;

    return parseInt(balance) >= 10000;
};

const addKeyword = async (keyword: string, username: string) => {
    await knex("keywords").insert({ keyword, username });
};
const updateBalance = async (id: string, addExtract: number) => {
    const balance = (await knex("user").where({ userid: id }))[0].balance;

    await knex("user")
        .where({ userid: id })
        .update({
            balance: parseInt(balance) + addExtract
        });
};

export default new Command()
    .match(matchPrefixesStrict("addassassinkeyword|addkeyword"))
    .setMetadata(
        createMetadata({
            name: "Add a keyword for assassinations",
            usage: "cc!addkeyword [keyword] | cc!addassasinkeyword [keyword]",
            description:
                "Sends a request for adding a new keyword for assassinations. Costs 10k, if it gets rejected you get 5k back, and if it doesn't get any response in 24h then you get your 10k back"
        })
    )
    .use(setCooldown(10000))
    .use<ParseArgumentsState>(async context => {
        const { message } = context;
        const { args } = context.state;
        try {
            if (message.channel.type !== "dm")
                return message.channel.send(
                    `Sorry but to make the game more fun by avoiding others knowing what keyword you submit I have decided that keywords should be submitted usign dms only.`
                );
            if (!args.length) {
                return message.channel.send(
                    `**Error**: You cannot put an empty keyword`
                );
            }
            if (args.length > 1) {
                return message.channel.send(
                    "**Error**: You can't use multiple words."
                );
            }
            if (args.join(" ").length > 25) {
                return message.channel.send("**Error**: Keyword too long.");
            }
            if (!(await checkBalance(message.author.id))) {
                return message.channel.send(`**Error**: Not enough money.`);
            }
            await updateBalance(message.author.id, -10000);

            message.channel.send(
                `**Thanks for your submission, you will have to wait for the admnistrator to approve your keyword. If he doesnt do it in 24h you will get your money back, if he rejects your keyword you will only get half of your money back. Don't forget that if your keyword is a common word, a bad word or a word that can be included in other words it probably won't be accepted. **\n**Your quote is:**\n${args.join(
                    " "
                )}`
            );
            (await message.client.users.fetch("270972671490129921"))?.send(
                `*${message.author.username} wants to add a new keyword.*`
            );
            (await message.client.users.fetch("270972671490129921"))?.send(
                `---------------------------------------------------------------------------`
            );
            const messageSent = (await (
                await message.client.users.fetch("270972671490129921")
            )?.send(
                `${args.join(
                    " "
                )}\n---------------------------------------------------------------------------`
            )!) as Message;
            console.log(`New keyword request from: ${message.author.username}`);
            await resolveArrayToOne(messageSent).react("👍");
            await resolveArrayToOne(messageSent).react("👎");
            setTimeout(async () => {
                const filter = (reaction: MessageReaction) =>
                    reaction.emoji.name === "👍" ||
                    reaction.emoji.name === "👎";

                const collector = messageSent.createReactionCollector(filter, {
                    max: 1,
                    time: 3600000 * 24
                });
                collector.on("collect", async (reaction: MessageReaction) => {
                    if (reaction.emoji.name === "👍") {
                        // we add the keyword to the database
                        await addKeyword(
                            args.join(" "),
                            message.author.username
                        );

                        await initKeywords();

                        (
                            await message.client.users.fetch(
                                "270972671490129921"
                            )
                        )?.send(
                            "Successfully added the new keyword. :white_check_mark:"
                        );
                        message.author.send(
                            `Your keyword was approved by the administrator. :white_check_mark: \n**Your keyword is:**\n${args.join(
                                " "
                            )}`
                        );
                    }
                    if (reaction.emoji.name === "👎") {
                        // we dont add the keyword and we return half the money
                        await updateBalance(message.author.id, 5000);

                        (
                            await message.client.users.fetch(
                                "270972671490129921"
                            )
                        )?.send(
                            "The keyword has been successfully rejected. :x:"
                        );
                        message.author.send(
                            `Your keyword was rejected by the administrator. :x:\n**Your keyword is:**\n${args.join(
                                " "
                            )}`
                        );
                    }
                });
                collector.on(
                    "end",
                    async <K, V>(collected: Collection<K, V>) => {
                        if (collected.size === 0) {
                            // we return the money and send a dm to the guy
                            await updateBalance(message.author.id, 10000);
                            (
                                await message.client.users.fetch(
                                    "270972671490129921"
                                )
                            )?.send(
                                `Failed to react to the keyword in time. :x: \n**The keyword is:**\n${args.join(
                                    " "
                                )}`
                            );
                            message.author.send(
                                `Sorry but the administrator didn't see your keyword in time. :x:\n**Your keyword:**\n${args.join(
                                    " "
                                )}`
                            );
                        }
                    }
                );
                if (message.channel.type !== "dm") message.delete();
            }, 1000);
        } catch (e) {
            return message.channel.send("**Error**: Something went wrong.");
        }
    });
