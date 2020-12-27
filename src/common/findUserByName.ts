import { Guild } from "discord.js";

export const findUserByName = async (guild: Guild, str: string) => {
    const users = await guild.members.cache;
    const matchingUsers = [...users.values()].filter(l =>
        `${l.user.username}#${l.user.discriminator}`
            .toLowerCase()
            .startsWith(str)
    );
    return matchingUsers;
};
