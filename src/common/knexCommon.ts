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
        lastdaily: "Never claimed."
    });
}

export async function checkAndInitProfile(
    userid: string,
    description: string = defaultDesc
) {
    const rows = await knex("user").where({ userid });
    if (rows.length === 0) {
        await initProfile(userid, description);
    }
}
