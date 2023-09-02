import { Client, Message } from "discord.js";
import knex from "../../db/knex";

import randomMessage from "./levelUpMessages";
import Store from "./types/Store";
import Subscription from "./types/Subscription";

import {
    xpMultiplier,
    topXpWinMoneyGain,
    topXpWinXpGain,
    nth
} from "../modules/constants";

const defaultDesc = "Hi guys, I'm using the Codify bot!";

export async function initProfile(
    userid: string,
    description: string = defaultDesc
) {
    await knex("user").insert({
        userid,
        description,
        balance: 0,
        lastdaily: "Never claimed.",
        level: 1,
        xp: 0
    });
}

export async function checkAndInitProfile(
    userid: string,
    description: string = defaultDesc
) {
    const rows = await knex("user").where({ userid });
    if (rows.length === 0) {
        await initProfile(userid, description);
        console.log(`New user created, userid: ${userid}`);
    }
}

async function checkLevelup(userid: string, ctx: Message) {
    try {
        const user = (await knex("user").where({ userid }))[0];
        const guild = (
            await knex("servers").where({ serverid: ctx.guild?.id })
        )[0];
        const gain = Math.floor(Math.sqrt(user.level) * 50);
        if (user.xp > Math.sqrt(user.level) * 100) {
            const levelupmessages = user.levelupmessages;
            await knex("user")
                .where({ userid })
                .update({
                    xp: 0,
                    level: parseInt(user.level) + 1,
                    balance: parseInt(user.balance) + gain
                });
            if (!levelupmessages) {
                if (ctx.guild?.id) {
                    const [randomQuote, randomEmoji] = await randomMessage(
                        ctx.guild?.id
                    );

                    const levelupchannel =
                        (guild?.levelupmsgschannel
                            ? ctx.client.channels.cache.get(
                                  guild.levelupmsgschannel
                              )
                            : ctx.channel) || ctx.channel;

                    if (
                        levelupchannel.type !== "DM" &&
                        levelupchannel.type !== "GUILD_CATEGORY" &&
                        levelupchannel.type !== "GUILD_STAGE_VOICE" &&
                        levelupchannel.type !== "GUILD_STORE" &&
                        levelupchannel.type !== "GUILD_VOICE"
                    ) {
                        if (guild.usersquotes) {
                            levelupchannel.send(`${randomQuote}`);
                        }

                        if (guild.levelupmsgs) {
                            levelupchannel.send(
                                `<@${user.userid}> you are now level **${
                                    parseInt(user.level) + 1
                                }** here's **$${gain}** for you. ${randomEmoji}`
                            );
                        }
                    }
                }
            }
            console.log(`User @${ctx.author.username} leveled up!`);
        }
    } catch (e) {
        console.log(e);
    }
}

export const awardMostXpToday = async (userid: string, ctx: Message) => {
    const lastAwardDay = (await knex("awarddays"))[0]?.mostxpinaday || 0;
    const user = (await knex("user").where({ userid }))[0];
    const today = new Date(Date.now()).getDate();
    const topUserLastAwardDay = (
        await knex("user")
            .where({ lastdayxp: lastAwardDay })
            .orderBy("dayxp", "desc")
            .orderBy("level", "desc")
    )[0];

    if (today - lastAwardDay == 2) {
        await knex("awarddays")
            .first()
            .update({
                mostxpinaday: today - 1
            });
    }
    if (topUserLastAwardDay)
        if (today !== lastAwardDay && userid == topUserLastAwardDay.userid) {
            await knex("awarddays").first().update({
                mostxpinaday: today
            });

            await knex("user")
                .where({ userid })
                .update({
                    xp: user.xp + topXpWinXpGain,
                    balance: parseInt(user.balance) + topXpWinMoneyGain
                });

            ctx.channel.send(
                `<@${userid}> **Congratz, you've been the most active user globally on ${lastAwardDay}${nth(
                    lastAwardDay
                )} this month.**`
            );
            ctx.channel.send(
                `**You won $${topXpWinMoneyGain} and ${topXpWinXpGain} XP** :catJam:`
            );
            console.log(
                `User @${ctx.author.username} claimed the daily award!`
            );
        }
};

