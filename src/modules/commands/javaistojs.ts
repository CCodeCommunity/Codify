import { Command } from "@enitoni/gears-discordjs";
import { MessageAttachment } from "discord.js";

import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";

export default new Command()
    .match(matchPrefixesStrict("javaistojs|javatojs"))
    .use(context => {
        const { message } = context;

        message.delete();

        const attachment = new MessageAttachment(
            `src/common/images/javaistojs.png`
        );
        return message.channel.send(attachment);
    });
