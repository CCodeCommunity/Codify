import { Middleware } from "@enitoni/gears-discordjs";

export type Cooldown = { lastTalkedAt: number };

const recentlySentCommand = new Map<string, { lastTalkedAt: number }>();

// some utility types for working with tuples
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Cons<H, T extends readonly any[]> = ((
    head: H,
    ...tail: T
) => void) extends (...cons: infer R) => void
    ? R
    : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Push<T extends readonly any[], V> = T extends any
    ? Cons<void, T> extends infer U
        ? { [K in keyof U]: K extends keyof T ? T[K] : V }
        : never
    : never;

// final type you need
type AddArgument<F, Arg> = F extends (...args: infer PrevArgs) => infer R
    ? (...args: Push<PrevArgs, Arg>) => R
    : never;

export const setCooldown: AddArgument<Middleware<Cooldown>, number> = (
    context,
    next,
    timeout
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
