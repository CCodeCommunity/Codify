import { Command } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";

import { createMetadata } from "./help/createMetadata";

export default new Command()
    .match(matchPrefixesStrict("a"))
    .setMetadata(
        createMetadata({
            name: "Scream",
            usage: "cc!a",
            description: "Makes the bot scream. AAAAAAAAAAAAAAAAAAAAAAAAAAAA"
        })
    )
    .use<ParseArgumentsState>(context => {
        const { message } = context;

        message.delete();

        const randNum = Math.floor(Math.random() * 100) + 1;

        return message.channel.send(
            randNum === 1 ? "a" : `${"".padStart(randNum, "A")}`
        );
    });
