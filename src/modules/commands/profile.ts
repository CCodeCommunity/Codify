import { CommandBuilder } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";

import knex from "../../../knexfile";
import { checkAndInitProfile } from "../../common/knexCommon";

async function pullData(id: string) {
    await checkAndInitProfile(id);

    return knex("user").where("userid", id);
}

export default new CommandBuilder()
    .match(matchPrefixesStrict("profile"))
    .use<ParseArgumentsState>(async context => {
        const { message } = context;
        const { args } = context.state;

        try {
            let profileData;
            if (args.length) {
                if (message.mentions.users.first().bot) {
                    return message.channel.send(`**OOPS:** Looks like bots can't have profiles.`)
                } else
                    profileData = (
                        await pullData(message.mentions.users.first().id)
                    )[0];
            } else {
                profileData = (await pullData(message.author.id))[0];
            }



            return message.channel.send({
                embed: {
                    description: "**Here you go!**",
                    color: 3447003,
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
                            name: "↗️ Level:",
                            value: `${profileData.level}`,
                            inline: true
                        },
                        {
                            name: "⭐ Xp until level up:",
                            value: `${Math.floor(
                                Math.sqrt(profileData.level) * 100
                            ) - profileData.xp}`,
                            inline: true
                        },
                        {
                            name: "💬 Description:",
                            value: `${profileData.description}`
                        },
                        {
                            name: "💰 Balance:",
                            value: `${profileData.balance}`,
                            inline: true
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
                                    new Date().getFullYear(),
                            inline: true
                        }
                    ]
                }
            });

        } catch (e) {
            console.info(e);
            return message.channel.send(
                `**ERROR:** Something went wrong. Try \`cc!help\` for more info.`
            );
        }
    })
    .done();
