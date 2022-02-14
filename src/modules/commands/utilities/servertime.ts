import { Command } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../../common/matching/matchPrefixesStrict";
import { createMetadata } from "../help/createMetadata";
import {
    Cooldown,
    setCooldown
} from "../../../common/cooldown/middleware/comandCooldown";

export default new Command()
    .match(matchPrefixesStrict("servertime"))
    .setMetadata(
        createMetadata({
            name: "Servertime",
            usage: "cc!servertime",
            description: "Shows the bot's time, aka the server time."
        })
    )
    .use<Cooldown>(setCooldown(5000))
    .use<ParseArgumentsState>((context) => {
        const { message } = context;

        return message.channel.send(
            `${new Date().toLocaleString("en-GB", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            })} GMT`
        );
    });
