import { Context } from "@enitoni/gears-discordjs";
import { TextChannel } from "discord.js";
import { bot } from "../../index";
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
    channel.send(
        `**${ctx.message.content.split(" ")[0]} in <#${
            ctx.message.channel.id
        }>: ** ${message}`
    );
};

export const logEventNoChannel = async (message: string, guildid: string) => {
    const channelid = await getAuditChannelId(guildid);

    if (!channelid) return;

    const channel = (await bot.client.channels.fetch(channelid)) as TextChannel;
    channel.send(`${message}`);
};

// bot.client.on("channelCreate", (channel) => {
//     logEventNoChannel(`<#${channel.id}> has been created`, channel.guildId);
// });

// bot.client.on("channelDelete", () => {});
// bot.client.on("channelPinsUpdate", () => {});
// bot.client.on("channelUpdate", () => {});
// bot.client.on("emojiCreate", () => {});
// bot.client.on("emojiDelete", () => {});
// bot.client.on("emojiUpdate", () => {});
// bot.client.on("guildBanAdd", () => {});
// bot.client.on("guildBanRemove", () => {});
// bot.client.on("guildIntegrationsUpdate", () => {});
// bot.client.on("inviteCreate", () => {});
// bot.client.on("inviteDelete", () => {});
// bot.client.on("messageDelete", () => {});
// bot.client.on("messageUpdate", () => {});
// bot.client.on("guildUpdate", () => {});
// bot.client.on("rateLimit", () => {});
// bot.client.on("roleCreate", () => {});
// bot.client.on("roleDelete", () => {});
// bot.client.on("roleUpdate", () => {});
// bot.client.on("userUpdate", () => {});
// bot.client.on("webhookUpdate", () => {});
