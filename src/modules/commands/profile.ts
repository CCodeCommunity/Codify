import { CommandBuilder } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";

import knex from "../../../knexfile";

async function pullData(id: string) {
    await knex("user")
        .where({ userid: id })
        .then(async rows => {
            if (rows.length === 0) {
                await knex("user").insert({
                    userid: id,
                    description: "Nothing set yet.",
                    balance: 0,
                    lastdaily: "Never claimed."
                });
            }
        });

    return knex("user").where("userid", id);
}

export default new CommandBuilder()
    .match(matchPrefixesStrict("profile"))
    .use<ParseArgumentsState>(async context => {
        const { message } = context;
        const { args } = context.state;

        try {
            if (args.length) {
                const info = await pullData(message.mentions.users.first().id);
                const profileData = info[0];

                return message.channel.send({
                    embed: {
                        description: "**This is your buddy.**",
                        color: 3447003,
                        footer: {
                            text: "👀"
                        },
                        fields: [
                            {
                                name: "😀 Nickname:",
                                value: `${
                                    message.guild.members.get(
                                        `${profileData.userid}`
                                    )?.displayName
                                }`
                            },
                            {
                                name: "💬 Description:",
                                value: `${profileData.description}`
                            },
                            {
                                name: "💰 Balance:",
                                value: `${profileData.balance}`
                            },
                            {
                                name: "📅 Last daily claim:",
                                value:
                                    profileData.lastdaily == "Never claimed."
                                        ? "Never claimed."
                                        : profileData.lastdaily +
                                          "/" +
                                          (new Date().getMonth() + 1) +
                                          "/" +
                                          new Date().getFullYear()
                            }
                        ]
                    }
                });
            } else {
                const info = await pullData(message.author.id);
                const profileData = info[0];

                return message.channel.send({
                    embed: {
                        description: "**Here is your profile data.**",
                        color: 3447003,
                        footer: {
                            text: "👍"
                        },
                        fields: [
                            {
                                name: "😀 Nickname:",
                                value: `${
                                    message.guild.members.get(
                                        `${profileData.userid}`
                                    )?.displayName
                                }`
                            },
                            {
                                name: "💬 Description:",
                                value: `${profileData.description}`
                            },
                            {
                                name: "💰 Balance:",
                                value: `${profileData.balance}`
                            },
                            {
                                name: "📅 Last daily claim:",
                                value:
                                    profileData.lastdaily == "Never claimed."
                                        ? "Never claimed."
                                        : profileData.lastdaily +
                                          "/" +
                                          (new Date().getMonth() + 1) +
                                          "/" +
                                          new Date().getFullYear()
                            }
                        ]
                    }
                });
            }
        } catch (e) {
            console.info(e);
            return message.channel.send(
                `**ERROR:** Something went wrong. Try \`cc!help\` for more info.`
            );
        }
    })
    .done();
