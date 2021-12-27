import { Command } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../../common/matching/matchPrefixesStrict";

import { createMetadata } from "../help/createMetadata";
import {
    Cooldown,
    setCooldown
} from "../../../common/cooldown/middleware/comandCooldown";

export default new Command()
    .match(matchPrefixesStrict("age"))
    .setMetadata(
        createMetadata({
            name: "Age",
            usage: "cc!age",
            description: "Displays the age of the server."
        })
    )
    .use<Cooldown>(setCooldown(10000))
    .use<ParseArgumentsState>(async context => {
        const { message } = context;

        if (message.guild == null) {
            return message.channel.send(
                `**Your account was created on:** *${String(
                    message.author.createdAt
                )}*`
            );
        }
        return message.channel.send(
            `**This server was created on:** *${String(
                message.guild?.createdAt
            )}*`
        );
    });
