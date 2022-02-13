import { Middleware } from "@enitoni/gears-discordjs";

export type Cooldown = { lastTalkedAt: number };

const recentlySentCommand = new Map<string, { lastTalkedAt: number }>();

export const setCooldown =
    (timeout: number): Middleware<Cooldown> =>
    (context, next) => {
        const { message, state } = context;
        const { content } = message;
        const command = content.split(" ")[0];

        const mostRecentTime = new Date().getTime();

        const key = `${message.author.id}${command}`;
        // state.lastTalkedAt = lastUsedAt;
        state.lastTalkedAt = mostRecentTime;
        if (recentlySentCommand.has(key)) {
            if (
                recentlySentCommand.get(key)!.lastTalkedAt + timeout >
                mostRecentTime
            ) {
                state.lastTalkedAt = recentlySentCommand.get(key)!.lastTalkedAt;
                if (message.channel.type !== "DM") message.delete();

                return message.channel.send(
                    `You have to wait **${
                        (recentlySentCommand.get(key)!.lastTalkedAt +
                            timeout -
                            mostRecentTime) /
                        1000
                    }** seconds before using this command again.`
                );
            } else {
                state.lastTalkedAt = mostRecentTime;
                recentlySentCommand.get(key)!.lastTalkedAt = mostRecentTime;
            }
        } else {
            state.lastTalkedAt = mostRecentTime;
            recentlySentCommand.set(key, {
                lastTalkedAt: mostRecentTime
            });
        }

        return next();
    };
