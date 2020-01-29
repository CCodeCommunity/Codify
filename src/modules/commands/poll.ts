import { CommandBuilder } from "@enitoni/gears-discordjs";

import { ParseArgumentsState } from "../../common/parsing/middleware/parseArguments";
import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";

import { alphabet, resolveArrayToOne, emojiLetters } from "../constants";

export default new CommandBuilder()
    .match(matchPrefixesStrict("poll"))
    .use<ParseArgumentsState>(async context => {
        const { message } = context;
        const { args } = context.state;

        message.delete();

        if (!args.length) {
            return message.channel.send(`Ye the pool with no question and no options...`);
        }


        const getPollMessage = () => {
            const options: string[] = args.join(" ").split("|");
            let generatedMessage: string = "";

            if (options.length > 21) {
                return { message: ":x: **Oops,** looks like you have too many pool options.", numberOfReactions: 0 };
            }
            if (options[0] == "" || options[0] == " ") {
                return { message: ":x: **Oops,** looks like you forgot to add a title.", numberOfReactions: 0 };
            }
            for (const [i, v] of options.entries()) {
                if (v === options[0]) {
                    generatedMessage += `**${v}**\n`;
                } else {
                    generatedMessage += `:regional_indicator_${alphabet[i - 1]}:  ${v != "" && v != " " ? v : "Empty option."} \n`;
                }
            }
            return { message: options.length > 1 ? generatedMessage.length <= 1900 ? generatedMessage : ":x: **Oops**, looks like your poll is bigger than the message character limit." : ":x: **Oops**, looks like you did something wrong.", numberOfReactions: options.length - 1 }
        }
        const pollInfo = getPollMessage();
        const messageToSend = await message.channel.send(`${pollInfo.message}`)

        for (let i = 1; i <= pollInfo.numberOfReactions; i++) {
            await resolveArrayToOne(messageToSend).react(emojiLetters[i - 1])
        }


        return;
    })
    .done();
