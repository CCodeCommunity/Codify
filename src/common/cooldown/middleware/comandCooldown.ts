import { Middleware } from "@enitoni/gears-discordjs";

export type Cooldown = { lastTalkedAt: number };

const recentlySentCommand = new Map<string, { lastTalkedAt: number }>();

export const setCooldown = (timeout: number): Middleware<Cooldown> => (
    context,
    next,
) => {
    const { message, state } = context;
    const mostRecentTime = new Date().getTime();

    // state.lastTalkedAt = lastUsedAt;
    state.lastTalkedAt = mostRecentTime;
    if (recentlySentCommand.has(message.author.id)) {
        if (
            recentlySentCommand.get(message.author.id)!.lastTalkedAt + timeout >
            mostRecentTime
        ) {
            state.lastTalkedAt = recentlySentCommand.get(
                message.author.id
            )!.lastTalkedAt;
            if (message.channel.type !== "dm")
                message.delete({ timeout: 1000 });

            return message.channel.send(
                `You have to wait **${(recentlySentCommand.get(
                    message.author.id
                )!.lastTalkedAt +
                    timeout -
                    mostRecentTime) /
                    1000}** seconds before using this command again.`
            );
        } else {
            state.lastTalkedAt = mostRecentTime;
            recentlySentCommand.get(
                message.author.id
            )!.lastTalkedAt = mostRecentTime;
        }
    } else {
        state.lastTalkedAt = mostRecentTime;
        recentlySentCommand.set(message.author.id, {
            lastTalkedAt: mostRecentTime
        });
    }

    return next();
};
