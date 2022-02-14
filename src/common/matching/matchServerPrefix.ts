import { Matcher } from "@enitoni/gears-discordjs";
import knex from "../../../db/knex";

export const matchServerPrefix = (): Matcher => async (context) => {
    const serverPrefix = (
        (await knex("servers").where({ serverid: context.message.guildId }))[0]
            .prefix || "cc!"
    ).replaceAll(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const regex = new RegExp(`^(${serverPrefix})`, "i");

    const isMatching = !!context.content.match(regex);
    if (!isMatching) return;

    const newContent = context.content.replace(regex, "").trim();

    return { ...context, content: newContent };
};
