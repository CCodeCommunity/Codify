import { Client, Message, User } from "discord.js";
import knex from "../../db/knex";

import randomMessage from "./levelUpMessages";
import Store from "./types/Store";
import Subscription from "./types/Subscription";

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
        const gain = Math.floor(Math.sqrt(user.level) * 50);
        if (user.xp > Math.sqrt(user.level) * 100) {
            const levelupmessages = (await knex("user").where({ userid }))[0]
                .levelupmessages;
            await knex("user")
                .where({ userid })
                .update({
                    xp: 0,
                    level: parseInt(user.level) + 1,
                    balance: parseInt(user.balance) + gain
                });
            if (!levelupmessages) {
                await ctx.channel.send(`*${await randomMessage()}*`);
                ctx.channel.send(
                    `<@${user.userid}> you are now level **${parseInt(
                        user.level
                    ) + 1}** here's **$${gain}** for you. 🕶️`
                );
            }
            console.log(`User <@${userid}> leveled up!`);
        }
    } catch (e) {
        console.log(e);
    }
}

export async function autoXpClaim(userid: string, ctx: Message) {
    try {
        await checkAndInitProfile(userid);

        const user = (await knex("user").where({ userid }))[0];
        const now = Math.floor(new Date().getMinutes() + 1);

        if (user.lastxpclaim != now) {
            await knex("user")
                .where({ userid })
                .update({
                    xp:
                        parseInt(user.xp) +
                        Math.floor(Math.random() * 10) +
                        1 +
                        Math.floor(Math.sqrt(user.level)),
                    lastxpclaim: now
                });
            checkLevelup(userid, ctx);
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
        userSubscriptions.map(async l => {
            console.log(Math.floor(Date.now() / 1000), Number(l.expiration));
            if (Math.floor(Date.now() / 1000) > Number(l.expiration)) {
                const store: Store = await knex("store")
                    .where({ id: l.storeId })
                    .first()!;
                const user = client.users.get(l.userId);
                const dbUser = await knex("user")
                    .where({ userid: user!.id })
                    .first();
                if (dbUser.balance < store.price) {
                    user?.send(
                        `:timer: Looks like your subscription to ${client.guilds
                            .get(store.serverId)
                            ?.roles.get(store.roleId)?.name
                        } on ${client.guilds.get(
                            store.serverId
                        )} has expired and you do not have the sufficient funds to pay for another subscription. Your subscription will be cancelled until you restart it.`
                    );

                    client.guilds
                        .get(store.serverId)
                        ?.members.get(l.userId)
                        ?.removeRole(store.roleId);

                    await knex<Subscription>("subscriptions")
                        .delete()
                        .where({ id: l.id });
                } else {
                    user?.send(
                        `:timer: Looks like your subscription to ${client.guilds
                            .get(store.serverId)
                            ?.roles.get(store.roleId)?.name
                        } on ${client.guilds.get(
                            store.serverId
                        )} has expired, but you have the sufficient funds to pay for another subscription. Your subscription will continue and automatically renew when it next expires unless you have insufficient funds.`
                    );

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
