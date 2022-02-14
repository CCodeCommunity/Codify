import { Context } from "@enitoni/gears-discordjs";
import { Client, TextChannel } from "discord.js";
// eslint-disable-next-line import/no-cycle
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
    try {
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
    } catch (error) {
        console.log(error);
    }
};

export const logEventNoChannel = async (message: string, guildid: string) => {
    try {
        const channelid = await getAuditChannelId(guildid);

        if (!channelid) return;

        const channel = (await bot.client.channels.fetch(
            channelid
        )) as TextChannel;
        channel.send(`${message}`);
    } catch (error) {
        console.log(error);
    }
};

export const auditEventsInitialiser = (client: Client) => {
    client.on("channelCreate", (channel) => {
        logEventNoChannel(
            `<#${channel.id}> has been created.`,
            channel.guildId
        );
    });
    client.on("channelDelete", (channel) => {
        if (channel.type !== "DM")
            logEventNoChannel(
                `Channel **${channel.name}** has been deleted.`,
                channel.guildId
            );
    });
    client.on("channelPinsUpdate", (channel) => {
        if (channel.type !== "DM")
            logEventNoChannel(
                `<#${channel.id}>'s pins have been updated.`,
                channel.guildId
            );
    });
    client.on("channelUpdate", (oldc, newc) => {
        if (newc.type !== "DM")
            logEventNoChannel(
                `Channel <#${newc.id}> has been updated.`,
                newc.guildId
            );
    });
    client.on("emojiCreate", (emoji) => {
        logEventNoChannel(
            `A new emoji ${emoji} has been created.`,
            emoji.guild.id
        );
    });
    client.on("emojiDelete", (emoji) => {
        logEventNoChannel(
            `An emoji **${emoji}** has been deleted.`,
            emoji.guild.id
        );
    });
    client.on("emojiUpdate", (olde, newe) => {
        logEventNoChannel(`An emoji ${newe} has been updated.`, newe.guild.id);
    });

    client.on("stickerCreate", (emoji) => {
        logEventNoChannel(
            `A new sticker ${emoji} has been created.`,
            emoji.guild?.id || ""
        );
    });
    client.on("stickerDelete", (emoji) => {
        logEventNoChannel(
            `A sticker **${emoji}** has been deleted.`,
            emoji.guild?.id || ""
        );
    });
    client.on("stickerUpdate", (olde, newe) => {
        logEventNoChannel(
            `A sticker ${newe} has been updated.`,
            newe.guild?.id || ""
        );
    });
    client.on("threadCreate", (emoji) => {
        logEventNoChannel(
            `A new thread <#${emoji.id}> has been created.`,
            emoji.guild.id
        );
    });
    client.on("threadDelete", (emoji) => {
        logEventNoChannel(
            `A thread **${emoji.name}** has been deleted.`,
            emoji.guild.id
        );
    });
    client.on("threadUpdate", (olde, newe) => {
        logEventNoChannel(
            `A thread <#${newe.id}> has been updated.`,
            newe.guild.id
        );
    });
    client.on("guildBanAdd", (ban) => {
        logEventNoChannel(`<@${ban.user.id}> has been banned.`, ban.guild.id);
    });
    client.on("guildBanRemove", (ban) => {
        logEventNoChannel(`<@${ban.user.id}> has been unbanned.`, ban.guild.id);
    });
    client.on("guildIntegrationsUpdate", (guild) => {
        logEventNoChannel(`Integrations have been updated.`, guild.id);
    });
    client.on("inviteCreate", (invite) => {
        logEventNoChannel(
            `A new invite has been created by <@${invite.inviterId}> in <#${invite.channelId}>`,
            invite.guild?.id || ""
        );
    });
    client.on("inviteDelete", (invite) => {
        logEventNoChannel(
            `An invite has been deleted by <@${invite.inviterId}> in <#${invite.channelId}>`,
            invite.guild?.id || ""
        );
    });
    client.on("messageDelete", (message) => {
        logEventNoChannel(
            `**Message:** _${message.content}_ ** sent by <@${message.author?.id}> has been deleted .**`,
            message.guildId || ""
        );
    });
    client.on("messageUpdate", (oldm, newm) => {
        logEventNoChannel(
            `**Message send by <@${oldm.author?.id}>** _${oldm.content}_ **has been edited into** _${newm.content}_`,
            newm.guild?.id || ""
        );
    });
    client.on("guildUpdate", (oldg, newg) => {
        logEventNoChannel(
            `**The server settings have been updated.**`,
            newg.id
        );
    });
    client.on("roleCreate", (role) => {
        logEventNoChannel(
            `**A new role <@&${role.id}> has been created.**`,
            role.guild.id
        );
    });
    client.on("roleDelete", (role) => {
        logEventNoChannel(
            `**A role **${role.name}** has been deleted.**`,
            role.guild.id
        );
    });
    client.on("roleUpdate", (oldr, newr) => {
        logEventNoChannel(
            `**A role <@&${newr.id}> has been updated.**`,
            newr.guild.id
        );
    });
    client.on("webhookUpdate", (channel) => {
        logEventNoChannel(
            `**A webhook has been updated in <#${channel.id}>.**`,
            channel.guild.id
        );
    });
};
