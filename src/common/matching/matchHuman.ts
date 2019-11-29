import { Matcher } from "@enitoni/gears-discordjs";
import { User } from "discord.js";

export const matchHuman = (): Matcher => context => {
    const { author } = context.message;

    const matches = author instanceof User && !author.bot;
    if (matches) {
        return context;
    }
};