export const updateDayXp = async (userid: string, xp: number) => {
    try {
        const user = (await knex("user").where({ userid }))[0];
        const today = new Date(Date.now());
        const lastdayxp = user.lastdayxp;

        if (today.getDate() !== lastdayxp) {
            await knex("user").where({ userid }).update({
                lastdayxp: today.getDate(),
                dayxp: xp
            });
        } else {
            await knex("user")
                .where({ userid })
                .update({
                    dayxp: user.dayxp + xp
                });
        }
    } catch (error) {
        console.log(error);
    }
};

export async function autoXpClaim(userid: string, ctx: Message) {
    try {
        await checkAndInitProfile(userid);

        const user = (await knex("user").where({ userid }))[0];
        const now = Math.floor(new Date().getMinutes() + 1);

        if (user.lastxpclaim != now) {
            const xpGained =
                (Math.floor(Math.random() * 10) +
                    1 +
                    Math.floor(Math.sqrt(user.level))) *
                xpMultiplier;

            await knex("user")
                .where({ userid })
                .update({
                    xp: parseInt(user.xp) + xpGained,
                    lastxpclaim: now
                });
            await awardMostXpToday(userid, ctx);
            await updateDayXp(userid, xpGained);
            await checkLevelup(userid, ctx);
        }
    } catch (err) {
        console.info(err);
    }
}

export const checkSubscriptions = async (userId: string, client: Client) => {
    const userSubscriptions = await knex<Subscription>("subscriptions").where({
        userId
    });
    await Promise.all(
        userSubscriptions.map(async (l) => {
            if (Math.floor(Date.now() / 1000) > Number(l.expiration)) {
                const store: Store = await knex("store")
                    .where({ id: l.storeId })
                    .first()!;
                const user = await client.users.fetch(l.userId);
                const dbUser = await knex("user")
                    .where({ userid: user!.id })
                    .first();
                const subscriptionsMissed = Math.ceil(
                    (Math.floor(Date.now() / 1000) - Number(l.expiration)) /
                        (store.subscriptionInterval * 86400)
                );
                if (dbUser.balance < store.price * subscriptionsMissed) {
                    user?.send(
                        `:timer: Looks like your subscription to ${
                            (
                                await (
                                    await client.guilds.fetch(store.serverId)
                                )?.roles.fetch(store.roleId)
                            )?.name
                        } on ${await client.guilds.fetch(
                            store.serverId
                        )} has expired ${
                            subscriptionsMissed > 1
                                ? `${subscriptionsMissed} times`
                                : ""
                        } and you do not have the sufficient funds to pay for another subscription. Your subscription will be cancelled until you restart it.`
                    );

                    (
                        await (
                            await client.guilds.fetch(store.serverId)
                        )?.members.fetch(l.userId)
                    )?.roles.remove(store.roleId);

                    await knex<Subscription>("subscriptions")
                        .delete()
                        .where({ id: l.id });
                } else {
                    try {
                        user?.send(
                            `:timer: Looks like your subscription to ${
                                (
                                    await (
                                        await client.guilds.fetch(
                                            store.serverId
                                        )
                                    )?.roles.fetch(store.roleId)
                                )?.name
                            } on ${await client.guilds.fetch(
                                store.serverId
                            )} has expired ${
                                subscriptionsMissed > 1
                                    ? `${subscriptionsMissed} times`
                                    : ""
                            }, but you have the sufficient funds to pay for another subscription. Your subscription will continue and automatically renew when it next expires unless you have insufficient funds.`
                        );
                    } catch (error) {
                        console.log(
                            "Cannot send subscription message to " + user.tag
                        );
                    }

                    await knex("user")
                        .update({
                            balance: dbUser.balance - store.price
                        })
                        .where({ userid: l.userId });

                    await knex<Subscription>("subscriptions")
                        .update({
                            expiration: (
                                Math.floor(Date.now() / 1000) + 86400
                            ).toString()
                        })
                        .where({ id: l.id });
                }
            }
        })
    );
};
