import { Guild } from "discord.js";

export const findUserByName = async (guild: Guild, str: string) => {
    const users = guild.members.cache;
    const matchingUsers = [...users.values()].filter(l =>
        l.user.tag.toLowerCase().startsWith(str)
    );
    return matchingUsers;
};
