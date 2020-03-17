import { CommandBuilder } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";

export default new CommandBuilder()
    .match(matchPrefixesStrict("a"))
    .use<ParseArgumentsState>(context => {
        const { message } = context;

        message.delete();

        const randNum = Math.floor(Math.random() * 100) + 1;

        if (randNum === 1) {
            return message.channel.send(`a`);
        } else {
            return message.channel.send(`${"".padStart(randNum, "A")}`);
        }
    })
    .done();
