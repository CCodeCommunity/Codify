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

const joinMessage = async (
    guildid: string,
    client: Client,
    member: GuildMember
) => {
    const channelid = await getWelcomeChannel(guildid);
    if (!channelid) return;
    try {
        const channel = (await client.channels.fetch(channelid)) as TextChannel;
        channel.send({
            content: `**<@${member.id}> has joined the server!**`,
            allowedMentions: { users: [] }
        });
    } catch (error) {
        console.log(error);
    }
};

const leaveMessage = async (
    guildid: string,
    client: Client,
    member: GuildMember | PartialGuildMember
) => {
    const channelid = await getWelcomeChannel(guildid);
    if (!channelid) return;
    try {
        const channel = (await client.channels.fetch(channelid)) as TextChannel;
        channel.send({
            content: `**<@${member.id}> has left the server!**`,
            allowedMentions: { users: [] }
        });
    } catch (error) {
        console.log(error);
    }
};

export const welcomeEventsInitialiser = (client: Client) => {
    client.on("guildMemberAdd", async (member) => {
        joinMessage(member.guild.id, client, member);
    });

    client.on("guildMemberRemove", async (member) => {
        leaveMessage(member.guild.id, client, member);
    });
};
