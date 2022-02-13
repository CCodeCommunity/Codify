import { Command } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../../common/matching/matchPrefixesStrict";
import { createMetadata } from "../help/createMetadata";
import {
    Cooldown,
    setCooldown
} from "../../../common/cooldown/middleware/comandCooldown";
import { logEvent } from "../../reactions/auditlogs";

export default new Command()
    .match(matchPrefixesStrict("say"))
    .setMetadata(
        createMetadata({
            name: "Say something",
            usage: "cc!say [text]",
            description: "Make the bot say something"
        })
    )
    .use<Cooldown>(setCooldown(3000))
    .use<ParseArgumentsState>(context => {
        const { message } = context;
        const { args } = context.state;

        if (message.guild !== null) message.delete();

        if (!args.length) {
            return message.channel.send(`Absolutely nothing.`);
        }

        logEvent(
            `<@${
                context.message.author.id
            }> has used this command and said _${args.join(" ")}_.`,
            context
        );

        console.info(`${message.author.username} said "${args.join(" ")}"`);
        return message.channel.send(`${args.join(" ")}`);
    });
