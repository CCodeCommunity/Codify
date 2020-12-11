import { Command } from "@enitoni/gears-discordjs";
import { MessageAttachment } from "discord.js";

import { matchPrefixesStrict } from "../../common/matching/matchPrefixesStrict";
import { createMetadata } from "./help/createMetadata";

export default new Command()
    .match(matchPrefixesStrict("googleit"))
    .setMetadata(
        createMetadata({
            name: "Google it",
            usage: "cc!googleit",
            description: "Sends an image from codebullet with just google it"
        })
    )
    .use(context => {
        const { message } = context;

        message.delete();

        const attachment = new MessageAttachment(
            `src/common/images/googleit.png`
        );
        return message.channel.send(attachment);
    });
