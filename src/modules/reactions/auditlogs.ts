import { Context } from "@enitoni/gears-discordjs";
import { TextChannel } from "discord.js";
import knex from "../../../db/knex";

const getAuditChannelId = async (serverid?: string) => {
    if (!serverid) return;
    const channelid = (await knex("servers").where({ serverid }))[0]
        .auditchannel;
    if (channelid) return channelid;
    return;
};

export const logEvent = async (message: string, ctx: Context) => {
    const channelid = await getAuditChannelId(ctx.message.guild?.id);

    if (!channelid) return;

    const channel = (await ctx.message.client.channels.fetch(
        channelid
    )) as TextChannel;
    channel.send(message);
};
