import {
    Client,
    GuildMember,
    PartialGuildMember,
    TextChannel
} from "discord.js";
import knex from "../../../db/knex";

type Guild = {
    serverid?: string;
    pinschannel?: string;
    welcomechannel?: string;
    auditchannel?: string;
    usersquotes?: boolean;
};

const getWelcomeChannel = async (
    guildid: string
): Promise<string | undefined> => {
    const server = (
        await knex("servers").where({ serverid: guildid })
    )[0] as Guild;

    return server.welcomechannel;
};

export const joinMessage = async (
    guildid: string,
    client: Client,
    member: GuildMember
) => {
    const channelid = await getWelcomeChannel(guildid);
    if (!channelid) return;
    try {
        const channel = (await client.channels.fetch(channelid)) as TextChannel;
        channel.send(`**${member.displayName} joined the server!**`);
    } catch (error) {
        console.log(error);
    }
};

export const leaveMessage = async (
    guildid: string,
    client: Client,
    member: GuildMember | PartialGuildMember
) => {
    const channelid = await getWelcomeChannel(guildid);
    if (!channelid) return;
    try {
        const channel = (await client.channels.fetch(channelid)) as TextChannel;
        channel.send(`**${member.displayName} left the server!**`);
    } catch (error) {
        console.log(error);
    }
};
