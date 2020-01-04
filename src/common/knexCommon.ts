import knex from "../../knexfile";

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

async function checkLevelup(userid: string, ctx: any) {
    const user = (await knex("user").where({ userid }))[0];
    const gain = Math.floor(Math.sqrt(user.level) * 50);
    if (user.xp > Math.sqrt(user.level) * 100) {
        await knex("user")
            .where({ userid })
            .update({
                xp: 0,
                level: parseInt(user.level) + 1,
                balance: parseInt(user.balance) + gain
            });
        ctx.channel.send(
            `🕶️ <@${user.userid}> leveled up, he is now level **${parseInt(
                user.level
            ) + 1}** and he got **$${gain}**`
        );
        console.log(`User <@${userid}> leveled up!`);
    }
}

export async function autoXpClaim(userid: string, ctx: any) {
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
                        Math.floor(Math.random() * 20) +
                        10 +
                        Math.floor(Math.sqrt(user.level)),
                    lastxpclaim: now
                });
            checkLevelup(userid, ctx);
        }
    } catch (err) {
        console.info(err);
    }
}
