import { Command } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../../common/matching/matchPrefixesStrict";

import { createMetadata } from "../help/createMetadata";
import {
    Cooldown,
    setCooldown
} from "../../../common/cooldown/middleware/comandCooldown";

export default new Command()
    .match(matchPrefixesStrict("a"))
    .setMetadata(
        createMetadata({
            name: "Scream",
            usage: "cc!a",
            description: "Makes the bot scream. AAAAAAAAAAAAAAAAAAAAAAAAAAAA"
        })
    )
    .use<Cooldown>(setCooldown(1000))
    .use<ParseArgumentsState>((context) => {
        const { message } = context;

        const randNum = Math.floor(Math.random() * 100) + 1;

        return message.channel.send(
            randNum === 1 ? "a" : `${"".padStart(randNum, "A")}`
        );
    });
