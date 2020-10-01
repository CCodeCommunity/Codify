import { Command } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";

export default new Command()
    .match(matchPrefixesStrict("a"))
    .use<ParseArgumentsState>(context => {
        const { message } = context;

        message.delete();

        const randNum = Math.floor(Math.random() * 100) + 1;

        return message.channel.send(
            randNum === 1 ? "a" : `${"".padStart(randNum, "A")}`
        );
    });
