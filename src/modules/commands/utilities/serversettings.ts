import { Command } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../../common/matching/matchPrefixesStrict";

import knex from "../../../../db/knex";
import { createMetadata } from "../help/createMetadata";
import {
    Cooldown,
    setCooldown
} from "../../../common/cooldown/middleware/comandCooldown";
import { MessageEmbed } from "discord.js";

async function pullData(serverid: string) {
    const server = await knex("servers").where({ serverid });
    if (!server) await knex("servers").insert({ serverid });

    return knex("servers").where({ serverid });
}

type ServerData = {
    serverid: string;
    pinschannel?: string;
    welcomechannel?: string;
    auditchannel?: string;
    usersquotes: boolean;
    levelupmsgs: boolean;
    levelupmsgschannel?: string;
    prefix: string;
};

export default new Command()
    .match(matchPrefixesStrict("serversettings"))
    .setMetadata(
        createMetadata({
            name: "Shows the server settings",
            usage: "cc!serversettings",
            description:
                "It will show the server wide settings like the prefix or pins channel, etc."
        })
    )
    .use<Cooldown>(setCooldown(5000))
    .use<ParseArgumentsState>(async (context) => {
        const { message } = context;

        if (!message.guild?.id) return;

        const serverData = (await pullData(message.guild.id))[0] as ServerData;

        try {
            const embed = new MessageEmbed()
                .setColor(3447003)
                .setDescription(`*${message.guild.name} Server Settings*`)
                .setFields([
                    {
                        name: "Commands Prefix",
                        value: `*${serverData.prefix}*`
                    },
                    {
                        name: "Pins Channel",
                        value: `${
                            serverData.pinschannel
                                ? `<#${serverData.pinschannel}>`
                                : "*Not Set*"
                        }`,
                        inline: true
                    },
                    {
                        name: "Welcome Channel",
                        value: `${
                            serverData.welcomechannel
                                ? `<#${serverData.welcomechannel}>`
                                : "*Not Set*"
                        }`,
                        inline: true
                    },
                    {
                        name: "Audit Log Channel",
                        value: `${
                            serverData.auditchannel
                                ? `<#${serverData.auditchannel}>`
                                : "*Not Set*"
                        }`,
                        inline: true
                    },
                    {
                        name: "Level Up Channel",
                        value: `${
                            serverData.levelupmsgschannel
                                ? `<#${serverData.levelupmsgschannel}>`
                                : "*Not Set*"
                        }`,
                        inline: true
                    },
                    {
                        name: "Level Up Quotes",
                        value: `${
                            serverData.usersquotes ? "*Enabled*" : "*Disabled*"
                        }`,
                        inline: true
                    },
                    {
                        name: "Level Up Level",
                        value: `${
                            serverData.levelupmsgs ? "*Enabled*" : "*Disabled*"
                        }`,
                        inline: true
                    }
                ]);
            return message.channel.send({ embeds: [embed] });
        } catch (e) {
            console.info(e);
            return message.channel.send(
                `**ERROR:** Something went wrong. Try \`cc!help\` for more info.`
            );
        }
    });
