import { Command } from "@enitoni/gears-discordjs";
import { MessageAttachment } from "discord.js";

import { matchPrefixesStrict } from "../../../common/matching/matchPrefixesStrict";
import {
    Cooldown,
    setCooldown
} from "../../../common/cooldown/middleware/comandCooldown";
import { createMetadata } from "../help/createMetadata";

export default new Command()
    .match(matchPrefixesStrict("googleit"))
    .setMetadata(
        createMetadata({
            name: "Google it",
            usage: "cc!googleit",
            description: "Sends an image from codebullet with just google it"
        })
    )
    .use<Cooldown>(setCooldown(15000))
    .use(context => {
        const { message } = context;

        if (message.guild !== null) message.delete();

        const attachment = new MessageAttachment(
            `src/common/images/googleit.png`
        );
        return message.channel.send(attachment);
    });
