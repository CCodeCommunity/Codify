import { CommandBuilder } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";

export default new CommandBuilder()
    .match(matchPrefixesStrict("say"))
    .use<ParseArgumentsState>(context => {
        const { message } = context;
        const { args } = context.state;

        if (!args.length) {
            return message.channel.send(
                `**${message.author.username}** said nothing`
            );
        }

        return message.channel.send(
            `**${message.author.username}** said:\n${args.join(" ")}`
        );
    })
    .done();
