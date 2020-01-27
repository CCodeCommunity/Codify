import { CommandBuilder } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";

export default new CommandBuilder()
    .match(matchPrefixesStrict("say"))
    .use<ParseArgumentsState>(context => {
        const { message } = context;
        const { args } = context.state;

        message.delete();

        if (!args.length) {
            return message.channel.send(`Absolutely nothing.`);
        }

        console.info(`${message.author.username} said "${args.join(" ")}"`);
        return message.channel.send(`${args.join(" ")}`);
    })
    .done();
