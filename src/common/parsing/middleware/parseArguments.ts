import { Middleware } from "@enitoni/gears-discordjs";

import { prefix } from "../../../modules/constants";

export type ParseArgumentsState = { args: string[] };

export const parseArguments: Middleware<ParseArgumentsState> = (
    context,
    next
) => {
    const { message, state } = context;

    const input = message.content.slice(prefix.length).trim();
    const args = input.split(/ +/).slice(1);

    state.args = args;

    return next();
};
